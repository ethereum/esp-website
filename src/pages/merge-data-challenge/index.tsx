import { Accordion, Box, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  FAQItem,
  List,
  PageSection,
  PageSubheading,
  PageText,
  PageMetadata,
  ReadyToApply
} from '../../components/UI';

import {
  MERGE_DATA_CHALLENGE_EMAIL_ADDRESS,
  HOME_URL,
  SIDEBAR_MERGE_DATA_CHALLENGE_LINKS,
  MERGE_DATA_CHALLENGE_APPLY_URL
} from '../../constants';

const MergeDataChallenge: NextPage = () => {
  return (
    <p>Hello World</p>
  )
}

export default MergeDataChallenge