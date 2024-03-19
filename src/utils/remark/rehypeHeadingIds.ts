import type { Element, ElementContent, Root } from 'hast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

import { parseHeadingId, trimmedTitle } from '../toc';

function concatenateNodeValues(node: Element): string {
  return node.children.reduce((acc: string, child) => {
    if (child.type === 'element' && child.children) {
      return acc + concatenateNodeValues(child);
    }

    if ('value' in child) {
      return acc + child.value;
    }

    return acc;
  }, '');
}

/**
 * Parses DOM elements to find all headings, setting an `id` attribute on each one.
 * The `parseHeadingId` Table of Contents utility functions is used to generate the `id`
 * for each, allowing ToC links to match.
 * The `trimmedTitle` function is used to remove any trailing `{#id}` from the heading
 * @returns Plugin<[{}], Root>, a rehype plugin that can be used in [...dynamic-md-pages].tsx
 */
const rehypeHeadingIds: Plugin<[{}], Root> = () => (tree, _file) => {
  visit(tree, 'element', node => {
    // Ignore non-heading elements
    const headingElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    if (!headingElements.includes(node.tagName as string)) return;

    const concatenated = concatenateNodeValues(node);
    if (node.properties) {
      node.properties.id = parseHeadingId(concatenated);
    }

    const lastIndex = node.children.length - 1;
    const lastChild = node.children[lastIndex] as ElementContent;
    if ('value' in lastChild) {
      const lastChildValue: string = lastChild.value as string;
      node.children[lastIndex] = {
        type: 'text',
        value: trimmedTitle(lastChildValue)
      };
    }
  });
};

export default rehypeHeadingIds;
