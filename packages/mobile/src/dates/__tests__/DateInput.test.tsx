import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { DateInput, type DateInputProps } from '../DateInput';

const labelTestID = 'label-test';
const startTestID = 'start-test';

const DateInputExample = (props: Partial<DateInputProps>) => (
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

describe('DateInput size', () => {
  it('renders the label above the input (in stack) by default', () => {
    render(<DateInputExample label="Birthdate" testIDMap={{ label: labelTestID }} />);

    expect(screen.getByTestId(labelTestID)).toHaveTextContent('Birthdate');
  });

  it.each(['s', 'm', 'l'] as const)(
    'keeps the label above the input (in stack) for size="%s"',
    (size) => {
      render(<DateInputExample label="Birthdate" size={size} testIDMap={{ label: labelTestID }} />);

      expect(screen.getByTestId(labelTestID)).toHaveTextContent('Birthdate');
    },
  );

  it('reproduces the legacy inline start-slot label placement for compact alone', () => {
    render(<DateInputExample compact label="Birthdate" testIDMap={{ start: startTestID }} />);

    expect(screen.getByTestId(startTestID)).toHaveTextContent('Birthdate');
  });

  it('lets size win over compact: size="m" keeps the label above the input', () => {
    render(
      <DateInputExample compact label="Birthdate" size="m" testIDMap={{ label: labelTestID }} />,
    );

    expect(screen.getByTestId(labelTestID)).toHaveTextContent('Birthdate');
  });
});
