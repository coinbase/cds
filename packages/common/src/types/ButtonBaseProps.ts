export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'positive'
  | 'negative'
  /**
   * @deprecated Use `secondary` directly. `foregroundMuted` is temporarily supported for compatibility and will be removed in a future release.
   */
  | 'foregroundMuted'
  | 'inverse';
