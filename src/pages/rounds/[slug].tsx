import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import rehypeSlug from 'rehype-slug';

import { RoundPage } from '../../components/rounds';
import { getAllRoundSlugs, getRoundBySlug, computeRoundStatus, RoundStatus } from '../../lib/rounds';
import { getHeroImages, HeroImages } from '../../lib/rounds/heroImages';
import { getGrantInitiativeItemsByTag } from '../../lib/sf';
import { extractHeadings, headingsToSidebarLinks } from '../../lib/extractHeadings';
import { GrantInitiative, RoundFrontmatter, SidebarLink } from '../../types';

interface RoundPageProps {
  frontmatter: RoundFrontmatter;
  status: RoundStatus;
  mdxSource: MDXRemoteSerializeResult;
  items: GrantInitiative[];
  sidebarLinks: SidebarLink[];
}

const RoundPageRoute: NextPage<RoundPageProps> = ({
  frontmatter,
  status,
  mdxSource,
  items,
  sidebarLinks
}) => {
  return (
    <RoundPage
      frontmatter={frontmatter}
      status={status}
      mdxSource={mdxSource}
      items={items}
      heroImages={getHeroImages(frontmatter.slug)}
      sidebarLinks={sidebarLinks}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllRoundSlugs();

  return {
    paths: slugs.map(slug => ({
      params: { slug }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<RoundPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const round = getRoundBySlug(slug);

  if (!round) {
    return {
      notFound: true
    };
  }

  const { content, ...frontmatter } = round;

  // Extract headings from markdown content
  const headings = extractHeadings(content);
  const sidebarLinks = headingsToSidebarLinks(headings, {
    includeDepths: [2, 3],
    addApplyLink: true
  });

  // Serialize MDX with rehype-slug to add IDs to headings
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug]
    }
  });

  // Fetch items from Salesforce filtered by tags
  const items = await getGrantInitiativeItemsByTag(frontmatter.tags);

  // Compute round status from dates using AoE timezone
  const status = computeRoundStatus(
    frontmatter.startDate,
    frontmatter.endDate,
    frontmatter.effectiveStartDate,
    frontmatter.effectiveEndDate
  );

  return {
    props: {
      frontmatter,
      status,
      mdxSource,
      items,
      sidebarLinks
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default RoundPageRoute;
