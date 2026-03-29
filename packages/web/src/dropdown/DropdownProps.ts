import type { SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';

import { type PopoverBaseProps } from '../overlays/popover/PopoverProps';

export type DropdownRef = {
  openMenu: () => void;
  closeMenu: () => void;
};

export type DropdownInternalProps = DropdownProps & {
  visible: boolean;
};

export type DropdownBaseProps = SharedProps &
  Pick<
    PopoverBaseProps,
    // TODO it doesn't really make sense to place these Popover props on the DropdownProps as it is possible for the Dropdown to render a Modal instead of Popover
    // it would be better to abstract the behavior of dropdown completely away from the implementation details
    | 'content'
    | 'children'
    | 'showOverlay'
    | 'contentPosition'
    | 'block'
    | 'disableTypeFocus'
    | 'controlledElementAccessibilityProps'
    | 'respectNegativeTabIndex'
  > &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /**
     * Enable to have Dropdown render its content inside a Modal as opposed to a relatively positioned Popover
     * Ideal for mobile or smaller devices.
     * */
    enableMobileModal?: boolean;
    /** Prevent menu from closing when an option is selected */
    disableCloseOnOptionChange?: boolean;
    /** Default selected value, or preselected value */
    value?: string;
    /** Callback that fires when Dropdown is opened */
    onOpenMenu?: () => void;
    /** Callback that fires when Dropdown is closed */
    onCloseMenu?: () => void;
    /** Callback that fires when Dropdown or trigger are blurred */
    onBlur?: () => void;
    /** Does not render the Dropdown inside of a portal (react-dom createPortal).
     * Portal is automatically disabled for SSR
     * */
    disablePortal?: boolean;
    /** Callback that is fired whenever an option is selected */
    onChange?: ((newValue: string) => void) | React.Dispatch<React.SetStateAction<string>>;
    /**
     * Prevents the Dropdown menu from opening.
     * You'll need to surface disabled state on the trigger manually.
     */
    disabled?: boolean;
    /**
     * If `true`, the focus trap will restore focus to the previously focused element when it unmounts.
     *
     * WARNING: If you disable this, you need to ensure that focus is restored properly so it doesn't end up on the body
     * @default true
     */
    restoreFocusOnUnmount?: boolean;
  };

export type DropdownProps = DropdownBaseProps & {
  /**
   * Width of input as a percentage string or number converted to pixels.
   * @default 100%
   * */
  width?: React.CSSProperties['width'];
  /** Minimum width of input as a percentage string or number converted to pixels. */
  minWidth?: React.CSSProperties['minWidth'];
  /** Maximum width of input as a percentage string or number converted to pixels. */
  maxWidth?: React.CSSProperties['maxWidth'];
  /** Can optionally pass a maxHeight.
   * @default 300
   * */
  maxHeight?: React.CSSProperties['maxHeight'];
};

export type DropdownRefProps = {
  openMenu: () => void;
  closeMenu: () => void;
};
