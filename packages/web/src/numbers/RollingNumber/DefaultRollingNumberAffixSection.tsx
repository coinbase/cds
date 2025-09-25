import { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { cx } from '../../cx';
import { Text } from '../../typography/Text';

import type {
  RollingNumberAffixSectionComponent,
  RollingNumberAffixSectionProps,
} from './RollingNumber';

const MotionText = m(Text);

const containerCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: pre;
`;

export const DefaultRollingNumberAffixSection: RollingNumberAffixSectionComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberAffixSectionProps>(
    ({ children, color = 'inherit', justifyContent = 'flex-start', className, ...props }, ref) => {
      return (
        <MotionText
          ref={ref}
          className={cx(containerCss, className)}
          color={color}
          justifyContent={justifyContent}
          {...props}
        >
          {children}
        </MotionText>
      );
    },
  ),
);
