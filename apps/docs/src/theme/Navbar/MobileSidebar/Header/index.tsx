import React from 'react';
import { IconButton } from '@coinbase/cds-web/buttons';
import { HStack } from '@coinbase/cds-web/layout';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarLogo from '@theme/Navbar/Logo';

function CloseButton() {
  const { toggle } = useNavbarMobileSidebar();
  return (
    <IconButton
      transparent
      accessibilityLabel={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      name="close"
      onClick={toggle}
    />
  );
}

export default function NavbarMobileSidebarHeader(): JSX.Element {
  return (
    <HStack
      alignItems="center"
      background="bg"
      justifyContent="space-between"
      padding={2}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <NavbarLogo />
      <CloseButton />
    </HStack>
  );
}
