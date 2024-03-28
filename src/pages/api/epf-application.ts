import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';
import { EPFSchema } from '../../components/forms/schemas/EPFApplication';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { body } = req;
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    // validate fields against the schema
    const result = EPFSchema.safeParse(body);
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
        Individual_or_Team__c: result.data.individualOrTeam,
        Team_Profile__c: result.data.teamProfile,
        npsp__CompanyCity__c: result.data.city,
        npsp__CompanyCountry__c: result.data.country,
        Time_Zone__c: result.data.timezone,
        Referral_Source_if_Other__c: result.data.referralSourceIfOther,
        Referrals__c: result.data.referralSource,
        Project_Name__c: result.data.projectName,
        Project_Description__c: result.data.projectDescription,
        Github_Link__c: result.data.projectRepoLink,
        Category__c: result.data.projectCategory,
        Requested_Amount__c: result.data.requestedAmount,
        Proposed_Timeline__c: result.data.proposedTimeline,
        Progress__c: result.data.progress,
        Problem_Being_Solved__c: result.data.problemBeingSolved,
        Sustainability_Plan__c: result.data.sustainabilityPlan,
        Impact__c: result.data.impact,
        Alternative_Contact__c: result.data.alternativeContact,
        Repeat_Applicant__c: result.data.repeatApplicant,
        Additional_Information__c: result.data.additionalInfo,
        Company: result.data.projectName, // Company is a required field in SF, we're using the Project Name as the value
        Proactive_Community_Grants_Round__c: 'Ethereum Protocol Fellowship', // this value is hardwired, depending on the type of grant round
        LeadSource: 'Webform',
        RecordTypeId: process.env.SF_RECORD_TYPE_EPF!
      };

      // Single record creation
      conn.sobject('Lead').create(application, async (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        }

        console.log(`EPF Application Lead with ID: ${ret.id} has been created!`);

        res.status(200).json({ status: 'ok' });
        return resolve();
      });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
