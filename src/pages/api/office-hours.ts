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
  const { SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_SECURITY_TOKEN } = process.env;

  const conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: SF_LOGIN_URL
  });

  conn.login(SF_USERNAME!, `${SF_PASSWORD}${SF_SECURITY_TOKEN}`, err => {
    if (err) {
      return console.error(err);
    }

    // Single record creation
    conn.sobject('Lead').create(
      {
        FirstName,
        LastName,
        Email,
        // Company is a required field in SF, we're using the Name as default value if no company provided
        Company: Company === '' ? `${FirstName} ${LastName}` : Company,
        Individual_or_Team__c,
        Project_Name__c,
        Project_Description__c,
        Additional_Information__c,
        Category__c,
        Referral_Source__c,
        // TODO: enable these fields when available on SF's sandbox
        // Reason_for_meeting__c
        // Reason_for_meeting_if_Other__c
        Time_Zone__c
        // TODO: add RecordTypeId when defined
      },
      (err, ret) => {
        if (err || !ret.success) {
          console.error({ err });
          res.status(400).json({ status: 'fail' });
        }
        console.log('SUCCESS!');
        res.status(200).json({ status: 'ok' });
      }
    );
  });
}
