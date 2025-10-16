import { Box, Center, Stack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { PageText } from '../../UI';
import { SubmitButton } from '../../SubmitButton';
import { Captcha } from '../fields';

interface SelectedItemDisplayProps {
  selectedItem: {
    Id: string;
    Name: string;
    Description__c: string;
  };
  displayText: string;
}

/**
 * Displays the selected item (RFP or Wishlist) in a highlighted box
 */
export const SelectedItemDisplay: FC<SelectedItemDisplayProps> = ({
  selectedItem,
  displayText
}) => (
  <Box p={6} bg='white' borderRadius='lg' borderLeft='4px solid' borderLeftColor='brand.orange.100'>
    <Stack spacing={2}>
      <PageText fontSize='sm' color='brand.helpText' fontWeight='600'>
        {displayText}:
      </PageText>
      <PageText fontSize='lg' fontWeight='700' color='brand.heading'>
        {selectedItem.Name}
      </PageText>
      <PageText fontSize='sm' color='brand.paragraph'>
        {selectedItem.Description__c}
      </PageText>
    </Stack>
  </Box>
);

interface FormActionsProps {
  submitText?: string;
  isSubmitting?: boolean;
  showCaptcha?: boolean;
  submitButtonProps?: {
    height?: string;
    width?: string;
  };
}

/**
 * Form actions section with optional captcha and submit button
 */
export const FormActions: FC<FormActionsProps> = ({
  submitText = 'Submit Application',
  isSubmitting = false,
  showCaptcha = true,
  submitButtonProps = { height: '56px', width: '310px' }
}) => (
  <>
    {showCaptcha && (
      <Center mb={12}>
        <Captcha />
      </Center>
    )}

    <Center>
      <SubmitButton
        isValid
        isSubmitting={isSubmitting}
        height={submitButtonProps.height || '56px'}
        width={submitButtonProps.width || '310px'}
        text={submitText}
      />
    </Center>
  </>
);

interface FormContainerProps {
  children: ReactNode;
  spacing?: number;
}

/**
 * Container for form sections with consistent spacing
 */
export const FormContainer: FC<FormContainerProps> = ({ children, spacing = 8 }) => (
  <Stack spacing={spacing}>{children}</Stack>
);

interface FormSectionProps {
  children: ReactNode;
  spacing?: number;
}

/**
 * Wrapper for individual form sections
 */
export const FormSection: FC<FormSectionProps> = ({ children, spacing = 6 }) => (
  <Stack spacing={spacing}>{children}</Stack>
);
