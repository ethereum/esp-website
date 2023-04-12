import { FC } from 'react';
import { Link, Stack } from '@chakra-ui/react';

import { GrantsHero } from '../UI';

import academicGrantsHero from '../../../public/images/academic-grants-hero.png';
import academicGrantsHeroMobile from '../../../public/images/academic-grants-hero-mobile.png';
import { DEVCON_URL } from '../../constants';

export const DevconGrantsLayout: FC = ({ children }) => {
  return (
    <Stack>
      <GrantsHero
        colorBrandConstant='academicGrantsHero'
        desktopImage={{ alt: 'Academics doing research about Ethereum', src: academicGrantsHero }}
        mobileImage={{
          alt: 'Academics doing research about Ethereum',
          src: academicGrantsHeroMobile
        }}
        title='Road to Devcon Grants'
      >
        <Link
          fontWeight={700}
          color='brand.orange.100'
          href={DEVCON_URL}
          isExternal
          _hover={{ textDecoration: 'none' }}
        >
          Devcon 7
        </Link>{' '}
        is heading to Southeast Asia in 2024! In an effort to promote education on Ethereum in
        Southeast Asia prior to Devcon 7, we are excited to offer financial and non-financial
        support for meetups, events, and other educational initiatives happening along the Road to
        Devcon. Read on for details.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
