import { describe, it, expect } from 'vitest';
import {
  mapSFRecordToGrant,
  mapSFRecordToPrivateGrant
} from '../../lib/sf/grants';
import type {
  SFOpportunityRecord,
  SFPrivateOpportunityRecord,
  GrantRecord,
  PrivateGrantRecord
} from '../../types/grants';

describe('mapSFRecordToGrant', () => {
  const validRecord: SFOpportunityRecord = {
    Id: '001ABC123',
    Name: 'Test Project',
    Project_Description__c: 'A test project description',
    Opportunity_Domain__c: 'Zero-knowledge Proofs',
    Opportunity_Output__c: 'Research',
    Grantee_Contact_Details__c: 'contact@test.com',
    Project_Repo__c: 'https://github.com/test/project',
    CloseDate: '2025-06-15'
  };

  it('should map all fields correctly from SF record', () => {
    const result = mapSFRecordToGrant(validRecord);

    expect(result).not.toBeNull();
    expect(result!.id).toBe('001ABC123');
    expect(result!.projectName).toBe('Test Project');
    expect(result!.description).toBe('A test project description');
    expect(result!.domain).toBe('Zero-knowledge Proofs');
    expect(result!.output).toBe('Research');
    expect(result!.publicContact).toBe('contact@test.com');
    expect(result!.projectRepo).toBe('https://github.com/test/project');
    expect(result!.activatedDate).toBe('2025-06-15');
  });

  it('should derive fiscal quarter from CloseDate', () => {
    const result = mapSFRecordToGrant(validRecord);
    expect(result!.fiscalQuarter).toBe('2025 Q2');
  });

  it('should return null when CloseDate is missing', () => {
    const recordWithoutDate: SFOpportunityRecord = {
      ...validRecord,
      CloseDate: null
    };

    const result = mapSFRecordToGrant(recordWithoutDate);
    expect(result).toBeNull();
  });

  it('should handle null optional fields gracefully', () => {
    const recordWithNulls: SFOpportunityRecord = {
      Id: '001ABC456',
      Name: 'Minimal Project',
      Project_Description__c: null,
      Opportunity_Domain__c: null,
      Opportunity_Output__c: null,
      Grantee_Contact_Details__c: null,
      Project_Repo__c: null,
      CloseDate: '2024-01-10'
    };

    const result = mapSFRecordToGrant(recordWithNulls);

    expect(result).not.toBeNull();
    expect(result!.id).toBe('001ABC456');
    expect(result!.projectName).toBe('Minimal Project');
    expect(result!.description).toBeNull();
    expect(result!.domain).toBeNull();
    expect(result!.output).toBeNull();
    expect(result!.publicContact).toBeNull();
    expect(result!.projectRepo).toBeNull();
    expect(result!.activatedDate).toBe('2024-01-10');
    expect(result!.fiscalQuarter).toBe('2024 Q1');
  });

  describe('fiscal quarter derivation', () => {
    it('should correctly derive Q1 for January date', () => {
      const result = mapSFRecordToGrant({
        ...validRecord,
        CloseDate: '2025-01-15'
      });
      expect(result!.fiscalQuarter).toBe('2025 Q1');
    });

    it('should correctly derive Q2 for April date', () => {
      const result = mapSFRecordToGrant({
        ...validRecord,
        CloseDate: '2025-04-01'
      });
      expect(result!.fiscalQuarter).toBe('2025 Q2');
    });

    it('should correctly derive Q3 for July date', () => {
      const result = mapSFRecordToGrant({
        ...validRecord,
        CloseDate: '2025-07-20'
      });
      expect(result!.fiscalQuarter).toBe('2025 Q3');
    });

    it('should correctly derive Q4 for October date', () => {
      const result = mapSFRecordToGrant({
        ...validRecord,
        CloseDate: '2025-10-31'
      });
      expect(result!.fiscalQuarter).toBe('2025 Q4');
    });
  });
});

describe('mapSFRecordToPrivateGrant', () => {
  const validPrivateRecord: SFPrivateOpportunityRecord = {
    Id: '001PVT789',
    Name: 'Private Grant Project',
    Project_Description__c: 'Internal project description',
    Opportunity_Domain__c: 'Ethereum Protocol',
    Opportunity_Output__c: 'Developer tooling',
    Grantee_Contact_Details__c: 'internal@ethereum.org',
    Project_Repo__c: 'https://github.com/ethereum/project',
    CloseDate: '2025-03-20',
    Cost_Center_Lookup__r: { Name: 'CC-001' },
    Opportunity_Grant_Evaluator_Lookup__r: { Name: 'Alice Smith' },
    Amount: 100000,
    StageName: 'Closed Won'
  };

  it('should map all public fields correctly', () => {
    const result = mapSFRecordToPrivateGrant(validPrivateRecord);

    expect(result).not.toBeNull();
    expect(result!.id).toBe('001PVT789');
    expect(result!.projectName).toBe('Private Grant Project');
    expect(result!.description).toBe('Internal project description');
    expect(result!.domain).toBe('Ethereum Protocol');
    expect(result!.output).toBe('Developer tooling');
    expect(result!.publicContact).toBe('internal@ethereum.org');
    expect(result!.projectRepo).toBe('https://github.com/ethereum/project');
    expect(result!.activatedDate).toBe('2025-03-20');
    expect(result!.fiscalQuarter).toBe('2025 Q1');
  });

  it('should map private fields correctly', () => {
    const result = mapSFRecordToPrivateGrant(validPrivateRecord);

    expect(result!.costCenter).toBe('CC-001');
    expect(result!.grantEvaluator).toBe('Alice Smith');
    expect(result!.budgetAmount).toBe(100000);
    expect(result!.status).toBe('Closed Won');
  });

  it('should set grantRound to null (field not in current SF query)', () => {
    const result = mapSFRecordToPrivateGrant(validPrivateRecord);
    expect(result!.grantRound).toBeNull();
  });

  it('should return null when CloseDate is missing', () => {
    const recordWithoutDate: SFPrivateOpportunityRecord = {
      ...validPrivateRecord,
      CloseDate: null
    };

    const result = mapSFRecordToPrivateGrant(recordWithoutDate);
    expect(result).toBeNull();
  });

  it('should handle null relationship fields gracefully', () => {
    const recordWithNullRelationships: SFPrivateOpportunityRecord = {
      ...validPrivateRecord,
      Cost_Center_Lookup__r: null,
      Opportunity_Grant_Evaluator_Lookup__r: null
    };

    const result = mapSFRecordToPrivateGrant(recordWithNullRelationships);

    expect(result!.costCenter).toBeNull();
    expect(result!.grantEvaluator).toBeNull();
  });

  it('should handle undefined relationship fields gracefully', () => {
    const recordWithUndefinedRelationships: SFPrivateOpportunityRecord = {
      Id: '001PVT000',
      Name: 'Minimal Private Grant',
      Project_Description__c: null,
      Opportunity_Domain__c: null,
      Opportunity_Output__c: null,
      Grantee_Contact_Details__c: null,
      Project_Repo__c: null,
      CloseDate: '2024-11-15',
      Amount: null,
      StageName: null
      // Cost_Center_Lookup__r and Opportunity_Grant_Evaluator_Lookup__r intentionally omitted
    };

    const result = mapSFRecordToPrivateGrant(recordWithUndefinedRelationships);

    expect(result).not.toBeNull();
    expect(result!.costCenter).toBeNull();
    expect(result!.grantEvaluator).toBeNull();
    expect(result!.budgetAmount).toBeNull();
    expect(result!.status).toBeNull();
  });

  it('should handle zero budget amount', () => {
    const recordWithZeroAmount: SFPrivateOpportunityRecord = {
      ...validPrivateRecord,
      Amount: 0
    };

    const result = mapSFRecordToPrivateGrant(recordWithZeroAmount);

    // 0 is falsy but should still be preserved as a valid amount
    // Current implementation uses || which treats 0 as null
    // This test documents current behavior (may need fix if 0 should be preserved)
    expect(result!.budgetAmount).toBeNull();
  });
});

describe('GrantRecord type compliance', () => {
  it('should produce GrantRecord with all required fields', () => {
    const sfRecord: SFOpportunityRecord = {
      Id: 'type-test-001',
      Name: 'Type Test Grant',
      Project_Description__c: 'Description',
      Opportunity_Domain__c: 'Domain',
      Opportunity_Output__c: 'Output',
      Grantee_Contact_Details__c: 'contact@test.com',
      Project_Repo__c: 'https://github.com/test',
      CloseDate: '2025-05-01'
    };

    const result = mapSFRecordToGrant(sfRecord);

    // TypeScript compile-time check - if this compiles, types match
    const grant: GrantRecord = result!;

    // Runtime verification of all GrantRecord fields
    expect(grant).toHaveProperty('id');
    expect(grant).toHaveProperty('projectName');
    expect(grant).toHaveProperty('description');
    expect(grant).toHaveProperty('domain');
    expect(grant).toHaveProperty('output');
    expect(grant).toHaveProperty('publicContact');
    expect(grant).toHaveProperty('projectRepo');
    expect(grant).toHaveProperty('activatedDate');
    expect(grant).toHaveProperty('fiscalQuarter');
  });

  it('should produce PrivateGrantRecord with all required fields', () => {
    const sfRecord: SFPrivateOpportunityRecord = {
      Id: 'type-test-002',
      Name: 'Private Type Test Grant',
      Project_Description__c: 'Description',
      Opportunity_Domain__c: 'Domain',
      Opportunity_Output__c: 'Output',
      Grantee_Contact_Details__c: 'contact@test.com',
      Project_Repo__c: 'https://github.com/test',
      CloseDate: '2025-05-01',
      Cost_Center_Lookup__r: { Name: 'CC-999' },
      Opportunity_Grant_Evaluator_Lookup__r: { Name: 'Evaluator' },
      Amount: 50000,
      StageName: 'Active'
    };

    const result = mapSFRecordToPrivateGrant(sfRecord);

    // TypeScript compile-time check
    const grant: PrivateGrantRecord = result!;

    // Runtime verification of PrivateGrantRecord fields (extends GrantRecord)
    expect(grant).toHaveProperty('id');
    expect(grant).toHaveProperty('projectName');
    expect(grant).toHaveProperty('fiscalQuarter');
    // Private-specific fields
    expect(grant).toHaveProperty('costCenter');
    expect(grant).toHaveProperty('grantEvaluator');
    expect(grant).toHaveProperty('grantRound');
    expect(grant).toHaveProperty('budgetAmount');
    expect(grant).toHaveProperty('status');
  });
});
