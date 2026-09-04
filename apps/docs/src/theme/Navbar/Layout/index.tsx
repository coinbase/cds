import { type ComponentProps, type ReactNode } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useHideableNavbar, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/Navbar/Layout';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import clsx from 'clsx';

import { useWindowSizeWithBreakpointOverride } from '../../../utils/useWindowSizeWithBreakpointOverride';

import styles from './styles.module.css';

function NavbarBackdrop({ className, ...props }: ComponentProps<'div'>) {
  const mobileSidebar = useNavbarMobileSidebar();
  const windowSize = useWindowSizeWithBreakpointOverride();
  if (mobileSidebar.disabled || windowSize !== 'mobile') {
    return null;
  }
  return (
    <div
      className={clsx('navbar-sidebar__backdrop', className)}
      onClick={mobileSidebar.toggle}
      role="presentation"
      {...props}
    />
  );
}

export default function NavbarLayout({ children }: Props): ReactNode {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  return (
    <nav
      ref={navbarRef}
      aria-label={translate({
        id: 'theme.NavBar.navAriaLabel',
        message: 'Main',
        description: 'The ARIA label for the main navigation',
      })}
      className={clsx(
        'navbar',
        'navbar--fixed-top',
        hideOnScroll && [styles.navbarHideable, !isNavbarVisible && styles.navbarHidden],
        {
          'navbar--dark': style === 'dark',
          'navbar--primary': style === 'primary',
          'navbar-sidebar--show': mobileSidebar.shown,
        },
      )}
    >
      {children}
      <NavbarBackdrop />
      <NavbarMobileSidebar />
    </nav>
  );
}
