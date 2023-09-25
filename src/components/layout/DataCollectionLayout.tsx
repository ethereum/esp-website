import { Box, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import mergeDataChallengeHero from '../../../public/images/merge-data-challenge-hero.jpeg';
import mergeDataChallengeHeroMobile from '../../../public/images/merge-data-challenge-hero-mobile.jpg';

import { GrantsHero } from '../UI';

export const DataCollectionLayout: FC = ({ children }) => {
  return (
    <Box>
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
        title='Data Collection Grants 2023'
      >
        <Text>
          A proactive grants round to improve the community&apos;s data collection capabilities.
        </Text>

        <Text>Proposals are due at 11:59 UTC October 23rd 2023</Text>

        <Text>All of the details you&apos;ll need to apply can be found below.</Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
