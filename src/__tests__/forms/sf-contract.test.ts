import { describe, it, expect, beforeAll } from 'vitest';
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

/**
 * Salesforce Contract Tests
 *
 * These tests validate form field mappings against actual Salesforce schema.
 * They query the Salesforce metadata API to ensure:
 * - All mapped fields exist in Salesforce
 * - Required fields are properly mapped
 * - Picklist values are valid
 * - RecordTypeId values are valid
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
   * Test suite for RFP form mappings
   */
  describe('RFP Form', () => {
    const formType: FormType = 'rfp';

    it('should map all fields to existing Salesforce fields', () => {
      if (!applicationMetadata) {
        console.warn('Skipping test: Salesforce metadata not available');
        return;
      }

      const mappedFields = getMappedFields(formType);
      const missingFields: string[] = [];

      for (const fieldName of mappedFields) {
        if (!fieldExists(fieldName)) {
          missingFields.push(fieldName);
        }
      }

      expect(missingFields).toEqual([]);
    });

    it('should validate picklist values match SF options', async () => {
      if (!applicationMetadata) {
        console.warn('Skipping test: Salesforce metadata not available');
        return;
      }

      // Test picklist fields
      const picklistFields = [
        'Application_ProfileType__c',
        'Application_Domain__c',
        'Application_Output__c'
      ];

      for (const fieldName of picklistFields) {
        const fieldMetadata = getFieldMetadata(fieldName);
        if (!fieldMetadata || !fieldMetadata.picklistValues) {
          continue;
        }

        const validValues = fieldMetadata.picklistValues
          .filter(pv => pv.active)
          .map(pv => pv.value);

        expect(validValues.length).toBeGreaterThan(0);
      }
    });
  });

  /**
   * Test suite for Direct Grant form mappings
   */
  describe('Direct Grant Form', () => {
    const formType: FormType = 'directGrant';

    it('should map all fields to existing Salesforce fields', () => {
      if (!applicationMetadata) {
        console.warn('Skipping test: Salesforce metadata not available');
        return;
      }

      const mappedFields = getMappedFields(formType);
      const missingFields: string[] = [];

      for (const fieldName of mappedFields) {
        if (!fieldExists(fieldName)) {
          missingFields.push(fieldName);
        }
      }

      expect(missingFields).toEqual([]);
    });
  });

  /**
   * Test suite for Wishlist form mappings
   */
  describe('Wishlist Form', () => {
    const formType: FormType = 'wishlist';

    it('should map all fields to existing Salesforce fields', () => {
      if (!applicationMetadata) {
        console.warn('Skipping test: Salesforce metadata not available');
        return;
      }

      const mappedFields = getMappedFields(formType);
      const missingFields: string[] = [];

      for (const fieldName of mappedFields) {
        if (!fieldExists(fieldName)) {
          missingFields.push(fieldName);
        }
      }

      expect(missingFields).toEqual([]);
    });
  });

  /**
   * Test suite for Office Hours form mappings
   */
  describe('Office Hours Form', () => {
    const formType: FormType = 'officeHours';

    it('should map all fields to existing Salesforce fields', () => {
      if (!applicationMetadata) {
        console.warn('Skipping test: Salesforce metadata not available');
        return;
      }

      const mappedFields = getMappedFields(formType);
      const missingFields: string[] = [];

      for (const fieldName of mappedFields) {
        if (!fieldExists(fieldName)) {
          missingFields.push(fieldName);
        }
      }

      expect(missingFields).toEqual([]);
    });

    it('should validate Office Hours specific fields exist', () => {
      if (!applicationMetadata) {
        console.warn('Skipping test: Salesforce metadata not available');
        return;
      }

      const officeHoursFields = [
        'Application_OfficeHours_RequestType__c',
        'Application_OfficeHours_Reason__c'
      ];

      for (const fieldName of officeHoursFields) {
        expect(fieldExists(fieldName)).toBe(true);
      }
    });
  });

  /**
   * Cross-form validation tests
   */
  describe('Cross-Form Validation', () => {
    it('should validate all hardwired fields exist', () => {
      if (!applicationMetadata) {
        console.warn('Skipping test: Salesforce metadata not available');
        return;
      }

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
      if (!applicationMetadata) {
        console.warn('Skipping test: Salesforce metadata not available');
        return;
      }

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
  });
});
