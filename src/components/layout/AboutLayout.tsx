import { Flex, Stack, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { AboutDescription, ImportantText } from '../UI';
import { ReadyToApply } from '../ReadyToApply';

import {
  ABOUT_URL,
  ABOUT_TABS,
  ABOUT_TABS_MAP,
  APPLICANTS_PAGES,
  HOW_WE_SUPPORT_URL,
  WHO_WE_SUPPORT_URL
} from '../../constants';

export const AboutLayout: FC = ({ children }) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(ABOUT_TABS_MAP[router.pathname]);

  const handleChange = (index: number) => {
    setTabIndex(index);

    switch (index) {
      case 0:
        router.push(
          {
            pathname: ABOUT_URL
          },
          undefined,
          { scroll: false }
        );
        break;

      case 1:
        router.push(
          {
            pathname: WHO_WE_SUPPORT_URL
          },
          undefined,
          { scroll: false }
        );
        break;

      case 2:
        router.push(
          {
            pathname: HOW_WE_SUPPORT_URL
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
          <AboutDescription />
        </section>
      </Stack>

      <Flex
        mb={10}
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
        >
          <TabList whiteSpace='nowrap' h='64px'>
            {ABOUT_TABS.map(tabElement => (
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
      </Stack>
    </>
  );
};
