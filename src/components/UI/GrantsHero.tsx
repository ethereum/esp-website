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
    quality?: number;
  };
  mobileImage: {
    alt: string;
    src: StaticImageData;
    quality?: number;
  };
  title: string;
  subheading?: string;
  children: ReactNode;
}

export const GrantsHero: FC<Props> = ({
  colorBrandConstant,
  desktopImage,
  mobileImage,
  title,
  subheading,
  children
}) => {
  // Nav height to account for floating nav overlay
  const navHeight = { base: '80px', md: '120px' };

  return (
    <Box>
      {/* Mobile Layout */}
      <Box display={{ base: 'block', md: 'none' }} position='relative'>
        {/* Background image behind content */}
        <Box position='absolute' top={0} left={0} right={0} bottom={0}>
          <Image
            src={mobileImage.src}
            alt={mobileImage.alt}
            fill
            placeholder='blur'
            quality={mobileImage.quality}
            sizes='100vw'
            style={{ objectFit: 'cover' }}
          />
          {/* Gradient overlay for readability */}
          <Box
            position='absolute'
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg='rgba(255, 255, 255, 0.85)'
          />
        </Box>

        <Stack px={10} pt={navHeight.base} pb={6} position='relative'>
          <PageSubheading
            as='h1'
            fontSize='homepage'
            fontWeight={100}
            lineHeight='36px'
            textAlign='center'
            mb={3}
          >
            {title}
          </PageSubheading>

          {subheading && (
            <PageText textAlign='center' fontWeight={700} mb={2}>
              {subheading}
            </PageText>
          )}

          <PageText textAlign='center'>{children}</PageText>
        </Stack>
      </Box>

      {/* Desktop Layout */}
      <Box display={{ base: 'none', md: 'block' }} position='relative'>
        {/* Background Image Container */}
        <Box position='relative' h={{ md: '560px', lg: '640px' }}>
          <Image
            src={desktopImage.src}
            alt={desktopImage.alt}
            placeholder='blur'
            fill
            quality={desktopImage.quality}
            sizes='100vw'
            style={{ objectFit: 'cover' }}
          />

          {/* Gradient Overlay - fades to white for smooth transition to content */}
          <Box
            position='absolute'
            bottom={0}
            left={0}
            right={0}
            h='250px'
            bgGradient='linear(to-b, transparent 0%, rgba(255,255,255,0.5) 50%, white 100%)'
          />
        </Box>

        {/* Content Box - Positioned over the image, accounting for nav and content overlap */}
        <Center
          position='absolute'
          top={navHeight.md}
          left={0}
          right={0}
          bottom={12}
        >
          <Stack
            px={9}
            py={12}
            bg={`brand.${colorBrandConstant}.titleWhiteBox`}
            maxW='702px'
          >
            <PageSubheading
              as='h1'
              fontSize='h1'
              fontWeight={100}
              lineHeight='48px'
              textAlign='center'
              mb={3}
            >
              {title}
            </PageSubheading>

            {subheading && (
              <PageText textAlign='center' fontWeight={700} mb={2}>
                {subheading}
              </PageText>
            )}

            <PageText textAlign='center'>{children}</PageText>
          </Stack>
        </Center>
      </Box>
    </Box>
  );
};
