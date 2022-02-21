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
    projectName: Project_Name__c,
    projectRepo: Github_Link__c,
    projectPreviousWork: Previous_Work__c,
    projectDescription: Project_Description__c,
    whyIsProjectImportant: Impact__c,
    howDoesYourProjectDiffer: How_is_it_different__c,
    projectRequestedAmount: Requested_Amount__c,
    proposedTimeline: Proposed_Timeline__c,
    isYourProjectPublicGood: Is_it_a_Public_Good__c,
    isOpenSource: Is_it_Open_Source__c,
    sustainabilityPlan: Sustainability_Plan__c,
    otherProjects: Other_Projects__c,
    repeatApplicant: Repeat_Applicant__c,
    progress: Progress__c,
    otherFunding: Other_Funding__c,
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
        FirstName: FirstName.trim(),
        LastName: LastName.trim(),
        Email: Email.trim(),
        Individual_or_Team__c: Individual_or_Team__c.trim(),
        Company: Company.trim(),
        Team_Profile__c: Team_Profile__c.trim(),
        Website: Website.trim(),
        Twitter__c: Twitter__c.trim(),
        Category__c: Category__c.trim(),
        Project_Name__c: Project_Name__c.trim(),
        Github_Link__c: Github_Link__c.trim(),
        Previous_Work__c: Previous_Work__c.trim(),
        Project_Description__c: Project_Description__c.trim(),
        Impact__c: Impact__c.trim(),
        How_is_it_different__c: How_is_it_different__c.trim(),
        Requested_Amount__c: Requested_Amount__c.trim(),
        Proposed_Timeline__c: Proposed_Timeline__c.trim(),
        Is_it_a_Public_Good__c: Is_it_a_Public_Good__c.trim(),
        Is_it_Open_Source__c: Is_it_Open_Source__c.trim(),
        Sustainability_Plan__c: Sustainability_Plan__c.trim(),
        Other_Projects__c: Other_Projects__c.trim(),
        Repeat_Applicant__c: Repeat_Applicant__c.trim(),
        Progress__c: Progress__c.trim(),
        Other_Funding__c: Other_Funding__c.trim(),
        Additional_Information__c: Additional_Information__c.trim()
        // TODO: add RecordTypeId: 'Small Grants' when defined
      },
      (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
        } else {
          console.log(`Small Grants Lead (project) with ID: ${ret.id} has been created!`);

          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });
}
