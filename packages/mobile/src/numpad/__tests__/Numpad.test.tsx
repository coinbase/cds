import { createRef } from 'react';
import { Text } from 'react-native';
import type { View } from 'react-native';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Numpad } from '../Numpad';

describe('Numpad', () => {
  it('renders without crashing', () => {
    render(
      <DefaultThemeProvider>
        <Numpad onPress={NoopFn} testID="mock-numpad" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-numpad')).toBeTruthy();
  });

  it('dispatches onPress events for number buttons', () => {
    const onPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <Numpad onPress={onPress} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('1'));
    expect(onPress).toHaveBeenCalledWith(1);
  });

  it('dispatches onPress events for separator button', () => {
    const onPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <Numpad onPress={onPress} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('.'));
    expect(onPress).toHaveBeenCalledWith('SEPARATOR');
  });

  it('dispatches onPress events for back button', () => {
    const onPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <Numpad onPress={onPress} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('numpad-back'));
    expect(onPress).toHaveBeenCalledWith('DELETE');
  });

  it('dispatches onLongPress events', () => {
    const onLongPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <Numpad onLongPress={onLongPress} onPress={NoopFn} />
      </DefaultThemeProvider>,
    );

    fireEvent(screen.getByText('1'), 'onLongPress');

    expect(onLongPress).toHaveBeenCalledWith(1);
  });

  it('renders accessory and action nodes when passed', () => {
    const accessory = <Text>Accessory</Text>;
    const action = <Text>Action</Text>;
    render(
      <DefaultThemeProvider>
        <Numpad accessory={accessory} action={action} onPress={NoopFn} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Accessory')).toBeTruthy();
    expect(screen.getByText('Action')).toBeTruthy();
  });

  it('renders custom separator when passed', () => {
    const separator = '*';
    render(
      <DefaultThemeProvider>
        <Numpad onPress={NoopFn} separator={separator} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(separator)).toBeTruthy();
  });

  it('does not render seperator when null', () => {
    render(
      <DefaultThemeProvider>
        <Numpad onPress={NoopFn} separator="" />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByText('.')).toBeNull();
  });

  it('hides the separator from the accessibility tree when separator is empty', () => {
    render(
      <DefaultThemeProvider>
        <Numpad onPress={NoopFn} separator="" />
      </DefaultThemeProvider>,
    );

    const separator = screen.getByTestId('numpad-separator', { includeHiddenElements: true });
    expect(separator.props.accessible).toBe(false);
    expect(separator.props.accessibilityElementsHidden).toBe(true);
    expect(separator.props.importantForAccessibility).toBe('no-hide-descendants');
  });

  it('hides the separator from the accessibility tree when hideSeparator is true', () => {
    render(
      <DefaultThemeProvider>
        <Numpad hideSeparator onPress={NoopFn} />
      </DefaultThemeProvider>,
    );

    const separator = screen.getByTestId('numpad-separator', { includeHiddenElements: true });
    expect(separator.props.accessible).toBe(false);
    expect(separator.props.accessibilityElementsHidden).toBe(true);
    expect(separator.props.importantForAccessibility).toBe('no-hide-descendants');
  });

  it('keeps the separator accessible when a separator is provided', () => {
    render(
      <DefaultThemeProvider>
        <Numpad onPress={NoopFn} />
      </DefaultThemeProvider>,
    );

    const separator = screen.getByTestId('numpad-separator');
    expect(separator.props.accessible).not.toBe(false);
    expect(separator.props.accessibilityElementsHidden).toBe(false);
    expect(separator.props.importantForAccessibility).toBeUndefined();
  });

  it('forwards ref', () => {
    const ref = createRef<View>();
    render(
      <DefaultThemeProvider>
        <Numpad ref={ref} onPress={NoopFn} />
      </DefaultThemeProvider>,
    );

    expect(ref.current).toBeTruthy();
  });

  it('does not dispatch onPress or onLongPress events when disabled', () => {
    const onPress = jest.fn();
    const onLongPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <Numpad disabled onLongPress={onLongPress} onPress={onPress} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('1'));
    fireEvent(screen.getByText('1'), 'onLongPress');

    expect(onPress).not.toHaveBeenCalled();
    expect(onLongPress).not.toHaveBeenCalled();
  });

  it('applies correct accessibilityLabel to separator when separatorAccessibilityLabel prop is passed', () => {
    const separatorAccessibilityLabel = 'numpad-separator';
    render(
      <DefaultThemeProvider>
        <Numpad onPress={NoopFn} separatorAccessibilityLabel={separatorAccessibilityLabel} />
      </DefaultThemeProvider>,
    );

    const separator = screen.getByTestId('numpad-separator');
    expect(separator.props.accessibilityLabel).toBe(separatorAccessibilityLabel);
  });

  it('applies correct accessibilityLabel to back button when deleteAccessibilityLabel prop is passed', () => {
    const deleteAccessibilityLabel = 'numpad-back';
    render(
      <DefaultThemeProvider>
        <Numpad deleteAccessibilityLabel={deleteAccessibilityLabel} onPress={NoopFn} />
      </DefaultThemeProvider>,
    );

    const backButton = screen.getByTestId('numpad-back');
    expect(backButton.props.accessibilityLabel).toBe(deleteAccessibilityLabel);
  });
});
