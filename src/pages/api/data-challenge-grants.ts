import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';
import { DataChallengeSchema } from '../../components/forms/schemas/DataChallenge4844';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { body } = req;
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    // validate fields against the schema
    const result = DataChallengeSchema.safeParse(body);
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

      const application = {
        FirstName: result.data.firstName,
        LastName: result.data.lastName,
        Email: result.data.email,
        POC_is_authorised_signatory__c: result.data.POCisAuthorisedSignatory,
        Authorised_Signatory_Information__c: result.data.authorisedSignatoryInformation,
        Applying_as_a__c: result.data.applyingAs,
        Applying_as_Other__c: result.data.applyingAsOther,
        Company: result.data.company,
        npsp__CompanyCountry__c: result.data.country,
        Time_Zone__c: result.data.timezone,
        Countries_of_Team__c: result.data.countriesTeam,
        Project_Name__c: result.data.projectName,
        Project_Description__c: result.data.projectDescription,
        Category__c: result.data.projectCategory,
        Github_Link__c: result.data.projectRepoLink,
        Website: result.data.website,
        Referral_Source__c: result.data.referralSource,
        Referral_Source_if_Other__c: result.data.referralSourceIfOther,
        LinkedIn_Profile__c: result.data.linkedin,
        Twitter__c: result.data.twitter,
        Alternative_Contact__c: result.data.alternativeContact,
        Repeat_Applicant__c: result.data.repeatApplicant,
        Can_the_EF_reach_out__c: result.data.canTheEFReachOut,
        Additional_Information__c: result.data.additionalInfo,
        Proactive_Community_Grants_Round__c: '4844 Data Challenge', // this value is hardwired, depending on the type of grant round
        LeadSource: 'Webform',
        RecordTypeId: process.env.SF_RECORD_TYPE_GRANTS_ROUND!
      };

      // Single record creation
      conn.sobject('Lead').create(application, async (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        }

        console.log(`4844 Data Challenge Grants Lead with ID: ${ret.id} has been created!`);

        res.status(200).json({ status: 'ok' });
        return resolve();
      });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
