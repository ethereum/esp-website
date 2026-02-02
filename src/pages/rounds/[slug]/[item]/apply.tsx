import { Box, Stack } from '@chakra-ui/react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { RoundItemLayout } from '../../../../components/rounds';
import { PageSubheading, PageText, PrivacyPolicyAgreement } from '../../../../components/UI';
import { RFPForm } from '../../../../components/forms/RFPForm';
import { WishlistForm } from '../../../../components/forms/WishlistForm';
import { getGrantInitiativeItemsByTag } from '../../../../lib/sf';
import { getAllRoundSlugs, getRoundBySlug } from '../../../../lib/rounds';
import { getHeroImages, HeroImages } from '../../../../lib/rounds/heroImages';
import { GrantInitiative, RoundFrontmatter } from '../../../../types';

type ItemType = 'rfp' | 'wishlist';

const isRFPItem = (item: GrantInitiative): boolean =>
  item.RFP_Close_Date__c != null || item.RFP_Open_Date__c != null;

interface RoundItemApplyProps {
  item: GrantInitiative;
  itemType: ItemType;
  roundSlug: string;
  frontmatter: RoundFrontmatter;
  heroImages: HeroImages;
}

const RoundItemApply: NextPage<RoundItemApplyProps> = ({ item, itemType, frontmatter, heroImages }) => {
  const isRFP = itemType === 'rfp';

  return (
    <RoundItemLayout
      frontmatter={frontmatter}
      heroImages={heroImages}
      title={`Apply for ${item.Name}`}
      description={`Submit your application for: ${item.Name} - ${item.Description__c}`}
    >
      <Stack>
        <section id='description'>
          <PageSubheading mb={8} textAlign='center'>
            Apply for {item.Name}
          </PageSubheading>

          <PageText mb={6}>
            {isRFP
              ? 'Please review the RFP requirements carefully and submit a comprehensive proposal that demonstrates your expertise and approach. Include detailed methodology, timeline, and expected deliverables in your PDF proposal.'
              : 'Please review the item details carefully and explain how your background and approach align with the requirements. Be specific about your methodology, timeline, and expected deliverables.'}
          </PageText>

          <PrivacyPolicyAgreement />
        </section>

        <Box mt={8}>
          {isRFP ? <RFPForm rfpItem={item} /> : <WishlistForm wishlistItem={item} />}
        </Box>
      </Stack>
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

export const getStaticProps: GetStaticProps<RoundItemApplyProps> = async ({ params }) => {
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

export default RoundItemApply;
