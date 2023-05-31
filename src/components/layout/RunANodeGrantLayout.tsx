import { Box, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import layer2Hero from '../../../public/images/layer-2-grants.png';
import layer2HeroMobile from '../../../public/images/layer-2-grants-mobile.png';

import { GrantsHero } from '../UI';

export const RunANodeGrantLayout: FC = ({ children }) => {
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
