import { FC } from 'react';
import { Box, Flex, Link, Text, Icon } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import { RoundFrontmatter } from '../../../types';
import { ROUNDS_URL } from '../../../constants';

interface ActiveRoundBannerProps {
  round: RoundFrontmatter;
}

export const ActiveRoundBanner: FC<ActiveRoundBannerProps> = ({ round }) => {
  return (
    <Link
      href={`${ROUNDS_URL}/${round.slug}`}
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        w='100%'
        bg='brand.activeRoundBanner.bg'
        borderBottom='1px solid'
        borderColor='brand.activeRoundBanner.border'
        py={3}
        px={4}
      >
        <Flex
          maxW='1400px'
          mx='auto'
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          <Text
            fontSize='sm'
            fontWeight={600}
            color='brand.activeRoundBanner.text'
          >
            {round.name} is now open!
          </Text>
          <Flex
            alignItems='center'
            color='brand.heading'
            fontWeight={600}
            fontSize='sm'
            _hover={{ textDecoration: 'underline' }}
          >
            Apply now
            <Icon as={ChevronRightIcon} ml={1} />
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};
