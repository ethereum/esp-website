import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

export const MergeDataChallengeLayout: FC = ({ children }) => {
  return (
    <Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};