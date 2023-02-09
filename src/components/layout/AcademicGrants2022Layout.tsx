import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { GrantsHero } from '../UI';

import academicGrantsHero from '../../../public/images/academic-grants-hero.png';
import academicGrantsHeroMobile from '../../../public/images/academic-grants-hero-mobile.png';

export const AcademicGrants2022Layout: FC = ({ children }) => {
  return (
    <Stack>
      <GrantsHero
        colorBrandConstant='academicGrantsHero'
        desktopImage={{ alt: 'Academics doing research about Ethereum', src: academicGrantsHero }}
        mobileImage={{
          alt: 'Academics doing research about Ethereum',
          src: academicGrantsHeroMobile
        }}
        title='Academic Grants Round'
      >
        The Ethereum Foundation is sponsoring a wave of grants to support Ethereum-related academic
        work. This grants round has up to $750,000 in total available. Proposals are due{' '}
        <strong>May 8, 2022</strong>. All of the details you&apos;ll need to apply can be found
        below.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
