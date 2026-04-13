import React from 'react';
import { useTourContext } from '@coinbase/cds-common/tour/TourContext';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Tour, type TourProps } from '../Tour';
import { TourStep } from '../TourStep';

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

    it('applies classNames.stepContainer to the step container element', () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} classNames={{ stepContainer: 'custom-step-container-class' }} />
        </DefaultThemeProvider>,
      );
      const stepContainerEl = document.querySelector('.cds-Tour-stepContainer');
      expect(stepContainerEl).toHaveClass('custom-step-container-class');
    });

    it('applies styles.stepContainer to the step container element', () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} styles={{ stepContainer: { borderRadius: '8px' } }} />
        </DefaultThemeProvider>,
      );
      const stepContainerEl = document.querySelector('.cds-Tour-stepContainer');
      expect(stepContainerEl).toHaveStyle({ borderRadius: '8px' });
    });

    it('applies classNames.mask to the mask element', async () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} classNames={{ mask: 'custom-mask-class' }}>
            <TourStep id="step1">
              <div />
            </TourStep>
          </Tour>
        </DefaultThemeProvider>,
      );
      await waitFor(() => {
        const maskEl = document.querySelector('.cds-Tour-mask');
        expect(maskEl).toHaveClass('custom-mask-class');
      });
    });

    it('applies styles.mask to the mask element', async () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} styles={{ mask: { backgroundColor: 'blue' } }}>
            <TourStep id="step1">
              <div />
            </TourStep>
          </Tour>
        </DefaultThemeProvider>,
      );
      await waitFor(() => {
        const maskEl = document.querySelector('.cds-Tour-mask');
        expect(maskEl).toHaveStyle({ backgroundColor: 'blue' });
      });
    });
  });
});
