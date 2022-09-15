import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import semaphoreHero from '../../../public/images/semaphore-meadow.png';
import semaphoreHeroMobile from '../../../public/images/semaphore-meadow-mobile.png';

import { GrantsHero } from '../UI';

export const SemaphoreGrantLayout: FC = ({ children }) => {
  return (
    <Stack>
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
        title='Semaphore Community Grant Round'
      >
        TODO?
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
