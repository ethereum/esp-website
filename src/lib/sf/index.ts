import fs from 'fs';
import path from 'path';
import { Connection } from 'jsforce';
import jwt from 'jsonwebtoken';
import matter from 'gray-matter';
import type { File } from 'formidable';

import { GrantInitiative, GrantInitiativeSalesforceRecord, GrantInitiativeType } from '../../types';
import { truncateString } from '../../utils/truncateString';

/**
 * Get all tags used by rounds (e.g., ["AGR26"] or ["PhDFP", "Research"])
 * These tags should be excluded from regular RFP/Wishlist listings
 */
function getRoundTags(): string[] {
  const roundsDirectory = path.join(process.cwd(), 'content/rounds');

  if (!fs.existsSync(roundsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(roundsDirectory);
  const tags: string[] = [];

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const filePath = path.join(roundsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      if (data.tags && Array.isArray(data.tags)) {
        tags.push(...data.tags);
      }
    }
  }

  return tags;
}

const { SF_PROD_CONSUMER_KEY, SF_PROD_CONSUMER_SECRET, CSAT_JWT_SECRET } = process.env;

// Client Credentials flow must hit the org's My Domain URL — not
// login.salesforce.com — and there is only one production org, so this is
// hardcoded rather than env-driven.
const SF_LOGIN_URL = 'https://ef-esp.my.salesforce.com';

export const WISHLIST_RECORD_TYPE_ID = '012Vj000008tfPKIAY';
export const RFP_RECORD_TYPE_ID = '012Vj000008tfPJIAY';

const SALESFORCE_ENABLED = !!(SF_PROD_CONSUMER_KEY && SF_PROD_CONSUMER_SECRET);

if (!SALESFORCE_ENABLED) {
  console.warn(
    'Salesforce credentials not configured. See .env.local.example for required variables.'
  );
}

/**
 * Generate a JWT token for CSAT submission
 * @param applicationId - The Salesforce Application ID
 * @returns JWT token valid for 7 days
 */
export const generateCSATToken = (applicationId: string): string => {
  if (!CSAT_JWT_SECRET) {
    throw new Error('CSAT_JWT_SECRET environment variable is not set');
  }

  return jwt.sign({ applicationId }, CSAT_JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Verify and decode a CSAT JWT token
 * @param token - The JWT token to verify
 * @returns Decoded payload with applicationId, or null if invalid
 */
export const verifyCSATToken = (token: string): { applicationId: string } | null => {
  if (!CSAT_JWT_SECRET) {
    throw new Error('CSAT_JWT_SECRET environment variable is not set');
  }

  try {
    const decoded = jwt.verify(token, CSAT_JWT_SECRET) as { applicationId: string };
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
};

const CLIENT_CREDENTIALS_PARAMS = { grant_type: 'client_credentials' };

// Module-scoped, lazily authorized connection. jsforce's `refreshFn` is
// invoked automatically on 401 (INVALID_SESSION_ID) and transparently retries
// the in-flight request, so we don't need a manual retry wrapper.
let connPromise: Promise<Connection> | null = null;

const buildConnection = async (): Promise<Connection> => {
  const conn = new Connection({
    oauth2: {
      loginUrl: SF_LOGIN_URL,
      clientId: SF_PROD_CONSUMER_KEY,
      clientSecret: SF_PROD_CONSUMER_SECRET
    },
    refreshFn: (_c, callback) => {
      conn
        .authorize(CLIENT_CREDENTIALS_PARAMS)
        .then(() => callback(null, conn.accessToken ?? undefined))
        .catch(err => callback(err as Error));
    }
  });
  await conn.authorize(CLIENT_CREDENTIALS_PARAMS);
  return conn;
};

export const getAuthenticatedConnection = async (): Promise<Connection> => {
  if (!SALESFORCE_ENABLED) throw new Error('Salesforce integration disabled');
  if (!connPromise) {
    connPromise = buildConnection().catch(err => {
      // Allow retry on next call after a failed initial auth
      connPromise = null;
      throw err;
    });
  }
  return connPromise;
};

const getGrantInitiativeType = (recordTypeId: string): GrantInitiativeType | null => {
  if (recordTypeId === WISHLIST_RECORD_TYPE_ID) return 'Wishlist';
  if (recordTypeId === RFP_RECORD_TYPE_ID) return 'RFP';
  return null;
};

const getRecordTypeIdForType = (type: GrantInitiativeType): string => {
  if (type === 'Wishlist') return WISHLIST_RECORD_TYPE_ID;
  if (type === 'RFP') return RFP_RECORD_TYPE_ID;
  return '';
};

const getFieldsForType = (type?: GrantInitiativeType): string => {
  const baseFields = 'Id,Name,Description__c,RecordTypeId,Tags__c,Resources__c,Ecosystem_Need__c';
  const wishlistFields = ',Out_of_Scope__c';
  const rfpFields =
    ',RFP_HardRequirements_Long__c,RFP_SoftRequirements__c,RFP_Project_Duration__c,RFP_Close_Date__c,RFP_Open_Date__c';
  const sharedFields = ',Custom_URL_Slug__c';

  if (type === 'Wishlist') {
    return baseFields + wishlistFields + sharedFields;
  }

  if (type === 'RFP') {
    return baseFields + rfpFields + sharedFields;
  }

  // When no type specified, include all fields to support mixed queries
  return baseFields + wishlistFields + rfpFields + sharedFields;
};

/**
 * Transform Salesforce records into GrantInitiative objects
 */
const transformGrantInitiativeRecords = (
  records: GrantInitiativeSalesforceRecord[]
): GrantInitiative[] => {
  return records.reduce<GrantInitiative[]>((acc, record) => {
    const grantInitiativeType = getGrantInitiativeType(record.RecordTypeId);
    if (!grantInitiativeType) return acc;

    const grantInitiativeItem: GrantInitiative = {
      Id: record.Id,
      Name: record.Name,
      Description__c: record.Description__c,
      Tags__c: record.Tags__c,
      Resources__c: record.Resources__c,
      Ecosystem_Need__c: record.Ecosystem_Need__c
    };

    if (record.Custom_URL_Slug__c) {
      grantInitiativeItem.Custom_URL_Slug__c = record.Custom_URL_Slug__c;
    }

    if (grantInitiativeType === 'Wishlist') {
      if (record.Out_of_Scope__c) {
        grantInitiativeItem.Out_of_Scope__c = record.Out_of_Scope__c;
      }
    }

    if (grantInitiativeType === 'RFP') {
      if (record.RFP_Project_Duration__c) {
        grantInitiativeItem.RFP_Project_Duration__c = record.RFP_Project_Duration__c;
      }
      if (record.RFP_HardRequirements_Long__c) {
        grantInitiativeItem.RFP_HardRequirements_Long__c = record.RFP_HardRequirements_Long__c;
      }
      if (record.RFP_SoftRequirements__c) {
        grantInitiativeItem.RFP_SoftRequirements__c = record.RFP_SoftRequirements__c;
      }
      if (record.RFP_Close_Date__c) {
        grantInitiativeItem.RFP_Close_Date__c = record.RFP_Close_Date__c;
      }
      if (record.RFP_Open_Date__c) {
        grantInitiativeItem.RFP_Open_Date__c = record.RFP_Open_Date__c;
      }
    }

    acc.push(grantInitiativeItem);
    return acc;
  }, []);
};

/**
 * Get all active grant initiative items
 * @param type - The type of grant initiative (Wishlist, RFP)
 * @param options - Optional configuration
 * @param options.excludeRoundItems - If true, excludes items that belong to grant rounds (default: true)
 * @returns Promise with the grant initiative items
 */
export async function getGrantInitiativeItems(
  type?: GrantInitiativeType,
  options: { excludeRoundItems?: boolean } = { excludeRoundItems: true }
): Promise<GrantInitiative[]> {
  const conn = await getAuthenticatedConnection();

  const baseCriteria: Partial<GrantInitiativeSalesforceRecord> = { Status__c: 'Active' };
  const criteria =
    type != null ? { ...baseCriteria, RecordTypeId: getRecordTypeIdForType(type) } : baseCriteria;

  let records = await conn
    .sobject('Grant_Initiative__c')
    .find<GrantInitiativeSalesforceRecord>(criteria, getFieldsForType(type));

  if (options.excludeRoundItems !== false) {
    const roundTags = getRoundTags();

    if (roundTags.length > 0) {
      records = records.filter(record => {
        if (!record.Tags__c) return true;
        const itemTags = record.Tags__c.split(';').map(t => t.trim());
        // Exclude if any of the item's tags match a round tag
        return !itemTags.some(tag => roundTags.includes(tag));
      });
    }
  }

  return transformGrantInitiativeRecords(records);
}

/**
 * Get grant initiative items filtered by tags
 * @param tags - The tags to filter by (e.g., ["AGR26"] or ["PhDFP", "Research"])
 * @returns Promise with the filtered grant initiative items (matches ANY of the provided tags)
 */
export async function getGrantInitiativeItemsByTag(tags: string[]): Promise<GrantInitiative[]> {
  if (!SALESFORCE_ENABLED) return [];

  const conn = await getAuthenticatedConnection();

  const criteria: Partial<GrantInitiativeSalesforceRecord> = { Status__c: 'Active' };

  const records = await conn
    .sobject('Grant_Initiative__c')
    .find<GrantInitiativeSalesforceRecord>(criteria, getFieldsForType());

  // Filter records that contain ANY of the tags in their Tags__c field
  // Tags__c is a semicolon-separated string
  const filteredRecords = records.filter(record => {
    if (!record.Tags__c) return false;
    const recordTags = record.Tags__c.split(';').map(t => t.trim());
    return tags.some(tag => recordTags.includes(tag));
  });

  return transformGrantInitiativeRecords(filteredRecords);
}

/**
 * Generic function to create any Salesforce object
 * @param objectType - The Salesforce object type (e.g., 'Lead', 'Application__c')
 * @param data - The data to be created
 * @returns Promise with the created record information
 */
export const createSalesforceRecord = async (
  objectType: string,
  data: Record<string, any>
): Promise<{ id: string; success: boolean }> => {
  if (!SALESFORCE_ENABLED) {
    return { id: `MOCK_${objectType}_${Date.now()}`, success: true };
  }

  const conn = await getAuthenticatedConnection();
  const ret = await conn.sobject(objectType).create(data);

  if (!ret.success) {
    console.error(`Error creating ${objectType}:`, ret.errors);
    throw new Error(`${objectType} creation failed`);
  }

  console.log(`${objectType} with ID: ${ret.id} has been created!`);
  return { id: ret.id, success: true };
};

/**
 * Generic function to update any Salesforce object
 * @param objectType - The Salesforce object type (e.g., 'Lead', 'Application__c')
 * @param id - The ID of the record to update
 * @param data - The data to be updated
 * @returns Promise with the update result
 */
export const updateSalesforceRecord = async (
  objectType: string,
  id: string,
  data: Record<string, any>
): Promise<{ id: string; success: boolean }> => {
  if (!SALESFORCE_ENABLED) {
    return { id, success: true };
  }

  const conn = await getAuthenticatedConnection();
  const ret = await conn.sobject(objectType).update({ Id: id, ...data });

  if (!ret.success) {
    console.error(`Error updating ${objectType}:`, ret.errors);
    throw new Error(`${objectType} update failed`);
  }

  console.log(`${objectType} with ID: ${ret.id} has been updated!`);
  return { id: ret.id, success: true };
};

/**
 * Upload a file to Salesforce and link it to a specific object
 * @param file - The file to upload (from formidable)
 * @param linkedEntityId - The Salesforce object ID to link the file to
 * @param titlePrefix - Optional prefix for the file title (default: '[DOCUMENT]')
 * @param projectName - Optional project name to include in the title
 * @returns Promise with upload result
 */
export const uploadFileToSalesforce = async (
  file: File,
  linkedEntityId: string,
  titlePrefix: string = '[DOCUMENT]',
  projectName?: string
): Promise<{ success: boolean; contentDocumentId?: string }> => {
  if (!SALESFORCE_ENABLED) {
    return { success: true, contentDocumentId: `MOCK_DOC_${Date.now()}` };
  }

  const conn = await getAuthenticatedConnection();

  const fileContent = fs.readFileSync(file.filepath, { encoding: 'base64' });

  const baseTitle = projectName
    ? `${titlePrefix} ${truncateString(projectName, 200)} - ${linkedEntityId}`
    : `${titlePrefix} ${linkedEntityId}`;

  const uploadResult = await conn.sobject('ContentVersion').create({
    Title: baseTitle,
    PathOnClient: file.originalFilename,
    VersionData: fileContent
  });

  if (!uploadResult.success) {
    console.error('Error uploading file to Salesforce:', uploadResult.errors);
    throw new Error('File upload failed');
  }

  console.log('File uploaded successfully:', uploadResult);

  const contentDocument = (await conn
    .sobject('ContentVersion')
    .retrieve(uploadResult.id)) as { Id: string; ContentDocumentId: string };

  await conn.sobject('ContentDocumentLink').create({
    ContentDocumentId: contentDocument.ContentDocumentId,
    LinkedEntityId: linkedEntityId,
    ShareType: 'V'
  });

  console.log(`File successfully linked to entity ${linkedEntityId}`);
  return {
    success: true,
    contentDocumentId: contentDocument.ContentDocumentId
  };
};
