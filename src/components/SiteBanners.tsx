import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { BannerClickeable } from './UI';

import { ACADEMIC_GRANTS_URL } from '../constants';

interface Props {}

export const SiteBanners: FC<Props> = () => {
  const router = useRouter();

  if (!router.pathname.includes(ACADEMIC_GRANTS_URL)) {
    return (
      <BannerClickeable to={ACADEMIC_GRANTS_URL}>
        <Box fontSize='paragraph' textAlign='center'>
          We have an open call application for ****.{' '}
          <Text as='u' fontWeight={700}>
            See the details and Apply.
          </Text>
        </Box>
      </BannerClickeable>
    );
  }

  return null;
};
