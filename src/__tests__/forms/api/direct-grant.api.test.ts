import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as sfLib from '../../../lib/sf';
import { validDirectGrantData, validFileUpload } from './fixtures';

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

describe('Direct Grant API Route - Field Mapping Tests', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock successful Salesforce responses
    vi.mocked(sfLib.createSalesforceRecord).mockResolvedValue({
      id: 'mock-salesforce-id-789',
      success: true
    });

    vi.mocked(sfLib.uploadFileToSalesforce).mockResolvedValue({
      success: true,
      contentDocumentId: 'mock-document-id'
    });

    vi.mocked(sfLib.generateCSATToken).mockReturnValue('mock-csat-token-direct-grant');

    // Import handler after mocks are set up
    const apiModule = await import('../../../pages/api/direct-grant');
    handler = apiModule.default;
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('should map all DirectGrant schema fields to correct Salesforce fields', async () => {
    const mockRequest = {
      method: 'POST',
      fields: {
        ...validDirectGrantData,
        // Add optional fields for comprehensive testing
        otherProfileType: 'Custom Company Type',
        alternativeContact: 'charlie@example.com',
        website: 'https://directgrant-example.com',
        projectRepo: 'https://github.com/directgrant/repo',
        additionalInfo: 'Additional direct grant information'
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
      Application_FirstName__c: validDirectGrantData.firstName,
      Application_LastName__c: validDirectGrantData.lastName,
      Application_Email__c: validDirectGrantData.email,
      Application_Company__c: validDirectGrantData.company,
      Application_ProfileType__c: validDirectGrantData.profileType,
      Application_Country__c: validDirectGrantData.country,
      Application_Time_Zone__c: validDirectGrantData.timezone,

      // Applicant Profile
      Application_Profile__c: validDirectGrantData.applicantProfile,

      // Project Overview mappings
      Name: validDirectGrantData.projectName,
      Application_Domain__c: validDirectGrantData.domain,
      Application_Output__c: validDirectGrantData.output,
      Application_RequestedAmount__c: validDirectGrantData.budgetRequest,
      CurrencyIsoCode: validDirectGrantData.currency,

      // Project Details mappings
      Application_Open_Source_License_Picklist__c: validDirectGrantData.openSourceLicense,

      // Hardwired fields
      Application_Stage__c: 'New',
      Application_Source__c: 'Webform',
      RecordTypeId: '012Vj000008xEVNIA2'
      // Note: NO Grant_Initiative__c field for direct grant
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

  it('should verify correct RecordTypeId for DirectGrant form (different from RFP and Wishlist)', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validDirectGrantData,
      files: {}
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
    expect(callArgs[1].RecordTypeId).toBe('012Vj000008xEVNIA2');
    // Verify it's different from RFP and Wishlist
    expect(callArgs[1].RecordTypeId).not.toBe('012Vj000008xEVOIA2'); // RFP
    expect(callArgs[1].RecordTypeId).not.toBe('012Vj000008xEVPIA2'); // Wishlist
  });

  it('should NOT include Grant_Initiative__c field (unlike RFP/Wishlist)', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validDirectGrantData,
      files: {}
    } as unknown as NextApiRequest;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn()
    } as unknown as NextApiResponse;

    await handler(mockRequest, mockResponse);

    const callArgs = vi.mocked(sfLib.createSalesforceRecord).mock.calls[0];
    expect(callArgs[1].Grant_Initiative__c).toBeUndefined();
  });

  it('should handle optional file upload correctly (no file)', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validDirectGrantData,
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

  it('should verify custom referral field label/helpText does not affect mapping', async () => {
    // In the DirectGrantForm, referral field has custom label "Internal EF Contact"
    // but it should still map to Application_Referral__c
    const mockRequest = {
      method: 'POST',
      fields: {
        ...validDirectGrantData,
        referral: 'Internal EF Team Member Name'
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
    // Should still map to Application_Referral__c despite custom label
    expect(callArgs[1].Application_Referral__c).toBe('Internal EF Team Member Name');
  });

  it('should handle file upload when provided', async () => {
    const mockFile = validFileUpload;

    const mockRequest = {
      method: 'POST',
      fields: validDirectGrantData,
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
      'mock-salesforce-id-789',
      '[PROPOSAL]',
      validDirectGrantData.projectName
    );
  });

  it('should return success response with applicationId and csatToken', async () => {
    const mockRequest = {
      method: 'POST',
      fields: validDirectGrantData,
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
      message: 'Direct grant application submitted successfully',
      applicationId: 'mock-salesforce-id-789',
      csatToken: 'mock-csat-token-direct-grant'
    });
  });
});
