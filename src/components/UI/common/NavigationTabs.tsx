import { Flex, Tab, TabList, Tabs } from '@chakra-ui/react';
import { FC } from 'react';

import { ImportantText } from '../headings';

interface Props {
  tabIndex: number;
  handleChange: (index: number) => void;
  tabsList: string[];
}

export const NavigationTabs: FC<Props> = ({ tabIndex, handleChange, tabsList }) => {
  return (
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
          {tabsList.map(tabElement => (
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
  );
};
