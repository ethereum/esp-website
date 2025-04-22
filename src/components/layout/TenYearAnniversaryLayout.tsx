import { FC, ReactNode } from 'react';
import { Link, Stack } from '@chakra-ui/react';

import { GrantsHero } from '../UI';

import tenYearAnniversaryHero from '../../../public/images/10-year-anniversary.jpg';

type Props = {
  children: ReactNode;
};

export const TenYearAnniversaryLayout: FC<Props> = ({ children }) => {
  return (
    <Stack>
      <GrantsHero
        colorBrandConstant='academicGrantsHero'
        desktopImage={{ alt: '10 Years of Ethereum Anniversary', src: tenYearAnniversaryHero }}
        mobileImage={{
          alt: '10 Years of Ethereum Anniversary',
          src: tenYearAnniversaryHero
        }}
        title='10 Years of Ethereum Anniversary'
      >
        {/* TODO: Add the correct text */}
        Ethereum is turning 10 years old! We are celebrating this milestone with a series of events and activities.
      </GrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};