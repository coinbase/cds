import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import { IntlDateFormat } from '@coinbase/cds-common/dates/IntlDateFormat';
import { type DateInputOptions, useDateInput } from '@coinbase/cds-common/dates/useDateInput';
import { useLocale } from '@coinbase/cds-common/system/LocaleProvider';

import { TextInput, type TextInputBaseProps, type TextInputProps } from '../controls/TextInput';
import { VStack } from '../layout/VStack';

export type DateInputBaseProps = Omit<DateInputOptions, 'intlDateFormat'> &
  Omit<TextInputBaseProps, 'inputNode' | 'value' | 'defaultValue' | 'style'> & {
    /** Date format separator character, e.g. the / in "MM/DD/YYYY". Defaults to forward slash (/). */
    separator?: string;
  };

export type DateInputProps = DateInputBaseProps &
  Omit<TextInputProps, 'inputNode' | 'value' | 'defaultValue' | 'style'> & {
    className?: string;
    style?: React.CSSProperties;
  };

export const DateInput = memo(
  forwardRef<HTMLInputElement, DateInputProps>(
    (
      {
        date,
        onChangeDate,
        error,
        onErrorDate,
        required,
        separator = '/',
        disabledDates,
        minDate,
        maxDate,
        requiredError,
        invalidDateError,
        disabledDateError,
        start,
        end,
        placeholder,
        helperText,
        variant,
        className,
        style,
        onClick,
        onChange,
        onBlur,
        testIDMap,
        ...props
      },
      ref,
    ) => {
      const hasTyped = useRef(Boolean(date));
      const { locale } = useLocale();
      const intlDateFormat = useMemo(
        () => new IntlDateFormat({ locale, separator }),
        [locale, separator],
      );

      const {
        inputValue,
        onChangeDateInput,
        validateDateInput,
        placeholder: defaultPlaceholder,
      } = useDateInput({
        date,
        onChangeDate,
        error,
        onErrorDate,
        intlDateFormat,
        required,
        disabledDates,
        minDate,
        maxDate,
        requiredError,
        invalidDateError,
        disabledDateError,
      });

      /**
       * Be careful to preserve the correct event orders
       *   1. Typing a date in a blank DateInput:                     onChange -> onChange -> ... -> onChangeDate -> onErrorDate
       *   2. Typing a date in a DateInput that already had a date:   onChange -> onChangeDate -> onChange -> onChange -> ... -> onChangeDate -> onErrorDate
       */

      const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
          onBlur?.(event);
          if (!required || !hasTyped.current) return;
          const error = validateDateInput(event.target.value);
          if (error) onErrorDate(error);
        },
        [onBlur, required, validateDateInput, onErrorDate],
      );

      const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          hasTyped.current = true;
          onChange?.(event);
          onChangeDateInput(event.target.value);
        },
        [onChange, onChangeDateInput],
      );

      return (
        <VStack className={className} minWidth={164} style={style} width="100%">
          <TextInput
            ref={ref}
            {...props}
            end={end}
            helperText={helperText || error?.message || intlDateFormat.dateStringFormat}
            onBlur={handleBlur}
            onChange={handleChange}
            onClick={onClick}
            placeholder={placeholder || defaultPlaceholder}
            start={start}
            testIDMap={testIDMap}
            value={inputValue}
            variant={variant || (error ? 'negative' : undefined)}
          />
        </VStack>
      );
    },
  ),
);
