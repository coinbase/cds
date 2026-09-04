import { containsStep, flattenSteps, isStepVisited } from '../utils';

type StepperValue = {
  id: string;
  label?: string;
  subSteps?: StepperValue[];
  accessibilityLabel?: string;
  metadata?: Record<string, unknown>;
};

describe('stepper utils', () => {
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
      subSteps: [
        {
          id: 'step3.1',
          label: 'Step 3.1',
          subSteps: [
            { id: 'step3.1.1', label: 'Step 3.1.1' },
            { id: 'step3.1.2', label: 'Step 3.1.2' },
          ],
        },
        { id: 'step3.2', label: 'Step 3.2' },
      ],
    },
  ];

  describe('containsStep', () => {
    it('should return false for step without sub-steps', () => {
      const step = mockSteps[0];
      const result = containsStep({ step, targetStepId: 'any-id' });
      expect(result).toBe(false);
    });

    it('should return false when target step is not found in sub-steps', () => {
      const step = mockNestedSteps[0];
      const result = containsStep({ step, targetStepId: 'non-existent' });
      expect(result).toBe(false);
    });

    it('should return true when target step is found in direct sub-steps', () => {
      const step = mockNestedSteps[0];
      const result = containsStep({ step, targetStepId: 'step1.1' });
      expect(result).toBe(true);
    });

    it('should return true when target step is found in nested sub-steps', () => {
      const step = mockNestedSteps[2];
      const result = containsStep({ step, targetStepId: 'step3.1.1' });
      expect(result).toBe(true);
    });

    it('should return true when target step is found in multiple levels deep', () => {
      const step = mockNestedSteps[2];
      const result = containsStep({ step, targetStepId: 'step3.1.2' });
      expect(result).toBe(true);
    });

    it('should return false when checking parent step for its own ID', () => {
      const step = mockNestedSteps[0];
      const result = containsStep({ step, targetStepId: 'step1' });
      expect(result).toBe(false);
    });
  });

  describe('flattenSteps', () => {
    it('should return steps as-is when no sub-steps exist', () => {
      const result = flattenSteps(mockSteps);
      expect(result).toEqual(mockSteps);
      expect(result).toHaveLength(3);
    });

    it('should flatten nested steps in correct order', () => {
      const result = flattenSteps(mockNestedSteps);
      expect(result).toHaveLength(9);
      expect(result.map((step) => step.id)).toEqual([
        'step1',
        'step1.1',
        'step1.2',
        'step2',
        'step3',
        'step3.1',
        'step3.1.1',
        'step3.1.2',
        'step3.2',
      ]);
    });

    it('should handle empty array', () => {
      const result = flattenSteps([]);
      expect(result).toEqual([]);
    });

    it('should handle single step with no sub-steps', () => {
      const singleStep = [{ id: 'single', label: 'Single Step' }];
      const result = flattenSteps(singleStep);
      expect(result).toEqual(singleStep);
    });

    it('should handle deeply nested structure', () => {
      const deepNested: StepperValue[] = [
        {
          id: 'root',
          label: 'Root',
          subSteps: [
            {
              id: 'level1',
              label: 'Level 1',
              subSteps: [
                {
                  id: 'level2',
                  label: 'Level 2',
                  subSteps: [{ id: 'level3', label: 'Level 3' }],
                },
              ],
            },
          ],
        },
      ];
      const result = flattenSteps(deepNested);
      expect(result.map((step) => step.id)).toEqual(['root', 'level1', 'level2', 'level3']);
    });

    it('should preserve step objects without modification', () => {
      const stepWithMetadata: StepperValue[] = [
        {
          id: 'step1',
          label: 'Step 1',
          accessibilityLabel: 'First step',
          metadata: { custom: 'data' },
        },
      ];
      const result = flattenSteps(stepWithMetadata);
      expect(result[0]).toEqual(stepWithMetadata[0]);
      expect(result[0].metadata).toEqual({ custom: 'data' });
    });
  });

  describe('isStepVisited', () => {
    it('should return true when step comes before active step', () => {
      const step = mockSteps[0];
      const flatStepIds = mockSteps.map((s) => s.id);
      const result = isStepVisited({
        step,
        activeStepId: 'step2',
        flatStepIds,
      });
      expect(result).toBe(true);
    });

    it('should return false when step is the active step', () => {
      const step = mockSteps[1];
      const flatStepIds = mockSteps.map((s) => s.id);
      const result = isStepVisited({
        step,
        activeStepId: 'step2',
        flatStepIds,
      });
      expect(result).toBe(false);
    });

    it('should return false when step comes after active step', () => {
      const step = mockSteps[2];
      const flatStepIds = mockSteps.map((s) => s.id);
      const result = isStepVisited({
        step,
        activeStepId: 'step2',
        flatStepIds,
      });
      expect(result).toBe(false);
    });

    it('should work with nested steps', () => {
      const flatSteps = flattenSteps(mockNestedSteps);
      const flatStepIds = flatSteps.map((s) => s.id);
      const step1_1 = flatSteps.find((s) => s.id === 'step1.1')!;
      const step3_1_1 = flatSteps.find((s) => s.id === 'step3.1.1')!;

      // step1.1 should be visited when active step is step3.1.1
      const result1 = isStepVisited({
        step: step1_1,
        activeStepId: 'step3.1.1',
        flatStepIds,
      });
      expect(result1).toBe(true);

      // step3.1.1 should not be visited when active step is step1.1
      const result2 = isStepVisited({
        step: step3_1_1,
        activeStepId: 'step1.1',
        flatStepIds,
      });
      expect(result2).toBe(false);
    });

    it('should return true when step is not found (current behavior)', () => {
      // Note: Current implementation returns true when step is not found because
      // findIndex returns -1, and activeIndex >= -1 evaluates to true
      const nonExistentStep: StepperValue = { id: 'non-existent', label: 'Non-existent' };
      const flatStepIds = mockSteps.map((s) => s.id);
      const result = isStepVisited({
        step: nonExistentStep,
        activeStepId: 'step1',
        flatStepIds,
      });
      expect(result).toBe(true);
    });

    it('should return false when active step is not found', () => {
      const step = mockSteps[0];
      const flatStepIds = mockSteps.map((s) => s.id);
      const result = isStepVisited({
        step,
        activeStepId: 'non-existent',
        flatStepIds,
      });
      expect(result).toBe(false);
    });
  });
});
