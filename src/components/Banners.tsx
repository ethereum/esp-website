import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Link } from '@chakra-ui/react';

import { Banner } from './UI';

import { DATA_COLLECTION_ROUND_URL } from '../constants';

interface Props {}

export const Banners: FC<Props> = () => {
  const router = useRouter();

  if (!router.pathname.includes(DATA_COLLECTION_ROUND_URL)) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications are open for the{' '}
          <Link fontWeight={700} href={DATA_COLLECTION_ROUND_URL}>
            Data Collection Grants
          </Link>{' '}
          round . See the details and apply.
        </Box>
      </Banner>
    );
  }

  return null;
};
