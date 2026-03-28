import { type ReactNode } from 'react';
import { IconButton } from '@coinbase/cds-web/buttons';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/AnnouncementBar/CloseButton';

export default function AnnouncementBarCloseButton({ onClick }: Props): ReactNode {
  return (
    <IconButton
      compact
      transparent
      accessibilityLabel={translate({
        id: 'theme.AnnouncementBar.closeButtonAriaLabel',
        message: 'Close',
        description: 'The ARIA label for close button of announcement bar',
      })}
      name="close"
      onClick={onClick}
    />
  );
}
