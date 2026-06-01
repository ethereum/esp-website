import { Box, FormControl, FormLabel, Input, Link, Textarea } from '@chakra-ui/react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { PageText } from '../../UI';

import { ESP_EMAIL_ADDRESS, MAX_TEXT_LENGTH } from '../../../constants';

import { GranteeFinanceFormData } from '../../../types';

interface Props {
  isRequired?: boolean;
}

// Bank / wire-transfer details for the fiat path. Exception form only.
export const GranteeFinanceFiatFields: FC<Props> = ({ isRequired = true }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<GranteeFinanceFormData>();

  return (
    <>
      <FormControl id='beneficiary-address-control' isRequired={isRequired} mb={8}>
        <FormLabel htmlFor='beneficiaryAddress' mb={1}>
          <PageText display='inline' fontSize='input'>
            Beneficiary address
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          Personal or business address of the individual or entity receiving the funds. Please
          provide the full Billing Address. Ex: 100 Smith Street, Chicago, IL 60607 United States.
        </PageText>

        <Textarea
          id='beneficiaryAddress'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          color='brand.paragraph'
          fontSize='input'
          h='72px'
          mt={3}
          resize='none'
          {...register('beneficiaryAddress', {
            required: isRequired,
            maxLength: MAX_TEXT_LENGTH
          })}
        />

        {errors?.beneficiaryAddress?.type === 'required' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Beneficiary address is required.
            </PageText>
          </Box>
        )}
        {errors?.beneficiaryAddress?.type === 'maxLength' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Beneficiary address cannot exceed {MAX_TEXT_LENGTH} characters.
            </PageText>
          </Box>
        )}
      </FormControl>

      <FormControl id='bank-name-control' isRequired={isRequired} mb={8}>
        <FormLabel htmlFor='bankName' mb={1}>
          <PageText display='inline' fontSize='input'>
            Bank name
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          Name of receiving bank.
        </PageText>

        <Input
          id='bankName'
          type='text'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          h='56px'
          _placeholder={{ fontSize: 'input' }}
          color='brand.paragraph'
          fontSize='input'
          mt={3}
          {...register('bankName', { required: isRequired, maxLength: 100 })}
        />

        {errors?.bankName?.type === 'required' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Bank name is required.
            </PageText>
          </Box>
        )}
        {errors?.bankName?.type === 'maxLength' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Bank name cannot exceed 100 characters.
            </PageText>
          </Box>
        )}
      </FormControl>

      <FormControl id='bank-address-control' isRequired={isRequired} mb={8}>
        <FormLabel htmlFor='bankAddress' mb={1}>
          <PageText display='inline' fontSize='input'>
            Bank address
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          Branch address of receiving bank. Please provide the full Billing Address of the bank. Ex:
          390 Madison Ave, New York, NY 10017 United States.
        </PageText>

        <Textarea
          id='bankAddress'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          color='brand.paragraph'
          fontSize='input'
          h='72px'
          mt={3}
          resize='none'
          {...register('bankAddress', {
            required: isRequired,
            maxLength: MAX_TEXT_LENGTH
          })}
        />

        {errors?.bankAddress?.type === 'required' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Bank address is required.
            </PageText>
          </Box>
        )}
        {errors?.bankAddress?.type === 'maxLength' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Bank address cannot exceed {MAX_TEXT_LENGTH} characters.
            </PageText>
          </Box>
        )}
      </FormControl>

      <FormControl id='iban-control' isRequired={isRequired} mb={8}>
        <FormLabel htmlFor='iban' mb={1}>
          <PageText display='inline' fontSize='input'>
            International Bank Account Number
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          Provide an International Bank Account Number (IBAN). If your bank does not provide an IBAN,
          provide your Bank Account Number. Confirm with your bank ahead of time that they can
          receive International Wire Transfers from a Swiss bank. If your bank is unable to receive
          international wire transfers, you will need to choose a different payment method. Contact{' '}
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
        </PageText>

        <Input
          id='iban'
          type='text'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          h='56px'
          _placeholder={{ fontSize: 'input' }}
          color='brand.paragraph'
          fontSize='input'
          mt={3}
          {...register('IBAN', { required: isRequired, maxLength: 50 })}
        />

        {errors?.IBAN?.type === 'required' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              IBAN is required.
            </PageText>
          </Box>
        )}
        {errors?.IBAN?.type === 'maxLength' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              IBAN cannot exceed 50 characters.
            </PageText>
          </Box>
        )}
      </FormControl>

      <FormControl id='swift-code-control' isRequired={isRequired} mb={8}>
        <FormLabel htmlFor='SWIFTCode' mb={1}>
          <PageText display='inline' fontSize='input'>
            Bank SWIFT code
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          A SWIFT Code or Bank Identifier Code (BIC) is used to specify a particular bank or branch.
          These codes are used when transferring money between banks, particularly for international
          wire transfers.
        </PageText>

        <Input
          id='SWIFTCode'
          type='text'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          h='56px'
          _placeholder={{ fontSize: 'input' }}
          color='brand.paragraph'
          fontSize='input'
          mt={3}
          {...register('SWIFTCode', { required: isRequired, maxLength: 100 })}
        />

        {errors?.SWIFTCode?.type === 'required' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              SWIFT code is required.
            </PageText>
          </Box>
        )}
        {errors?.SWIFTCode?.type === 'maxLength' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              SWIFT code cannot exceed 100 characters.
            </PageText>
          </Box>
        )}
      </FormControl>

      <FormControl id='fiat-currency-code-control' isRequired={isRequired} mb={8}>
        <FormLabel htmlFor='fiatCurrencyCode' mb={1}>
          <PageText display='inline' fontSize='input'>
            Fiat currency code
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          Code of the currency you&apos;d like to receive funds, e.g. EUR, USD, JPY.
        </PageText>

        <Input
          id='fiatCurrencyCode'
          type='text'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          h='56px'
          _placeholder={{ fontSize: 'input' }}
          color='brand.paragraph'
          fontSize='input'
          mt={3}
          {...register('fiatCurrencyCode', { required: isRequired, maxLength: 3 })}
        />

        {errors?.fiatCurrencyCode?.type === 'required' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Currency code is required.
            </PageText>
          </Box>
        )}
        {errors?.fiatCurrencyCode?.type === 'maxLength' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Currency code cannot exceed 3 characters.
            </PageText>
          </Box>
        )}
      </FormControl>
    </>
  );
};
