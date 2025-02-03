import fs from 'fs';
import jsforce from 'jsforce';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { File } from 'formidable';

import { multipartyParse, sanitizeFields, verifyCaptcha } from '../../middlewares';

import { PectraPGRSchema } from '../../components/forms/schemas/PectraPGR';

import { MAX_PROPOSAL_FILE_SIZE } from '../../constants';
import { truncateString } from '../../utils/truncateString';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const fields = { ...req.fields, ...req.files };
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    // validate fields against the schema
    const result = PectraPGRSchema.safeParse(fields);
    if (!result.success) {
      const formatted = result.error.format();
      console.error('Validation Error:', formatted);

      res.status(500).end();
      return resolve();
    }

    const conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl: SF_PROD_LOGIN_URL
    });

    conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
      if (err) {
        console.error('Salesforce Login Error:', err);
        res.status(500).json({ status: 'fail', message: 'Salesforce login failed.' });
        return resolve();
      }

      // SF mapping
      const application = {
        FirstName: result.data.firstName,
        LastName: result.data.lastName,
        Email: result.data.email,
        Individual_or_Team__c: result.data.individualOrTeam.trim(),
        Company: result.data.company,
        npsp__CompanyCountry__c: result.data.country,
        Time_Zone__c: result.data.timezone,
        Project_Name__c: result.data.projectName,
        Project_Description__c: result.data.projectDescription,
        Impact__c: result.data.impact,
        How_is_it_different__c: result.data.howIsItDifferent,
        Category__c: result.data.projectCategory,
        CurrencyIsoCode: result.data.fiatCurrency,
        Requested_Amount__c: result.data.requestAmount,
        Referral_Source__c: result.data.referralSource,
        Referral_Source_if_Other__c: result.data.referralSourceIfOther,
        LinkedIn_Profile__c: result.data.linkedinProfile,
        Twitter__c: result.data.twitter,
        Website: result.data.website,
        Alternative_Contact__c: result.data.alternativeContact,
        Repeat_Applicant__c: result.data.repeatApplicant,
        Additional_Information__c: result.data.additionalInfo,
        RecordTypeId: process.env.SF_RECORD_TYPE_GRANTS_ROUND!,
        Proactive_Community_Grants_Round__c: 'Pectra',
        LeadSource: 'Webform'
      };

      // Single record creation
      conn.sobject('Lead').create(application, async (err, ret) => {
        if (err || !ret.success) {
          console.error('Salesforce Lead Creation Error:', err, ret);
          res.status(400).json({ status: 'fail', message: 'Failed to create Lead in Salesforce.' });
          return resolve();
        }

        console.log(`Pectra PGR Lead with ID: ${ret.id} has been created!`);

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
          console.error('File Read Error:', error);
          res.status(500).json({ status: 'fail', message: 'Failed to read proposal file.' });
          return resolve();
        }

        // Document upload
        conn.sobject('ContentVersion').create(
          {
            Title: `[PROPOSAL] ${truncateString(
              application.Project_Name__c || '',
              200
            )} - ${createdLeadID}`,
            PathOnClient: uploadProposal.originalFilename,
            VersionData: uploadProposalContent // base64 encoded file content
          },
          async (err, uploadedFile) => {
            if (err || !uploadedFile.success) {
              console.error('Salesforce ContentVersion Upload Error:', err);
              res.status(400).json({ status: 'fail', message: 'Failed to upload proposal file.' });
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
  })
}

export const config = {
    api: {
      bodyParser: false
    }
  };
  
export default multipartyParse(sanitizeFields(verifyCaptcha(handler)), {
  maxFileSize: MAX_PROPOSAL_FILE_SIZE
});
