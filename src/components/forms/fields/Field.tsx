import React, { FC, ReactNode } from 'react';
import { Box, Flex, FormControl, FormControlProps, FormLabel } from '@chakra-ui/react';
import type { FieldError } from 'react-hook-form';

import { PageText } from '../../UI';

export interface Props extends FormControlProps {
  children: ReactNode;
  id: string;
  label: string;
  helpText?: ReactNode;
  error?: FieldError;
  helpIndicator?: ReactNode;
}

export const Field: FC<Props> = ({
  children,
  id,
  label,
  helpText,
  error,
  helpIndicator,
  ...rest
}) => {
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

      {(error || helpIndicator) && (
        <Flex>
          <Box mt={1} flex={1}>
            {error && (
              <PageText as='small' fontSize='helpText' color='red.500'>
                {error.message}
              </PageText>
            )}
          </Box>
          {helpIndicator && <Box mt={1}>{helpIndicator}</Box>}
        </Flex>
      )}
    </FormControl>
  );
};
