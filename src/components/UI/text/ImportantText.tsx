import { Text, TextProps } from '@chakra-ui/react';
import { FC } from 'react';

export const ImportantText: FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text
      textAlign='center'
      variant='ready'
      fontSize='h4'
      fontWeight={700}
      lineHeight='24px'
      {...props}
    >
      {children}
    </Text>
  );
};
