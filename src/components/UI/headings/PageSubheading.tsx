import { Heading, HeadingProps } from '@chakra-ui/react';
import { FC } from 'react';

export const PageSubheading: FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading
      as='h2'
      color='brand.heading'
      fontSize='h2'
      fontWeight={400}
      lineHeight='29px'
      textAlign='center'
      {...props}
    >
      {children}
    </Heading>
  );
};
