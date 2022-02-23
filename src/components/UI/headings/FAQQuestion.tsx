import { Heading, HeadingProps } from '@chakra-ui/react';
import { FC } from 'react';

export const FAQQuestion: FC<HeadingProps> = ({ children }) => {
  return (
    <Heading
      as='h4'
      color='brand.paragraph'
      fontSize='faq.question'
      fontWeight={700}
      lineHeight='21.25px'
      textAlign='left'
      variant='page-section'
    >
      {children}
    </Heading>
  );
};
