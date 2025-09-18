import type { BaseTooltipPlacement, MotionBaseSpec } from '../types';

export const tooltipHiddenOpacity = 0;
export const tooltipVisibleOpacity = 1;

export const tooltipHiddenY = 16;
export const tooltipVisibleY = 0;

const baseTiming: Pick<MotionBaseSpec, 'duration' | 'delay'> = {
  duration: 'fast1',
  delay: 25,
};

export const animateInOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  ...baseTiming,
  easing: 'enterFunctional',
  toValue: tooltipVisibleOpacity,
  fromValue: tooltipHiddenOpacity,
};

export const animateOutOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  ...baseTiming,
  easing: 'exitFunctional',
  toValue: tooltipHiddenOpacity,
  fromValue: tooltipVisibleOpacity,
};

/**
 * Build tooltip translation config base on placement
 * @param placement Tooltip placement
 * @param transitionType animation type
 * @returns Motion config
 */
export const getTranslateConfigByPlacement = ({
  placement,
  isExiting = false,
}: {
  placement: BaseTooltipPlacement;
  isExiting?: boolean;
}): MotionBaseSpec => {
  let config;

  switch (placement) {
    case 'top':
      config = { property: 'translateY', fromValue: 16, toValue: 0 };
      break;
    case 'bottom':
      config = { property: 'translateY', fromValue: -16, toValue: 0 };
      break;
    case 'left':
      config = { property: 'translateX', fromValue: 16, toValue: 0 };
      break;
    case 'right':
      config = { property: 'translateX', fromValue: -16, toValue: 0 };
      break;
    default:
      config = { property: 'translateY', fromValue: 16, toValue: 0 };
  }

  // swap from and to value for exit config
  if (isExiting) {
    const tempValue = config.fromValue;
    config.fromValue = config.toValue;
    config.toValue = tempValue;
  }

  return { ...baseTiming, ...config, easing: isExiting ? 'exitFunctional' : 'enterFunctional' };
};
