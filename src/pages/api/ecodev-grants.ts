import jsforce from 'jsforce';
import { NextApiResponse } from 'next';

import { verifyCaptcha } from '../../middlewares';

import { EcodevGrantsNextApiRequest } from '../../types';

async function handler(req: EcodevGrantsNextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const {
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    company: Company,
    country: npsp__CompanyCountry__c,
    projectName: Project_Name__c,
    projectDescription: Project_Description__c,
    projectCategory: Category__c,
    website: Website,
    problemBeingSolved: Problem_Being_Solved__c,
    isYourProjectPublicGood: Is_it_a_Public_Good__c,
    requestedAmount: Requested_Amount__c,
    proposedTimeline: Proposed_Timeline__c,
    twitter: Twitter__c,
    githubUser: Github_Username__c,
    repeatApplicant: Repeat_Applicant__c,
    additionalInfo: Additional_Information__c,
    howDidYouHearAboutESP: Referral_Source__c
  } = body;
  const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
    process.env;

  const conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: SF_PROD_LOGIN_URL
  });

  conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
    if (err) {
      return console.error(err);
    }

    const application = {
      FirstName: FirstName.trim(),
      LastName: LastName.trim(),
      Email: Email.trim(),
      Company: Company.trim(),
      npsp__CompanyCountry__c: npsp__CompanyCountry__c.trim(),
      Project_Name__c: Project_Name__c.trim(),
      Project_Description__c: Project_Description__c.trim(),
      Category__c: Category__c.trim(),
      Website: Website.trim(),
      Problem_Being_Solved__c: Problem_Being_Solved__c.trim(),
      Is_it_a_Public_Good__c: Is_it_a_Public_Good__c.trim(),
      Requested_Amount__c: Requested_Amount__c.trim(),
      Proposed_Timeline__c: Proposed_Timeline__c.trim(),
      Twitter__c: Twitter__c.trim(),
      Github_Username__c: Github_Username__c.trim(),
      Repeat_Applicant__c, // this is a boolean value, no trim applied
      Additional_Information__c: Additional_Information__c.trim(),
      Referral_Source__c: Referral_Source__c.trim(),
      RecordTypeId: process.env.SF_RECORD_TYPE_GRANTS_ROUND!
    };

    // Single record creation
    conn.sobject('Lead').create(application, async (err, ret) => {
      if (err || !ret.success) {
        console.error(err);
        res.status(400).json({ status: 'fail' });
        return;
      }

      console.log(`Ecodev Grants Lead with ID: ${ret.id} has been created!`);

      res.status(200).json({ status: 'ok' });
    });
  });
}

export default verifyCaptcha(handler);
