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

import { RFPSelection } from '../forms/RFPSelection';
import { WishlistSelection } from '../forms/WishlistSelection';
import { GrantsHero } from '../UI/GrantsHero';
import { GrantInitiative, RoundFrontmatter, SidebarLink } from '../../types';
import { RFPItem } from '../forms/schemas/RFP';
import { WishlistItem } from '../forms/schemas/Wishlist';
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
}

export const RoundPage: FC<RoundPageProps> = ({
  frontmatter,
  mdxSource,
  items,
  heroImages
}) => {
  const { name, description, status, itemType, tag, colorBrand, sidebarLinks } = frontmatter;

  const defaultSidebarLinks: SidebarLink[] = [
    { text: 'Summary', href: '#summary' },
    { text: 'Apply', href: '#apply' }
  ];

  const links = sidebarLinks || defaultSidebarLinks;

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

        <Box bg='white' position='relative' py={{ md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={links}
              sectionsInView={links.map(() => false)}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
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
                    {itemType === 'RFP' ? (
                      <RFPSelection
                        rfpItems={items as RFPItem[]}
                        paramTags={[tag]}
                      />
                    ) : (
                      <WishlistSelection
                        wishlistItems={items as WishlistItem[]}
                        paramTags={[tag]}
                      />
                    )}
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
