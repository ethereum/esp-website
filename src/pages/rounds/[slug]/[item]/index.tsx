import { Box, Center, Heading, Stack, Text, Wrap, WrapItem, Tag } from '@chakra-ui/react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { RoundItemLayout } from '../../../../components/rounds';
import { ButtonLink } from '../../../../components/ButtonLink';
import { getGrantInitiativeItemsByTag } from '../../../../lib/sf';
import { getAllRoundSlugs, getRoundBySlug } from '../../../../lib/rounds';
import { getHeroImages, HeroImages } from '../../../../lib/rounds/heroImages';
import { GrantInitiative, RoundFrontmatter } from '../../../../types';
import parseStringForUrls from '../../../../utils/parseStringForUrls';

type ItemType = 'rfp' | 'wishlist';

const isRFPItem = (item: GrantInitiative): boolean =>
  item.RFP_Close_Date__c != null || item.RFP_Open_Date__c != null;

interface RoundItemPageProps {
  item: GrantInitiative;
  itemType: ItemType;
  roundSlug: string;
  frontmatter: RoundFrontmatter;
  heroImages: HeroImages;
}

const RoundItemPage: NextPage<RoundItemPageProps> = ({ item, itemType, roundSlug, frontmatter, heroImages }) => {
  const parseResources = (resources?: string) => {
    if (!resources) return null;
    return parseStringForUrls(resources);
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

  const isRFP = itemType === 'rfp';

  return (
    <RoundItemLayout
      frontmatter={frontmatter}
      heroImages={heroImages}
      title={`Apply for ${item.Name}`}
      description={`Submit your application for: ${item.Name} - ${item.Description__c}`}
    >
      <Box
        p={6}
        bg='brand.newsletter.bgGradient.start'
        borderRadius='lg'
        borderLeft='4px solid'
        borderLeftColor='brand.orange.100'
      >
        <Stack spacing={3}>
          <Heading size='md' color='brand.heading'>
            {item.Name}
          </Heading>
          <Text color='brand.paragraph' whiteSpace='pre-line'>
            {item.Description__c}
          </Text>
          {item.Expected_Deliverables__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Expected Deliverables
              </Text>
              <Text color='brand.paragraph'>{item.Expected_Deliverables__c}</Text>
            </Box>
          )}
          {item.Tags__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Tags
              </Text>
              <Wrap spacing={2}>
                {parseTags(item.Tags__c).map(tag => (
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
          {item.Ecosystem_Need__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Ecosystem Need
              </Text>
              <Text color='brand.paragraph' whiteSpace='pre-line'>
                {item.Ecosystem_Need__c}
              </Text>
            </Box>
          )}
          {/* RFP-specific fields */}
          {isRFP && item.RFP_HardRequirements_Long__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Hard Requirements
              </Text>
              <Text color='brand.paragraph' whiteSpace='pre-line'>
                {item.RFP_HardRequirements_Long__c}
              </Text>
            </Box>
          )}
          {isRFP && item.RFP_SoftRequirements__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Soft Requirements
              </Text>
              <Text color='brand.paragraph' whiteSpace='pre-line'>
                {item.RFP_SoftRequirements__c}
              </Text>
            </Box>
          )}
          {/* Wishlist-specific fields */}
          {!isRFP && item.Out_of_Scope__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Out of Scope
              </Text>
              <Text color='brand.paragraph' whiteSpace='pre-line'>
                {item.Out_of_Scope__c}
              </Text>
            </Box>
          )}
          {item.Resources__c && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Resources
              </Text>
              <Box color='brand.paragraph' whiteSpace='pre-line'>
                {parseResources(item.Resources__c)}
              </Box>
            </Box>
          )}
          {isRFP && (item.RFP_Open_Date__c || item.RFP_Close_Date__c || item.RFP_Project_Duration__c) && (
            <Box>
              <Text fontWeight='600' color='brand.heading' mb={1}>
                Timeline
              </Text>
              <Stack spacing={1} color='brand.paragraph' fontSize='sm'>
                {item.RFP_Open_Date__c && (
                  <Text>Opens: {formatDate(item.RFP_Open_Date__c)}</Text>
                )}
                {item.RFP_Close_Date__c && (
                  <Text>Closes: {formatDate(item.RFP_Close_Date__c)}</Text>
                )}
                {item.RFP_Project_Duration__c && (
                  <Text>Estimated Project Duration: {item.RFP_Project_Duration__c}</Text>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>

      <Center mt={8}>
        <ButtonLink
          label='Apply'
          link={`/rounds/${roundSlug}/${item?.Custom_URL_Slug__c || item?.Id}/apply`}
          width='208px'
        />
      </Center>
    </RoundItemLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllRoundSlugs();
  const paths: { params: { slug: string; item: string } }[] = [];

  for (const slug of slugs) {
    const round = getRoundBySlug(slug);
    if (!round) continue;

    const items = await getGrantInitiativeItemsByTag(round.tags);

    for (const item of items) {
      paths.push({
        params: {
          slug,
          item: item.Custom_URL_Slug__c || item.Id
        }
      });
    }
  }

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<RoundItemPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const itemId = params?.item as string;

  const round = getRoundBySlug(slug);
  if (!round) {
    return { notFound: true };
  }

  const { content: _, ...frontmatter } = round;
  const items = await getGrantInitiativeItemsByTag(round.tags);
  const item = items.find(i => i.Custom_URL_Slug__c === itemId || i.Id === itemId);

  if (!item) {
    return { notFound: true };
  }

  const itemType: ItemType = isRFPItem(item) ? 'rfp' : 'wishlist';

  return {
    props: {
      item,
      itemType,
      roundSlug: slug,
      frontmatter,
      heroImages: getHeroImages(slug)
    },
    revalidate: 3600
  };
};

export default RoundItemPage;
