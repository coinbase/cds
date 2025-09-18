import { getMidnightDate } from './getMidnightDate';

/**
 * Takes an array of Dates and Date tuples for date ranges, and generates a flattened array of corresponding Date.getTime() numbers, with the time set to midnight. A number will be generated for every individual date within a date range.
 */
export const getTimesFromDatesAndRanges = (datesAndRanges: (Date | [Date, Date])[]) =>
  datesAndRanges.flatMap((value) => {
    if (value instanceof Date) return getMidnightDate(value).getTime();
    const [startDate, endDate] = value;
    const startDisabledDate = getMidnightDate(startDate);
    const endDisabledDate = getMidnightDate(endDate);
    const times = [];
    for (let date = startDisabledDate; date <= endDisabledDate; date.setDate(date.getDate() + 1)) {
      times.push(date.getTime());
    }
    return times;
  });
