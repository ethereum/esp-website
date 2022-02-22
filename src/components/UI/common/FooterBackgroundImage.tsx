import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import footerBackground from '../../../../public/images/footer-background.png';
import footerBackgroundMobile from '../../../../public/images/footer-background-mobile.png';

export const FooterBackgroundImage: FC = () => {
  return (
    <Box mt={{ base: 10, md: 24 }} mb={-2}>
      <Box display={{ base: 'block', md: 'none' }}>
        <Image
          src={footerBackgroundMobile}
          alt='People gathered around the Ethereum tree'
          layout='responsive'
          objectFit='cover'
          width={450}
          height={200}
          placeholder='blur'
          quality={90}
        />
      </Box>

      <Box display={{ base: 'none', md: 'block' }}>
        <Image
          src={footerBackground}
          alt='People gathered around the Ethereum tree'
          layout='responsive'
          objectFit='cover'
          width={1440}
          height={335}
          placeholder='blur'
          quality={90}
        />
      </Box>
    </Box>
  );
};
