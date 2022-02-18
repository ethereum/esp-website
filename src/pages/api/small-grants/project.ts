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
        Github_Link__c,
        Previous_Work__c,
        Project_Description__c,
        Impact__c,
        How_is_it_different__c,
        Requested_Amount__c,
        Proposed_Timeline__c,
        Is_it_a_Public_Good__c,
        Is_it_Open_Source__c,
        Sustainability_Plan__c,
        Other_Projects__c,
        Repeat_Applicant__c,
        Progress__c,
        Other_Funding__c,
        Additional_Information__c
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
