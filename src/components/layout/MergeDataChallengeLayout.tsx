import { Stack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import mergeDataChallengeHero from '../../../public/images/merge-data-challenge-hero.jpeg';
import mergeDataChallengeHeroMobile from '../../../public/images/merge-data-challenge-hero-mobile.jpg';

import { GrantsHero } from '../UI';

type Props = {
  children: ReactNode;
};

export const MergeDataChallengeLayout: FC<Props> = ({ children }) => {
  return (
    <Stack>
      <GrantsHero
        colorBrandConstant='mergeDataChallengeHero'
        desktopImage={{
          alt: 'Two people holding hands in field with ethereum log',
          src: mergeDataChallengeHero
        }}
        mobileImage={{
          alt: 'Two people holding hands in field with ethereum log',
          src: mergeDataChallengeHeroMobile
        }}
        title='Merge data challenge'
      >
        Calling all Ethereans, data scientists, data engineers, data visualizers, developers, and
        anyone interested in digging into Ethereum data!
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
