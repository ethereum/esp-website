import { Box, Flex, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import Image from 'next/image';

import { PageSection, PageText } from '../../components/UI';
import { ButtonLink } from '../../components';

interface Props {
  bgGradient: string;
  img: {
    src: string | StaticImageData;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  link: string;
}

export const HomeAboutCard: FC<Props> = ({ bgGradient, img, title, link, children }) => {
  const { src, alt, width, height } = img;

  return (
    <Stack borderRadius='10px' bgGradient={bgGradient} w='100%' justifyContent='center'>
      <Flex
        alignItems='center'
        direction={{ base: 'column', md: 'row' }}
        px={{ base: 6, lg: 24 }}
        py={{ base: 10, lg: 16 }}
      >
        <Stack mb={4} mr={{ base: 0, md: 6, lg: 12 }} w={{ base: '100%', md: '50%' }}>
          <PageSection textAlign={{ base: 'center', lg: 'left' }} mb={6}>
            {title}
          </PageSection>

          <Box>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              layout='responsive'
              objectFit='cover'
              placeholder='blur'
              quality={85}
            />
          </Box>
        </Stack>

        <Stack w={{ md: '50%' }}>
          <Box mb={6}>{children}</Box>

          <Flex justifyContent={{ base: 'center', md: 'flex-start' }}>
            <ButtonLink label='Read more' link={link} width='247px' />
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};
