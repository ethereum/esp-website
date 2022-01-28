import { Box, Center, Stack, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { PageSubheading } from '../UI';
import { ButtonLink } from '../';

import homepageHero from '../../public/images/homepage-hero.svg';
import homepageHeroMobile from '../../public/images/homepage-hero-mobile.svg';

export const HomepageHero: FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Stack mb={6}>
      <Stack px={5} py={3} mb={-12} zIndex={1}>
        <PageSubheading
          as='h1'
          fontSize='homepage'
          fontWeight={100}
          lineHeight='36px'
          textAlign='left'
          mb={6}
        >
          We provide grants and other support to the builders of the Ethereum ecosystem.
        </PageSubheading>

        <Center>
          <ButtonLink label='Learn more' link='#' width='177px' />
        </Center>
      </Stack>

      <Box>
        <Image
          src={isMobile ? homepageHeroMobile : homepageHero}
          alt='People gathered around the Ethereum tree'
          objectFit='cover'
          quality={85}
        />
      </Box>
    </Stack>
  );
};
