import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { AcademicGrantsHero } from '../UI';

export const AcademicGrantsLayout: FC = ({ children }) => {
  return (
    <Stack>
      <AcademicGrantsHero />

      <Stack>{children}</Stack>
    </Stack>
  );
};
