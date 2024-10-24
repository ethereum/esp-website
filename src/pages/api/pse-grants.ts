import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';
import { PSESchema } from '../../components/forms/schemas/PSEGrants';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { body } = req;
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    // validate fields against the schema
    const result = PSESchema.safeParse(body);
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
        // Project Details
        Project_Name__c: result.data.projectName,
        Project_Description__c: result.data.projectDescription,
        Impact__c: result.data.impact,
        Is_it_Open_Source__c: result.data.isOpenSource ? result.data.openSourceDetails : '',
        File_Attachment_Public_Link__c: result.data.proposalAttachment,
        Github_Link__c: result.data.projectRepoLink,
        Requested_Amount__c: result.data.requestedAmount,

        // Applicant Details
        FirstName: result.data.firstName,
        LastName: result.data.lastName,
        Email: result.data.email,
        Company: result.data.company || `${result.data.firstName} ${result.data.lastName}`,
        Discord__c: result.data.discord,
        Twitter__c: result.data.twitter,
        Alternative_Contact__c: result.data.alternativeContact,
        npsp__CompanyCity__c: result.data.companyCity,
        Website: result.data.website,
        npsp__CompanyCountry__c: result.data.country,
        Countries_of_Team__c: result.data.countriesOfTeam,
        Time_Zone__c: result.data.timezone,

        // Additional Information
        Related_PSE_Project__c: result.data.relatedPSEProject,
        Referrals__c: result.data.referrals,
        Sustainability_Plan__c: result.data.sustainabilityPlan,
        Other_Projects__c: result.data.otherProjects,
        Repeat_Applicant__c: result.data.repeatApplicant,
        Additional_Information__c: result.data.additionalInfo,

        LeadSource: 'Webform',
        Pipeline_Entry__c: 'Privacy and Scaling',
        Category__c: 'Applied ZKP',
        RecordTypeId: process.env.SF_RECORD_TYPE_PSE_GRANTS!
      };

      // Single record creation
      conn.sobject('Lead').create(application, async (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        }

        console.log(`PSE Grants Lead with ID: ${ret.id} has been created!`);

        res.status(200).json({ status: 'ok' });
        return resolve();
      });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
