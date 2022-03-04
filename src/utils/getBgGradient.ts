import {
  ABOUT_URL,
  ACADEMIC_GRANTS_URL,
  APPLICANTS_URL,
  DEVCON_GRANTS_URL,
  HOME_URL
} from '../constants';

export const getBgGradient = (path: string) => {
  // homepage gradient
  if (path === HOME_URL) {
    return 'brand.homepageHero';
  }

  // applicants gradient
  if (path.startsWith(APPLICANTS_URL)) {
    return 'linear(to-b, brand.applicants.bgGradient.start 0%, brand.applicants.bgGradient.end 81.77%, brand.applicants.rgba 100%)';
  }

  // about page gradient
  if (path.startsWith(ABOUT_URL)) {
    return 'linear(to-b, brand.about.bgGradient.start 0%, brand.about.bgGradient.end 77.6%, brand.about.rgba 100%)';
  }

  // academic & devcon grants gradient
  if (path.startsWith(ACADEMIC_GRANTS_URL) || path.startsWith(DEVCON_GRANTS_URL)) {
    return 'linear(to-b, brand.academicGrantsHero 81.77%, brand.academicGrantsRgba 100%)';
  }

  // 404 page gradient
  return 'linear(to-b, brand.applicants.bgGradient.start, brand.about.rgba)';
};
