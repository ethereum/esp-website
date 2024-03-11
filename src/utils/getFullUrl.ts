import { SITE_URL } from '../constants';

export const getFullUrl = (path: string) => {
  const url = new URL(path, SITE_URL);
  return url.protocol + '//' + url.host + url.pathname;
};
