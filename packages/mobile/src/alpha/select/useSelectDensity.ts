import { useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import type { SelectSize } from './types';

export type SelectLabelPlacement = 'outside' | 'inside-horizontal' | 'inside-vertical';

/**
 * Resolves where the label sits — the one genuinely branchy decision in a
 * Select's layout. Mirrors TextInput's `useTextInputPlacement`, with the extra
 * multi-select axis: a multi-select can't host an inline label, so an inside
 * label always stacks vertically for it. Takes the already-resolved `compact`
 * (legacy compact active) and `size`; the size-vs-compact precedence lives in
 * the caller.
 */
export type UseSelectPlacementParams = {
  /** Legacy compact density is active (already resolved by the caller). */
  compact?: boolean;
  /** Resolved size (default already applied). */
  size: SelectSize;
  labelVariant?: 'inside' | 'outside';
  hasLabel: boolean;
  isMultiSelect: boolean;
};

export const useSelectPlacement = ({
  compact,
  size,
  labelVariant = 'outside',
  hasLabel,
  isMultiSelect,
}: UseSelectPlacementParams): SelectLabelPlacement => {
  return useMemo(() => {
    if (!hasLabel) return 'outside';
    // Legacy compact renders the label inline (inside-horizontal) for a single select;
    // a multi-select has no inline label slot, so it falls back to an outside label.
    if (compact) return isMultiSelect ? 'outside' : 'inside-horizontal';
    if (labelVariant === 'inside') {
      // Stacks vertically at size `l` (and for multi-select, which can't host an inline
      // label); at `s`/`m` a single-select label sits inline in the start slot.
      return size === 'l' || isMultiSelect ? 'inside-vertical' : 'inside-horizontal';
    }
    return 'outside';
  }, [compact, size, labelVariant, hasLabel, isMultiSelect]);
};

/**
 * The field content padding, expressed as space tokens. Select does NOT apply all
 * of this to one element — it splits it by axis so the field height stays
 * predictable (mirrors TextInput):
 *
 *   - VERTICAL (top/bottom) lives on the CONTENT (the control's touchable, which
 *     also wraps a stacked inside label). The padded content defines the field
 *     height, so the caret / start adornment centers within it instead of
 *     stretching the field taller.
 *   - HORIZONTAL (left/right) lives on the SelectStack field CONTAINER (via
 *     `styles.input`). Start / end nodes carry their own inter-slot spacing.
 */
export type ContentPadding = {
  top: ThemeVars.Space;
  right: ThemeVars.Space;
  bottom: ThemeVars.Space;
  left: ThemeVars.Space;
};

/** Horizontal content padding is constant across every size / placement. */
const horizontalContentPadding: ThemeVars.Space = 2;

/**
 * Per-size vertical padding for a single-select. This is the whole size story:
 * only the vertical padding changes between Large / Medium / Small.
 *
 * - Large  (l): 16px top/bottom
 * - Medium (m): 12px top/bottom
 * - Small  (s): 8px top/bottom
 */
const sizeVerticalPadding: Record<SelectSize, ThemeVars.Space> = { s: 1, m: 1.5, l: 2 };

/**
 * Multi-select selected chips add their own height, so the row is tightened per
 * size to keep the overall height in check (s 8->4px, m 12->8px, l 16->8px).
 */
const multiSelectVerticalPadding: Record<SelectSize, ThemeVars.Space> = { s: 0.5, m: 1, l: 1 };

/** An inline (start-slot) inside-horizontal label tightens the row to 8px. */
const insideHorizontalVerticalPadding: ThemeVars.Space = 1;

/**
 * A vertically-stacked inside label tightens the vertical padding so the stacked
 * label (20px) + value (24px) fit a 58px field: 6px above and below the stacked
 * content (12px total + 44px content + 2px border).
 */
const insideVerticalVerticalPadding: ThemeVars.Space = 0.75;

/**
 * Chip size scales with the control: `l` has room for the larger `s` chip, while
 * smaller sizes use `xs`.
 */
const sizeChipSize: Record<SelectSize, 'xs' | 's'> = { s: 'xs', m: 'xs', l: 's' };

export type UseSelectDensityParams = {
  labelPlacement: SelectLabelPlacement;
  /** Resolved size (default already applied). */
  size: SelectSize;
  isMultiSelect: boolean;
  /** Whether the select currently has a selected value (multi-select chips). */
  hasValue: boolean;
};

export type SelectDensity = {
  /** Padding box (space tokens) for the field content area. */
  contentPadding: ContentPadding;
  /** Size of the selected-value chips in a multi-select. */
  chipSize: 'xs' | 's';
};

/**
 * Resolves the spacing for a Select's content area from its label placement,
 * (resolved) size, and multi-select selection state. Spacing only.
 */
export const useSelectDensity = ({
  labelPlacement,
  size,
  isMultiSelect,
  hasValue,
}: UseSelectDensityParams): SelectDensity => {
  return useMemo(() => {
    let vertical: ThemeVars.Space;
    if (labelPlacement === 'inside-vertical') {
      vertical = insideVerticalVerticalPadding;
    } else if (labelPlacement === 'inside-horizontal') {
      vertical = insideHorizontalVerticalPadding;
    } else if (isMultiSelect && hasValue) {
      vertical = multiSelectVerticalPadding[size];
    } else {
      vertical = sizeVerticalPadding[size];
    }

    return {
      contentPadding: {
        top: vertical,
        right: horizontalContentPadding,
        bottom: vertical,
        left: horizontalContentPadding,
      },
      chipSize: sizeChipSize[size],
    };
  }, [labelPlacement, size, isMultiSelect, hasValue]);
};
