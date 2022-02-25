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
      bgGradient='linear(to-br, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
      w='100%'
      justifyContent='center'
    >
      <Flex
        alignItems='center'
        justifyContent='space-between'
        direction={{ base: 'column', md: 'row' }}
        px={{ base: 6, lg: 12 }}
        py={10}
      >
        <Stack mb={6} mr={{ base: 0, md: 12 }}>
          <ImportantText
            as='h3'
            color='brand.heading'
            textAlign={{ base: 'center', md: 'left' }}
            mb={2}
          >
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
