import jsforce from 'jsforce';

const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
  process.env;

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
