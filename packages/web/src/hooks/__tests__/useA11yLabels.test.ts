import { renderHook } from '@testing-library/react-hooks';

import { useA11yLabels } from '../useA11yLabels';

const LABELLED_BY_ID = 'some-labelled-by-id';
const LABEL = 'Some label';

describe('useA11yLabels', () => {
  it('generates default props when no options are passed', () => {
    const { result } = renderHook(() => useA11yLabels());

    expect(result.current.labelledBySource).toMatch(/:r[0-9].*/);
    expect(result.current.labelledBy).toBe(result.current.labelledBySource);
    expect(result.current.label).toBeUndefined();
  });

  it('does not generate a labelledBy id when accessibilityLabelledBy is defined', () => {
    const { result } = renderHook(() => useA11yLabels({ accessibilityLabelledBy: LABELLED_BY_ID }));

    expect(result.current.labelledBySource).toBeUndefined();
    expect(result.current.labelledBy).toBe(LABELLED_BY_ID);
    expect(result.current.label).toBeUndefined();
  });

  it('does not generate a labelledBy id when accessibilityLabel is defined', () => {
    const { result } = renderHook(() => useA11yLabels({ accessibilityLabel: LABEL }));

    expect(result.current.labelledBySource).toBeUndefined();
    expect(result.current.labelledBy).toBeUndefined();
    expect(result.current.label).toBe(LABEL);
  });

  it('overrides accessibilityLabel with accessibilityLabelledBy when both are defined', () => {
    const { result } = renderHook(() =>
      useA11yLabels({ accessibilityLabelledBy: LABELLED_BY_ID, accessibilityLabel: LABEL }),
    );

    expect(result.current.labelledBySource).toBeUndefined();
    expect(result.current.labelledBy).toBe(LABELLED_BY_ID);
    expect(result.current.label).toBeUndefined();
  });
});
