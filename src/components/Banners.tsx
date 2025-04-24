import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Link } from '@chakra-ui/react';

import { Banner } from './UI';

import { TEN_YEAR_ANNIVERSARY_URL } from '../constants';

export const Banners: FC = () => {
  const router = useRouter();

  // TODO: Add banner content
  if (!router.pathname.includes(TEN_YEAR_ANNIVERSARY_URL)) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications for the{' '}
          <Link href={TEN_YEAR_ANNIVERSARY_URL} fontWeight={700}>
            10 Years of Ethereum meetups
          </Link>{' '}
          are now open!
        </Box>
      </Banner>
    );
  }

  return null;
};
