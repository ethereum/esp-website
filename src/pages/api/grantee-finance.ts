import jsforce from 'jsforce';
import { NextApiResponse } from 'next';
import { isAddress, getAddress } from 'viem';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';
import { resolveAddressOrEns } from '../../lib/ens';

import { GranteeFinanceNextApiRequest } from '../../types';

async function handler(req: GranteeFinanceNextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(async resolve => {
    const { body } = req;
    const {
      beneficiaryName: Beneficiary_Name__c,
      contactEmail: User_Email__c,
      notes: Transfer_Notes__c,
      // New unified crypto fields
      walletAddress,
      walletAddressResolved,
      walletAddressInputType,
      token,
      network,
      // Fiat fields
      beneficiaryAddress: Beneficiary_Address__c,
      fiatCurrencyCode: Fiat_Currency__c,
      bankName: Bank_Name__c,
      bankAddress: Bank_Address__c,
      IBAN: IBAN_Account_Number__c,
      SWIFTCode: SWIFT_Code_BIC__c,
      // Common fields
      contractID: Contract_ID__c,
      securityID: Security_ID__c,
      isCentralizedExchange: Centralized_Exchange_Address__c
    } = body;
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    // Server-side address validation for crypto payments
    let verifiedAddress = '';
    if (walletAddressResolved) {
      if (walletAddressInputType === 'ens') {
        // Re-verify ENS resolution on server for security
        const result = await resolveAddressOrEns(walletAddress);
        if (!result.success || !result.address) {
          console.error('ENS resolution failed on server:', result.error);
          res.status(400).json({ status: 'fail', error: 'ENS resolution failed' });
          return resolve();
        }
        // Verify the resolved address matches what client sent
        if (result.address.toLowerCase() !== walletAddressResolved.toLowerCase()) {
          console.error('ENS resolution mismatch:', {
            clientResolved: walletAddressResolved,
            serverResolved: result.address
          });
          res.status(400).json({ status: 'fail', error: 'Address verification failed' });
          return resolve();
        }
        verifiedAddress = result.address;
      } else if (walletAddressInputType === 'address') {
        // Validate direct address input
        if (!isAddress(walletAddressResolved)) {
          console.error('Invalid address format:', walletAddressResolved);
          res.status(400).json({ status: 'fail', error: 'Invalid address format' });
          return resolve();
        }
        verifiedAddress = getAddress(walletAddressResolved);
      }
    }

    // Map new fields to legacy Salesforce fields for backward compatibility
    let ETH_Address__c = '';
    let DAI_Address__c = '';
    let Layer2_Payment__c = false;
    let Layer_2_Network__c = '';

    if (verifiedAddress && token) {
      // Set address based on token preference
      if (token === 'ETH') {
        ETH_Address__c = verifiedAddress;
      } else if (token === 'DAI') {
        DAI_Address__c = verifiedAddress;
      }

      // Set L2 fields based on network selection
      if (network && network !== 'Ethereum Mainnet') {
        Layer2_Payment__c = true;
        Layer_2_Network__c = network;
      }
    }

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
