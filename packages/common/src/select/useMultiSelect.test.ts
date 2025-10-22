import { act, renderHook } from '@testing-library/react';

import { useMultiSelect } from './useMultiSelect';

describe('useMultiSelect', () => {
  describe('initialization', () => {
    it('should initialize with empty array when initialValue is null', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: null }));
      expect(result.current.value).toEqual([]);
    });

    it('should initialize with provided initialValue', () => {
      const initialValue = ['option1', 'option2'];
      const { result } = renderHook(() => useMultiSelect({ initialValue }));
      expect(result.current.value).toEqual(initialValue);
    });

    it('should return the correct API shape', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: null }));
      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('onChange');
      expect(result.current).toHaveProperty('addSelection');
      expect(result.current).toHaveProperty('removeSelection');
      expect(result.current).toHaveProperty('resetSelection');
    });
  });

  describe('onChange', () => {
    it('should add a single value when it does not exist', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1'] }));

      act(() => {
        result.current.onChange('option2');
      });

      expect(result.current.value).toEqual(['option1', 'option2']);
    });

    it('should remove a single value when it already exists', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1', 'option2'] }));

      act(() => {
        result.current.onChange('option2');
      });

      expect(result.current.value).toEqual(['option1']);
    });

    it('should add multiple values from an array', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1'] }));

      act(() => {
        result.current.onChange(['option2', 'option3']);
      });

      expect(result.current.value).toEqual(['option1', 'option2', 'option3']);
    });

    it('should add new values when array contains existing values and remove existing values', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1', 'option2'] }));

      act(() => {
        result.current.onChange(['option2', 'option3']);
      });

      expect(result.current.value).toEqual(['option1', 'option3']);
    });

    it('should clear value when null is passed', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1', 'option2'] }));

      act(() => {
        result.current.onChange(null);
      });

      expect(result.current.value).toEqual([]);
    });
  });

  describe('addSelection', () => {
    it('should add a single value when it does not exist', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1'] }));

      act(() => {
        result.current.addSelection('option2');
      });

      expect(result.current.value).toEqual(['option1', 'option2']);
    });

    it('should not add a single value when it already exists', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1', 'option2'] }));

      act(() => {
        result.current.addSelection('option2');
      });

      expect(result.current.value).toEqual(['option1', 'option2']);
    });

    it('should add multiple values from an array', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1'] }));

      act(() => {
        result.current.addSelection(['option2', 'option3']);
      });

      expect(result.current.value).toEqual(['option1', 'option2', 'option3']);
    });

    it('should not add duplicate values when adding multiple times', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1', 'option2'] }));

      act(() => {
        result.current.addSelection(['option2', 'option3']);
      });

      expect(result.current.value).toEqual(['option1', 'option2', 'option3']);
    });

    it('should handle adding single value to empty selection', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: [] }));

      act(() => {
        result.current.addSelection(['option1']);
      });

      expect(result.current.value).toEqual(['option1']);
    });
  });

  describe('removeSelection', () => {
    it('should remove a single value when it exists', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1', 'option2'] }));

      act(() => {
        result.current.removeSelection('option2');
      });

      expect(result.current.value).toEqual(['option1']);
    });

    it('should not change value when removing non-existent value', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1'] }));

      act(() => {
        result.current.removeSelection('option2');
      });

      expect(result.current.value).toEqual(['option1']);
    });

    it('should remove multiple values sequentially', () => {
      const { result } = renderHook(() =>
        useMultiSelect({ initialValue: ['option1', 'option2', 'option3'] }),
      );

      act(() => {
        result.current.removeSelection(['option1', 'option3']);
      });

      expect(result.current.value).toEqual(['option2']);
    });

    it('should handle removal of non-existent values', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1', 'option2'] }));

      act(() => {
        result.current.removeSelection(['option3', 'option4']);
      });

      expect(result.current.value).toEqual(['option1', 'option2']);
    });

    it('should handle removal from empty selection', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: [] }));

      act(() => {
        result.current.removeSelection(['option1']);
      });

      expect(result.current.value).toEqual([]);
    });
  });

  describe('resetSelection', () => {
    it('should clear all values', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1', 'option2'] }));

      act(() => {
        result.current.resetSelection();
      });

      expect(result.current.value).toEqual([]);
    });

    it('should handle reset when already empty', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: [] }));

      act(() => {
        result.current.resetSelection();
      });

      expect(result.current.value).toEqual([]);
    });
  });

  describe('complex scenarios', () => {
    it('should handle multiple operations in sequence', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: ['option1'] }));

      act(() => {
        result.current.addSelection('option2');
      });
      expect(result.current.value).toEqual(['option1', 'option2']);

      act(() => {
        result.current.onChange('option3');
      });
      expect(result.current.value).toEqual(['option1', 'option2', 'option3']);

      act(() => {
        result.current.removeSelection('option1');
        result.current.removeSelection('option3');
      });
      expect(result.current.value).toEqual(['option2']);

      act(() => {
        result.current.addSelection('option4');
        result.current.addSelection('option5');
      });
      expect(result.current.value).toEqual(['option2', 'option4', 'option5']);

      act(() => {
        result.current.resetSelection();
      });
      expect(result.current.value).toEqual([]);
    });

    it('should handle toggling the same value multiple times', () => {
      const { result } = renderHook(() => useMultiSelect({ initialValue: [] }));

      act(() => {
        result.current.onChange('option1');
      });
      expect(result.current.value).toEqual(['option1']);

      act(() => {
        result.current.onChange('option1');
      });
      expect(result.current.value).toEqual([]);

      act(() => {
        result.current.onChange('option1');
      });
      expect(result.current.value).toEqual(['option1']);
    });
  });
});
