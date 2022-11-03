import { Box, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Banner } from './UI';

import { LAYER_2_GRANTS_URL } from '../constants';

interface Props {}

export const Banners: FC<Props> = () => {
  const router = useRouter();

  if (!router.pathname.includes(LAYER_2_GRANTS_URL)) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications are open for the{' '}
          <Link fontWeight={700} href={LAYER_2_GRANTS_URL}>
            Layer 2 grants
          </Link>
          . See the details and apply.
        </Box>
      </Banner>
    );
  }

  return null;
};
