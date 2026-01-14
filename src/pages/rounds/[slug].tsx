import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { StaticImageData } from 'next/image';

import rehypeSlug from 'rehype-slug';

import { RoundPage } from '../../components/rounds';
import { getAllRoundSlugs, getRoundBySlug } from '../../lib/rounds';
import { getGrantInitiativeItemsByTag } from '../../lib/sf';
import { extractHeadings, headingsToSidebarLinks } from '../../lib/extractHeadings';
import { GrantInitiative, RoundFrontmatter, SidebarLink } from '../../types';

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
  sidebarLinks: SidebarLink[];
}

const RoundPageRoute: NextPage<RoundPageProps> = ({
  frontmatter,
  mdxSource,
  items,
  sidebarLinks
}) => {
  const images = heroImages[frontmatter.slug] || defaultHeroImages;

  return (
    <RoundPage
      frontmatter={frontmatter}
      mdxSource={mdxSource}
      items={items}
      heroImages={images}
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

  // Fetch items from Salesforce filtered by tag
  const items = await getGrantInitiativeItemsByTag(frontmatter.itemType, frontmatter.tag);

  return {
    props: {
      frontmatter,
      mdxSource,
      items,
      sidebarLinks
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default RoundPageRoute;
