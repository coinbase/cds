/**
 * SelectChip selection: a single option, a multi-select list, or empty.
 */
type SelectChipValue = string | readonly string[] | null | undefined;

/**
 * Whether a SelectChip value represents a current selection.
 */
export function getSelectChipHasValue(value: SelectChipValue): boolean {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

/**
 * Resolves SelectChip `active` from an explicit prop, legacy invert props, or the current selection.
 * Explicit `active={false}` stays inactive even when a value is selected.
 * When `active` is omitted and neither legacy invert prop is set, defaults to whether a value is selected.
 */
export function getSelectChipActive(
  active: boolean | undefined,
  value: SelectChipValue,
  invertColorScheme?: boolean,
  inverted?: boolean,
): boolean {
  return (
    active ??
    (invertColorScheme === undefined && inverted === undefined
      ? getSelectChipHasValue(value)
      : false)
  );
}
