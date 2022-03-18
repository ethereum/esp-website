import {
  Box,
  Center,
  Fade,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha } from '.';

import { api } from './api';

import { GRANTEE_FINANCE_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

import { GranteeFinanceFormData, TokenPreference, PaymentPreference } from '../../types';

export const GranteeFinanceForm: FC = () => {
  const [paymentPreference, setPaymentPreference] = useState<PaymentPreference>('');
  const [tokenPreference, setTokenPreference] = useState<TokenPreference>('ETH');
  const router = useRouter();
  const toast = useToast();
  const methods = useForm<GranteeFinanceFormData>({
    mode: 'onBlur'
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid, isSubmitting },
    reset
  } = methods;

  const hasPaymentPreferenceSet = paymentPreference !== '';
  const receivesCrypto = paymentPreference === 'ETH/DAI';
  const receivesFiat = paymentPreference === 'Fiat';
  const preferETH = receivesCrypto && tokenPreference === 'ETH';
  const preferDAI = receivesCrypto && tokenPreference === 'DAI';

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
              title: 'Please make sure the Security Grantee ID is correct.',
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
          {/* If the component doesn't expose input's ref, we should use the Controller component, */}
          {/* which will take care of the registration process (https://react-hook-form.com/get-started#IntegratingwithUIlibraries) */}
          <Controller
            name='paymentPreference'
            control={control}
            rules={{ required: true }}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <FormControl
                id='eth-dai-or-fiat-control'
                isRequired
                mb={paymentPreference === '' ? -4 : 8}
              >
                <FormLabel htmlFor='ethDaiOrFiat' mb={4}>
                  <PageText display='inline' fontSize='input'>
                    Payment preference
                  </PageText>
                </FormLabel>

                <RadioGroup
                  id='ethDaiOrFiat'
                  onChange={(value: PaymentPreference) => {
                    onChange(value);
                    setPaymentPreference(value);
                  }}
                  value={value}
                  fontSize='input'
                  colorScheme='white'
                >
                  <Stack direction='row'>
                    <Radio id='ETH/DAI' size='lg' name='ethDaiOrFiat' value='ETH/DAI' mr={8}>
                      <PageText fontSize='input'>Receive ETH/DAI</PageText>
                    </Radio>

                    <Radio id='team' size='lg' name='ethDaiOrFiat' value='Fiat'>
                      <PageText fontSize='input'>Receive Fiat</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
          />

          <Box display={hasPaymentPreferenceSet ? 'block' : 'none'}>
            <Fade in={hasPaymentPreferenceSet} delay={0.25}>
              <FormControl
                id='beneficiary-name-control'
                isRequired={hasPaymentPreferenceSet}
                mb={8}
              >
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
                  {...register('beneficiaryName', { required: true, maxLength: 100 })}
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

              <FormControl id='contact-email-control' isRequired={hasPaymentPreferenceSet} mb={8}>
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
                  {...register('contactEmail', { required: true })}
                />

                {errors?.contactEmail?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Contact email is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <Box display={receivesCrypto ? 'block' : 'none'}>
            <Fade in={receivesCrypto} delay={0.25}>
              <Controller
                name='tokenPreference'
                control={control}
                rules={{ required: receivesCrypto }}
                defaultValue='ETH'
                render={({ field: { onChange, value } }) => (
                  <FormControl id='token-preference-control' isRequired={receivesCrypto} mb={8}>
                    <FormLabel htmlFor='tokenPreference' mb={4}>
                      <PageText display='inline' fontSize='input'>
                        Token payment preference
                      </PageText>
                    </FormLabel>

                    <RadioGroup
                      id='tokenPreference'
                      onChange={(value: TokenPreference) => {
                        onChange(value);
                        setTokenPreference(value);
                      }}
                      value={value}
                      fontSize='input'
                      colorScheme='white'
                    >
                      <Stack direction='row'>
                        <Radio id='ETH' size='lg' name='tokenPreference' value='ETH' mr={8}>
                          <PageText fontSize='input'>Receive ETH</PageText>
                        </Radio>

                        <Radio id='team' size='lg' name='tokenPreference' value='DAI'>
                          <PageText fontSize='input'>Receive DAI</PageText>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                )}
              />

              <Controller
                name='l2Payment'
                control={control}
                rules={{ required: receivesCrypto }}
                defaultValue='No'
                render={({ field: { onChange, value } }) => (
                  <FormControl id='l2Payment-control' isRequired={receivesCrypto} mb={8}>
                    <FormLabel htmlFor='l2Payment' mb={1}>
                      <PageText display='inline' fontSize='input'>
                        Layer 2 Payment
                      </PageText>
                    </FormLabel>

                    <PageText as='small' fontSize='helpText' color='brand.helpText'>
                      Select &lsquo;Yes&rsquo; if you would like your payment to be processed on a
                      Layer 2 network, versus the Ethereum Mainnet. The ESP team will be in touch to
                      confirm which Layer 2 network.
                    </PageText>

                    <RadioGroup
                      id='l2Payment'
                      onChange={onChange}
                      value={value}
                      fontSize='input'
                      colorScheme='white'
                      mt={3}
                    >
                      <Stack direction='row'>
                        <Radio id='ETH' size='lg' name='l2Payment' value='Yes' mr={8}>
                          <PageText fontSize='input'>Yes</PageText>
                        </Radio>

                        <Radio id='team' size='lg' name='l2Payment' value='No'>
                          <PageText fontSize='input'>No</PageText>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Fade>
          </Box>

          <Box display={preferETH ? 'block' : 'none'}>
            <Fade in={preferETH} delay={0.25}>
              <FormControl id='eth-address-control' isRequired={preferETH} mb={8}>
                <FormLabel htmlFor='ethAddress' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    ETH Address
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Ethereum address to receive ETH. Make sure it&apos;s a secured wallet that you
                  control.
                </PageText>

                <Input
                  id='ethAddress'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('ethAddress', {
                    required: preferETH,
                    maxLength: 50,
                    pattern: /^(0x){1}[0-9a-fA-F]{40}$/
                  })}
                />

                {errors?.ethAddress?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      ETH address is required.
                    </PageText>
                  </Box>
                )}
                {errors?.ethAddress?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      ETH address cannot exceed 50 characters.
                    </PageText>
                  </Box>
                )}
                {errors?.ethAddress?.type === 'pattern' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      ETH address must have a valid format.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <Box display={preferDAI ? 'block' : 'none'}>
            <Fade in={preferDAI} delay={0.25}>
              <FormControl id='dai-address-control' isRequired={preferDAI} mb={8}>
                <FormLabel htmlFor='daiAddress' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    DAI Address
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Ethereum address to receive DAI. Make sure it&apos;s a secured wallet that you
                  control.
                </PageText>

                <Input
                  id='daiAddress'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('daiAddress', {
                    required: preferDAI,
                    maxLength: 50,
                    pattern: /^(0x){1}[0-9a-fA-F]{40}$/
                  })}
                />

                {errors?.daiAddress?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      ETH address is required.
                    </PageText>
                  </Box>
                )}
                {errors?.daiAddress?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      ETH address cannot exceed 50 characters.
                    </PageText>
                  </Box>
                )}
                {errors?.daiAddress?.type === 'pattern' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      DAI address must have a valid format.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <Box display={receivesFiat ? 'block' : 'none'}>
            <Fade in={receivesFiat} delay={0.25}>
              <FormControl id='beneficiary-address-control' isRequired={receivesFiat} mb={8}>
                <FormLabel htmlFor='beneficiaryAddress' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Beneficiary address
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Personal or business address of the individual or entity receiving the funds.
                </PageText>

                <Input
                  id='beneficiaryAddress'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('beneficiaryAddress', { required: receivesFiat, maxLength: 255 })}
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
                      Beneficiary address cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='fiat-currency-code-control' isRequired={receivesFiat} mb={8}>
                <FormLabel htmlFor='fiatCurrencyCode' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Fiat currency code
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Code of the currency you&apos;d like to receive funds, e.g. EUR, USD, RUB.
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
                  {...register('fiatCurrencyCode', { required: receivesFiat, maxLength: 3 })}
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

              <FormControl id='bank-name-control' isRequired={receivesFiat} mb={8}>
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
                  {...register('bankName', { required: receivesFiat, maxLength: 100 })}
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

              <FormControl id='bank-address-control' isRequired={receivesFiat} mb={8}>
                <FormLabel htmlFor='bankAddress' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Bank address
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Branch address of receiving bank.
                </PageText>

                <Input
                  id='bankAddress'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('bankAddress', { required: receivesFiat, maxLength: 255 })}
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
                      Bank address cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='iban-control' isRequired={receivesFiat} mb={8}>
                <FormLabel htmlFor='iban' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    International Bank Account Number
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Provide an International Bank Account Number (IBAN).
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
                  {...register('IBAN', { required: receivesFiat, maxLength: 50 })}
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

              <FormControl id='swift-code-control' mb={8}>
                <FormLabel htmlFor='SWIFTCode' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Bank SWIFT code
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  A SWIFT Code or Bank Identifier Code (BIC) is used to specify a particular bank or
                  branch. These codes are used when transferring money between banks, particularly
                  for international wire transfers.
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
                  {...register('SWIFTCode', { maxLength: 100 })}
                />

                {errors?.SWIFTCode?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      SWIFT code cannot exceed 100 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <Box display={hasPaymentPreferenceSet ? 'block' : 'none'}>
            <Fade in={hasPaymentPreferenceSet} delay={0.25}>
              <FormControl id='notes-control' mb={8}>
                <FormLabel htmlFor='notes' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Notes
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Anything else we should know?
                </PageText>

                <Textarea
                  id='notes'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  color='brand.paragraph'
                  fontSize='input'
                  h='150px'
                  mt={3}
                  {...register('notes', {
                    maxLength: 32768
                  })}
                />

                {errors?.notes?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Notes cannot exceed 32768 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl
                id='grantee-security-id-control'
                isRequired={hasPaymentPreferenceSet}
                mb={8}
              >
                <FormLabel htmlFor='granteeSecurityID' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Grantee Security ID
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  The key phrase provided to you by ESP.
                </PageText>

                <Input
                  id='granteeSecurityID'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('granteeSecurityID', { required: true, maxLength: 18 })}
                />

                {errors?.granteeSecurityID?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Grantee Security ID is required.
                    </PageText>
                  </Box>
                )}
                {errors?.granteeSecurityID?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Grantee Security ID cannot exceed 18 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <Box display={hasPaymentPreferenceSet ? 'block' : 'none'}>
            <Fade in={hasPaymentPreferenceSet} delay={0.25}>
              <Center mb={8}>
                <Captcha />
              </Center>

              <Center>
                <SubmitButton
                  isValid={isValid}
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
