import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { StaticImageData } from 'next/image';

import { RoundPage } from '../../components/rounds';
import { getAllRoundSlugs, getRoundBySlug } from '../../lib/rounds';
import { getGrantInitiativeItemsByTag } from '../../lib/sf';
import { GrantInitiative, RoundFrontmatter } from '../../types';

// Placeholder hero images - use existing images as fallback
import academicGrantsHero from '../../../public/images/academic-grants-hero.png';
import academicGrantsHeroMobile from '../../../public/images/academic-grants-hero-mobile.png';
import academicGrants25Hero from '../../../public/images/academic-grants-25-hero.jpeg';

// Hero image mapping - add new rounds here as they're created
const heroImages: Record<string, { desktop: StaticImageData; mobile: StaticImageData }> = {
  agr26: {
    desktop: academicGrants25Hero,
    mobile: academicGrantsHeroMobile
  }
};

// Default images for rounds without specific hero images
const defaultHeroImages = {
  desktop: academicGrantsHero,
  mobile: academicGrantsHeroMobile
};

interface RoundPageProps {
  frontmatter: RoundFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
  items: GrantInitiative[];
}

const RoundPageRoute: NextPage<RoundPageProps> = ({ frontmatter, mdxSource, items }) => {
  const images = heroImages[frontmatter.slug] || defaultHeroImages;

  return (
    <RoundPage
      frontmatter={frontmatter}
      mdxSource={mdxSource}
      items={items}
      heroImages={images}
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

  // Serialize MDX content
  const mdxSource = await serialize(content);

  // Fetch items from Salesforce filtered by tag
  const items = await getGrantInitiativeItemsByTag(frontmatter.itemType, frontmatter.tag);

  return {
    props: {
      frontmatter,
      mdxSource,
      items
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default RoundPageRoute;
