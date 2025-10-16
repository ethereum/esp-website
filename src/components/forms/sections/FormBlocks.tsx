import { Box, Center, Stack, Tag, Wrap, WrapItem } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { PageText } from '../../UI';
import { SubmitButton } from '../../SubmitButton';
import { Captcha } from '../fields';
import { GrantInitiative } from '../../../types';

interface SelectedItemDisplayProps {
  selectedItem: GrantInitiative;
  displayText: string;
}

/**
 * Displays the selected item (RFP or Wishlist) in a highlighted box
 */
export const SelectedItemDisplay: FC<SelectedItemDisplayProps> = ({
  selectedItem,
  displayText
}) => {
  const tags = selectedItem.Tags__c
    ?.split(/[,;]+/)
    .map(tag => tag.trim())
    .filter(Boolean);

  return (
    <Box
      p={6}
      bg='white'
      borderRadius='lg'
      borderLeft='4px solid'
      borderLeftColor='brand.orange.100'
    >
      <Stack spacing={4}>
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

        {tags && tags.length > 0 && (
          <Stack spacing={2}>
            <PageText fontSize='sm' color='brand.heading' fontWeight='600'>
              Tags
            </PageText>
            <Wrap>
              {tags.map(tag => (
                <WrapItem key={tag}>
                  <Tag
                    size='md'
                    color='brand.heading'
                    bg='brand.orange.10'
                    borderRadius='full'
                    px={3}
                    py={1}
                  >
                    {tag}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Stack>
        )}

        {selectedItem.Ecosystem_Need__c && (
          <Stack spacing={2}>
            <PageText fontSize='sm' color='brand.heading' fontWeight='600'>
              Ecosystem Need
            </PageText>
            <PageText fontSize='sm' color='brand.paragraph'>
              {selectedItem.Ecosystem_Need__c}
            </PageText>
          </Stack>
        )}

        {selectedItem.Hard_Requirements__c && (
          <Stack spacing={2}>
            <PageText fontSize='sm' color='brand.heading' fontWeight='600'>
              Hard Requirements
            </PageText>
            <PageText fontSize='sm' color='brand.paragraph'>
              {selectedItem.Hard_Requirements__c}
            </PageText>
          </Stack>
        )}

        {selectedItem.Soft_Requirements__c && (
          <Stack spacing={2}>
            <PageText fontSize='sm' color='brand.heading' fontWeight='600'>
              Soft Requirements
            </PageText>
            <PageText fontSize='sm' color='brand.paragraph'>
              {selectedItem.Soft_Requirements__c}
            </PageText>
          </Stack>
        )}

        {selectedItem.Out_of_Scope__c && (
          <Stack spacing={2}>
            <PageText fontSize='sm' color='brand.heading' fontWeight='600'>
              Out of Scope
            </PageText>
            <PageText fontSize='sm' color='brand.paragraph'>
              {selectedItem.Out_of_Scope__c}
            </PageText>
          </Stack>
        )}

        {selectedItem.Resources__c && (
          <Stack spacing={2}>
            <PageText fontSize='sm' color='brand.heading' fontWeight='600'>
              Resources
            </PageText>
            <PageText fontSize='sm' color='brand.paragraph'>
              {selectedItem.Resources__c}
            </PageText>
          </Stack>
        )}

        {(selectedItem.RFP_Open_Date__c ||
          selectedItem.RFP_Close_Date__c ||
          selectedItem.RFP_Project_Duration__c) && (
          <Stack spacing={2}>
            <PageText fontSize='sm' color='brand.heading' fontWeight='600'>
              Timeline
            </PageText>
            {selectedItem.RFP_Open_Date__c && (
              <PageText fontSize='sm' color='brand.paragraph'>
                Open Date: {formatDate(selectedItem.RFP_Open_Date__c)}
              </PageText>
            )}
            {selectedItem.RFP_Close_Date__c && (
              <PageText fontSize='sm' color='brand.paragraph'>
                Close Date: {formatDate(selectedItem.RFP_Close_Date__c)}
              </PageText>
            )}
            {selectedItem.RFP_Project_Duration__c && (
              <PageText fontSize='sm' color='brand.paragraph'>
                Estimated Duration: {selectedItem.RFP_Project_Duration__c}
              </PageText>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

const formatDate = (value: string): string => {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(parsedDate);
};

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
