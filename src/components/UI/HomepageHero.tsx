import { Box, Center, Flex, Img, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { PageSubheading } from '../UI';
import { ButtonLink } from '../';

import homepageHero from '../../public/images/homepage-hero.svg';
import homepageHeroMobile from '../../public/images/homepage-hero-mobile.svg';

import { APPLICANTS_URL } from '../../constants';

export const HomepageHero: FC = () => {
  return (
    <Stack mb={6}>
      <Stack
        px={{ base: 5, md: 9 }}
        py={{ base: 3, md: 12 }}
        mb={{ base: -12, md: 5, lg: 52 }}
        bg={{ md: 'rgba(255, 255, 255, 0.6)' }}
        ml={{ md: 12 }}
        maxW={{ md: '626px' }}
        zIndex={1}
      >
        <PageSubheading
          as='h1'
          fontSize={{ base: 'homepage', md: 'h1' }}
          fontWeight={100}
          lineHeight={{ base: '36px', md: '48px' }}
          textAlign='left'
          mb={{ base: 6, md: 10 }}
        >
          We provide grants and other support to the builders of the Ethereum ecosystem.
        </PageSubheading>

        <Flex justifyContent={{ base: 'center', md: 'flex-start' }}>
          <ButtonLink label='Learn more' link={APPLICANTS_URL} width='177px' />
        </Flex>
      </Stack>

      <Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <Image
            src={homepageHeroMobile}
            alt='People gathered around the Ethereum tree'
            layout='responsive'
            objectFit='cover'
            quality={85}
            priority={true}
          />
        </Box>

        <Box display={{ base: 'none', md: 'block' }} mt={6}>
          <Image
            src={homepageHero}
            alt='People gathered around the Ethereum tree'
            // width='1378px'
            // height='600px'
            // className='background-image'
            layout='fill'
            objectFit='cover'
            quality={85}
            priority={true}
          />
        </Box>
      </Box>
    </Stack>
  );
};
