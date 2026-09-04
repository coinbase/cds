import React, { type JSX } from 'react';
import { VStack } from '@coinbase/cds-web/layout';
import type { Props } from '@theme/Navbar/MobileSidebar/Layout';

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}: Props): JSX.Element {
  return (
    <VStack className="navbar-sidebar">
      {header}
      <VStack gap={2} paddingBottom={3} paddingTop={1}>
        {primaryMenu}
        {secondaryMenu}
      </VStack>
    </VStack>
  );
}
