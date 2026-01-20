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
