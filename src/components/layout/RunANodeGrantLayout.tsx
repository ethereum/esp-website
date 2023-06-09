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
        The Ethereum Foundation calls for proposals to expand node diversity and use cases in the Ethereum network. 
        Ideas can range from running a node for students to query data, testing node performance in extreme conditions, 
        or developing a simple UX for nodes. Successful applicants will either be awarded prebuilt hardware or a stipend 
        to support their hardware costs.
        </Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
