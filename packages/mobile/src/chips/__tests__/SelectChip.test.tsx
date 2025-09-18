import React from 'react';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { SelectOption } from '../../controls';
import { DefaultThemeProvider, SAFE_AREA_METRICS } from '../../utils/testHelpers';
import type { SelectChipProps } from '../SelectChip';
import { SelectChip } from '../SelectChip';

const options = ['Balance', 'Name', 'Asset Value'];
const chipTestID = 'select-chip-test';
const placeholder = 'Select an option';

const BaseSelectChip = ({ value: defaultValue, ...props }: Omit<SelectChipProps, 'children'>) => {
  const [value, setValue] = React.useState<string | undefined>(defaultValue);
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SelectChip
        onChange={setValue}
        placeholder={placeholder}
        testID={chipTestID}
        value={value}
        {...props}
      >
        {options.map((option) => (
          <SelectOption key={option} title={option} value={option} />
        ))}
      </SelectChip>
    </SafeAreaProvider>
  );
};

const TestSelectChip = ({ ...props }) => {
  return (
    <DefaultThemeProvider>
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <BaseSelectChip {...props} />
      </SafeAreaProvider>
    </DefaultThemeProvider>
  );
};

describe('SelectChip', () => {
  it('passes accessibility', () => {
    render(<TestSelectChip />);
    expect(screen.getByText(placeholder)).toBeAccessible();
  });
  it('renders a placeholder when no option is selected', () => {
    render(<TestSelectChip />);
    expect(screen.getByText(placeholder)).toBeTruthy();
  });
  it('renders a tray with options when pressed', () => {
    render(<TestSelectChip />);

    fireEvent.press(screen.getByText(placeholder));

    expect(screen.getByText(options[1])).toBeTruthy();
  });
  it('does not open the tray when disabled', () => {
    const pressSpy = jest.fn();
    render(<TestSelectChip disabled onPress={pressSpy} />);

    fireEvent.press(screen.getByText(placeholder));
    expect(pressSpy).not.toHaveBeenCalled();
  });
  it('updates the value when an option is selected', async () => {
    const onChangeSpy = jest.fn();
    render(<TestSelectChip onChange={onChangeSpy} />);

    fireEvent.press(screen.getByText(placeholder));

    await fireEvent.press(screen.getByText(options[1]));
    await expect(onChangeSpy).toHaveBeenCalledWith(options[1]);
  });
  it('renders a valueLabel when provided instead of the value', () => {
    render(<TestSelectChip value={options[1]} valueLabel="test" />);

    expect(screen.getByText('test')).toBeTruthy();
    expect(screen.queryByText(options[1])).toBeNull();
  });
  it('has a custom style when passed', () => {
    render(<TestSelectChip style={{ paddingTop: 20 }} />);

    expect(screen.getByTestId(chipTestID)).toHaveStyle({ paddingTop: 20 });
  });
});
