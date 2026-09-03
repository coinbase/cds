type ItemShape = {
  createdAt: string;
  name: string;
};

/**
 * Compares two items based on their creation timestamp and, in case of a tie, their names.
 *
 * @param {ItemShape} prev - The first item to compare.
 * @param {ItemShape} next - The second item to compare.
 * @returns {number} A negative number if `prev` comes before `next`, a positive number if `prev` comes after `next`, or 0 if they are equivalent.
 */
export function sortByCreatedAt(prev: ItemShape, next: ItemShape) {
  const prevDate = new Date(prev.createdAt).valueOf();
  const nextDate = new Date(next.createdAt).valueOf();
  const dateDiff = prevDate - nextDate;

  if (dateDiff !== 0) {
    return dateDiff;
  }

  return prev.name.localeCompare(next.name);
}
