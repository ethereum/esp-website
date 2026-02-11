import { ReactNode } from 'react';
import {
  Heading,
  Text,
  Link,
  UnorderedList,
  OrderedList,
  ListItem,
  Box,
  Code
} from '@chakra-ui/react';

interface MDXComponentProps {
  children?: ReactNode;
  id?: string;
}

interface MDXLinkProps extends MDXComponentProps {
  href?: string;
}

/**
 * MDX components with Chakra UI styling.
 * IDs are added by rehype-slug plugin.
 */
export const mdxComponents = {
  h1: ({ children, id }: MDXComponentProps) => (
    <Heading
      as="h1"
      id={id}
      color="brand.heading"
      fontSize="h1"
      fontWeight={400}
      lineHeight="48px"
      mb={6}
      mt={8}
      scrollMarginTop="100px"
    >
      {children}
    </Heading>
  ),

  h2: ({ children, id }: MDXComponentProps) => (
    <Heading
      as="h2"
      id={id}
      color="brand.heading"
      fontSize="h2"
      fontWeight={400}
      lineHeight="29px"
      mb={4}
      mt={8}
      scrollMarginTop="100px"
    >
      {children}
    </Heading>
  ),

  h3: ({ children, id }: MDXComponentProps) => (
    <Heading
      as="h3"
      id={id}
      color="brand.heading"
      fontSize="22px"
      fontWeight={700}
      lineHeight="29px"
      mb={3}
      mt={6}
      scrollMarginTop="100px"
    >
      {children}
    </Heading>
  ),

  h4: ({ children, id }: MDXComponentProps) => (
    <Heading
      as="h4"
      id={id}
      color="brand.heading"
      fontSize="18px"
      fontWeight={700}
      lineHeight="24px"
      mb={2}
      mt={4}
      scrollMarginTop="100px"
    >
      {children}
    </Heading>
  ),

  p: ({ children }: MDXComponentProps) => (
    <Text
      color="brand.paragraph"
      fontSize="paragraph"
      fontWeight={300}
      lineHeight="24px"
      mb={4}
    >
      {children}
    </Text>
  ),

  a: ({ href, children }: MDXLinkProps) => (
    <Link
      href={href}
      color="brand.heading"
      fontWeight={700}
      textDecoration="underline"
      _hover={{ color: 'brand.hover' }}
    >
      {children}
    </Link>
  ),

  ul: ({ children }: MDXComponentProps) => (
    <UnorderedList
      color="brand.paragraph"
      fontSize="paragraph"
      fontWeight={300}
      lineHeight="24px"
      mb={4}
      ml={6}
      spacing={2}
    >
      {children}
    </UnorderedList>
  ),

  ol: ({ children }: MDXComponentProps) => (
    <OrderedList
      color="brand.paragraph"
      fontSize="paragraph"
      fontWeight={300}
      lineHeight="24px"
      mb={4}
      ml={6}
      spacing={2}
    >
      {children}
    </OrderedList>
  ),

  li: ({ children }: MDXComponentProps) => (
    <ListItem>{children}</ListItem>
  ),

  blockquote: ({ children }: MDXComponentProps) => (
    <Box
      as="blockquote"
      borderLeftWidth="4px"
      borderLeftColor="brand.heading"
      pl={4}
      py={2}
      my={4}
      fontStyle="italic"
      color="brand.paragraph"
    >
      {children}
    </Box>
  ),

  code: ({ children }: MDXComponentProps) => (
    <Code
      bg="brand.upload.bg"
      px={2}
      py={0.5}
      borderRadius="md"
      fontSize="sm"
    >
      {children}
    </Code>
  ),

  pre: ({ children }: MDXComponentProps) => (
    <Box
      as="pre"
      bg="brand.upload.bg"
      p={4}
      borderRadius="md"
      overflowX="auto"
      mb={4}
      fontSize="sm"
    >
      {children}
    </Box>
  ),

  hr: () => (
    <Box
      as="hr"
      borderTopWidth="1px"
      borderTopColor="brand.divider.100"
      my={8}
    />
  ),

  strong: ({ children }: MDXComponentProps) => (
    <Text as="strong" fontWeight={700}>
      {children}
    </Text>
  ),

  em: ({ children }: MDXComponentProps) => (
    <Text as="em" fontStyle="italic">
      {children}
    </Text>
  )
};
