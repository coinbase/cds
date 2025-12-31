import '@testing-library/jest-dom';

import React from 'react';
import { getCircumference, getRadius } from '@coinbase/cds-common/utils/circle';
import type { UseCounterParams } from '@coinbase/cds-common/visualizations/useCounter';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen, waitFor } from '@testing-library/react';

import { Box } from '../../layout';
import { Text } from '../../typography';
import { DefaultThemeProvider } from '../../utils/test';
import { ProgressCircle } from '../ProgressCircle';

jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
  const time = Date.now();
  cb(time);
  return time;
});
jest.mock('@coinbase/cds-common/visualizations/useCounter', () => ({
  useCounter: ({ endNum }: UseCounterParams) => endNum,
}));
jest.mock('../../hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => {
    return {
      width: 200,
      height: 100,
      observe: jest.fn(),
    };
  }),
}));

describe('ProgressCircle tests', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      const time = Date.now();
      cb(time);
      return time;
    });
    jest.mock('@coinbase/cds-common/visualizations/useCounter', () => ({
      useCounter: ({ endNum }: UseCounterParams) => endNum,
    }));
    jest.mock('../../hooks/useDimensions', () => ({
      useDimensions: jest.fn(() => {
        return {
          width: 200,
          height: 100,
          observe: jest.fn(),
        };
      }),
    }));
  });
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ProgressCircle accessibilityLabel="Test label" progress={0} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('handles 0 percent', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle progress={0} size={size} />
      </DefaultThemeProvider>,
    );

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    expect(innerCircle).toHaveAttribute('stroke-dashoffset', circumference.toString());

    expect(innerCircle).toHaveAttribute('stroke-dasharray', circumference.toString());

    expect(innerCircle).toHaveAttribute('stroke', 'var(--color-bgPrimary)');

    expect(screen.getAllByText('0%')).toHaveLength(2);
  });

  it('handles 50 percent', async () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle progress={0.5} size={size} />
      </DefaultThemeProvider>,
    );

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    await waitFor(() => {
      expect(innerCircle).toHaveAttribute('stroke-dashoffset', `${circumference * 0.5}`);
    });

    expect(innerCircle).toHaveAttribute('stroke-dasharray', `${circumference}`);

    expect(innerCircle).toHaveAttribute('stroke', 'var(--color-bgPrimary)');

    expect(screen.getAllByText('50%')).toHaveLength(2);
  });

  it('handles 100 percent', async () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle progress={1} size={size} />
      </DefaultThemeProvider>,
    );

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();

    await waitFor(() => {
      expect(innerCircle).toHaveAttribute('stroke-dashoffset', '0');
    });
    expect(innerCircle).toHaveAttribute('stroke-dasharray', `${circumference}`);

    expect(innerCircle).toHaveAttribute('stroke', 'var(--color-bgPrimary)');

    expect(screen.getAllByText('100%')).toHaveLength(2);
  });

  it('handles heavy weight', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle progress={1} size={size} weight="heavy" />
      </DefaultThemeProvider>,
    );

    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    expect(innerCircle).toHaveAttribute('stroke-width', '12');
  });

  it('handles no text', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle hideText progress={1} size={size} />
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByText('100%')).toHaveLength(0);
  });

  it('handles different color', () => {
    const size = 100;
    render(
      <DefaultThemeProvider>
        <ProgressCircle color="bgPositive" progress={1} size={size} />
      </DefaultThemeProvider>,
    );

    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toHaveAttribute('stroke', 'var(--color-bgPositive)');
  });

  it('calls onAnimationStart and onAnimationEnd callbacks', async () => {
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
        />
      </DefaultThemeProvider>,
    );

    // Wait for animation to start
    await waitFor(() => {
      expect(onAnimationStart).toHaveBeenCalledTimes(1);
    });

    // Wait for animation to end
    await waitFor(() => {
      expect(onAnimationEnd).toHaveBeenCalledTimes(1);
    });
  });

  it('renders custom content node when provided', () => {
    const size = 100;
    const customText = 'Custom Content';
    const progress = 0.75;
    const contentNode = (
      <Box testID="custom-content-node">
        <Text font="label1">
          {customText} {progress * 100}%
        </Text>
      </Box>
    );

    render(
      <DefaultThemeProvider>
        <ProgressCircle contentNode={contentNode} progress={progress} size={size} />
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByText(`${progress * 100}%`)).toHaveLength(0);
    expect(screen.getByText(`${customText} ${progress * 100}%`)).toBeDefined();
    expect(screen.getByTestId('custom-content-node')).toBeDefined();
  });

  it('does not render content node when hideContent is true', () => {
    const size = 100;
    const customText = 'Custom Content';
    const progress = 0.75;
    const contentNode = (
      <Box testID="custom-content-node">
        <Text font="label1">
          {customText} {progress * 100}%
        </Text>
      </Box>
    );

    render(
      <DefaultThemeProvider>
        <ProgressCircle
          hideContent
          contentNode={contentNode}
          progress={progress}
          size={size}
          testID="mock-progress-circle"
        />
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
        <ProgressCircle disableAnimateOnMount progress={progress} size={size} />
      </DefaultThemeProvider>,
    );

    const circumference = getCircumference(getRadius(size, 4));
    const expectedOffset = (1 - progress) * circumference;
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');

    // Should start at target offset, not at circumference (empty)
    expect(innerCircle).toHaveAttribute('stroke-dashoffset', expectedOffset.toString());

    // Should show target percentage immediately, not animate from 0
    expect(screen.getAllByText('50%').length).toBeGreaterThan(0);
  });
});
