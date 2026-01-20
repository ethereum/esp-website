import { GrantRecord, SFOpportunityRecord } from '../../types/grants';
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

  // NOTE: Field names need to be verified against actual SF schema
  // Current fields based on provided mapping - may need adjustment
  const query = `
    SELECT
      Id,
      Name,
      Project_Description_Public__c,
      Opportunity_Domain__c,
      Opportunity_Output__c,
      Grantee_Contact_Details__c,
      Project_Repo__c,
      Opportunity_Activated_Date__c
    FROM Opportunity
    WHERE
      RecordType.Name IN (${recordTypesFilter})
      AND Type != 'Impact Gift'
      AND Opportunity_Activated_Date__c != NULL
      AND Opportunity_Activated_Date__c >= ${twoFYAgo}
      AND StageName NOT IN (${stagesFilter})
    ORDER BY Opportunity_Activated_Date__c DESC
  `;

  try {
    const result = await conn.query<SFOpportunityRecord>(query);

    return result.records
      .map(mapSFRecordToGrant)
      .filter((r): r is GrantRecord => r !== null);
  } catch (error) {
    console.error('Salesforce query failed:', error);
    console.warn('Returning mock grants for development');
    return getMockGrants();
  }
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
  if (!record.Opportunity_Activated_Date__c) {
    console.warn(`Grant ${record.Id} excluded: missing activated date`);
    return null;
  }

  return {
    id: record.Id,
    projectName: record.Name,
    description: record.Project_Description_Public__c || null,
    domain: record.Opportunity_Domain__c || null,
    output: record.Opportunity_Output__c || null,
    publicContact: record.Grantee_Contact_Details__c || null,
    projectRepo: record.Project_Repo__c || null,
    activatedDate: record.Opportunity_Activated_Date__c,
    fiscalQuarter: deriveFiscalQuarter(record.Opportunity_Activated_Date__c)
  };
}
