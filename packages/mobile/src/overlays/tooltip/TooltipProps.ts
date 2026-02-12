import type { Animated, LayoutRectangle, ViewProps } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type {
  BaseTooltipPlacement,
  ElevationProps,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';

export type TooltipPlacement = Extract<BaseTooltipPlacement, 'bottom' | 'top'>;

export type TooltipBaseProps = SharedProps &
  ElevationProps & {
    /** Position of tooltip in relation to the subject. */
    placement?: TooltipPlacement;
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
     * Delay (in ms) before showing the tooltip after press.
     */
    openDelay?: number;
    /**
     * Delay (in ms) before hiding the tooltip after dismiss.
     */
    closeDelay?: number;
    /** Invert the theme's activeColorScheme for this component
     * @default true
     */
    invertColorScheme?: boolean;
    /** This callback executes when the tooltip is closed; either by press outside the toolip or on back button press for android. */
    onCloseTooltip?: () => void;
    /** This callback executes when the tooltip is opened */
    onOpenTooltip?: () => void;
    /**
     * @danger
     * This prop only takes affect on Android and should only be used for a very specific measurement edge case described here. There is a known RN Modal bug where screen measurements are offset by the status bar when statusBarTranslucent=false.
     * This prop acts as the escape hatch to mitigate this; by setting true one can shift the y position of the tooltip to account for this bug.
     * @default false
     */
    yShiftByStatusBarHeight?: boolean;
    /**
     * If the children of the trigger is not a string, then you have
     * to set your own accessibilityLabel to ensure that the tooltip
     * is read correctly for voice-overs.
     */
    accessibilityLabel?: SharedAccessibilityProps['accessibilityLabel'];
    /**
     * The accessibilityLabel for the content of the tooltip. If content is
     * a string, this is not required as accessibilityHint would be set to the
     * content. Otherwise, this is required
     */
    accessibilityLabelForContent?: SharedAccessibilityProps['accessibilityLabel'];
    /**
     * The accessibilityHint for the content of the tooltip. If content is
     * a string, this is not required as accessibilityHint would be set to the
     * content. Otherwise, this is required
     */
    accessibilityHintForContent?: SharedAccessibilityProps['accessibilityHint'];
    /**
     * If the children of the trigger is not a string, then you have
     * to set your own accessibilityHint to ensure that the tooltip
     * is read correctly for voice-overs.
     */
    accessibilityHint?: SharedAccessibilityProps['accessibilityHint'];
  };

export type TooltipProps = TooltipBaseProps;

/** The Subject is the element that the tooltip is referencing. */
export type SubjectLayout = {
  width: number;
  height: number;
  pageOffsetX: number;
  pageOffsetY: number;
};

export type InternalTooltipProps = SharedAccessibilityProps &
  Pick<
    TooltipProps,
    | 'content'
    | 'placement'
    | 'gap'
    | 'testID'
    | 'yShiftByStatusBarHeight'
    | 'invertColorScheme'
    | 'elevation'
  > & {
    subjectLayout: SubjectLayout | undefined;
    opacity: Animated.Value;
    animateIn: Animated.CompositeAnimation;
    translateY: Animated.Value;
    onAccessibilityEscape?: ViewProps['onAccessibilityEscape'];
    onAccessibilityTap?: ViewProps['onAccessibilityTap'];
  };

export type UseTooltipPositionParams = {
  subjectLayout: SubjectLayout | undefined;
  tooltipLayout: LayoutRectangle;
} & Pick<TooltipProps, 'placement' | 'yShiftByStatusBarHeight'>;
