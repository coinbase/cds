import { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { NoopFn } from '../../utils/mockUtils';
import { type TourOptions, useTour } from '../useTour';

const mockTour = [
  {
    id: 'step1',
    Component: () => (
      <div>
        <button type="button">Next</button>
      </div>
    ),
  },
  {
    id: 'step2',
    Component: () => (
      <div>
        <button type="button">Next</button>
      </div>
    ),
  },
  {
    id: 'step3',
    Component: () => (
      <div>
        <button type="button">Next</button>
      </div>
    ),
  },
];

const exampleProps: TourOptions = {
  steps: mockTour,
  activeTourStep: mockTour[0],
  onChange: NoopFn,
};

describe('useTour', () => {
  it('returns correct API', () => {
    const { result } = renderHook(() => useTour(exampleProps));

    expect(result.current.setActiveTourStep).toBeTruthy();
    expect(result.current.startTour).toBeTruthy();
    expect(result.current.stopTour).toBeTruthy();
    expect(result.current.goPreviousTourStep).toBeTruthy();
    expect(result.current.goNextTourStep).toBeTruthy();
    expect(result.current.steps).toBe(mockTour);
    expect(result.current.activeTourStep).toBe(mockTour[0]);
  });

  it('sets correct activeTourStep when triggering setActiveTourStep with valid tourStepId', async () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange };
    const { result } = renderHook(() => useTour(props));
    const { setActiveTourStep } = result.current;

    await act(async () => {
      setActiveTourStep(mockTour[2].id);
    });

    expect(onChange).toHaveBeenCalledWith(mockTour[2]);
  });

  it('does not set activeTourStep when triggering setActiveTourStep with invalid tourStepId', async () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange };
    const { result } = renderHook(() => useTour(props));
    const { setActiveTourStep } = result.current;

    await act(async () => {
      setActiveTourStep('test');
    });

    expect(result.current.activeTourStep).toEqual(mockTour[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets correct activeTourStep when triggering goNextTourStep', async () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange };
    const { result } = renderHook(() => useTour(props));
    const { goNextTourStep } = result.current;

    await act(async () => {
      goNextTourStep();
    });

    expect(onChange).toHaveBeenCalledWith(mockTour[1]);
  });

  it('sets correct activeTourStep when next step is disabled', async () => {
    const steps = mockTour.map((step) =>
      step.id === 'step2' ? { ...step, disabled: true } : step,
    );
    const onChange = jest.fn();
    const props = { steps, onChange, activeTourStep: steps[0] };
    const { result } = renderHook(() => useTour(props));
    const { goNextTourStep } = result.current;

    await act(async () => {
      goNextTourStep();
    });

    expect(onChange).toHaveBeenCalledWith(steps[2]);
  });

  it('sets correct activeTourStep when triggering goPreviousTourStep', async () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange, activeTourStep: mockTour[1] };
    const { result } = renderHook(() => useTour(props));
    const { goPreviousTourStep } = result.current;

    await act(async () => {
      goPreviousTourStep();
    });

    expect(onChange).toHaveBeenCalledWith(mockTour[0]);
  });

  it('sets correct activeTourStep when previous step is disabled', async () => {
    const steps = mockTour.map((step) =>
      step.id === 'step2' ? { ...step, disabled: true } : step,
    );
    const onChange = jest.fn();
    const props = { steps, onChange, activeTourStep: steps[2] };
    const { result } = renderHook(() => useTour(props));
    const { goPreviousTourStep } = result.current;

    await act(async () => {
      goPreviousTourStep();
    });

    expect(onChange).toHaveBeenCalledWith(steps[0]);
  });

  it('sets activeTourStep when triggering startTour', async () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange };
    const { result } = renderHook(() => useTour(props));
    const { startTour } = result.current;

    await act(async () => {
      startTour();
    });

    expect(onChange).toHaveBeenCalledWith(mockTour[0]);
  });

  it('sets activeTourStep to null when trigering stopTour', async () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange };
    const { result } = renderHook(() => useTour(props));
    const { stopTour } = result.current;

    await act(async () => {
      stopTour();
    });

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('does not set activeTourStep when next step does not exist', async () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange, activeTourStep: mockTour[2] };
    const { result } = renderHook(() => useTour(props));
    const { goNextTourStep } = result.current;

    await act(async () => {
      goNextTourStep();
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not set activeTourStep when previous step does not exist', async () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange, activeTourStep: mockTour[0] };
    const { result } = renderHook(() => useTour(props));
    const { goPreviousTourStep } = result.current;

    await act(async () => {
      goPreviousTourStep();
    });

    expect(onChange).not.toHaveBeenCalled();
  });
});
