import { FC } from 'react';
import { ChakraProps, Heading } from '@chakra-ui/react';

import { Banner } from './Banner';

interface Props extends ChakraProps {}

export const BannerApplicationClosed: FC<Props> = props => {
  return (
    <Banner
      bgGradient='linear(to-br, brand.closedBanner.bgGradient.start 10%, brand.closedBanner.bgGradient.end 100%)'
      color='brand.heading'
      py={6}
      borderRadius='xl'
      {...props}
    >
      <Heading fontSize='h4' fontWeight={700}>
        Applications are now closed
      </Heading>
    </Banner>
  );
};
