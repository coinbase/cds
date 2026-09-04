import type { IconName } from '@coinbase/cds-icons';

import type { SharedAccessibilityProps } from './SharedAccessibilityProps';
import type { SharedProps } from './SharedProps';
import type { PaddingProps } from './SpacingProps';

export type SectionHeaderProps = {
  /** Text or ReactNode to be displayed in Title */
  title: React.ReactNode;
  /* ReactNode (icon, asset, image, etc) to display before title. */
  start?: React.ReactNode;
  /* Icon or ReactNode to display after title. */
  icon?: Exclude<React.ReactNode, 'string'> | IconName;
  /** Whether the icon is active */
  iconActive?: boolean;
  /** ReactNode or UiIconName to present balances wherever it is necessary */
  balance?: React.ReactNode;
  /** ReactNode to display up to 2 lines of copy that frames the section's purpose and relevance */
  description?: React.ReactNode;
  /* ReactNode to display at the end */
  end?: React.ReactNode;
} & SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  PaddingProps;
