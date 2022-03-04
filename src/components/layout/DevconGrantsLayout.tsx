import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { AcademicGrantsHero } from '../UI';

export const DevconGrantsLayout: FC = ({ children }) => {
  return (
    <Stack>
      <AcademicGrantsHero title='Devcon Grants Round'>
        In an effort to promote education around the Ethereum in Colombia and Latin America in
        advance of Devcon, we would like to offer support (both monetary and otherwise) to meetups
        and events happening in Latin America before Devcon. Read on for details.
      </AcademicGrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
