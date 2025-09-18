/**
 * IntlDateFormat is a utility class that uses the Intl.DateTimeFormat API to determine the date format for a given locale.
 * It can be used to parse and format date strings based on the locale's date format.
 * @param locale A valid JavaScript Intl locale used to determine the date format.
 * @param separator Character used to separate values in the date format, e.g. the forward slash in "MM/DD/YYYY".
 * @example
 * const intlDateFormat = new IntlDateFormat({ locale: 'en-US', separator: '/' });
 * const date = intlDateFormat.date('12/31/2020');
 * const dateString = intlDateFormat.format(new Date());
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */
export class IntlDateFormat {
  /** A valid JavaScript Intl locale used to determine the date format. */
  locale: string;

  /** Character used to separate values in the date format, e.g. the forward slash in "MM/DD/YYYY". */
  separator: string;

  /** The indices of the separator characters in the date format. */
  separatorIndices: number[];

  /** Matches any character except digits and the separator character. */
  invalidDateFormatRegex: RegExp;

  /** Matches two or more consecutive separator characters. */
  duplicateSeparatorRegex: RegExp;

  /** Intl.DateTimeFormat class for the locale. */
  dateTimeFormat: Intl.DateTimeFormat;

  /** Array of Intl.DateTimeFormatParts - including day, month, year, and separators. */
  dateTimeFormatParts: Intl.DateTimeFormatPart[];

  /** The date format, based on the locale and including separator characters, e.g. "MM/DD/YYYY". */
  dateStringFormat: string;

  static datePartTypeMap: {
    [key in Intl.DateTimeFormatPartTypes]?: string;
  } = {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  };

  constructor(props: { locale: string; separator: string }) {
    this.locale = props.locale;
    this.separator = props.separator;

    this.invalidDateFormatRegex = new RegExp(`[^0-9${this.separator}]`);
    this.duplicateSeparatorRegex = new RegExp(`${this.separator}{2,}`, 'g');
    this.dateTimeFormat = new Intl.DateTimeFormat(props.locale);
    this.dateTimeFormatParts = this.dateTimeFormat.formatToParts(new Date());

    this.dateStringFormat = this.dateTimeFormatParts
      .map((part) => IntlDateFormat.datePartTypeMap[part.type])
      .filter(Boolean)
      .join(this.separator);

    this.separatorIndices = this.dateStringFormat
      .split('')
      .map((char, index) => (char === this.separator ? index : undefined))
      .filter(Boolean) as unknown as number[];
  }

  /**
   * Converts a valid date string to a Date object based on the locale's date format.
   */
  date(dateString: string): Date | null {
    const dateValues = dateString.split(this.separator);

    const { year, month, day } = this.dateTimeFormatParts
      .filter((part) => part.type !== 'literal')
      .reduce(
        (acc, part, index) => {
          acc[part.type] = parseInt(dateValues[index], 10);
          return acc;
        },
        {} as { [key in Intl.DateTimeFormatPartTypes]: number },
      );

    const date = new Date(year, month - 1, day);

    // Ignore technically valid date inputs like `30/30/2015` that would cause the month or year to roll over
    if (date.getMonth() !== month - 1 || date.getFullYear() !== year) return null;
    return date;
  }

  /**
   * Converts a Date object to a date string based on the locale's date format.
   */
  format(date: Date): string {
    return this.dateTimeFormat
      .formatToParts(date)
      .map((part) =>
        part.type === 'literal'
          ? this.separator
          : part.type === 'year'
            ? date.getFullYear()
            : part.value.padStart(2, '0'),
      )
      .join('');
  }
}
