import { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import type { RollingNumberSymbolComponent, RollingNumberSymbolProps } from './RollingNumber';

const containerCss = css`
  color: inherit;
  display: inline-block;
  white-space: pre;
  align-items: center;
`;

export const DefaultRollingNumberSymbol: RollingNumberSymbolComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberSymbolProps>(
    ({ type, value, justify, ...props }, ref) => {
      const containerStyle = useMemo(
        () => ({ justifyContent: justify, paddingBottom: type === 'subscript' ? '0.13lh' : '0' }),
        [justify, type],
      );
      return (
        <m.span ref={ref} className={containerCss} style={containerStyle} {...props}>
          {value}
        </m.span>
      );
    },
  ),
);
