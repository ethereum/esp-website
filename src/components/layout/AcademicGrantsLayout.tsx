import { Stack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { GrantsHero } from '../UI';

import academicGrantsHero from '../../../public/images/academic-grants-25-hero.jpeg';

type Props = {
  children: ReactNode;
};

export const AcademicGrantsLayout: FC<Props> = ({ children }) => {
  return (
    <Stack>
      <GrantsHero
        colorBrandConstant='academicGrants2025Hero'
        desktopImage={{ alt: 'Academics doing research about Ethereum', src: academicGrantsHero }}
        mobileImage={{
          alt: 'Academics doing research about Ethereum',
          src: academicGrantsHero
        }}
        title='Academic Grants Round'
      >
        The Ethereum Foundation is sponsoring a wave of grants to support Ethereum-related academic
        work. This grants round has <strong>$2M</strong> in total available funds. Proposals are due{' '}
        <strong>23:59 AoE March 16th, 2025</strong>. All of the details you’ll need to apply can be
        found below.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
