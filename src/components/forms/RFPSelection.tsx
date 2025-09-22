import { Box, Button, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { PageText } from '../UI';
import { RFPItem } from './schemas/RFP';

interface RFPSelectionProps {
  rfpItems: RFPItem[];
  onSelectRFP: (rfpItem: RFPItem) => void;
}

export const RFPSelection: FC<RFPSelectionProps> = ({ rfpItems, onSelectRFP }) => {
  const [selectedItem, setSelectedItem] = useState<RFPItem | null>(null);

  const handleSelectItem = (item: RFPItem) => {
    setSelectedItem(item);
  };

  const handleContinue = () => {
    if (selectedItem) {
      onSelectRFP(selectedItem);
    }
  };

  if (rfpItems.length === 0) {
    return (
      <Stack spacing={8} align='center' py={16}>
        <Heading size='lg' color='brand.heading'>
          No RFP Items Available
        </Heading>
        <Text>There are currently no active Request for Proposals available for application.</Text>
      </Stack>
    );
  }

  return (
    <Stack spacing={8}>
      <Box textAlign='center'>
        <Heading size='lg' mb={4} color='brand.heading'>
          Select a Request for Proposal
        </Heading>
        <PageText mb={6}>
          Choose from the RFP items below that best matches your expertise and interests. Each RFP
          represents a specific research or development need identified by the Ethereum ecosystem.
        </PageText>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {rfpItems.map(item => (
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
            {selectedItem.Requirements__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Requirements:
                </Text>
                <Text color='brand.paragraph'>{selectedItem.Requirements__c}</Text>
              </Box>
            )}
          </Stack>
        </Box>
      )}

      <Box textAlign='center' mt={8}>
        <Button
          isDisabled={!selectedItem}
          onClick={handleContinue}
          bg='brand.orange.100'
          color='white'
          px={8}
          py={6}
          fontSize='input'
          fontWeight={700}
          borderRadius={0}
          _hover={{ bg: 'brand.orange.hover' }}
          _disabled={{
            bg: 'gray.300',
            cursor: 'not-allowed'
          }}
        >
          Continue with Application
        </Button>
      </Box>
    </Stack>
  );
};
