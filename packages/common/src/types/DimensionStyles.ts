export type FixedValue = number | string; // px
export type PercentageValue = string;
export type DimensionValue = 'auto' | FixedValue | PercentageValue;
export type ResizeMode = 'cover' | 'contain';

export type DimensionStyles = {
  /** Set a fixed height. */
  height?: DimensionValue;
  /** Set a maximum height. */
  maxHeight?: DimensionValue;
  /** Set a maximum width. */
  maxWidth?: DimensionValue;
  /** Set a minimum height. */
  minHeight?: DimensionValue;
  /** Set a minimum width. */
  minWidth?: DimensionValue;
  /** Set a fixed width. */
  width?: DimensionValue;
  /**
   * The aspect-ratio CSS property allows you to define the desired width-to-height ratio of an element's box
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
   */
  aspectRatio?: React.CSSProperties['aspectRatio'];
};
