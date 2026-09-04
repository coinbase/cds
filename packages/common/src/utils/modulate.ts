// copied from https://medium.com/the-school-of-do/framer-cheat-sheets-utils-modulate-b88e359fdcc6
// typescriptified by @KatMartinez

type ModulateRange = {
  inputRange: [number, number];
  outputRange: [number, number];
  clamp: boolean;
};

/** create incremental transformations based on user interaction */
export const modulate = (
  value: number,
  { inputRange, outputRange, clamp = false }: ModulateRange,
): number => {
  const [fromLow, fromHigh] = inputRange;
  const [toLow, toHigh] = outputRange;
  const result = toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
  if (clamp) {
    if (toLow < toHigh) {
      if (result < toLow) {
        return toLow;
      }
      if (result > toHigh) {
        return toHigh;
      }
    } else {
      if (result > toLow) {
        return toLow;
      }
      if (result < toHigh) {
        return toHigh;
      }
    }
  }
  return result;
};
