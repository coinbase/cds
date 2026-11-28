import { act } from 'react';
import { renderHook } from '@testing-library/react';

import { DateInputValidationError } from '../DateInputValidationError';
import { IntlDateFormat } from '../IntlDateFormat';
import { type DateInputOptions, useDateInput } from '../useDateInput';

describe('useDateInput', () => {
  let options: DateInputOptions;
  let date: Date;
  let disabledDates: (Date | [Date, Date])[];
  let minDate: Date;
  let maxDate: Date;

  beforeEach(() => {
    date = new Date(2024, 1, 1);
    disabledDates = [new Date(2024, 1, 2), [new Date(2024, 1, 5), new Date(2024, 1, 7)]];
    minDate = new Date(2024, 0, 1);
    maxDate = new Date(2024, 2, 1);
    options = {
      date,
      onChangeDate: jest.fn(),
      error: null,
      onErrorDate: jest.fn(),
      intlDateFormat: new IntlDateFormat({ locale: 'en-US', separator: '/' }),
      required: false,
      disabledDates,
      minDate,
      maxDate,
      requiredError: 'This field is required',
      invalidDateError: 'Please enter a valid date',
      disabledDateError: 'Date unavailable',
    };
  });

  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useDateInput(options));
    expect(result.current.inputValue).toBe('02/01/2024');
    expect(result.current.placeholder).toBe('   /   /');
  });

  it('should handle onChangeDateInput enabled dates correctly', () => {
    const { result } = renderHook(() => useDateInput(options));

    act(() => {
      result.current.onChangeDateInput('02/03/2024');
    });
    expect(result.current.inputValue).toBe('02/03/2024');
    expect(options.onErrorDate).not.toHaveBeenCalled();
  });

  it('should handle onChangeDateInput disabled dates correctly', () => {
    const { result } = renderHook(() => useDateInput(options));
    act(() => {
      result.current.onChangeDateInput('11/16/1991');
    });
    expect(result.current.inputValue).toBe('11/16/1991');
    expect(options.onChangeDate).toHaveBeenCalledWith(null);
    expect(options.onErrorDate).toHaveBeenCalledWith(
      new DateInputValidationError('disabled', options.disabledDateError || ''),
    );
  });

  it('should handle onChangeDateInput minDate and maxDate correctly', () => {
    const { result } = renderHook(() => useDateInput(options));
    act(() => {
      result.current.onChangeDateInput('12/31/2023');
    });
    expect(result.current.inputValue).toBe('12/31/2023');
    expect(options.onChangeDate).toHaveBeenCalledWith(null);
    expect(options.onErrorDate).toHaveBeenCalledWith(
      new DateInputValidationError('disabled', options.disabledDateError || ''),
    );

    act(() => {
      result.current.onChangeDateInput('03/02/2024');
    });
    expect(result.current.inputValue).toBe('03/02/2024');
    expect(options.onChangeDate).toHaveBeenCalledWith(null);
    expect(options.onErrorDate).toHaveBeenCalledWith(
      new DateInputValidationError('disabled', options.disabledDateError || ''),
    );
  });

  it.each(['/', '-', '.'])(
    'should keep every digit typed one at a time with the "%s" separator',
    (separator) => {
      options.date = null;
      options.intlDateFormat = new IntlDateFormat({ locale: 'en-US', separator });
      const { result } = renderHook(() => useDateInput(options));

      for (const char of '08182024') {
        act(() => {
          result.current.onChangeDateInput(`${result.current.inputValue}${char}`);
        });
      }

      expect(result.current.inputValue).toBe(['08', '18', '2024'].join(separator));
    },
  );

  it('should handle invalid input text', () => {
    const { result } = renderHook(() => useDateInput(options));
    act(() => {
      result.current.onChangeDateInput('hello world');
    });
    expect(result.current.inputValue).toBe('02/01/2024');
    expect(options.onChangeDate).not.toHaveBeenCalled();
    expect(options.onErrorDate).not.toHaveBeenCalled();
  });

  it('should handle invalid date error', () => {
    const { result } = renderHook(() => useDateInput(options));
    act(() => {
      result.current.onChangeDateInput('99/99/9999');
    });
    expect(result.current.inputValue).toBe('99/99/9999');
    expect(options.onChangeDate).toHaveBeenCalledWith(null);
    expect(options.onErrorDate).toHaveBeenCalledWith(
      new DateInputValidationError('invalid', options.invalidDateError || ''),
    );
  });

  it('should handle required error', () => {
    const { result } = renderHook(() => useDateInput({ ...options, required: true }));
    act(() => {
      result.current.onChangeDateInput('1');
    });
    expect(result.current.inputValue).toBe('1');
    expect(options.onChangeDate).toHaveBeenCalledWith(null);
    const error = result.current.validateDateInput(result.current.inputValue);
    expect(error).toEqual(new DateInputValidationError('required', options.requiredError || ''));
  });

  describe('separator formatting', () => {
    const typeSequence = (
      result: { current: { onChangeDateInput: (value: string) => void } },
      values: string[],
    ) => {
      values.forEach((value) => {
        act(() => {
          result.current.onChangeDateInput(value);
        });
      });
    };

    const renderBlankInput = (intlDateFormat = options.intlDateFormat) => {
      const blankOptions: DateInputOptions = {
        ...options,
        date: null,
        disabledDates: undefined,
        minDate: undefined,
        maxDate: undefined,
        onChangeDate: jest.fn(),
        onErrorDate: jest.fn(),
        intlDateFormat,
      };
      const hook = renderHook(() => useDateInput(blankOptions));
      return { ...hook, blankOptions };
    };

    it('inserts separators while typing one character at a time', () => {
      const { result, blankOptions } = renderBlankInput();

      typeSequence(result, [
        '1',
        '10',
        '103',
        '10/31',
        '10/311',
        '10/31/19',
        '10/31/199',
        '10/31/1990',
      ]);

      expect(result.current.inputValue).toBe('10/31/1990');
      expect(blankOptions.onChangeDate).toHaveBeenCalledWith(new Date(1990, 9, 31));
    });

    it('inserts a skipped separator when Android emits several digits at once', () => {
      const { result, blankOptions } = renderBlankInput();

      typeSequence(result, ['1', '10', '103', '1031', '10311', '103119', '1031199', '10311990']);

      expect(result.current.inputValue).toBe('10/31/1990');
      expect(blankOptions.onChangeDate).toHaveBeenCalledWith(new Date(1990, 9, 31));
    });

    it('formats a shorter native string when it still contains a new digit', () => {
      const { result } = renderBlankInput();

      typeSequence(result, ['1', '10', '103', '1031', '10311']);
      expect(result.current.inputValue).toBe('10/31/1');

      act(() => {
        result.current.onChangeDateInput('10/3119');
      });

      expect(result.current.inputValue).toBe('10/31/19');
    });

    it('keeps a trailing separator while deleting and restores it on the next digit', () => {
      const { result } = renderBlankInput();

      typeSequence(result, ['1', '10', '103']);
      expect(result.current.inputValue).toBe('10/3');

      act(() => {
        result.current.onChangeDateInput('10/');
      });
      expect(result.current.inputValue).toBe('10/');

      act(() => {
        result.current.onChangeDateInput('10/3');
      });
      expect(result.current.inputValue).toBe('10/3');

      act(() => {
        result.current.onChangeDateInput('103');
      });
      expect(result.current.inputValue).toBe('103');

      act(() => {
        result.current.onChangeDateInput('1031');
      });
      expect(result.current.inputValue).toBe('10/31');
    });

    it('ignores a separator typed before one is expected', () => {
      const { result } = renderBlankInput();

      act(() => {
        result.current.onChangeDateInput('1');
      });
      act(() => {
        result.current.onChangeDateInput('1/');
      });

      expect(result.current.inputValue).toBe('1');
    });

    it('formats year-first locales from the digits', () => {
      const { result, blankOptions } = renderBlankInput(
        new IntlDateFormat({ locale: 'fr-CA', separator: '.' }),
      );

      act(() => {
        result.current.onChangeDateInput('19901231');
      });

      expect(result.current.inputValue).toBe('1990.12.31');
      expect(blankOptions.onChangeDate).toHaveBeenCalledWith(new Date(1990, 11, 31));
    });
  });
});
