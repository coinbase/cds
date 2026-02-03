/** Upper limit for how much the drawer can be extended in length by panning */
export const MAX_OVER_DRAG = 40;
/** Maximum drag distance (in pixels) required to dismiss. */
export const DISMISSAL_DRAG_THRESHOLD = 150;
/** Velocity threshold (px/ms) for quick swipes to dismiss, regardless of distance dragged. */
export const DISMISSAL_VELOCITY_THRESHOLD = 0.8;
/** Minimum panning distance required to capture pan gesture */
export const MIN_PAN_DISTANCE = 2;
export const drawerAnimationDefaultDuration = 'moderate3';
export const animateDrawerInConfig = {
  toValue: 1,
  easing: 'enterFunctional',
  duration: drawerAnimationDefaultDuration,
};
export const animateDrawerOutConfig = {
  toValue: 0,
  easing: 'exitFunctional',
  duration: drawerAnimationDefaultDuration,
};
