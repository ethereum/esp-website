import jsforce from 'jsforce';
import { NextApiResponse } from 'next';

import { verifyCaptcha, sanitizeFields } from '../../middlewares';

import { OfficeHoursNextApiRequest } from '../../types';

async function handler(req: OfficeHoursNextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { body } = req;
    const {
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      individualOrTeam: Individual_or_Team__c,
      company: Company,
      officeHoursRequest: Office_Hours_Request__c,
      projectName: Project_Name__c,
      projectDescription: Project_Description__c,
      additionalInfo: Additional_Information__c,
      projectCategory: Category__c,
      otherReasonForMeeting: Reason_for_meeting_if_Other__c,
      howDidYouHearAboutESP: Referral_Source__c,
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
        console.error(err);
        return resolve();
      }

      // Single record creation
      conn.sobject('Lead').create(
        {
          FirstName: FirstName.trim(),
          LastName: LastName.trim(),
          Email: Email.trim(),
          Individual_or_Team__c: Individual_or_Team__c.trim(),
          Company: Company.trim(),
          Office_Hours_Request__c: Office_Hours_Request__c.trim(),
          Project_Name__c: Project_Name__c.trim(),
          Project_Description__c: Project_Description__c.trim(),
          Additional_Information__c: Additional_Information__c.trim(),
          Category__c: Category__c.trim(),
          Reason_for_meeting_if_Other__c: Reason_for_meeting_if_Other__c.trim(),
          Referral_Source__c: Referral_Source__c.trim(),
          Time_Zone__c: Time_Zone__c.trim(),
          RecordTypeId: process.env.SF_RECORD_TYPE_OFFICE_HOURS
        },
        (err, ret) => {
          if (err || !ret.success) {
            console.error(err);
            res.status(400).json({ status: 'fail' });
            return resolve();
          } else {
            console.log(`Office Hours Lead with ID: ${ret.id} has been created!`);

            res.status(200).json({ status: 'ok' });
            return resolve();
          }
        }
      );
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
