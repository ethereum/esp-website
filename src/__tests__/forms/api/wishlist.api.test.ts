import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as sfLib from '../../../lib/sf';
import { validWishlistData, validFileUpload } from './fixtures';

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

describe('Wishlist API Route - Field Mapping Tests', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock successful Salesforce responses
    vi.mocked(sfLib.createSalesforceRecord).mockResolvedValue({
      id: 'mock-salesforce-id-456',
      success: true
    });

    vi.mocked(sfLib.uploadFileToSalesforce).mockResolvedValue({
      success: true,
      contentDocumentId: 'mock-document-id'
    });

    vi.mocked(sfLib.generateCSATToken).mockReturnValue('mock-csat-token-wishlist');

    // Import handler after mocks are set up
    const apiModule = await import('../../../pages/api/wishlist');
    handler = apiModule.default;
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('should map all Wishlist schema fields to correct Salesforce fields', async () => {
    const mockRequest = {
      method: 'POST',
      fields: {
        ...validWishlistData,
        // Add optional fields for comprehensive testing
        otherProfileType: 'Custom Team Type',
        alternativeContact: 'bob@example.com',
        website: 'https://wishlist-example.com',
        projectRepo: 'https://github.com/wishlist/repo',
        additionalInfo: 'Additional wishlist information'
      },
      files: {}
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

    // Verify key field mappings
    expect(salesforceData).toMatchObject({
      // Contact Information mappings
      Application_FirstName__c: validWishlistData.firstName,
      Application_LastName__c: validWishlistData.lastName,
      Application_Email__c: validWishlistData.email,
      Application_Company__c: validWishlistData.company,
      Application_ProfileType__c: validWishlistData.profileType,
      Application_Country__c: validWishlistData.country,
      Application_Time_Zone__c: validWishlistData.timezone,

      // Applicant Profile (unique to Wishlist)
      Application_Profile__c: validWishlistData.applicantProfile,

      // Project Overview mappings
      Name: validWishlistData.projectName,
      Application_Domain__c: validWishlistData.domain,
      Application_Output__c: validWishlistData.output,
      Application_RequestedAmount__c: validWishlistData.budgetRequest,
      CurrencyIsoCode: validWishlistData.currency,

      // Project Details mappings (unique to Wishlist/DirectGrant)
      Application_Open_Source_License_Picklist__c: validWishlistData.openSourceLicense,

      // Hardwired fields
      Grant_Initiative__c: validWishlistData.selectedWishlistId,
      Application_Stage__c: 'New',
      Application_Source__c: 'Webform',
      RecordTypeId: '012Vj000008xEVPIA2'
    });

    // Verify project details sections are mapped
    expect(salesforceData.Application_ProjectStructure__c).toBeDefined();
    expect(salesforceData.Application_SustainabilityPlan__c).toBeDefined();
    expect(salesforceData.Application_OtherFunding__c).toBeDefined();
    expect(salesforceData.Application_Problem__c).toBeDefined();
    expect(salesforceData.Application_MeasuredImpact__c).toBeDefined();
    expect(salesforceData.Application_SuccessMetric__c).toBeDefined();
    expect(salesforceData.Application_EcosystemFit__c).toBeDefined();
    expect(salesforceData.Application_CommunityFeedback__c).toBeDefined();
  });

  it('should verify correct RecordTypeId for Wishlist form (different from RFP)', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validWishlistData,
      files: {}
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
    expect(callArgs[1].RecordTypeId).toBe('012Vj000008xEVPIA2');
    // Verify it's different from RFP
    expect(callArgs[1].RecordTypeId).not.toBe('012Vj000008xEVOIA2');
  });

  it('should verify Application_Profile__c receives applicantProfile field', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validWishlistData,
      files: {}
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
    expect(callArgs[1].Application_Profile__c).toBe(validWishlistData.applicantProfile);
    expect(callArgs[1].Application_Profile__c.length).toBeGreaterThanOrEqual(100);
  });

  it('should map all ProjectDetailsSection fields correctly', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validWishlistData,
      files: {}
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];

    // Verify all ProjectDetailsSection field mappings
    expect(callArgs[1].Application_ProjectStructure__c).toBeDefined();
    expect(callArgs[1].Application_SustainabilityPlan__c).toBeDefined();
    expect(callArgs[1].Application_OtherFunding__c).toBeDefined();
    expect(callArgs[1].Application_Problem__c).toBeDefined();
    expect(callArgs[1].Application_MeasuredImpact__c).toBeDefined();
    expect(callArgs[1].Application_SuccessMetric__c).toBeDefined();
    expect(callArgs[1].Application_EcosystemFit__c).toBeDefined();
    expect(callArgs[1].Application_CommunityFeedback__c).toBeDefined();
    expect(callArgs[1].Application_Open_Source_License_Picklist__c).toBe(
      validWishlistData.openSourceLicense
    );
  });

  it('should handle optional file upload correctly (no file)', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validWishlistData,
      files: {} // No file upload
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    // Should succeed without file upload
    expect(sfLib.createSalesforceRecord).toHaveBeenCalledTimes(1);
    expect(sfLib.uploadFileToSalesforce).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should handle file upload when provided', async () => {
    const mockFile = validFileUpload;

    const mockRequest = {
      method: 'POST',
      fields: validWishlistData,
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

    // Verify file upload was called
    expect(sfLib.uploadFileToSalesforce).toHaveBeenCalledTimes(1);
    expect(sfLib.uploadFileToSalesforce).toHaveBeenCalledWith(
      mockFile,
      'mock-salesforce-id-456',
      '[PROPOSAL]',
      validWishlistData.projectName
    );
  });
});
