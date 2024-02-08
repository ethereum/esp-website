import { Box, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import zkHero from '../../../public/images/zk-grants.jpg';
import zkHeroMobile from '../../../public/images/zk-grants-mobile.jpg';

import { GrantsHero } from '../UI';

export const ZKGrantsLayout: FC = ({ children }) => {
  return (
    <Box>
      <GrantsHero
        colorBrandConstant='layer2GrantsHero'
        desktopImage={{
          alt: 'A mad panda scientist working on ethereum',
          src: zkHero
        }}
        mobileImage={{
          alt: 'A mad panda scientist working on ethereum',
          src: zkHeroMobile
        }}
        title='ZK Grants Round'
      >
        <Text>
          <Text as='i'>A cofunded proactive grants round to improve the ZK Layer 2 Ecosystem.</Text>
        </Text>
        <Text>
          <Text as='i'>Proposals are due at 11:59 UTC March 17th 2024</Text>
        </Text>
        <Text>
          <Text as='i'>All of the details you’ll need to apply can be found below.</Text>
        </Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
