import type { ThemeVars } from '../core/theme';

import type { FlexGrow, FlexShrink, FlexStyles } from './BoxBaseProps';
import type { Display } from './Display';
import type { ResponsivePropsDevices } from './Responsive';
import type { MarginProps, PaddingProps } from './SpacingProps';
import type { Visibility } from './Visibility';

type VisibilityProps = {
  visibility?: Visibility;
};

type DisplayProps = {
  display?: Display;
};

type StackProps = {
  /** Gap to insert between siblings. */
  gap?: ThemeVars.Space;
};

/**
 * @internal
 * Do not modify this without leads approval
 */
export type ResponsiveStyles = DisplayProps &
  FlexStyles &
  PaddingProps &
  MarginProps &
  StackProps &
  VisibilityProps &
  FlexGrow &
  FlexShrink;

export type ResponsiveProps = Partial<Record<ResponsivePropsDevices, ResponsiveStyles>>;
