import React from 'react';
import { useTourContext } from '@coinbase/cds-common/tour/TourContext';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Tour, type TourProps } from '../Tour';

const StepOne = () => {
  const { goNextTourStep } = useTourContext();

  return (
    <div>
      <h3>Step 1</h3>
      <button onClick={goNextTourStep} type="button">
        Next
      </button>
    </div>
  );
};

const mockTour = [
  {
    id: 'step1',
    Component: StepOne,
  },
  {
    id: 'step2',
    Component: () => (
      <div>
        <h3>Step 2</h3>
        <button type="button">Next</button>
      </div>
    ),
  },
  {
    id: 'step3',
    Component: () => (
      <div>
        <h3>Step 3</h3>
        <button type="button">Next</button>
      </div>
    ),
  },
];

const exampleProps: TourProps = {
  steps: mockTour,
  activeTourStep: mockTour[0],
  onChange: jest.fn(),
  accessibilityLabel: 'tour modal',
};

describe('Tour', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Tour {...exampleProps} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders the active tour step', () => {
    render(
      <DefaultThemeProvider>
        <Tour {...exampleProps} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByTestId('tour-step-arrow')).toBeInTheDocument();
  });

  it('calls onChange when changing steps', async () => {
    const onChange = jest.fn();
    render(
      <DefaultThemeProvider>
        <Tour {...exampleProps} onChange={onChange} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('sets tour inactive when activeTourStep is null', () => {
    render(
      <DefaultThemeProvider>
        <Tour {...exampleProps} activeTourStep={null} />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('sets the second tour step active when activeTourStep is second step', () => {
    render(
      <DefaultThemeProvider>
        <Tour {...exampleProps} activeTourStep={mockTour[1]} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  describe('classNames and styles', () => {
    it('applies styles.stepArrow to the arrow element', () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} styles={{ stepArrow: { backgroundColor: 'blue' } }} />
        </DefaultThemeProvider>,
      );
      const arrowEl = screen.getByTestId('tour-step-arrow');
      expect(arrowEl).toHaveStyle({ backgroundColor: 'blue' });
    });

    it('applies classNames.stepArrow to the arrow element', () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} classNames={{ stepArrow: 'custom-arrow-class' }} />
        </DefaultThemeProvider>,
      );
      const arrowEl = screen.getByTestId('tour-step-arrow');
      expect(arrowEl).toHaveClass('custom-arrow-class');
    });

    it('applies styles.root to the root dialog element', () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} styles={{ root: { borderRadius: '16px' } }} />
        </DefaultThemeProvider>,
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveStyle({ borderRadius: '16px' });
    });

    it('applies classNames.root to the root dialog element', () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} classNames={{ root: 'custom-root-class' }} />
        </DefaultThemeProvider>,
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('custom-root-class');
    });
  });
});
