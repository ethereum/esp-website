import { Text, TextProps } from '@chakra-ui/react';

interface CharCounterProps extends TextProps {
  current: number;
  max: number;
}

export const CharCounter = ({ current, max, ...rest }: CharCounterProps) => {
  return (
    <Text fontSize='xs' color={current > max ? 'red.500' : 'gray.500'} {...rest}>
      {current}/{max}
    </Text>
  );
};
