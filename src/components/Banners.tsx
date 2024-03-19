import { FC } from 'react';
import { Box, Link } from '@chakra-ui/react';

import { useCurrentPath } from '../hooks/useCurrentPath';
import { Banner } from './UI';

import { DATA_CHALLENGE_ROUND_URL, ZK_GRANTS_URL } from '../constants';

export const Banners: FC = () => {
  const path = useCurrentPath();

  if (
    !path.includes(ZK_GRANTS_URL) &&
    !path.includes(DATA_CHALLENGE_ROUND_URL)
  ) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications are open for the{' '}
          <Link fontWeight={700} href={DATA_CHALLENGE_ROUND_URL}>
            4844 Data Challenge
          </Link>{' '}
          grants round. See the details and apply.
        </Box>
      </Banner>
    );
  }

  return null;
};
