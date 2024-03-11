import { Box, Stack, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { DimLayer, GrantsHero } from '../UI';

import accountAbstractionGrantsHero from '../../../public/images/account-abstraction-hero.jpeg';
import accountAbstractionGrantsHeroMobile from '../../../public/images/account-abstraction-hero-mobile.jpeg';

type Props = {
  children: ReactNode;
};

export const AccountAbstractionGrantsLayout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <DimLayer height='130px' />
      <GrantsHero
        colorBrandConstant='accountAbstractionHero'
        desktopImage={{
          alt: 'People inside transparent boxes with different shapes in a beautiful landscape',
          src: accountAbstractionGrantsHero
        }}
        mobileImage={{
          alt: 'People inside transparent boxes with different shapes in a beautiful landscape',
          src: accountAbstractionGrantsHeroMobile
        }}
        title='Account Abstraction Grants 2023'
      >
        <Text mb={1}>
          The Ethereum Foundation is looking to provide grants to any builders who are interested in
          continuing to improve and strengthen the infrastructure surrounding Account Abstraction on
          Ethereum.{' '}
          <Text as='i'>
            This grants round has up to $300,000 available to distribute to the community.
          </Text>
        </Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
