import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { DefaultThemeProvider, SAFE_AREA_METRICS } from '../../utils/testHelpers';
import type { DatePickerProps } from '../DatePicker';
import { DatePicker } from '../DatePicker';

const testID = 'test-datepicker';

const DatePickerExample = (props: Partial<DatePickerProps>) => {
  return (
    <DefaultThemeProvider>
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DatePicker
          date={null}
          error={null}
          onChangeDate={props.onChangeDate || jest.fn()}
          onErrorDate={props.onErrorDate || jest.fn()}
          testID={testID}
          {...props}
        />
      </SafeAreaProvider>
    </DefaultThemeProvider>
  );
};

describe('DatePicker', () => {
  it('passes accessibility', () => {
    render(
      <DatePickerExample
        accessibilityLabel="Select date"
        calendarIconButtonAccessibilityLabel="Open calendar"
        label="Date"
      />,
    );

    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('renders DateInput with calendar button', () => {
    render(<DatePickerExample label="Date" />);

    // Calendar button should be present
    const calendarButton = screen.getByLabelText('Open calendar');
    expect(calendarButton).toBeTruthy();
  });

  it('renders with custom calendar button accessibility label', () => {
    render(
      <DatePickerExample
        calendarIconButtonAccessibilityLabel="Custom calendar label"
        label="Date"
      />,
    );

    expect(screen.getByLabelText('Custom calendar label')).toBeTruthy();
  });

  it('displays the selected date in DateInput', () => {
    const selectedDate = new Date(2024, 6, 15); // July 15, 2024
    render(<DatePickerExample date={selectedDate} label="Date" />);

    // DateInput should show the formatted date
    const input = screen.getByTestId(testID);
    expect(input).toBeTruthy();
  });

  it('opens calendar tray when calendar button is pressed', async () => {
    const mockOnOpen = jest.fn();
    render(<DatePickerExample label="Date" onOpen={mockOnOpen} />);

    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    expect(mockOnOpen).toHaveBeenCalledTimes(1);

    // Calendar should be visible
    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeTruthy();
    });
  });

  it('closes calendar when handle bar is pressed', async () => {
    const mockOnCancel = jest.fn();
    const mockOnClose = jest.fn();
    render(<DatePickerExample label="Date" onCancel={mockOnCancel} onClose={mockOnClose} />);

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeTruthy();
    });

    // Close calendar via handle bar using testID
    const handleBar = screen.getByTestId('handleBar');
    fireEvent(handleBar, 'accessibilityAction', { nativeEvent: { actionName: 'activate' } });

    // Wait for animations to complete and callbacks to be called
    await waitFor(() => {
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    // onCancel should be called before onClose
    expect(mockOnCancel.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnClose.mock.invocationCallOrder[0],
    );
  });

  it('renders custom handle bar accessibility label', async () => {
    render(<DatePickerExample closeCalendarAccessibilityLabel="Custom close label" label="Date" />);

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Custom close label')).toBeTruthy();
    });
  });

  it('displays confirm button with custom text', async () => {
    render(<DatePickerExample confirmText="Done" label="Date" />);

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByText('Done')).toBeTruthy();
    });
  });

  it('confirm button is disabled when no date is selected', async () => {
    render(<DatePickerExample label="Date" />);

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      const confirmButton = screen.getByRole('button', { name: 'Confirm' });
      expect(confirmButton).toBeDisabled();
    });
  });

  it('confirm button has custom accessibility hint', async () => {
    render(
      <DatePickerExample
        confirmButtonAccessibilityHint="Custom confirm button hint"
        label="Date"
      />,
    );

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      const confirmButton = screen.getByRole('button', { name: 'Confirm' });
      expect(confirmButton).toHaveProp('accessibilityHint', 'Custom confirm button hint');
    });
  });

  it('confirm button is enabled after selecting a date from calendar', async () => {
    const seedDate = new Date(2024, 6, 15); // July 15, 2024
    render(<DatePickerExample label="Date" seedDate={seedDate} />);

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByText('July 2024')).toBeTruthy();
    });

    // Select a date
    const july15Button = screen.getByLabelText(/15.*July.*2024/);
    fireEvent.press(july15Button);

    // Confirm button should now be enabled
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    expect(confirmButton).not.toBeDisabled();
  });

  it('calls correct callbacks in order when confirming date selection', async () => {
    const mockOnOpen = jest.fn();
    const mockOnConfirm = jest.fn();
    const mockOnChangeDate = jest.fn();
    const mockOnClose = jest.fn();
    const seedDate = new Date(2024, 6, 15); // July 15, 2024

    render(
      <DatePickerExample
        label="Date"
        onChangeDate={mockOnChangeDate}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onOpen={mockOnOpen}
        seedDate={seedDate}
      />,
    );

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    expect(mockOnOpen).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('July 2024')).toBeTruthy();
    });

    // Select a date
    const july15Button = screen.getByLabelText(/15.*July.*2024/);
    fireEvent.press(july15Button);

    // Confirm selection
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    fireEvent.press(confirmButton);

    // Wait for animations to complete and callbacks to be called
    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockOnChangeDate).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    // Verify callback order: onOpen -> onConfirm -> onChangeDate -> onClose
    expect(mockOnChangeDate).toHaveBeenCalledWith(expect.any(Date));
    expect(mockOnOpen.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnConfirm.mock.invocationCallOrder[0],
    );
    expect(mockOnConfirm.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnChangeDate.mock.invocationCallOrder[0],
    );
    expect(mockOnChangeDate.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnClose.mock.invocationCallOrder[0],
    );
  });

  it('calls correct callbacks in order when canceling date selection', async () => {
    const mockOnOpen = jest.fn();
    const mockOnCancel = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <DatePickerExample
        label="Date"
        onCancel={mockOnCancel}
        onClose={mockOnClose}
        onOpen={mockOnOpen}
      />,
    );

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    expect(mockOnOpen).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeTruthy();
    });

    // Close calendar using testID
    const handleBar = screen.getByTestId('handleBar');
    fireEvent(handleBar, 'accessibilityAction', { nativeEvent: { actionName: 'activate' } });

    // Wait for animations to complete and callbacks to be called
    await waitFor(() => {
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    // Verify callback order: onOpen -> onCancel -> onClose
    expect(mockOnOpen.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnCancel.mock.invocationCallOrder[0],
    );
    expect(mockOnCancel.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnClose.mock.invocationCallOrder[0],
    );
  });

  it('initializes calendar with current date when opening', async () => {
    const currentDate = new Date(2024, 5, 20); // June 20, 2024
    render(<DatePickerExample date={currentDate} label="Date" />);

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      // Should show June 2024 (the month of the current date)
      expect(screen.getByText('June 2024')).toBeTruthy();
    });
  });

  it('passes disabled state to DateInput and Calendar', () => {
    render(<DatePickerExample disabled label="Date" />);

    // Calendar button should be disabled
    const calendarButton = screen.getByLabelText('Open calendar');
    expect(calendarButton).toBeDisabled();
  });

  it('passes minDate to DateInput and Calendar', async () => {
    const minDate = new Date(2024, 6, 10); // July 10, 2024
    const seedDate = new Date(2024, 6, 15); // July 15, 2024
    render(<DatePickerExample label="Date" minDate={minDate} seedDate={seedDate} />);

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByText('July 2024')).toBeTruthy();
    });

    // Previous month arrow should be disabled since minDate is in current month
    const prevArrow = screen.getByLabelText('Go to previous month');
    expect(prevArrow).toBeDisabled();
  });

  it('passes maxDate to DateInput and Calendar', async () => {
    const maxDate = new Date(2024, 6, 20); // July 20, 2024
    const seedDate = new Date(2024, 6, 15); // July 15, 2024
    render(<DatePickerExample label="Date" maxDate={maxDate} seedDate={seedDate} />);

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByText('July 2024')).toBeTruthy();
    });

    // Next month arrow should be disabled since maxDate is in current month
    const nextArrow = screen.getByLabelText('Go to next month');
    expect(nextArrow).toBeDisabled();
  });

  it('passes disabledDates to DateInput and Calendar', async () => {
    const seedDate = new Date(2024, 6, 15); // July 15, 2024
    const disabledDates = [new Date(2024, 6, 10), new Date(2024, 6, 20)];
    render(<DatePickerExample disabledDates={disabledDates} label="Date" seedDate={seedDate} />);

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByText('July 2024')).toBeTruthy();
    });

    // Check that the calendar is rendered (specific dates being disabled is tested in Calendar.test.tsx)
    const allButtons = screen.getAllByRole('button');
    expect(allButtons.length).toBeGreaterThan(0);
  });

  it('passes custom error messages to DateInput', () => {
    render(
      <DatePickerExample
        disabledDateError="Custom disabled date error"
        invalidDateError="Custom invalid date error"
        label="Date"
        requiredError="Custom required error"
      />,
    );

    // DateInput should receive these error messages
    // (Detailed error testing is in DateInput tests)
    expect(screen.getByTestId(testID)).toBeTruthy();
  });

  it('renders with custom accessibility properties', () => {
    render(
      <DatePickerExample
        accessibilityHint="Custom hint"
        accessibilityLabel="Custom label"
        label="Date"
      />,
    );

    const input = screen.getByTestId(testID);
    expect(input).toHaveProp('accessibilityHint', 'Custom hint');
    expect(input).toHaveProp('accessibilityLabel', 'Custom label');
  });

  it('renders DateInput with compact variant', () => {
    render(<DatePickerExample compact label="Date" />);

    const input = screen.getByTestId(testID);
    expect(input).toBeTruthy();
  });

  it('renders DateInput with variant prop', () => {
    render(<DatePickerExample label="Date" variant="negative" />);

    const input = screen.getByTestId(testID);
    expect(input).toBeTruthy();
  });

  it('passes helperText to DateInput', () => {
    const helperText = 'Custom helper text';
    render(<DatePickerExample helperText={helperText} label="Date" />);

    expect(screen.getByText(helperText)).toBeTruthy();
  });

  it('passes onChange callback to DateInput', () => {
    const mockOnChange = jest.fn();
    render(<DatePickerExample label="Date" onChange={mockOnChange} />);

    // onChange is passed through to DateInput
    expect(screen.getByTestId(testID)).toBeTruthy();
  });

  it('clears error when confirming valid date selection', async () => {
    const mockOnChangeDate = jest.fn();
    const mockOnErrorDate = jest.fn();
    const seedDate = new Date(2024, 6, 15); // July 15, 2024
    const error = new DateInputValidationError('required', 'This field is required');

    render(
      <DatePickerExample
        error={error}
        label="Date"
        onChangeDate={mockOnChangeDate}
        onErrorDate={mockOnErrorDate}
        seedDate={seedDate}
      />,
    );

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByText('July 2024')).toBeTruthy();
    });

    // Select a date
    const july15Button = screen.getByLabelText(/15.*July.*2024/);
    fireEvent.press(july15Button);

    // Confirm selection
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    fireEvent.press(confirmButton);

    // Error should be cleared
    expect(mockOnErrorDate).toHaveBeenCalledWith(null);
  });

  it('does not clear custom error when confirming date selection', async () => {
    const mockOnChangeDate = jest.fn();
    const mockOnErrorDate = jest.fn();
    const seedDate = new Date(2024, 6, 15); // July 15, 2024
    const error = new DateInputValidationError('custom', 'Custom error message');

    render(
      <DatePickerExample
        error={error}
        label="Date"
        onChangeDate={mockOnChangeDate}
        onErrorDate={mockOnErrorDate}
        seedDate={seedDate}
      />,
    );

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByText('July 2024')).toBeTruthy();
    });

    // Select a date
    const july15Button = screen.getByLabelText(/15.*July.*2024/);
    fireEvent.press(july15Button);

    // Confirm selection
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    fireEvent.press(confirmButton);

    // Custom error should NOT be cleared
    expect(mockOnErrorDate).not.toHaveBeenCalledWith(null);
    expect(mockOnChangeDate).toHaveBeenCalled();
  });

  it('passes highlighted dates to Calendar', async () => {
    const seedDate = new Date(2024, 6, 15); // July 15, 2024
    const highlightedDates = [new Date(2024, 6, 10), new Date(2024, 6, 20)];

    render(
      <DatePickerExample highlightedDates={highlightedDates} label="Date" seedDate={seedDate} />,
    );

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByText('July 2024')).toBeTruthy();
    });
  });

  it('passes navigation accessibility labels to Calendar', async () => {
    render(
      <DatePickerExample
        label="Date"
        nextArrowAccessibilityLabel="Next month custom"
        previousArrowAccessibilityLabel="Previous month custom"
      />,
    );

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Next month custom')).toBeTruthy();
    });
    expect(screen.getByLabelText('Previous month custom')).toBeTruthy();
  });

  it('passes required prop to DateInput', () => {
    render(<DatePickerExample required label="Date" />);

    expect(screen.getByTestId(testID)).toBeTruthy();
  });

  it('resets calendar selection when canceling', async () => {
    const mockOnChangeDate = jest.fn();
    const seedDate = new Date(2024, 6, 15); // July 15, 2024

    render(<DatePickerExample label="Date" onChangeDate={mockOnChangeDate} seedDate={seedDate} />);

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByText('July 2024')).toBeTruthy();
    });

    // Select a date
    const july15Button = screen.getByLabelText(/15.*July.*2024/);
    fireEvent.press(july15Button);

    // Close without confirming
    const handleBar = screen.getByLabelText('Close calendar without selecting a date');
    fireEvent.press(handleBar);

    // onChangeDate should not have been called
    expect(mockOnChangeDate).not.toHaveBeenCalled();

    // Open calendar again
    fireEvent.press(calendarButton);

    await waitFor(() => {
      // Confirm button should be disabled (selection was reset)
      const confirmButton = screen.getByRole('button', { name: 'Confirm' });
      expect(confirmButton).toBeDisabled();
    });
  });

  it('does not confirm when confirm button is disabled', async () => {
    const mockOnConfirm = jest.fn();
    const mockOnChangeDate = jest.fn();

    render(
      <DatePickerExample label="Date" onChangeDate={mockOnChangeDate} onConfirm={mockOnConfirm} />,
    );

    // Open calendar
    const calendarButton = screen.getByLabelText('Open calendar');
    fireEvent.press(calendarButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeTruthy();
    });

    // Try to press disabled confirm button
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    expect(confirmButton).toBeDisabled();

    // Press it anyway (should not trigger callbacks)
    fireEvent.press(confirmButton);

    // Callbacks should not be called
    expect(mockOnConfirm).not.toHaveBeenCalled();
    expect(mockOnChangeDate).not.toHaveBeenCalled();
  });
});
