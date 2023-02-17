import jsforce from 'jsforce';
import { NextApiResponse } from 'next';

import addRowToSpreadsheet from '../../utils/addRowToSpreadsheet';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';

import { AccountAbstractionGrantsNextApiRequest } from '../../types';

async function handler(
  req: AccountAbstractionGrantsNextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise(resolve => {
    const { body } = req;
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
      github: Github__c,
      telegram: Alternative_Contact__c,
      repeatApplicant: Repeat_Applicant__c,
      canTheEFReachOut: Can_the_EF_reach_out__c,
      additionalInfo: Additional_Information__c
    } = body;
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
        FirstName: FirstName.trim(),
        LastName: LastName.trim(),
        Email: Email.trim(),
        Title: Title.trim(),
        Applying_as_a__c: Applying_as_a__c.trim(),
        Applying_as_Other__c: Applying_as_Other__c.trim(),
        Company: Company.trim(),
        npsp__CompanyCountry__c: npsp__CompanyCountry__c.trim(),
        Countries_of_Team__c: Countries_of_Team__c.trim(),
        Time_Zone__c: Time_Zone__c.trim(),
        Project_Name__c: Project_Name__c.trim(),
        Project_Description__c: Project_Description__c.trim(),
        Category__c: Category__c.trim(),
        Requested_Amount__c: Requested_Amount__c.trim(),
        Referral_Source__c: Referral_Source__c.trim(),
        Referral_Source_if_Other__c: Referral_Source_if_Other__c.trim(),
        Would_you_share_your_research__c: Would_you_share_your_research__c.trim(),
        Twitter__c: Twitter__c.trim(),
        Github__c: Github__c.trim(),
        Alternative_Contact__c: Alternative_Contact__c.trim(),
        Repeat_Applicant__c, // this is a boolean value, no trim applied
        Can_the_EF_reach_out__c, // this is a boolean value, no trim applied
        Additional_Information__c: Additional_Information__c.trim(),
        Proactive_Community_Grants_Round__c: 'Account Abstraction Community Grants 2023', // this value is hardwired, depending on the type of grant round
        RecordTypeId: process.env.SF_RECORD_TYPE_GRANTS_ROUND! // Master
      };

      try {
        await addRowToSpreadsheet(
          {
            id: '1MUH1hUdeHpTRXEYLzpokHEV1tQYHmy83RDpl7ny-wxQ',
            sheetName: 'Applications'
          },
          application
        );
      } catch (err) {
        // as this is something internal we don't want to show this error to the user
        console.log(err);
      }

      res.status(200).json({ status: 'ok' });
      return resolve();

      // Single record creation
      // conn.sobject('Lead').create(application, async (err, ret) => {
      //   if (err || !ret.success) {
      //     console.error(err);
      //     res.status(400).json({ status: 'fail' });
      //     return resolve();
      //   }

      //   // send submission data to a google spreadsheet
      //   try {
      //     await addRowToSpreadsheet(
      //       {
      //         id: '1MUH1hUdeHpTRXEYLzpokHEV1tQYHmy83RDpl7ny-wxQ',
      //         sheetName: 'Applications'
      //       },
      //       application
      //     );
      //   } catch (err) {
      //     // as this is something internal we don't want to show this error to the user
      //     console.log(err);
      //   }

      //   console.log(`Account Abstraction Grants 2023 Lead with ID: ${ret.id} has been created!`);

      //   res.status(200).json({ status: 'ok' });
      //   return resolve();
      // });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
