import { Box, Flex, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import {
  ApplicantsSidebar,
  PageSection,
  PageMetadata,
  BannerApplicationClosed,
  PrivacyPolicyAgreement
} from '../UI';

import { GrantInitiativeSelection } from '../forms/GrantInitiativeSelection';
import { GrantsHero } from '../UI/GrantsHero';
import { GrantInitiative, RoundFrontmatter, SidebarLink } from '../../types';
import { StaticImageData } from 'next/image';
import { mdxComponents } from './mdxComponents';

interface RoundPageProps {
  frontmatter: RoundFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
  items: GrantInitiative[];
  heroImages: {
    desktop: StaticImageData;
    mobile: StaticImageData;
  };
  sidebarLinks: SidebarLink[];
}

export const RoundPage: FC<RoundPageProps> = ({
  frontmatter,
  mdxSource,
  items,
  heroImages,
  sidebarLinks
}) => {
  const { slug, name, description, status, tags, colorBrand } = frontmatter;

  // Generate URLs for round items using round-specific routes
  const getItemUrl = (item: GrantInitiative): string => {
    return `/rounds/${slug}/${item.Custom_URL_Slug__c || item.Id}`;
  };

  return (
    <>
      <PageMetadata title={name} description={description} />

      <Box>
        <GrantsHero
          colorBrandConstant={colorBrand}
          desktopImage={{
            alt: `${name} hero image`,
            src: heroImages.desktop,
            quality: 80
          }}
          mobileImage={{
            alt: `${name} hero image`,
            src: heroImages.mobile,
            quality: 80
          }}
          title={name}
        >
          {description}
        </GrantsHero>

        <Box mx={{ md: 12 }} mt={{ base: 0, md: -12 }} bg='white' position='relative' py={{ base: 8, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={sidebarLinks}
              sectionsInView={sidebarLinks.map(() => false)}
            />

            <Box w={{ lg: '70%' }} px={{ base: 5, md: 20 }} pr={{ lg: 12 }}>
              {status === 'closed' && (
                <BannerApplicationClosed mb={8} />
              )}

              <Stack spacing={10}>
                <section id='summary'>
                  <Box>
                    <MDXRemote {...mdxSource} components={mdxComponents} />
                  </Box>
                </section>

                <section id='apply'>
                  <PageSection mb={6}>Apply</PageSection>

                  <PrivacyPolicyAgreement />

                  <Box mt={8}>
                    <GrantInitiativeSelection
                      items={items}
                      getItemUrl={getItemUrl}
                      paramTags={[]}
                      hiddenTags={tags}
                    />
                  </Box>
                </section>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};
