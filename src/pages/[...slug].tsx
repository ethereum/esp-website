import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next/types';
import type { ParsedUrlQuery } from 'querystring';
import { Accordion, ListItem } from '@chakra-ui/react';

import { FAQItem, List, PageSection, PageText, ReadyToApply } from '../components/UI';
import { MdLayout } from '../components/layout/MdLayout';
import { MdLink } from '../components/UI/md/MdLink';
import { MdSummary } from '../components/UI/md/MdSummary';

import remarkInferToc from '../utils/remark/remarkInferToc';
import rehypeHeadingIds from '../utils/remark/rehypeHeadingIds';
import { getContentPaths, getMdxSource } from '../utils/md';

import type { Frontmatter, TocNodeType } from '../types';

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
    paths: paths.map(path => {
      return {
        params: {
          slug: path.split('.mdx')
        }
      };
    }),
    fallback: false
  };
}) satisfies GetStaticPaths<Params>;

export const getStaticProps = (async ({ params }) => {
  const slug = params?.slug.join('') || '';
  const mdxText = getMdxSource(slug);

  let tocNodeItems: TocNodeType[] = [];
  const tocCallback = (toc: TocNodeType): void => {
    tocNodeItems = 'items' in toc ? toc.items : [];
  };

  const mdxSource = await serialize<Record<string, unknown>, Frontmatter>(mdxText, {
    mdxOptions: {
      remarkPlugins: [[remarkInferToc, { callback: tocCallback }]],
      rehypePlugins: [[rehypeHeadingIds]],
      format: 'mdx'
    },
    parseFrontmatter: true
  });

  return { props: { mdxSource, tocNodeItems } };
}) satisfies GetStaticProps<Props, Params>;

const components = {
  h3: PageSection,
  p: PageText,
  a: MdLink,
  ul: List,
  li: ListItem,
  ReadyToApply,
  Accordion,
  FAQItem,
  MdSummary
};

export default function Page({
  mdxSource,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MdLayout frontmatter={mdxSource.frontmatter} {...props}>
      <MDXRemote {...mdxSource} components={components} />
    </MdLayout>
  );
}
