import { toc } from 'mdast-util-toc';
import { visit } from 'unist-util-visit';
import type { BlockContent, DefinitionContent, ListContent } from 'mdast';
import type { List, Nodes } from 'mdast-util-toc/lib';
import type { Plugin } from 'unified';

import type { IRemarkTocOptions, ToCNodeEntry, TocNodeType } from '../../types';

const remarkInferToc: Plugin<[IRemarkTocOptions]> = options => {
  const { callback, maxDepth }: IRemarkTocOptions = {
    maxDepth: 6,
    ...options
  };

  const processToC = (
    node: BlockContent | DefinitionContent | List | ListContent | null,
    current: TocNodeType
  ): TocNodeType => {
    if (!node) {
      return {};
    }

    switch (node.type) {
      case `paragraph`: {
        const typedCurrent = current as ToCNodeEntry;

        visit(node, item => {
          if (item.type === `link`) {
            typedCurrent.url = item.url;
          }
          if (item.type === `text` || item.type === `inlineCode`) {
            if (typedCurrent.title) {
              typedCurrent.title += item.value;
            } else {
              typedCurrent.title = item.value;
            }
          }
        });

        return current;
      }

      case `list`: {
        const typedCurrent = current as { items: Array<TocNodeType> };

        typedCurrent.items = node.children.map(item => processToC(item, {}));

        return typedCurrent;
      }

      case `listItem`: {
        if (node.children.length) {
          const heading = processToC(node.children[0], {});

          if (node.children.length > 1) {
            processToC(node.children[1], heading);
          }

          return heading;
        }
      }

      default:
        return {};
    }
  };

  return tree => {
    const generatedToC = toc(tree as Nodes, { maxDepth });

    if (generatedToC.map) {
      const processedToC = processToC(generatedToC.map, {});
      callback(processedToC);
    }
  };
};

export default remarkInferToc;
