import { Box, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import layer2Hero from '../../../public/images/layer-2-grants.png';
import layer2HeroMobile from '../../../public/images/layer-2-grants-mobile.png';

import { GrantsHero, DimLayer } from '../UI';

export const Layer2GrantsLayout: FC = ({ children }) => {
  return (
    <Box>
      <DimLayer />
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam fugiat, vitae nostrum
          quibusdam repellat reiciendis iure repellendus neque, harum quae magni similique. Porro,
          alias fuga maiores corporis sunt provident ad!
        </Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
