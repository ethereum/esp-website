import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Link } from '@chakra-ui/react';

import { Banner } from './UI';

import { ACADEMIC_GRANTS_URL, PECTRA_PGR_URL } from '../constants';

export const Banners: FC = () => {
  const router = useRouter();

  if (!router.pathname.includes(ACADEMIC_GRANTS_URL)) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications are open for the{' '}
          <Link fontWeight={700} href={ACADEMIC_GRANTS_URL}>
            Academic Grants Round
          </Link>{' '} and{' '}
          <Link fontWeight={700} href={PECTRA_PGR_URL}>
            Pectra Proactive Grant Round
          </Link>{' '}
          . See the details and apply.
        </Box>
      </Banner>
    );
  }

  return null;
};
