import React from 'react';
import { View } from 'react-native';
import { getCircumference, getRadius } from '@coinbase/cds-common/utils/circle';
import type { UseCounterParams } from '@coinbase/cds-common/visualizations/useCounter';
import { render, screen } from '@testing-library/react-native';

import { Text } from '../../typography';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { ProgressCircle } from '../ProgressCircle';

jest.useFakeTimers();

const MockView = View;
jest.mock('react-native-svg', () => {
  return {
    ...jest.requireActual<Record<string, unknown>>('react-native-svg'),
    __esModule: true,

    // we have to mock Circle because it doesn't support testID
    Circle: (props: Record<string, unknown>) => {
      return <MockView {...props} />;
    },
  };
});

jest.mock('@coinbase/cds-common/visualizations/useCounter', () => ({
  useCounter: ({ endNum }: UseCounterParams) => endNum,
}));

describe('ProgressCircle tests and passes a11y', () => {
  it('handles 0 percent', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle progress={0} size={size} testID="mock-progress-circle" />
      </DefaultThemeProvider>,
    );

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();

    // necessary for Animated.timing delay
    jest.runAllTimers();
    expect(innerCircle.props.strokeDasharray).toEqual(circumference);

    expect(screen.getAllByText('0%')).toHaveLength(2);

    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('handles 50 percent', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle progress={0.5} size={size} testID="mock-progress-circle" />
      </DefaultThemeProvider>,
    );

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();

    // necessary for Animated.timing delay
    jest.runAllTimers();

    expect(innerCircle.props.strokeDashoffset._value).toEqual(circumference * 0.5);
    expect(innerCircle.props.strokeDasharray).toEqual(circumference);

    expect(screen.getAllByText('50%')).toHaveLength(2);
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('handles 100 percent', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle progress={1} size={size} testID="mock-progress-circle" />
      </DefaultThemeProvider>,
    );

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    // necessary for Animated.timing delay
    jest.runAllTimers();

    expect(innerCircle.props.strokeDashoffset._value).toBe(0);

    expect(innerCircle.props.strokeDasharray).toEqual(circumference);

    expect(screen.getAllByText('100%')).toHaveLength(2);
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('handles heavy weight', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle progress={1} size={size} testID="mock-progress-circle" weight="heavy" />
      </DefaultThemeProvider>,
    );

    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    expect(innerCircle.props.strokeWidth).toBe(12);
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('handles no text', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle hideText progress={1} size={size} testID="mock-progress-circle" />
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByText('100%')).toHaveLength(0);
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('handles different color', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle color="bgPositive" progress={1} size={size} testID="mock-progress-circle" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cds-progress-circle-inner')).toBeDefined();
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('calls onAnimationStart and onAnimationEnd callbacks', () => {
    const onAnimationStart = jest.fn();
    const onAnimationEnd = jest.fn();
    const size = 100;

    render(
      <DefaultThemeProvider>
        <ProgressCircle
          onAnimationEnd={onAnimationEnd}
          onAnimationStart={onAnimationStart}
          progress={0.5}
          size={size}
          testID="mock-progress-circle"
        />
      </DefaultThemeProvider>,
    );

    // Animation should start
    expect(onAnimationStart).toHaveBeenCalledTimes(1);

    // Run timers to end animation
    jest.runAllTimers();

    // Animation should end
    expect(onAnimationEnd).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('renders custom content node when provided', () => {
    const size = 100;
    const customText = 'Custom Content';
    const progress = 0.75;
    const contentNode = (
      <View testID="custom-content-node">
        <Text font="label1">
          {customText} {progress * 100}%
        </Text>
      </View>
    );

    render(
      <DefaultThemeProvider>
        <ProgressCircle
          contentNode={contentNode}
          progress={progress}
          size={size}
          testID="mock-progress-circle"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByText(`${progress * 100}%`)).toHaveLength(0);
    expect(screen.getByText(`${customText} ${progress * 100}%`)).toBeDefined();
    expect(screen.getByTestId('custom-content-node')).toBeDefined();
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('does not render content node when hideContent is true', () => {
    const size = 100;
    const customText = 'Custom Content';
    const progress = 0.75;
    const contentNode = (
      <View testID="custom-content-node">
        <Text font="label1">
          {customText} {progress * 100}%
        </Text>
      </View>
    );

    render(
      <DefaultThemeProvider>
        <ProgressCircle hideContent contentNode={contentNode} progress={progress} size={size} />
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByText(`${progress * 100}%`)).toHaveLength(0);
    expect(screen.queryByText(`${customText} ${progress * 100}%`)).toBeNull();
    expect(screen.queryByTestId('custom-content-node')).toBeNull();
  });

  it('skips mount animation when disableAnimateOnMount is true', () => {
    const size = 100;
    const progress = 0.5;
    render(
      <DefaultThemeProvider>
        <ProgressCircle
          disableAnimateOnMount
          progress={progress}
          size={size}
          testID="mock-progress-circle"
        />
      </DefaultThemeProvider>,
    );

    const circumference = getCircumference(getRadius(size, 4));
    const expectedOffset = (1 - progress) * circumference;
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');

    // Should start at target offset, not at circumference (empty)
    expect(innerCircle.props.strokeDashoffset._value).toEqual(expectedOffset);

    // Should show target percentage immediately, not animate from 0
    expect(screen.getAllByText('50%').length).toBeGreaterThan(0);
  });

  it('starts at animation start position when disableAnimateOnMount is not set', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle progress={0.5} size={size} testID="mock-progress-circle" />
      </DefaultThemeProvider>,
    );

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');

    // Without disableAnimateOnMount, should start at full circumference (empty) and animate to target
    expect(innerCircle.props.strokeDashoffset._value).toEqual(circumference);
  });

  it('handles floating-point precision for accessibilityValue', () => {
    const size = 100;
    // 0.07 * 100 = 7.000000000000001 in JavaScript
    render(
      <DefaultThemeProvider>
        <ProgressCircle progress={0.07} size={size} testID="mock-progress-circle" />
      </DefaultThemeProvider>,
    );

    const progressCircle = screen.getByTestId('mock-progress-circle');
    expect(progressCircle.props.accessibilityValue.now).toBe(7);
    expect(Number.isInteger(progressCircle.props.accessibilityValue.now)).toBe(true);
  });
});
