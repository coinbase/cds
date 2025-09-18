const CHART_ANIMATED_PATH_DURATION = 450;

function easeOutQuint(x: number): number {
  return 1 - (1 - x) ** 5;
}

export const animatedPathConfig = {
  easing: easeOutQuint,
  duration: CHART_ANIMATED_PATH_DURATION,
};
