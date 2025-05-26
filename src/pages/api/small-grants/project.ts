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
      // General
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
      // Project specific (see event.ts for Events)
      Project_Name__c: fields.Project_Name__c,
      Github_Link__c: fields.Github_Link__c,
      Previous_Work__c: fields.Previous_Work__c,
      Project_Description__c: fields.Project_Description__c,
      Problem_Being_Solved__c: fields.Problem_Being_Solved__c,
      Impact__c: fields.Impact__c,
      How_is_it_different__c: fields.How_is_it_different__c,
      CurrencyIsoCode: fields.CurrencyIsoCode,
      Requested_Amount__c: fields.Requested_Amount__c,
      Proposed_Timeline__c: fields.Proposed_Timeline__c,
      Is_it_a_Public_Good__c: fields.Is_it_a_Public_Good__c,
      Is_it_Open_Source__c: fields.Is_it_Open_Source__c,
      Sustainability_Plan__c: fields.Sustainability_Plan__c,
      Other_Projects__c: fields.Other_Projects__c,
      Repeat_Applicant__c: fields.Repeat_Applicant__c, // this is a boolean value, no trim applied
      Progress__c: fields.Progress__c,
      Other_Funding__c: fields.Other_Funding__c,
      LeadSource: 'Webform',
      RecordTypeId: process.env.SF_RECORD_TYPE_SMALL_GRANTS
    };

    conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
      if (err) {
        return console.error(err);
      }

      let createdLeadID: string;

      // Single record creation
      conn.sobject('Lead').create(application, (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        } else {
          console.log(`Small Grants Lead (project) with ID: ${ret.id} has been created!`);

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
