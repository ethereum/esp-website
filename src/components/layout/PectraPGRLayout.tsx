import { Stack } from '@chakra-ui/react'
import { FC, ReactNode } from 'react';

import { GrantsHero } from '../UI';

import pectraPGRHero from '../../../public/images/pectra-pgr-hero.jpeg';

type Props = {
  children: ReactNode;
};

export const PectraPGRLayout: FC<Props> = ({ children }) => {
  return (
    <Stack>
      <GrantsHero
        colorBrandConstant='pectraPGRHero'
        desktopImage={{ alt: 'Academics doing research about Ethereum', src: pectraPGRHero }}
        mobileImage={{
          alt: 'Academics doing research about Ethereum',
          src: pectraPGRHero
        }}
        title='Pectra Proactive Grant Round'
      >
        The Ethereum Foundation is sponsoring a wave of grants to support Ethereum ecosystem in preparation for the upcoming Pectra network upgrade. This grants round has 200k in total available funds. Proposals are due February 23rd. All of the details you’ll need to apply can be found below.
      </GrantsHero> 

      <Stack>{children}</Stack>
    </Stack>
  );
};
