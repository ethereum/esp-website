import { Box, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { PageText } from '../../UI';

import { MAX_TEXT_AREA_LENGTH } from '../../../constants';

import { GranteeFinanceFormData } from '../../../types';

interface Props {
  // Optional hint rendered under the Notes field (e.g. India/Korea bank guidance on the
  // exception form's fiat flow). The default form passes nothing.
  notesHint?: ReactNode;
  isRequired?: boolean;
}

// Trailing common block shared by both forms: Notes + Contract ID + Security ID.
export const GranteeFinanceRecordFields: FC<Props> = ({ notesHint, isRequired = true }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<GranteeFinanceFormData>();

  return (
    <>
      <FormControl id='notes-control' mb={8}>
        <FormLabel htmlFor='notes' mb={1}>
          <PageText display='inline' fontSize='input'>
            Notes
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          Anything else we should know?
        </PageText>

        <Textarea
          id='notes'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          color='brand.paragraph'
          fontSize='input'
          h='150px'
          mt={3}
          {...register('notes', {
            maxLength: MAX_TEXT_AREA_LENGTH
          })}
        />

        {notesHint}

        {errors?.notes?.type === 'maxLength' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Notes cannot exceed {MAX_TEXT_AREA_LENGTH} characters.
            </PageText>
          </Box>
        )}
      </FormControl>

      <FormControl id='contract-id-control' isRequired={isRequired} mb={8}>
        <FormLabel htmlFor='contractID' mb={1}>
          <PageText display='inline' fontSize='input'>
            Contract ID
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          The contract ID provided to you by ESP.
        </PageText>

        <Input
          id='contractID'
          type='text'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          h='56px'
          color='brand.paragraph'
          fontSize='input'
          mt={3}
          {...register('contractID', { required: isRequired, maxLength: 18 })}
        />

        {errors?.contractID?.type === 'required' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Contract ID is required.
            </PageText>
          </Box>
        )}
        {errors?.contractID?.type === 'maxLength' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Contract ID cannot exceed 18 characters.
            </PageText>
          </Box>
        )}
      </FormControl>

      <FormControl id='security-id-control' isRequired={isRequired} mb={8}>
        <FormLabel htmlFor='securityID' mb={1}>
          <PageText display='inline' fontSize='input'>
            Security ID
          </PageText>
        </FormLabel>

        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          The security key phrase provided to you by ESP.
        </PageText>

        <Input
          id='securityID'
          type='text'
          bg='white'
          borderRadius={0}
          borderColor='brand.border'
          h='56px'
          color='brand.paragraph'
          fontSize='input'
          mt={3}
          {...register('securityID', { required: isRequired, maxLength: 255 })}
        />

        {errors?.securityID?.type === 'required' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Security ID is required.
            </PageText>
          </Box>
        )}
        {errors?.securityID?.type === 'maxLength' && (
          <Box mt={1}>
            <PageText as='small' fontSize='helpText' color='red.500'>
              Security ID cannot exceed 255 characters.
            </PageText>
          </Box>
        )}
      </FormControl>
    </>
  );
};
