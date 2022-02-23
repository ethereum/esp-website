import { Box, Flex, Link } from '@chakra-ui/react';
import { FC } from 'react';
import NextLink from 'next/link';

import { PageText } from '..';

import { SidebarLink } from '../../../types';

interface Props {
  sidebarLinks: SidebarLink[];
  sectionsInView: boolean[];
}

export const ApplicantsSidebar: FC<Props> = ({ sidebarLinks, sectionsInView }) => {
  // mark a sidebar link as active if previous one is not visible
  // (by the iIntersection Observer) only, to avoid having more than 1 active link
  const isActiveLink = (idx: number) => sectionsInView[idx] && !sectionsInView[idx - 1];

  return (
    <Flex
      display={{ base: 'none', lg: 'block' }}
      bgGradient='linear(to-b, brand.sidebar.bgGradient.start 30%, brand.sidebar.bgGradient.end 100%)'
      w='306px'
      pt={12}
      pl={14}
      mt={-12}
      top={0}
      position='sticky'
      alignSelf='flex-start'
      h='45vh'
    >
      {sidebarLinks.map(({ text, href }, idx) => (
        <Flex key={text} alignItems='center' mb={1}>
          <Box
            borderLeft='5px solid'
            borderLeftColor={isActiveLink(idx) ? 'brand.accent' : 'transparent'}
            h='18px'
          />

          <Box pl={3}>
            <NextLink href={href}>
              <Link href={href} _hover={{ textDecoration: 'none' }}>
                <PageText fontWeight={400} lineHeight='28px' color='brand.orange.100'>
                  {text}
                </PageText>
              </Link>
            </NextLink>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
