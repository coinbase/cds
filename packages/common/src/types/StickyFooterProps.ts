import type { SharedAccessibilityProps } from './SharedAccessibilityProps';
import type { SharedProps } from './SharedProps';
import type { PaddingProps } from './SpacingProps';

/**
 * @deprecated Use StickyFooterProps from @coinbase/cds-mobile instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v8
 */
export type StickyFooterProps = {
  /**
   * React children to be rendered inside the StickyFooter.
   */
  children?: React.ReactNode;
  /**
   * Whether to apply a top border and shadow to the StickyFooter.
   */
  elevated?: boolean;
  /**
   * The WAI-ARIA role for the StickyFooter element.
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
   */
  role?: React.AriaRole;
} & SharedProps &
  PaddingProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;
