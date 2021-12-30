import { Box, Flex, IconButton, Menu, MenuButton } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import logoSrc from '../../public/images/esp-logo.svg';
import { HamburgerIcon } from './icons';

export const NavMobile: FC = () => {
  return (
    <Flex justifyContent='space-between' mb={12}>
      <Box>
        <Image src={logoSrc} alt='Ecosystem Support Program logo' height={64} width={148} />
      </Box>

      <Box mt={2}>
        {/* https://github.com/chakra-ui/chakra-ui/issues/3020#issuecomment-916560715 */}
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
  );
};
