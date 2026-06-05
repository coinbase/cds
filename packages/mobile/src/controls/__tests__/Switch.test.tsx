import { useState } from 'react';
import { Text, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider, treeHasStyleProp } from '../../utils/testHelpers';
import { Switch } from '../Switch';

describe('Switch.test', () => {
  it('handles input', () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);
      const onChange = () => setChecked((chk) => !chk);
      return (
        <View>
          <Text>checked is {checked ? 'true' : 'false'}</Text>
          <Switch checked={checked} onChange={onChange}>
            test label
          </Switch>
        </View>
      );
    };

    render(
      <DefaultThemeProvider>
        <TestComponent />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('checked is false')).toBeTruthy();
    expect(screen.getByRole('switch')).not.toBeChecked();

    fireEvent.press(screen.getByRole('switch'));
    expect(screen.getByText('checked is true')).toBeTruthy();
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('passes accessibility', () => {
    render(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()}>test label</Switch>
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('switch')).toBeAccessible({
      // disable 'disabled-state-required' since it's flagging passing disabled
      // to Interactable and unclear if we're lacking a11y affordances here
      customViolationHandler: (violations) => {
        return violations.filter(
          (v) =>
            v.problem !== "This component has a disabled state but it isn't exposed to the user",
        );
      },
    });
  });

  it('renders label', () => {
    render(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()}>test label</Switch>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('test label')).toBeTruthy();
  });

  it('renders accessibilityLabel', () => {
    render(
      <DefaultThemeProvider>
        <Switch
          accessibilityHint="test accessibility hint"
          accessibilityLabel="test accessibility label"
          onChange={jest.fn()}
        >
          test label
        </Switch>
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('test accessibility label')).toBeTruthy();
  });

  it('triggers onPress when pressed', () => {
    const onPress = jest.fn();

    render(
      <DefaultThemeProvider>
        <Switch onPress={onPress} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByRole('switch'));

    expect(onPress).toHaveBeenCalled();
  });

  it('disables user interaction when disabled', () => {
    const onChange = jest.fn();

    render(
      <DefaultThemeProvider>
        <Switch disabled onChange={onChange} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByRole('switch'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets forwarded ref', () => {
    const ref = { current: null };

    render(
      <DefaultThemeProvider>
        <Switch ref={ref} onChange={jest.fn()} />
      </DefaultThemeProvider>,
    );

    expect(ref.current).not.toBeNull();
  });

  it('renders testID', () => {
    render(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()} testID="test-test-id" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-test-id')).toBeTruthy();
  });

  it('keeps a stable root wrapper regardless of label presence', () => {
    const { toJSON, rerender } = render(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()} />
      </DefaultThemeProvider>,
    );

    const treeWithoutLabel = toJSON();
    expect(treeWithoutLabel).toBeTruthy();
    expect(Array.isArray(treeWithoutLabel)).toBe(false);
    expect(treeWithoutLabel).toHaveProperty('type', 'View');

    rerender(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()}>with label</Switch>
      </DefaultThemeProvider>,
    );

    const treeWithLabel = toJSON();
    expect(treeWithLabel).toBeTruthy();
    expect(Array.isArray(treeWithLabel)).toBe(false);
    expect(treeWithLabel).toHaveProperty('type', 'View');
  });

  it('has default palette', () => {
    render(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()} testID="test-test-id" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-test-id')).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgTertiary,
    });
  });

  it('has default palette when it is checked', () => {
    render(
      <DefaultThemeProvider>
        <Switch checked onChange={jest.fn()} testID="test-test-id" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-test-id')).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgPrimary,
    });
  });

  it('applies custom controlColor prop when checked', () => {
    render(
      <DefaultThemeProvider>
        <Switch checked controlColor="bgPositive" onChange={jest.fn()} testID="test-test-id" />
      </DefaultThemeProvider>,
    );

    const thumb = screen.getByTestId('switch-thumb');
    expect(thumb).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgPositive,
    });
  });

  it('uses bgTertiary color when unchecked regardless of controlColor prop', () => {
    render(
      <DefaultThemeProvider>
        <Switch controlColor="bgPositive" onChange={jest.fn()} testID="test-test-id" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-test-id')).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgTertiary,
    });
  });

  it('applies styles.root', () => {
    const { toJSON } = render(
      <DefaultThemeProvider>
        <Switch
          onChange={jest.fn()}
          styles={{
            root: { borderTopWidth: 1 },
          }}
        >
          label
        </Switch>
      </DefaultThemeProvider>,
    );

    const tree = toJSON();
    expect(treeHasStyleProp(tree, (s) => s.borderTopWidth === 1)).toBe(true);
  });

  it('applies styles.control and preserves style prop behavior', () => {
    const { toJSON } = render(
      <DefaultThemeProvider>
        <Switch
          onChange={jest.fn()}
          style={{ borderRightWidth: 5 }}
          styles={{
            control: { borderLeftWidth: 4 },
          }}
        />
      </DefaultThemeProvider>,
    );

    const tree = toJSON();
    expect(treeHasStyleProp(tree, (s) => s.borderLeftWidth === 4)).toBe(true);
    expect(treeHasStyleProp(tree, (s) => s.borderRightWidth === 5)).toBe(true);
  });
});
