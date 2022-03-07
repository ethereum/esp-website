import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const {
    beneficiaryName: Beneficiary_Name__c,
    contactEmail: User_Email__c,
    notes: Transfer_Notes__c,
    daiAddress: DAI_Address__c,
    granteeSecurityID: Contract_ID__c,
    l2Payment: Layer2_Payment__c
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

    conn.sobject('Contract').retrieve(Contract_ID__c, function (err, account) {
      if (err) {
        console.error(err);
        res.status(404).json({ status: 'Grantee Security ID not found.' });
      }

      console.log(`Contract ID: ${Contract_ID__c} found! Proceeding to update the record...`);
      console.log({ account });

      // Single record update
      conn.sobject('Contract').update(
        {
          // SF expects an `Id` field, with the id of the object you want to update as value
          // We're updating the Contract object in this case, so `Id` should be `Contract_ID__c`
          Id: Contract_ID__c.trim(),
          Beneficiary_Name__c: Beneficiary_Name__c.trim(),
          User_Email__c: User_Email__c.trim(),
          Transfer_Notes__c: Transfer_Notes__c.trim(),
          DAI_Address__c: DAI_Address__c.trim(),
          Layer2_Payment__c
        },
        (err, ret) => {
          if (err || !ret.success) {
            console.error(err);
            res.status(400).json({ status: 'fail' });
          } else {
            console.log(`Contract with ID: ${Contract_ID__c} has been successfully updated!`);

            res.status(200).json({ status: 'ok' });
          }
        }
      );
    });
  });
}
