import { Flex, Stack, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { Description, ImportantText } from '../UI';

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
            title='For Applicants'
            img={{ src: applicantsHero, alt: 'Kid watching plants grow', width: 450, height: 248 }}
          >
            Whether you&apos;re working on a specific project, or you&apos;re still exploring
            possibilities, you can connect with our team for guidance.
          </Description>
        </section>
      </Stack>

      <Flex
        mb={{ base: 10, md: 0 }}
        mx={{ md: 12 }}
        px={{ md: 4 }}
        backgroundColor='white'
        overflowX='auto'
        borderBottom='1px solid'
        borderBottomColor='brand.divider.100'
      >
        <Tabs
          id='tabbed-navigation'
          align='center'
          index={tabIndex}
          onChange={index => handleChange(index)}
          variant='unstyled'
          isLazy
          display={!isGranteeFinance ? 'block' : 'none'}
        >
          <TabList whiteSpace='nowrap' h='64px' pl={6} role='tablist'>
            {APPLICANTS_TABS.map(tabElement => (
              <Tab
                key={tabElement}
                px={0}
                mx={6}
                pb={0}
                borderBottom='10px solid'
                borderBottomColor='transparent'
                _selected={{
                  borderBottom: '10px solid',
                  borderBottomColor: 'brand.accent'
                }}
                role='tab'
                aria-controls=''
              >
                <ImportantText as='h2' color='brand.ready.text'>
                  {tabElement}
                </ImportantText>
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Flex>

      <Stack px={{ base: !isGranteeFinance ? 5 : 0, md: 12 }}>
        <Stack mb={8}>{children}</Stack>
      </Stack>
    </>
  );
};
