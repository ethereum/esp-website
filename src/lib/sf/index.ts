import jsforce from 'jsforce';

import { GrantInitiative, GrantInitiativeSalesforceRecord, GrantInitiativeType } from '../../types';

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
      const baseCriteria: Partial<GrantInitiativeSalesforceRecord> = { Status__c: 'New' };
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
