import React, { type JSX } from 'react';
import { cx } from '@coinbase/cds-web';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/DocSidebarItem/Html';

import styles from './styles.module.css';

export default function DocSidebarItemHtml({ item, level, index }: Props): JSX.Element {
  const { value, defaultStyle, className } = item;
  return (
    <li
      dangerouslySetInnerHTML={{ __html: value }}
      key={index}
      className={cx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        defaultStyle && styles.menuHtmlItem,
        defaultStyle && 'menu__list-item',
        className,
      )}
    />
  );
}
