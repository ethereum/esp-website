import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';
import { TenYearAnniversarySchema } from '../../components/forms/schemas/TenYearAnniversary';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    // validate fields against the schema
    const result = TenYearAnniversarySchema.safeParse(req.body);
    if (!result.success) {
      const formatted = result.error.format();
      console.error(formatted);

      res.status(500).end();
      return resolve();
    }

    const conn = new jsforce.Connection({
      loginUrl: SF_PROD_LOGIN_URL
    });

    conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
      if (err) {
        console.error(err);
        res.status(500).end();
        return resolve();
      }

      // SF mapping
      const application = {
        FirstName: result.data.firstName,
        LastName: result.data.lastName,
        Email: result.data.email,
        Company: result.data.company,
        Team_Profile__c: result.data.teamProfile,
        Previous_Work__c: result.data.previousWork,
        Twitter__c: result.data.twitter,
        Alternative_Contact__c: result.data.alternativeContact,
        npsp__CompanyCountry__c: result.data.country,
        Time_Zone__c: result.data.timezone,
        Project_Name__c: result.data.eventName,
        Sponsorship_Details__c: result.data.eventDescription,
        Sponsorship_Link__c: result.data.eventLink,
        Sponsorship_Date__c: result.data.eventDate,
        Event_location__c: result.data.eventLocation,
        Proposed_Timeline__c: result.data.proposedTimeline,
        CurrencyIsoCode: result.data.fiatCurrency,
        Sponsorship_Monetary_Request__c: result.data.requestedAmount,
        Referral_Source__c: result.data.referralSource,
        Referrals__c: result.data.referrals,
        Additional_Information__c: result.data.additionalInfo,
        Proactive_Community_Grants_Round__c: '10 Years of Ethereum Meet Ups',
        LeadSource: 'Webform',
        RecordTypeId: process.env.SF_RECORD_TYPE_SPONSORSHIPS!,
        Category__c: 'Community Event',
        Type_of_Event__c: 'Meetup'
      };

      // Single record creation
      conn.sobject('Lead').create(application, (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        }

        console.log(`10 Year Anniversary Lead with ID: ${ret.id} has been created!`);

        res.status(200).json({ status: 'ok' });
        return resolve();
      });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
