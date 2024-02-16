import fs from 'fs';

import { MARKDOWN_CONTENT_PATH } from '../constants';

export function getContentPaths() {
  return fs.readdirSync(MARKDOWN_CONTENT_PATH);
}

export function getMdxSource(slug: string) {
  return fs.readFileSync(`${MARKDOWN_CONTENT_PATH}/${slug}.mdx`, 'utf8');
}
