import { Flex, Stack, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { Description, ImportantText } from '../UI';

import {
  ABOUT_URL,
  ABOUT_TABS,
  ABOUT_TABS_MAP,
  HOW_WE_SUPPORT_URL,
  WHO_WE_SUPPORT_URL
} from '../../constants';

import aboutHero from '../../../public/images/about-hero.png';

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
      <Stack mb={5} px={{ base: 5, md: 12 }} py={3}>
        <section id='hero'>
          <Description
            title='About ESP'
            img={{ src: aboutHero, alt: 'People reading about the ESP', width: 498, height: 296 }}
          >
            We provide grants and other support for open source projects that strengthen
            Ethereum&apos;s foundations, with a particular focus on builder tools, infrastructure,
            research and public goods.
          </Description>
        </section>
      </Stack>

      <Flex
        mt={-12}
        mb={{ base: 10, md: 0 }}
        mx={{ md: 12 }}
        px={{ md: 10 }}
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
          <TabList whiteSpace='nowrap' h='64px' role='tablist'>
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

      <Stack px={{ base: 5, md: 12 }}>
        <Stack mb={8}>{children}</Stack>
      </Stack>
    </>
  );
};
