import { Box, Flex, Link } from '@chakra-ui/react';
import { FC, useState } from 'react';
import NextLink from 'next/link';

import { PageText } from './UI';

import { SidebarLink } from '../types';

interface Props {
  sidebarLinks: SidebarLink[];
}

export const ApplicantsSidebar: FC<Props> = ({ sidebarLinks }) => {
  const [clicked, setClicked] = useState('');

  const handleClicked = (link: string) => setClicked(link);
  // set the first link from the sidebar as acive by default
  const isActiveLink = (idx: number, href: string) => (!clicked && idx === 0) || clicked === href;

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
      h='75vh'
    >
      {sidebarLinks.map(({ text, href }, idx) => (
        <Flex key={text} alignItems='center' mb={1}>
          <Box
            borderLeft='5px solid'
            borderLeftColor={isActiveLink(idx, href) ? 'brand.accent' : 'transparent'}
            h='18px'
          />

          <Box pl={3} onClick={() => handleClicked(href)}>
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
