import { fireEvent, render, screen } from '@testing-library/react-native';

import { debounce } from '../../utils/debounce';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { IconButton } from '../IconButton';

jest.mock('../../utils/debounce');

(debounce as jest.Mock).mockImplementation((fn) => fn);

const name = 'allTimeHigh';

describe('IconButton', () => {
  it('passes accessibility', async () => {
    render(
      <DefaultThemeProvider>
        <IconButton accessibilityLabel="test-label" name={name} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeAccessible();
  });

  it('renders an accessibility label', () => {
    render(
      <DefaultThemeProvider>
        <IconButton accessibilityLabel="test-label" name={name} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('test-label')).toBeTruthy();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <IconButton name={name} onPress={spy} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  it('disables user interaction when disabled', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <IconButton disabled name={name} onPress={spy} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByRole('button'));

    expect(spy).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeAccessible({
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

  it('disables user interaction when loading', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <IconButton loading accessibilityLabel="click me" name={name} onPress={spy} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByRole('button'));

    expect(spy).not.toHaveBeenCalled();
    // Check that the accessibility label includes ", loading" when loading is true
    expect(screen.getByLabelText('click me, loading')).toBeTruthy();
    // we want to check that loading state maps to busy accessibility state but
    // that's not actually covered by react-native-accessibility-engine yet
    expect(screen.getByRole('button')).toBeAccessible();
  });

  it('passes down testID', () => {
    render(
      <DefaultThemeProvider>
        <IconButton name={name} testID="test-test-id" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-test-id')).toBeTruthy();
  });

  it('does not render ActivityIndicator when not loading', () => {
    render(
      <DefaultThemeProvider>
        <IconButton name={name} testID="icon-button" />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('icon-button-activity-indicator')).toBeNull();
  });

  it('renders ActivityIndicator when loading', () => {
    render(
      <DefaultThemeProvider>
        <IconButton loading name={name} testID="icon-button" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('icon-button-activity-indicator')).toBeTruthy();
  });

  it('handles loading state without accessibility label', () => {
    render(
      <DefaultThemeProvider>
        <IconButton loading name={name} testID="icon-button" />
      </DefaultThemeProvider>,
    );

    const button = screen.getByRole('button');
    // Should be "loading" when no accessibility label is provided
    expect(button.props.accessibilityLabel).toBe(', loading');
  });
});
