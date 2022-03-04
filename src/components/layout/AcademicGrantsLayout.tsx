import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { AcademicGrantsHero } from '../UI';

export const AcademicGrantsLayout: FC = ({ children }) => {
  return (
    <Stack>
      <AcademicGrantsHero title='Academic Grants Round'>
        The Ethereum Foundation is sponsoring a wave of grants to support Ethereum-related academic
        work. This grants round has up to $750,000 in total available. Proposals are due{' '}
        <strong>April 22, 2022</strong>. All of the details you’ll need to apply can be found below.
      </AcademicGrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
