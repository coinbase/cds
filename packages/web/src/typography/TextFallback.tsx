import React, { forwardRef, memo, useMemo } from 'react';
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

export const TextFallback = memo(
  forwardRef<React.ReactElement<FallbackBaseProps>, TextFallbackProps>(() => (
    { font, style, ...props },
    ref,
  ) {
    const textFallbackStyle = useMemo(
      () => ({
        paddingTop: `max((var(--lineHeight-${font}) - var(--fontSize-${font})) / 2, 0px)`,
        paddingBottom: `max((var(--lineHeight-${font}) - var(--fontSize-${font})) / 2, 0px)`,
        ...style,
      }),
      [font, style],
    );

    return (
      <Fallback
        ref={ref}
        height={`var(--fontSize-${font})`}
        style={textFallbackStyle}
        {...props}
      />
    );
  }),
);
