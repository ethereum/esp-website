import { FC } from 'react';
import {
  Box,
  ChakraProps,
  Flex,
  FlexProps,
  Link,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react';

import { StepArrowIcon } from '../icons';

function Arrow(props: FlexProps) {
  return (
    <Flex
      direction={{ base: 'column-reverse', lg: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      {...props}
    >
      <Box
        w={{ base: '5px', lg: 'full' }}
        h={{ base: 'full', lg: '5px' }}
        me={{ base: 0, lg: '-5px' }}
        mt={{ base: '-1px', lg: 0 }}
      >
        <Box
          bgGradient={{
            base: 'linear(to-t, brand.priorityScale.bgGradient.start, brand.priorityScale.bgGradient.end)',
            lg: 'linear(to-r, brand.priorityScale.bgGradient.start, brand.priorityScale.bgGradient.end)'
          }}
          h='full'
        />
      </Box>
      <StepArrowIcon
        mt={0}
        transform={{ base: 'rotate(180deg)', lg: 'rotate(270deg)' }}
        sx={{
          path: {
            fill: 'brand.priorityScale.bgGradient.end'
          }
        }}
      />
    </Flex>
  );
}

interface Props extends ChakraProps {}

export const PriorityProjectsChart: FC<Props> = props => {
  return (
    <Flex
      direction={{ base: 'row', lg: 'column' }}
      p={8}
      bgGradient='linear(to-r, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
      borderRadius='md'
      {...props}
    >
      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        textAlign={{ base: 'right', lg: 'left' }}
        gap={20}
      >
        <Box flex={1}>
          <Text fontSize='lg'>Not a Priority</Text>
        </Box>
        <Box flex={1}>
          <Text fontSize='lg' fontWeight='bold'>
            High Priority
          </Text>
        </Box>
      </Flex>

      <Arrow my={{ base: 0, lg: 4 }} mx={{ base: 2, lg: 0 }} />

      <Flex direction={{ base: 'column-reverse', lg: 'row' }} gap={20}>
        <UnorderedList flex={1} spacing={2}>
          <ListItem>Financial products (e.g. trading, investment products)</ListItem>
          <ListItem>Token or investment-focused events</ListItem>
          <ListItem>Projects with a planned token launch and or raise</ListItem>
          <ListItem>NFT PFP projects, launches, and marketplaces</ListItem>
        </UnorderedList>

        <UnorderedList flex={1} spacing={2} fontWeight='bold'>
          <ListItem>Projects that strengthen Ethereum&apos;s infrastructure</ListItem>
          <ListItem>Developer tooling</ListItem>
          <ListItem>Research on cryptographic primitives</ListItem>
          <ListItem>Growing the builder ecosystem</ListItem>
        </UnorderedList>
      </Flex>
    </Flex>
  );
};
