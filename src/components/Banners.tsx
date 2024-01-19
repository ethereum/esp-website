import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Link } from '@chakra-ui/react';

import { Banner } from './UI';

import { ZK_GRANTS_URL } from '../constants';

export const Banners: FC = () => {
  const router = useRouter();

  if (!router.pathname.includes(ZK_GRANTS_URL)) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications are open for the{' '}
          <Link fontWeight={700} href={ZK_GRANTS_URL}>
            ZK Grants Round
          </Link>{' '}
          . See the details and apply.
        </Box>
      </Banner>
    );
  }

  return null;
};
