import jsforce from 'jsforce';
import { NextApiResponse } from 'next';

import addRowToSpreadsheet from '../../utils/addRowToSpreadsheet';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';

import { RunANodeGrantsNextApiRequest } from '../../types';

const googleSpreadsheetId = process.env.GOOGLE_DEVCON_SPREADSHEET_ID;
const googleSheetName = process.env.GOOGLE_DEVCON_SHEET_NAME;

async function handler(req: RunANodeGrantsNextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { body } = req;
    const {
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      applyingAs: Applying_as_a__c,
      applyingAsOther: Applying_as_Other__c,
      teamProfile: Team_Profile__c,
      timezone: Time_Zone__c,
      country: npsp__CompanyCountry__c,
      projectName: Project_Name__c,
      company: Company,
      projectDescription: Project_Description__c,
      projectPreviousWork: Previous_Work__c,
      whyIsProjectImportant: Impact__c,
      hardwareOrStipend: Hardware_or_Stipend__c,
      stipendDescription: Stipend_Description__c,
      downloadSpeed: Download_Speed__c,
      dataLimitations: Data_Limitations__c,
      proposedTimeline: Proposed_Timeline__c,
      challenges: Challenges__c,
      referralSource: Referral_Source__c,
      referralSourceIfOther: Referral_Source_if_Other__c,
      telegram: Alternative_Contact__c,
      twitter: Twitter__c,
      linkedinProfile: LinkedIn_Profile__c,
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
        Applying_as_a__c: Applying_as_a__c.trim(),
        Applying_as_Other__c: Applying_as_Other__c.trim(),
        Team_Profile__c: Team_Profile__c.trim(),
        Time_Zone__c: Time_Zone__c.trim(),
        npsp__CompanyCountry__c: npsp__CompanyCountry__c.trim(),
        Project_Name__c: Project_Name__c.trim(),
        Company: Company.trim(),
        Project_Description__c: Project_Description__c.trim(),
        Previous_Work__c: Previous_Work__c.trim(),
        Impact__c: Impact__c.trim(),
        Hardware_or_Stipend__c: Hardware_or_Stipend__c.trim(),
        Stipend_Description__c: Stipend_Description__c.trim(),
        Download_Speed__c: Download_Speed__c.trim(),
        Data_Limitations__c: Data_Limitations__c.trim(),
        Proposed_Timeline__c: Proposed_Timeline__c.trim(),
        Challenges__c: Challenges__c.trim(),
        Referral_Source__c: Referral_Source__c.trim(),
        Referral_Source_if_Other__c: Referral_Source_if_Other__c.trim(),
        Alternative_Contact__c: Alternative_Contact__c.trim(),
        Twitter__c: Twitter__c.trim(),
        LinkedIn_Profile__c: LinkedIn_Profile__c.trim(),
        Repeat_Applicant__c: Repeat_Applicant__c.trim(),
        Can_the_EF_reach_out__c: Can_the_EF_reach_out__c.trim(),
        Additional_Information__c: Additional_Information__c.trim(),
        Proactive_Community_Grants_Round__c: 'Run A Node 2023', // this value is hardwired, depending on the type of grant round
        Category__c: 'Community event', // this value is hardwired for Devcon Grants
        RecordTypeId: process.env.SF_RECORD_TYPE_PROJECT_GRANTS!
      };

      console.log({ application });

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
      //         id: googleSpreadsheetId!,
      //         sheetName: googleSheetName!
      //       },
      //       application
      //     );
      //   } catch (err) {
      //     // as this is something internal we don't want to show this error to the user
      //     console.log(err);
      //   }

      //   console.log(`Devcon Grants Lead with ID: ${ret.id} has been created!`);

      //   res.status(200).json({ status: 'ok' });
      //   return resolve();
      // });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
