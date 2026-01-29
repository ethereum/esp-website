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
 * from the previous 2 fiscal years (excludes current year)
 */
export async function getPublicGrants(): Promise<GrantRecord[]> {
  const conn = createConnection();

  try {
    await loginToSalesforce(conn);
  } catch (error) {
    // loginToSalesforce rejects with 'Salesforce integration disabled' when
    // credentials are not configured — expected in development / CI builds.
    if (error instanceof Error && error.message === 'Salesforce integration disabled') {
      console.warn('Salesforce not configured, returning mock grants for development');
      return getMockGrants();
    }
    // Real login failure (expired creds, network issue) — throw so ISR
    // serves the previously cached page instead of fake data.
    throw error;
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
      CloseDate,
      Proactive_Community_Grants_Round__c
    FROM Opportunity
    WHERE
      RecordType.Name IN (${recordTypesFilter})
      AND Type != 'Impact Gift'
      AND CloseDate != NULL
      AND CloseDate >= ${twoFYAgo}
      AND StageName NOT IN (${stagesFilter})
    ORDER BY CloseDate DESC
  `;

  const allRecords: SFOpportunityRecord[] = [];
  let result = await conn.query<SFOpportunityRecord>(query);
  allRecords.push(...result.records);

  // Paginate through all results (default batch is ~2000)
  while (!result.done && result.nextRecordsUrl) {
    result = await conn.queryMore<SFOpportunityRecord>(result.nextRecordsUrl);
    allRecords.push(...result.records);
  }

  const grants = allRecords
    .map(mapSFRecordToGrant)
    .filter((r): r is GrantRecord => r !== null);

  // In development, fall back to mock data when the query returns nothing
  // (e.g. stage filters or date range don't match any records).
  if (grants.length === 0 && process.env.NODE_ENV === 'development') {
    console.warn('No grants returned from Salesforce, using mock data for development');
    return getMockGrants();
  }

  return grants;
}

/**
 * Mock grants data for development and CI builds.
 * Only used when Salesforce credentials are not configured.
 */
function getMockGrants(): GrantRecord[] {
  return [
    {
      id: '1',
      projectName: 'zkEVM Research Initiative',
      description: 'Developing novel zero-knowledge proof techniques for EVM compatibility and scaling solutions.',
      domain: 'Zero-knowledge Proofs',
      output: 'Research',
      grantRound: 'Academic Grants Round 2025',
      publicContact: 'contact@example.com',
      projectRepo: 'https://github.com/example/zkevm',
      activatedDate: '2025-01-15',
      fiscalQuarter: '2025 Q1'
    },
    {
      id: '2',
      projectName: 'Beacon Chain Monitoring Tools',
      description: 'Building comprehensive monitoring and analytics tools for Ethereum consensus layer.',
      domain: 'Ethereum Protocol',
      output: 'Developer tooling',
      grantRound: 'Academic Grants Round 2024',
      publicContact: null,
      projectRepo: 'https://github.com/example/beacon-tools',
      activatedDate: '2024-11-20',
      fiscalQuarter: '2024 Q4'
    },
    {
      id: '3',
      projectName: 'Ethereum Developer Education',
      description: 'Creating educational resources and workshops for new Ethereum developers.',
      domain: 'Community and education',
      output: 'Ecosystem Development',
      grantRound: null,
      publicContact: 'edu@example.org',
      projectRepo: null,
      activatedDate: '2024-08-10',
      fiscalQuarter: '2024 Q3'
    },
    {
      id: '4',
      projectName: 'DeFi Security Auditing Framework',
      description: 'Open-source framework for automated smart contract security analysis.',
      domain: 'Security',
      output: 'Developer tooling',
      grantRound: 'Academic Grants Round 2024',
      publicContact: null,
      projectRepo: 'https://github.com/example/defi-audit',
      activatedDate: '2024-05-22',
      fiscalQuarter: '2024 Q2'
    },
    {
      id: '5',
      projectName: 'Layer 2 Bridge Standards',
      description: 'Research and specification work on cross-L2 bridge standards and interoperability.',
      domain: 'Layer 2',
      output: 'Research',
      grantRound: 'Academic Grants Round 2025',
      publicContact: 'bridges@example.io',
      projectRepo: null,
      activatedDate: '2024-02-14',
      fiscalQuarter: '2024 Q1'
    }
  ];
}

/**
 * Validate that a URL uses a safe protocol (http or https).
 * Rejects javascript:, data:, vbscript:, and other dangerous schemes.
 */
function sanitizeUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol === 'http:' || url.protocol === 'https:') return value;
  } catch {
    // Not a valid URL
  }
  return null;
}

/**
 * Validate that a contact value is either an email address or a safe URL.
 */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeContact(value: string | null): string | null {
  if (!value) return null;
  if (isValidEmail(value)) return value;
  return sanitizeUrl(value);
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
    grantRound: record.Proactive_Community_Grants_Round__c || null,
    publicContact: sanitizeContact(record.Grantee_Contact_Details__c || null),
    projectRepo: sanitizeUrl(record.Project_Repo__c || null),
    activatedDate: record.CloseDate,
    fiscalQuarter: deriveFiscalQuarter(record.CloseDate)
  };
}
