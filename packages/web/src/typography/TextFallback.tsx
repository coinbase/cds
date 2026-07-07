import { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import {
  Fallback,
  type FallbackBaseProps,
  type fallbackDefaultElement,
  type FallbackProps,
} from '../layout/Fallback';

export type TextFallbackBaseProps = Omit<FallbackBaseProps, 'height'> & {
  /** Font token used to size the fallback to match text line height. */
  font: ThemeVars.FontSize;
};

export type TextFallbackProps = Omit<FallbackProps<typeof fallbackDefaultElement>, 'height'> &
  Pick<TextFallbackBaseProps, 'font'>;

/**
 * Loading placeholder sized to match a typography font token's line height.
 *
 * @note Requires theme `fontSize` and `lineHeight` tokens to be length values (for example `rem` or `px`). Unitless or percentage values will not size accurately.
 */
export const TextFallback = memo(function TextFallback({
  font,
  style,
  ...props
}: TextFallbackProps) {
  const textFallbackStyle = useMemo(
    () => ({
      paddingTop: `max((var(--lineHeight-${font}) - var(--fontSize-${font})) / 2, 0px)`,
      paddingBottom: `max((var(--lineHeight-${font}) - var(--fontSize-${font})) / 2, 0px)`,
      ...style,
    }),
    [font, style],
  );

  return <Fallback height={`var(--fontSize-${font})`} style={textFallbackStyle} {...props} />;
});
