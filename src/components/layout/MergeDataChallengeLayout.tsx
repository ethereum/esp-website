import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { MergeDataChallengeHero } from '../UI';

export const MergeDataChallengeLayout: FC = ({ children }) => {
  return (
    <Stack>
      <MergeDataChallengeHero title='Merge data challenge'>
        Calling all Ethereans, data scientists, data engineers, data visualizers, developers, and anyone interested in digging into Ethereum data!
      </MergeDataChallengeHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};