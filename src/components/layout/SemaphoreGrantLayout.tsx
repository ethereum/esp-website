import { Box, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import semaphoreHero from '../../../public/images/semaphore-meadow.png';
import semaphoreHeroMobile from '../../../public/images/semaphore-meadow-mobile.png';

import { DimLayer, GrantsHero } from '../UI';

export const SemaphoreGrantLayout: FC = ({ children }) => {
  return (
    <Box>
      <DimLayer height='130px' />
      <GrantsHero
        colorBrandConstant='semaphoreGrantHero'
        desktopImage={{
          alt: 'People making shadow plays in a field of grass',
          src: semaphoreHero
        }}
        mobileImage={{
          alt: 'People making shadow plays in a field of grass',
          src: semaphoreHeroMobile
        }}
        title='Semaphore Community Grants'
      >
        We are providing grants for developers to build applications using Semaphore’s
        zero-knowledge primitives
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
