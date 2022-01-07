import { Flex, Stack, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { ApplicantsDescription, ImportantText, ReadyToApply } from '../UI';

import {
  APPLICANTS_PAGES_BASEPATH,
  APPLICANTS_TABS,
  APPLICANTS_URL,
  OFFICE_HOURS_URL,
  PROJECT_GRANTS_URL,
  SMALL_GRANTS_URL,
  TABS_MAP
} from '../../constants';

export const ApplicantsLayout: FC = ({ children }) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(TABS_MAP[router.pathname]);

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

  return (
    <>
      <Stack mb={5} px={5} py={3}>
        <section id='hero'>
          <ApplicantsDescription />
        </section>
      </Stack>

      <Flex
        mb={10}
        backgroundColor='white'
        overflowX='auto'
        borderBottom='1px solid'
        borderBottomColor='brand.divider'
      >
        <Tabs
          id='tabbed-navigation'
          align='center'
          index={tabIndex}
          onChange={index => handleChange(index)}
          variant='unstyled'
          isLazy
        >
          <TabList whiteSpace='nowrap' h='64px'>
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
              >
                <ImportantText color='brand.ready.text'>{tabElement}</ImportantText>
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Flex>

      <Stack px={5}>
        <Stack mb={8}>{children}</Stack>

        {router.pathname.startsWith(APPLICANTS_PAGES_BASEPATH) &&
          !router.pathname.endsWith('/apply') && (
            <Stack>
              <section id='ready-to-apply'>
                <ReadyToApply link={`${router.pathname}/apply`} />
              </section>
            </Stack>
          )}
      </Stack>
    </>
  );
};
