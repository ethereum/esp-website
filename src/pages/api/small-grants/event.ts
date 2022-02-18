import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const {
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    individualOrTeam: Individual_or_Team__c,
    company: Company,
    individualOrTeamSummary: Team_Profile__c,
    website: Website,
    twitter: Twitter__c,
    projectCategory: Category__c,
    eventName: Project_Name__c,
    eventDate: Sponsorship_Date__c,
    eventPreviousWork: Previous_Work__c,
    sponsorshipLink: Sponsorship_Link__c,
    sponsorshipDetails: Sponsorship_Details__c,
    sponsorshipTopics: Sponsorship_Request__c,
    eventType: Type_of_Event__c,
    eventFormat: In_Person__c,
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
      return console.error(err);
    }

    let createdLeadID: string;

    // Single record creation
    conn.sobject('Lead').create(
      {
        FirstName,
        LastName,
        Email,
        Individual_or_Team__c,
        Company,
        Team_Profile__c,
        Website,
        Twitter__c,
        Category__c,
        Project_Name__c,
        Sponsorship_Date__c,
        Previous_Work__c,
        Sponsorship_Link__c,
        Sponsorship_Details__c,
        Sponsorship_Request__c,
        Type_of_Event__c,
        In_Person__c,
        Estimated_Number_of_Attendees__c,
        Target_Audience__c,
        Confirmed_Speakers__c,
        Confirmed_Sponsors__c,
        Proposed_Timeline__c,
        Sponsorship_Monetary_Request__c,
        Additional_Information__c
        // TODO: add RecordTypeId: 'Sponsorships' when defined
      },
      (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
        } else {
          console.log(`Small Grants Lead (event) with ID: ${ret.id} has been created!`);

          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });
}
