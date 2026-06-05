import type { ThemeVars } from '../core/theme';

export type InputVariant =
  | 'positive'
  | 'negative'
  | 'foreground'
  | 'primary'
  | 'foregroundMuted'
  | 'secondary';

export type SharedInputProps = {
  /**
   * Enables compact variation
   * @default false
   */
  compact?: boolean;
  /** Short messageArea indicating purpose of input */
  label?: string;
  /** Typography token for the field label. */
  labelFont?: ThemeVars.Font;
  /** Color token for the field label. */
  labelColor?: ThemeVars.Color;
  /** Placeholder text displayed inside of the input. Will be replaced if there is a value. */
  placeholder?: string;
  /**
   * For cases where label is not enough information
   * to describe what the text input is for. Can also be used for
   * showing positive/negative messages
   */
  helperText?: string | React.ReactNode;
  /**
   * When true, the value cannot be edited but the control may remain focusable (unlike `disabled`).
   */
  readOnly?: boolean;
};
