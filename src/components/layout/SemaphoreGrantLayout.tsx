import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import semaphoreHero from '../../../public/images/semaphore-meadow.png';
import mergeDataChallengeHeroMobile from '../../../public/images/merge-data-challenge-hero-mobile.jpg';

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
          // TODO: add mobile image
          src: mergeDataChallengeHeroMobile
        }}
        title='Semaphore Community Grant Round'
      >
        TODO?
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
