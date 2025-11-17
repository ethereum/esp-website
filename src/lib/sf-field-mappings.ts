/**
 * Centralized Salesforce field mappings for all form types
 *
 * This module contains the mapping between form field names and Salesforce field names
 * for each form type. It also includes hardwired field values that are set for each form.
 */

export type FormType = 'rfp' | 'directGrant' | 'wishlist' | 'officeHours';

/**
 * Field mapping configuration
 * Maps form field names to Salesforce field names
 */
export interface FieldMapping {
  [formField: string]: string | { hardwired: Record<string, any> };
}

/**
 * Hardwired field values for each form type
 */
export interface HardwiredFields {
  Application_Stage__c: 'New';
  Application_Source__c: 'Webform';
  RecordTypeId: string;
  [key: string]: any;
}

/**
 * Field mappings for RFP form
 */
const rfpMapping: FieldMapping = {
  // Contact Information
  firstName: 'Application_FirstName__c',
  lastName: 'Application_LastName__c',
  email: 'Application_Email__c',
  company: 'Application_Company__c',
  profileType: 'Application_ProfileType__c',
  otherProfileType: 'Application_Other_ProfileType__c',
  alternativeContact: 'Application_Alternative_Contact__c',
  website: 'Application_Website__c',
  country: 'Application_Country__c',
  timezone: 'Application_Time_Zone__c',

  // Project Overview
  projectName: 'Name',
  projectSummary: 'Application_ProjectDescription__c',
  projectRepo: 'Application_ProjectRepo__c',
  domain: 'Application_Domain__c',
  output: 'Application_Output__c',
  budgetRequest: 'Application_RequestedAmount__c',
  currency: 'CurrencyIsoCode',

  // Additional Details
  repeatApplicant: 'Application_Repeat_Applicant__c',
  referral: 'Application_Referral__c',
  additionalInfo: 'Application_AdditionalInformation__c',
  opportunityOutreachConsent: 'Application_OutreachConsent__c',

  // RFP-specific
  selectedRFPId: 'Grant_Initiative__c'
};

/**
 * Field mappings for Direct Grant form
 */
const directGrantMapping: FieldMapping = {
  // Contact Information
  firstName: 'Application_FirstName__c',
  lastName: 'Application_LastName__c',
  email: 'Application_Email__c',
  company: 'Application_Company__c',
  profileType: 'Application_ProfileType__c',
  otherProfileType: 'Application_Other_ProfileType__c',
  alternativeContact: 'Application_Alternative_Contact__c',
  website: 'Application_Website__c',
  country: 'Application_Country__c',
  timezone: 'Application_Time_Zone__c',
  applicantProfile: 'Application_Profile__c',

  // Project Overview
  projectName: 'Name',
  projectSummary: 'Application_ProjectDescription__c',
  projectRepo: 'Application_ProjectRepo__c',
  domain: 'Application_Domain__c',
  output: 'Application_Output__c',
  budgetRequest: 'Application_RequestedAmount__c',
  currency: 'CurrencyIsoCode',

  // Project Details
  projectStructure: 'Application_ProjectStructure__c',
  sustainabilityPlan: 'Application_SustainabilityPlan__c',
  funding: 'Application_OtherFunding__c',
  problemBeingSolved: 'Application_Problem__c',
  measuredImpact: 'Application_MeasuredImpact__c',
  successMetrics: 'Application_SuccessMetric__c',
  ecosystemFit: 'Application_EcosystemFit__c',
  communityFeedback: 'Application_CommunityFeedback__c',
  openSourceLicense: 'Application_Open_Source_License_Picklist__c',

  // Additional Details
  repeatApplicant: 'Application_Repeat_Applicant__c',
  referral: 'Application_Referral__c',
  additionalInfo: 'Application_AdditionalInformation__c',
  opportunityOutreachConsent: 'Application_OutreachConsent__c'
};

/**
 * Field mappings for Wishlist form
 */
const wishlistMapping: FieldMapping = {
  // Contact Information
  firstName: 'Application_FirstName__c',
  lastName: 'Application_LastName__c',
  email: 'Application_Email__c',
  company: 'Application_Company__c',
  profileType: 'Application_ProfileType__c',
  otherProfileType: 'Application_Other_ProfileType__c',
  alternativeContact: 'Application_Alternative_Contact__c',
  website: 'Application_Website__c',
  country: 'Application_Country__c',
  timezone: 'Application_Time_Zone__c',
  applicantProfile: 'Application_Profile__c',

  // Project Overview
  projectName: 'Name',
  projectSummary: 'Application_ProjectDescription__c',
  projectRepo: 'Application_ProjectRepo__c',
  domain: 'Application_Domain__c',
  output: 'Application_Output__c',
  budgetRequest: 'Application_RequestedAmount__c',
  currency: 'CurrencyIsoCode',

  // Project Details
  projectStructure: 'Application_ProjectStructure__c',
  sustainabilityPlan: 'Application_SustainabilityPlan__c',
  funding: 'Application_OtherFunding__c',
  problemBeingSolved: 'Application_Problem__c',
  measuredImpact: 'Application_MeasuredImpact__c',
  successMetrics: 'Application_SuccessMetric__c',
  ecosystemFit: 'Application_EcosystemFit__c',
  communityFeedback: 'Application_CommunityFeedback__c',
  openSourceLicense: 'Application_Open_Source_License_Picklist__c',

  // Additional Details
  repeatApplicant: 'Application_Repeat_Applicant__c',
  referral: 'Application_Referral__c',
  additionalInfo: 'Application_AdditionalInformation__c',
  opportunityOutreachConsent: 'Application_OutreachConsent__c',

  // Wishlist-specific
  selectedWishlistId: 'Grant_Initiative__c'
};

/**
 * Field mappings for Office Hours form
 */
const officeHoursMapping: FieldMapping = {
  // Contact Information
  firstName: 'Application_FirstName__c',
  lastName: 'Application_LastName__c',
  email: 'Application_Email__c',
  company: 'Application_Company__c',
  profileType: 'Application_ProfileType__c',
  otherProfileType: 'Application_Other_ProfileType__c',
  alternativeContact: 'Application_Alternative_Contact__c',
  country: 'Application_Country__c',
  timezone: 'Application_Time_Zone__c',

  // Office Hours Request
  officeHoursRequest: 'Application_OfficeHours_RequestType__c',
  officeHoursReason: 'Application_OfficeHours_Reason__c',

  // Project Feedback specific (conditional)
  projectName: 'Name',
  projectSummary: 'Application_ProjectDescription__c',
  projectRepo: 'Application_ProjectRepo__c',
  domain: 'Application_Domain__c',
  additionalInfo: 'Application_AdditionalInformation__c',

  // Additional Details
  repeatApplicant: 'Application_Repeat_Applicant__c',
  opportunityOutreachConsent: 'Application_OutreachConsent__c'
};

/**
 * Hardwired field values for each form type
 */
export const HARDWIRED_FIELDS: Record<FormType, HardwiredFields> = {
  rfp: {
    Application_Stage__c: 'New',
    Application_Source__c: 'Webform',
    RecordTypeId: '012Vj000008xEVOIA2'
  },
  directGrant: {
    Application_Stage__c: 'New',
    Application_Source__c: 'Webform',
    RecordTypeId: '012Vj000008xEVNIA2'
  },
  wishlist: {
    Application_Stage__c: 'New',
    Application_Source__c: 'Webform',
    RecordTypeId: '012Vj000008xEVPIA2'
  },
  officeHours: {
    Application_Stage__c: 'New',
    Application_Source__c: 'Webform',
    RecordTypeId: '012Vj000008z3fVIAQ'
  }
};

/**
 * All field mappings by form type
 */
export const SF_FIELD_MAPPINGS: Record<FormType, FieldMapping> = {
  rfp: rfpMapping,
  directGrant: directGrantMapping,
  wishlist: wishlistMapping,
  officeHours: officeHoursMapping
};

/**
 * Map form data to Salesforce format
 * @param formData - The form data object
 * @param formType - The form type
 * @returns Salesforce-formatted data object
 */
export const mapFormDataToSalesforce = (
  formData: Record<string, any>,
  formType: FormType
): Record<string, any> => {
  const mapping = SF_FIELD_MAPPINGS[formType];
  const hardwired = HARDWIRED_FIELDS[formType];

  const salesforceData: Record<string, any> = {
    ...hardwired
  };

  // Map form fields to Salesforce fields
  for (const [formField, sfField] of Object.entries(mapping)) {
    const formValue = formData[formField];

    // Skip undefined/null values unless they're explicitly set
    if (formValue === undefined || formValue === null) {
      continue;
    }

    if (typeof sfField === 'string') {
      salesforceData[sfField] = formValue;
    }
  }

  // Handle company fallback logic (if company is empty, use firstName + lastName)
  if (formData.company === '' || formData.company === null || formData.company === undefined) {
    if (formData.firstName && formData.lastName) {
      const companyField = mapping.company;
      if (typeof companyField === 'string') {
        salesforceData[companyField] = `${formData.firstName} ${formData.lastName}`;
      }
    }
  }

  return salesforceData;
};

/**
 * Get all Salesforce field names used by a form type
 * @param formType - The form type
 * @returns Array of Salesforce field names
 */
export const getSalesforceFieldsForForm = (formType: FormType): string[] => {
  const mapping = SF_FIELD_MAPPINGS[formType];
  const hardwired = HARDWIRED_FIELDS[formType];

  const fields: string[] = Object.keys(hardwired);

  for (const sfField of Object.values(mapping)) {
    if (typeof sfField === 'string' && !fields.includes(sfField)) {
      fields.push(sfField);
    }
  }

  return fields;
};
