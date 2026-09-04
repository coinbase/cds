import { useMemo } from 'react';
import {
  animateInMaxSizeConfig,
  animateInOpacityConfig,
  animateOutMaxSizeConfig,
  animateOutOpacityConfig,
} from '@coinbase/cds-common/animation/collapsible';

import { useMotionProps } from '../motion/useMotionProps';

import type { CollapsibleProps } from './Collapsible';

export const useCollapsibleMotionProps = ({
  collapsed,
  direction = 'vertical',
  dangerouslyDisableOverflowHidden,
}: Pick<CollapsibleProps, 'collapsed' | 'direction' | 'dangerouslyDisableOverflowHidden'>) => {
  const defaultStyle = useMemo(() => {
    // overflow: hidden is needed for enter animation to have correct masking effect as the element height grows
    // the consumer must dangerously opt-out of this behavior
    return dangerouslyDisableOverflowHidden ? {} : { overflow: 'hidden' };
  }, [dangerouslyDisableOverflowHidden]);

  return useMotionProps({
    enterConfigs: [
      animateInOpacityConfig[direction],
      { ...animateInMaxSizeConfig[direction], toValue: 'auto' },
    ],
    exitConfigs: {
      tokens: [animateOutOpacityConfig[direction], animateOutMaxSizeConfig[direction]],
    },
    style: defaultStyle,
    // prevent animation on mount
    initial: false,
    animate: collapsed ? 'exit' : 'enter',
  });
};
