import {
  Box,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  IconButton,
  Link,
  ListIcon,
  ListItem,
  Menu,
  MenuButton,
  Stack,
  UnorderedList,
  useDisclosure
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { ImportantText } from './UI/headings';
import { CloseIcon, HamburgerIcon, NavLinkIcon } from './UI/icons';

import { selectedLink } from '../utils';

import GrantManagementLogo from '../../public/images/grant-management-logo.png';

import { ESP_BLOG_URL, ETHEREUM_ORG_URL, HOME_URL, NAV_LINKS } from '../constants';

export const Nav: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <header>
      <Flex justifyContent='space-between' mb={12}>
        <Box
          onClick={isOpen ? undefined : () => router.push(HOME_URL)}
          cursor={isOpen ? 'default' : 'pointer'}
          sx={isOpen ? { transitionDelay: '0.15s', filter: 'brightness(10)' } : undefined}
          zIndex={9999}
        >
          <Image src={GrantManagementLogo} alt='Ecosystem Support Program logo' height={80} width={200} />
        </Box>

        <Box display={{ base: 'block', md: 'none' }} zIndex={9999}>
          <Box mt={2}>
            <Menu id='menu-button'>
              {!isOpen && (
                <MenuButton
                  as={IconButton}
                  aria-label='Menu'
                  variant='transparent'
                  icon={<HamburgerIcon h='25px' w='32px' color='brand.accent' />}
                  onClick={onOpen}
                />
              )}

              {isOpen && (
                <MenuButton
                  as={IconButton}
                  aria-label='Close menu'
                  variant='transparent'
                  icon={<CloseIcon h='28px' w='28px' color='white' />}
                  onClick={onClose}
                />
              )}
            </Menu>
          </Box>

          <Drawer onClose={onClose} isOpen={isOpen} size='full'>
            <DrawerContent>
              <DrawerBody bgGradient='linear(to-br, brand.footer.bgGradient.start 10%, brand.footer.bgGradient.end 100%)'>
                <Stack h='100%' justifyContent='center' alignItems='center'>
                  <Stack spacing={6}>
                    {NAV_LINKS.map(({ href, text }) => (
                      <Link key={href} href={href} _hover={{ textDecoration: 'none' }}>
                        <ImportantText color='white' textAlign='center' fontSize='h2'>
                          {text}
                        </ImportantText>
                      </Link>
                    ))}

                    <Center>
                      <Divider borderColor='brand.divider.100' opacity={1} w={72} mt={1} mb={-2} />
                    </Center>

                    <Link href={ETHEREUM_ORG_URL} isExternal _hover={{ textDecoration: 'none' }}>
                      <ImportantText color='white' textAlign='center'>
                        Ethereum.org
                      </ImportantText>
                    </Link>
                  </Stack>
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>

        <Flex display={{ base: 'none', md: 'block' }} zIndex={2}>
          <UnorderedList>
            {NAV_LINKS.map((nav, idx) => (
              <ListItem key={nav.text} display='inline'>
                {idx > 0 && <ListIcon as={NavLinkIcon} display='inline-block' pb={1} />}
                <Link
                  as={NextLink}
                  href={nav.href}
                  isExternal={nav.href === ESP_BLOG_URL}
                  _hover={{ textDecoration: 'none' }}
                >
                  <ImportantText
                    color='brand.ready.text'
                    display='inline'
                    mr={nav.href === ESP_BLOG_URL ? 0 : 2}
                    _hover={{
                      borderBottom: '10px solid',
                      borderBottomColor: 'brand.accent',
                      transition: 'border-width 0.16s ease-in-out'
                    }}
                    sx={
                      selectedLink(router.pathname, nav.href)
                        ? {
                            borderBottom: '10px solid',
                            borderBottomColor: 'brand.accent'
                          }
                        : undefined
                    }
                  >
                    {nav.text}
                  </ImportantText>
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Flex>
      </Flex>
    </header>
  );
};
