import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { TextField, TextAreaField } from '../fields';

interface Props {
  // Optional hint rendered under the Notes field (e.g. India/Korea bank guidance on the
  // exception form's fiat flow). The default form passes nothing.
  notesHint?: ReactNode;
  isRequired?: boolean;
}

// Trailing common block shared by both forms: Notes + Contract ID + Security ID.
export const GranteeFinanceRecordFields: FC<Props> = ({ notesHint, isRequired = true }) => {
  return (
    <>
      <Box mb={8}>
        <TextAreaField id='notes' label='Notes' helpText='Anything else we should know?' />
        {notesHint}
      </Box>

      <TextField
        id='contractID'
        label='Contract ID'
        helpText='The contract ID provided to you by ESP.'
        isRequired={isRequired}
        mb={8}
      />

      <TextField
        id='securityID'
        label='Security ID'
        helpText='The security key phrase provided to you by ESP.'
        isRequired={isRequired}
        mb={8}
      />
    </>
  );
};
