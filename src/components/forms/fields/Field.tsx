import React, { FC, ReactNode } from 'react';
import { Box, FormControl, FormControlProps, FormLabel } from '@chakra-ui/react';
import type { FieldError } from 'react-hook-form';

import { PageText } from '../../UI';

export interface Props extends FormControlProps {
  children: ReactNode;
  id: string;
  label: string;
  helpText?: ReactNode;
  error?: FieldError;
}

export const Field: FC<Props> = ({ children, id, label, helpText, error, ...rest }) => {
  return (
    <FormControl id={`${id}-control`} {...rest}>
      <FormLabel htmlFor={id}>
        <PageText display='inline' fontSize='input'>
          {label}
        </PageText>
      </FormLabel>

      {helpText && (
        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          {helpText}
        </PageText>
      )}

      {children}

      {error && (
        <Box mt={1}>
          <PageText as='small' fontSize='helpText' color='red.500'>
            {error.message}
          </PageText>
        </Box>
      )}
    </FormControl>
  );
};
