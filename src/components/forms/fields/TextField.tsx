import React, { FC, HTMLInputTypeAttribute } from 'react';
import { Input } from '@chakra-ui/react';
import { useFormContext, RegisterOptions } from 'react-hook-form';

import { Field, type Props as FieldProps } from './Field';
import { CharCounter } from './CharCounter';
import { MAX_TEXT_LENGTH } from '../../../constants';

interface Props extends Omit<FieldProps, 'children' | 'error'> {
  registerOptions?: RegisterOptions;
  value?: string;
  maxLength?: number;
  hideCharCounter?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const TextField: FC<Props> = ({
  id,
  registerOptions,
  value,
  isDisabled,
  maxLength = MAX_TEXT_LENGTH,
  hideCharCounter = false,
  type = 'text',
  ...rest
}) => {
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext();

  const currentValue = watch(id) || '';
  const currentLength = currentValue.length;

  return (
    <Field
      id={id}
      error={errors[id]}
      helpIndicator={
        hideCharCounter ? null : <CharCounter current={currentLength} max={maxLength} />
      }
      {...rest}
    >
      <Input
        id={id}
        value={value}
        isDisabled={isDisabled}
        type={type}
        bg='white'
        borderRadius={0}
        borderColor='brand.border'
        h='56px'
        _placeholder={{ fontSize: 'input' }}
        color='brand.paragraph'
        fontSize='input'
        {...register(id, registerOptions)}
      />
    </Field>
  );
};
