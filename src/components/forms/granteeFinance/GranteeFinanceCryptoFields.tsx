import { Box, FormControl, FormLabel, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PageText } from '../../UI';
import { WalletAddressInput } from '..';

import { GranteeFinanceFormData, TokenPreference } from '../../../types';

interface Props {
  // Token is hardcoded per form: ETH for the default form, DAI for the exception form.
  token: TokenPreference;
  isRequired?: boolean;
}

// Wallet address + centralized-exchange question. Token is fixed via the `token` prop
// (no selector) and the network is hardcoded to Ethereum Mainnet server-side.
export const GranteeFinanceCryptoFields: FC<Props> = ({ token, isRequired = true }) => {
  const { control, setValue } = useFormContext<GranteeFinanceFormData>();

  // Keep the hidden `token` value in sync with the form variant.
  useEffect(() => {
    setValue('token', token);
  }, [token, setValue]);

  return (
    <>
      <Box mb={8}>
        <WalletAddressInput
          id='walletAddress'
          label='Wallet Address'
          helpText={
            <>
              Enter an Ethereum address (0x...) or ENS name (e.g., name.eth) to receive payment.
              Make sure it&apos;s a secured wallet that you control.
            </>
          }
          isRequired={isRequired}
        />

        <PageText as='small' fontSize='helpText' color='brand.orange.100' mt={3}>
          <strong>Please note:</strong> All transactions are processed exclusively on the Ethereum
          Mainnet.
        </PageText>
      </Box>

      <Controller
        name='isCentralizedExchange'
        control={control}
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
          <FormControl id='isCentralizedExchange-control' isRequired={isRequired} mb={8}>
            <FormLabel htmlFor='isCentralizedExchange' mb={1}>
              <PageText display='inline' fontSize='input'>
                Is this address hosted on a centralized exchange?
              </PageText>
            </FormLabel>

            {/* Value is a boolean; the radio renders Yes/No words but stores true/false. */}
            <RadioGroup
              id='isCentralizedExchange'
              onChange={val => onChange(val === 'Yes')}
              value={value ? 'Yes' : 'No'}
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
    </>
  );
};
