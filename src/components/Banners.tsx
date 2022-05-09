import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { BannerClickeable } from './UI';

import { ACADEMIC_GRANTS_URL } from '../constants';

interface Props {}

export const Banners: FC<Props> = () => {
  const router = useRouter();

  // Academic Grants Round is currently closed

  // if (!router.pathname.includes(ACADEMIC_GRANTS_URL)) {
  //   return (
  //     <BannerClickeable to={ACADEMIC_GRANTS_URL}>
  //       <Box fontSize='paragraph' textAlign='center'>
  //         We have an open call application for Academic Grants Round.{' '}
  //         <Text as='u' fontWeight={700}>
  //           See the details and Apply.
  //         </Text>
  //       </Box>
  //     </BannerClickeable>
  //   );
  // }

  return null;
};
