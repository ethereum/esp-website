import { Box, FormControl, FormLabel, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PageText } from '../../UI';
import { WalletAddressInput } from '..';

interface Props {
  isRequired?: boolean;
}

// Wallet address + centralized-exchange question. The token is fixed per form and injected at
// submit time (ETH default / DAI exception); the network is hardcoded to Ethereum Mainnet
// server-side, so neither is a field here.
export const GranteeFinanceCryptoFields: FC<Props> = ({ isRequired = true }) => {
  const { control } = useFormContext();

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
