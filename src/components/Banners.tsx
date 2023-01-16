import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Link } from '@chakra-ui/react';

import { Banner } from './UI';

import { ACADEMIC_GRANTS_2023_URL } from '../constants';

interface Props {}

export const Banners: FC<Props> = () => {
  const router = useRouter();

  if (!router.pathname.includes(ACADEMIC_GRANTS_2023_URL)) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications are open for the{' '}
          <Link fontWeight={700} href={ACADEMIC_GRANTS_2023_URL}>
            Academic Grants Round
          </Link>
          . See the details and apply.
        </Box>
      </Banner>
    );
  }

  return null;
};
