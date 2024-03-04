import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Link } from '@chakra-ui/react';

import { Banner } from './UI';

import { ACADEMIC_GRANTS_URL, DATA_CHALLENGE_ROUND_URL, ZK_GRANTS_URL } from '../constants';

export const Banners: FC = () => {
  const router = useRouter();

  if (
    !router.pathname.includes(ACADEMIC_GRANTS_URL) &&
    !router.pathname.includes(ZK_GRANTS_URL) &&
    !router.pathname.includes(DATA_CHALLENGE_ROUND_URL)
  ) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications are open for the{' '}
          <Link fontWeight={700} href={ACADEMIC_GRANTS_URL}>
            Academic
          </Link>
          ,{' '}
          <Link fontWeight={700} href={ZK_GRANTS_URL}>
            ZK
          </Link>{' '}
          and{' '}
          <Link fontWeight={700} href={DATA_CHALLENGE_ROUND_URL}>
            4844 Data Challenge
          </Link>{' '}
          grants rounds. See the details and apply.
        </Box>
      </Banner>
    );
  }

  return null;
};
