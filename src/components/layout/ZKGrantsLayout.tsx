import { Box, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import layer2Hero from '../../../public/images/layer-2-grants.png';
import layer2HeroMobile from '../../../public/images/layer-2-grants-mobile.png';

import { GrantsHero } from '../UI';

export const ZKGrantsLayout: FC = ({ children }) => {
  return (
    <Box>
      <GrantsHero
        colorBrandConstant='layer2GrantsHero'
        desktopImage={{
          alt: 'A mad panda scientist working on ethereum',
          src: layer2Hero
        }}
        mobileImage={{
          alt: 'A mad panda scientist working on ethereum',
          src: layer2HeroMobile
        }}
        title='ZK Grants Round'
      >
        <Text>{/* TODO: update copy */}</Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
