import { Box, Center, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { WishlistItem } from './schemas/Wishlist';
import { ButtonLink } from '../ButtonLink';

interface WishlistSelectionProps {
  wishlistItems: WishlistItem[];
}

export const WishlistSelection: FC<WishlistSelectionProps> = ({ wishlistItems }) => {
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);

  const handleSelectItem = (item: WishlistItem) => {
    setSelectedItem(item);
  };

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
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {wishlistItems.map(item => (
          <GridItem key={item.Id}>
            <Box
              p={6}
              border='2px solid'
              borderColor={selectedItem?.Id === item.Id ? 'brand.orange.100' : 'brand.border'}
              borderRadius='lg'
              cursor='pointer'
              transition='all 0.2s'
              bg={selectedItem?.Id === item.Id ? 'brand.orange.10' : 'white'}
              _hover={{
                borderColor: 'brand.orange.100',
                transform: 'translateY(-2px)',
                shadow: 'md'
              }}
              onClick={() => handleSelectItem(item)}
              h='full'
            >
              <Stack spacing={3} h='full'>
                <Heading size='md' color='brand.heading' noOfLines={2}>
                  {item.Name}
                </Heading>

                {item.Category__c && (
                  <Text fontSize='sm' color='brand.orange.100' fontWeight='600'>
                    {item.Category__c}
                  </Text>
                )}

                <Text fontSize='sm' color='brand.paragraph' flex='1' noOfLines={4}>
                  {item.Description__c}
                </Text>

                {item.Skills_Required__c && (
                  <Box>
                    <Text fontSize='xs' color='brand.helpText' fontWeight='600' mb={1}>
                      Skills Required:
                    </Text>
                    <Text fontSize='xs' color='brand.helpText' noOfLines={2}>
                      {item.Skills_Required__c}
                    </Text>
                  </Box>
                )}

                {item.Estimated_Effort__c && (
                  <Text fontSize='xs' color='brand.helpText'>
                    <Text as='span' fontWeight='600'>
                      Estimated Effort:
                    </Text>{' '}
                    {item.Estimated_Effort__c}
                  </Text>
                )}
              </Stack>
            </Box>
          </GridItem>
        ))}
      </Grid>

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
                  Expected Deliverables:
                </Text>
                <Text color='brand.paragraph'>{selectedItem.Expected_Deliverables__c}</Text>
              </Box>
            )}
          </Stack>
        </Box>
      )}

      {selectedItem && (
        <Center mt={8}>
          <ButtonLink
            label='Continue'
            link={`/applicants/wishlist/${selectedItem?.Id}/apply`}
            width='208px'
          />
        </Center>
      )}
    </Stack>
  );
};
