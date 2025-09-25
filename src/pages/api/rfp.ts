import type { NextApiRequest, NextApiResponse } from 'next';

import { multipartyParse } from '../../middlewares/multipartyParse';
import { sanitizeFields } from '../../middlewares/sanitizeFields';
import { verifyCaptcha } from '../../middlewares/verifyCaptcha';
import { MAX_WISHLIST_FILE_SIZE } from '../../constants';
import { RFPSchema } from '../../components/forms/schemas/BaseGrant';
import { createSalesforceRecord } from '../../lib/sf';

interface RFPApIRequest extends NextApiRequest {
  body: {
    // RFP Selection
    selectedRFPId: string;

    // Contact Information
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    profileType: string;
    otherProfileType?: string;
    alternativeContact?: string;
    website?: string;
    country: string;
    timezone: string;

    // Project Overview
    projectName: string;
    projectSummary: string;
    projectRepo?: string;
    domain: string;
    output: string;
    budgetRequest: number;
    currency: string;

    // Additional Details
    repeatApplicant: boolean;
    referral: string;
    additionalInfo?: string;
    opportunityOutreachConsent: boolean;

    // Required for submission
    captchaToken: string;
  };
}

const handler = async (req: RFPApIRequest, res: NextApiResponse) => {
  const fields = { ...req.fields, ...req.files };

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // validate fields against the schema
  const result = RFPSchema.safeParse(fields);
  if (!result.success) {
    const formatted = result.error.format();
    console.error(formatted);

    res.status(500).end();
    return;
  }

  try {
    const applicationData = {
      // Contact Information
      Application_FirstName__c: result.data.firstName,
      Application_LastName__c: result.data.lastName,
      Application_Email__c: result.data.email,
      Application_Company__c: result.data.company,
      Application_ProfileType__c: result.data.profileType,
      Application_Other_ProfileType__c: result.data.otherProfileType,
      Application_Alternative_Contact__c: result.data.alternativeContact,
      Application_Website__c: result.data.website,
      Application_Country__c: result.data.country,
      Application_Timezone__c: result.data.timezone,

      // Project Overview
      Application_Name: result.data.projectName,
      Application_ProjectDescription__c: result.data.projectSummary,
      Application_ProjectRepo__c: result.data.projectRepo,
      Application_Domain__c: result.data.domain,
      Application_Output__c: result.data.output,
      Application_RequestedAmount__c: result.data.budgetRequest,
      CurrencyIsoCode: result.data.currency,

      // Additional Details
      Application_Repeat_Applicant__c: result.data.repeatApplicant,
      Application_Referral__c: result.data.referral,
      Application_AdditionalInformation__c: result.data.additionalInfo,
      Application_OutreachConsent__c: result.data.opportunityOutreachConsent,

      // Hardwired fields
      Grants_Initiative_Item__c: result.data.selectedRFPId, // Maps to Grants_Initiative RecordId
      Application_Stage__c: 'New', // ???
      // Team {Grants_Initiative.Owning_Team__c}???
      RecordTypeId: process.env.RFP_APPLICATION_RECORD_TYPE_ID
    };

    const salesforceResult = await createSalesforceRecord('Application__c', applicationData);

    console.log('RFP application submitted:', {
      selectedRFPId: result.data.selectedRFPId,
      projectName: result.data.projectName,
      applicant: `${result.data.firstName} ${result.data.lastName}`,
      email: result.data.email,
      salesforceId: salesforceResult.id
    });

    res.status(200).json({
      success: true,
      message: 'RFP application submitted successfully',
      applicationId: salesforceResult.id
    });
  } catch (error) {
    console.error('Error submitting RFP application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default multipartyParse(sanitizeFields(verifyCaptcha(handler)), {
  maxFileSize: MAX_WISHLIST_FILE_SIZE
});
