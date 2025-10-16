import { FC } from 'react';
import { Box, Stack, Tag, Text, Wrap, WrapItem } from '@chakra-ui/react';

import { WishlistItem } from '../schemas/Wishlist';

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

interface WishlistItemDetailsProps {
  item: WishlistItem;
}

export const WishlistItemDetails: FC<WishlistItemDetailsProps> = ({ item }) => {
  return (
    <Stack spacing={4}>
      {renderDetailSection('Tags', item.Tags__c, true)}
      {renderDetailSection('Expected Deliverables', item.Expected_Deliverables__c)}
      {renderDetailSection('Resources', item.Resources__c)}
      {renderDetailSection('Out of Scope', item.Out_of_Scope__c)}
    </Stack>
  );
};

