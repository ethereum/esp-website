import { ACADEMIC_GRANTS_URL, HOME_URL } from '../constants';

export const getBg = (path: string) => {
  return path === HOME_URL
    ? 'brand.homepageHero'
    : path === ACADEMIC_GRANTS_URL
    ? 'brand.academicGrantsHero'
    : undefined;
};
