import '@testing-library/jest-dom';

import React from 'react';
import type { UseCounterParams } from '@coinbase/cds-common/visualizations/useCounter';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen, waitFor } from '@testing-library/react';

import { Box } from '../../layout/Box';
import { ProgressBar } from '../ProgressBar';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';

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

let iter = 0;
describe('ProgressBar test', () => {
  beforeEach(() => {
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get() {
          iter += 1;
          if (iter % 2 === 0) {
            // text container
            return 20;
          }

          // whole container width
          return 200;
        },
      },
      offsetHeight: {
        get() {
          return 100;
        },
      },
    });
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(<ProgressBar accessibilityLabel="progressbar" progress={0} />),
    ).toHaveNoViolations();
  });

  it('places bar label in correct position if it flows off the left container', async () => {
    render(
      <Box width="200">
        <ProgressBarWithFloatLabel label={0} progress={0}>
          <ProgressBar progress={0} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    await waitFor(() =>
      expect(screen.queryByTestId('cds-progress-bar-float-label')?.style.transform).toBeFalsy(),
    );

    expect(screen.getAllByText('0%')).toHaveLength(2);
  });

  it('places bar label in correct position in middle', async () => {
    render(
      <Box width="200">
        <ProgressBarWithFloatLabel label={50} progress={0.5}>
          <ProgressBar progress={0.5} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    // const floatLabel = screen.getByTestId('cds-progress-bar-float-label');

    // TODO: find why animations styles are not applied in tests
    // await waitFor(() => {
    //   expect(floatLabel).toHaveStyle({
    //     transform: 'translateX(80px) translateZ(0)',
    //   });
    // });

    const floatLabelText = screen.getAllByText('50%')[0];
    expect(floatLabelText.className).toContain('fgMuted');
  });

  it('renders fixed labels in correct position', () => {
    render(
      <Box width="200">
        <ProgressBarWithFixedLabels endLabel={50} labelPlacement="above" startLabel={0}>
          <ProgressBar progress={50} />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    const startLabelText = screen.getAllByText('0%')[0];
    const endLabelText = screen.getAllByText('50%')[0];

    expect(startLabelText.className).toContain('fg');
    expect(endLabelText.className).toContain('fg');
  });

  it('has correct bar width', async () => {
    render(
      <Box width="200">
        <ProgressBar color="bgPositive" progress={0.77} />
      </Box>,
    );

    const bar = screen.getByTestId('cds-progress-bar');
    expect(bar.className).toContain('bgPositive');
    await waitFor(() => {
      expect(bar).toHaveStyle({
        transform: 'translateX(-23%) translateZ(0)',
      });
    });
  });

  it('has correct bar height', () => {
    render(
      <Box width="200">
        <ProgressBar progress={0.77} weight="heavy" />
      </Box>,
    );

    const root = screen.getByRole('progressbar');
    expect(root).toHaveStyle({
      '--height': '12px',
    });
  });

  it('handles disabled state correctly', async () => {
    render(
      <Box width="200">
        <ProgressBarWithFixedLabels disabled endLabel={77} startLabel={0}>
          <ProgressBar disabled progress={0.77} />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    const bar = screen.getByTestId('cds-progress-bar');
    const startLabelText = screen.getAllByText('0%')[0];
    const endLabelText = screen.getAllByText('77%')[0];

    expect(bar.className).toContain('bgLineHeavy');
    await waitFor(() => {
      expect(bar).toHaveStyle({
        transform: 'translateX(-23%) translateZ(0)',
      });
    });

    expect(startLabelText.className).toContain('fg');
    expect(endLabelText.className).toContain('fg');
  });

  it('calls onAnimationStart and onAnimationEnd callbacks', async () => {
    const onAnimationStart = jest.fn();
    const onAnimationEnd = jest.fn();

    render(
      <Box width="200">
        <ProgressBar
          onAnimationEnd={onAnimationEnd}
          onAnimationStart={onAnimationStart}
          progress={0.5}
        />
      </Box>,
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

  it('does not call animation callbacks when progress is 0', () => {
    const onAnimationStart = jest.fn();
    const onAnimationEnd = jest.fn();

    render(
      <Box width="200">
        <ProgressBar
          onAnimationEnd={onAnimationEnd}
          onAnimationStart={onAnimationStart}
          progress={0}
        />
      </Box>,
    );

    // Animation callbacks should not be called for 0 progress
    expect(onAnimationStart).not.toHaveBeenCalled();
    expect(onAnimationEnd).not.toHaveBeenCalled();
  });

  it('applies custom styles correctly', () => {
    render(
      <Box width="200">
        <ProgressBar
          progress={0.5}
          style={{ padding: '10px' }}
          styles={{
            root: { margin: '5px', backgroundColor: 'red', height: '20px' },
            progress: { backgroundColor: 'blue' },
          }}
        />
      </Box>,
    );

    const root = screen.getByRole('progressbar');
    const progress = screen.getByTestId('cds-progress-bar');

    expect(root).toHaveStyle({
      padding: '10px',
      margin: '5px',
      backgroundColor: 'red',
      height: '20px',
    });
    expect(progress).toHaveStyle({ backgroundColor: 'blue' });
  });

  it('applies custom styles to ProgressBarWithFixedLabels', () => {
    render(
      <Box width="200">
        <ProgressBarWithFixedLabels
          endLabel={100}
          labelPlacement="above"
          startLabel={0}
          styles={{
            root: { padding: '8px' },
            labelContainer: { backgroundColor: 'lightgray' },
            startLabel: { opacity: '0.7' },
            endLabel: { fontWeight: 'bold' },
          }}
        >
          <ProgressBar progress={1} />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    const root = screen.getByTestId('cds-progress-label-container').parentElement;
    const labelContainer = screen.getByTestId('cds-progress-label-container');
    const startLabelText = screen.getAllByText('0%')[0];
    const endLabelText = screen.getAllByText('100%')[0];

    expect(root).toHaveStyle({ padding: '8px' });
    expect(labelContainer).toHaveStyle({ backgroundColor: 'lightgray' });
    expect(startLabelText).toHaveStyle({ opacity: '0.7' });
    expect(endLabelText).toHaveStyle({ fontWeight: 'bold' });
  });

  it('applies custom styles to ProgressBarWithFloatLabel', () => {
    render(
      <Box width="200">
        <ProgressBarWithFloatLabel
          label={50}
          labelPlacement="above"
          progress={0.5}
          styles={{
            root: { margin: '4px' },
            labelContainer: { padding: '6px' },
            label: { fontWeight: 'bold' },
          }}
        >
          <ProgressBar progress={0.5} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    const labelContainer = screen.getByTestId('cds-progress-label-container');
    const floatLabelText = screen.getAllByText('50%')[0];

    expect(labelContainer).toHaveStyle({ padding: '6px' });
    expect(floatLabelText).toHaveStyle({ fontWeight: 'bold' });
  });

  it('skips mount animation when disableAnimateOnMount is true for ProgressBar', () => {
    render(
      <Box width="200">
        <ProgressBar disableAnimateOnMount progress={0.5} />
      </Box>,
    );

    const bar = screen.getByTestId('cds-progress-bar');

    // With disableAnimateOnMount, should start at target position (-50%) immediately
    // not at animation start position (-100%)
    expect(bar).toHaveStyle({
      transform: 'translateX(-50%) translateZ(0)',
    });
  });

  it('starts at animation start position when disableAnimateOnMount is not set', () => {
    render(
      <Box width="200">
        <ProgressBar progress={0.5} />
      </Box>,
    );

    const bar = screen.getByTestId('cds-progress-bar');

    // Without disableAnimateOnMount, should start at -100% (empty) and animate to target
    expect(bar).toHaveStyle({
      transform: 'translateX(-100%) translateZ(0)',
    });
  });

  it('skips mount animation when disableAnimateOnMount is true for ProgressBarWithFixedLabels', () => {
    render(
      <Box width="200">
        <ProgressBarWithFixedLabels
          disableAnimateOnMount
          endLabel={50}
          labelPlacement="above"
          startLabel={0}
        >
          <ProgressBar disableAnimateOnMount progress={0.5} />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    // Should show target percentage immediately, not animate from 0
    expect(screen.getAllByText('0%').length).toBeGreaterThan(0);
    expect(screen.getAllByText('50%').length).toBeGreaterThan(0);
  });

  it('skips mount animation when disableAnimateOnMount is true for ProgressBarWithFloatLabel', () => {
    render(
      <Box width="200">
        <ProgressBarWithFloatLabel
          disableAnimateOnMount
          label={50}
          labelPlacement="above"
          progress={0.5}
        >
          <ProgressBar disableAnimateOnMount progress={0.5} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    // Should show target percentage immediately, not animate from 0
    expect(screen.getAllByText('50%').length).toBeGreaterThan(0);
  });
});
