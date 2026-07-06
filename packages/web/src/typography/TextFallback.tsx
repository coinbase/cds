import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import type { Polymorphic } from '../core/polymorphism';
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

export type TextFallbackProps<
  AsComponent extends React.ElementType = typeof fallbackDefaultElement,
> = Omit<FallbackProps<AsComponent>, 'height'> & Pick<TextFallbackBaseProps, 'font'>;

type TextFallbackComponent = (<
  AsComponent extends React.ElementType = typeof fallbackDefaultElement,
>(
  props: TextFallbackProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextFallback: TextFallbackComponent = memo(
  forwardRef<React.ReactElement<TextFallbackBaseProps>, TextFallbackBaseProps>(
    <AsComponent extends React.ElementType>(
      { font, style, ...props }: TextFallbackProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
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
    },
  ),
);
