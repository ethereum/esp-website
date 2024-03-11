import { Box, Stack, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import dataCollectionHero from '../../../public/images/data-collection-proactive-grants.png';
import dataCollectionHeroMobile from '../../../public/images/data-collection-proactive-grants-mobile.png';

import { GrantsHero } from '../UI';

type Props = {
  children: ReactNode;
};

export const DataCollectionLayout: FC<Props> = ({ children }) => {
  const alt =
    'A person standing at the top of a hill looking at a vast landscape that contains things with the shape of different types of charts';

  return (
    <Box>
      <GrantsHero
        colorBrandConstant='dataCollectionHero'
        desktopImage={{
          alt,
          src: dataCollectionHero
        }}
        mobileImage={{
          alt,
          src: dataCollectionHeroMobile
        }}
        title='Data Collection Grants 2023'
      >
        <Text>
          A proactive grants round to improve the community&apos;s data collection capabilities.
        </Text>

        <Text>Proposals are due at 11:59 UTC October 23rd 2023.</Text>

        <Text>All of the details you&apos;ll need to apply can be found below.</Text>
      </GrantsHero>

      <Stack>{children}</Stack>
    </Box>
  );
};
