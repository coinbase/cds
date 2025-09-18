/**
 * Formats a count number into a string representation.
 * @param count - The count number to be formatted.
 * @returns The formatted count as a string.
 *
 * @example
 * // returns '999'
 * formatCount(999)
 *
 * @example
 * // returns '1.5K'
 * formatCount(1500)
 *
 * @example
 * // returns '1.5M
 * formatCount(1500000)
 * @example
 * // returns '1.5B'
 * formatCount(1500000000)
 *
 * @example
 * // returns '1.5T'
 * formatCount(1500000000000)
 */
export const formatCount = (count: number) => {
  let divisor = 1;
  let label = '';

  if (count >= 1000000000000) {
    divisor = 1000000000000;
    label = 'T';
  } else if (count >= 1000000000) {
    divisor = 1000000000;
    label = 'B';
  } else if (count >= 1000000) {
    divisor = 1000000;
    label = 'M';
  } else if (count >= 1000) {
    divisor = 1000;
    label = 'K';
  }

  const v = Math.floor((count / divisor) * 10) / 10;
  return `${v}${label}`;
};
