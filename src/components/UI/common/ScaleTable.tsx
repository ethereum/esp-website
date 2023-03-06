import { FC } from 'react';
import {
  Box,
  ChakraProps,
  Flex,
  FlexProps,
  Heading,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react';

import { StepArrow } from '../icons/StepArrow';

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
        mr={{ base: 0, lg: '-5px' }}
        mt={{ base: '-1px', lg: 0 }}
      >
        <Box
          bgGradient={{
            base: 'linear(to-t, brand.footer.bgGradient.start 10%, brand.footer.bgGradient.end 100%)',
            lg: 'linear(to-r, brand.footer.bgGradient.start 10%, brand.footer.bgGradient.end 100%)'
          }}
          h='full'
        />
      </Box>
      <StepArrow
        mt={0}
        transform={{ base: 'rotate(180deg)', lg: 'rotate(270deg)' }}
        sx={{
          path: {
            fill: 'brand.footer.bgGradient.end'
          }
        }}
      />
    </Flex>
  );
}

interface Props extends ChakraProps {}

export const ScaleTable: FC<Props> = props => {
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
          <Text fontSize='lg'>Lower Priority</Text>
        </Box>
        <Box flex={1}>
          <Text fontSize='lg' fontWeight='bold'>
            Higher Priority
          </Text>
        </Box>
      </Flex>

      <Arrow my={{ base: 0, lg: 4 }} mx={{ base: 4, lg: 0 }} />

      <Flex direction={{ base: 'column-reverse', lg: 'row' }} gap={20}>
        <UnorderedList flex={1} spacing={2}>
          <ListItem>Financial products (e.g. trading, investment products)</ListItem>
          <ListItem>Token or investment-focused events</ListItem>
          <ListItem>Projects with a planned token launch and/or raise</ListItem>
          <ListItem>NFT PFP projects, launches, and marketplaces</ListItem>
        </UnorderedList>

        <UnorderedList flex={1} spacing={2} fontWeight='bold'>
          <ListItem>Projects that strengthen Ethereum&apos;s infrastructure</ListItem>
          <ListItem>Developer tooling</ListItem>
          <ListItem>Research on cryptographic primitives</ListItem>
          <ListItem>Growing the builder ecosystem</ListItem>
          <ListItem>Projects on our wishlist</ListItem>
        </UnorderedList>
      </Flex>
    </Flex>
  );
};
