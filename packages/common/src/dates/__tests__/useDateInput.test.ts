import { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';

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
});
