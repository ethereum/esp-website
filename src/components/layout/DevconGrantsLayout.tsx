import { Link, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { AcademicGrantsHero } from '../UI';

import { DEVCON_URL } from '../../constants';

export const DevconGrantsLayout: FC = ({ children }) => {
  return (
    <Stack>
      <AcademicGrantsHero title='Devcon Grants Round'>
        In an effort to promote education around the Ethereum in Colombia and Latin America in
        advance of{' '}
        <Link
          fontWeight={700}
          color='brand.orange.100'
          href={DEVCON_URL}
          isExternal
          _hover={{ textDecoration: 'none' }}
        >
          Devcon
        </Link>
        , we would like to offer support (both monetary and otherwise) to meetups and events
        happening in Latin America before Devcon. Read on for details.
      </AcademicGrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
