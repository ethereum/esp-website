import { FC } from 'react';

import { TextField } from '../fields';

interface Props {
  isRequired?: boolean;
}

// Beneficiary name + contact email. Shared by the default (ETH) and exception forms.
export const GranteeFinanceContactFields: FC<Props> = ({ isRequired = true }) => {
  return (
    <>
      <TextField
        id='beneficiaryName'
        label='Beneficiary name'
        helpText='Name of the individual or entity attached to the account receiving the funds.'
        isRequired={isRequired}
        mb={8}
      />

      <TextField
        id='contactEmail'
        label='Contact email'
        helpText='This email address will receive a copy of the submission for your records.'
        isRequired={isRequired}
        mb={8}
      />
    </>
  );
};
