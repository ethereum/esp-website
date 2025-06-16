import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Link } from '@chakra-ui/react';

import { Banner } from './UI';

import { DEVCON_GRANTS_URL, TEN_YEAR_ANNIVERSARY_URL } from '../constants';

export const Banners: FC = () => {
  const router = useRouter();

  // TODO: Add banner content
  if (
    !router.pathname.includes(TEN_YEAR_ANNIVERSARY_URL) &&
    !router.pathname.includes(DEVCON_GRANTS_URL)
  ) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications for the{' '}
          <Link href={DEVCON_GRANTS_URL} fontWeight={700}>
            Destino Devconnect Grants
          </Link>{' '}
          are now open!
        </Box>
      </Banner>
    );
  }

  return null;
};
