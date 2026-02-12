import React, { type JSX, useState } from 'react';
import { cx } from '@coinbase/cds-web';
import { VStack } from '@coinbase/cds-web/layout';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useAnnouncementBar, useScrollPosition } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/DocSidebar/Desktop/Content';
import DocSidebarItems from '@theme/DocSidebarItems';

import styles from './styles.module.css';

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({ path, sidebar, className }: Props): JSX.Element {
  const showAnnouncementBar = useShowAnnouncementBar();

  return (
    <VStack
      aria-label={translate({
        id: 'theme.docs.sidebar.navAriaLabel',
        message: 'Docs sidebar',
        description: 'The ARIA label for the sidebar navigation',
      })}
      as="nav"
      className={cx(
        'menu thin-scrollbar',
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className,
      )}
      paddingEnd={1.5}
      paddingStart={2}
      paddingY={3}
    >
      <VStack as="ul" className={cx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')} gap={2}>
        <DocSidebarItems activePath={path} items={sidebar} level={1} />
      </VStack>
    </VStack>
  );
}
