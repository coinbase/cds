import React, { type ReactNode, useMemo } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  type TOCHighlightConfig,
  useFilteredAndTreeifiedTOC,
} from '@docusaurus/theme-common/internal';
import type { Props } from '@theme/TOCItems';
import TOCItemTree from '@theme/TOCItems/Tree';

import { useTOCHighlight } from './useTOCHightlight';

export default function TOCItems({
  toc,
  className = 'table-of-contents table-of-contents__left-border',
  linkClassName = 'table-of-contents__link',
  linkActiveClassName = undefined,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  ...props
}: Props): ReactNode {
  const themeConfig = useThemeConfig();

  const minHeadingLevel = minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
  const maxHeadingLevel = maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;

  const tocTree = useFilteredAndTreeifiedTOC({
    toc,
    minHeadingLevel,
    maxHeadingLevel,
  });

  const tocHighlightConfig: TOCHighlightConfig | undefined = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      };
    }
    return undefined;
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);
  useTOCHighlight(tocHighlightConfig);

  return (
    <TOCItemTree className={className} linkClassName={linkClassName} toc={tocTree} {...props} />
  );
}
