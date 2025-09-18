import { Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Radio } from '../RadioGroup';

describe('Radio', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Radio testID="mock-radio">Radio</Radio>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-radio')).toBeAccessible();
  });
  it('renders a Pressable', () => {
    render(
      <DefaultThemeProvider>
        <Radio>Radio</Radio>
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
    expect(screen.getByText('Radio')).toBeTruthy();
  });

  it('renders a dot icon when checked', () => {
    render(
      <DefaultThemeProvider>
        <Radio checked>Checked</Radio>
      </DefaultThemeProvider>,
    );

    const icon = screen.getByTestId('radio-icon');
    expect(icon).toBeTruthy();
  });

  it('attaches testID', () => {
    const TEST_ID = 'radio-testid-test';
    render(
      <DefaultThemeProvider>
        <Radio testID={TEST_ID}>Radio</Radio>
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByTestId(TEST_ID)).toHaveLength(1);
  });

  it('has accessibility role button', () => {
    render(
      <DefaultThemeProvider>
        <Radio>Radio</Radio>
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByRole('radio')).toHaveLength(1);
  });

  it('has accessibility state checked when checked', () => {
    render(
      <DefaultThemeProvider>
        <Radio checked>Checked</Radio>
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByA11yState({ checked: true })).toHaveLength(1);
  });

  it('has accessibility state disabled when disabled', () => {
    render(
      <DefaultThemeProvider>
        <Radio disabled>Disabled</Radio>
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByA11yState({ disabled: true })).toHaveLength(1);
  });

  it('Can set custom accessibility label and hints', () => {
    render(
      <DefaultThemeProvider>
        <Radio accessibilityHint="Custom hint" accessibilityLabel="Custom label">
          Checkbox
        </Radio>
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Custom label')).toBeTruthy();
    expect(screen.getByA11yHint('Custom hint')).toBeTruthy();
  });

  it('fires `onChange` when pressed and not disabled', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Radio onChange={spy}>Radio</Radio>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Radio'));

    expect(spy).toHaveBeenCalled();
  });

  it('does not fire `onChange` when disabled and pressed', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Radio disabled onChange={spy}>
          Radio
        </Radio>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Radio'));

    expect(spy).not.toHaveBeenCalled();
  });

  it('renders a ReactNode as content', () => {
    render(
      <DefaultThemeProvider>
        <Radio>
          <Text font="label1">Custom ReactNode</Text>
        </Radio>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Custom ReactNode')).toBeTruthy();
  });

  it('has default color when checked', () => {
    render(
      <DefaultThemeProvider>
        <Radio checked testID="test-radio">
          Radio
        </Radio>
      </DefaultThemeProvider>,
    );

    // The outer container should have the default border color for checked state
    expect(screen.getByTestId('test-radio')).toHaveStyle({
      borderColor: 'rgb(0,82,255)', // This corresponds to bgPrimary in defaultTheme
    });
  });

  it('applies custom controlColor prop when checked', () => {
    render(
      <DefaultThemeProvider>
        <Radio checked controlColor="bgPositive" testID="test-radio">
          Radio
        </Radio>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-radio')).toHaveStyle({
      borderColor: 'rgb(9,133,81)', // This corresponds to bgPositive in defaultTheme
    });
  });
});
