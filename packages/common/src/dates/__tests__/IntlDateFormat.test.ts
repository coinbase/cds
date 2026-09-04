import { IntlDateFormat } from '../IntlDateFormat';

describe('IntlDateFormat', () => {
  const originalDate = new Date(2024, 1, 1);

  it('should initialize and function based on provided locale and separator', () => {
    const intlDateFormat = new IntlDateFormat({ locale: 'en-US', separator: '/' });

    expect(intlDateFormat.locale).toBe('en-US');
    expect(intlDateFormat.separator).toBe('/');
    expect(intlDateFormat.invalidDateFormatRegex).toEqual(new RegExp(`[^0-9/]`));
    expect(intlDateFormat.duplicateSeparatorRegex).toEqual(new RegExp(`/{2,}`, 'g'));
    expect(intlDateFormat.dateTimeFormat).toBeInstanceOf(Intl.DateTimeFormat);
    expect(intlDateFormat.dateTimeFormat.resolvedOptions().locale).toBe('en-US');
    expect(intlDateFormat.dateTimeFormatParts[0].type).toBe('month');
    expect(intlDateFormat.dateTimeFormatParts[1].type).toBe('literal');
    expect(intlDateFormat.dateTimeFormatParts[2].type).toBe('day');
    expect(intlDateFormat.dateTimeFormatParts[3].type).toBe('literal');
    expect(intlDateFormat.dateTimeFormatParts[4].type).toBe('year');
    expect(intlDateFormat.dateStringFormat).toBe('mm/dd/yyyy');
    expect(intlDateFormat.separatorIndices).toEqual([2, 5]);

    const dateString = intlDateFormat.format(originalDate);
    expect(dateString).toBe('02/01/2024');

    const date = intlDateFormat.date('02/01/2024');
    expect(date?.getTime()).toEqual(originalDate.getTime());
  });

  it('should initialize and function for different locale and separator', () => {
    const intlDateFormat = new IntlDateFormat({ locale: 'fr-CA', separator: '.' });

    expect(intlDateFormat.locale).toBe('fr-CA');
    expect(intlDateFormat.separator).toBe('.');
    expect(intlDateFormat.invalidDateFormatRegex).toEqual(new RegExp(`[^0-9.]`));
    expect(intlDateFormat.duplicateSeparatorRegex).toEqual(new RegExp(`.{2,}`, 'g'));
    expect(intlDateFormat.dateTimeFormat).toBeInstanceOf(Intl.DateTimeFormat);
    expect(intlDateFormat.dateTimeFormat.resolvedOptions().locale).toBe('fr-CA');
    expect(intlDateFormat.dateTimeFormatParts[0].type).toBe('year');
    expect(intlDateFormat.dateTimeFormatParts[1].type).toBe('literal');
    expect(intlDateFormat.dateTimeFormatParts[2].type).toBe('month');
    expect(intlDateFormat.dateTimeFormatParts[3].type).toBe('literal');
    expect(intlDateFormat.dateTimeFormatParts[4].type).toBe('day');
    expect(intlDateFormat.dateStringFormat).toBe('yyyy.mm.dd');
    expect(intlDateFormat.separatorIndices).toEqual([4, 7]);

    const dateString = intlDateFormat.format(originalDate);
    expect(dateString).toBe('2024.02.01');

    const date = intlDateFormat.date('2024.02.01');
    expect(date?.getTime()).toEqual(originalDate.getTime());
  });
});
