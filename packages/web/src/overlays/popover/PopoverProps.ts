import type React from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { Placement, PositioningStrategy } from '@popperjs/core';

import type { AccessibleControlledReturnType } from '../../hooks/useA11yControlledVisibility';
import { type FocusTrapBaseProps, type FocusTrapProps } from '../FocusTrap';

export type PopoverContentPositionConfig = {
  /**
   * Custom placement config from Popper. See docs: https://popper.js.org/docs/v2/constructors/#placement
   * @default bottom
   */
  placement?: Placement;
  /** Offset content placement on the x axis */
  skid?: ThemeVars.Space;
  /** Offset content placement on the y axis */
  gap?: ThemeVars.Space;
  /** This should only be used if there is content within the subject that needs to be overlaid
   * eg: helperText below a Select input
   * This value will be subtracted from the gap
   */
  offsetGap?: number;
  /**
   * Custom strategy config from Popper. See docs: https://popper.js.org/docs/v2/constructors/#strategy
   * @default absolute
   */
  strategy?: PositioningStrategy;
};

export type PopoverBaseProps = SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Pick<
    FocusTrapBaseProps,
    | 'disableFocusTrap'
    | 'disableAutoFocus'
    | 'disableTypeFocus'
    | 'respectNegativeTabIndex'
    | 'focusTabIndexElements'
    | 'autoFocusDelay'
    | 'restoreFocusOnUnmount'
  > &
  Partial<Pick<AccessibleControlledReturnType, 'controlledElementAccessibilityProps'>> & {
    content: React.ReactNode;
    /** Subject of the Popover that when interacted with will toggle the visibility of the content */
    children: React.ReactNode;
    /**
     * @danger This disables React portal integration. Use this with caution.
     */
    disablePortal?: boolean;
    /**
     * Display an overlay over all content below the Popover menu
     */
    showOverlay?: boolean;
    /** Callback that fires when the subject is pressed */
    onPressSubject?: () => void;
    /** Callback that is fired after the content animates out */
    onClose?: () => void;
    /** Invert the theme's activeColorScheme for this component */
    invertColorScheme?: boolean;
    /** Controls visibility of the Popover content */
    visible: boolean;
    /** Override content positioning defaults */
    contentPosition?: PopoverContentPositionConfig;
    /**
     * Makes the Popover Subject fill the width of the parent container
     */
    block?: boolean;
    /**
     * Prevents the Popover content from showing.
     * You'll need to surface disabled state on the trigger manually.
     */
    disabled?: boolean;
  };

export type PopoverProps = PopoverBaseProps & {
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  /** Callback fired when the subject is focused */
  onFocus?: () => void;
  /** Callback fired when the subject or content is blurred */
  onBlur?: (event?: React.FocusEvent) => void;
  /** Callback fired when a mouse down event is fired on the subject */
  onMouseDown?: (event: React.MouseEvent) => void;
};
