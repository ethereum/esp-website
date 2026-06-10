import { Link } from '@chakra-ui/react';
import { FC } from 'react';

import { TextField, TextAreaField } from '../fields';

import { ESP_EMAIL_ADDRESS } from '../../../constants';

interface Props {
  isRequired?: boolean;
}

// Bank / wire-transfer details for the fiat path. Exception form only.
export const GranteeFinanceFiatFields: FC<Props> = ({ isRequired = true }) => {
  return (
    <>
      <TextAreaField
        id='beneficiaryAddress'
        label='Beneficiary address'
        helpText='Personal or business address of the individual or entity receiving the funds. Please provide the full Billing Address. Ex: 100 Smith Street, Chicago, IL 60607 United States.'
        isRequired={isRequired}
        mb={8}
        textareaProps={{ h: '72px', resize: 'none' }}
      />

      <TextField
        id='bankName'
        label='Bank name'
        helpText='Name of receiving bank.'
        isRequired={isRequired}
        mb={8}
      />

      <TextAreaField
        id='bankAddress'
        label='Bank address'
        helpText='Branch address of receiving bank. Please provide the full Billing Address of the bank. Ex: 390 Madison Ave, New York, NY 10017 United States.'
        isRequired={isRequired}
        mb={8}
        textareaProps={{ h: '72px', resize: 'none' }}
      />

      <TextField
        id='IBAN'
        label='International Bank Account Number'
        helpText={
          <>
            Provide an International Bank Account Number (IBAN). If your bank does not provide an
            IBAN, provide your Bank Account Number. Confirm with your bank ahead of time that they
            can receive International Wire Transfers from a Swiss bank. If your bank is unable to
            receive international wire transfers, you will need to choose a different payment method.
            Contact{' '}
            <Link
              fontWeight={700}
              color='brand.orange.100'
              href={`mailto:${ESP_EMAIL_ADDRESS}`}
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              {ESP_EMAIL_ADDRESS}
            </Link>{' '}
            if you have more questions.
          </>
        }
        isRequired={isRequired}
        mb={8}
      />

      <TextField
        id='SWIFTCode'
        label='Bank SWIFT code'
        helpText='A SWIFT Code or Bank Identifier Code (BIC) is used to specify a particular bank or branch. These codes are used when transferring money between banks, particularly for international wire transfers.'
        isRequired={isRequired}
        mb={8}
      />

      <TextField
        id='fiatCurrencyCode'
        label='Fiat currency code'
        helpText="Code of the currency you'd like to receive funds, e.g. EUR, USD, JPY."
        isRequired={isRequired}
        mb={8}
      />
    </>
  );
};
