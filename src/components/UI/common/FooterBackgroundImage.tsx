import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import footerBackground from '../../../public/images/footer-background.svg';
import footerBackgroundMobile from '../../../public/images/footer-background-mobile.svg';

export const FooterBackgroundImage: FC = () => {
  return (
    <Box mt={{ base: 10, md: 24 }} mb={-2}>
      <Box display={{ base: 'block', md: 'none' }}>
        <Image
          src={footerBackgroundMobile}
          alt='People gathered around the Ethereum tree'
          layout='responsive'
          objectFit='cover'
        />
      </Box>

      <Box display={{ base: 'none', md: 'block' }}>
        <Image
          src={footerBackground}
          alt='People gathered around the Ethereum tree'
          layout='responsive'
          objectFit='cover'
          quality={85}
        />
      </Box>
    </Box>
  );
};
