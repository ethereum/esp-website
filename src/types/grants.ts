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
  grantRound: string | null;
  email: string | null;
  telegram: string | null;
  twitter: string | null;
  projectRepo: string | null;
  activatedDate: string;
  fiscalQuarter: string;
}

/**
 * Filter types for the Grants Explorer UI
 */
export interface GrantRoundOption {
  name: string;
  description: string | null;
}

export interface FilterState {
  searchQuery: string;
  domain: string | null;
  output: string | null;
  grantRound: string | null;
  year: string | null;
  quarter: string | null;
}

export interface FilterOptions {
  domains: string[];
  outputs: string[];
  grantRounds: GrantRoundOption[];
  years: string[];
  quarters: string[];
}

/**
 * Raw Salesforce Opportunity record
 * Maps directly to SF API fields
 */
export interface SFOpportunityRecord {
  Id: string;
  Name: string;
  Project_Description_Public__c: string | null;
  Opportunity_Domain__c: string | null;
  Opportunity_Output__c: string | null;
  Project_Repo__c: string | null;
  Opportunity_Active_Date__c: string | null;
  Opportunity_Public_Email__c: string | null;
  Opportunity_Telegram_Handle__c: string | null;
  Opportunity_Twitter_Handle__c: string | null;
  Opportunity_Grant_Round__r?: {
    Name: string | null;
    Grant_Round_Public_Description__c: string | null;
  } | null;
}
