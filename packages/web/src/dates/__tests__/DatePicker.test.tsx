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
  it('defaults to size l density (no data-size s/m) when neither size nor compact is set', () => {
    render(<DatePickerExample label="Date" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-size', 'l');
  });

  it.each(['s', 'm', 'l'] as const)('threads size="%s" through to the input', (size) => {
    render(<DatePickerExample label="Date" size={size} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', size);
  });

  it('compact alone resolves to its size equivalent (s) while keeping data-compact', () => {
    render(<DatePickerExample compact label="Date" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-size', 's');
    expect(input).toHaveAttribute('data-compact', 'true');
  });

  it('size wins over compact for sizing but data-compact still reflects the prop', () => {
    render(<DatePickerExample compact label="Date" size="m" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-size', 'm');
    // `size` wins for sizing, but `data-compact` must still reflect the `compact`
    // prop so customer styles keyed on it keep working (matches master).
    expect(input).toHaveAttribute('data-compact', 'true');
  });

  it('size="s" reproduces the legacy compact label placement (inline in start slot)', () => {
    const startTestID = 'start-slot';

    const { rerender } = render(
      <DatePickerExample
        label="Birthdate"
        labelVariant="inside"
        size="s"
        testIDMap={{ start: startTestID }}
      />,
    );
    expect(screen.getByTestId(startTestID)).toHaveTextContent('Birthdate');

    rerender(
      <DefaultThemeProvider>
        <DatePicker
          compact
          date={null}
          error={null}
          label="Birthdate"
          labelVariant="inside"
          onChangeDate={jest.fn()}
          onErrorDate={jest.fn()}
          testIDMap={{ start: startTestID }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(startTestID)).toHaveTextContent('Birthdate');
  });
});
