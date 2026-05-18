import { NextApiResponse } from 'next';
import { isAddress, getAddress } from 'viem';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';
import { resolveAddressOrEns } from '../../lib/ens';
import { getAuthenticatedConnection } from '../../lib/sf';

import { GranteeFinanceNextApiRequest } from '../../types';

async function handler(req: GranteeFinanceNextApiRequest, res: NextApiResponse): Promise<void> {
  const { body } = req;
  const {
    beneficiaryName: Beneficiary_Name__c,
    contactEmail: User_Email__c,
    notes: Transfer_Notes__c,
    paymentPreference: Contract_Payment_Method__c,
    // New unified crypto fields
    walletAddress,
    walletAddressResolved,
    walletAddressInputType,
    token,
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

  // Server-side address validation for crypto payments
  let verifiedAddress = '';
  if (walletAddressResolved) {
    // Validate input type to prevent bypass attacks
    const validInputTypes = ['ens', 'address'] as const;
    if (!validInputTypes.includes(walletAddressInputType as typeof validInputTypes[number])) {
      console.error('Invalid wallet address input type:', walletAddressInputType);
      res.status(400).json({ status: 'fail', error: 'Invalid input type' });
      return;
    }

    if (walletAddressInputType === 'ens') {
      // Re-verify ENS resolution on server for security
      const result = await resolveAddressOrEns(walletAddress);
      if (!result.success || !result.address) {
        console.error('ENS resolution failed on server:', result.error);
        res.status(400).json({ status: 'fail', error: 'ENS resolution failed' });
        return;
      }
      // Verify the resolved address matches what client sent
      if (result.address.toLowerCase() !== walletAddressResolved.toLowerCase()) {
        console.error('ENS resolution mismatch:', {
          clientResolved: walletAddressResolved,
          serverResolved: result.address
        });
        res.status(400).json({ status: 'fail', error: 'Address verification failed' });
        return;
      }
      verifiedAddress = result.address;
    } else if (walletAddressInputType === 'address') {
      // Validate direct address input
      if (!isAddress(walletAddressResolved)) {
        console.error('Invalid address format:', walletAddressResolved);
        res.status(400).json({ status: 'fail', error: 'Invalid address format' });
        return;
      }
      verifiedAddress = getAddress(walletAddressResolved);
    }
  }

  // Map form fields to new dedicated Salesforce fields
  // See: https://github.com/ethereum/esp-website/issues/495#issuecomment-3814046232
  let Contract_Wallet_Address__c: string | undefined;
  let Contract_Token__c: string | undefined;
  let Contract_Network__c: string | undefined;
  let ENS__c: string | undefined;

  if (verifiedAddress && token) {
    Contract_Wallet_Address__c = verifiedAddress;
    Contract_Token__c = token;
    Contract_Network__c = 'Ethereum Mainnet';

    // Store original ENS name if user submitted an ENS, clear it if they switched to direct address
    if (walletAddressInputType === 'ens' && walletAddress) {
      ENS__c = walletAddress;
    } else if (walletAddressInputType === 'address') {
      // Clear ENS field when user submits a direct address (they may have previously used ENS)
      ENS__c = '';
    }
  }

  let conn;
  try {
    conn = await getAuthenticatedConnection();
  } catch (err) {
    console.error('Salesforce authentication failed:', err);
    res.status(500).json({ status: 'fail' });
    return;
  }

  let contract: { Security_ID__c: string };
  try {
    contract = (await conn.sobject('Contract').retrieve(Contract_ID__c)) as {
      Security_ID__c: string;
    };
  } catch (err) {
    console.error(err);
    res.status(404).json({ status: 'Contract ID not found.' });
    return;
  }

  // validate security ID
  if (Security_ID__c.trim() !== contract.Security_ID__c) {
    console.error('Security ID does not match.');
    res.status(404).json({ status: 'Contract ID not found.' });
    return;
  }

  console.log(`Contract ID: ${Contract_ID__c} found! Proceeding to update the record...`);

  // Build update payload - only include crypto fields if they're being updated
  // This prevents overwriting existing addresses with empty strings
  const updatePayload: Record<string, unknown> = {
    // SF expects an `Id` field, with the id of the object you want to update as value
    Id: Contract_ID__c.trim(),
    Beneficiary_Name__c: Beneficiary_Name__c.trim(),
    User_Email__c: User_Email__c.trim(),
    Transfer_Notes__c: Transfer_Notes__c.trim(),
    Contract_Payment_Method__c: Contract_Payment_Method__c.trim(),
    Beneficiary_Address__c: Beneficiary_Address__c.trim(),
    Fiat_Currency__c: Fiat_Currency__c.trim(),
    Bank_Name__c: Bank_Name__c.trim(),
    Bank_Address__c: Bank_Address__c.trim(),
    IBAN_Account_Number__c: IBAN_Account_Number__c.trim(),
    SWIFT_Code_BIC__c: SWIFT_Code_BIC__c.trim(),
    Centralized_Exchange_Address__c
  };

  // Only add crypto fields if they're being updated (prevents data loss)
  if (Contract_Wallet_Address__c !== undefined) {
    updatePayload.Contract_Wallet_Address__c = Contract_Wallet_Address__c.trim();
  }
  if (Contract_Token__c !== undefined) {
    updatePayload.Contract_Token__c = Contract_Token__c;
  }
  if (Contract_Network__c !== undefined) {
    updatePayload.Contract_Network__c = Contract_Network__c;
  }
  if (ENS__c !== undefined) {
    updatePayload.ENS__c = ENS__c.trim();
  }

  try {
    const ret = await conn
      .sobject('Contract')
      .update(updatePayload as { Id: string; [key: string]: unknown });
    if (!ret.success) {
      console.error('Contract update failed:', ret.errors);
      res.status(400).json({ status: 'fail' });
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: 'fail' });
    return;
  }

  console.log(`Contract with ID: ${Contract_ID__c} has been successfully updated!`);
  res.status(200).json({ status: 'ok' });
}

export default sanitizeFields(verifyCaptcha(handler));
