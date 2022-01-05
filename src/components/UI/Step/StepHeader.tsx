import { Flex, HeadingProps } from '@chakra-ui/react';
import { FC } from 'react';

import { StepHeading } from '../headings';

export const StepHeader: FC<HeadingProps> = ({ children }) => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      h='50px'
      maxW='100%'
      borderRadius='10px'
      bgGradient='linear(to-r, #ffe5e2 10%, #f3d1ee 100%)'
      mb={4}
    >
      <StepHeading>{children}</StepHeading>
    </Flex>
  );
};
