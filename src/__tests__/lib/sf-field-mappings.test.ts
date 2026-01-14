import { describe, it, expect } from 'vitest';
import {
  mapFormDataToSalesforce,
  HARDWIRED_FIELDS,
  SF_FIELD_MAPPINGS,
  type FormType
} from '../../lib/sf-field-mappings';

describe('mapFormDataToSalesforce', () => {
  describe('Hardwired fields', () => {
    const formTypes: FormType[] = ['rfp', 'directGrant', 'wishlist', 'officeHours'];

    it.each(formTypes)('should include hardwired fields for %s form', formType => {
      const result = mapFormDataToSalesforce({}, formType);

      expect(result.Application_Stage__c).toBe('New');
      expect(result.Application_Source__c).toBe('Webform');
      expect(result.RecordTypeId).toBe(HARDWIRED_FIELDS[formType].RecordTypeId);
    });

    it('should use correct RecordTypeId for each form type', () => {
      expect(HARDWIRED_FIELDS.rfp.RecordTypeId).toBe('012Vj000008xEVOIA2');
      expect(HARDWIRED_FIELDS.directGrant.RecordTypeId).toBe('012Vj000008xEVNIA2');
      expect(HARDWIRED_FIELDS.wishlist.RecordTypeId).toBe('012Vj000008xEVPIA2');
      expect(HARDWIRED_FIELDS.officeHours.RecordTypeId).toBe('012Vj000008z3fVIAQ');
    });
  });

  describe('Basic field mapping', () => {
    it('should map contact information fields correctly', () => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        company: 'Acme Corp',
        country: 'United States',
        timezone: 'America/New_York'
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_FirstName__c).toBe('John');
      expect(result.Application_LastName__c).toBe('Doe');
      expect(result.Application_Email__c).toBe('john@example.com');
      expect(result.Application_Company__c).toBe('Acme Corp');
      expect(result.Application_Country__c).toBe('United States');
      expect(result.Application_Time_Zone__c).toBe('America/New_York');
    });

    it('should map project overview fields correctly', () => {
      const formData = {
        projectName: 'My Project',
        projectSummary: 'A great project',
        projectRepo: 'https://github.com/example/repo',
        domain: 'Developer experience',
        output: 'Research',
        budgetRequest: 50000,
        currency: 'USD'
      };

      const result = mapFormDataToSalesforce(formData, 'directGrant');

      expect(result.Name).toBe('My Project');
      expect(result.Application_ProjectDescription__c).toBe('A great project');
      expect(result.Application_ProjectRepo__c).toBe('https://github.com/example/repo');
      expect(result.Application_Domain__c).toBe('Developer experience');
      expect(result.Application_Output__c).toBe('Research');
      expect(result.Application_RequestedAmount__c).toBe(50000);
      expect(result.CurrencyIsoCode).toBe('USD');
    });

    it('should map boolean fields correctly', () => {
      const formData = {
        repeatApplicant: true,
        opportunityOutreachConsent: false
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_Repeat_Applicant__c).toBe(true);
      expect(result.Application_OutreachConsent__c).toBe(false);
    });

    it('should map form-specific fields (selectedRFPId)', () => {
      const formData = {
        selectedRFPId: 'some-rfp-id-123'
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Grant_Initiative__c).toBe('some-rfp-id-123');
    });

    it('should map form-specific fields (selectedWishlistId)', () => {
      const formData = {
        selectedWishlistId: 'some-wishlist-id-456'
      };

      const result = mapFormDataToSalesforce(formData, 'wishlist');

      expect(result.Grant_Initiative__c).toBe('some-wishlist-id-456');
    });
  });

  describe('System fields exclusion', () => {
    it('should not map captchaToken to Salesforce', () => {
      const formData = {
        firstName: 'John',
        captchaToken: 'some-captcha-token'
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_FirstName__c).toBe('John');
      expect(result.captchaToken).toBeUndefined();
      // Verify captchaToken is not mapped to any SF field
      expect(Object.values(result)).not.toContain('some-captcha-token');
    });

    it('should not map fileUpload to Salesforce', () => {
      const formData = {
        firstName: 'John',
        fileUpload: { name: 'test.pdf', size: 1024 }
      };

      const result = mapFormDataToSalesforce(formData, 'directGrant');

      expect(result.Application_FirstName__c).toBe('John');
      expect(result.fileUpload).toBeUndefined();
    });
  });

  describe('Null and undefined value handling', () => {
    it('should skip undefined values', () => {
      const formData = {
        firstName: 'John',
        lastName: undefined,
        email: 'john@example.com'
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_FirstName__c).toBe('John');
      expect(result.Application_Email__c).toBe('john@example.com');
      expect(result).not.toHaveProperty('Application_LastName__c');
    });

    it('should skip null values', () => {
      const formData = {
        firstName: 'John',
        lastName: null,
        email: 'john@example.com'
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_FirstName__c).toBe('John');
      expect(result.Application_Email__c).toBe('john@example.com');
      expect(result).not.toHaveProperty('Application_LastName__c');
    });

    it('should include empty string values', () => {
      const formData = {
        firstName: 'John',
        additionalInfo: ''
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_FirstName__c).toBe('John');
      expect(result.Application_AdditionalInformation__c).toBe('');
    });

    it('should include zero values', () => {
      const formData = {
        budgetRequest: 0
      };

      const result = mapFormDataToSalesforce(formData, 'directGrant');

      expect(result.Application_RequestedAmount__c).toBe(0);
    });

    it('should include false boolean values', () => {
      const formData = {
        repeatApplicant: false
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_Repeat_Applicant__c).toBe(false);
    });
  });

  describe('Company fallback logic', () => {
    it('should use firstName + lastName when company is empty string', () => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        company: ''
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_Company__c).toBe('John Doe');
    });

    it('should use firstName + lastName when company is null', () => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        company: null
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_Company__c).toBe('John Doe');
    });

    it('should use firstName + lastName when company is undefined', () => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        company: undefined
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_Company__c).toBe('John Doe');
    });

    it('should NOT apply fallback when company is provided', () => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        company: 'Acme Corp'
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      expect(result.Application_Company__c).toBe('Acme Corp');
    });

    it('should keep empty company if firstName is missing', () => {
      const formData = {
        lastName: 'Doe',
        company: ''
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      // Fallback requires both firstName AND lastName
      // If either is missing, empty string is preserved
      expect(result.Application_Company__c).toBe('');
    });

    it('should keep empty company if lastName is missing', () => {
      const formData = {
        firstName: 'John',
        company: ''
      };

      const result = mapFormDataToSalesforce(formData, 'rfp');

      // Fallback requires both firstName AND lastName
      // If either is missing, empty string is preserved
      expect(result.Application_Company__c).toBe('');
    });
  });

  describe('Office Hours form mapping', () => {
    it('should map Office Hours request fields', () => {
      const formData = {
        officeHoursRequest: 'Advice',
        officeHoursReason: 'Need guidance on scaling'
      };

      const result = mapFormDataToSalesforce(formData, 'officeHours');

      expect(result.Application_OfficeHours_RequestType__c).toBe('Advice');
      expect(result.Application_OfficeHours_Reason__c).toBe('Need guidance on scaling');
    });

    it('should map Project Feedback fields for Office Hours', () => {
      const formData = {
        officeHoursRequest: 'Project Feedback',
        projectName: 'My Project',
        projectSummary: 'Project description',
        projectRepo: 'https://github.com/example',
        domain: 'Developer tooling',
        additionalInfo: 'Additional context'
      };

      const result = mapFormDataToSalesforce(formData, 'officeHours');

      expect(result.Name).toBe('My Project');
      expect(result.Application_ProjectDescription__c).toBe('Project description');
      expect(result.Application_ProjectRepo__c).toBe('https://github.com/example');
      expect(result.Application_Domain__c).toBe('Developer tooling');
      expect(result.Application_AdditionalInformation__c).toBe('Additional context');
    });
  });

  describe('Direct Grant form mapping', () => {
    it('should map project details fields', () => {
      const formData = {
        projectStructure: 'Team of 5 developers',
        sustainabilityPlan: 'Long-term maintenance plan',
        funding: 'Previously funded by X',
        problemBeingSolved: 'Solving Y problem',
        measuredImpact: 'Expected to impact Z users',
        successMetrics: 'Success measured by A, B, C',
        ecosystemFit: 'Fits within Ethereum ecosystem',
        communityFeedback: 'Community has requested this',
        openSourceLicense: 'MIT'
      };

      const result = mapFormDataToSalesforce(formData, 'directGrant');

      expect(result.Application_ProjectStructure__c).toBe('Team of 5 developers');
      expect(result.Application_SustainabilityPlan__c).toBe('Long-term maintenance plan');
      expect(result.Application_OtherFunding__c).toBe('Previously funded by X');
      expect(result.Application_Problem__c).toBe('Solving Y problem');
      expect(result.Application_MeasuredImpact__c).toBe('Expected to impact Z users');
      expect(result.Application_SuccessMetric__c).toBe('Success measured by A, B, C');
      expect(result.Application_EcosystemFit__c).toBe('Fits within Ethereum ecosystem');
      expect(result.Application_CommunityFeedback__c).toBe('Community has requested this');
      expect(result.Application_Open_Source_License_Picklist__c).toBe('MIT');
    });

    it('should map applicantProfile field', () => {
      const formData = {
        applicantProfile: 'I am an experienced developer...'
      };

      const result = mapFormDataToSalesforce(formData, 'directGrant');

      expect(result.Application_Profile__c).toBe('I am an experienced developer...');
    });
  });

  describe('Wishlist form mapping', () => {
    it('should include all project details fields like Direct Grant', () => {
      const formData = {
        projectStructure: 'Solo developer',
        sustainabilityPlan: 'Sustainability plan',
        funding: 'No prior funding',
        problemBeingSolved: 'Problem description',
        measuredImpact: 'Impact description',
        successMetrics: 'Metrics description',
        ecosystemFit: 'Ecosystem fit description',
        communityFeedback: 'Community feedback',
        openSourceLicense: 'Apache-2.0',
        selectedWishlistId: 'wishlist-item-id'
      };

      const result = mapFormDataToSalesforce(formData, 'wishlist');

      expect(result.Application_ProjectStructure__c).toBe('Solo developer');
      expect(result.Grant_Initiative__c).toBe('wishlist-item-id');
    });
  });

  describe('Field mapping coverage', () => {
    it('should have mappings for all form types', () => {
      expect(SF_FIELD_MAPPINGS).toHaveProperty('rfp');
      expect(SF_FIELD_MAPPINGS).toHaveProperty('directGrant');
      expect(SF_FIELD_MAPPINGS).toHaveProperty('wishlist');
      expect(SF_FIELD_MAPPINGS).toHaveProperty('officeHours');
    });

    it('should have hardwired fields for all form types', () => {
      expect(HARDWIRED_FIELDS).toHaveProperty('rfp');
      expect(HARDWIRED_FIELDS).toHaveProperty('directGrant');
      expect(HARDWIRED_FIELDS).toHaveProperty('wishlist');
      expect(HARDWIRED_FIELDS).toHaveProperty('officeHours');
    });
  });
});
