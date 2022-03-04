import { Box, Center, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { PageSubheading } from '../UI';

import academicGrantsHero from '../../../public/images/academic-grants-hero.png';
import academicGrantsHeroMobile from '../../../public/images/academic-grants-hero-mobile.png';

import { PageText } from './text';

interface Props {
  title: string;
}

export const AcademicGrantsHero: FC<Props> = ({ title, children }) => {
  return (
    <Stack mb={{ base: -2, md: -60, xl: -72 }}>
      <Center h={{ md: '445px' }} alignItems={{ md: 'center' }}>
        <Stack
          px={{ base: 10, md: 9 }}
          py={{ base: 3, md: 12 }}
          mb={{ base: 7, md: 0 }}
          bg={{ md: 'brand.homepageWhiteBox' }}
          maxW={{ md: '702px' }}
          zIndex={1}
        >
          <PageSubheading
            as='h1'
            fontSize={{ base: 'homepage', md: 'h1' }}
            fontWeight={100}
            lineHeight={{ base: '36px', md: '48px' }}
            textAlign='center'
            mb={3}
          >
            {title}
          </PageSubheading>

          <PageText textAlign='center'>{children}</PageText>
        </Stack>
      </Center>

      <Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <Image
            src={academicGrantsHeroMobile}
            alt='Academics doing research about Ethereum'
            layout='responsive'
            objectFit='cover'
            width={450}
            height={276}
            placeholder='blur'
          />
        </Box>

        <Box display={{ base: 'none', md: 'block' }}>
          <Box>
            <Image
              src={academicGrantsHero}
              alt='Academics doing research about Ethereum'
              layout='fill'
              objectFit='cover'
              placeholder='blur'
            />
          </Box>

          <Box
            mt={{ lg: 40 }}
            h={52}
            bgGradient='linear(to-b, #ebd1fb 0%, brand.academicGrantsRgba 100%)'
          />
        </Box>
      </Box>
    </Stack>
  );
};
