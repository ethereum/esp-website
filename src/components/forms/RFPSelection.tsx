import {
  Box,
  Center,
  chakra,
  Grid,
  GridItem,
  Heading,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem
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

  const renderDetailSection = (label: string, value?: string | null) => {
    if (!value) return null;

    return (
      <Box>
        <Text fontWeight='600' color='brand.heading' mb={1}>
          {label}
        </Text>
        <Text color='brand.paragraph'>{value}</Text>
      </Box>
    );
  };

  const formatDate = (value: string): string => {
    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(parsedDate);
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
          <Stack spacing={4}>
            <Heading size='md' color='brand.heading'>
              Selected: {selectedItem.Name}
            </Heading>
            <Text color='brand.paragraph'>{selectedItem.Description__c}</Text>
            {selectedItem.Tags__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Tags
                </Text>
                <Wrap>
                  {selectedItem.Tags__c.split(/[,;]+/)
                    .map(tag => tag.trim())
                    .filter(Boolean)
                    .map(tag => (
                      <WrapItem key={tag}>
                        <Tag
                          size='md'
                          color='brand.heading'
                          bg='brand.orange.10'
                          borderRadius='full'
                          px={3}
                          py={1}
                        >
                          {tag}
                        </Tag>
                      </WrapItem>
                    ))}
                </Wrap>
              </Box>
            )}
            {renderDetailSection('Ecosystem Need', selectedItem.Ecosystem_Need__c)}
            {selectedItem.Expected_Deliverables__c && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Expected Deliverables
                </Text>
                <Text color='brand.paragraph'>{selectedItem.Expected_Deliverables__c}</Text>
              </Box>
            )}
            {renderDetailSection('Requirements', selectedItem.Requirements__c)}
            {renderDetailSection('Hard Requirements', selectedItem.Hard_Requirements__c)}
            {renderDetailSection('Soft Requirements', selectedItem.Soft_Requirements__c)}
            {renderDetailSection('Resources', selectedItem.Resources__c)}
            {(selectedItem.RFP_Open_Date__c ||
              selectedItem.RFP_Close_Date__c ||
              selectedItem.RFP_Project_Duration__c) && (
              <Box>
                <Text fontWeight='600' color='brand.heading' mb={1}>
                  Timeline
                </Text>
                <Stack spacing={1} color='brand.paragraph'>
                  {selectedItem.RFP_Open_Date__c && (
                    <Text>Open Date: {formatDate(selectedItem.RFP_Open_Date__c)}</Text>
                  )}
                  {selectedItem.RFP_Close_Date__c && (
                    <Text>Close Date: {formatDate(selectedItem.RFP_Close_Date__c)}</Text>
                  )}
                  {selectedItem.RFP_Project_Duration__c && (
                    <Text>Estimated Duration: {selectedItem.RFP_Project_Duration__c}</Text>
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
