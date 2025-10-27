import {
  Box,
  Center,
  Heading,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Tag,
} from '@chakra-ui/react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import {
PageMetadata,
} from '../../../../components/UI';
import { RFPItem } from '../../../../components/forms/schemas/RFP';
import { ButtonLink } from '../../../../components/ButtonLink';
import { getGrantInitiativeItems } from '../../../../lib/sf';
import parseStringForUrls from '../../../../utils/parseStringForUrls';

interface RFPItemApplyProps {
    rfpItem: RFPItem;
}

const RFPItemPage: NextPage<RFPItemApplyProps> = ({ rfpItem }) => {
const parseResources = (resources?: string) => {
    if (!resources) return null;
    return parseStringForUrls(resources)
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

return (
  <>
    <PageMetadata
      title={`Apply for ${rfpItem.Name}`}
      description={`Submit your application for: ${rfpItem.Name} - ${rfpItem.Description__c}`}
    />

    <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
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
            Selected: {rfpItem.Name}
          </Heading>
          <Text color='brand.paragraph'>{rfpItem.Description__c}</Text>
          {rfpItem.Expected_Deliverables__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Expected Deliverables
              </Text>
              <Text color='brand.paragraph'>{rfpItem.Expected_Deliverables__c}</Text>
            </Box>
          )}
          {rfpItem.Tags__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Tags
              </Text>
              <Wrap spacing={2}>
                {parseTags(rfpItem.Tags__c).map(tag => (
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
          {rfpItem.Ecosystem_Need__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Ecosystem Need
              </Text>
              <Text color='brand.paragraph' whiteSpace='pre-line'>
                {rfpItem.Ecosystem_Need__c}
              </Text>
            </Box>
          )}
          {rfpItem.RFP_HardRequirements_Long__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Hard Requirements
              </Text>
              <Text color='brand.paragraph' whiteSpace='pre-line'>
                {rfpItem.RFP_HardRequirements_Long__c}
              </Text>
            </Box>
          )}
          {rfpItem.RFP_SoftRequirements__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Soft Requirements
              </Text>
              <Text color='brand.paragraph' whiteSpace='pre-line'>
                {rfpItem.RFP_SoftRequirements__c}
              </Text>
            </Box>
          )}
          {rfpItem.Resources__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Resources
              </Text>
              <Box color='brand.paragraph' whiteSpace='pre-line'>
                {parseResources(rfpItem.Resources__c)}
              </Box>
            </Box>
          )}
          {(rfpItem.RFP_Open_Date__c ||
            rfpItem.RFP_Close_Date__c ||
            rfpItem.RFP_Project_Duration__c) && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Timeline
              </Text>
              <Stack spacing={1} color='brand.paragraph' fontSize='sm'>
                {rfpItem.RFP_Open_Date__c && (
                  <Text>Opens: {formatDate(rfpItem.RFP_Open_Date__c)}</Text>
                )}
                {rfpItem.RFP_Close_Date__c && (
                  <Text>Closes: {formatDate(rfpItem.RFP_Close_Date__c)}</Text>
                )}
                {rfpItem.RFP_Project_Duration__c && (
                  <Text>Estimated Project Duration: {rfpItem.RFP_Project_Duration__c}</Text>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>

      <Center mt={8}>
        <ButtonLink
          label='Apply'
          link={`/applicants/rfp/${rfpItem?.Custom_URL_Slug__c || rfpItem?.Id}/apply`}
          width='208px'
        />
      </Center>
    </Box>
  </>
);
};

export const getStaticPaths: GetStaticPaths = async () => {
const rfpItems = await getGrantInitiativeItems('RFP');

const paths = rfpItems.map(item => ({
  params: { item: item.Custom_URL_Slug__c || item.Id }
}));

return {
  paths,
  fallback: "blocking"
};
};

export const getStaticProps: GetStaticProps<RFPItemApplyProps> = async ({ params }) => {
  const itemId = params?.item as string;

  const rfpItems = await getGrantInitiativeItems('RFP');
  const rfpItem = rfpItems.find(item => item.Custom_URL_Slug__c === itemId || item.Id === itemId);

  if (!rfpItem) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      rfpItem
    },
    revalidate: 3600 // Revalidate every hour (3600 seconds)
  };
};

export default RFPItemPage;
