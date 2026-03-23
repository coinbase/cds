import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import {
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInput as NativeTextInput,
  type TextInputChangeEventData,
  type TextInputEndEditingEventData,
  type TextInputFocusEventData,
  type ViewStyle,
} from 'react-native';
import { IntlDateFormat } from '@coinbase/cds-common/dates/IntlDateFormat';
import { type DateInputOptions, useDateInput } from '@coinbase/cds-common/dates/useDateInput';
import { useLocale } from '@coinbase/cds-common/system/LocaleProvider';

import { TextInput, type TextInputProps } from '../controls/TextInput';
import { VStack } from '../layout/VStack';

export type DateInputProps = {
  /** Date format separator character, e.g. the / in "MM/DD/YYYY". Defaults to forward slash (/). */
  separator?: string;
  style?: StyleProp<ViewStyle>;
} & Omit<DateInputOptions, 'intlDateFormat'> &
  Omit<TextInputProps, 'inputNode' | 'value' | 'defaultValue' | 'style'>;

export const DateInput = memo(
  forwardRef<NativeTextInput, DateInputProps>(
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
        onBlur,
        onChange,
        onEndEditing,
        testIDMap,
        style,
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
        (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
          onBlur?.(event);
          if (!required || !hasTyped.current) return;
          const error = validateDateInput(inputValue);
          if (error) onErrorDate(error);
        },
        [onBlur, required, validateDateInput, inputValue, onErrorDate],
      );

      const handleEndEditing = useCallback(
        (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
          onEndEditing?.(event);
          if (!required || !hasTyped.current) return;
          const error = validateDateInput(inputValue);
          if (error) onErrorDate(error);
        },
        [onEndEditing, required, validateDateInput, inputValue, onErrorDate],
      );

      const handleChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
          hasTyped.current = true;
          onChange?.(event);
          onChangeDateInput(event.nativeEvent.text);
        },
        [onChange, onChangeDateInput],
      );

      return (
        <VStack minWidth={164} style={style} width="100%">
          <TextInput
            ref={ref}
            {...props}
            end={end}
            helperText={helperText || error?.message || intlDateFormat.dateStringFormat}
            keyboardType="number-pad"
            onBlur={handleBlur}
            onChange={handleChange}
            onEndEditing={handleEndEditing}
            placeholder={placeholder || defaultPlaceholder}
            returnKeyType="done"
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
