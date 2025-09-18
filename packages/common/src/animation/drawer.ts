/** Upper limit for how much the drawer can be extended in length by panning */
export const MAX_OVER_DRAG = 40;
/** Dragging a Drawer by more than this percentage of the Drawer will dismiss it */
export const DISMISSAL_DRAG_THRESHOLD = 150;
/** Quick swipes will dismiss the Tray, especially useful for Trays that are very short */
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
