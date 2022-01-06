import { Heading, HeadingProps } from '@chakra-ui/react';
import { FC } from 'react';

export const ImportantText: FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading
      as='h4'
      textAlign='center'
      variant='ready'
      fontSize='h4'
      fontWeight={700}
      lineHeight='24px'
      {...props}
    >
      {children}
    </Heading>
  );
};
