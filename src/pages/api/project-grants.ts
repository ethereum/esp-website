import fs from 'fs';
import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({ status: 'fail' });
      return;
    }

    const fieldsSanitized = Object.keys(fields).reduce<typeof fields>((prev, key) => {
      let value = fields[key];
      if (typeof value === 'string') {
        value = value.trim();
      }

      return {
        ...prev,
        [key]: value
      };
    }, {});

    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    const conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl: SF_PROD_LOGIN_URL
    });

    const application = {
      FirstName: fieldsSanitized.firstName,
      LastName: fieldsSanitized.lastName,
      Email: fieldsSanitized.email,
      Company: fieldsSanitized.company,
      Project_Name__c: fieldsSanitized.projectName,
      Website: fieldsSanitized.website,
      Github_Link__c: fieldsSanitized.github,
      Twitter__c: fieldsSanitized.twitter,
      Team_Profile__c: fieldsSanitized.teamProfile,
      Project_Description__c: fieldsSanitized.projectDescription,
      Category__c: fieldsSanitized.projectCategory,
      Requested_Amount__c: fieldsSanitized.requestedAmount,
      npsp__CompanyCity__c: fieldsSanitized.city,
      npsp__CompanyCountry__c: fieldsSanitized.country,
      Time_Zone__c: fieldsSanitized.timezone,
      Referral_Source__c: fieldsSanitized.howDidYouHearAboutESP,
      Referral_Source_if_Other__c: fieldsSanitized.referralSourceIfOther,
      Referrals__c: fieldsSanitized.referrals,
      RecordTypeId: process.env.SF_RECORD_TYPE_PROJECT_GRANTS
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
        } else {
          console.log(`Project Grants Lead with ID: ${ret.id} has been created!`);

          createdLeadID = ret.id;
          console.log({ createdLeadID });

          const uploadProposal = files.uploadProposal as File;
          console.log({ uploadProposal });

          if (!uploadProposal) {
            res.status(200).json({ status: 'ok' });
            return;
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
            return;
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
