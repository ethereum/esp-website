import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Link } from '@chakra-ui/react';

import { Banner } from './UI';

import { ACADEMIC_GRANTS_URL, ACCOUNT_ABSTRACTION_GRANTS_URL } from '../constants';

interface Props {}

export const Banners: FC<Props> = () => {
  const router = useRouter();

  if (
    !router.pathname.includes(ACADEMIC_GRANTS_URL) &&
    !router.pathname.includes(ACCOUNT_ABSTRACTION_GRANTS_URL)
  ) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications are open for the{' '}
          <Link fontWeight={700} href={ACADEMIC_GRANTS_URL}>
            Academic
          </Link>{' '}
          and{' '}
          <Link fontWeight={700} href={ACCOUNT_ABSTRACTION_GRANTS_URL}>
            Account Abstraction
          </Link>{' '}
          grants rounds . See the details and apply.
        </Box>
      </Banner>
    );
  }

  return null;
};
