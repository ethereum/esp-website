import React, { FC } from 'react';
import { Textarea } from '@chakra-ui/react';
import { useFormContext, RegisterOptions } from 'react-hook-form';

import { Field, type Props as FieldProps } from './Field';
import { CharCounter } from './CharCounter';
import { MAX_TEXT_AREA_LENGTH } from '../../../constants';

interface Props extends Omit<FieldProps, 'children' | 'error'> {
  registerOptions?: RegisterOptions;
  maxLength?: number;
}

export const TextAreaField: FC<Props> = ({
  id,
  registerOptions,
  isDisabled,
  maxLength = MAX_TEXT_AREA_LENGTH,
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
      helpIndicator={maxLength && <CharCounter current={currentLength} max={maxLength} />}
      {...rest}
    >
      <Textarea
        id={id}
        isDisabled={isDisabled}
        bg='white'
        borderRadius={0}
        borderColor='brand.border'
        _placeholder={{ fontSize: 'input' }}
        color='brand.paragraph'
        fontSize='input'
        h='150px'
        mt={3}
        {...register(id, registerOptions)}
      />
    </Field>
  );
};
