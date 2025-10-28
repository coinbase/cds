import { type StyleProp, type ViewStyle } from 'react-native';
import {
  type DimensionValue,
  type SharedAccessibilityProps,
  type SharedProps,
} from '@coinbase/cds-common/types';

import type { PressableProps } from '../system';

export type ChipBaseProps = SharedProps &
  Omit<PressableProps, 'children' | 'maxWidth' | 'style'> &
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
    maxWidth?: DimensionValue;
    /**
     * Invert the foreground and background colors to emphasize the Chip.
     * Depending on your theme, it may be dangerous to use this prop in conjunction with `transparentWhileInactive`.
     * @default false
     */
    inverted?: boolean;
    /** Reduces spacing around Chip content */
    compact?: boolean;
    /**
     * How many lines the text in the chip will be broken into.
     * @default 1
     */
    numberOfLines?: number;
    /**
     * @deprecated Use `styles.content` instead.
     * Apply styles to Chip content.
     */
    contentStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    /** Apply styles to the container and content. */
    styles?: {
      root?: StyleProp<ViewStyle>;
      content?: StyleProp<ViewStyle>;
    };
  };

export type ChipProps = ChipBaseProps;

export type InputChipProps = {
  /** Value indicates what is currently selected */
  value: string;
  /** Callback fired when Chip is pressed */
  onPress: PressableProps['onPress'];
} & Omit<ChipProps, 'end' | 'inverted' | 'children'>;
