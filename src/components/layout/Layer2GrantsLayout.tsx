import { Box, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import layer2Hero from '../../../public/images/layer-2-grants.png';
import layer2HeroMobile from '../../../public/images/layer-2-grants-mobile.png';

import { GrantsHero } from '../UI';

export const Layer2GrantsLayout: FC = ({ children }) => {
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
        title='Layer 2 Community Grants 2022'
      >
        <Text>
          Calling all Ethereans! The Ethereum Foundation offers a pool of $750,000 in grants that
          will help scale the network while preserving decentralization and public goods.
        </Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
