import { Flex, Link } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { PageText } from '../text';

import attentionSVG from '../../../public/images/attention.svg';

import { OFFICE_HOURS_URL } from '../../../constants';

export const ApplicationAttentionMsg: FC = () => {
  return (
    <Flex
      mt={10}
      bg='brand.warning'
      borderRadius='10px'
      h={{ xs: '185px', sm: '135px', md: '100px' }}
      px={6}
      position='relative'
      alignItems='center'
    >
      <Flex position='absolute' left={6}>
        <Image src={attentionSVG} alt='attention icon vector' height='35px' width='40px' />
      </Flex>

      <PageText fontSize='input' ml={16}>
        If you&apos;re feeling uncertain about anything in the application, please consider signing
        up for{' '}
        <Link
          fontWeight={700}
          color='brand.orange.100'
          href={OFFICE_HOURS_URL}
          _hover={{ textDecoration: 'none' }}
        >
          Office Hours
        </Link>{' '}
        before submitting.
      </PageText>
    </Flex>
  );
};
