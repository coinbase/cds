import { useCallback, useState } from 'react';
import { Animated, Modal as RNModal } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Alert, type AlertBaseProps } from '../Alert';

const MockAlert = ({
  visible: externalVisible,
  onRequestClose,
  title,
  body,
  pictogram,
  preferredActionLabel,
  onPreferredActionPress,
  dismissActionLabel,
  testID,
}: Partial<AlertBaseProps>) => {
  const [visible, setVisible] = useState(false);
  const setVisibleOn = useCallback(() => setVisible(true), []);

  const defaultTitle = 'Alert title';
  const defaultBody = 'Alert body type that can run over multiple lines, but should be kept short.';
  const defaultPictogram = 'warning';
  const defaultPreferredActionLabel = 'Save';
  const defaultOnPreferredActionPress = () => console.log('pressed');

  return (
    <>
      <Button onPress={setVisibleOn}>Show Alert</Button>
      <Alert
        body={body ?? defaultBody}
        dismissActionLabel={dismissActionLabel}
        onPreferredActionPress={onPreferredActionPress ?? defaultOnPreferredActionPress}
        onRequestClose={onRequestClose ?? setVisibleOn}
        pictogram={pictogram ?? defaultPictogram}
        preferredActionLabel={preferredActionLabel ?? defaultPreferredActionLabel}
        testID={testID}
        title={title ?? defaultTitle}
        visible={externalVisible ?? visible}
      />
    </>
  );
};

const animationParallelSpy = jest.spyOn(Animated, 'parallel');
const animationTimingSpy = jest.spyOn(Animated, 'timing');

describe('Alert', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders React Native Modal', () => {
    render(
      <DefaultThemeProvider>
        <MockAlert />
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(RNModal)).toHaveLength(1);
  });

  it('show alert on press', () => {
    const title = 'Alert title';

    render(
      <DefaultThemeProvider>
        <MockAlert title={title} />
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryByProps({ visible: false })).toBeTruthy();

    fireEvent.press(screen.getByText('Show Alert'));

    // in animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
    expect(screen.UNSAFE_queryByProps({ visible: true })).toBeTruthy();
  });

  it('renders title and passes a11y', () => {
    const title = 'Test title';
    render(
      <DefaultThemeProvider>
        <MockAlert testID="mock-alert" title={title} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Show Alert'));

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByTestId('mock-alert')).toBeAccessible();
  });

  it('renders body and passes a11y', () => {
    const body = 'Test body';
    render(
      <DefaultThemeProvider>
        <MockAlert body={body} testID="mock-alert" />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Show Alert'));

    expect(screen.getByText(body)).toBeTruthy();
    expect(screen.getByTestId('mock-alert-pictogram')).toBeTruthy();
    expect(screen.getByTestId('mock-alert')).toBeAccessible();
  });

  it('renders preferred action and passes a11y', () => {
    const onPreferredActionPress = jest.fn();
    const onRequestClose = jest.fn();

    render(
      <DefaultThemeProvider>
        <MockAlert
          visible
          onPreferredActionPress={onPreferredActionPress}
          onRequestClose={onRequestClose}
          preferredActionLabel="Save"
          testID="mock-alert"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('mock-alert')).toBeAccessible();

    fireEvent.press(screen.getByText('Save'));

    expect(onPreferredActionPress).toHaveBeenCalledTimes(1);
    // out animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });

  it('renders dismiss action and passes a11y', () => {
    const onRequestClose = jest.fn();

    render(
      <DefaultThemeProvider>
        <MockAlert
          visible
          dismissActionLabel="Cancel"
          onRequestClose={onRequestClose}
          testID="mock-alert"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('mock-alert')).toBeAccessible();

    fireEvent.press(screen.getByText('Cancel'));

    // out animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(100);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });

  it('renders both dismiss action and preferred action and pass a11y', () => {
    const onRequestClose = jest.fn();
    const onPreferredActionPress = jest.fn();
    const dismissActionLabel = 'Cancel';
    const preferredActionLabel = 'Save';

    render(
      <DefaultThemeProvider>
        <MockAlert
          visible
          dismissActionLabel={dismissActionLabel}
          onPreferredActionPress={onPreferredActionPress}
          onRequestClose={onRequestClose}
          preferredActionLabel={preferredActionLabel}
          testID="mock-alert"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('mock-alert')).toBeAccessible();

    screen.getByText(dismissActionLabel);
    fireEvent.press(screen.getByText(preferredActionLabel));

    expect(onPreferredActionPress).toHaveBeenCalledTimes(1);

    // out animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(100);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });
});
