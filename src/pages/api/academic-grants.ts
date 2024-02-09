import fs from 'fs';
import jsforce from 'jsforce';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { File } from 'formidable';

import { multipartyParse, sanitizeFields, verifyCaptcha } from '../../middlewares';

import { AcademicGrantsSchema } from '../../components/forms/schemas/AcademicGrants';

import { MAX_PROPOSAL_FILE_SIZE } from '../../constants';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const fields = { ...req.fields, ...req.files };
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    // validate fields against the schema
    const result = AcademicGrantsSchema.safeParse(fields);
    if (!result.success) {
      const formatted = result.error.format();
      console.error(formatted);

      res.status(500).end();
      return resolve();
    }

    const conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl: SF_PROD_LOGIN_URL
    });

    conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
      if (err) {
        console.error(err);
        res.status(500).end();
        return resolve();
      }

      // SF mapping
      const application = {
        FirstName: result.data.firstName,
        LastName: result.data.lastName,
        Email: result.data.email,
        POC_is_authorised_signatory__c: result.data.POCisAuthorisedSignatory,
        Authorised_Signatory_Information__c: result.data.authorisedSignatoryInformation,
        Applying_as_a__c: result.data.applyingAs,
        Applying_as_Other__c: result.data.applyingAsOther,
        Company: result.data.company,
        npsp__CompanyCountry__c: result.data.country,
        Countries_of_Team__c: result.data.countriesTeam,
        Time_Zone__c: result.data.timezone,
        Project_Name__c: result.data.projectName,
        Project_Description__c: result.data.projectDescription,
        Category__c: result.data.projectCategory,
        Requested_Amount__c: result.data.requestAmount,
        Referral_Source__c: result.data.referralSource,
        Referral_Source_if_Other__c: result.data.referralSourceIfOther,
        Would_you_share_your_research__c: result.data.shareResearch,
        LinkedIn_Profile__c: result.data.linkedinProfile,
        Twitter__c: result.data.twitter,
        Website: result.data.website,
        Alternative_Contact__c: result.data.alternativeContact,
        Repeat_Applicant__c: result.data.repeatApplicant,
        Can_the_EF_reach_out__c: result.data.canTheEFReachOut,
        Additional_Information__c: result.data.additionalInfo,
        Proactive_Community_Grants_Round__c: 'Academic Grants Round 2024', // this value is hardwired, depending on the type of grant round
        LeadSource: 'Webform',
        RecordTypeId: process.env.SF_RECORD_TYPE_GRANTS_ROUND!
      };

      // Single record creation
      conn.sobject('Lead').create(application, async (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        }

        console.log(`Academic Grants 2024 Lead with ID: ${ret.id} has been created!`);

        const createdLeadID = ret.id;
        console.log({ createdLeadID });

        const uploadProposal = result.data.proposalAttachment as File;
        console.log({ uploadProposal });

        if (!uploadProposal) {
          res.status(200).json({ status: 'ok' });
          return resolve();
        }

        let uploadProposalContent;
        try {
          // turn file into base64 encoding
          uploadProposalContent = fs.readFileSync(uploadProposal.filepath, {
            encoding: 'base64'
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ status: 'fail' });
          return resolve();
        }

        // Document upload
        conn.sobject('ContentVersion').create(
          {
            Title: `[PROPOSAL] ${application.Project_Name__c} - ${createdLeadID}`,
            PathOnClient: uploadProposal.originalFilename,
            VersionData: uploadProposalContent // base64 encoded file content
          },
          async (err, uploadedFile) => {
            if (err || !uploadedFile.success) {
              console.error(err);

              res.status(400).json({ status: 'fail' });
              return resolve();
            } else {
              console.log({ uploadedFile });
              console.log(`Document has been uploaded successfully!`);

              const contentDocument = await conn
                .sobject<{
                  Id: string;
                  ContentDocumentId: string;
                }>('ContentVersion')
                .retrieve(uploadedFile.id);

              await conn.sobject('ContentDocumentLink').create({
                ContentDocumentId: contentDocument.ContentDocumentId,
                LinkedEntityId: createdLeadID,
                ShareType: 'V'
              });

              res.status(200).json({ status: 'ok' });
              return resolve();
            }
          }
        );
      });
    });
  });
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default multipartyParse(sanitizeFields(verifyCaptcha(handler)), {
  maxFileSize: MAX_PROPOSAL_FILE_SIZE
});
