import jsforce from 'jsforce';
import fs from 'fs';
import type { NextApiResponse } from 'next';
import type { File } from 'formidable';

import addRowToSpreadsheet from '../../utils/addRowToSpreadsheet';

import { multipartyParse, sanitizeFields, verifyCaptcha } from '../../middlewares';

import { AccountAbstractionGrantsNextApiRequest } from '../../types';
import { MAX_PROPOSAL_FILE_SIZE } from '../../constants';

async function handler(
  req: AccountAbstractionGrantsNextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise(resolve => {
    const { fields = {}, files = {} } = req;
    const {
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      title: Title,
      applyingAs: Applying_as_a__c,
      applyingAsOther: Applying_as_Other__c,
      company: Company,
      country: npsp__CompanyCountry__c,
      countriesOfTeam: Countries_of_Team__c,
      timezone: Time_Zone__c,
      projectName: Project_Name__c,
      projectDescription: Project_Description__c,
      projectCategory: Category__c,
      requestedAmount: Requested_Amount__c,
      howDidYouHearAboutGrantsWave: Referral_Source__c,
      referralSourceIfOther: Referral_Source_if_Other__c,
      wouldYouShareYourResearch: Would_you_share_your_research__c,
      twitter: Twitter__c,
      github: Github_Username__c,
      telegram: Alternative_Contact__c,
      repeatApplicant: Repeat_Applicant__c,
      canTheEFReachOut: Can_the_EF_reach_out__c,
      additionalInfo: Additional_Information__c
    } = fields;

    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    const conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl: SF_PROD_LOGIN_URL
    });

    conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, async err => {
      if (err) {
        console.error(err);
        return resolve();
      }

      const application = {
        FirstName,
        LastName,
        Email,
        Title,
        Applying_as_a__c,
        Applying_as_Other__c,
        Company,
        npsp__CompanyCountry__c,
        Countries_of_Team__c,
        Time_Zone__c,
        Project_Name__c,
        Project_Description__c,
        Category__c,
        Requested_Amount__c,
        Referral_Source__c,
        Referral_Source_if_Other__c,
        Would_you_share_your_research__c,
        Twitter__c,
        Github_Username__c,
        Alternative_Contact__c,
        Repeat_Applicant__c,
        Can_the_EF_reach_out__c,
        Additional_Information__c: Additional_Information__c,
        Proactive_Community_Grants_Round__c: 'Account Abstraction 2023', // this value is hardwired, depending on the type of grant round
        RecordTypeId: process.env.SF_RECORD_TYPE_GRANTS_ROUND! // Proactive Grant Round
      };

      // Single record creation
      conn.sobject('Lead').create(application, async (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        }

        // send submission data to a google spreadsheet
        addRowToSpreadsheet(
          {
            id: '1MUH1hUdeHpTRXEYLzpokHEV1tQYHmy83RDpl7ny-wxQ',
            sheetName: 'Applications'
          },
          // @ts-ignore
          application
        ).catch(err => {
          // as this is something internal we don't want to show this error to the user
          console.error(err);
        });

        console.log(`Account Abstraction Grants 2023 Lead with ID: ${ret.id} has been created!`);

        const createdLeadID = ret.id;
        console.log({ createdLeadID });

        const uploadProposal = files.proposal as File;
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
