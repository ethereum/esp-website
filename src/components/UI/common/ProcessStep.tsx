import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';

import { PageText, StepArrow, StepHeader } from '../';

interface Props {
  title: string;
  arrow?: boolean;
}

// TODO: fix this layout
export const ProcessStep: FC<Props> = ({ title, arrow, children }) => {
  return (
    <Flex direction='column'>
      <Flex alignItems='center' direction={{ base: 'column', md: 'row' }} mb={8}>
        <StepHeader>{title}</StepHeader>

        <PageText w={{ md: '68%' }}>{children}</PageText>
      </Flex>

      {arrow && (
        <Box>
          <StepArrow />
        </Box>
      )}
    </Flex>
  );
};
