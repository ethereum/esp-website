import {
  Box,
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
import { FC, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LayoutGrid, Rows3 } from 'lucide-react';

import { WishlistItem } from './schemas/Wishlist';
import { ButtonLink } from '../ButtonLink';
import { SelectArrowIcon } from '../UI/icons';
import parseStringForUrls from '../../utils/parseStringForUrls';

const Button = chakra('button');

interface WishlistSelectionProps {
  wishlistItems: WishlistItem[];
  paramTags?: string[];
}

export const WishlistSelection: FC<WishlistSelectionProps> = ({ wishlistItems, paramTags }) => {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>(paramTags ? paramTags : []);
  const [displayFormat, setDisplayFormat] = useState<'grid' | 'table'>('grid');

  const tagOptions = useMemo(() => {
    return Array.from(new Set(wishlistItems.reduce((acc, item) => {
      item.Tags__c?.split(';').forEach(tag => {
        acc.push(tag.trim());
      });
      return acc;
    }, [] as string[]).filter(Boolean)));
  }, [wishlistItems]);

  // Sync selectedTags with paramTags when paramTags changes
  useEffect(() => {
    if (paramTags) {
      // Validate paramTags against available tagOptions
      const validTags = paramTags.filter(tag => tagOptions.includes(tag));
      setSelectedTags(validTags);
    }
  }, [paramTags, tagOptions]);

  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  const handleSelectItem = (item: WishlistItem) => {
    router.push(`/applicants/wishlist/${item.Id}`);
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

  const parseResources = (resources?: string) => {
    if (!resources) return null;
    return parseStringForUrls(resources)
  };

  return (
    <Stack spacing={8}>
      <Flex justifyContent='space-between' width="full">
        <Menu>
          <MenuButton as={Button}>
            <Flex gap={2} alignItems='center'>
              {selectedTags.length > 0 ? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected` : 'Filter by tags'}
              <SelectArrowIcon />
            </Flex>
          </MenuButton>
          <MenuList>
            {selectedTags.length > 0 && (
              <MenuItem onClick={handleClearAllTags} color="red.500">
                Clear all tags
              </MenuItem>
            )}
            {tagOptions.map(tag => (
              <MenuItem 
                key={tag} 
                onClick={() => handleToggleTag(tag)}
                bg={selectedTags.includes(tag) ? 'orange.50' : 'white'}
                color={selectedTags.includes(tag) ? 'orange.600' : 'inherit'}
              >
                {selectedTags.includes(tag) && '✓ '}{tag}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Flex gap={2}>
            <Icon as={LayoutGrid} color={displayFormat === 'grid' ? 'brand.heading' : 'brand.divider.200'} boxSize={5} cursor="pointer" onClick={() => setDisplayFormat('grid')} _hover={{ color: 'brand.hover' }} />
            <Icon as={Rows3} color={displayFormat === 'table' ? 'brand.heading' : 'brand.divider.200'} boxSize={5} cursor="pointer" onClick={() => setDisplayFormat('table')} _hover={{ color: 'brand.hover' }} />
        </Flex>
      </Flex>
      
      {selectedTags.length > 0 && (
        <Box>
          <Text fontSize="sm" color="brand.helpText" mb={2}>
            Selected tags:
          </Text>
          <Wrap spacing={2}>
            {selectedTags.map(tag => (
              <WrapItem key={tag}>
                <Tag
                  size="md"
                  variant="subtle"
                  colorScheme="orange"
                  px={3}
                  py={1}
                  borderRadius="full"
                  cursor="pointer"
                  onClick={() => handleToggleTag(tag)}
                  _hover={{ opacity: 0.8 }}
                >
                  {tag} ×
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
      
      {displayFormat === 'grid' && (
      <Grid templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap={6}>
        {wishlistItems.filter(item => 
          selectedTags.length === 0 
            ? true 
            : selectedTags.some(tag => item.Tags__c?.includes(tag))
        ).map(item => (
          <GridItem key={item.Id}>
            <Button
              p={6}
              border='2px solid'
              borderColor={'brand.border'}
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
          {wishlistItems.filter(item => 
            selectedTags.length === 0 
              ? true 
              : selectedTags.some(tag => item.Tags__c?.includes(tag))
          ).map(item => (
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
              bg='white'
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
    </Stack>
  );
};
