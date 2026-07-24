import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { DateInput, type DateInputProps } from '../DateInput';

const DateInputExample = (props: Partial<DateInputProps>) => {
  return (
    <DefaultThemeProvider>
      <DateInput
        date={null}
        error={null}
        onChangeDate={props.onChangeDate ?? jest.fn()}
        onErrorDate={props.onErrorDate ?? jest.fn()}
        {...props}
      />
    </DefaultThemeProvider>
  );
};

describe('DateInput size', () => {
  it('defaults to size "l" when neither size nor compact is set', () => {
    render(<DateInputExample label="Date" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', 'l');
  });

  it.each(['s', 'm', 'l'] as const)('threads size="%s" through to the input', (size) => {
    render(<DateInputExample label="Date" size={size} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', size);
  });

  it('resolves compact alone to size "s" while keeping data-compact', () => {
    render(<DateInputExample compact label="Date" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-size', 's');
    expect(input).toHaveAttribute('data-compact', 'true');
  });

  it('lets size win over compact for sizing while data-compact still reflects the prop', () => {
    render(<DateInputExample compact label="Date" size="m" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-size', 'm');
    expect(input).toHaveAttribute('data-compact', 'true');
  });

  it('forces outside label placement for compact alone (legacy exception)', () => {
    render(<DateInputExample compact label="Date" labelVariant="inside" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-labelvariant', 'outside');
  });

  it('does not force the compact label exception once an explicit size is set', () => {
    // With an explicit size, compact no longer forces placement — labelVariant is honored. At size
    // `l` an inside label stacks vertically (data-labelvariant="inside").
    render(<DateInputExample compact label="Date" labelVariant="inside" size="l" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-labelvariant', 'inside');
  });

  it('keeps an inside label horizontal at sizes "s" and "m" (only "l" stacks vertically)', () => {
    const { rerender } = render(<DateInputExample label="Date" labelVariant="inside" size="m" />);
    // A horizontal inside label sits in the start slot, so the container keeps outside padding.
    expect(screen.getByRole('textbox')).toHaveAttribute('data-labelvariant', 'outside');

    rerender(<DateInputExample label="Date" labelVariant="inside" size="l" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-labelvariant', 'inside');
  });
});
