import { FC } from 'react';
import { Stack } from '@chakra-ui/react';

import { GrantsHero } from '../UI';

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
        title='Road to Devcon Grants'
      >
        To promote education around Ethereum in Southeast Asia along the Road to Devcon, we would
        like to offer support (both monetary and otherwise) to meetups, events, and other
        educational initiatives happening within the SEA region before Devcon 7.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
