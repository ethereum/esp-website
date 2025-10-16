import { FC } from 'react';
import { Box, Stack, Tag, Text, Wrap, WrapItem } from '@chakra-ui/react';

import { RFPItem } from '../schemas/RFP';

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

const renderDetailSection = (
  label: string,
  value?: string | null,
  wrapTags: boolean = false
): JSX.Element | null => {
  if (!value) return null;

  if (wrapTags) {
    const tags = value
      .split(/[,;]+/)
      .map(tag => tag.trim())
      .filter(Boolean);

    if (!tags.length) return null;

    return (
      <Box>
        <Text fontWeight='600' color='brand.heading' mb={1}>
          {label}
        </Text>
        <Wrap>
          {tags.map(tag => (
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
    );
  }

  return (
    <Box>
      <Text fontWeight='600' color='brand.heading' mb={1}>
        {label}
      </Text>
      <Text color='brand.paragraph'>{value}</Text>
    </Box>
  );
};

interface RFPItemDetailsProps {
  item: RFPItem;
}

export const RFPItemDetails: FC<RFPItemDetailsProps> = ({ item }) => {
  const timelineDetails = [
    item.RFP_Open_Date__c ? `Open Date: ${formatDate(item.RFP_Open_Date__c)}` : null,
    item.RFP_Close_Date__c ? `Close Date: ${formatDate(item.RFP_Close_Date__c)}` : null,
    item.RFP_Project_Duration__c
      ? `Estimated Duration: ${item.RFP_Project_Duration__c}`
      : null
  ].filter(Boolean);

  return (
    <Stack spacing={4}>
      {renderDetailSection('Tags', item.Tags__c, true)}
      {renderDetailSection('Ecosystem Need', item.Ecosystem_Need__c)}
      {renderDetailSection('Expected Deliverables', item.Expected_Deliverables__c)}
      {renderDetailSection('Requirements', item.Requirements__c)}
      {renderDetailSection('Hard Requirements', item.Hard_Requirements__c)}
      {renderDetailSection('Soft Requirements', item.Soft_Requirements__c)}
      {renderDetailSection('Resources', item.Resources__c)}

      {timelineDetails.length > 0 && (
        <Box>
          <Text fontWeight='600' color='brand.heading' mb={1}>
            Timeline
          </Text>
          <Stack spacing={1} color='brand.paragraph'>
            {timelineDetails.map(detail => (
              <Text key={detail}>{detail}</Text>
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

