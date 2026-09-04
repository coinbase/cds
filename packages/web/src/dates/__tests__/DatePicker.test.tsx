import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { DatePicker, type DatePickerProps } from '../DatePicker';

const DatePickerExample = (props: Partial<DatePickerProps>) => {
  return (
    <DefaultThemeProvider>
      <DatePicker
        date={null}
        error={null}
        onChangeDate={props.onChangeDate ?? jest.fn()}
        onErrorDate={props.onErrorDate ?? jest.fn()}
        {...props}
      />
    </DefaultThemeProvider>
  );
};

describe('DatePicker size', () => {
  it('defaults to size "l" when neither size nor compact is set', () => {
    render(<DatePickerExample label="Date" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', 'l');
  });

  it.each(['s', 'm', 'l'] as const)('forwards size="%s" through to the input', (size) => {
    render(<DatePickerExample label="Date" size={size} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', size);
  });

  it('resolves compact alone to size "s" while keeping data-compact', () => {
    render(<DatePickerExample compact label="Date" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-size', 's');
    expect(input).toHaveAttribute('data-compact', 'true');
  });

  it('lets size win over compact', () => {
    render(<DatePickerExample compact label="Date" size="m" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-size', 'm');
    expect(input).toHaveAttribute('data-compact', 'true');
  });
});
