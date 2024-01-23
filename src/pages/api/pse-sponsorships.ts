import jsforce from 'jsforce';
import { NextApiResponse } from 'next';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';

import { PSESponsorshipsNextApiRequest } from '../../types';

async function handler(req: PSESponsorshipsNextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { body } = req;
    const {
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      individualOrTeam: Individual_or_Team__c,
      individualOrTeamSummary: Team_Profile__c,
      company: Company,
      city: npsp__CompanyCity__c,
      country: npsp__CompanyCountry__c,
      website: Website,
      twitter: Twitter__c,
      eventName: Project_Name__c,
      eventDate: Sponsorship_Date__c,
      eventPreviousWork: Previous_Work__c,
      eventLink: Sponsorship_Link__c,
      eventDescription: Sponsorship_Details__c,
      eventTopics: Sponsorship_Request__c,
      referrals: Referrals__c,
      pseRationale: PSE_Rationale__c,
      eventType: Type_of_Event__c,
      eventFormat: In_Person__c,
      eventLocation: Event_Location__c,
      expectedAttendees: Estimated_Number_of_Attendees__c,
      targetAudience: Target_Audience__c,
      confirmedSpeakers: Confirmed_Speakers__c,
      confirmedSponsors: Confirmed_Sponsors__c,
      eventBudgetBreakdown: Proposed_Timeline__c,
      eventRequestedAmount: Sponsorship_Monetary_Request__c,
      additionalInfo: Additional_Information__c
    } = body;
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

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
        FirstName: FirstName.trim(),
        LastName: LastName.trim(),
        Email: Email.trim(),
        Individual_or_Team__c: Individual_or_Team__c.trim(),
        Team_Profile__c: Team_Profile__c.trim(),
        Company: Company.trim(),
        npsp__CompanyCity__c: npsp__CompanyCity__c.trim(),
        npsp__CompanyCountry__c: npsp__CompanyCountry__c.trim(),
        Website: Website.trim(),
        Twitter__c: Twitter__c.trim(),
        Project_Name__c: Project_Name__c.trim(),
        Sponsorship_Date__c: Sponsorship_Date__c.trim(),
        Previous_Work__c: Previous_Work__c.trim(),
        Sponsorship_Link__c: Sponsorship_Link__c.trim(),
        Sponsorship_Details__c: Sponsorship_Details__c.trim(),
        Sponsorship_Request__c: Sponsorship_Request__c.trim(),
        Referrals__c: Referrals__c.trim(),
        PSE_Rationale__c: PSE_Rationale__c.trim(),
        Type_of_Event__c: Type_of_Event__c.trim(),
        In_Person__c: In_Person__c.trim(),
        Event_Location__c: Event_Location__c.trim(),
        Estimated_Number_of_Attendees__c,
        Target_Audience__c: Target_Audience__c.trim(),
        Confirmed_Speakers__c: Confirmed_Speakers__c.trim(),
        Confirmed_Sponsors__c: Confirmed_Sponsors__c.trim(),
        Proposed_Timeline__c: Proposed_Timeline__c.trim(),
        Sponsorship_Monetary_Request__c: Sponsorship_Monetary_Request__c.trim(),
        Additional_Information__c: Additional_Information__c.trim(),
        Category__c: 'Community event', // this value is hardwired for PSE Sponsorships
        LeadSource: 'Webform',
        Pipeline_Entry__c: 'Privacy and Scaling',
        RecordTypeId: process.env.SF_RECORD_TYPE_PSE_SPONSORSHIPS!
      };

      // Single record creation
      conn.sobject('Lead').create(application, async (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        }

        console.log(`PSE Sponsorships Lead with ID: ${ret.id} has been created!`);

        res.status(200).json({ status: 'ok' });
        return resolve();
      });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
