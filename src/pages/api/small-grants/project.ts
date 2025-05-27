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
      FirstName: fields.firstName,
      LastName: fields.lastName,
      Email: fields.email,
      Individual_or_Team__c: fields.individualOrTeam,
      Company: fields.company,
      npsp__CompanyCity__c: fields.city,
      npsp__CompanyCountry__c: fields.country,
      Website: fields.website,
      Twitter__c: fields.twitter,
      Category__c: fields.projectCategory,
      Team_Profile__c: fields.individualOrTeamSummary,
      Referral_Source__c: fields.howDidYouHearAboutESP,
      Referrals__c: fields.referrals,
      Additional_Information__c: fields.additionalInfo,
      // Project specific (see event.ts for Events)
      Project_Name__c: fields.projectName,
      Github_Link__c: fields.projectRepo,
      Previous_Work__c: fields.projectPreviousWork,
      Project_Description__c: fields.projectDescription,
      Problem_Being_Solved__c: fields.problemBeingSolved,
      Impact__c: fields.whyIsProjectImportant,
      How_is_it_different__c: fields.howDoesYourProjectDiffer,
      CurrencyIsoCode: fields.fiatCurrency,
      Requested_Amount__c: fields.projectRequestedAmount,
      Proposed_Timeline__c: fields.proposedTimeline,
      Is_it_a_Public_Good__c: fields.isYourProjectPublicGood,
      Is_it_Open_Source__c: fields.isOpenSource,
      Sustainability_Plan__c: fields.sustainabilityPlan,
      Other_Projects__c: fields.otherProjects,
      Repeat_Applicant__c: fields.repeatApplicant,
      Progress__c: fields.progress,
      Other_Funding__c: fields.otherFunding,
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
