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
    projectName: Project_Name__c,
    projectDescription: Project_Description__c,
    additionalInfo: Additional_Information__c,
    projectCategory: Category__c,
    howDidYouHearAboutESP: Referral_Source__c,
    reasonForMeeting: Reason_for_meeting__c,
    otherReasonForMeeting: Reason_for_meeting_if_Other__c,
    timezone: Time_Zone__c
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

    // Single record creation
    conn.sobject('Lead').create(
      {
        FirstName: FirstName.trim(),
        LastName: LastName.trim(),
        Email: Email.trim(),
        Company: Company.trim(),
        Individual_or_Team__c: Individual_or_Team__c.trim(),
        Project_Name__c: Project_Name__c.trim(),
        Project_Description__c: Project_Description__c.trim(),
        Additional_Information__c: Additional_Information__c.trim(),
        Category__c: Category__c.trim(),
        Referral_Source__c: Referral_Source__c.trim(),
        Reason_for_meeting__c: Reason_for_meeting__c.trim(),
        Reason_for_meeting_if_Other__c: Reason_for_meeting_if_Other__c.trim(),
        Time_Zone__c: Time_Zone__c.trim()
        // TODO: add RecordTypeId: 'Office Hours' when defined
      },
      (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
        } else {
          console.log(`Office Hours Lead with ID: ${ret.id} has been created!`);

          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });
}
