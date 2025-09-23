import jsforce from 'jsforce';

import { GrantInitiative, GrantInitiativeSalesforceRecord, GrantInitiativeType } from '../../types';

const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
  process.env;

const conn = new jsforce.Connection({
  loginUrl: SF_PROD_LOGIN_URL
});

const WISHLIST_RECORD_TYPE_ID = '012bW000001CnfVQAS';
const RFP_RECORD_TYPE_ID = '012bW000001Cnh7QAC';
const DIRECT_GRANT_RECORD_TYPE_ID = '012bW000001CndtQAC';

const getGrantInitiativeType = (recordTypeId: string): GrantInitiativeType | null => {
  if (recordTypeId === WISHLIST_RECORD_TYPE_ID) return 'Wishlist';
  if (recordTypeId === RFP_RECORD_TYPE_ID) return 'RFP';
  if (recordTypeId === DIRECT_GRANT_RECORD_TYPE_ID) return 'Direct Grant';
  return null;
};

const getRecordTypeIdForType = (type: GrantInitiativeType): string => {
  if (type === 'Wishlist') return WISHLIST_RECORD_TYPE_ID;
  if (type === 'RFP') return RFP_RECORD_TYPE_ID;
  return DIRECT_GRANT_RECORD_TYPE_ID;
};

export function getGrantInitiativeItems(type?: GrantInitiativeType) {
  return new Promise<GrantInitiative[]>((resolve, reject) => {
    conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
      if (err) {
        return reject(err);
      }

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
    });
  });
}
