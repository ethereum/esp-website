import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as sfLib from '../../../lib/sf';

// Mock the Salesforce library
vi.mock('../../../lib/sf', () => ({
  createSalesforceRecord: vi.fn(),
  uploadFileToSalesforce: vi.fn(),
  generateCSATToken: vi.fn()
}));

// Mock the middlewares
vi.mock('../../../middlewares/multipartyParse', () => ({
  multipartyParse: vi.fn((handler: any) => handler)
}));

vi.mock('../../../middlewares/sanitizeFields', () => ({
  sanitizeFields: vi.fn((handler: any) => handler)
}));

vi.mock('../../../middlewares/verifyCaptcha', () => ({
  verifyCaptcha: vi.fn((handler: any) => handler)
}));

let handler: any;

describe('Office Hours API Route - Field Mapping Tests', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock successful Salesforce responses
    vi.mocked(sfLib.createSalesforceRecord).mockResolvedValue({
      id: 'mock-salesforce-id-office-hours',
      success: true
    });

    vi.mocked(sfLib.uploadFileToSalesforce).mockResolvedValue({
      success: true,
      contentDocumentId: 'mock-document-id'
    });

    vi.mocked(sfLib.generateCSATToken).mockReturnValue('mock-csat-token-office-hours');

    // Import handler after mocks are set up
    const apiModule = await import('../../../pages/api/office-hours');
    handler = apiModule.default;
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('should verify correct RecordTypeId for OfficeHours form', async () => {
    const mockRequest = {
      method: 'POST',
      fields: {
        firstName: 'Sarah',
        lastName: 'Connor',
        email: 'sarah@example.com',
        company: 'Tech Corp',
        profileType: 'Individual',
        country: 'US',
        timezone: 'America/Los_Angeles',
        officeHoursRequest: 'Advice',
        officeHoursReason: 'I need advice on Ethereum development best practices.',
        repeatApplicant: false,
        opportunityOutreachConsent: true,
        captchaToken: 'mock-token'
      },
      files: {}
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
    expect(callArgs[1].RecordTypeId).toBe('012Vj000008z3fVIAQ');
  });

  describe('Advice Request Type', () => {
    it('should map Name field to "firstName, lastName" for Advice requests', async () => {
      const mockRequest = {
        method: 'POST',
        fields: {
          firstName: 'Sarah',
          lastName: 'Connor',
          email: 'sarah@example.com',
          company: 'Tech Corp',
          profileType: 'Individual',
          country: 'US',
          timezone: 'America/Los_Angeles',
          officeHoursRequest: 'Advice',
          officeHoursReason: 'I need advice on Ethereum development best practices.',
          repeatApplicant: false,
          opportunityOutreachConsent: true,
          captchaToken: 'mock-token'
        },
        files: {}
      } as unknown as NextApiRequest;

      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        end: vi.fn()
      } as unknown as NextApiResponse;

      await handler(mockRequest, mockResponse);

      const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
      expect(callArgs[1].Name).toBe('Sarah, Connor');
    });

    it('should map all base fields for Advice requests', async () => {
      const mockRequest = {
        method: 'POST',
        fields: {
          firstName: 'Sarah',
          lastName: 'Connor',
          email: 'sarah@example.com',
          company: 'Tech Corp',
          profileType: 'Individual',
          otherProfileType: 'Researcher',
          alternativeContact: 'john@example.com',
          country: 'US',
          timezone: 'America/Los_Angeles',
          officeHoursRequest: 'Advice',
          officeHoursReason:
            'I need advice on Ethereum development best practices and want to discuss potential research directions.',
          repeatApplicant: true,
          opportunityOutreachConsent: false,
          captchaToken: 'mock-token'
        },
        files: {}
      } as unknown as NextApiRequest;

      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        end: vi.fn()
      } as unknown as NextApiResponse;

      await handler(mockRequest, mockResponse);

      expect(sfLib.createSalesforceRecord).toHaveBeenCalledWith('Application__c', {
        Application_FirstName__c: 'Sarah',
        Application_LastName__c: 'Connor',
        Application_Email__c: 'sarah@example.com',
        Application_Company__c: 'Tech Corp',
        Application_ProfileType__c: 'Individual',
        Application_Other_ProfileType__c: 'Researcher',
        Application_Alternative_Contact__c: 'john@example.com',
        Application_Country__c: 'US',
        Application_Time_Zone__c: 'America/Los_Angeles',
        Application_OfficeHours_RequestType__c: 'Advice',
        Application_OfficeHours_Reason__c:
          'I need advice on Ethereum development best practices and want to discuss potential research directions.',
        Name: 'Sarah, Connor',
        Application_Repeat_Applicant__c: true,
        Application_OutreachConsent__c: false,
        Application_Stage__c: 'New',
        Application_Source__c: 'Webform',
        RecordTypeId: '012Vj000008z3fVIAQ'
      });
    });

    it('should NOT include project fields for Advice requests', async () => {
      const mockRequest = {
        method: 'POST',
        fields: {
          firstName: 'Sarah',
          lastName: 'Connor',
          email: 'sarah@example.com',
          company: 'Tech Corp',
          profileType: 'Individual',
          country: 'US',
          timezone: 'America/Los_Angeles',
          officeHoursRequest: 'Advice',
          officeHoursReason: 'I need advice.',
          repeatApplicant: false,
          opportunityOutreachConsent: true,
          captchaToken: 'mock-token'
        },
        files: {}
      } as unknown as NextApiRequest;

      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        end: vi.fn()
      } as unknown as NextApiResponse;

      await handler(mockRequest, mockResponse);

      const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
      expect(callArgs[1].Application_ProjectDescription__c).toBeUndefined();
      expect(callArgs[1].Application_ProjectRepo__c).toBeUndefined();
      expect(callArgs[1].Application_Domain__c).toBeUndefined();
      expect(callArgs[1].Application_AdditionalInformation__c).toBeUndefined();
    });

    it('should default company to "N/A" if not provided for Advice requests', async () => {
      const mockRequest = {
        method: 'POST',
        fields: {
          firstName: 'Sarah',
          lastName: 'Connor',
          email: 'sarah@example.com',
          // company not provided
          profileType: 'Individual',
          country: 'US',
          timezone: 'America/Los_Angeles',
          officeHoursRequest: 'Advice',
          officeHoursReason: 'I need advice.',
          repeatApplicant: false,
          opportunityOutreachConsent: true,
          captchaToken: 'mock-token'
        },
        files: {}
      } as unknown as NextApiRequest;

      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        end: vi.fn()
      } as unknown as NextApiResponse;

      await handler(mockRequest, mockResponse);

      const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
      expect(callArgs[1].Application_Company__c).toBe('N/A');
    });
  });

  describe('Project Feedback Request Type', () => {
    it('should map Name field to projectName for Project Feedback requests', async () => {
      const mockRequest = {
        method: 'POST',
        fields: {
          firstName: 'John',
          lastName: 'Smith',
          email: 'john@example.com',
          company: 'Dev Company',
          profileType: 'Team',
          country: 'CA',
          timezone: 'America/Toronto',
          officeHoursRequest: 'Project Feedback',
          officeHoursReason: 'I want feedback on my Layer 2 scaling solution.',
          projectName: 'Awesome L2 Project',
          projectSummary:
            'This is a detailed summary of my Layer 2 project that implements innovative scaling solutions.',
          projectRepo: 'https://github.com/awesome/l2',
          domain: 'Layer 2',
          additionalInfo: 'Additional context about the project.',
          repeatApplicant: false,
          opportunityOutreachConsent: true,
          captchaToken: 'mock-token'
        },
        files: {}
      } as unknown as NextApiRequest;

      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        end: vi.fn()
      } as unknown as NextApiResponse;

      await handler(mockRequest, mockResponse);

      const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
      expect(callArgs[1].Name).toBe('Awesome L2 Project');
    });

    it('should map all fields including project fields for Project Feedback requests', async () => {
      const mockRequest = {
        method: 'POST',
        fields: {
          firstName: 'John',
          lastName: 'Smith',
          email: 'john@example.com',
          company: 'Dev Company',
          profileType: 'Team',
          otherProfileType: 'Development Team',
          alternativeContact: 'jane@example.com',
          country: 'CA',
          timezone: 'America/Toronto',
          officeHoursRequest: 'Project Feedback',
          officeHoursReason:
            'I want feedback on my Layer 2 scaling solution to ensure we are on the right track.',
          projectName: 'Awesome L2 Project',
          projectSummary:
            'This is a detailed summary of my Layer 2 project that implements innovative scaling solutions using zero-knowledge proofs.',
          projectRepo: 'https://github.com/awesome/l2',
          domain: 'Layer 2',
          additionalInfo:
            'We have been working on this for 6 months and would appreciate expert feedback.',
          repeatApplicant: true,
          opportunityOutreachConsent: false,
          captchaToken: 'mock-token'
        },
        files: {}
      } as unknown as NextApiRequest;

      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        end: vi.fn()
      } as unknown as NextApiResponse;

      await handler(mockRequest, mockResponse);

      expect(sfLib.createSalesforceRecord).toHaveBeenCalledWith('Application__c', {
        // Base contact fields
        Application_FirstName__c: 'John',
        Application_LastName__c: 'Smith',
        Application_Email__c: 'john@example.com',
        Application_Company__c: 'Dev Company',
        Application_ProfileType__c: 'Team',
        Application_Other_ProfileType__c: 'Development Team',
        Application_Alternative_Contact__c: 'jane@example.com',
        Application_Country__c: 'CA',
        Application_Time_Zone__c: 'America/Toronto',

        // Office hours fields
        Application_OfficeHours_RequestType__c: 'Project Feedback',
        Application_OfficeHours_Reason__c:
          'I want feedback on my Layer 2 scaling solution to ensure we are on the right track.',

        // Project-specific fields (only for Project Feedback)
        Name: 'Awesome L2 Project',
        Application_ProjectDescription__c:
          'This is a detailed summary of my Layer 2 project that implements innovative scaling solutions using zero-knowledge proofs.',
        Application_ProjectRepo__c: 'https://github.com/awesome/l2',
        Application_Domain__c: 'Layer 2',
        Application_AdditionalInformation__c:
          'We have been working on this for 6 months and would appreciate expert feedback.',

        // Additional fields
        Application_Repeat_Applicant__c: true,
        Application_OutreachConsent__c: false,

        // Hardwired fields
        Application_Stage__c: 'New',
        Application_Source__c: 'Webform',
        RecordTypeId: '012Vj000008z3fVIAQ'
      });
    });

    it('should handle optional file upload for Project Feedback requests', async () => {
      const mockFile = {
        filepath: '/tmp/project-feedback.pdf',
        originalFilename: 'project-feedback.pdf',
        mimetype: 'application/pdf',
        size: 1500000
      };

      const mockRequest = {
        method: 'POST',
        fields: {
          firstName: 'John',
          lastName: 'Smith',
          email: 'john@example.com',
          company: 'Dev Company',
          profileType: 'Team',
          country: 'CA',
          timezone: 'America/Toronto',
          officeHoursRequest: 'Project Feedback',
          officeHoursReason: 'I want feedback.',
          projectName: 'Awesome L2 Project',
          projectSummary: 'Project summary.',
          projectRepo: 'https://github.com/awesome/l2',
          domain: 'Layer 2',
          repeatApplicant: false,
          opportunityOutreachConsent: true,
          captchaToken: 'mock-token'
        },
        files: {
          fileUpload: mockFile
        }
      } as unknown as NextApiRequest;

      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        end: vi.fn()
      } as unknown as NextApiResponse;

      await handler(mockRequest, mockResponse);

      // Verify file upload was called for Project Feedback
      expect(sfLib.uploadFileToSalesforce).toHaveBeenCalledTimes(1);
      expect(sfLib.uploadFileToSalesforce).toHaveBeenCalledWith(
        mockFile,
        'mock-salesforce-id-office-hours',
        '[PROPOSAL]',
        'Awesome L2 Project'
      );
    });

    it('should succeed without file upload for Project Feedback requests', async () => {
      const mockRequest = {
        method: 'POST',
        fields: {
          firstName: 'John',
          lastName: 'Smith',
          email: 'john@example.com',
          company: 'Dev Company',
          profileType: 'Team',
          country: 'CA',
          timezone: 'America/Toronto',
          officeHoursRequest: 'Project Feedback',
          officeHoursReason: 'I want feedback.',
          projectName: 'Awesome L2 Project',
          projectSummary: 'Project summary.',
          projectRepo: 'https://github.com/awesome/l2',
          domain: 'Layer 2',
          repeatApplicant: false,
          opportunityOutreachConsent: true,
          captchaToken: 'mock-token'
        },
        files: {} // No file
      } as unknown as NextApiRequest;

      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        end: vi.fn()
      } as unknown as NextApiResponse;

      await handler(mockRequest, mockResponse);

      expect(sfLib.createSalesforceRecord).toHaveBeenCalledTimes(1);
      expect(sfLib.uploadFileToSalesforce).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  it('should return success response with applicationId and csatToken', async () => {
    const mockRequest = {
      method: 'POST',
      fields: {
        firstName: 'Sarah',
        lastName: 'Connor',
        email: 'sarah@example.com',
        company: 'Tech Corp',
        profileType: 'Individual',
        country: 'US',
        timezone: 'America/Los_Angeles',
        officeHoursRequest: 'Advice',
        officeHoursReason: 'I need advice.',
        repeatApplicant: false,
        opportunityOutreachConsent: true,
        captchaToken: 'mock-token'
      },
      files: {}
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      message: 'Office Hours application submitted successfully',
      applicationId: 'mock-salesforce-id-office-hours',
      csatToken: 'mock-csat-token-office-hours'
    });
  });
});
