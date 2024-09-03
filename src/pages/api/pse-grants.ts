import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';
import { PSESchema } from '../../components/forms/schemas/PSEGrants';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { body } = req;
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    // validate fields against the schema
    const result = PSESchema.safeParse(body);
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

      const application = {
        FirstName: result.data.firstName,
        LastName: result.data.lastName,
        Email: result.data.email,
        Company: result.data.company || `${result.data.firstName} ${result.data.lastName}`,
        npsp__CompanyCountry__c: result.data.country,
        Countries_of_Team__c: result.data.countriesOfTeam,
        Time_Zone__c: result.data.timezone,
        Project_Name__c: result.data.projectName,
        PSE_Project_Overview__c: result.data.projectOverview,
        Impact__c: result.data.impact,
        Project_Description__c: result.data.projectDescription,
        Project_Category__c: result.data.projectCategory,
        Requested_Amount__c: result.data.requestedAmount,
        Referrals__c: result.data.referrals,
        Website: result.data.website,
        Alternative_Contact__c: result.data.alternativeContact,
        Repeat_Applicant__c: result.data.repeatApplicant,
        Additional_Information__c: result.data.additionalInfo,
        Github_Link__c: result.data.projectRepoLink,
        Discord__c: result.data.discord,
        Is_it_Open_Source__c: result.data.isOpenSource ? result.data.openSourceDetails : '',
        Challenges__c: result.data.challenges,
        File_Attachment_Public_Link__c: result.data.proposalAttachment,
        Proposed_Timeline__c: result.data.proposedTimeline,
        Progress__c: result.data.progress,
        Sustainability_Plan__c: result.data.sustainabilityPlan,
        Other_Projects__c: result.data.otherProjects,

        LeadSource: 'Webform',
        Pipeline_Entry__c: 'Privacy and Scaling',
        RecordTypeId: process.env.SF_RECORD_TYPE_PSE_GRANTS!
      };

      // Single record creation
      conn.sobject('Lead').create(application, async (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        }

        console.log(`PSE Grants Lead with ID: ${ret.id} has been created!`);

        res.status(200).json({ status: 'ok' });
        return resolve();
      });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
