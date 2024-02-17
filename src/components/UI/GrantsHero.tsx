import { Box, Center, Stack } from '@chakra-ui/react';
import Image, { StaticImageData } from 'next/image';
import { FC, ReactNode } from 'react';

import { PageSubheading } from '../UI';

import { PageText } from './text';

interface Props {
  colorBrandConstant: string;
  desktopImage: {
    alt: string;
    src: StaticImageData;
  };
  mobileImage: {
    alt: string;
    src: StaticImageData;
  };
  title: string;
  children: ReactNode;
}

export const GrantsHero: FC<Props> = ({
  colorBrandConstant,
  desktopImage,
  mobileImage,
  title,
  children
}) => {
  return (
    <Stack mb={{ base: -2, md: -60, xl: -72 }}>
      <Center h={{ md: '445px' }} alignItems={{ md: 'center' }}>
        <Stack
          px={{ base: 10, md: 9 }}
          py={{ base: 3, md: 12 }}
          mb={{ base: 7, md: 0 }}
          bg={{ md: `brand.${colorBrandConstant}.titleWhiteBox` }}
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

          <PageText as={Box} textAlign='center'>
            {children}
          </PageText>
        </Stack>
      </Center>

      <Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <Image
            src={mobileImage.src}
            alt={mobileImage.alt}
            width={450}
            height={276}
            placeholder='blur'
            sizes='100vw'
            style={{
              objectFit: 'cover',
              width: '100%',
              height: 'auto'
            }}
          />
        </Box>

        <Box display={{ base: 'none', md: 'block' }}>
          <Box>
            <Image
              src={desktopImage.src}
              alt={desktopImage.alt}
              placeholder='blur'
              fill
              sizes='100vw'
              style={{
                objectFit: 'cover'
              }}
            />
          </Box>

          <Box
            mt={{ lg: 40 }}
            h={52}
            bgGradient={`linear(to-b, brand.${colorBrandConstant}.bgGradient.start 0%, brand.${colorBrandConstant}.bgGradient.end 100%)`}
          />
        </Box>
      </Box>
    </Stack>
  );
};
