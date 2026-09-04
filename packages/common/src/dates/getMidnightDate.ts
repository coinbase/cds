/**
 * Clones a Date with the time set to midnight (00:00:00.000)
 */
export const getMidnightDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());
