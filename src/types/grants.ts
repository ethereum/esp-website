/**
 * Grant record from Salesforce Opportunity object
 * Used in the public Grants Explorer
 */
export interface GrantRecord {
  id: string;
  projectName: string;
  description: string | null;
  domain: string | null;
  output: string | null;
  publicContact: string | null;
  projectRepo: string | null;
  activatedDate: string;
  fiscalQuarter: string;
}

/**
 * Additional fields for internal grants view
 * Only visible to authenticated @ethereum.org users
 */
export interface PrivateGrantFields {
  costCenter: string | null;
  grantEvaluator: string | null;
  grantRound: string | null;
  budgetAmount: number | null;
  status: string | null;
}

/**
 * Full grant record including private fields
 * Used in the internal Grants Explorer
 */
export type PrivateGrantRecord = GrantRecord & PrivateGrantFields;

/**
 * Raw Salesforce Opportunity record
 * Maps directly to SF API fields
 */
export interface SFOpportunityRecord {
  Id: string;
  Name: string;
  Project_Description__c: string | null;
  Opportunity_Domain__c: string | null;
  Opportunity_Output__c: string | null;
  Grantee_Contact_Details__c: string | null;
  Project_Repo__c: string | null;
  CloseDate: string | null;
}

/**
 * Extended Salesforce record with private fields
 * Matching June's exact query (Jan 2026)
 */
export interface SFPrivateOpportunityRecord {
  Id: string;
  Name: string;
  Project_Description__c: string | null;
  Opportunity_Domain__c: string | null;
  Opportunity_Output__c: string | null;
  Grantee_Contact_Details__c: string | null;
  Project_Repo__c: string | null;
  CloseDate: string | null;
  Cost_Center_Lookup__r?: { Name: string } | null;
  Opportunity_Grant_Evaluator_Lookup__r?: { Name: string } | null;
  Amount: number | null;
  StageName: string | null;
}
