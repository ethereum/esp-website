import { Heading } from '@chakra-ui/react';
import { FC } from 'react';

export const PageHeading: FC = ({ children }) => {
  return (
    <Heading as='h1' color='brand.heading' fontSize='h1' fontWeight={200} lineHeight='48px' mb={4}>
      {children}
    </Heading>
  );
};
