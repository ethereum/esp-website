import {
  Box,
  Center,
  chakra,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Tag,
} from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import { LayoutGrid, Rows3 } from 'lucide-react';

import { WishlistItem } from './schemas/Wishlist';
import { ButtonLink } from '../ButtonLink';
import { SelectArrowIcon } from '../UI/icons';

const Button = chakra('button');

interface WishlistSelectionProps {
  wishlistItems: WishlistItem[];
}

export const WishlistSelection: FC<WishlistSelectionProps> = ({ wishlistItems }) => {
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [displayFormat, setDisplayFormat] = useState<'grid' | 'table'>('grid');

  const tagOptions = useMemo(() => {
    return wishlistItems.reduce((acc, item) => {
      item.Tags__c?.split(';').forEach(tag => {
        acc.push(tag);
      });
      return acc;
    }, [] as string[]);
  }, [wishlistItems]);

  const handleSelectItem = (item: WishlistItem) => {
    setSelectedItem(item);
  };

  const parseTags = (tags?: string) =>
    tags
      ?.split(';')
      .map(tag => tag.trim())
      .filter(Boolean) ?? [];

  if (wishlistItems.length === 0) {
    return (
      <Stack spacing={8} align='center' py={16}>
        <Heading size='lg' color='brand.heading'>
          No Wishlist Available
        </Heading>
        <Text>There are currently no active wishlists available for application.</Text>
      </Stack>
    );
  }

  return (
    <Stack spacing={8}>
      <Flex justifyContent='space-between' width="full">
        <Menu>
          <MenuButton as={Button}>
            <Flex gap={2} alignItems='center'>
              {selectedTag ? selectedTag : 'Filter'}
              <SelectArrowIcon />
            </Flex>
          </MenuButton>
          <MenuList>
            {tagOptions.map(tag => (
              <MenuItem key={tag} onClick={() => setSelectedTag(tag)}>
                {tag}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Flex gap={2}>
            <Icon as={LayoutGrid} color={displayFormat === 'grid' ? 'brand.heading' : 'brand.divider.200'} boxSize={5} cursor="pointer" onClick={() => setDisplayFormat('grid')} _hover={{ color: 'brand.hover' }} />
            <Icon as={Rows3} color={displayFormat === 'table' ? 'brand.heading' : 'brand.divider.200'} boxSize={5} cursor="pointer" onClick={() => setDisplayFormat('table')} _hover={{ color: 'brand.hover' }} />
        </Flex>
      </Flex>
      {displayFormat === 'grid' && (
      <Grid templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap={6}>
        {wishlistItems.filter(item => selectedTag ? item.Tags__c?.includes(selectedTag) : true).map(item => (
          <GridItem key={item.Id}>
            <Button
              p={6}
              border='2px solid'
              borderColor={selectedItem?.Id === item.Id ? 'brand.orange.100' : 'brand.border'}
              borderRadius='lg'
              textAlign='left'
              transition='all 0.2s'
              _hover={{
                borderColor: 'brand.orange.100',
                transform: 'translateY(-2px)',
                shadow: 'md'
              }}
              onClick={() => handleSelectItem(item)}
              w='full'
              h='full'
            >
              <Stack spacing={3} h='full'>
                <Heading size='md' color='brand.heading' noOfLines={2}>
                  {item.Name}
                </Heading>

                {item.Category__c && (
                  <Text fontSize='sm' color='brand.helpText' fontWeight='600'>
                    {item.Category__c}
                  </Text>
                )}

                <Text fontSize='sm' color='brand.paragraph' flex='1' noOfLines={4}>
                  {item.Description__c}
                </Text>
              </Stack>
            </Button>
          </GridItem>
        ))}
      </Grid>
      )}
      {displayFormat === 'table' && (
        <List>
          {wishlistItems.filter(item => selectedTag ? item.Tags__c?.includes(selectedTag) : true).map(item => (
            <ListItem
              as={Flex}
              flexDir="column"
              gap={3}
              key={item.Id} 
              py={4}
              px={2}
              w="full"
              borderBottom='1px solid'
              borderColor='brand.border'
              bg={selectedItem?.Id === item.Id ? 'orange.50' : 'white'}
              _last={{ borderBottom: 'none' }}
              onClick={() => handleSelectItem(item)} 
              _hover={{ bg: 'orange.50' }} 
              transition='all 0.2s'
              cursor='pointer'
              justifyContent='space-between'
            >
              <Flex flex={1}>
                <Text fontWeight='600' color='brand.heading'>{item.Name}</Text>
              </Flex>
                <Flex flex='1' gap={2} justifyContent='flex-start' flexWrap='wrap'>{item.Tags__c?.split(';').map(tag => tag.trim()).map(tag => <Tag key={tag}>{tag}</Tag>)}</Flex>
            </ListItem>
          ))}
        </List>
      )}

      {selectedItem && (
        <Box
          mt={8}
          p={6}
          bg='brand.newsletter.bgGradient.start'
          borderRadius='lg'
          borderLeft='4px solid'
          borderLeftColor='brand.orange.100'
        >
          <Stack spacing={3}>
            <Heading size='md' color='brand.heading'>
              Selected: {selectedItem.Name}
            </Heading>
            <Text color='brand.paragraph'>{selectedItem.Description__c}</Text>
            {selectedItem.Expected_Deliverables__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Expected Deliverables
                </Text>
                <Text color='brand.paragraph'>{selectedItem.Expected_Deliverables__c}</Text>
              </Box>
            )}
            {selectedItem.Tags__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Tags
                </Text>
                <Wrap spacing={2}>
                  {parseTags(selectedItem.Tags__c).map(tag => (
                    <WrapItem key={tag}>
                      <Tag
                        size='md'
                        variant='subtle'
                        colorScheme='orange'
                        px={3}
                        py={1}
                        borderRadius='full'
                      >
                        {tag}
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            )}
            {selectedItem.Out_of_Scope__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Out of Scope
                </Text>
                <Text color='brand.paragraph' whiteSpace='pre-line'>
                  {selectedItem.Out_of_Scope__c}
                </Text>
              </Box>
            )}
            {selectedItem.Resources__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Resources
                </Text>
                <Text color='brand.paragraph' whiteSpace='pre-line'>
                  {selectedItem.Resources__c}
                </Text>
              </Box>
            )}
          </Stack>
        </Box>
      )}

      {selectedItem && (
        <Center mt={8}>
          <ButtonLink
            label='Apply'
            link={`/applicants/wishlist/${selectedItem?.Id}/apply`}
            width='208px'
          />
        </Center>
      )}
    </Stack>
  );
};
