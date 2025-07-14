import {
  Box,
  Center,
  Fade,
  FormControl,
  FormLabel,
  Input,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Select } from 'chakra-react-select';

import { PageText, DropdownIndicator } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha } from '.';

import { api } from './api';

import {
  ESP_EMAIL_ADDRESS,
  GRANTEE_FINANCE_THANK_YOU_PAGE_URL,
  MAX_TEXT_AREA_LENGTH,
  MAX_TEXT_LENGTH,
  TOAST_OPTIONS
} from '../../constants';

import { chakraStyles } from './selectStyles';

import { GranteeFinanceFormData, TokenPreference, PaymentPreference } from '../../types';
import { SUPPORTED_LAYERS_2_OPTIONS } from './constants';

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
    reset,
    getValues,
    watch
  } = methods;

  const hasPaymentPreferenceSet = paymentPreference !== '';
  const receivesCrypto = paymentPreference === 'ETH/DAI';
  const receivesFiat = paymentPreference === 'Fiat';
  const preferETH = receivesCrypto && tokenPreference === 'ETH';
  const preferDAI = receivesCrypto && tokenPreference === 'DAI';

  // for conditional fields, get the current values
  const bankAddress = watch('bankAddress');
  const fiatCurrencyCode = watch('fiatCurrencyCode');
  const isL2Selected = watch('l2Payment')?.includes('Yes');

  // if the bank address contains the string 'India' or the fiat currency code
  // is 'INR', alert for IFSC code within Notes field
  const isIndianBank =
    bankAddress?.toLowerCase().includes('india') || fiatCurrencyCode?.toLowerCase() === 'inr';

  // if the fiat currency code is 'KRW', alert for National ID of the individual,
  // or the Tax ID of the entity in the Notes field
  const isKoreanBank =
    bankAddress?.toLowerCase().includes('korea') || fiatCurrencyCode?.toLowerCase() === 'krw';

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
                      tokenPreference: 'ETH',
                      l2Payment: 'No',
                      ethAddress: '',
                      daiAddress: ''
                    });
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
                        reset({
                          // keep paymentPreference, beneficiaryName, contactEmail, notes and contractID
                          // reset the other fields
                          ...getValues(),
                          ethAddress: '',
                          daiAddress: ''
                        });
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
                      Layer 2 network, versus the Ethereum Mainnet.
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

              <Box display={isL2Selected ? 'block' : 'none'}>
                <Fade in={isL2Selected} delay={0.25}>
                  <Controller
                    name='l2Network'
                    control={control}
                    rules={{
                      required: isL2Selected,
                      validate: value => value !== ''
                    }}
                    render={({ field: { onChange }, fieldState: { error } }) => (
                      <FormControl id='l2Network-control' isRequired={receivesCrypto} mb={8}>
                        <FormLabel htmlFor='l2Network' mb={1}>
                          <PageText display='inline' fontSize='input'>
                            Which Layer 2 Network?
                          </PageText>
                        </FormLabel>

                        <PageText as='small' fontSize='helpText' color='brand.helpText'>
                          These are the networks we currently support.
                        </PageText>

                        <Box mt={3}>
                          <Select
                            id='l2Network'
                            options={SUPPORTED_LAYERS_2_OPTIONS}
                            onChange={option =>
                              onChange(
                                (option as (typeof SUPPORTED_LAYERS_2_OPTIONS)[number]).value
                              )
                            }
                            components={{ DropdownIndicator }}
                            placeholder='Select'
                            closeMenuOnSelect={true}
                            selectedOptionColor='brand.option'
                            chakraStyles={chakraStyles}
                          />
                        </Box>

                        {error && (
                          <Box mt={1}>
                            <PageText as='small' fontSize='helpText' color='red.500'>
                              Layer 2 network is required.
                            </PageText>
                          </Box>
                        )}
                      </FormControl>
                    )}
                  />
                </Fade>
              </Box>
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

          <Box display={receivesCrypto ? 'block' : 'none'}>
            <Fade in={receivesCrypto} delay={0.25}>
              <Controller
                name='isCentralizedExchange'
                control={control}
                rules={{ required: receivesCrypto }}
                defaultValue='No'
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    id='isCentralizedExchange-control'
                    isRequired={receivesCrypto}
                    mb={8}
                  >
                    <FormLabel htmlFor='isCentralizedExchange' mb={1}>
                      <PageText display='inline' fontSize='input'>
                        Is this address hosted on a centralized exchange?
                      </PageText>
                    </FormLabel>

                    <RadioGroup
                      id='isCentralizedExchange'
                      onChange={onChange}
                      value={value}
                      fontSize='input'
                      colorScheme='white'
                      mt={3}
                    >
                      <Stack direction='row'>
                        <Radio
                          id='is-centralized-exchange-yes'
                          size='lg'
                          name='isCentralizedExchange'
                          value='Yes'
                          mr={8}
                        >
                          <PageText fontSize='input'>Yes</PageText>
                        </Radio>

                        <Radio
                          id='is-centralized-exchange-no'
                          size='lg'
                          name='isCentralizedExchange'
                          value='No'
                        >
                          <PageText fontSize='input'>No</PageText>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                )}
              />
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
                  Please provide the full Billing Address. Ex: 100 Smith Street, Chicago, IL 60607
                  United States.
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
                    required: receivesFiat,
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
                  Branch address of receiving bank. Please provide the full Billing Address of the
                  bank. Ex: 390 Madison Ave, New York, NY 10017 United States.
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
                    required: receivesFiat,
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

              <FormControl id='iban-control' isRequired={receivesFiat} mb={8}>
                <FormLabel htmlFor='iban' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    International Bank Account Number
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Provide an International Bank Account Number (IBAN). If your bank does not provide
                  an IBAN, provide your Bank Account Number. Confirm with your bank ahead of time
                  that they can receive International Wire Transfers from a Swiss bank. If your bank
                  is unable to receive international wire transfers, you will need to choose a
                  different payment method. Contact{' '}
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

              <FormControl id='swift-code-control' isRequired={receivesFiat} mb={8}>
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
                  {...register('SWIFTCode', { required: receivesFiat, maxLength: 100 })}
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

              <FormControl id='fiat-currency-code-control' isRequired={receivesFiat} mb={8}>
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
                    maxLength: MAX_TEXT_AREA_LENGTH
                  })}
                />

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

                {errors?.notes?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Notes cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='contract-id-control' isRequired={hasPaymentPreferenceSet} mb={8}>
                <FormLabel htmlFor='contractID' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Contract ID
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  The contract ID provided to you by ESP.
                </PageText>

                <Input
                  id='contractID'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('contractID', { required: true, maxLength: 18 })}
                />

                {errors?.contractID?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Contract ID is required.
                    </PageText>
                  </Box>
                )}
                {errors?.contractID?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Contract ID cannot exceed 18 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='security-id-control' isRequired={hasPaymentPreferenceSet} mb={8}>
                <FormLabel htmlFor='securityID' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Security ID
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  The security key phrase provided to you by ESP.
                </PageText>

                <Input
                  id='securityID'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('securityID', { required: true, maxLength: 255 })}
                />

                {errors?.securityID?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Security ID is required.
                    </PageText>
                  </Box>
                )}
                {errors?.securityID?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Security ID cannot exceed 255 characters.
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
