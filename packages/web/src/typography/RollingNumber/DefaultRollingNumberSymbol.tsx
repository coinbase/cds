import { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { Text } from '../Text';

import type { RollingNumberSymbolComponent, RollingNumberSymbolProps } from './RollingNumber';

const MotionText = m(Text);

const containerCss = css`
  color: inherit;
  display: inline-block;
  white-space: pre;
  align-items: center;
`;

export const DefaultRollingNumberSymbol: RollingNumberSymbolComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberSymbolProps>(({ value, ...props }, ref) => {
    return (
      <MotionText ref={ref} className={containerCss} {...props}>
        {value}
      </MotionText>
    );
  }),
);
