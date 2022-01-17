import { Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

import { ProjectGrantsForm } from './ProjectGrantsForm';

import { PROJECT_GRANTS_APPLY_URL } from '../../constants';

export const Forms: FC = () => {
  const router = useRouter();

  return <Stack>{router.pathname === PROJECT_GRANTS_APPLY_URL && <ProjectGrantsForm />}</Stack>;
};
