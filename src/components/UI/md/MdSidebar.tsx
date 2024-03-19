import { Box, Flex, Link } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import NextLink from 'next/link';

import { PageText } from '..';

import { SidebarLink } from '../../../types';
import { useActiveHash } from '../../../hooks/useActiveHash';

interface Props {
  sidebarLinks: SidebarLink[];
}

export const MdSidebar: FC<Props> = ({ sidebarLinks }) => {
  const hrefs = useMemo(() => sidebarLinks.map(({ href }) => href), [sidebarLinks]);
  const activeHash = useActiveHash(hrefs, '0px');

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
            borderLeftColor={activeHash === href ? 'brand.accent' : 'transparent'}
            h='18px'
          />

          <Box pl={3}>
            <Link as={NextLink} href={href} _hover={{ textDecoration: 'none' }}>
              <PageText fontWeight={400} lineHeight='28px' color='brand.orange.100'>
                {text}
              </PageText>
            </Link>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
