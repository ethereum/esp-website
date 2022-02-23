import { Heading, HeadingProps } from '@chakra-ui/react';
import { FC } from 'react';

export const StepHeading: FC<HeadingProps> = ({ children }) => {
  return (
    <Heading
      as='h4'
      color='brand.paragraph'
      fontSize='h4'
      fontWeight={700}
      lineHeight='22px'
      textAlign='center'
    >
      {children}
    </Heading>
  );
};
