import jsforce from 'jsforce';
import { NextApiResponse } from 'next';

import { sanitizeFields, verifyCaptcha } from '../../../middlewares';

import { SmallGrantsProjectNextApiRequest } from '../../../types';

async function handler(req: SmallGrantsProjectNextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { body } = req;
    const {
      // General
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      individualOrTeam: Individual_or_Team__c,
      company: Company,
      city: npsp__CompanyCity__c,
      country: npsp__CompanyCountry__c,
      website: Website,
      twitter: Twitter__c,
      projectCategory: Category__c,
      individualOrTeamSummary: Team_Profile__c,
      howDidYouHearAboutESP: Referral_Source__c,
      referrals: Referrals__c,
      additionalInfo: Additional_Information__c,
      // Project specific (see event.ts for Events)
      projectName: Project_Name__c,
      projectRepo: Github_Link__c,
      projectPreviousWork: Previous_Work__c,
      projectDescription: Project_Description__c,
      problemBeingSolved: Problem_Being_Solved__c,
      whyIsProjectImportant: Impact__c,
      howDoesYourProjectDiffer: How_is_it_different__c,
      fiatCurrency: CurrencyIsoCode,
      projectRequestedAmount: Requested_Amount__c,
      proposedTimeline: Proposed_Timeline__c,
      isYourProjectPublicGood: Is_it_a_Public_Good__c,
      isOpenSource: Is_it_Open_Source__c,
      sustainabilityPlan: Sustainability_Plan__c,
      otherProjects: Other_Projects__c,
      repeatApplicant: Repeat_Applicant__c,
      progress: Progress__c,
      otherFunding: Other_Funding__c
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

      let createdLeadID: string;

      // Single record creation
      conn.sobject('Lead').create(
        {
          FirstName: FirstName.trim(),
          LastName: LastName.trim(),
          Email: Email.trim(),
          Individual_or_Team__c: Individual_or_Team__c.trim(),
          Company: Company.trim(),
          npsp__CompanyCity__c: npsp__CompanyCity__c.trim(),
          npsp__CompanyCountry__c: npsp__CompanyCountry__c.trim(),
          Website: Website.trim(),
          Twitter__c: Twitter__c.trim(),
          Category__c: Category__c.trim(),
          Team_Profile__c: Team_Profile__c.trim(),
          Referral_Source__c: Referral_Source__c.trim(),
          Referrals__c: Referrals__c.trim(),
          Additional_Information__c: Additional_Information__c.trim(),
          Project_Name__c: Project_Name__c.trim(),
          Github_Link__c: Github_Link__c.trim(),
          Previous_Work__c: Previous_Work__c.trim(),
          Project_Description__c: Project_Description__c.trim(),
          Problem_Being_Solved__c: Problem_Being_Solved__c.trim(),
          Impact__c: Impact__c.trim(),
          How_is_it_different__c: How_is_it_different__c.trim(),
          CurrencyIsoCode: CurrencyIsoCode.trim(),
          Requested_Amount__c: Requested_Amount__c.trim(),
          Proposed_Timeline__c: Proposed_Timeline__c.trim(),
          Is_it_a_Public_Good__c: Is_it_a_Public_Good__c.trim(),
          Is_it_Open_Source__c: Is_it_Open_Source__c.trim(),
          Sustainability_Plan__c: Sustainability_Plan__c.trim(),
          Other_Projects__c: Other_Projects__c.trim(),
          Repeat_Applicant__c, // this is a boolean value, no trim applied
          Progress__c: Progress__c.trim(),
          Other_Funding__c: Other_Funding__c.trim(),
          LeadSource: 'Webform',
          RecordTypeId: process.env.SF_RECORD_TYPE_SMALL_GRANTS
        },
        (err, ret) => {
          if (err || !ret.success) {
            console.error(err);
            res.status(400).json({ status: 'fail' });
            return resolve();
          } else {
            console.log(`Small Grants Lead (project) with ID: ${ret.id} has been created!`);

            res.status(200).json({ status: 'ok' });
            return resolve();
          }
        }
      );
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
