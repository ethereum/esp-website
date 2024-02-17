import fs from 'fs';

import { MARKDOWN_CONTENT_PATH } from '../constants';

export function getContentPaths() {
  try {
    return fs.readdirSync(MARKDOWN_CONTENT_PATH);
  } catch (e: unknown) {
    console.error(e);
    return [];
  }
}

export function getMdxSource(slug: string) {
  return fs.readFileSync(`${MARKDOWN_CONTENT_PATH}/${slug}.mdx`, 'utf8');
}
