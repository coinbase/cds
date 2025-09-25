import { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { cx } from '../../cx';
import { Text } from '../../typography/Text';

import type { RollingNumberMaskComponent, RollingNumberMaskProps } from './RollingNumber';

const MotionText = m(Text);

const maskCss = css`
  display: inline-flex;
  overflow: clip;
`;

export const DefaultRollingNumberMask: RollingNumberMaskComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberMaskProps>(
    ({ children, color = 'inherit', className, ...props }, ref) => (
      <MotionText ref={ref} className={cx(maskCss, className)} color={color} {...props}>
        {children}
      </MotionText>
    ),
  ),
);
