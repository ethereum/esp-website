import { Box, Flex, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import Image from 'next/image';

import { PageSection, PageText } from '../../components/UI';
import { ButtonLink } from '../../components';

interface Props {
  bgGradient: string;
  img: {
    src: string;
    alt: string;
  };
  title: string;
  link: string;
}

export const HomeAboutCard: FC<Props> = ({ bgGradient, img, title, link, children }) => {
  return (
    <Stack
      borderRadius='10px'
      bgGradient={bgGradient}
      h={{ xs: '100%', md: '458px' }}
      w='100%'
      justifyContent='center'
    >
      <Flex
        alignItems='center'
        direction={{ base: 'column', md: 'row' }}
        px={{ base: 6, lg: 32 }}
        py={{ xs: 10, md: 0 }}
      >
        <Stack mb={4} mr={{ base: 0, md: 6, lg: 12 }} w={{ base: '100%', md: '50%' }}>
          <PageSection textAlign={{ base: 'center', lg: 'left' }} mb={6}>
            {title}
          </PageSection>

          <Box>
            <Image src={img.src} alt={img.alt} layout='responsive' objectFit='cover' quality={85} />
          </Box>
        </Stack>

        <Stack w={{ md: '50%' }}>
          <PageText mb={6}>{children}</PageText>

          <Flex justifyContent={{ base: 'center', md: 'flex-start' }}>
            <ButtonLink label='Read more' link={link} width='247px' />
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};
