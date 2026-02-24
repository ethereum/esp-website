import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { PageMetadata } from '../UI';
import { GrantsHero } from '../UI/GrantsHero';
import { RoundFrontmatter } from '../../types';
import { HeroImages } from '../../lib/rounds/heroImages';

interface RoundItemLayoutProps {
  frontmatter: RoundFrontmatter;
  heroImages: HeroImages;
  title: string;
  description: string;
  children: ReactNode;
}

export const RoundItemLayout: FC<RoundItemLayoutProps> = ({
  frontmatter,
  heroImages,
  title,
  description,
  children
}) => {
  const { name, colorBrand } = frontmatter;

  return (
    <>
      <PageMetadata title={title} description={description} />

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
          {frontmatter.description}
        </GrantsHero>

        <Box mx={{ md: 12 }} mt={{ base: 0, md: -12 }} bg='white' position='relative' py={{ base: 8, md: 12 }} px={{ base: 6, md: 24, lg: 32, xl: 72 }}>
          {children}
        </Box>
      </Box>
    </>
  );
};
