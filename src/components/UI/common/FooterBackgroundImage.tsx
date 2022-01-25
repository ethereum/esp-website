import { Box, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import footerBackground from '../../../public/images/footer-background.svg';
import footerBackgroundMobile from '../../../public/images/footer-background-mobile.svg';

export const FooterBackgroundImage: FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Box mt={24} mb={-2}>
      <Image
        src={isMobile ? footerBackgroundMobile : footerBackground}
        alt='People gathered around the Ethereum tree'
        objectFit='cover'
      />
    </Box>
  );
};
