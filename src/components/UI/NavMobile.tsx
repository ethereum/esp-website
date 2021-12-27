import { createIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Menu, MenuButton } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import logoSrc from '../../public/esp-logo.svg';

const HamburgerIcon = createIcon({
  displayName: 'HamburgerIcon',
  viewBox: '0 0 32 25',
  path: <path fill='#F85858' d='M0 0h32v3H0zM0 11h32v3H0zM0 22h32v3H0z' />
});

export const NavMobile: FC = () => {
  return (
    <Flex justifyContent='space-between' mb={12}>
      <Box>
        <Image src={logoSrc} alt='Ecosystem Support Program logo' height={64} width={148} />
      </Box>

      <Box mt={2}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Menu'
            icon={<HamburgerIcon h='25px' w='32px' color='brand.accent' />}
            background='none'
          />
        </Menu>
      </Box>
    </Flex>
  );
};
