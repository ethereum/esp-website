import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { GrantsHero } from '../UI';

import dataChallengeGrantsHero from '../../../public/images/data-challenge-4844-hero.jpg';

export const DataChallengeLayout: FC = ({ children }) => {
  const alt =
    'A person standing at the top of a hill looking at a vast landscape that contains things with the shape of different types of charts';

  return (
    <Stack>
      <GrantsHero
        colorBrandConstant='dataChallengeHero'
        desktopImage={{
          alt,
          src: dataChallengeGrantsHero
        }}
        mobileImage={{
          alt,
          src: dataChallengeGrantsHero
        }}
        title='4844 Data Challenge'
      >
        The Ethereum Foundation is sponsoring a 4844 data analysis and visualization blog post
        challenge. Here are all the details you need.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
