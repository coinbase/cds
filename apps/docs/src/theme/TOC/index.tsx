import React, { type ReactNode, useMemo } from 'react';
import { cx } from '@coinbase/cds-web';
import { usePropsTOC } from '@site/src/utils/toc/PropsTOCManager';
import { useTOC } from '@site/src/utils/toc/TOCManager';
import type { Props } from '@theme/TOC';
import TOCItems from '@theme/TOCItems';

import styles from './styles.module.css';

export default function TOC({ className, toc, ...props }: Props): ReactNode {
  const { items: propsTocItems = [] } = usePropsTOC();
  const { items: tocItems = [] } = useTOC();
  const updatedTocItems = useMemo(
    () => [...toc, ...tocItems, ...propsTocItems],
    [toc, tocItems, propsTocItems],
  );
  return (
    <div className={cx('thin-scrollbar', className)}>
      <TOCItems
        linkActiveClassName={styles.tableOfContentsLinkActive}
        linkClassName={styles.tableOfContentsLink}
        toc={updatedTocItems}
        {...props}
      />
    </div>
  );
}
