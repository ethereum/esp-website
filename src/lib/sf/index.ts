import fs from 'fs';
import jsforce from 'jsforce';
import type { File } from 'formidable';

import { GrantInitiative, GrantInitiativeSalesforceRecord, GrantInitiativeType } from '../../types';
import { truncateString } from '../../utils/truncateString';

const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
  process.env;

export const WISHLIST_RECORD_TYPE_ID = '012Vj000008tfPKIAY';
export const RFP_RECORD_TYPE_ID = '012Vj000008tfPJIAY';

const createConnection = (): jsforce.Connection => {
  return new jsforce.Connection({
    loginUrl: SF_PROD_LOGIN_URL
  });
};

const loginToSalesforce = (conn: jsforce.Connection): Promise<void> => {
  return new Promise((resolve, reject) => {
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

      // TODO: Change to `Active` before deploying to production
      const baseCriteria: Partial<GrantInitiativeSalesforceRecord> = { Status__c: 'Active' };
      const criteria =
        type != null
          ? { ...baseCriteria, RecordTypeId: getRecordTypeIdForType(type) }
          : baseCriteria;

      conn
        .sobject('Grant_Initiative__c')
        .find<GrantInitiativeSalesforceRecord>(
          criteria,
          'Id,Name,Description__c,RecordTypeId',
          (err, ret) => {
            if (err) {
              console.error(err);
              return reject(err);
            }

            const grantInitiativeItems = ret.reduce<GrantInitiative[]>((acc, record) => {
              const grantInitiativeType = getGrantInitiativeType(record.RecordTypeId);
              if (!grantInitiativeType) return acc;
              acc.push({
                Id: record.Id,
                Name: record.Name,
                Description__c: record.Description__c
              });
              return acc;
            }, []);

            return resolve(grantInitiativeItems);
          }
        );
    } catch (error) {
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
      console.error(`Error in create${objectType}:`, error);
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
      console.error('Error in uploadFileToSalesforce:', error);
      reject(error);
    }
  });
};
