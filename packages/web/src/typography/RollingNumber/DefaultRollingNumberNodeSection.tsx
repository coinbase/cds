import { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { cx } from '../../cx';
import { Text } from '../Text';

import type {
  RollingNumberNodeSectionComponent,
  RollingNumberNodeSectionProps,
} from './RollingNumber';

const MotionText = m(Text);

const containerCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: pre;
`;

export const DefaultRollingNumberNodeSection: RollingNumberNodeSectionComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberNodeSectionProps>(
    ({ children, justifyContent = 'flex-start', style, className, color, ...props }, ref) => {
      return (
        <MotionText
          ref={ref}
          className={cx(containerCss, className)}
          color={color ?? 'inherit'}
          justifyContent={justifyContent}
          {...props}
        >
          {children}
        </MotionText>
      );
    },
  ),
);
