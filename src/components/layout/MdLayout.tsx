import { ReactNode } from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';

import { PageMetadata } from '../UI';
import { MdSidebar } from '../UI/md/MdSidebar';

import type { Frontmatter, ToCNodeEntry, TocNodeType } from '../../types';

type LayoutProps = {
  children: ReactNode;
  frontmatter: Frontmatter;
  tocNodeItems: TocNodeType[];
};

export const MdLayout = ({ children, frontmatter, tocNodeItems }: LayoutProps) => {
  const { metaTitle, metaDescription, metaImage } = frontmatter;

  return (
    <Stack>
      <PageMetadata title={metaTitle} description={metaDescription} image={metaImage} />

      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <MdSidebar
              sidebarLinks={tocNodeItems
                .filter((item): item is ToCNodeEntry => !('items' in item))
                .map(item => ({ text: item.title || '', href: item.url || '' }))}
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
