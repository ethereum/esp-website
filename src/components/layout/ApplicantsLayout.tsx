import { Box, Flex, Stack, Tab, TabList, Tabs } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { ApplicantsDescription, ImportantText, ReadyToApply } from '../UI';

import {
  APPLICANTS_URL,
  OFFICE_HOURS_URL,
  PROJECT_GRANTS_URL,
  SMALL_GRANTS_URL
} from '../../constants';

interface Props {
  idx: number;
}

import { useRouter } from 'next/router';

export const ApplicantsLayout: FC = ({ children }) => {
  // use context api value here
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();

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
            <Tab
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
              <ImportantText color='brand.ready.text' display='inline'>
                Overview
              </ImportantText>
            </Tab>
            <Tab
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
              <ImportantText color='brand.ready.text' display='inline'>
                Office Hours
              </ImportantText>
            </Tab>
            <Tab
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
              <ImportantText color='brand.ready.text' display='inline'>
                Small Grants
              </ImportantText>
            </Tab>
            <Tab
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
              <ImportantText color='brand.ready.text' display='inline'>
                Project Grants
              </ImportantText>
            </Tab>
          </TabList>
        </Tabs>
      </Flex>

      {children}

      <Stack>
        <section id='ready-to-apply'>
          <ReadyToApply link={'#'} />
        </section>
      </Stack>
    </>
  );
};
