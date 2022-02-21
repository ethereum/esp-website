import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const {
    beneficiaryName: Beneficiary_Name__c,
    contactEmail: User_Email__c,
    notes: Transfer_Notes__c,
    ethAddress: ETH_Address__c,
    granteeSecurityID: Contract_ID__c
  } = body;
  const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
    process.env;

  const conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: SF_PROD_LOGIN_URL
  });

  conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
    if (err) {
      return console.error(err);
    }

    // Single record upsert
    conn.sobject('Contract').upsert(
      [
        {
          Beneficiary_Name__c,
          User_Email__c,
          Transfer_Notes__c,
          ETH_Address__c
        }
      ],
      Contract_ID__c,
      (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
        } else {
          console.log(`Contract with ID: ${Contract_ID__c} has been updated!`);

          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });
}
