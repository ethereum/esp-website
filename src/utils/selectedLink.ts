import { ABOUT_URL, APPLICANTS_URL, ESP_BLOG_URL, HOME_URL } from '../constants';

export const selectedLink = (pathname: string, href: string) =>
  (pathname === HOME_URL && href === HOME_URL) ||
  (pathname === APPLICANTS_URL && href === APPLICANTS_URL) ||
  (pathname === ABOUT_URL && href === ABOUT_URL);
