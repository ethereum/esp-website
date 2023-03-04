import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Link } from '@chakra-ui/react';

import { Banner } from './UI';

import { ACCOUNT_ABSTRACTION_GRANTS_URL } from '../constants';

interface Props {}

export const Banners: FC<Props> = () => {
  const router = useRouter();

  if (!router.pathname.includes(ACCOUNT_ABSTRACTION_GRANTS_URL)) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications are open for the{' '}
          <Link fontWeight={700} href={ACCOUNT_ABSTRACTION_GRANTS_URL}>
            Account Abstraction Grants
          </Link>{' '}
          round . See the details and apply.
        </Box>
      </Banner>
    );
  }

  return null;
};
