export type FallbackRectWidthProps = {
  /** Disables randomization of rectangle fallback width. */
  disableRandomRectWidth?: boolean;
  /**
   * Creates a variant that contains rectangle fallbacks of deterministic width.
   * Variants map to a predetermined set of width values, which are cycled through repeatedly when the set is exhausted.
   */
  rectWidthVariant?: number;
};
