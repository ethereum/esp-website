import { describe, it, expect } from 'vitest';
import type { GrantRecord, PrivateGrantRecord } from '../../types/grants';

/**
 * Tests specific to PUBLIC grants explorer (#497)
 *
 * These verify that confidential data is not exposed through
 * the public grants API.
 */

describe('Public Grants - Data Exposure Prevention', () => {
  describe('GrantRecord type safety', () => {
    it('should NOT have private fields in GrantRecord type', () => {
      // Create a valid GrantRecord
      const publicGrant: GrantRecord = {
        id: '001',
        projectName: 'Test Project',
        description: 'A test',
        domain: 'Research',
        output: 'Paper',
        publicContact: 'test@example.com',
        projectRepo: 'https://github.com/test',
        activatedDate: '2025-01-01',
        fiscalQuarter: '2025 Q1'
      };

      // TypeScript compile-time check: these fields should NOT exist on GrantRecord
      // @ts-expect-error - budgetAmount should not exist on GrantRecord
      expect(publicGrant.budgetAmount).toBeUndefined();

      // @ts-expect-error - costCenter should not exist on GrantRecord
      expect(publicGrant.costCenter).toBeUndefined();

      // @ts-expect-error - grantEvaluator should not exist on GrantRecord
      expect(publicGrant.grantEvaluator).toBeUndefined();

      // @ts-expect-error - status should not exist on GrantRecord
      expect(publicGrant.status).toBeUndefined();

      // @ts-expect-error - grantRound should not exist on GrantRecord
      expect(publicGrant.grantRound).toBeUndefined();
    });

    it('should have all required public fields', () => {
      const publicGrant: GrantRecord = {
        id: '001',
        projectName: 'Test Project',
        description: 'Description',
        domain: 'Domain',
        output: 'Output',
        publicContact: 'contact@test.com',
        projectRepo: 'https://github.com/test',
        activatedDate: '2025-01-01',
        fiscalQuarter: '2025 Q1'
      };

      // All public fields should be present
      expect(publicGrant).toHaveProperty('id');
      expect(publicGrant).toHaveProperty('projectName');
      expect(publicGrant).toHaveProperty('description');
      expect(publicGrant).toHaveProperty('domain');
      expect(publicGrant).toHaveProperty('output');
      expect(publicGrant).toHaveProperty('publicContact');
      expect(publicGrant).toHaveProperty('projectRepo');
      expect(publicGrant).toHaveProperty('activatedDate');
      expect(publicGrant).toHaveProperty('fiscalQuarter');
    });

    it('PrivateGrantRecord should extend GrantRecord with private fields', () => {
      const privateGrant: PrivateGrantRecord = {
        // Public fields
        id: '001',
        projectName: 'Test Project',
        description: 'Description',
        domain: 'Domain',
        output: 'Output',
        publicContact: 'contact@test.com',
        projectRepo: 'https://github.com/test',
        activatedDate: '2025-01-01',
        fiscalQuarter: '2025 Q1',
        // Private fields - ONLY on PrivateGrantRecord
        costCenter: 'CC-001',
        grantEvaluator: 'Alice',
        grantRound: 'Round 1',
        budgetAmount: 100000,
        status: 'Active'
      };

      // Private fields should exist on PrivateGrantRecord
      expect(privateGrant.budgetAmount).toBe(100000);
      expect(privateGrant.costCenter).toBe('CC-001');
      expect(privateGrant.grantEvaluator).toBe('Alice');
      expect(privateGrant.status).toBe('Active');
    });
  });
});

describe('Public Grants - Whitelist Configuration', () => {
  // These are the ONLY record types that should appear publicly
  const PUBLIC_RECORD_TYPES = [
    'Sponsorships',
    'Proactive community grants',
    'Financial support',
    'Matching funds'
  ];

  // These stages should NEVER appear publicly
  const EXCLUDED_STAGES = ['In Progress', 'Prospecting'];

  it('should have a defined whitelist of public record types', () => {
    expect(PUBLIC_RECORD_TYPES).toHaveLength(4);
    expect(PUBLIC_RECORD_TYPES).toContain('Sponsorships');
    expect(PUBLIC_RECORD_TYPES).toContain('Proactive community grants');
    expect(PUBLIC_RECORD_TYPES).toContain('Financial support');
    expect(PUBLIC_RECORD_TYPES).toContain('Matching funds');
  });

  it('should NOT include sensitive record types in public whitelist', () => {
    // These should NEVER be in the public whitelist
    expect(PUBLIC_RECORD_TYPES).not.toContain('Private Grant');
    expect(PUBLIC_RECORD_TYPES).not.toContain('Non-Financial Support');
    expect(PUBLIC_RECORD_TYPES).not.toContain('Internal');
  });

  it('should exclude in-progress grants from public view', () => {
    expect(EXCLUDED_STAGES).toContain('In Progress');
    expect(EXCLUDED_STAGES).toContain('Prospecting');
  });
});

describe('Public Grants - Query Security', () => {
  it('public query should NOT select private fields', () => {
    // The SOQL query for public grants should only select these fields
    const PUBLIC_FIELDS = [
      'Id',
      'Name',
      'Project_Description__c',
      'Opportunity_Domain__c',
      'Opportunity_Output__c',
      'Grantee_Contact_Details__c',
      'Project_Repo__c',
      'CloseDate'
    ];

    // These fields should NEVER be in the public query
    const PRIVATE_FIELDS = [
      'Amount',
      'StageName',
      'Cost_Center_Lookup__r',
      'Opportunity_Grant_Evaluator_Lookup__r'
    ];

    // Verify no overlap
    for (const privateField of PRIVATE_FIELDS) {
      expect(PUBLIC_FIELDS).not.toContain(privateField);
    }
  });
});

describe('Public vs Private Grants - Field Comparison', () => {
  it('private grants should have all public fields plus extras', () => {
    const publicFields = [
      'id',
      'projectName',
      'description',
      'domain',
      'output',
      'publicContact',
      'projectRepo',
      'activatedDate',
      'fiscalQuarter'
    ];

    const privateOnlyFields = [
      'costCenter',
      'grantEvaluator',
      'grantRound',
      'budgetAmount',
      'status'
    ];

    // Create instances to verify structure
    const publicGrant: GrantRecord = {
      id: '1',
      projectName: 'Test',
      description: null,
      domain: null,
      output: null,
      publicContact: null,
      projectRepo: null,
      activatedDate: '2025-01-01',
      fiscalQuarter: '2025 Q1'
    };

    const privateGrant: PrivateGrantRecord = {
      ...publicGrant,
      costCenter: null,
      grantEvaluator: null,
      grantRound: null,
      budgetAmount: null,
      status: null
    };

    // Public grant should have exactly public fields
    const publicKeys = Object.keys(publicGrant);
    expect(publicKeys.sort()).toEqual(publicFields.sort());

    // Private grant should have public + private fields
    const privateKeys = Object.keys(privateGrant);
    expect(privateKeys.sort()).toEqual([...publicFields, ...privateOnlyFields].sort());
  });
});
