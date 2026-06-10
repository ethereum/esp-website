import { Center, Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { SubmitButton } from '../SubmitButton';
import { Captcha } from '.';
import {
  GranteeFinanceContactFields,
  GranteeFinanceCryptoFields,
  GranteeFinanceRecordFields
} from './granteeFinance';
import { granteeFinanceSchema, GranteeFinanceFormData } from './schemas/GranteeFinance';

import { api } from './api';

import { GRANTEE_FINANCE_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

// Default grantee finance form: Ethereum Foundation grants are paid on-chain in ETH by
// default. Payment preference is fixed to crypto/ETH (no selector) and processed exclusively
// on the Ethereum Mainnet (hardcoded server-side).
export const GranteeFinanceForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const methods = useForm<GranteeFinanceFormData>({
    resolver: zodResolver(granteeFinanceSchema),
    mode: 'all',
    shouldFocusError: true,
    defaultValues: {
      paymentPreference: 'Cryptocurrency',
      token: 'ETH',
      isCentralizedExchange: false
    }
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods;

  const onSubmit = async (data: GranteeFinanceFormData) => {
    return api.granteeFinance
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(GRANTEE_FINANCE_THANK_YOU_PAGE_URL);
        } else {
          if (res.status === 404) {
            toast({
              ...TOAST_OPTIONS,
              title: 'Please make sure the Contract or Security ID is correct.',
              status: 'error'
            });
          } else {
            toast({
              ...TOAST_OPTIONS,
              title: 'Something went wrong while submitting, please try again.',
              status: 'error'
            });

            throw new Error('Network response was not OK');
          }
        }
      })
      .catch(err => console.error('There has been a problem with your operation: ', err.message));
  };

  return (
    <Stack
      w='100%'
      bgGradient='linear(to-br, brand.newsletter.bgGradient.start 10%, brand.newsletter.bgGradient.end 100%)'
      px={{ base: 5, md: 12 }}
      pt={{ base: 8, md: 12 }}
      pb={{ base: 20, md: 16 }}
      borderRadius={{ md: '10px' }}
    >
      <FormProvider {...methods}>
        <form id='grantee-finance-form' onSubmit={handleSubmit(onSubmit)}>
          <GranteeFinanceContactFields />

          <GranteeFinanceCryptoFields />

          <GranteeFinanceRecordFields />

          <Center mb={8}>
            <Captcha />
          </Center>

          <Center>
            <SubmitButton
              isValid
              isSubmitting={isSubmitting}
              height='56px'
              width='190px'
              text='Submit'
            />
          </Center>
        </form>
      </FormProvider>
    </Stack>
  );
};
