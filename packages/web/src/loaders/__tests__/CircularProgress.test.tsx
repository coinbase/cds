import { act } from 'react';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen, within } from '@testing-library/react';

import { CircularProgress } from '../CircularProgress';

const testVals: Record<string, number> = {
  strokeWidth: 4,
  radius: 30,
  progress: 30,
};

const newTestVals: Record<string, number> = {
  strokeWidth: 6,
  radius: 40,
  progress: 80,
};

const normalizeRadius = (radius: number, strokeWidth: number): string => {
  return (radius - strokeWidth * 2).toString();
};

describe('CircularProgress', () => {
  it('passes accessibility', async () => {
    await act(async () => {
      expect(
        await renderA11y(
          <CircularProgress
            progress={testVals.progress}
            radius={testVals.radius}
            strokeWidth={testVals.strokeWidth}
          />,
        ),
      ).toHaveNoViolations();
    });
  });

  it('should render with a svg element', async () => {
    render(
      <CircularProgress
        progress={testVals.progress}
        radius={testVals.radius}
        strokeWidth={testVals.strokeWidth}
        testID="circular-progress-svg"
      />,
    );

    const circularProgressNode = await screen.findByTestId('circular-progress-svg');
    expect(circularProgressNode).toBeTruthy();
  });

  it('radius and strokeWidths props are correctly assigned', async () => {
    render(
      <CircularProgress
        progress={testVals.progress}
        radius={testVals.radius}
        strokeWidth={testVals.strokeWidth}
        testID="circular-progress-svg"
      />,
    );

    const component = await screen.findByTestId('circular-progress-svg');
    const circleSvg = within(component).getByTestId('circular-progress-svg-circle');

    expect(circleSvg).toHaveAttribute('stroke-width', testVals.strokeWidth.toString());
    expect(circleSvg).toHaveAttribute('r', normalizeRadius(testVals.radius, testVals.strokeWidth));
  });

  it('calling render with the same component on the same container does not remount', async () => {
    const { rerender } = render(
      <CircularProgress
        progress={testVals.progress}
        radius={testVals.radius}
        strokeWidth={testVals.strokeWidth}
        testID="circular-progress-svg"
      />,
    );

    await screen.findByTestId('circular-progress-svg');

    rerender(
      <CircularProgress
        progress={newTestVals.progress}
        radius={newTestVals.radius}
        strokeWidth={newTestVals.strokeWidth}
        testID="circular-progress-svg"
      />,
    );

    const component = await screen.findByTestId('circular-progress-svg');
    const circleSvg = within(component).getByTestId('circular-progress-svg-circle');

    expect(circleSvg).toHaveAttribute('stroke-width', newTestVals.strokeWidth.toString());
    expect(circleSvg).toHaveAttribute(
      'r',
      normalizeRadius(newTestVals.radius, newTestVals.strokeWidth),
    );
  });
});
