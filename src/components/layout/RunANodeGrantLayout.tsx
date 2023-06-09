import { Box, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import runANodeHero from '../../../public/images/run-a-node.png';
import runANodeHeroMobile from '../../../public/images/run-a-node-mobile.png';

import { GrantsHero } from '../UI';

export const RunANodeGrantLayout: FC = ({ children }) => {
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
        title='Run A Node Grants'
      >
        <Text>
        The Ethereum Foundation invites proposals for innovative use, development, and testing of Ethereum nodes. We 
        encourage the community&apos;s creativity in exploring a diverse range of ideas, such as facilitating data queries for research, 
        examining node performance under severe conditions, or enhancing node UX. Feel free to surprise us! 
        
        Successful applicants can choose between prebuilt hardware or a hardware cost stipend.
        </Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
