import { Text, TextProps } from '@chakra-ui/react';
import { FC } from 'react';

export const StepReadMore: FC<TextProps> = ({ ...props }) => {
  return (
    <Text as='span' fontWeight={700} color='#f76f45' cursor='pointer' {...props}>
      Read more
    </Text>
  );
};
