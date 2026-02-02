import React, { type JSX } from 'react';
import { cx } from '@coinbase/cds-web';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/DocSidebar/Desktop/CollapseButton';
import IconArrow from '@theme/Icon/Arrow';

import styles from './styles.module.css';

export default function CollapseButton({ onClick }: Props): JSX.Element {
  return (
    <button
      aria-label={translate({
        id: 'theme.docs.sidebar.collapseButtonAriaLabel',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      className={cx('button button--secondary button--outline', styles.collapseSidebarButton)}
      onClick={onClick}
      title={translate({
        id: 'theme.docs.sidebar.collapseButtonTitle',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      type="button"
    >
      <IconArrow className={styles.collapseSidebarButtonIcon} />
    </button>
  );
}
