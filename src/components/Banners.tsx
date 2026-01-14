import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import { BannerClickeable } from './UI';
import { RoundFrontmatter } from '../types';
import { ROUNDS_URL } from '../constants';

export const Banners: FC = () => {
  const router = useRouter();
  const [activeRound, setActiveRound] = useState<RoundFrontmatter | null>(null);

  useEffect(() => {
    const fetchActiveRound = async () => {
      try {
        const response = await fetch('/api/active-round');
        const data = await response.json();
        setActiveRound(data.round);
      } catch (error) {
        console.error('Failed to fetch active round:', error);
      }
    };

    fetchActiveRound();
  }, []);

  // Don't show banner on the round page itself
  if (!activeRound || router.pathname.startsWith(ROUNDS_URL)) {
    return null;
  }

  return (
    <BannerClickeable to={`${ROUNDS_URL}/${activeRound.slug}`}>
      <Flex alignItems='center' gap={2} fontSize='sm'>
        <Box fontWeight={600}>{activeRound.name} is now open!</Box>
        <Flex alignItems='center' fontWeight={600} _hover={{ textDecoration: 'underline' }}>
          Apply now
          <Icon as={ChevronRightIcon} ml={1} />
        </Flex>
      </Flex>
    </BannerClickeable>
  );
};
