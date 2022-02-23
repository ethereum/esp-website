import { Text, TextProps } from '@chakra-ui/react';
import { FC } from 'react';

export const PageText: FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text
      color='brand.paragraph'
      fontSize='paragraph'
      fontWeight={300}
      lineHeight='24px'
      {...props}
    >
      {children}
    </Text>
  );
};
