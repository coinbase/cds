import React from 'react';
import { cx } from '@coinbase/cds-web';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { useThemeConfig } from '@docusaurus/theme-common';
import type { Props } from '@theme/DocSidebar/Desktop';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import Logo from '@theme/Logo';

import styles from './styles.module.css';

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  return (
    <VStack
      className={cx(styles.sidebar, hideOnScroll && styles.sidebarWithHideableNavbar)}
      height="100%"
      opacity={isHidden ? 0 : 1}
      visibility={isHidden ? 'hidden' : 'visible'}
    >
      {hideOnScroll && <Logo className={styles.sidebarLogo} tabIndex={-1} />}
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </VStack>
  );
}

export default React.memo(DocSidebarDesktop);
