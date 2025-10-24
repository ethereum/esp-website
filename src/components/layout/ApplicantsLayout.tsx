import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode, useState, useEffect } from 'react';

import { Description, NavigationTabs } from '../UI';

import applicantsHero from '../../../public/images/applicants-hero.png';

import {
  APPLICANTS_TABS,
  APPLICANTS_TABS_MAP,
  APPLICANTS_URL,
  GRANTEE_FINANCE_URL,
  OFFICE_HOURS_URL,
  WISHLIST_URL,
  RFP_URL
} from '../../constants';

type Props = {
  children: ReactNode;
};

// Helper function to get tab index for both static and dynamic routes
const getTabIndexFromPath = (pathname: string): number => {
  if (APPLICANTS_TABS_MAP[pathname] !== undefined) {
    return APPLICANTS_TABS_MAP[pathname];
  }

  if (pathname.startsWith('/applicants/office-hours')) {
    return 1;
  }

  if (pathname.startsWith('/applicants/wishlist')) {
    return 2;
  }

  if (pathname.startsWith('/applicants/rfp')) {
    return 3;
  }

  if (pathname.startsWith('/applicants')) {
    return 0;
  }

  return 0;
};

export const ApplicantsLayout = ({ children }: Props) => {
  const router = useRouter();
  const pathname = router.pathname;

  const [tabIndex, setTabIndex] = useState(getTabIndexFromPath(pathname));

  useEffect(() => {
    setTabIndex(getTabIndexFromPath(pathname));
  }, [pathname]);

  const handleChange = (index: number) => {
    setTabIndex(index);

    switch (index) {
      case 0:
        router.push(
          {
            pathname: APPLICANTS_URL
          },
          undefined,
          { scroll: false }
        );
        break;

      case 1:
        router.push(
          {
            pathname: OFFICE_HOURS_URL
          },
          undefined,
          { scroll: false }
        );
        break;

      case 2:
        router.push(
          {
            pathname: WISHLIST_URL
          },
          undefined,
          { scroll: false }
        );
        break;

      case 3:
        router.push(
          {
            pathname: RFP_URL
          },
          undefined,
          { scroll: false }
        );
        break;

      default:
        break;
    }
  };

  const isGranteeFinance = pathname === GRANTEE_FINANCE_URL;

  return (
    <>
      <Stack mb={5} px={{ base: 5, md: 12 }} py={3} display={!isGranteeFinance ? 'block' : 'none'}>
        <section id='hero'>
          <Description
            title='How to Apply'
            img={{ src: applicantsHero, alt: 'Kid watching plants grow', width: 450, height: 248 }}
          >
            Whether you&apos;re working on a specific project, or you&apos;re still exploring
            possibilities, you can connect with our team for guidance.
          </Description>
        </section>
      </Stack>

      <NavigationTabs tabIndex={tabIndex} handleChange={handleChange} tabsList={APPLICANTS_TABS} />

      <Stack px={{ base: !isGranteeFinance ? 5 : 0, md: 12 }}>
        <Stack mb={8}>{children}</Stack>
      </Stack>
    </>
  );
};
