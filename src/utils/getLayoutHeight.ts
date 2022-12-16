import {
  ACADEMIC_GRANTS_URL,
  DEVCON_GRANTS_URL,
  HOME_URL,
  LAYER_2_GRANTS_URL,
  MERGE_DATA_CHALLENGE_URL,
  SEMAPHORE_GRANT_URL
} from '../constants';

export const getLayoutHeight = (path: string) =>
  path === HOME_URL
    ? '877px'
    : [
        ACADEMIC_GRANTS_URL,
        DEVCON_GRANTS_URL,
        MERGE_DATA_CHALLENGE_URL,
        SEMAPHORE_GRANT_URL,
        LAYER_2_GRANTS_URL
      ].includes(path)
    ? '810px'
    : '550px';
