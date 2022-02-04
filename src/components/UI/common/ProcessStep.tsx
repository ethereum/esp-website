import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';

import { PageText, StepArrow, StepHeader } from '../';

interface Props {
  title: string;
  withArrow?: boolean;
}

// TODO: fix this layout
export const ProcessStep: FC<Props> = ({ title, withArrow, children }) => {
  return (
    <Flex direction='column'>
      <Flex alignItems='center' direction={{ base: 'column', md: 'row' }} mb={{ md: 8 }}>
        <StepHeader>{title}</StepHeader>

        <PageText w={{ md: '68%' }}>{children}</PageText>
      </Flex>

      {withArrow && (
        <Box>
          <StepArrow />
        </Box>
      )}
    </Flex>
  );
};
