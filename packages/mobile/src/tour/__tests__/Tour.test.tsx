import React from 'react';
import { Button, Text, View } from 'react-native';
import { useTourContext } from '@coinbase/cds-common/tour/TourContext';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Tour, type TourProps } from '../Tour';
import { TourStep } from '../TourStep';

const StepOne = () => {
  const { goNextTourStep } = useTourContext();

  return (
    <>
      <Text>Step 1</Text>
      <Button onPress={goNextTourStep} title="Next" />
    </>
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
      <>
        <Text>Step 2</Text>
        <Button title="Next" />
      </>
    ),
  },
  {
    id: 'step3',
    Component: () => (
      <>
        <Text>Step 3</Text>
        <Button title="Next" />
      </>
    ),
  },
];

const exampleProps: TourProps = {
  steps: mockTour,
  activeTourStep: mockTour[0],
  onChange: jest.fn(),
  accessibilityLabel: 'tour modal',
  testID: 'tour-test',
};

describe('Tour', () => {
  it('passes accessibility', async () => {
    render(
      <DefaultThemeProvider>
        <Tour {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('tour-test')).toBeAccessible();
  });

  it('renders the active tour step', () => {
    render(
      <DefaultThemeProvider>
        <Tour {...exampleProps} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Step 1')).toBeTruthy();
    expect(screen.getByTestId('tour-step-arrow')).toBeTruthy();
  });

  it('calls onChange when changing steps', async () => {
    const onChange = jest.fn();
    render(
      <DefaultThemeProvider>
        <Tour {...exampleProps} onChange={onChange} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Next'));

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

    expect(screen.queryByRole('dialog')).not.toBeTruthy();
  });

  it('sets the second tour step active when activeTourStep is second step', () => {
    render(
      <DefaultThemeProvider>
        <Tour {...exampleProps} activeTourStep={mockTour[1]} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Step 2')).toBeTruthy();
  });

  describe('styles', () => {
    it('applies styles.stepArrow to the arrow element', () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} styles={{ stepArrow: { backgroundColor: 'blue' } }} />
        </DefaultThemeProvider>,
      );
      const arrowEl = screen.getByTestId('tour-step-arrow');
      expect(arrowEl).toHaveStyle({ backgroundColor: 'blue' });
    });

    it('applies styles.stepContainer to the step container element', () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} styles={{ stepContainer: { borderRadius: 8 } }} />
        </DefaultThemeProvider>,
      );
      const stepContainerEl = screen.getByTestId('tour-step-container');
      expect(stepContainerEl).toHaveStyle({ borderRadius: 8 });
    });

    it('applies styles.mask to the mask element', async () => {
      render(
        <DefaultThemeProvider>
          <Tour {...exampleProps} styles={{ mask: { backgroundColor: 'blue' } }}>
            <TourStep id="step1">
              <View />
            </TourStep>
          </Tour>
        </DefaultThemeProvider>,
      );
      await waitFor(() => {
        const maskEl = screen.getByTestId('tour-mask');
        expect(maskEl).toHaveStyle({ backgroundColor: 'blue' });
      });
    });
  });
});
