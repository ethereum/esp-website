import type { NextApiRequest, NextApiResponse } from 'next';

import { multipartyParse } from '../../middlewares/multipartyParse';
import { sanitizeFields } from '../../middlewares/sanitizeFields';
import { verifyCaptcha } from '../../middlewares/verifyCaptcha';
import { MAX_WISHLIST_FILE_SIZE } from '../../constants';

interface WishlistApiRequest extends NextApiRequest {
  body: {
    // Wishlist Selection
    selectedWishlistId: string;

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

    // Project Details
    projectStructure: string;
    sustainabilityPlan: string;
    funding: string;
    problemBeingSolved: string;
    measuredImpact: string;
    successMetrics: string;
    ecosystemFit: string;
    communityFeedback: string;
    openSourceLicense: string;
    applicantProfile: string;

    // Additional Details
    repeatApplicant: boolean;
    referral: string;
    additionalInfo?: string;
    opportunityOutreachConsent: boolean;

    // Required for submission
    captchaToken: string;
  };
}

const handler = async (req: WishlistApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      selectedWishlistId,
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
      projectStructure,
      sustainabilityPlan,
      funding,
      problemBeingSolved,
      measuredImpact,
      successMetrics,
      ecosystemFit,
      communityFeedback,
      openSourceLicense,
      applicantProfile,
      repeatApplicant,
      referral,
      additionalInfo,
      opportunityOutreachConsent
    } = req.body;

    // Validate required fields
    if (!selectedWishlistId || !firstName || !lastName || !email || !company || !projectName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In production, this would create a record in Salesforce
    // const applicationData = {
    //   // Contact Information
    //   Application_FirstName__c: firstName,
    //   Application_LastName__c: lastName,
    //   Application_Email__c: email,
    //   Application_Company__c: company,
    //   Application_ProfileType__c: profileType,
    //   Application_Other_ProfileType__c: otherProfileType,
    //   Application_Alternative_Contact__c: alternativeContact,
    //   Application_Website__c: website,
    //   Application_Country__c: country,
    //   // Time_Zone field
    //
    //   // Project Overview
    //   Application_Name: projectName, // This is the Application Name field
    //   Application_ProjectDescription__c: projectSummary,
    //   Application_ProjectRepo__c: projectRepo,
    //   Application_Domain__c: domain,
    //   Application_Output__c: output,
    //   Application_RequestedAmount__c: budgetRequest,
    //   CurrencyIsoCode: currency,
    //
    //   // Project Details
    //   Application_ProjectStructure__c: projectStructure,
    //   Application_SustainabilityPlan__c: sustainabilityPlan,
    //   Application_OtherFunding__c: funding,
    //   Application_Problem__c: problemBeingSolved,
    //   Application_MeasuredImpact__c: measuredImpact,
    //   Application_SuccessMetric__c: successMetrics,
    //   Application_EcosystemFit__c: ecosystemFit,
    //   Application_CommunityFeedback__c: communityFeedback,
    //   Application_OSSLicense__c: openSourceLicense,
    //   Application_Profile__c: applicantProfile,
    //
    //   // Additional Details
    //   Application_Repeat_Applicant__c: repeatApplicant,
    //   Application_Referral__c: referral,
    //   Application_AdditionalInformation__c: additionalInfo,
    //   Application_OutreachConsent__c: opportunityOutreachConsent,
    //
    //   // Hardwired fields
    //   Grants_Initiative_Item__c: selectedWishlistId, // Maps to Grants_Initiative RecordId
    //   Application_Stage__c: 'New',
    //   RecordTypeId: 'WISHLIST_APPLICATION_RECORD_TYPE_ID'
    // };

    // const result = await salesforceConnection.sobject('Application__c').create(applicationData);

    console.log('Wishlist application submitted:', {
      selectedWishlistId,
      projectName,
      applicant: `${firstName} ${lastName}`,
      email
    });

    res.status(200).json({
      success: true,
      message: 'Wishlist application submitted successfully',
      applicationId: `WL_APP_${Date.now()}`
    });
  } catch (error) {
    console.error('Error submitting wishlist application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

export default multipartyParse(sanitizeFields(verifyCaptcha(handler)), {
  maxFileSize: MAX_WISHLIST_FILE_SIZE
});
