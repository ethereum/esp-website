import React, { FC } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import { Field } from './Field';
import { PageText } from '../../UI';

/**
 * Required acknowledgement that grants are paid in ETH by default.
 * Must be checked (true) to submit the application. Client-side gate only:
 * the value is intentionally not mapped to Salesforce.
 *
 * Uses a Controller with `defaultValue={false}` so the field is registered with a value from
 * mount. A plain register() leaves the value undefined until the box is touched, which means the
 * required-acknowledgement error wouldn't surface on a first submit where the box was never
 * interacted with.
 */
export const PaymentAcknowledgement: FC = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Field
      id='paymentAcknowledgement'
      label='Grant Payment Acknowledgement'
      isRequired
      error={errors.paymentAcknowledgement as any}
    >
      <Controller
        name='paymentAcknowledgement'
        control={control}
        defaultValue={false}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Checkbox
            id='paymentAcknowledgement'
            ref={ref}
            isChecked={!!value}
            onChange={onChange}
            onBlur={onBlur}
            alignItems='flex-start'
            // center the control on the first line of the label (line-height 24px, control 16px)
            sx={{ '.chakra-checkbox__control': { mt: '4px' } }}
          >
            <PageText fontSize='input'>
              I understand that Ethereum Foundation grants are paid in ETH by default, and that
              recipients are responsible for managing wallet access, accounting, and any
              conversions. I also understand that exceptions are limited to specific circumstances
              and remain at the Ethereum Foundation&apos;s discretion.
            </PageText>
          </Checkbox>
        )}
      />
    </Field>
  );
};
