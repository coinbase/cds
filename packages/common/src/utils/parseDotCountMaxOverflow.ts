// If a badge count is greater than max (optional, defaults at 99), it should
// truncate the numbers so its x+.
export const MAX_OVERFLOW_COUNT = 99;

export const parseDotCountMaxOverflow = (count: number, max: number = MAX_OVERFLOW_COUNT) => {
  return count <= max ? count : `${max}+`;
};
