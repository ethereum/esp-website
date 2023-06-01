import React, { FC } from 'react';
import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Field, type Props as FieldProps } from './Field';

interface Props extends Omit<FieldProps, 'children' | 'error'> {}

export const TextField: FC<Props> = ({ id, ...rest }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <Field id={id} error={errors[id]} {...rest}>
      <Input
        id={id}
        type='text'
        bg='white'
        borderRadius={0}
        borderColor='brand.border'
        h='56px'
        _placeholder={{ fontSize: 'input' }}
        color='brand.paragraph'
        fontSize='input'
        {...register(id)}
      />
    </Field>
  );
};
