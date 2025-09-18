import type { DimensionValue } from './DimensionStyles';
import type { Position } from './Position';

export type FlexAxisValue = 'flex-start' | 'flex-end' | 'center';
export type FlexAlignCommon = FlexAxisValue | 'stretch';
export type FlexSpaceCommon = 'space-between' | 'space-around';
export type FlexShrink = { flexShrink?: number };
export type FlexGrow = { flexGrow?: number };

export type FlexStyles = {
  /**
   * Set the distribution of space between and around content items along the cross-axis.
   * @default flex-start
   */
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /**
   * Set the alignment of all direct children on the cross-axis.
   * @default stretch
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /**
   * Override the parent's defined item alignment for this element alone.
   * @default auto
   */
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'auto' | 'baseline';
  /** Sets the initial main flex size. */
  flexBasis?: number | string;
  /** Order children on the main-axis in this direction. */
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Set the grow factor of this flex item. */
  flexGrow?: number;
  /** Set the shrink factor of this flex item. */
  flexShrink?: number;
  /**
   * How should children wrap when overflowing.
   * @default nowrap
   */
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  /**
   * Set the distribution of space between and around content items along the main-axis.
   * @default flex-start
   */
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
};

export type PinningDirection = 'top' | 'bottom' | 'left' | 'right' | 'all';

export type PositionStyles = {
  /** Position the box to the bottom edge. */
  bottom?: DimensionValue;
  /** Position the box to the left edge. */
  left?: DimensionValue;
  /** How to position the box within its parent. */
  position?: Position;
  /** Position the box to the right edge. */
  right?: DimensionValue;
  /** Position the box to the top edge. */
  top?: DimensionValue;
  /** Adjust the z-index positioning layer. */
  zIndex?: number;
};
