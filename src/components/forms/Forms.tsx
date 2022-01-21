import { Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

import { OfficeHoursForm, ProjectGrantsForm, SmallGrantsForm } from './';

import {
  OFFICE_HOURS_APPLY_URL,
  PROJECT_GRANTS_APPLY_URL,
  SMALL_GRANTS_APPLY_URL
} from '../../constants';

export const Forms: FC = () => {
  const router = useRouter();

  return (
    <Stack id='forms'>
      {router.pathname === PROJECT_GRANTS_APPLY_URL && <ProjectGrantsForm />}
      {router.pathname === OFFICE_HOURS_APPLY_URL && <OfficeHoursForm />}
      {router.pathname === SMALL_GRANTS_APPLY_URL && <SmallGrantsForm />}
    </Stack>
  );
};
