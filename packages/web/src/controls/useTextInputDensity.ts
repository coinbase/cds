import { useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

export type TextInputSize = 's' | 'm' | 'l';

export type TextInputLabelPlacement = 'outside' | 'inside-horizontal' | 'inside-vertical';

/**
 * Resolves where the label sits — the one genuinely branchy decision in a
 * TextInput's layout. Takes the already-resolved `compact` (legacy compact
 * active) and `size`, plus `labelVariant`/`hasLabel`, and returns just the
 * placement. The size-vs-compact precedence lives in the caller; `compact`
 * resolves to size `s` for spacing and only steers the label placement here.
 */
export type UseTextInputPlacementParams = {
  /** Legacy compact density is active (already resolved by the caller). */
  compact?: boolean;
  /** Resolved size (default already applied). */
  size: TextInputSize;
  labelVariant?: 'inside' | 'outside';
  hasLabel: boolean;
};

export const useTextInputPlacement = ({
  compact,
  size,
  labelVariant = 'outside',
  hasLabel,
}: UseTextInputPlacementParams): TextInputLabelPlacement => {
  return useMemo(() => {
    // Legacy compact renders the label inline (inside-horizontal) regardless of
    // labelVariant; its spacing comes from the resolved size (`s`), not this flag.
    if (compact) {
      return hasLabel ? 'inside-horizontal' : 'outside';
    }
    if (labelVariant === 'inside' && hasLabel) {
      return size === 'l' ? 'inside-vertical' : 'inside-horizontal';
    }
    return 'outside';
  }, [compact, size, labelVariant, hasLabel]);
};

/**
 * The field content padding, expressed as space tokens. TextInput does NOT apply
 * all of this to one element — it splits it by axis so the field height stays
 * predictable:
 *
 *   - VERTICAL (top/bottom) lives on the CONTENT (the input, and the stacked
 *     inside-vertical label). The padded input defines the field height, so a tall
 *     start/end adornment centers within it instead of stretching the field taller.
 *   - HORIZONTAL (left/right) + the inter-slot GAP live on the InputStack field
 *     CONTAINER (via `styles.input`). Adornments get the outer padding + a gap
 *     without owning any vertical padding.
 *
 * Where each edge lands, per label placement:
 *
 *   placement           container (styles.input)     content (input / label)
 *   ─────────────────   ─────────────────────────    ────────────────────────────
 *   outside / no label  left, right, gap             input: top + bottom
 *   inside-horizontal   left, right, gap             input: top + bottom
 *     (label in start slot: paddingY 0 so it never out-talls the input)
 *   inside-vertical     left, right, gap             label: top · input: bottom
 */
export type ContentPadding = {
  top: ThemeVars.Space;
  right: ThemeVars.Space;
  bottom: ThemeVars.Space;
  left: ThemeVars.Space;
};

/** Horizontal content padding is constant across the size path. */
const horizontalContentPadding: ThemeVars.Space = 2;

/**
 * Per-size content padding. This is the whole size story in one place:
 * only the vertical padding changes between Large / Medium / Small.
 *
 * - Large  (l): 16px top/bottom
 * - Medium (m): 12px top/bottom
 * - Small  (s): 8px top/bottom
 */
const sizeContentPadding: Record<TextInputSize, ContentPadding> = {
  l: { top: 2, right: horizontalContentPadding, bottom: 2, left: horizontalContentPadding },
  m: { top: 1.5, right: horizontalContentPadding, bottom: 1.5, left: horizontalContentPadding },
  s: { top: 1, right: horizontalContentPadding, bottom: 1, left: horizontalContentPadding },
};

/**
 * A vertically-stacked inside label (size l) tightens the vertical padding so the
 * stacked label (20px) + input (24px) fit a 58px field: 6px above and below the
 * stacked content (12px total + 44px content + 2px border).
 */
const insideVerticalContentPadding: ContentPadding = {
  top: 0.75,
  right: horizontalContentPadding,
  bottom: 0.75,
  left: horizontalContentPadding,
};

/** Gap between the start/end nodes and the input within the field container. */
const contentGap: ThemeVars.Space = 0.5;

export type UseTextInputDensityParams = {
  labelPlacement: TextInputLabelPlacement;
  /** Resolved size (default already applied). */
  size: TextInputSize;
};

export type TextInputDensity = {
  /** Padding box (space tokens) for the field content area. */
  contentPadding: ContentPadding;
  /** Gap (space token) between the start / input / end slots. */
  contentGap: ThemeVars.Space;
};

/**
 * Resolves the spacing for a TextInput's content area from its label placement
 * and (resolved) size. Spacing only.
 */
export const useTextInputDensity = ({
  labelPlacement,
  size,
}: UseTextInputDensityParams): TextInputDensity => {
  return useMemo(() => {
    const contentPadding =
      labelPlacement === 'inside-vertical'
        ? insideVerticalContentPadding
        : sizeContentPadding[size];

    return { contentPadding, contentGap };
  }, [labelPlacement, size]);
};
