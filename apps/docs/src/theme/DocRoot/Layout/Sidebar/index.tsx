import React, { type JSX, type ReactNode, useCallback, useState } from 'react';
import { cx } from '@coinbase/cds-web';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import { prefersReducedMotion, ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/DocRoot/Layout/Sidebar';
import ExpandButton from '@theme/DocRoot/Layout/Sidebar/ExpandButton';
import DocSidebar from '@theme/DocSidebar';

import styles from './styles.module.css';

// Reset sidebar state when sidebar changes
// Use React key to unmount/remount the children
// See https://github.com/facebook/docusaurus/issues/3414
function ResetOnSidebarChange({ children }: { children: ReactNode }) {
  const sidebar = useDocsSidebar();
  return <React.Fragment key={sidebar?.name ?? 'noSidebar'}>{children}</React.Fragment>;
}

export default function DocRootLayoutSidebar({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}: Props): JSX.Element {
  const { pathname } = useLocation();

  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    // onTransitionEnd won't fire when sidebar animation is disabled
    // fixes https://github.com/facebook/docusaurus/issues/8918
    if (!hiddenSidebar && prefersReducedMotion()) {
      setHiddenSidebar(true);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [setHiddenSidebarContainer, hiddenSidebar]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLElement>) => {
      if (!e.currentTarget.classList.contains(styles.docSidebarContainer)) {
        return;
      }

      if (hiddenSidebarContainer) {
        setHiddenSidebar(true);
      }
    },
    [hiddenSidebarContainer],
  );

  return (
    <div
      className={cx(
        ThemeClassNames.docs.docSidebarContainer,
        styles.docSidebarContainer,
        hiddenSidebarContainer && styles.docSidebarContainerHidden,
      )}
      onTransitionEnd={handleTransitionEnd}
      role="complementary"
    >
      <ResetOnSidebarChange>
        <div className={cx(styles.sidebarViewport, hiddenSidebar && styles.sidebarViewportHidden)}>
          <DocSidebar
            isHidden={hiddenSidebar}
            onCollapse={toggleSidebar}
            path={pathname}
            sidebar={sidebar}
          />
          {hiddenSidebar && <ExpandButton toggleSidebar={toggleSidebar} />}
        </div>
      </ResetOnSidebarChange>
    </div>
  );
}
