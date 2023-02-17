import { Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { GrantsHero } from '../UI';

import academicGrantsHero from '../../../public/images/academic-grants-hero.png';
import academicGrantsHeroMobile from '../../../public/images/academic-grants-hero-mobile.png';

export const AccountAbstractionGrantsLayout: FC = ({ children }) => {
  return (
    <Stack>
      <GrantsHero
        colorBrandConstant='academicGrantsHero'
        desktopImage={{ alt: 'Academics doing research about Ethereum', src: academicGrantsHero }}
        mobileImage={{
          alt: 'Academics doing research about Ethereum',
          src: academicGrantsHeroMobile
        }}
        title='Account Abstraction Grants 2023'
      >
        <Text mb={1}>
          The Ethereum Foundation is looking to provide grants to any builders who are interested in
          continuing to improve and strengthen the infrastructure surrounding Account Abstraction on
          Ethereum.{' '}
          <Text as='i'>
            This grants round has up to $350,000 available to distribute to the community.
          </Text>
        </Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
