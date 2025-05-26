import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';
import type { File } from 'formidable';
import fs from 'fs';

import { multipartyParse, sanitizeFields, verifyCaptcha } from '../../../middlewares';

import { MAX_PROPOSAL_FILE_SIZE } from '../../../constants';
import { truncateString } from '../../../utils/truncateString';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { fields = {}, files = {} } = req;

    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    const conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl: SF_PROD_LOGIN_URL
    });

    const application = {
      FirstName: fields.FirstName,
      LastName: fields.LastName,
      Email: fields.Email,
      Individual_or_Team__c: fields.Individual_or_Team__c,
      Company: fields.Company,
      npsp__CompanyCity__c: fields.npsp__CompanyCity__c,
      npsp__CompanyCountry__c: fields.npsp__CompanyCountry__c,
      Website: fields.Website,
      Twitter__c: fields.Twitter__c,
      Category__c: fields.Category__c,
      Team_Profile__c: fields.Team_Profile__c,
      Referral_Source__c: fields.Referral_Source__c,
      Referrals__c: fields.Referrals__c,
      Additional_Information__c: fields.Additional_Information__c,
      Project_Name__c: fields.Project_Name__c,
      Sponsorship_Date__c: fields.Sponsorship_Date__c,
      Previous_Work__c: fields.Previous_Work__c,
      Sponsorship_Link__c: fields.Sponsorship_Link__c,
      Sponsorship_Details__c: fields.Sponsorship_Details__c,
      Sponsorship_Topics__c: fields.Sponsorship_Topics__c,
      Type_of_Event__c: fields.Type_of_Event__c,
      In_Person__c: fields.In_Person__c,
      Estimated_Number_of_Attendees__c: fields.Estimated_Number_of_Attendees__c,
      Event_Location__c: fields.Event_Location__c,
      Target_Audience__c: fields.Target_Audience__c,
      Confirmed_Speakers__c: fields.Confirmed_Speakers__c,
      Confirmed_Sponsors__c: fields.Confirmed_Sponsors__c,
      Proposed_Timeline__c: fields.Proposed_Timeline__c,
      CurrencyIsoCode: fields.CurrencyIsoCode,
      Sponsorship_Monetary_Request__c: fields.Sponsorship_Monetary_Request__c,
      LeadSource: 'Webform',
      RecordTypeId: process.env.SF_RECORD_TYPE_SPONSORSHIPS
    };

    conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
      if (err) {
        console.error(err);
        return resolve();
      }

      let createdLeadID: string;

      // Single record creation
      conn.sobject('Lead').create(application, (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        } else {
          console.log(`Small Grants Lead (event) with ID: ${ret.id} has been created!`);

          createdLeadID = ret.id;
          console.log({ createdLeadID });

          const uploadProposal = files.uploadProposal as File;
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
              Title: `[PROPOSAL] ${truncateString(
                (application.Project_Name__c || '').toString(),
                200
              )} - ${createdLeadID}`,
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
        }
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
