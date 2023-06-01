import React, { FC } from 'react';
import { Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Field, type Props as FieldProps } from './Field';

interface Props extends Omit<FieldProps, 'children' | 'error'> {}

export const TextAreaField: FC<Props> = ({ id, ...rest }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <Field id={id} error={errors[id]} {...rest}>
      <Textarea
        id={id}
        bg='white'
        borderRadius={0}
        borderColor='brand.border'
        _placeholder={{ fontSize: 'input' }}
        color='brand.paragraph'
        fontSize='input'
        h='150px'
        mt={3}
        {...register(id)}
      />
    </Field>
  );
};
