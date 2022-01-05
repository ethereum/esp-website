import { Box, Flex, IconButton, Menu, MenuButton } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { HamburgerIcon } from '../icons';

import logoSVG from '../../../public/images/esp-logo.svg';

export const NavMobile: FC = () => {
  const router = useRouter();

  return (
    <header>
      <Flex justifyContent='space-between' mb={12}>
        <Box onClick={() => router.push('/')} cursor='pointer'>
          <Image src={logoSVG} alt='Ecosystem Support Program logo' height={64} width={148} />
        </Box>

        <Box mt={2}>
          <Menu id='menu-button'>
            <MenuButton
              as={IconButton}
              aria-label='Menu'
              background='none'
              icon={<HamburgerIcon h='25px' w='32px' color='brand.accent' />}
            />
          </Menu>
        </Box>
      </Flex>
    </header>
  );
};
