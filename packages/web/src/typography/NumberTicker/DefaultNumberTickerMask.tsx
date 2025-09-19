import { forwardRef, memo, useImperativeHandle } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { cx } from '../../cx';

import type { NumberTickerMaskComponent, NumberTickerMaskProps } from './NumberTicker';

const maskCss = css`
  display: inline-flex;
  overflow: clip;
`;

export const DefaultNumberTickerMask: NumberTickerMaskComponent = memo(
  forwardRef<HTMLSpanElement, NumberTickerMaskProps>(
    ({ children, className, style, ...props }, ref) => (
      <m.span ref={ref} className={cx(maskCss, className)} style={style} {...props}>
        {children}
      </m.span>
    ),
  ),
);
