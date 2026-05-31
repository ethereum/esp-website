import React, { FC } from 'react';
import { Box, Checkbox, Stack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { PageText } from '../../UI';

/**
 * Required acknowledgement that grants are paid in ETH by default.
 * Must be checked (true) to submit the application. Client-side gate only:
 * the value is intentionally not mapped to Salesforce.
 */
export const PaymentAcknowledgement: FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const error = errors.paymentAcknowledgement;

  return (
    <Stack spacing={3}>
      <PageText fontWeight={700}>Grant Payment Acknowledgement</PageText>

      <Checkbox
        id='paymentAcknowledgement'
        alignItems='flex-start'
        {...register('paymentAcknowledgement')}
      >
        <PageText fontSize='input'>
          I understand that Ethereum Foundation grants are paid in ETH by default, and that
          recipients are responsible for managing wallet access, accounting, and any required
          conversion to local currency. I also understand that exceptions are limited to specific
          circumstances and remain at the Ethereum Foundation&apos;s discretion.
        </PageText>
      </Checkbox>

      {error && (
        <Box>
          <PageText as='small' fontSize='helpText' color='red.500'>
            {error.message as string}
          </PageText>
        </Box>
      )}
    </Stack>
  );
};
