import { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { cx } from '../../cx';

import type {
  NumberTickerNodeSectionComponent,
  NumberTickerNodeSectionProps,
} from './NumberTicker';

const containerCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: pre;
  color: inherit;
`;

export const DefaultNumberTickerNodeSection: NumberTickerNodeSectionComponent = memo(
  forwardRef<HTMLSpanElement, NumberTickerNodeSectionProps>(
    ({ children, justify = 'flex-start', style, className, ...props }, ref) => {
      const containerStyle = useMemo(
        () => ({ justifyContent: justify, ...style }),
        [justify, style],
      );

      return (
        <m.span ref={ref} className={cx(containerCss, className)} style={containerStyle} {...props}>
          {children}
        </m.span>
      );
    },
  ),
);
