import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import type { StyleProps } from '../styles/styleProps';
import type {
  PressableBaseProps,
  PressableDefaultElement,
  PressableProps,
} from '../system/Pressable';

export type ChipSize = 'xs' | 's';

export type ChipBaseProps = SharedProps &
  Omit<
    PressableProps<PressableDefaultElement>,
    | 'children'
    | 'loading'
    | 'start'
    | 'numberOfLines'
    | 'accessibilityHint'
    | 'accessibilityLabelledBy'
    | 'onChange'
    | 'value'
  > &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** ReactNode placed in the center of the Chip */
    children?: React.ReactNode;
    /** ReactNode placed before the value */
    start?: React.ReactNode;
    /** ReactNode placed after the value */
    end?: React.ReactNode;
    /**
     * If text content overflows, it will get truncated with an ellipsis.
     * @default 200
     */
    maxWidth?: PressableBaseProps['maxWidth'];
    /**
     * When true, emphasizes the Chip with higher contrast by inverting the color
     * scheme for everything rendered inside the Chip — including `background`,
     * `color`, icons, and other token-based colors. Those props are resolved
     * against the opposite color scheme, matching the legacy `invertColorScheme`
     * behavior.
     *
     * Set `activeBackground` and/or `activeColor` to opt out of inversion and
     * paint explicit active colors instead.
     * @default false
     */
    active?: boolean;
    /**
     * Background color applied when `active` is true. When set, the Chip skips
     * color-scheme inversion and uses this token directly.
     *
     * **Warning:** `start`, `end`, and `children` ReactNodes are not updated
     * automatically — pass explicit `color` props on nested icons and other
     * content so they match the active palette.
     */
    activeBackground?: ThemeVars.Color;
    /**
     * Foreground color applied when `active` is true. When set, the Chip skips
     * color-scheme inversion and uses this token for string labels.
     *
     * **Warning:** `start`, `end`, and `children` ReactNodes are not updated
     * automatically — pass explicit `color` props on nested icons and other
     * content so they match the active palette.
     */
    activeColor?: StyleProps['color'];
    /**
     * Invert the foreground and background colors to emphasize the Chip.
     * Depending on your theme, it may be dangerous to use this prop in conjunction with `transparentWhileInactive`.
     * @default false
     * @deprecated Use the `active` prop instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v11
     */
    inverted?: boolean;
    /**
     * Invert the foreground and background colors to emphasize the Chip.
     * Depending on your theme, it may be dangerous to use this prop in conjunction with `transparentWhileInactive`.
     * @default false
     * @deprecated Use the `active` prop instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v11
     */
    invertColorScheme?: boolean;
    /**
     * Reduces spacing around the chip.
     * @deprecated Use `size="xs"` instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v11
     */
    compact?: boolean;
    /**
     * Set the size of the chip.
     * @default s
     */
    size?: ChipSize;
    /**
     * How many lines the text in the chip will be broken into.
     * @default 1
     */
    numberOfLines?: number;
    /**
     * @deprecated Use `styles.content` instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v9
     * Apply styles to Chip content.
     */
    contentStyle?: React.CSSProperties;
    /** Custom styles for individual elements of the Chip component */
    styles?: {
      /** Root element */
      root?: React.CSSProperties;
      /** Content element */
      content?: React.CSSProperties;
    };
    /** Custom class names for individual elements of the Chip component */
    classNames?: {
      /** Root element */
      root?: string;
      /** Content element */
      content?: string;
    };
  };

export type ChipProps = ChipBaseProps;

export type InputChipBaseProps = ChipBaseProps;

export type InputChipProps = InputChipBaseProps &
  ChipProps & {
    /**
     * Value indicates what is currently selected
     * @deprecated Use the `children` prop instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v9
     */
    value?: string;
  };
