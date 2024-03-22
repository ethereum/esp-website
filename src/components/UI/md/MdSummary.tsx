import { Flex, FlexProps } from '@chakra-ui/react';
import { MARKDOWN_SUMMARY_ID } from '../../../constants';

export const MdSummary = (props: FlexProps) => (
  <Flex flexDir='column' gap={6} id={MARKDOWN_SUMMARY_ID} {...props} />
);
