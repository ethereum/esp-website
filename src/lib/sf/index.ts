import fs from 'fs';
import jsforce from 'jsforce';
import jwt from 'jsonwebtoken';
import type { File } from 'formidable';

import { GrantInitiative, GrantInitiativeSalesforceRecord, GrantInitiativeType } from '../../types';
import { truncateString } from '../../utils/truncateString';

const {
  SF_PROD_LOGIN_URL,
  SF_PROD_USERNAME,
  SF_PROD_PASSWORD,
  SF_PROD_SECURITY_TOKEN,
  CSAT_JWT_SECRET
} = process.env;

export const WISHLIST_RECORD_TYPE_ID = '012Vj000008tfPKIAY';
export const RFP_RECORD_TYPE_ID = '012Vj000008tfPJIAY';

const SALESFORCE_ENABLED = !!(SF_PROD_LOGIN_URL && SF_PROD_USERNAME && SF_PROD_PASSWORD && SF_PROD_SECURITY_TOKEN);

if (!SALESFORCE_ENABLED) {
  console.warn('Salesforce credentials not configured. See .env.local.example for required variables.');
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

export const createConnection = (): jsforce.Connection => {
  return new jsforce.Connection({
    loginUrl: SF_PROD_LOGIN_URL
  });
};

export const loginToSalesforce = (conn: jsforce.Connection): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!SALESFORCE_ENABLED) {
      return reject(new Error('Salesforce integration disabled'));
    }

    conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
      if (err) {
        console.error('Salesforce login error:', err);
        return reject(err);
      }
      resolve();
    });
  });
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
  const wishlistFields = ',Out_of_Scope__c,Custom_URL_Slug__c';
  const rfpFields =
    ',RFP_HardRequirements_Long__c,RFP_SoftRequirements__c,RFP_Project_Duration__c,RFP_Close_Date__c,RFP_Open_Date__c,Custom_URL_Slug__c';

  if (type === 'Wishlist') {
    return baseFields + wishlistFields;
  }

  if (type === 'RFP') {
    return baseFields + rfpFields;
  }

  console.log('Type is,', type);

  return baseFields;
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
 * @returns Promise with the grant initiative items
 */
export function getGrantInitiativeItems(type?: GrantInitiativeType) {
  return new Promise<GrantInitiative[]>(async (resolve, reject) => {
    const conn = createConnection();

    try {
      await loginToSalesforce(conn);

      const baseCriteria: Partial<GrantInitiativeSalesforceRecord> = { Status__c: 'Active' };
      const criteria =
        type != null
          ? { ...baseCriteria, RecordTypeId: getRecordTypeIdForType(type) }
          : baseCriteria;

      conn
        .sobject('Grant_Initiative__c')
        .find<GrantInitiativeSalesforceRecord>(criteria, getFieldsForType(type), (err, ret) => {
          if (err) {
            console.error(err);
            return reject(err);
          }

          return resolve(transformGrantInitiativeRecords(ret));
        });
    } catch (error) {
      return reject(error);
    }
  });
}

/**
 * Get grant initiative items filtered by tag
 * @param type - The type of grant initiative (Wishlist, RFP)
 * @param tag - The tag to filter by (e.g., "AGR26")
 * @returns Promise with the filtered grant initiative items
 */
export function getGrantInitiativeItemsByTag(
  type: GrantInitiativeType,
  tag: string
): Promise<GrantInitiative[]> {
  return new Promise<GrantInitiative[]>(async (resolve, reject) => {
    const conn = createConnection();

    try {
      await loginToSalesforce(conn);

      const criteria: Partial<GrantInitiativeSalesforceRecord> = {
        Status__c: 'Active',
        RecordTypeId: getRecordTypeIdForType(type)
      };

      conn
        .sobject('Grant_Initiative__c')
        .find<GrantInitiativeSalesforceRecord>(criteria, getFieldsForType(type), (err, ret) => {
          if (err) {
            console.error(err);
            return reject(err);
          }

          // Filter records that contain the tag in their Tags__c field
          // Tags__c is a semicolon-separated string
          const filteredRecords = ret.filter(record => {
            if (!record.Tags__c) return false;
            const tags = record.Tags__c.split(';').map(t => t.trim());
            return tags.includes(tag);
          });

          return resolve(transformGrantInitiativeRecords(filteredRecords));
        });
    } catch (error) {
      if (!SALESFORCE_ENABLED) {
        return resolve([]);
      }
      return reject(error);
    }
  });
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
  return new Promise(async (resolve, reject) => {
    const conn = createConnection();

    try {
      await loginToSalesforce(conn);

      conn.sobject(objectType).create(data, (err, ret) => {
        if (err || !ret.success) {
          console.error(`Error creating ${objectType}:`, err);
          return reject(err || new Error(`${objectType} creation failed`));
        }

        console.log(`${objectType} with ID: ${ret.id} has been created!`);
        resolve({ id: ret.id, success: ret.success });
      });
    } catch (error) {
      if (!SALESFORCE_ENABLED) {
        return resolve({ id: `MOCK_${objectType}_${Date.now()}`, success: true });
      }
      console.error(`Error in create${objectType}:`, error);
      reject(error);
    }
  });
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
  return new Promise(async (resolve, reject) => {
    const conn = createConnection();

    try {
      await loginToSalesforce(conn);

      conn.sobject(objectType).update({ Id: id, ...data }, (err, ret) => {
        if (err || !ret.success) {
          console.error(`Error updating ${objectType}:`, err);
          return reject(err || new Error(`${objectType} update failed`));
        }

        console.log(`${objectType} with ID: ${ret.id} has been updated!`);
        resolve({ id: ret.id, success: ret.success });
      });
    } catch (error) {
      if (!SALESFORCE_ENABLED) {
        return resolve({ id, success: true });
      }
      console.error(`Error in update${objectType}:`, error);
      reject(error);
    }
  });
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
  return new Promise(async (resolve, reject) => {
    const conn = createConnection();

    try {
      await loginToSalesforce(conn);

      // Read file content as base64
      let fileContent: string;
      try {
        fileContent = fs.readFileSync(file.filepath, { encoding: 'base64' });
      } catch (error) {
        console.error('Error reading file:', error);
        return reject(new Error('Failed to read file content'));
      }

      // Create the file title
      const baseTitle = projectName
        ? `${titlePrefix} ${truncateString(projectName, 200)} - ${linkedEntityId}`
        : `${titlePrefix} ${linkedEntityId}`;

      // Upload file to Salesforce
      conn.sobject('ContentVersion').create(
        {
          Title: baseTitle,
          PathOnClient: file.originalFilename,
          VersionData: fileContent
        },
        async (err, uploadResult) => {
          if (err || !uploadResult.success) {
            console.error('Error uploading file to Salesforce:', err);
            return reject(err || new Error('File upload failed'));
          }

          console.log('File uploaded successfully:', uploadResult);

          try {
            // Get the ContentDocumentId from the uploaded file
            const contentDocument = await conn
              .sobject<{
                Id: string;
                ContentDocumentId: string;
              }>('ContentVersion')
              .retrieve(uploadResult.id);

            // Link the document to the specified entity
            await conn.sobject('ContentDocumentLink').create({
              ContentDocumentId: contentDocument.ContentDocumentId,
              LinkedEntityId: linkedEntityId,
              ShareType: 'V'
            });

            console.log(`File successfully linked to entity ${linkedEntityId}`);
            resolve({
              success: true,
              contentDocumentId: contentDocument.ContentDocumentId
            });
          } catch (linkError) {
            console.error('Error linking file to entity:', linkError);
            reject(new Error('Failed to link file to entity'));
          }
        }
      );
    } catch (error) {
      if (!SALESFORCE_ENABLED) {
        return resolve({ success: true, contentDocumentId: `MOCK_DOC_${Date.now()}` });
      }
      console.error('Error in uploadFileToSalesforce:', error);
      reject(error);
    }
  });
};
