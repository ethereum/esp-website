import { Link, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { GrantsHero } from '../UI';

import { DEVCON_URL } from '../../constants';

import academicGrantsHero from '../../../public/images/academic-grants-hero.png';
import academicGrantsHeroMobile from '../../../public/images/academic-grants-hero-mobile.png';

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
        title='Devcon Grants Round'
      >
        In an effort to promote education around Ethereum in Southeast Asia in advance of{' '}
        <Link
          fontWeight={700}
          color='brand.orange.100'
          href={DEVCON_URL}
          isExternal
          _hover={{ textDecoration: 'none' }}
        >
          Devcon
        </Link>
        , we would like to offer support (both monetary and otherwise) to meetups,events, and other
        educational initiatives happening within the SEA region before Devcon 7. Read on for
        details.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
