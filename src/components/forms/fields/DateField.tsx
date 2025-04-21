import { FC } from 'react';
import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Field, type Props as FieldProps } from './Field';

interface Props extends Omit<FieldProps, 'children' | 'error'> {
  id: string;
}

export const DateField: FC<Props> = ({ id, ...rest }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <Field id={id} error={errors[id]} {...rest}>
      <Input
        type='date'
        id={id}
        {...register(id)}
        bg='white'
        borderRadius={0}
        borderColor='brand.border'
        h='56px'
        _placeholder={{ fontSize: 'input' }}
        color='brand.paragraph'
        fontSize='input'
      />
    </Field>
  );
};
