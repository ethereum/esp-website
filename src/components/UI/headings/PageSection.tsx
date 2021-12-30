import { Heading, HeadingProps } from '@chakra-ui/react';
import { FC } from 'react';

export const PageSection: FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading
      as='h3'
      color='#e44550'
      fontSize='22px'
      fontWeight={700}
      lineHeight='29px'
      className='maison-neue-mono'
      textAlign='center'
      {...props}
    >
      {children}
    </Heading>
  );
};
