import { createMotionConfig } from './tokens';
/**
 * Motion specs
 * @link https://coda.io/d/Motion-Foundations_d5KlLHcBPlL/CDS-Dots_suq2C#_luRZr
 */
export const dotOpacityEnterConfig = createMotionConfig('fadeIn', 'moderate1');
export const dotScaleEnterConfig = createMotionConfig('scaleUpS', 'moderate1');

export const dotOpacityExitConfig = createMotionConfig('fadeOut', 'moderate1');
export const dotScaleExitConfig = createMotionConfig('scaleDownS', 'moderate1');
