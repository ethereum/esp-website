import { Flex, HeadingProps } from '@chakra-ui/react';
import { FC } from 'react';

import { StepHeading } from '../headings';

export const StepHeader: FC<HeadingProps> = ({ children }) => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      h={{ base: '50px', md: '78px' }}
      w={{ base: '100%', md: '203px' }}
      borderRadius='10px'
      bgGradient='linear(to-br, brand.faq.bgGradient.start 10%, brand.faq.bgGradient.end 100%)'
      mb={{ base: 4, md: 0 }}
    >
      <StepHeading>{children}</StepHeading>
    </Flex>
  );
};
