import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { BaseTooltipPlacement, ElevationProps, SharedProps } from '@coinbase/cds-common/types';
import type { PositionStyles } from '@coinbase/cds-common/types/BoxBaseProps';

import type { PopoverProps } from '../popover/PopoverProps';

export type TooltipBaseProps = SharedProps &
  ElevationProps &
  Pick<
    PopoverProps,
    | 'disableFocusTrap'
    | 'disableAutoFocus'
    | 'disableTypeFocus'
    | 'respectNegativeTabIndex'
    | 'focusTabIndexElements'
    | 'autoFocusDelay'
  > & {
    children: React.ReactElement;
    /** The content to render within the tooltip. */
    content: React.ReactNode;
    /**
     * This value corresponds to how big the gap between the subject and the tooltip is.
     * We do not encourage usage of this prop. But it is enabled for special cases as an escape hatch.
     * @default 1
     */
    gap?: ThemeVars.Space;
    /**
     * Control whether the tooltip is shown or hidden.
     * @default true
     */
    visible?: boolean;
    /**
     * Delay (in ms) before showing the tooltip on pointer hover.
     * Keyboard focus still opens immediately for accessibility.
     */
    openDelay?: number;
    /**
     * Delay (in ms) before hiding the tooltip after pointer leave.
     * Keyboard blur still closes immediately.
     */
    closeDelay?: number;
    /** Invert the theme's activeColorScheme for this component
     * @default true
     */
    invertColorScheme?: boolean;
    /** Position of tooltip in relation to the subject. */
    placement?: BaseTooltipPlacement;
    /**
     * @danger
     * By setting this to true you are essentially opting out of CDS zIndex management. By default the subject is rendered in a portal. If set to true the subject will be rendered in the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal?: boolean;
    /**
     * Typically only used when disablePortal is set to true to adjust zIndex of tooltip. When using portal this value should remain as default.
     * @default 4
     * */
    zIndex?: PositionStyles['zIndex'];
    /**
     * A unique ID used to ensure tooltips are accessible
     */
    tooltipId?: string;
  };

export type TooltipProps = TooltipBaseProps;

export type PopperTooltipProps = {
  gap: ThemeVars.Space;
  /**
   * A unique ID used to ensure tooltips are accessible
   */
  tooltipId?: string;
} & Pick<TooltipProps, 'content' | 'testID' | 'zIndex' | 'placement' | 'elevation'>;
