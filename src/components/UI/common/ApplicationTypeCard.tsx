import { Flex, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { ImportantText } from '../headings';
import { PageText } from '../text';

import { ButtonLink } from '../..';

interface Props {
  title: string;
  link: string;
}

export const ApplicationTypeCard: FC<Props> = ({ title, link, children }) => {
  return (
    <Stack
      borderRadius='10px'
      bgGradient='linear(to-b, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
      h={{ xs: '100%', md: '182px' }}
      w='100%'
      justifyContent='center'
    >
      <Flex
        alignItems='center'
        direction={{ base: 'column', md: 'row' }}
        px={6}
        py={{ xs: 10, md: 0 }}
      >
        <Stack mb={6} mr={{ base: 0, md: 12 }}>
          <ImportantText color='brand.heading' textAlign={{ base: 'center', md: 'left' }} mb={2}>
            {title}
          </ImportantText>

          <PageText>{children}</PageText>
        </Stack>

        <Stack>
          <ButtonLink label='Learn more &amp; apply' link={link} width='247px' />
        </Stack>
      </Flex>
    </Stack>
  );
};
