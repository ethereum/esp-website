import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Icon, Link } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import { BannerClickeable, Banner } from './UI';
import { ROUNDS_URL } from '../constants';
import { RoundFrontmatter } from '../types';

interface BannersProps {
  rounds?: RoundFrontmatter[];
}

export const Banners: FC<BannersProps> = ({ rounds = [] }) => {
  const router = useRouter();

  // Don't show banners on round pages
  if (router.pathname.startsWith(ROUNDS_URL)) {
    return null;
  }

  // Don't show banners if no active rounds
  if (rounds.length === 0) {
    return null;
  }

  // Single round: clickable banner linking to that round
  if (rounds.length === 1) {
    const round = rounds[0];
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
          {rounds.map((round, index) => (
            <span key={round.slug}>
              <Link
                as={NextLink}
                href={`${ROUNDS_URL}/${round.slug}`}
                textDecoration='underline'
                _hover={{ opacity: 0.8 }}
              >
                {round.name}
              </Link>
              {index < rounds.length - 2 && ', '}
              {index === rounds.length - 2 && ' and '}
            </span>
          ))}
          {' '}are now open!
        </Box>
      </Flex>
    </Banner>
  );
};
