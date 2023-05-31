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
          The Ethereum Foundation is calling for proposals to expand the diversity of nodes within
          its network. This initiative seeks to bolster the Ethereum ecosystem by offering
          successful applicants either prebuilt hardware or reimbursement of costs. Awardees will be
          selected based on the creativity, impact, and significance of their proposed plans for
          their node.
        </Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
