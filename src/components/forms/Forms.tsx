import { Box, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

import {
  GranteeFinanceForm,
  OfficeHoursForm,
  ProjectGrantsForm,
  SmallGrantsForm,
  DevconGrantsForm,
  EcodevGrantsForm,
  ZKGrantsForm,
  DataChallengeForm
} from './';

import {
  DATA_CHALLENGE_APPLY_URL,
  DEVCON_GRANTS_APPLY_URL,
  ECODEV_GRANTS_APPLY_URL,
  GRANTEE_FINANCE_URL,
  OFFICE_HOURS_APPLY_URL,
  PROJECT_GRANTS_APPLY_URL,
  PSE_SPONSORSHIPS_APPLY_URL,
  SMALL_GRANTS_APPLY_URL,
  ZK_GRANTS_APPLY_URL
} from '../../constants';
import { PSESponsorshipsForm } from './PSESponsorshipsForm';

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
      {router.pathname === DEVCON_GRANTS_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <DevconGrantsForm />
        </Box>
      )}
      {router.pathname === ECODEV_GRANTS_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <EcodevGrantsForm />
        </Box>
      )}
      {router.pathname === PSE_SPONSORSHIPS_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <PSESponsorshipsForm />
        </Box>
      )}
      {router.pathname === ZK_GRANTS_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <ZKGrantsForm />
        </Box>
      )}
      {router.pathname === DATA_CHALLENGE_APPLY_URL && (
        <Box px={{ md: 24, lg: 32, xl: 72 }}>
          <DataChallengeForm />
        </Box>
      )}
    </Stack>
  );
};
