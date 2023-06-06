import jsforce from 'jsforce';
import { NextApiResponse } from 'next';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';

import { RunANodeData, RunANodeSchema } from '../../components/forms/schemas/RunANode';

async function handler(req: { body: RunANodeData }, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { body: fields } = req;

    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    // validate fields against the schema
    const result = RunANodeSchema.safeParse(fields);
    if (!result.success) {
      const formatted = result.error.format();
      console.error(formatted);

      res.status(500).end();
      return resolve();
    }

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

      // SF mapping
      const application = {
        FirstName: fields.firstName,
        LastName: fields.lastName,
        Email: fields.email,
        Applying_as_a__c: fields.applyingAs,
        Applying_as_Other__c: fields.applyingAsOther,
        Team_Profile__c: fields.teamProfile,
        Time_Zone__c: fields.timezone,
        npsp__CompanyCountry__c: fields.country,
        Project_Name__c: fields.projectName,
        Company: fields.company,
        Project_Description__c: fields.projectDescription,
        Previous_Work__c: fields.projectPreviousWork,
        Hardware__c: fields.hardware,
        Impact__c: fields.whyIsProjectImportant,
        Custom_Build__c: fields.customBuildDetail,
        Download_Speeds__c: fields.downloadSpeed,
        Data_Limitations__c: fields.dataLimitations,
        Commitment__c: fields.commitment,
        Challenges__c: fields.challenges,
        Referral_Source__c: fields.referralSource,
        Referral_Source_if_Other__c: fields.referralSourceIfOther,
        Alternative_Contact__c: fields.telegram,
        Twitter__c: fields.twitter,
        LinkedIn_Profile__c: fields.linkedinProfile,
        Repeat_Applicant__c: fields.repeatApplicant,
        Can_the_EF_reach_out__c: fields.canTheEFReachOut,
        Additional_Information__c: fields.additionalInfo,
        Proactive_Community_Grants_Round__c: 'Run A Node 2023', // this value is hardwired, depending on the type of grant round
        RecordTypeId: process.env.SF_RECORD_TYPE_GRANTS_ROUND!
      };

      // Single record creation
      conn.sobject('Lead').create(application, async (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        }

        console.log(`Run A Node Grants Lead with ID: ${ret.id} has been created!`);

        res.status(200).json({ status: 'ok' });
        return resolve();
      });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
