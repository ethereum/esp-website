import { Box, Center, chakra, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { RFPItem } from './schemas/RFP';
import { ButtonLink } from '../ButtonLink';

const Button = chakra('button');

interface RFPSelectionProps {
  rfpItems: RFPItem[];
}

export const RFPSelection: FC<RFPSelectionProps> = ({ rfpItems }) => {
  const [selectedItem, setSelectedItem] = useState<RFPItem | null>(null);

  const handleSelectItem = (item: RFPItem) => {
    setSelectedItem(item);
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
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {rfpItems.map(item => (
          <GridItem key={item.Id}>
            <Button
              p={6}
              border='2px solid'
              borderColor={selectedItem?.Id === item.Id ? 'brand.orange.100' : 'brand.border'}
              borderRadius='lg'
              textAlign='left'
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
            {selectedItem.Requirements__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Requirements
                </Text>
                <Text color='brand.paragraph'>{selectedItem.Requirements__c}</Text>
              </Box>
            )}
          </Stack>
        </Box>
      )}

      {selectedItem && (
        <Center mt={8}>
          <ButtonLink
            label='Continue'
            link={`/applicants/rfp/${selectedItem?.Id}/apply`}
            width='208px'
          />
        </Center>
      )}
    </Stack>
  );
};
