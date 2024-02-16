import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next/types';
import type { ParsedUrlQuery } from 'querystring';
import { Accordion, Link, ListItem } from '@chakra-ui/react';

import { FAQItem, List, PageSection, PageText, ReadyToApply } from '../components/UI';
import { MdLayout } from '../components/layout/MdLayout';

import remarkInferToc from '../utils/remark/remarkInferToc';
import rehypeHeadingIds from '../utils/remark/rehypeHeadingIds';

import type { Frontmatter, TocNodeType } from '../types';

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
  return (
    <MdLayout frontmatter={mdxSource.frontmatter as Frontmatter} {...props}>
      <MDXRemote {...mdxSource} components={components} />
    </MdLayout>
  );
}
