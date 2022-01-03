import { Text, TextProps } from '@chakra-ui/react';
import { FC } from 'react';

export const StepReadMore: FC<TextProps> = ({ ...props }) => {
  return (
    <Text as='span' fontWeight={700} color='brand.orange.100' cursor='pointer' {...props}>
      Read more
    </Text>
  );
};
