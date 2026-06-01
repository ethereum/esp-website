import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { PageText } from '../../UI';

import { GranteeFinanceFormData } from '../../../types';

interface Props {
  isRequired?: boolean;
}

// Beneficiary name + contact email. Shared by the default (ETH) and exception forms.
export const GranteeFinanceContactFields: FC<Props> = ({ isRequired = true }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<GranteeFinanceFormData>();

  return (
    <>
      <FormControl id='beneficiary-name-control' isRequired={isRequired} mb={8}>
        <FormLabel htmlFor='beneficiaryName' mb={1}>
          <PageText display='inline' fontSize='input'>
            Beneficiary name
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          Name of the individual or entity attached to the account receiving the funds.
        </PageText>

        <Input
          id='beneficiaryName'
          type='text'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          h='56px'
          _placeholder={{ fontSize: 'input' }}
          color='brand.paragraph'
          fontSize='input'
          mt={3}
          {...register('beneficiaryName', { required: isRequired, maxLength: 100 })}
        />

        {errors?.beneficiaryName?.type === 'required' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Beneficiary name is required.
            </PageText>
          </Box>
        )}
        {errors?.beneficiaryName?.type === 'maxLength' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Beneficiary name cannot exceed 100 characters.
            </PageText>
          </Box>
        )}
      </FormControl>

      <FormControl id='contact-email-control' isRequired={isRequired} mb={8}>
        <FormLabel htmlFor='contactEmail' mb={1}>
          <PageText display='inline' fontSize='input'>
            Contact email
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          This email address will receive a copy of the submission for your records.
        </PageText>

        <Input
          id='contactEmail'
          type='email'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          h='56px'
          color='brand.paragraph'
          fontSize='input'
          mt={3}
          {...register('contactEmail', { required: isRequired })}
        />

        {errors?.contactEmail?.type === 'required' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Contact email is required.
            </PageText>
          </Box>
        )}
      </FormControl>
    </>
  );
};
