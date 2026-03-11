import React, { useCallback, useEffect, useRef } from 'react';
import { FocusTrap } from '@coinbase/cds-web/overlays/FocusTrap';
import { useLockBodyScroll, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { useWindowSizeWithBreakpointOverride } from '@site/src/utils/useWindowSizeWithBreakpointOverride';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarLayout from '@theme/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarPrimaryMenu from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme/Navbar/MobileSidebar/SecondaryMenu';

export default function NavbarMobileSidebar(): JSX.Element | null {
  const mobileSidebar = useNavbarMobileSidebar();
  useLockBodyScroll(mobileSidebar.shown);
  const windowSize = useWindowSizeWithBreakpointOverride();
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const cleanupEffect = useCallback(() => {
    const rootElement = document.querySelector('.main-wrapper');
    rootElement?.removeAttribute('aria-hidden');
    previousFocusRef.current?.focus();
  }, []);

  const handleEscPress = useCallback(() => {
    if (mobileSidebar.shown) {
      mobileSidebar.toggle();
    }
  }, [mobileSidebar]);

  // Set aria-hidden on main content when sidebar is open
  useEffect(() => {
    if (mobileSidebar.shown) {
      // Store previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      const rootElement = document.querySelector('.main-wrapper');
      if (rootElement) {
        rootElement.setAttribute('aria-hidden', 'true');
      }

      const mobileSidebarCloseBtn = document.querySelector(
        '#mobile-sidebar button[aria-label="Close navigation bar"]',
      ) as HTMLButtonElement;
      setTimeout(() => {
        mobileSidebarCloseBtn?.focus();
      }, 100);

      return cleanupEffect;
    }
  }, [cleanupEffect, mobileSidebar.shown]);

  if (mobileSidebar.disabled || windowSize !== 'mobile') {
    return null;
  }

  return (
    <FocusTrap
      focusTabIndexElements
      respectNegativeTabIndex
      disableAutoFocus={false}
      disableFocusTrap={!mobileSidebar.shown}
      onEscPress={handleEscPress}
    >
      <div aria-label="Navigation menu" aria-modal="true" id="mobile-sidebar" role="dialog">
        <NavbarMobileSidebarLayout
          header={<NavbarMobileSidebarHeader />}
          primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
          secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
        />
      </div>
    </FocusTrap>
  );
}
