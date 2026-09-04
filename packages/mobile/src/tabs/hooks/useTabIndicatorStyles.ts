import { animateTabIndicatorBaseSpec } from '@coinbase/cds-common/animation/tabs';

import { useAnimatedTransition } from '../../hooks/useAnimatedTransition';
import type { TabIndicatorProps } from '../TabIndicator';

export const useTabIndicatorStyles = ({ width, x }: Pick<TabIndicatorProps, 'width' | 'x'>) => {
  const animatedWidth = useAnimatedTransition(width, animateTabIndicatorBaseSpec);
  const widthStyle = { transform: [{ translateX: animatedWidth }] };

  const animatedX = useAnimatedTransition(x, animateTabIndicatorBaseSpec);
  const xStyle = { transform: [{ translateX: animatedX }] };

  return { widthStyle, xStyle };
};
