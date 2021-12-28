import { Text } from '@chakra-ui/react';
import { FC } from 'react';

export const PageText: FC = ({ children }) => {
  return (
    <Text color='brand.paragraph' fontSize='paragraph' fontWeight={300} lineHeight='24px'>
      {children}
    </Text>
  );
};
