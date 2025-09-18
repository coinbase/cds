import React, { act, useCallback, useState } from 'react';
import type { PanGesture } from 'react-native-gesture-handler';
import { fireGestureHandler, getByGestureTestId } from 'react-native-gesture-handler/jest-utils';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { SlideButton, type SlideButtonProps } from '../SlideButton';

jest.useFakeTimers();

// Have to mock useLayout hook since size is 0 in test environment
jest.mock('../../hooks/useLayout', () => ({
  useLayout: jest.fn(() => [{ x: 0, y: 0, width: 300, height: 50 }, jest.fn()]),
}));

const testID = 'slide-button';
const gestureTestID = testID;
const handleTestID = `${testID}-handle`;
const uncheckedLabel = 'Slide to confirm';
const checkedLabel = 'Confirming...';

const SlideButtonExample = ({
  checked: checkedProp = false,
  ...props
}: {
  checked?: boolean;
} & Omit<SlideButtonProps, 'checked'>) => {
  const [checked, setChecked] = useState(checkedProp);

  const handleOnChange = useCallback(() => {
    setChecked(!checked);
  }, [checked, setChecked]);

  return (
    <DefaultThemeProvider>
      <SlideButton
        checked={checked}
        checkedLabel={props.checkedLabel ?? checkedLabel}
        onChange={props.onChange ?? handleOnChange}
        testID={testID}
        uncheckedLabel={props.uncheckedLabel ?? uncheckedLabel}
        {...props}
      />
    </DefaultThemeProvider>
  );
};

describe('SlideButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<SlideButtonExample />);
    expect(screen.getByText(uncheckedLabel)).toBeTruthy();
  });

  it('is accessible', () => {
    render(<SlideButtonExample />);
    expect(screen.getByTestId(handleTestID)).toBeAccessible();
  });

  it('calls onSlideStart when slide starts', async () => {
    const onSlideStart = jest.fn();
    render(<SlideButtonExample onSlideStart={onSlideStart} />);

    await act(async () => {
      fireGestureHandler<PanGesture>(getByGestureTestId(gestureTestID), [{ translationX: 250 }]);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(onSlideStart).toHaveBeenCalled();
  });

  it('calls onSlideEnd when slide ends', async () => {
    const onSlideEnd = jest.fn();
    render(<SlideButtonExample onSlideEnd={onSlideEnd} />);

    await act(async () => {
      fireGestureHandler<PanGesture>(getByGestureTestId(gestureTestID), [{ translationX: 250 }]);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(onSlideEnd).toHaveBeenCalled();
  });

  it('calls onSlideComplete when button becomes checked', async () => {
    const onSlideComplete = jest.fn();
    render(<SlideButtonExample onSlideComplete={onSlideComplete} />);

    await act(async () => {
      fireGestureHandler<PanGesture>(getByGestureTestId(gestureTestID), [{ translationX: 250 }]);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(onSlideComplete).toHaveBeenCalled();
  });

  it('calls onChange with checked when button becomes checked', async () => {
    const onChange = jest.fn();

    const CustomSlideButton = () => (
      <DefaultThemeProvider>
        <SlideButtonExample onChange={onChange} testID={testID} />
      </DefaultThemeProvider>
    );

    render(<CustomSlideButton />);

    await act(async () => {
      fireGestureHandler<PanGesture>(getByGestureTestId(gestureTestID), [{ translationX: 250 }]);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onSlideCancel when slide does not reach threshold', async () => {
    const onSlideCancel = jest.fn();
    render(<SlideButtonExample onSlideCancel={onSlideCancel} />);

    await act(async () => {
      fireGestureHandler<PanGesture>(getByGestureTestId(gestureTestID), [{ translationX: 50 }]);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(onSlideCancel).toHaveBeenCalled();
  });

  it('renders a disabled button', () => {
    const onPress = jest.fn();
    render(<SlideButtonExample disabled onPress={onPress} />);
    expect(screen.getByTestId(handleTestID)).toBeDisabled();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('uses correct accessibility label based on button state', () => {
    render(<SlideButtonExample />);
    expect(screen.getByTestId(handleTestID)).toHaveProp('accessibilityLabel', uncheckedLabel);

    render(<SlideButtonExample checked />);
    expect(screen.getByTestId(handleTestID)).toHaveProp('accessibilityLabel', checkedLabel);
  });

  it('supports accessibility activation via double tap', async () => {
    const onSlideComplete = jest.fn();
    render(<SlideButtonExample onSlideComplete={onSlideComplete} />);

    const button = screen.getByTestId(handleTestID);

    await act(async () => {
      button.props.onAccessibilityAction({ nativeEvent: { actionName: 'activate' } });
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(onSlideComplete).toHaveBeenCalled();
  });
});
