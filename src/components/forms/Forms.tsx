import { Box, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

import {
  AcademicGrantsForm,
  GranteeFinanceForm,
  MergeDataChallengeForm,
  OfficeHoursForm,
  ProjectGrantsForm,
  SmallGrantsForm,
  DevconGrantsForm,
  Layer2GrantsForm
} from './';

import {
  ACADEMIC_GRANTS_APPLY_URL,
  DEVCON_GRANTS_APPLY_URL,
  GRANTEE_FINANCE_URL,
  LAYER_2_GRANTS_APPLY_URL,
  MERGE_DATA_CHALLENGE_APPLY_URL,
  OFFICE_HOURS_APPLY_URL,
  PROJECT_GRANTS_APPLY_URL,
  SMALL_GRANTS_APPLY_URL
} from '../../constants';

export const Forms: FC = () => {
  const router = useRouter();

  return (
    <Stack id='forms'>
      {router.pathname === PROJECT_GRANTS_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <ProjectGrantsForm />
        </Box>
      )}
      {router.pathname === OFFICE_HOURS_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <OfficeHoursForm />
        </Box>
      )}
      {router.pathname === SMALL_GRANTS_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <SmallGrantsForm />
        </Box>
      )}
      {router.pathname === GRANTEE_FINANCE_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <GranteeFinanceForm />
        </Box>
      )}
      {router.pathname === ACADEMIC_GRANTS_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <AcademicGrantsForm />
        </Box>
      )}
      {router.pathname === DEVCON_GRANTS_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <DevconGrantsForm />
        </Box>
      )}
      {router.pathname === MERGE_DATA_CHALLENGE_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <MergeDataChallengeForm />
        </Box>
      )}
      {router.pathname === LAYER_2_GRANTS_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <Layer2GrantsForm />
        </Box>
      )}
    </Stack>
  );
};
