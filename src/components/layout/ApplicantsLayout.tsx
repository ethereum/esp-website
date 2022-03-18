import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { Description, NavigationTabs } from '../UI';

import applicantsHero from '../../../public/images/applicants-hero.png';

import {
  APPLICANTS_TABS,
  APPLICANTS_TABS_MAP,
  APPLICANTS_URL,
  GRANTEE_FINANCE_URL,
  OFFICE_HOURS_URL,
  PROJECT_GRANTS_URL,
  SMALL_GRANTS_URL
} from '../../constants';

export const ApplicantsLayout: FC = ({ children }) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(APPLICANTS_TABS_MAP[router.pathname]);

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
            pathname: SMALL_GRANTS_URL
          },
          undefined,
          { scroll: false }
        );
        break;

      case 3:
        router.push(
          {
            pathname: PROJECT_GRANTS_URL
          },
          undefined,
          { scroll: false }
        );
        break;

      default:
        break;
    }
  };

  const isGranteeFinance = router.pathname === GRANTEE_FINANCE_URL;

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
