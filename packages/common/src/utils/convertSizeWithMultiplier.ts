/** Take a width, height object return the same object with a multiplier applied. */
export function convertSizeWithMultiplier(
  size: { width: number; height: number },
  multiplier: number,
) {
  return {
    width: size.width * multiplier,
    height: size.height * multiplier,
  };
}
