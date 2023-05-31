import { Box, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import semaphoreHero from '../../../public/images/semaphore-meadow.png';
import semaphoreHeroMobile from '../../../public/images/semaphore-meadow-mobile.png';

import { DimLayer, GrantsHero } from '../UI';

export const RunANodeGrantLayout: FC = ({ children }) => {
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
        title='Run A Node Grants'
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat atque cupiditate sunt
        tempore cum eaque assumenda distinctio eius. At delectus molestiae aperiam rem consequuntur
        ex deleniti repudiandae harum necessitatibus recusandae.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
