import { Stack } from '@chakra-ui/react'
import { FC, ReactNode } from 'react';

import { GrantsHero } from '../UI';

import academicGrantsHero from '../../../public/images/academic-grants-25-hero.jpeg';

type Props = {
  children: ReactNode;
};

export const PectraPGRLayout: FC<Props> = ({ children }) => {
  return (
    <Stack>
      {/* TODO: Fix copy here with date */}
      <GrantsHero
        colorBrandConstant='pectraPGRHero'
        desktopImage={{ alt: 'Academics doing research about Ethereum', src: academicGrantsHero }}
        mobileImage={{
          alt: 'Academics doing research about Ethereum',
          src: academicGrantsHero
        }}
        title='Pectra Proactive Grant Round'
      >
        The Ethereum Foundation is sponsoring a wave of grants to support Ethereum ecosystem in preparation for the upcoming Pectra network upgrade. This grants round has ??? in total available funds. Proposals are due ???. All of the details you’ll need to apply can be found below.
      </GrantsHero> 

      <Stack>{children}</Stack>
    </Stack>
  );
};
