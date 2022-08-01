import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { BannerClickeable } from './UI';

import { MERGE_DATA_CHALLENGE_URL } from '../constants';

interface Props {}

export const Banners: FC<Props> = () => {
  const router = useRouter();

  if (!router.pathname.includes(MERGE_DATA_CHALLENGE_URL)) {
    return (
      <BannerClickeable to={MERGE_DATA_CHALLENGE_URL}>
        <Box fontSize='paragraph' textAlign='center'>
          We have an open call application for the Merge data challenge.{' '}
          <Text as='u' fontWeight={700}>
            See the details and Apply.
          </Text>
        </Box>
      </BannerClickeable>
    );
  }

  return null;
};
