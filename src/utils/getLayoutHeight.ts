import { ACADEMIC_GRANTS_URL, HOME_URL } from '../constants';

export const getLayoutHeight = (path: string) =>
  path === HOME_URL ? '877px' : path === ACADEMIC_GRANTS_URL ? '810px' : '550px';
