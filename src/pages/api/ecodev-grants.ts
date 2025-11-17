import fs from 'fs';
import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';
import type { File } from 'formidable';

import { multipartyParse, verifyCaptcha, sanitizeFields } from '../../middlewares';
import { MAX_PROPOSAL_FILE_SIZE } from '../../constants';
import { truncateString } from '../../utils/truncateString';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { fields = {}, files = {} } = req;

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

    if (!SF_PROD_USERNAME || !SF_PROD_PASSWORD || !SF_PROD_SECURITY_TOKEN) {
      res.status(500).json({ status: 'fail', error: 'Server configuration error' });
      return resolve();
    }

    const conn = new jsforce.Connection({
      loginUrl: SF_PROD_LOGIN_URL
    });

    const application = {
      FirstName: fieldsSanitized.firstName,
      LastName: fieldsSanitized.lastName,
      Email: fieldsSanitized.email,
      Company: fieldsSanitized.company,
      Team_Profile__c: fieldsSanitized.teamProfile,
      Twitter__c: fieldsSanitized.twitter,
      Website: fieldsSanitized.website,
      Project_Name__c: fieldsSanitized.projectName,
      Github_Link__c: fieldsSanitized.projectRepo,
      Category__c: fieldsSanitized.projectCategory,
      Project_Description__c: fieldsSanitized.projectDescription,
      Progress__c: fieldsSanitized.progress,
      Problem_Being_Solved__c: fieldsSanitized.problemBeingSolved,
      Proposed_Timeline__c: fieldsSanitized.proposedTimeline,
      Requested_Amount__c: fieldsSanitized.requestedAmount,
      Impact__c: fieldsSanitized.whyIsProjectImportant,
      How_is_it_different__c: fieldsSanitized.howDoesYourProjectDiffer,
      Is_it_a_Public_Good__c: fieldsSanitized.isYourProjectPublicGood,
      Is_it_Open_Source__c: fieldsSanitized.isOpenSource,
      Why_Ethereum__c: fieldsSanitized.whyEthereum,
      Challenges__c: fieldsSanitized.challenges,
      Sustainability_Plan__c: fieldsSanitized.sustainabilityPlan,
      Other_Projects__c: fieldsSanitized.otherProjects,
      Repeat_Applicant__c: fieldsSanitized.repeatApplicant,
      Other_Funding__c: fieldsSanitized.otherFunding,
      Additional_Information__c: fieldsSanitized.additionalInfo,
      npsp__CompanyCity__c: fieldsSanitized.city,
      npsp__CompanyCountry__c: fieldsSanitized.country,
      Time_Zone__c: fieldsSanitized.timezone,
      Referrals__c: fieldsSanitized.referrals,
      LeadSource: 'Webform',
      Pipeline_Entry__c: 'EcoDev',
      RecordTypeId: process.env.SF_RECORD_TYPE_GENERALIST_ECODEV
    };

    const credentials = `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`;
    conn.login(SF_PROD_USERNAME, credentials, err => {
      if (err) {
        console.error('Salesforce authentication error:', err);
        res.status(500).json({ status: 'fail', error: 'Authentication failed' });
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
          console.log(`Generalist EcoDev Lead with ID: ${ret.id} has been created!`);

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
              Title: `[Document] ${truncateString(
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
