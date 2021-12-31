import { Box, Flex, IconButton, Menu, MenuButton } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import logoSVG from '../../public/images/esp-logo.svg';
import { HamburgerIcon } from './icons';

export const NavMobile: FC = () => {
  return (
    <header>
      <Flex justifyContent='space-between' mb={12}>
        <Box>
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
