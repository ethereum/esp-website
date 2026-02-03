import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Icon, Link } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import { BannerClickeable, Banner } from './UI';
import { ROUNDS_URL } from '../constants';
import { RoundFrontmatter } from '../types';

export const Banners: FC = () => {
  const router = useRouter();
  const [activeRounds, setActiveRounds] = useState<RoundFrontmatter[]>([]);

  useEffect(() => {
    fetch('/api/active-rounds')
      .then(res => res.json())
      .then((rounds: RoundFrontmatter[]) => {
        setActiveRounds(rounds);
      })
      .catch(() => {
        // Silently fail - banners just won't show
      });
  }, []);

  // Don't show banners on round pages
  if (router.pathname.startsWith(ROUNDS_URL)) {
    return null;
  }

  // Don't show banners if no active rounds
  if (activeRounds.length === 0) {
    return null;
  }

  // Single round: clickable banner linking to that round
  if (activeRounds.length === 1) {
    const round = activeRounds[0];
    return (
      <BannerClickeable to={`${ROUNDS_URL}/${round.slug}`}>
        <Flex alignItems='center' gap={2} fontSize='sm'>
          <Box fontWeight={600}>{round.name} is now open!</Box>
          <Flex alignItems='center' fontWeight={600} _hover={{ textDecoration: 'underline' }}>
            Apply now
            <Icon as={ChevronRightIcon} ml={1} />
          </Flex>
        </Flex>
      </BannerClickeable>
    );
  }

  // Multiple rounds: list names with links
  return (
    <Banner>
      <Flex alignItems='center' gap={2} fontSize='sm' flexWrap='wrap' justifyContent='center'>
        <Box fontWeight={600}>
          {activeRounds.map((round, index) => (
            <span key={round.slug}>
              <Link
                as={NextLink}
                href={`${ROUNDS_URL}/${round.slug}`}
                textDecoration='underline'
                _hover={{ opacity: 0.8 }}
              >
                {round.name}
              </Link>
              {index < activeRounds.length - 2 && ', '}
              {index === activeRounds.length - 2 && ' and '}
            </span>
          ))}
          {' '}are now open!
        </Box>
      </Flex>
    </Banner>
  );
};
