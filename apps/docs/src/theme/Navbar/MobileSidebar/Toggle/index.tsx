import React from 'react';
import { IconButton } from '@coinbase/cds-web/buttons';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';

export default function MobileSidebarToggle(): JSX.Element {
  const { toggle, shown } = useNavbarMobileSidebar();
  return (
    <IconButton
      transparent
      accessibilityLabel={translate({
        id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
        message: 'Navigation bar',
        description: 'The ARIA label for hamburger menu button of mobile navigation',
      })}
      aria-expanded={shown}
      name="hamburger"
      onClick={toggle}
    />
  );
}
