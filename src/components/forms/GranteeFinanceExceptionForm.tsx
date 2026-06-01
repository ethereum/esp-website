import { Box, Center, Fade, FormControl, FormLabel, Radio, RadioGroup, Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { Controller, FormProvider, Resolver, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha } from '.';
import {
  GranteeFinanceContactFields,
  GranteeFinanceCryptoFields,
  GranteeFinanceFiatFields,
  GranteeFinanceRecordFields
} from './granteeFinance';
import { granteeFinanceExceptionSchema } from './schemas/GranteeFinance';

import { api } from './api';

import { GRANTEE_FINANCE_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

import { GranteeFinanceFormData, PaymentPreference } from '../../types';

// Exception grantee finance form: only sent in pre-approved cases by the Grant Management
// team. Grantees choose between a stablecoin (DAI) payment or a fiat wire transfer. The
// underlying SF picklist values stay 'Cryptocurrency' / 'Fiat'; only the labels differ.
export const GranteeFinanceExceptionForm: FC = () => {
  const [paymentPreference, setPaymentPreference] = useState<PaymentPreference>('');
  const router = useRouter();
  const toast = useToast();
  const methods = useForm<GranteeFinanceFormData>({
    resolver: zodResolver(granteeFinanceExceptionSchema) as Resolver<GranteeFinanceFormData>,
    mode: 'all',
    shouldFocusError: true
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    getValues,
    watch
  } = methods;

  const hasPaymentPreferenceSet = paymentPreference !== '';
  const receivesStablecoin = paymentPreference === 'Cryptocurrency';
  const receivesFiat = paymentPreference === 'Fiat';

  // for conditional fields, get the current values
  const bankAddress = watch('bankAddress');
  const fiatCurrencyCode = watch('fiatCurrencyCode');

  // if the bank address contains the string 'India' or the fiat currency code
  // is 'INR', alert for IFSC code within Notes field
  const isIndianBank =
    bankAddress?.toLowerCase().includes('india') || fiatCurrencyCode?.toLowerCase() === 'inr';

  // if the fiat currency code is 'KRW', alert for National ID of the individual,
  // or the Tax ID of the entity in the Notes field
  const isKoreanBank =
    bankAddress?.toLowerCase().includes('korea') || fiatCurrencyCode?.toLowerCase() === 'krw';

  const notesHint = (
    <>
      {isIndianBank && (
        <Box mt={1}>
          <PageText as='small' fontSize='helpText' color='red.500'>
            If you are using an Indian bank, please include your IFSC code
          </PageText>
        </Box>
      )}

      {isKoreanBank && (
        <Box mt={1}>
          <PageText as='small' fontSize='helpText' color='red.500'>
            If you are using a Korean bank, please include your National ID or Tax ID
          </PageText>
        </Box>
      )}
    </>
  );

  const onSubmit = async (data: GranteeFinanceFormData) => {
    const {
      // crypto-only keys
      walletAddress,
      walletAddressResolved,
      walletAddressInputType,
      isCentralizedExchange,
      // fiat-only keys
      beneficiaryAddress,
      fiatCurrencyCode,
      bankName,
      bankAddress,
      IBAN,
      SWIFTCode,
      ...common
    } = data;

    // Send only the keys relevant to the selected payment method. The hidden path's
    // fields are still mounted (and reset to ''), so including them would let the
    // server's presence guards overwrite the other method's stored values with empties.
    const methodFields = receivesStablecoin
      ? {
          walletAddress,
          walletAddressResolved,
          walletAddressInputType,
          isCentralizedExchange,
          token: 'DAI' as const
        }
      : { beneficiaryAddress, fiatCurrencyCode, bankName, bankAddress, IBAN, SWIFTCode };

    return api.granteeFinance
      .submit({ ...common, ...methodFields })
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
        <form id='grantee-finance-exception-form' onSubmit={handleSubmit(onSubmit)}>
          {/* If the component doesn't expose input's ref, we should use the Controller component, */}
          {/* which will take care of the registration process (https://react-hook-form.com/get-started#IntegratingwithUIlibraries) */}
          <Controller
            name='paymentPreference'
            control={control}
            rules={{ required: true }}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <FormControl
                id='stablecoin-or-fiat-control'
                isRequired
                mb={paymentPreference === '' ? -4 : 8}
              >
                <FormLabel htmlFor='stablecoinOrFiat' mb={4}>
                  <PageText display='inline' fontSize='input'>
                    Payment preference
                  </PageText>
                </FormLabel>

                <RadioGroup
                  id='stablecoinOrFiat'
                  onChange={(value: PaymentPreference) => {
                    onChange(value);
                    setPaymentPreference(value);
                    reset({
                      // keep paymentPreference, beneficiaryName, contactEmail, notes and contractID
                      // reset the other fields
                      ...getValues(),
                      beneficiaryAddress: '',
                      fiatCurrencyCode: '',
                      bankName: '',
                      bankAddress: '',
                      IBAN: '',
                      SWIFTCode: '',
                      walletAddress: '',
                      walletAddressResolved: '',
                      walletAddressInputType: '',
                      token: ''
                    });
                  }}
                  value={value}
                  fontSize='input'
                  colorScheme='white'
                >
                  <Stack direction='row'>
                    <Radio size='lg' name='stablecoinOrFiat' value='Cryptocurrency' mr={8}>
                      <PageText fontSize='input'>Receive Stablecoin</PageText>
                    </Radio>

                    <Radio size='lg' name='stablecoinOrFiat' value='Fiat'>
                      <PageText fontSize='input'>Receive Fiat</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
          />

          <Box display={hasPaymentPreferenceSet ? 'block' : 'none'}>
            <Fade in={hasPaymentPreferenceSet} delay={0.25}>
              <GranteeFinanceContactFields isRequired={hasPaymentPreferenceSet} />
            </Fade>
          </Box>

          <Box display={receivesStablecoin ? 'block' : 'none'}>
            <Fade in={receivesStablecoin} delay={0.25}>
              <GranteeFinanceCryptoFields token='DAI' isRequired={receivesStablecoin} />
            </Fade>
          </Box>

          <Box display={receivesFiat ? 'block' : 'none'}>
            <Fade in={receivesFiat} delay={0.25}>
              <GranteeFinanceFiatFields isRequired={receivesFiat} />
            </Fade>
          </Box>

          <Box display={hasPaymentPreferenceSet ? 'block' : 'none'}>
            <Fade in={hasPaymentPreferenceSet} delay={0.25}>
              <GranteeFinanceRecordFields
                notesHint={notesHint}
                isRequired={hasPaymentPreferenceSet}
              />
            </Fade>
          </Box>

          <Box display={hasPaymentPreferenceSet ? 'block' : 'none'}>
            <Fade in={hasPaymentPreferenceSet} delay={0.25}>
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
            </Fade>
          </Box>
        </form>
      </FormProvider>
    </Stack>
  );
};
