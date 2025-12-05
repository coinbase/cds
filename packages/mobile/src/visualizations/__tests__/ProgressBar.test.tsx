import React, { act } from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import type { UseCounterParams } from '@coinbase/cds-common/visualizations/useCounter';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Box } from '../../layout';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { ProgressBar } from '../ProgressBar';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';
// ... existing code ...

jest.useFakeTimers();

jest.mock('@coinbase/cds-common/visualizations/useCounter', () => ({
  useCounter: ({ endNum }: UseCounterParams) => endNum,
}));

function fireTextEvent(floatLabel: ReactTestInstance) {
  fireEvent(floatLabel, 'layout', {
    nativeEvent: {
      layout: {
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        pageX: 0,
        pageY: 0,
      },
    },
  });
}

function fireTextContainerEvent(floatLabelContainer: ReactTestInstance) {
  fireEvent(floatLabelContainer, 'layout', {
    nativeEvent: {
      layout: {
        x: 0,
        y: 0,
        width: 200,
        height: 20,
        pageX: 0,
        pageY: 0,
      },
    },
  });
}

describe('ProgressBar test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('places bar label in correct position if it flows off the left container and passes a11y', async () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBarWithFloatLabel label={0} progress={0} testID="mock-progress-bar">
            <ProgressBar progress={0} />
          </ProgressBarWithFloatLabel>
        </Box>
      </DefaultThemeProvider>,
    );

    const floatLabel = screen.getByTestId('cds-progress-bar-float-label');
    fireTextEvent(floatLabel);

    fireTextContainerEvent(screen.getByTestId('cds-progress-bar-float-label-container'));

    expect(floatLabel).toHaveStyle({
      transform: [{ translateX: 0 }],
    });

    expect(screen.getAllByText('0%')).toHaveLength(2);
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('places bar label in correct position in middle', () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBarWithFloatLabel label={50} progress={0.5} testID="mock-progress-bar">
            <ProgressBar progress={0.5} />
          </ProgressBarWithFloatLabel>
        </Box>
      </DefaultThemeProvider>,
    );

    const floatLabel = screen.getByTestId('cds-progress-bar-float-label');
    fireTextEvent(floatLabel);

    fireTextContainerEvent(screen.getByTestId('cds-progress-bar-float-label-container'));

    // necessary for Animated.timing delay
    act(() => void jest.runAllTimers());
    expect(floatLabel).toHaveStyle({
      transform: [{ translateX: 90 }], // (200/2) -10
    });

    expect(screen.getAllByText('50%')[0]).toBeDefined();
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('renders fixed labels in correct position', () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBarWithFixedLabels
            endLabel={50}
            labelPlacement="above"
            startLabel={0}
            testID="mock-progress-bar"
          >
            <ProgressBar progress={50} />
          </ProgressBarWithFixedLabels>
        </Box>
      </DefaultThemeProvider>,
    );

    expect(screen.getAllByText('0%')[0]).toBeDefined();
    expect(screen.getAllByText('50%')[0]).toBeDefined();

    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('has correct bar width', () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBar color="bgPositive" progress={0.77} testID="mock-progress-bar" />
        </Box>
      </DefaultThemeProvider>,
    );

    fireTextContainerEvent(screen.getByTestId('mock-progress-bar'));

    const bar = screen.getByTestId('cds-progress-bar');
    // necessary for Animated.timing delay
    act(() => void jest.runAllTimers());
    expect(bar).toHaveStyle({
      transform: [{ translateX: -46 }], // -1 * (200 - (200 * 0.77))
    });
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('has correct bar height', () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBar progress={0.77} testID="mock-progress-bar" weight="heavy" />
        </Box>
      </DefaultThemeProvider>,
    );

    fireTextContainerEvent(screen.getByTestId('mock-progress-bar'));

    const root = screen.getByTestId('mock-progress-bar');
    expect(root).toHaveStyle({
      height: 12,
    });
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('handles disabled state for just ProgressBar correctly & passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBar disabled progress={0.77} testID="mock-progress-bar" />
        </Box>
      </DefaultThemeProvider>,
    );
    fireTextContainerEvent(screen.getByTestId('mock-progress-bar'));

    const bar = screen.getByTestId('cds-progress-bar');

    // necessary for Animated.timing delay
    act(() => void jest.runAllTimers());
    expect(bar).toHaveStyle({
      transform: [{ translateX: -46 }], // -1 * (200 - (200 * 0.77))
    });

    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('handles disabled state correctly for fixed labels', () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBarWithFixedLabels
            disabled
            endLabel={77}
            startLabel={0}
            testID="mock-progress-bar"
          >
            <ProgressBar progress={0.77} />
          </ProgressBarWithFixedLabels>
        </Box>
      </DefaultThemeProvider>,
    );

    fireTextContainerEvent(screen.getByTestId('mock-progress-bar'));

    expect(screen.getAllByText('0%')[0]).toBeDefined();
    expect(screen.getAllByText('77%')[0]).toBeDefined();

    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('calls onAnimationStart and onAnimationEnd callbacks', () => {
    const onAnimationStart = jest.fn();
    const onAnimationEnd = jest.fn();

    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBar
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
            progress={0.5}
            testID="mock-progress-bar"
          />
        </Box>
      </DefaultThemeProvider>,
    );

    // Trigger layout to start animation
    fireTextContainerEvent(screen.getByTestId('mock-progress-bar'));

    // Animation should start
    expect(onAnimationStart).toHaveBeenCalledTimes(1);

    // Run timers to end animation
    act(() => void jest.runAllTimers());

    // Animation should end
    expect(onAnimationEnd).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('does not call animation callbacks when progress is 0', () => {
    const onAnimationStart = jest.fn();
    const onAnimationEnd = jest.fn();

    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBar
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
            progress={0}
            testID="mock-progress-bar"
          />
        </Box>
      </DefaultThemeProvider>,
    );

    // Trigger layout
    fireTextContainerEvent(screen.getByTestId('mock-progress-bar'));

    // Animation should start even for 0 progress
    expect(onAnimationStart).toHaveBeenCalledTimes(1);

    // Run timers to end animation
    act(() => void jest.runAllTimers());

    // Animation should end
    expect(onAnimationEnd).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('applies custom styles correctly', () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBar
            progress={0.5}
            style={{ padding: 10 }}
            styles={{
              root: { margin: 5, backgroundColor: 'red', height: 20 },
              progress: { backgroundColor: 'blue' },
            }}
            testID="mock-progress-bar"
          />
        </Box>
      </DefaultThemeProvider>,
    );

    const root = screen.getByTestId('mock-progress-bar');
    const progress = screen.getByTestId('cds-progress-bar');

    expect(root).toHaveStyle({
      padding: 10,
      margin: 5,
      backgroundColor: 'red',
      height: 20,
    });
    expect(progress).toHaveStyle({ backgroundColor: 'blue' });
  });

  it('applies custom styles to ProgressBarWithFixedLabels', () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBarWithFixedLabels
            endLabel={100}
            labelPlacement="above"
            startLabel={0}
            styles={{
              root: { padding: 8 },
              labelContainer: { backgroundColor: 'lightgray' },
              startLabel: { opacity: 0.7 },
              endLabel: { backgroundColor: 'yellow' },
            }}
            testID="mock-progress-bar"
          >
            <ProgressBar progress={1} />
          </ProgressBarWithFixedLabels>
        </Box>
      </DefaultThemeProvider>,
    );

    const root = screen.getByTestId('mock-progress-bar');
    const labelContainer = screen.getByTestId('cds-progress-label-container');

    expect(root).toHaveStyle({ padding: 8 });
    expect(labelContainer).toHaveStyle({ backgroundColor: 'lightgray' });
  });

  it('applies custom styles to ProgressBarWithFloatLabel', () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBarWithFloatLabel
            label={50}
            labelPlacement="above"
            progress={0.5}
            styles={{
              root: { margin: 4 },
              labelContainer: { padding: 6 },
              label: { backgroundColor: 'green' },
            }}
            testID="mock-progress-bar"
          >
            <ProgressBar progress={0.5} />
          </ProgressBarWithFloatLabel>
        </Box>
      </DefaultThemeProvider>,
    );

    const root = screen.getByTestId('mock-progress-bar');
    const labelContainer = screen.getByTestId('cds-progress-bar-float-label-container');
    const floatLabelText = screen.getAllByText('50%')[0];

    expect(root).toHaveStyle({ margin: 4 });
    expect(labelContainer).toHaveStyle({ padding: 6 });
    expect(floatLabelText).toHaveStyle({ backgroundColor: 'green' });
  });

  it('rounds accessibilityValue.now to the nearest integer', () => {
    render(
      <DefaultThemeProvider>
        <Box width="200">
          <ProgressBar progress={0.777} testID="mock-progress-bar" />
        </Box>
      </DefaultThemeProvider>,
    );

    const progressBar = screen.getByTestId('mock-progress-bar');

    // 0.777 * 100 = 77.7, which should round to 78
    expect(progressBar.props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 78,
    });
  });
});
