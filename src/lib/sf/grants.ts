import {
  GrantRecord,
  PrivateGrantRecord,
  SFOpportunityRecord,
  SFPrivateOpportunityRecord
} from '../../types/grants';
import { deriveFiscalQuarter, getFiscalYearStart } from '../../utils/fiscalYear';
import { createConnection, loginToSalesforce } from './index';

/**
 * Whitelist of record types to show in public grants explorer
 */
const PUBLIC_RECORD_TYPES = [
  'Sponsorships',
  'Proactive community grants',
  'Financial support',
  'Matching funds'
];

/**
 * Stages to exclude from public view
 */
const EXCLUDED_STAGES = ['In Progress', 'Prospecting'];

/**
 * Get all public grants from Salesforce
 * Fetches Opportunity records with whitelisted record types
 * from the last 2 fiscal years
 */
export async function getPublicGrants(): Promise<GrantRecord[]> {
  const conn = createConnection();

  try {
    await loginToSalesforce(conn);
  } catch {
    console.warn('Salesforce login failed, returning mock grants for development');
    return getMockGrants();
  }

  const twoFYAgo = getFiscalYearStart(2);

  const recordTypesFilter = PUBLIC_RECORD_TYPES.map(t => `'${t}'`).join(', ');
  const stagesFilter = EXCLUDED_STAGES.map(s => `'${s}'`).join(', ');

  const query = `
    SELECT
      Id,
      Name,
      Project_Description__c,
      Opportunity_Domain__c,
      Opportunity_Output__c,
      Grantee_Contact_Details__c,
      Project_Repo__c,
      CloseDate
    FROM Opportunity
    WHERE
      RecordType.Name IN (${recordTypesFilter})
      AND Type != 'Impact Gift'
      AND CloseDate != NULL
      AND CloseDate >= ${twoFYAgo}
      AND StageName NOT IN (${stagesFilter})
    ORDER BY CloseDate DESC
  `;

  try {
    let allRecords: SFOpportunityRecord[] = [];
    let result = await conn.query<SFOpportunityRecord>(query);
    allRecords.push(...result.records);

    // Paginate through all results (default batch is ~2000)
    while (!result.done && result.nextRecordsUrl) {
      result = await conn.queryMore<SFOpportunityRecord>(result.nextRecordsUrl);
      allRecords.push(...result.records);
    }

    return allRecords
      .map(mapSFRecordToGrant)
      .filter((r): r is GrantRecord => r !== null);
  } catch (error) {
    console.error('Salesforce query failed:', error);
    console.warn('Returning mock grants for development');
    return getMockGrants();
  }
}

/**
 * Private fields to include for internal grants view
 * Matching June's exact query (Jan 2026)
 */
const PRIVATE_FIELDS = [
  'Id',
  'Name',
  'Project_Description__c',
  'Opportunity_Domain__c',
  'Opportunity_Output__c',
  'Grantee_Contact_Details__c',
  'Project_Repo__c',
  'CloseDate',
  'Cost_Center_Lookup__r.Name',
  'Opportunity_Grant_Evaluator_Lookup__r.Name',
  'Amount',
  'StageName'
];

/**
 * Record types to exclude from internal grants view
 */
const EXCLUDED_RECORD_TYPES = ['Private Grant', 'Non-Financial Support'];

/**
 * Get all grants with private fields from Salesforce
 * For internal use only - requires authentication
 * Uses exclusion list rather than whitelist for broader coverage
 */
export async function getPrivateGrants(): Promise<PrivateGrantRecord[]> {
  const conn = createConnection();

  try {
    await loginToSalesforce(conn);
  } catch {
    console.warn('Salesforce login failed, returning mock private grants for development');
    return getMockPrivateGrants();
  }

  const excludedTypesFilter = EXCLUDED_RECORD_TYPES.map(t => `'${t}'`).join(', ');

  const query = `
    SELECT
      ${PRIVATE_FIELDS.join(',\n      ')}
    FROM Opportunity
    WHERE
      RecordType.Name NOT IN (${excludedTypesFilter})
      AND Type != 'Impact Gift'
      AND CloseDate != NULL
      AND CloseDate >= 2024-01-01
    ORDER BY CloseDate DESC
  `;

  try {
    let allRecords: SFPrivateOpportunityRecord[] = [];
    let result = await conn.query<SFPrivateOpportunityRecord>(query);
    allRecords.push(...result.records);

    // Paginate through all results
    while (!result.done && result.nextRecordsUrl) {
      result = await conn.queryMore<SFPrivateOpportunityRecord>(result.nextRecordsUrl);
      allRecords.push(...result.records);
    }

    console.log(`Raw Salesforce records: ${allRecords.length}`);
    const grants = allRecords
      .map(mapSFRecordToPrivateGrant)
      .filter((r): r is PrivateGrantRecord => r !== null);
    console.log(`After filtering: ${grants.length} private grants`);
    return grants;
  } catch (error) {
    console.error('Salesforce query failed:', error);
    console.warn('Returning mock private grants for development');
    return getMockPrivateGrants();
  }
}

/**
 * Map Salesforce record to frontend PrivateGrantRecord
 */
function mapSFRecordToPrivateGrant(record: SFPrivateOpportunityRecord): PrivateGrantRecord | null {
  if (!record.CloseDate) {
    console.warn(`Grant ${record.Id} excluded: missing close date`);
    return null;
  }

  return {
    id: record.Id,
    projectName: record.Name,
    description: record.Project_Description__c || null,
    domain: record.Opportunity_Domain__c || null,
    output: record.Opportunity_Output__c || null,
    publicContact: record.Grantee_Contact_Details__c || null,
    projectRepo: record.Project_Repo__c || null,
    activatedDate: record.CloseDate,
    fiscalQuarter: deriveFiscalQuarter(record.CloseDate),
    // Private fields
    costCenter: record.Cost_Center_Lookup__r?.Name || null,
    grantEvaluator: record.Opportunity_Grant_Evaluator_Lookup__r?.Name || null,
    grantRound: null,
    budgetAmount: record.Amount || null,
    status: record.StageName || null
  };
}

/**
 * Mock private grants data for development
 */
function getMockPrivateGrants(): PrivateGrantRecord[] {
  const baseGrants = getMockGrants();
  return baseGrants.map((grant, index) => ({
    ...grant,
    costCenter: ['CC-001', 'CC-002', 'CC-003'][index % 3],
    grantEvaluator: ['Alice Smith', 'Bob Johnson', 'Carol Williams'][index % 3],
    grantRound: ['Round 1', 'Round 2', null][index % 3],
    budgetAmount: [50000, 100000, 250000, 75000, 150000][index % 5],
    status: ['Closed Won', 'In Progress', 'Pending'][index % 3]
  }));
}

/**
 * Mock grants data for development and build
 * Used when SF is not configured or query fails
 */
function getMockGrants(): GrantRecord[] {
  return [
    {
      id: '1',
      projectName: 'zkEVM Research Initiative',
      description: 'Developing novel zero-knowledge proof techniques for EVM compatibility and scaling solutions.',
      domain: 'Zero-knowledge Proofs',
      output: 'Research',
      publicContact: 'contact@example.com',
      projectRepo: 'https://github.com/example/zkevm',
      activatedDate: '2025-01-15',
      fiscalQuarter: 'FY25 Q3'
    },
    {
      id: '2',
      projectName: 'Beacon Chain Monitoring Tools',
      description: 'Building comprehensive monitoring and analytics tools for Ethereum consensus layer.',
      domain: 'Ethereum Protocol',
      output: 'Developer tooling',
      publicContact: null,
      projectRepo: 'https://github.com/example/beacon-tools',
      activatedDate: '2024-11-20',
      fiscalQuarter: 'FY25 Q2'
    },
    {
      id: '3',
      projectName: 'Ethereum Developer Education',
      description: 'Creating educational resources and workshops for new Ethereum developers.',
      domain: 'Community and education',
      output: 'Ecosystem Development',
      publicContact: 'edu@example.org',
      projectRepo: null,
      activatedDate: '2024-08-10',
      fiscalQuarter: 'FY25 Q1'
    },
    {
      id: '4',
      projectName: 'DeFi Security Auditing Framework',
      description: 'Open-source framework for automated smart contract security analysis.',
      domain: 'Security',
      output: 'Developer tooling',
      publicContact: null,
      projectRepo: 'https://github.com/example/defi-audit',
      activatedDate: '2024-05-22',
      fiscalQuarter: 'FY24 Q4'
    },
    {
      id: '5',
      projectName: 'Layer 2 Bridge Standards',
      description: 'Research and specification work on cross-L2 bridge standards and interoperability.',
      domain: 'Layer 2',
      output: 'Research',
      publicContact: 'bridges@example.io',
      projectRepo: null,
      activatedDate: '2024-02-14',
      fiscalQuarter: 'FY24 Q3'
    }
  ];
}

/**
 * Map Salesforce record to frontend GrantRecord
 * Handles null fields gracefully
 */
function mapSFRecordToGrant(record: SFOpportunityRecord): GrantRecord | null {
  if (!record.CloseDate) {
    console.warn(`Grant ${record.Id} excluded: missing close date`);
    return null;
  }

  return {
    id: record.Id,
    projectName: record.Name,
    description: record.Project_Description__c || null,
    domain: record.Opportunity_Domain__c || null,
    output: record.Opportunity_Output__c || null,
    publicContact: record.Grantee_Contact_Details__c || null,
    projectRepo: record.Project_Repo__c || null,
    activatedDate: record.CloseDate,
    fiscalQuarter: deriveFiscalQuarter(record.CloseDate)
  };
}
