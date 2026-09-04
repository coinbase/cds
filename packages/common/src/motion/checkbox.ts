import { createMotionConfig } from './tokens';
/**
 * Motion specs
 * @link https://coda.io/d/Motion-Foundations_d5KlLHcBPlL/CDS-Check-Box_suHNC#_luS1p
 */
export const checkboxOpacityEnterConfig = createMotionConfig('fadeIn', 'moderate1');
export const checkboxScaleEnterConfig = createMotionConfig('scaleUpS', 'moderate1');

export const checkboxOpacityExitConfig = createMotionConfig('fadeOut', 'moderate1');
export const checkboxScaleExitConfig = createMotionConfig('scaleDownS', 'moderate1');
