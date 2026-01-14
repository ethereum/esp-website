import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import { BannerClickeable } from './UI';
import { ROUNDS_URL } from '../constants';

// TODO: Replace with server components when available
const ACTIVE_ROUND = {
  slug: 'agr26',
  name: 'Academic Grants Round 2026'
};

export const Banners: FC = () => {
  const router = useRouter();

  // Don't show banner on the round page itself
  if (router.pathname.startsWith(ROUNDS_URL)) {
    return null;
  }

  return (
    <BannerClickeable to={`${ROUNDS_URL}/${ACTIVE_ROUND.slug}`}>
      <Flex alignItems='center' gap={2} fontSize='sm'>
        <Box fontWeight={600}>{ACTIVE_ROUND.name} is now open!</Box>
        <Flex alignItems='center' fontWeight={600} _hover={{ textDecoration: 'underline' }}>
          Apply now
          <Icon as={ChevronRightIcon} ml={1} />
        </Flex>
      </Flex>
    </BannerClickeable>
  );
};
