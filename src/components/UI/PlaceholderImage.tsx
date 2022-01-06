import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  height: string;
  width: string;
}

export const PlaceholderImage: FC<Props> = ({ height, width }) => {
  return (
    <Flex
      alignItems='center'
      alignSelf='center'
      justifyContent='center'
      backgroundColor='brand.divider'
      borderRadius='100%'
      h={height}
      w={{ base: '300px', md: width }}
    >
      image here
    </Flex>
  );
};
