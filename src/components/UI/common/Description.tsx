import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import Image from 'next/image';

import { PageHeading } from '../headings';
import { PageText } from '../text';

interface Props {
  title: string;
  img: {
    src: string;
    alt: string;
  };
}

export const Description: FC<Props> = ({ title, img, children }) => {
  const { src, alt } = img;

  return (
    <Flex direction={{ base: 'column', md: 'row' }} pr={{ lg: 32 }}>
      <Box ml={{ md: 16 }} mr={{ md: 6, lg: 40 }}>
        <PageHeading mb={4} ml={-1}>
          {title}
        </PageHeading>

        <PageText mb={2}>{children}</PageText>
      </Box>

      <Box mt={{ base: 8, md: -24 }} mx={{ base: 'auto', md: 0 }} flexShrink={0}>
        <Image src={src} alt={alt} objectFit='cover' priority={true} />
      </Box>
    </Flex>
  );
};
