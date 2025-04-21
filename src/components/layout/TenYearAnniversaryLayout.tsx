import { FC, ReactNode } from 'react';
import { Link, Stack } from '@chakra-ui/react';

import { GrantsHero } from '../UI';

// TODO: Add the correct image
import academicGrantsHero from '../../../public/images/academic-grants-hero.png';
import academicGrantsHeroMobile from '../../../public/images/academic-grants-hero-mobile.png';

type Props = {
  children: ReactNode;
};

export const TenYearAnniversaryLayout: FC<Props> = ({ children }) => {
  return (
    <Stack>
      {/* TODO: Add the correct image */}
      <GrantsHero
        colorBrandConstant='academicGrantsHero'
        desktopImage={{ alt: 'Academics doing research about Ethereum', src: academicGrantsHero }}
        mobileImage={{
          alt: 'Academics doing research about Ethereum',
          src: academicGrantsHeroMobile
        }}
        title='10 Years of Ethereum Anniversary'
      >
        {/* TODO: Add the correct text */}
        Ethereum is turning 10 years old! We are celebrating this milestone with a series of events and activities.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};