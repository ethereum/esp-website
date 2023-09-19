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
          {/* TODO: add copy */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, ad? Debitis eaque
          exercitationem dolores doloremque modi non inventore quisquam numquam fugit iure quam
          quibusdam, adipisci, molestias velit dolore deleniti laborum.
        </Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
