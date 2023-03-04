import { FC } from 'react';
import {
  Box,
  ChakraProps,
  Flex,
  Grid,
  GridItem,
  List,
  ListItem,
  SimpleGrid,
  Spacer,
  Stack,
  UnorderedList
} from '@chakra-ui/react';

import { StepArrow } from '../icons/StepArrow';

function Arrow() {
  return (
    <Box position='relative'>
      <Box
        w={{ base: '5px', lg: 'full' }}
        h={{ base: 'full', lg: '5px' }}
        pr={{ base: 0, lg: '15px' }}
        pt={{ base: '15px', lg: 0 }}
      >
        <Box
          bgGradient={{
            base: 'linear(to-t, green.200, pink.500)',
            lg: 'linear(to-r, green.200, pink.500)'
          }}
          h='full'
        />
      </Box>
      <StepArrow
        position='absolute'
        top={{ base: 0, lg: 'calc(-50% - 4px)' }}
        right={{ base: 'calc(-50% - 8px)', lg: 0 }}
        mt={0}
        transform={{ base: 'rotate(180deg)', lg: 'rotate(270deg)' }}
        sx={{
          path: {
            fill: 'pink.500'
          }
        }}
      />
    </Box>
  );
}

interface Props extends ChakraProps {}

export const ScaleTable: FC<Props> = () => {
  return (
    <Flex direction={{ base: 'row', lg: 'column' }} py={8} px={10} bg='red.200' borderRadius='md'>
      <Flex direction={{ base: 'column-reverse', lg: 'row' }} gap={8}>
        <Box flex={1}>Lower Priority</Box>
        <Box flex={1}>Higher Priority</Box>
      </Flex>

      <Arrow />

      <Flex direction={{ base: 'column-reverse', lg: 'row' }} gap={8}>
        <UnorderedList>
          <ListItem>Projects that are not low open source</ListItem>
          <ListItem>Projects that are not open source</ListItem>
          <ListItem>Projects that are not open source</ListItem>
          <ListItem>Projects that are not open source</ListItem>
        </UnorderedList>

        <UnorderedList>
          <ListItem>Projects that are not high open source</ListItem>
          <ListItem>Projects that are not open source</ListItem>
          <ListItem>Projects that are not open source</ListItem>
          <ListItem>Projects that are not open source</ListItem>
        </UnorderedList>
      </Flex>
    </Flex>
  );
};
