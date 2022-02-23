import { ABOUT_URL, APPLICANTS_URL, HOME_URL } from '../constants';

export const selectedLink = (pathname: string, href: string) =>
  (pathname === HOME_URL && href === HOME_URL) ||
  (pathname.startsWith(APPLICANTS_URL) && href === APPLICANTS_URL) ||
  (pathname.startsWith(ABOUT_URL) && href === ABOUT_URL);
