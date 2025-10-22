import { act, renderHook } from '@testing-library/react-hooks';

import { useStepper } from '../useStepper';

type StepperValue = {
  id: string;
  label?: string;
  subSteps?: StepperValue[];
};

describe('useStepper', () => {
  const mockSteps: StepperValue[] = [
    { id: 'step1', label: 'Step 1' },
    { id: 'step2', label: 'Step 2' },
    { id: 'step3', label: 'Step 3' },
  ];

  const mockNestedSteps: StepperValue[] = [
    {
      id: 'step1',
      label: 'Step 1',
      subSteps: [
        { id: 'step1.1', label: 'Step 1.1' },
        { id: 'step1.2', label: 'Step 1.2' },
      ],
    },
    { id: 'step2', label: 'Step 2' },
    {
      id: 'step3',
      label: 'Step 3',
      subSteps: [{ id: 'step3.1', label: 'Step 3.1' }],
    },
  ];

  describe('initial state', () => {
    it('should return initial state with null as active by default', () => {
      const { result } = renderHook(() => useStepper({ steps: mockSteps }));
      const [stepperState, stepperApi] = result.current;

      expect(stepperState).toEqual({
        activeStepId: null,
      });

      expect(stepperApi).toHaveProperty('goToStep');
      expect(stepperApi).toHaveProperty('goNextStep');
      expect(stepperApi).toHaveProperty('goPreviousStep');
      expect(stepperApi).toHaveProperty('reset');
    });

    it('should return initial state with specified default active step', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: mockSteps[1].id }),
      );
      const [stepperState] = result.current;

      expect(stepperState.activeStepId).toEqual(mockSteps[1].id);
    });
  });

  describe('goToStep', () => {
    it('should set the active step to the specified step', () => {
      const { result } = renderHook(() => useStepper({ steps: mockSteps }));
      const [, stepperApi] = result.current;

      act(() => {
        stepperApi.goToStep('step3');
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toEqual(mockSteps[2].id);
    });

    it('should do nothing if id is not found', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: mockSteps[1].id }),
      );
      const [, stepperApi] = result.current;

      act(() => {
        stepperApi.goToStep('nonexistent-step');
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toEqual(mockSteps[1].id);
    });
  });

  describe('goNextStep', () => {
    it('should advance to the next step', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: mockSteps[0].id }),
      );
      const [, stepperApi] = result.current;

      act(() => {
        stepperApi.goNextStep();
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toEqual(mockSteps[1].id);
    });

    it('should maintain the last step when trying to advance from the last step', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: mockSteps[2].id }),
      );
      const [, stepperApi] = result.current;

      act(() => {
        stepperApi.goNextStep();
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toEqual(mockSteps[2].id);
    });
  });

  describe('goPreviousStep', () => {
    it('should go back to the previous step', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: mockSteps[1].id }),
      );
      const [, stepperApi] = result.current;

      act(() => {
        stepperApi.goPreviousStep();
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toEqual(mockSteps[0].id);
    });

    it('should do nothing when already at the first step', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: mockSteps[0].id }),
      );
      const [, stepperApi] = result.current;

      act(() => {
        stepperApi.goPreviousStep();
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toEqual(mockSteps[0].id);
    });
  });

  describe('reset', () => {
    it('should reset to the default active step', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: mockSteps[1].id }),
      );
      const [, stepperApi] = result.current;

      // Move to different step
      act(() => {
        stepperApi.goToStep('step3');
      });

      // Reset
      act(() => {
        stepperApi.reset();
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toEqual('step2');
    });

    it('should reset to null when no default active step is provided', () => {
      const { result } = renderHook(() => useStepper({ steps: mockSteps }));
      const [, stepperApi] = result.current;

      // Move to different step
      act(() => {
        stepperApi.goToStep('step3');
      });

      // Reset
      act(() => {
        stepperApi.reset();
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toEqual(null);
    });
  });

  describe('nested steps functionality', () => {
    it('should flatten nested steps and navigate through them correctly', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockNestedSteps, defaultActiveStepId: mockNestedSteps[0].id }),
      );
      const [initialState, stepperApi] = result.current;

      // Should start at the first step (parent step)
      expect(initialState.activeStepId).toBe('step1');

      // Navigate through the flattened structure: step1 -> step1.1 -> step1.2 -> step2 -> step3 -> step3.1
      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('step1.1');

      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('step1.2');

      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('step2');

      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('step3');

      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('step3.1');

      // Should remain on the last substep
      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('step3.1');
    });

    it('should navigate backwards through nested steps correctly', () => {
      // First, navigate to the last step to test backwards navigation
      const { result } = renderHook(() => useStepper({ steps: mockNestedSteps }));
      const [, stepperApi] = result.current;

      // Navigate to the last substep (step3.1)
      act(() => {
        stepperApi.goToStep('step3.1');
      });

      // Navigate backwards through the flattened structure
      act(() => {
        stepperApi.goPreviousStep();
      });
      expect(result.current[0].activeStepId).toBe('step3');

      act(() => {
        stepperApi.goPreviousStep();
      });
      expect(result.current[0].activeStepId).toBe('step2');

      act(() => {
        stepperApi.goPreviousStep();
      });
      expect(result.current[0].activeStepId).toBe('step1.2');

      act(() => {
        stepperApi.goPreviousStep();
      });
      expect(result.current[0].activeStepId).toBe('step1.1');

      act(() => {
        stepperApi.goPreviousStep();
      });
      expect(result.current[0].activeStepId).toBe('step1');
    });

    it('should allow goToStep to navigate to any step in the flattened structure', () => {
      const { result } = renderHook(() => useStepper({ steps: mockNestedSteps }));
      const [, stepperApi] = result.current;

      // Navigate to a substep
      act(() => {
        stepperApi.goToStep('step1.2');
      });
      expect(result.current[0].activeStepId).toBe('step1.2');

      // Navigate to a parent step
      act(() => {
        stepperApi.goToStep('step3');
      });
      expect(result.current[0].activeStepId).toBe('step3');

      // Navigate to the last substep
      act(() => {
        stepperApi.goToStep('step3.1');
      });
      expect(result.current[0].activeStepId).toBe('step3.1');
    });
  });

  describe('null activeStepId behavior', () => {
    it('should return null activeStepId when defaultActiveStepId is explicitly null', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: null }),
      );
      const [stepperState] = result.current;

      expect(stepperState.activeStepId).toBeNull();
    });

    it('should handle goNextStep when activeStepId is null', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: null }),
      );
      const [, stepperApi] = result.current;

      act(() => {
        stepperApi.goNextStep();
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toEqual(mockSteps[0].id);
    });

    it('should handle goPreviousStep when activeStepId is null', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: null }),
      );
      const [, stepperApi] = result.current;

      act(() => {
        stepperApi.goPreviousStep();
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toBeNull();
    });

    it('should reset to null when defaultActiveStepId is null', () => {
      const { result } = renderHook(() =>
        useStepper({ steps: mockSteps, defaultActiveStepId: null }),
      );
      const [, stepperApi] = result.current;

      // Move to a step first
      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toEqual(mockSteps[0].id);

      // Reset should go back to null
      act(() => {
        stepperApi.reset();
      });
      expect(result.current[0].activeStepId).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle empty steps array gracefully', () => {
      const { result } = renderHook(() => useStepper({ steps: [] }));
      const [stepperState, stepperApi] = result.current;

      expect(stepperState.activeStepId).toBeNull();

      // Should not throw when calling API methods
      act(() => {
        stepperApi.goNextStep();
        stepperApi.goPreviousStep();
        stepperApi.reset();
      });
    });

    it('should handle single step', () => {
      const singleStep = [{ id: 'only-step', label: 'Only Step' }];
      const { result } = renderHook(() => useStepper({ steps: singleStep }));
      const [, stepperApi] = result.current;

      // Should remain on the single step when calling goNextStep
      act(() => {
        stepperApi.goNextStep();
      });

      const [stepperState] = result.current;
      expect(stepperState.activeStepId).toEqual(singleStep[0].id);
    });
  });

  describe('skipParentSteps functionality', () => {
    it('should skip parent steps when skipParentSteps is true', () => {
      const { result } = renderHook(() =>
        useStepper({
          steps: mockNestedSteps,
          skipParentSteps: true,
          defaultActiveStepId: mockNestedSteps[1].id,
        }),
      );
      const [initialState, stepperApi] = result.current;

      expect(initialState.activeStepId).toBe('step2'); // step2 has no subSteps, so it's valid

      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('step3.1'); // Skip step3 (parent), go to step3.1
    });

    it('should skip parent steps when navigating backwards with skipParentSteps', () => {
      const { result } = renderHook(() =>
        useStepper({
          steps: mockNestedSteps,
          skipParentSteps: true,
        }),
      );
      const [, stepperApi] = result.current;

      // Start from the last non-parent step
      act(() => {
        stepperApi.goToStep('step3.1');
      });
      expect(result.current[0].activeStepId).toBe('step3.1');

      // Navigate backwards should skip parent steps
      act(() => {
        stepperApi.goPreviousStep();
      });
      expect(result.current[0].activeStepId).toBe('step2'); // Skip step3 (parent)

      act(() => {
        stepperApi.goPreviousStep();
      });
      expect(result.current[0].activeStepId).toBe('step1.2'); // Skip step1 (parent)

      act(() => {
        stepperApi.goPreviousStep();
      });
      expect(result.current[0].activeStepId).toBe('step1.1');
    });

    it('should prevent navigation to parent steps with goToStep when skipParentSteps is true', () => {
      const { result } = renderHook(() =>
        useStepper({
          steps: mockNestedSteps,
          skipParentSteps: true,
          defaultActiveStepId: mockNestedSteps[0].subSteps?.[0].id,
        }),
      );
      const [, stepperApi] = result.current;

      // Try to navigate to a parent step - should be ignored
      act(() => {
        stepperApi.goToStep('step1');
      });
      expect(result.current[0].activeStepId).toBe('step1.1'); // Should remain unchanged

      act(() => {
        stepperApi.goToStep('step3');
      });
      expect(result.current[0].activeStepId).toBe('step1.1'); // Should remain unchanged

      // Should allow navigation to non-parent steps
      act(() => {
        stepperApi.goToStep('step2');
      });
      expect(result.current[0].activeStepId).toBe('step2');

      act(() => {
        stepperApi.goToStep('step3.1');
      });
      expect(result.current[0].activeStepId).toBe('step3.1');
    });

    it('should work correctly with mixed parent and non-parent steps', () => {
      const mixedSteps: StepperValue[] = [
        { id: 'simple1', label: 'Simple Step 1' }, // non-parent
        {
          id: 'parent1',
          label: 'Parent Step 1',
          subSteps: [{ id: 'sub1.1', label: 'Sub Step 1.1' }],
        }, // parent
        { id: 'simple2', label: 'Simple Step 2' }, // non-parent
        {
          id: 'parent2',
          label: 'Parent Step 2',
          subSteps: [
            { id: 'sub2.1', label: 'Sub Step 2.1' },
            { id: 'sub2.2', label: 'Sub Step 2.2' },
          ],
        }, // parent
        { id: 'simple3', label: 'Simple Step 3' }, // non-parent
      ];

      const { result } = renderHook(() =>
        useStepper({
          steps: mixedSteps,
          skipParentSteps: true,
          defaultActiveStepId: mixedSteps[0].id,
        }),
      );
      const [, stepperApi] = result.current;

      // Should start at first non-parent step
      expect(result.current[0].activeStepId).toBe('simple1');

      // Navigate forward: simple1 -> sub1.1 -> simple2 -> sub2.1 -> sub2.2 -> simple3
      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('sub1.1'); // Skip parent1

      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('simple2');

      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('sub2.1'); // Skip parent2

      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('sub2.2');

      act(() => {
        stepperApi.goNextStep();
      });
      expect(result.current[0].activeStepId).toBe('simple3');
    });

    it('should work normally when skipParentSteps is false', () => {
      const { result } = renderHook(() =>
        useStepper({
          steps: mockNestedSteps,
          skipParentSteps: false,
          defaultActiveStepId: mockNestedSteps[0].id,
        }),
      );
      const [initialState, stepperApi] = result.current;

      // Should work the same as default behavior
      expect(initialState.activeStepId).toBe('step1');

      // Should allow navigation to parent steps
      act(() => {
        stepperApi.goToStep('step3');
      });
      expect(result.current[0].activeStepId).toBe('step3');
    });
  });

  describe('state consistency', () => {
    it('should maintain referential stability for API methods', () => {
      const { result, rerender } = renderHook(() => useStepper({ steps: mockSteps }));
      const [, initialApi] = result.current;

      rerender();
      const [, rerenderApi] = result.current;

      expect(initialApi.goToStep).toBe(rerenderApi.goToStep);
      expect(initialApi.goNextStep).toBe(rerenderApi.goNextStep);
      expect(initialApi.goPreviousStep).toBe(rerenderApi.goPreviousStep);
      expect(initialApi.reset).toBe(rerenderApi.reset);
    });
  });
});
