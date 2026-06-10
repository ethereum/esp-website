import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import {
  getSalesforceObjectMetadata,
  type SalesforceObjectMetadata,
  type SalesforceFieldMetadata
} from '../../lib/sf/metadata';
import {
  HARDWIRED_FIELDS,
  getSalesforceFieldsForForm,
  type FormType
} from '../../lib/sf-field-mappings';
import {
  PROFILE_TYPE_OPTIONS,
  DOMAIN_OPTIONS,
  OUTPUT_OPTIONS,
  TIMEZONE_OPTIONS,
  FIAT_CURRENCY_OPTIONS
} from '../../components/forms/constants';

/**
 * Salesforce Contract Tests
 *
 * These tests validate form field mappings against actual Salesforce schema.
 * They query the Salesforce metadata API to ensure:
 * - All mapped fields exist in Salesforce
 * - Picklist values are valid
 */

describe('Salesforce Contract Tests - Application__c', () => {
  let applicationMetadata: SalesforceObjectMetadata | null = null;

  beforeAll(async () => {
    try {
      applicationMetadata = await getSalesforceObjectMetadata('Application__c');
    } catch (error) {
      console.error('Failed to fetch Salesforce metadata:', error);
      throw error;
    }
  }, 30000); // 30 second timeout for SF API call

  /**
   * Ensure metadata is available before each test
   * Throws an error if metadata fetch failed, making test failures explicit in CI/CD
   */
  beforeEach(() => {
    if (!applicationMetadata) {
      throw new Error(
        'Salesforce metadata not available. Ensure SF credentials are configured in .env.local'
      );
    }
  });

  /**
   * Helper function to get field metadata by name
   */
  const getFieldMetadata = (fieldName: string): SalesforceFieldMetadata | undefined => {
    return applicationMetadata?.fields.find(f => f.name === fieldName);
  };

  /**
   * Helper function to check if a field exists
   */
  const fieldExists = (fieldName: string): boolean => {
    return !!getFieldMetadata(fieldName);
  };

  /**
   * Helper function to get all mapped Salesforce fields for a form type
   */
  const getMappedFields = (formType: FormType): string[] => {
    return getSalesforceFieldsForForm(formType);
  };

  /**
   * Validate that form picklist values match Salesforce picklist options
   * @param sfFieldName - Salesforce field name (e.g., 'Application_ProfileType__c')
   * @param formValues - Array of form values to validate
   * @param fieldDisplayName - Optional display name for error messages (defaults to sfFieldName)
   * @returns Validation result with any invalid values found
   */
  const validatePicklistValues = (
    sfFieldName: string,
    formValues: string[],
    fieldDisplayName?: string
  ): {
    field: string;
    invalidValues: string[];
    validSFValues: string[];
  } => {
    const fieldMetadata = getFieldMetadata(sfFieldName);
    if (!fieldMetadata) {
      throw new Error(`Field ${sfFieldName} not found in Salesforce metadata`);
    }

    if (!fieldMetadata.picklistValues) {
      throw new Error(`Field ${sfFieldName} is not a picklist field`);
    }

    // Get active picklist values from Salesforce
    const validSFValues = fieldMetadata.picklistValues.filter(pv => pv.active).map(pv => pv.value);

    // Find invalid form values
    const invalidValues = formValues.filter(formValue => !validSFValues.includes(formValue));

    return {
      field: fieldDisplayName || sfFieldName,
      invalidValues,
      validSFValues
    };
  };

  /**
   * Form type configurations for parameterized tests
   */
  const formTypeConfigs: Array<{ formType: FormType; displayName: string }> = [
    { formType: 'rfp', displayName: 'RFP' },
    { formType: 'directGrant', displayName: 'Direct Grant' },
    { formType: 'wishlist', displayName: 'Wishlist' },
    { formType: 'officeHours', displayName: 'Office Hours' }
  ];

  /**
   * Parameterized test suite for all form type field mappings
   */
  describe.each(formTypeConfigs)('$displayName Form', ({ formType }) => {
    it('should map all fields to existing Salesforce fields', () => {
      const mappedFields = getMappedFields(formType);
      const missingFields = mappedFields.filter(fieldName => !fieldExists(fieldName));

      expect(missingFields).toEqual([]);
    });
  });

  /**
   * Office Hours specific picklist validation
   */
  describe('Office Hours Form - Picklist Validation', () => {
    it('should validate Office Hours request type picklist values match SF options', () => {
      const officeHoursRequestValues = ['Advice', 'Project Feedback'];

      const result = validatePicklistValues(
        'Application_OfficeHours_RequestType__c',
        officeHoursRequestValues,
        'Office Hours Request Type'
      );

      expect(result.invalidValues.length).toBe(0);
    });
  });

  /**
   * Cross-form validation tests
   */
  describe('Cross-Form Validation', () => {
    it('should validate all hardwired fields exist', () => {
      const allFormTypes: FormType[] = ['rfp', 'directGrant', 'wishlist', 'officeHours'];
      const missingFields: Array<{ formType: FormType; field: string }> = [];

      for (const formType of allFormTypes) {
        const hardwired = HARDWIRED_FIELDS[formType];
        for (const fieldName of Object.keys(hardwired)) {
          if (!fieldExists(fieldName)) {
            missingFields.push({ formType, field: fieldName });
          }
        }
      }

      expect(missingFields).toEqual([]);
    });

    it('should validate common fields exist across all forms', () => {
      const commonFields = [
        'Application_FirstName__c',
        'Application_LastName__c',
        'Application_Email__c',
        'Application_Company__c',
        'Application_Stage__c',
        'Application_Source__c'
      ];

      for (const fieldName of commonFields) {
        expect(fieldExists(fieldName)).toBe(true);
      }
    });

    it('should validate profile type picklist values match SF options', () => {
      const profileTypeResult = validatePicklistValues(
        'Application_ProfileType__c',
        PROFILE_TYPE_OPTIONS.map(opt => opt.value),
        'Profile Type'
      );
      expect(profileTypeResult.invalidValues.length).toBe(0);
    });

    it('should validate domain picklist values match SF options', () => {
      const domainResult = validatePicklistValues(
        'Application_Domain__c',
        DOMAIN_OPTIONS.map(opt => opt.value),
        'Domain'
      );
      expect(domainResult.invalidValues.length).toBe(0);
    });

    it('should validate output picklist values match SF options', () => {
      const outputResult = validatePicklistValues(
        'Application_Output__c',
        OUTPUT_OPTIONS.map(opt => opt.value),
        'Output'
      );
      expect(outputResult.invalidValues.length).toBe(0);
    });

    it('should validate timezone picklist values match SF options', () => {
      const timezoneResult = validatePicklistValues(
        'Application_Time_Zone__c',
        TIMEZONE_OPTIONS.map(opt => opt.value),
        'Timezone'
      );
      expect(timezoneResult.invalidValues.length).toBe(0);
    });

    it('should validate currency picklist values match SF options', () => {
      const currencyResult = validatePicklistValues(
        'CurrencyIsoCode',
        FIAT_CURRENCY_OPTIONS.map(opt => opt.value),
        'Currency'
      );
      expect(currencyResult.invalidValues.length).toBe(0);
    });
  });
});
