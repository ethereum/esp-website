import { Box, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import runANodeHero from '../../../public/images/run-a-node.png';
import runANodeHeroMobile from '../../../public/images/run-a-node-mobile.png';

import { GrantsHero } from '../UI';

export const DataCollectionLayout: FC = ({ children }) => {
  return (
    <Box>
      <GrantsHero
        colorBrandConstant='layer2GrantsHero'
        desktopImage={{
          alt: 'A mad panda scientist working on ethereum',
          src: runANodeHero
        }}
        mobileImage={{
          alt: 'A mad panda scientist working on ethereum',
          src: runANodeHeroMobile
        }}
        title='Data Collection Grants 2023'
      >
        <Text>
          A proactive grants round to improve the community&apos;s data collection capabilities.
        </Text>

        <Text>Proposals are due at 11:59 UTC October 23rd 2023</Text>

        <Text>All of the details you&apos;ll need to apply can be found below.</Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
