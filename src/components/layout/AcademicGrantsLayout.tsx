import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { GrantsHero } from '../UI';

import academicGrantsHero from '../../../public/images/accademic-grants-2024-hero.jpg';

export const AcademicGrantsLayout: FC = ({ children }) => {
  return (
    <Stack>
      <GrantsHero
        colorBrandConstant='academicGrants2024Hero'
        desktopImage={{ alt: 'Academics doing research about Ethereum', src: academicGrantsHero }}
        mobileImage={{
          alt: 'Academics doing research about Ethereum',
          src: academicGrantsHero
        }}
        title='Academic Grants Round'
      >
        The Ethereum Foundation is sponsoring a wave of grants to support Ethereum-related academic
        work. This grants round has <strong>$1M</strong> in total available funds. Proposals are due{' '}
        <strong>23:59 UTC March 5th, 2024</strong>. All of the details you’ll need to apply can be
        found below.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
