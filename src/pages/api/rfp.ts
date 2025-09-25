import type { NextApiRequest, NextApiResponse } from 'next';

import { multipartyParse } from '../../middlewares/multipartyParse';
import { sanitizeFields } from '../../middlewares/sanitizeFields';
import { verifyCaptcha } from '../../middlewares/verifyCaptcha';
import { MAX_WISHLIST_FILE_SIZE } from '../../constants';
import { RFPSchema } from '../../components/forms/schemas/BaseGrant';

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
    const {
      selectedRFPId,
      firstName,
      lastName,
      email,
      company,
      profileType,
      otherProfileType,
      alternativeContact,
      website,
      country,
      timezone,
      projectName,
      projectSummary,
      projectRepo,
      domain,
      output,
      budgetRequest,
      currency,
      repeatApplicant,
      referral,
      additionalInfo,
      opportunityOutreachConsent
    } = result.data;

    // Validate required fields
    if (!selectedRFPId || !firstName || !lastName || !email || !company || !projectName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In production, this would create a record in Salesforce
    // const applicationData = { ... };
    // const result = await salesforceConnection.sobject('Application__c').create(applicationData);

    console.log('RFP application submitted:', {
      selectedRFPId,
      projectName,
      applicant: `${firstName} ${lastName}`,
      email
    });

    res.status(200).json({
      success: true,
      message: 'RFP application submitted successfully',
      applicationId: `RFP_APP_${Date.now()}`
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
