import { FC } from 'react';
import { Box, Link } from '@chakra-ui/react';

import { useCurrentPath } from '../hooks/useCurrentPath';
import { Banner } from './UI';

import { ACADEMIC_GRANTS_URL } from '../constants';

export const Banners: FC = () => {
  const path = useCurrentPath();

  if (!path.includes(ACADEMIC_GRANTS_URL)) {
    return (
      <Banner>
        <Box fontSize='paragraph' textAlign='center'>
          Applications are open for the{' '}
          <Link fontWeight={700} href={ACADEMIC_GRANTS_URL}>
            Academic Grants Round
          </Link>{' '}
          . See the details and apply.
        </Box>
      </Banner>
    );
  }

  return null;
};
