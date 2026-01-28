import { StaticImageData } from 'next/image';

import academicGrantsHero from '../../../public/images/academic-grants-hero.png';
import academicGrantsHeroMobile from '../../../public/images/academic-grants-hero-mobile.png';
import academicGrants25Hero from '../../../public/images/academic-grants-25-hero.jpeg';
import phdFellowship26Hero from '../../../public/images/phd-fellowship-26-hero.jpeg';

export interface HeroImages {
  desktop: StaticImageData;
  mobile: StaticImageData;
}

// Hero image mapping - add new rounds here as they're created
export const heroImages: Record<string, HeroImages> = {
  agr26: {
    desktop: academicGrants25Hero,
    mobile: academicGrantsHeroMobile
  },
  phdfp26: {
    desktop: phdFellowship26Hero,
    mobile: academicGrantsHeroMobile
  }
};

// Default images for rounds without specific hero images
export const defaultHeroImages: HeroImages = {
  desktop: academicGrantsHero,
  mobile: academicGrantsHeroMobile
};

export const getHeroImages = (slug: string): HeroImages => {
  return heroImages[slug] || defaultHeroImages;
};
