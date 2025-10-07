import { FC, ReactNode } from 'react';
import { Stack, Text } from '@chakra-ui/react';

import { GrantsHero } from '../UI';

import academicGrantsHero from '../../../public/images/academic-grants-hero.png';
import academicGrantsHeroMobile from '../../../public/images/academic-grants-hero-mobile.png';

type Props = {
  children: ReactNode;
};

export const DevconGrantsLayout: FC<Props> = ({ children }) => {
  return (
    <Stack>
      <GrantsHero
        colorBrandConstant='academicGrantsHero'
        desktopImage={{ alt: 'Academics doing research about Ethereum', src: academicGrantsHero }}
        mobileImage={{
          alt: 'Academics doing research about Ethereum',
          src: academicGrantsHeroMobile
        }}
        title='Destino Devconnect Support'
      >
        <Text as='span' fontWeight={700}>
          Devconnect ARG
        </Text>{' '}
        is coming to Buenos Aires from November 17–22, 2025. In the months leading up to it,
        we&apos;re supporting community-led efforts across Argentina and Latam to grow Ethereum
        adoption locally.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
