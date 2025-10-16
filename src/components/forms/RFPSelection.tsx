import {
  Box,
  Center,
  chakra,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Tag
} from '@chakra-ui/react';
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

  const parseTags = (tags?: string) =>
    tags
      ?.split(';')
      .map(tag => tag.trim())
      .filter(Boolean) ?? [];

  const formatDate = (value?: string) => {
    if (!value) return undefined;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
      <Grid templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap={6}>
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
            {selectedItem.Ecosystem_Need__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Ecosystem Need
                </Text>
                <Text color='brand.paragraph' whiteSpace='pre-line'>
                  {selectedItem.Ecosystem_Need__c}
                </Text>
              </Box>
            )}
            {selectedItem.RFP_HardRequirements_Long__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Hard Requirements
                </Text>
                <Text color='brand.paragraph' whiteSpace='pre-line'>
                  {selectedItem.RFP_HardRequirements_Long__c}
                </Text>
              </Box>
            )}
            {selectedItem.Soft_Requirements__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Soft Requirements
                </Text>
                <Text color='brand.paragraph' whiteSpace='pre-line'>
                  {selectedItem.Soft_Requirements__c}
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
            {(selectedItem.RFP_Open_Date__c ||
              selectedItem.RFP_Close_Date__c ||
              selectedItem.RFP_Project_Duration__c) && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Timeline
                </Text>
                <Stack spacing={1} color='brand.paragraph' fontSize='sm'>
                  {selectedItem.RFP_Open_Date__c && (
                    <Text>Opens: {formatDate(selectedItem.RFP_Open_Date__c)}</Text>
                  )}
                  {selectedItem.RFP_Close_Date__c && (
                    <Text>Closes: {formatDate(selectedItem.RFP_Close_Date__c)}</Text>
                  )}
                  {selectedItem.RFP_Project_Duration__c && (
                    <Text>Estimated Project Duration: {selectedItem.RFP_Project_Duration__c}</Text>
                  )}
                </Stack>
              </Box>
            )}
          </Stack>
        </Box>
      )}

      {selectedItem && (
        <Center mt={8}>
          <ButtonLink
            label='Apply'
            link={`/applicants/rfp/${selectedItem?.Id}/apply`}
            width='208px'
          />
        </Center>
      )}
    </Stack>
  );
};
