import jsforce from 'jsforce';
import { NextApiResponse } from 'next';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';

import { GranteeFinanceNextApiRequest } from '../../types';

async function handler(req: GranteeFinanceNextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { body } = req;
    const {
      beneficiaryName: Beneficiary_Name__c,
      contactEmail: User_Email__c,
      notes: Transfer_Notes__c,
      ethAddress: ETH_Address__c,
      daiAddress: DAI_Address__c,
      beneficiaryAddress: Beneficiary_Address__c,
      fiatCurrencyCode: Fiat_Currency__c,
      bankName: Bank_Name__c,
      bankAddress: Bank_Address__c,
      IBAN: IBAN_Account_Number__c,
      SWIFTCode: SWIFT_Code_BIC__c,
      contractID: Contract_ID__c,
      securityID: Security_ID__c,
      l2Payment: Layer2_Payment__c,
      l2Network: Layer_2_Network__c,
      isCentralizedExchange: Centralized_Exchange_Address__c
    } = body;
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    const conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl: SF_PROD_LOGIN_URL
    });

    conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
      if (err) {
        console.error(err);
        return resolve();
      }

      conn
        .sobject<{ Security_ID__c: string }>('Contract')
        .retrieve(Contract_ID__c, function (err, account) {
          if (err) {
            console.error(err);
            res.status(404).json({ status: 'Contract ID not found.' });
            return resolve();
          }

          // validate security ID
          if (Security_ID__c.trim() !== account.Security_ID__c) {
            console.error('Security ID does not match.');
            res.status(404).json({ status: 'Contract ID not found.' });
            return resolve();
          }

          console.log(`Contract ID: ${Contract_ID__c} found! Proceeding to update the record...`);

          // Single record update
          conn.sobject('Contract').update(
            {
              // SF expects an `Id` field, with the id of the object you want to update as value
              // We're updating the Contract object in this case, so `Id` should be `Contract_ID__c`
              Id: Contract_ID__c.trim(),
              Beneficiary_Name__c: Beneficiary_Name__c.trim(),
              User_Email__c: User_Email__c.trim(),
              Transfer_Notes__c: Transfer_Notes__c.trim(),
              ETH_Address__c: ETH_Address__c.trim(),
              DAI_Address__c: DAI_Address__c.trim(),
              Beneficiary_Address__c: Beneficiary_Address__c.trim(),
              Fiat_Currency__c: Fiat_Currency__c.trim(),
              Bank_Name__c: Bank_Name__c.trim(),
              Bank_Address__c: Bank_Address__c.trim(),
              IBAN_Account_Number__c: IBAN_Account_Number__c.trim(),
              SWIFT_Code_BIC__c: SWIFT_Code_BIC__c.trim(),
              Layer2_Payment__c, // this is a boolean value, no trim applied
              Layer_2_Network__c: Layer_2_Network__c.trim(),
              Centralized_Exchange_Address__c
            },
            (err, ret) => {
              if (err || !ret.success) {
                console.error(err);
                res.status(400).json({ status: 'fail' });
                return resolve();
              } else {
                console.log(`Contract with ID: ${Contract_ID__c} has been successfully updated!`);

                res.status(200).json({ status: 'ok' });
                return resolve();
              }
            }
          );
        });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
