import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next/types';
import type { ParsedUrlQuery } from 'querystring';
import { Accordion, Box, Flex, Link, ListItem, Stack, Text } from '@chakra-ui/react';
import {
  ApplicantsSidebar,
  FAQItem,
  GrantsHero,
  List,
  PageMetadata,
  PageSection,
  PageText,
  ReadyToApply
} from '../components/UI';
import type { TocNodeType } from '../types';
import remarkInferToc from '../utils/remark/remarkInferToc';
import rehypeHeadingIds from '../utils/remark/rehypeHeadingIds';

function getContentPaths() {
  const paths = fs.readdirSync('src/content');

  return paths.map(path => {
    return {
      params: {
        slug: path.split('.mdx')
      }
    };
  });
}

interface Params extends ParsedUrlQuery {
  slug: string[];
}

type Frontmatter = {
  title: string;
  description: string;
  image: string;
};

type Props = {
  mdxSource: MDXRemoteSerializeResult;
  tocNodeItems: TocNodeType[];
};

export const getStaticPaths = (() => {
  const paths = getContentPaths();

  return {
    paths,
    fallback: false
  };
}) satisfies GetStaticPaths<Params>;

export const getStaticProps = (async ({ params }) => {
  const mdxText = fs.readFileSync(`src/content/${params?.slug}.mdx`, 'utf8');
  let tocNodeItems: TocNodeType[] = [];
  const tocCallback = (toc: TocNodeType): void => {
    tocNodeItems = 'items' in toc ? toc.items : [];
  };
  const mdxSource = await serialize(mdxText, {
    mdxOptions: {
      remarkPlugins: [[remarkInferToc, { callback: tocCallback }]],
      rehypePlugins: [[rehypeHeadingIds]]
    },
    parseFrontmatter: true
  });

  console.log(tocNodeItems);
  return { props: { mdxSource, tocNodeItems } };
}) satisfies GetStaticProps<Props, Params>;

const components = {
  h3: PageSection,
  p: PageText,
  a: (props: any) => <Link fontWeight={700} color='brand.orange.100' isExternal {...props} />,
  ul: List,
  li: ListItem,
  ReadyToApply,
  Accordion,
  FAQItem
};

export default function Page({
  mdxSource,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, description } = mdxSource.frontmatter as Frontmatter;

  return (
    <Layout title={title} description={description} {...props}>
      <MDXRemote {...mdxSource} components={components} />
    </Layout>
  );
}

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  tocNodeItems: TocNodeType[];
};

const Layout = ({ children, title, description, tocNodeItems }: LayoutProps) => {
  return (
    <Stack>
      <PageMetadata
        title='Data Collection Grants 2023'
        description='To promote public goods and infrastructure for Data collection and analysis in the Ethereum Ecosystem'
        // image={DATA_COLLECTION_GRANTS_PREVIEW_URL}
      />

      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={tocNodeItems.map(item => ({ text: item.title, href: item.url }))}
              sectionsInView={[]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <Flex gap={6} direction='column'>
                {children}
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </Stack>
  );
};
