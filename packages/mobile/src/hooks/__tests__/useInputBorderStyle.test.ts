import { inputBorderWidth } from '@cbhq/cds-common/tokens/input';
import { renderHook } from '@testing-library/react-hooks';

import { useInputBorderAnimation } from '../useInputBorderAnimation';
import { useInputBorderStyle } from '../useInputBorderStyle';

jest.mock('../useInputBorderAnimation');

describe('useInputBorderStyle', () => {
  const mockAnimateInputBorderIn = { start: jest.fn(), stop: jest.fn() };
  const mockAnimateInputBorderOut = { start: jest.fn(), stop: jest.fn() };
  const mockFocusedBorderRgba = 'rgba(0, 0, 0, 1)';
  const mockUnFocusedBorderRgba = 'rgba(0, 0, 0, 0.5)';
  const mockFocusedBorderOpacity = 1;

  beforeEach(() => {
    (useInputBorderAnimation as jest.Mock).mockReturnValue({
      animateInputBorderIn: mockAnimateInputBorderIn,
      animateInputBorderOut: mockAnimateInputBorderOut,
      focusedBorderRgba: mockFocusedBorderRgba,
      unFocusedBorderRgba: mockUnFocusedBorderRgba,
      focusedBorderOpacity: mockFocusedBorderOpacity,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return correct border styles when input is not focused', () => {
    const { result } = renderHook(() => useInputBorderStyle(false, 'primary', 'secondary'));

    expect(result.current.borderUnfocusedStyle).toEqual({
      borderColor: mockUnFocusedBorderRgba,
      borderWidth: inputBorderWidth,
    });
    expect(result.current.borderFocusedStyle).toEqual({
      opacity: mockFocusedBorderOpacity,
      borderColor: mockFocusedBorderRgba,
      borderWidth: inputBorderWidth,
    });
  });

  it('should handle bordered parameter correctly', () => {
    const { result } = renderHook(() => useInputBorderStyle(false, 'primary', 'secondary', false));

    expect(result.current.borderUnfocusedStyle).toEqual({
      borderColor: mockUnFocusedBorderRgba,
      borderWidth: 0,
    });
    expect(result.current.borderFocusedStyle).toEqual({
      opacity: mockFocusedBorderOpacity,
      borderColor: mockFocusedBorderRgba,
      borderWidth: 0,
    });
  });
});
