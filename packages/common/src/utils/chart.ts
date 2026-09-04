export const minMax = <T>(data: T[], dataToNumFn: (data: T) => number) => {
  let min: T | undefined;
  let max: T | undefined;

  for (const datum of data) {
    const value = dataToNumFn(datum);

    if (min === undefined || value < dataToNumFn(min)) {
      min = datum;
    }
    if (max === undefined || value > dataToNumFn(max)) {
      max = datum;
    }
  }

  return [min, max];
};
