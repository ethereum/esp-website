import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';

import addRowToSpreadsheet from '../../utils/addRowToSpreadsheet';

const googleSpreadsheetId = process.env.GOOGLE_DEVCON_SPREADSHEET_ID;
const googleSheetName = process.env.GOOGLE_DEVCON_SHEET_NAME;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const {
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    company: Company,
    eventPreviousWork: Previous_Work__c,
    teamProfile: Team_Profile__c,
    eventName: Project_Name__c,
    eventDate: Sponsorship_Date__c,
    sponsorshipLink: Sponsorship_Link__c,
    sponsorshipDetails: Sponsorship_Details__c,
    projectDescription: Project_Description__c,
    eventType: Type_of_Event__c,
    eventFormat: In_Person__c,
    city: npsp__CompanyCity__c,
    twitter: Twitter__c,
    expectedAttendees: Estimated_Number_of_Attendees__c,
    targetAudience: Target_Audience__c,
    confirmedSpeakers: Confirmed_Speakers__c,
    confirmedSponsors: Confirmed_Sponsors__c,
    proposedTimeline: Proposed_Timeline__c,
    requestedAmount: Requested_Amount__c,
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
      Previous_Work__c: Previous_Work__c.trim(),
      Team_Profile__c: Team_Profile__c.trim(),
      Project_Name__c: Project_Name__c.trim(),
      Sponsorship_Date__c: Sponsorship_Date__c.trim(),
      Sponsorship_Link__c: Sponsorship_Link__c.trim(),
      Sponsorship_Details__c: Sponsorship_Details__c.trim(),
      Project_Description__c: Project_Description__c.trim(),
      Type_of_Event__c: Type_of_Event__c.trim(),
      In_Person__c: In_Person__c.trim(),
      npsp__CompanyCity__c: npsp__CompanyCity__c.trim(),
      Twitter__c: Twitter__c.trim(),
      Estimated_Number_of_Attendees__c: Estimated_Number_of_Attendees__c.trim(),
      Target_Audience__c: Target_Audience__c.trim(),
      Confirmed_Speakers__c: Confirmed_Speakers__c.trim(),
      Confirmed_Sponsors__c: Confirmed_Sponsors__c.trim(),
      Proposed_Timeline__c: Proposed_Timeline__c.trim(),
      Requested_Amount__c: Requested_Amount__c.trim(),
      Additional_Information__c: Additional_Information__c.trim(),
      Referral_Source__c: Referral_Source__c.trim(),
      Proactive_Community_Grants_Round__c: 'Road to Devcon Event Grants', // this value is hardwired, depending on the type of grant round
      RecordTypeId: process.env.SF_RECORD_TYPE_SPONSORSHIPS!
    };

    // Single record creation
    conn.sobject('Lead').create(application, async (err, ret) => {
      if (err || !ret.success) {
        console.error(err);
        res.status(400).json({ status: 'fail' });
        return;
      }

      // send submission data to a google spreadsheet
      try {
        await addRowToSpreadsheet(
          {
            id: googleSpreadsheetId!,
            sheetName: googleSheetName!
          },
          application
        );
      } catch (err) {
        // as this is something internal we don't want to show this error to the user
        console.log(err);
      }

      console.log(`Devcon Grants Lead with ID: ${ret.id} has been created!`);

      res.status(200).json({ status: 'ok' });
    });
  });
}
