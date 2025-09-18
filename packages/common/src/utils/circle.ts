export function getRadius(containerSize: number, strokeWidth = 0) {
  return containerSize / 2 - strokeWidth / 2;
}

export function getCircumference(radius: number) {
  return 2 * Math.PI * radius;
}

// size is diameter + strokeWidth
export function getCenter(containerSize: number) {
  return containerSize / 2;
}
