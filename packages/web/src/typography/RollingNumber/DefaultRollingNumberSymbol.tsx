import { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { cx } from '../../cx';
import { Text } from '../Text';

import type { RollingNumberSymbolComponent, RollingNumberSymbolProps } from './RollingNumber';

const MotionText = m(Text);

const containerCss = css`
  display: inline-block;
  white-space: pre;
  align-items: center;
`;

export const DefaultRollingNumberSymbol: RollingNumberSymbolComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberSymbolProps>(
    ({ value, color = 'inherit', className, ...props }, ref) => {
      return (
        <MotionText ref={ref} className={cx(containerCss, className)} {...props}>
          {value}
        </MotionText>
      );
    },
  ),
);
