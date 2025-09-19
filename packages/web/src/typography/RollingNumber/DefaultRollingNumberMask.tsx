import { forwardRef, memo, useImperativeHandle } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { cx } from '../../cx';

import type { RollingNumberMaskComponent, RollingNumberMaskProps } from './RollingNumber';

const maskCss = css`
  display: inline-flex;
  overflow: clip;
`;

export const DefaultRollingNumberMask: RollingNumberMaskComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberMaskProps>(
    ({ children, className, style, ...props }, ref) => (
      <m.span ref={ref} className={cx(maskCss, className)} style={style} {...props}>
        {children}
      </m.span>
    ),
  ),
);
