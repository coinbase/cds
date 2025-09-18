import React from 'react';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/DocRoot/Layout/Sidebar/ExpandButton';
import IconArrow from '@theme/Icon/Arrow';

import styles from './styles.module.css';

export default function DocRootLayoutSidebarExpandButton({ toggleSidebar }: Props): JSX.Element {
  return (
    <div
      aria-label={translate({
        id: 'theme.docs.sidebar.expandButtonAriaLabel',
        message: 'Expand sidebar',
        description: 'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      className={styles.expandButton}
      onClick={toggleSidebar}
      onKeyDown={toggleSidebar}
      role="button"
      tabIndex={0}
      title={translate({
        id: 'theme.docs.sidebar.expandButtonTitle',
        message: 'Expand sidebar',
        description: 'The ARIA label and title attribute for expand button of doc sidebar',
      })}
    >
      <IconArrow className={styles.expandButtonIcon} />
    </div>
  );
}
