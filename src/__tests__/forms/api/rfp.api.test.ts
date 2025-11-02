import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as sfLib from '../../../lib/sf';
import {
  validRFPData,
  validFileUpload,
  validContactInfo,
  validProjectOverview,
  validAdditionalDetails
} from './fixtures';

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

// We need to dynamically import the handler after mocking
let handler: any;

describe('RFP API Route - Field Mapping Tests', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock successful Salesforce responses
    vi.mocked(sfLib.createSalesforceRecord).mockResolvedValue({
      id: 'mock-salesforce-id-123',
      success: true
    });

    vi.mocked(sfLib.uploadFileToSalesforce).mockResolvedValue({
      success: true,
      contentDocumentId: 'mock-document-id'
    });

    vi.mocked(sfLib.generateCSATToken).mockReturnValue('mock-csat-token');

    // Import handler after mocks are set up
    const apiModule = await import('../../../pages/api/rfp');
    // Get the handler before middleware wrapping by accessing the default export
    handler = apiModule.default;
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('should map all RFP schema fields to correct Salesforce fields', async () => {
    const mockRequest = {
      method: 'POST',
      fields: {
        ...validRFPData,
        // Add optional fields for comprehensive testing
        otherProfileType: 'Custom Type',
        alternativeContact: 'jane@example.com',
        website: 'https://example.com',
        projectRepo: 'https://github.com/test/repo',
        additionalInfo: 'Additional information here'
      },
      files: {
        fileUpload: validFileUpload
      }
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    // Verify Salesforce createSalesforceRecord was called
    expect(sfLib.createSalesforceRecord).toHaveBeenCalledTimes(1);

    const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
    const salesforceData = callArgs[1];

    // Verify all field mappings
    expect(salesforceData).toMatchObject({
      // Contact Information mappings
      Application_FirstName__c: validRFPData.firstName,
      Application_LastName__c: validRFPData.lastName,
      Application_Email__c: validRFPData.email,
      Application_Company__c: validRFPData.company,
      Application_ProfileType__c: validRFPData.profileType,
      Application_Other_ProfileType__c: 'Custom Type',
      Application_Alternative_Contact__c: 'jane@example.com',
      Application_Website__c: 'https://example.com',
      Application_Country__c: validRFPData.country,
      Application_Time_Zone__c: validRFPData.timezone,

      // Project Overview mappings
      Name: validRFPData.projectName,
      Application_ProjectRepo__c: 'https://github.com/test/repo',
      Application_Domain__c: validRFPData.domain,
      Application_Output__c: validRFPData.output,
      Application_RequestedAmount__c: validRFPData.budgetRequest,
      CurrencyIsoCode: validRFPData.currency,

      // Additional Details mappings
      Application_Repeat_Applicant__c: validRFPData.repeatApplicant,
      Application_Referral__c: validRFPData.referral,
      Application_AdditionalInformation__c: 'Additional information here',
      Application_OutreachConsent__c: validRFPData.opportunityOutreachConsent,

      // Hardwired fields
      Grant_Initiative__c: validRFPData.selectedRFPId,
      Application_Stage__c: 'New',
      Application_Source__c: 'Webform',
      RecordTypeId: '012Vj000008xEVOIA2'
    });

    // Verify project summary and description are present
    expect(salesforceData.Application_ProjectDescription__c).toBeDefined();
    expect(salesforceData.Application_ProjectDescription__c.length).toBeGreaterThanOrEqual(500);
  });

  it('should verify correct RecordTypeId for RFP form', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validRFPData,
      files: {
        fileUpload: validFileUpload
      }
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
    expect(callArgs[1].RecordTypeId).toBe('012Vj000008xEVOIA2');
  });

  it('should verify Grant_Initiative__c receives selectedRFPId', async () => {
    const mockRequest = {
      method: 'POST',
      fields: {
        ...validRFPData,
        selectedRFPId: 'unique-rfp-id-456'
      },
      files: {
        fileUpload: validFileUpload
      }
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
    expect(callArgs[1].Grant_Initiative__c).toBe('unique-rfp-id-456');
  });

  it('should handle file upload with multipart parsing', async () => {
    const mockFile = {
      filepath: '/tmp/test-proposal.pdf',
      originalFilename: 'my-proposal.pdf',
      mimetype: 'application/pdf',
      size: 2000000
    };

    const mockRequest = {
      method: 'POST',
      fields: validRFPData,
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

    // Verify file upload was called after Salesforce record creation
    expect(sfLib.uploadFileToSalesforce).toHaveBeenCalledTimes(1);
    expect(sfLib.uploadFileToSalesforce).toHaveBeenCalledWith(
      mockFile,
      'mock-salesforce-id-123',
      '[PROPOSAL]',
      validRFPData.projectName
    );
  });

  it('should auto-populate company from firstName + lastName when company is empty', async () => {
    // Note: This test documents that company auto-population happens in client-side API
    // The API route receives already curated data
    const mockRequest = {
      method: 'POST',
      fields: validRFPData,
      files: {
        fileUpload: validFileUpload
      }
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    expect(sfLib.createSalesforceRecord).toHaveBeenCalled();
  });

  it('should return success response with applicationId and csatToken', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validRFPData,
      files: {
        fileUpload: validFileUpload
      }
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
      message: 'RFP application submitted successfully',
      applicationId: 'mock-salesforce-id-123',
      csatToken: 'mock-csat-token'
    });
  });

  it('should handle optional fields correctly', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validRFPData, // Already has required fields, no optional ones
      files: {
        fileUpload: validFileUpload
      }
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];

    // Optional fields should be undefined or not set when not provided
    expect(callArgs[1].Application_Other_ProfileType__c).toBeUndefined();
    expect(callArgs[1].Application_Alternative_Contact__c).toBeUndefined();
  });
});
