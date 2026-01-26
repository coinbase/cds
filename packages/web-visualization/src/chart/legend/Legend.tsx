import { forwardRef, memo, useMemo } from 'react';
import {
  Box,
  type BoxBaseProps,
  type BoxDefaultElement,
  type BoxProps,
} from '@coinbase/cds-web/layout';

import { useCartesianChartContext } from '../ChartProvider';
import type { LegendShape } from '../utils';

import { DefaultLegendEntry } from './DefaultLegendEntry';
import { DefaultLegendShape } from './DefaultLegendShape';

export type LegendShapeProps = {
  /**
   * Color of the legend shape.
   * @default 'var(--color-fgPrimary)'
   */
  color?: string;
  /**
   * Shape to display. Can be a preset shape or a custom ReactNode.
   * @default 'circle'
   */
  shape?: LegendShape;
  /**
   * Custom class name for the shape element.
   */
  className?: string;
  /**
   * Custom styles for the shape element.
   */
  style?: React.CSSProperties;
};

export type LegendShapeComponent = React.FC<LegendShapeProps>;

export type LegendEntryProps = {
  /**
   * Id of the series.
   */
  seriesId: string;
  /**
   * Label of the series.
   * If a ReactNode is provided, it replaces the default Text component.
   */
  label: React.ReactNode;
  /**
   * Color of the series.
   * @default 'var(--color-fgPrimary)'
   */
  color?: string;
  /**
   * Shape of the series.
   */
  shape?: LegendShape;
  /**
   * Custom component to render the legend shape.
   * @default DefaultLegendShape
   */
  ShapeComponent?: LegendShapeComponent;
  /**
   * Custom class name for the root element.
   */
  className?: string;
  /**
   * Custom class names for the component parts.
   */
  classNames?: {
    /**
     * Custom class name for the root element.
     */
    root?: string;
    /**
     * Custom class name for the shape element.
     */
    shape?: string;
    /**
     * Custom class name for the label element.
     * @note not applied when label is a ReactNode.
     */
    label?: string;
  };
  /**
   * Custom styles for the root element.
   */
  style?: React.CSSProperties;
  /**
   * Custom styles for the component parts.
   */
  styles?: {
    /**
     * Custom styles for the root element.
     */
    root?: React.CSSProperties;
    /**
     * Custom styles for the shape element.
     */
    shape?: React.CSSProperties;
    /**
     * Custom styles for the label element.
     * @note not applied when label is a ReactNode.
     */
    label?: React.CSSProperties;
  };
};

export type LegendEntryComponent = React.FC<LegendEntryProps>;

export type LegendBaseProps = Omit<BoxBaseProps, 'children'> & {
  /**
   * Array of series IDs to display in the legend.
   * By default, all series will be displayed.
   */
  seriesIds?: string[];
  /**
   * Custom component to render each legend entry.
   * @default DefaultLegendEntry
   */
  EntryComponent?: LegendEntryComponent;
  /**
   * Custom component to render the legend shape within each entry.
   * Only used when EntryComponent is not provided or is DefaultLegendEntry.
   * @default DefaultLegendShape
   */
  ShapeComponent?: LegendShapeComponent;
  /**
   * Accessibility label for the legend group.
   * @default 'Legend'
   */
  accessibilityLabel?: string;
};

export type LegendProps = Omit<BoxProps<BoxDefaultElement>, 'children'> &
  LegendBaseProps & {
    /**
     * Custom class names for the component parts.
     */
    classNames?: {
      /**
       * Custom class name for the root element.
       */
      root?: string;
      /**
       * Custom class name for each entry element.
       */
      entry?: string;
      /**
       * Custom class name for the shape element within each entry.
       */
      entryShape?: string;
      /**
       * Custom class name for the label element within each entry.
       * @note not applied when label is a ReactNode.
       */
      entryLabel?: string;
    };
    /**
     * Custom styles for the component parts.
     */
    styles?: {
      /**
       * Custom styles for the root element.
       */
      root?: React.CSSProperties;
      /**
       * Custom styles for each entry element.
       */
      entry?: React.CSSProperties;
      /**
       * Custom styles for the shape element within each entry.
       */
      entryShape?: React.CSSProperties;
      /**
       * Custom styles for the label element within each entry.
       * @note not applied when label is a ReactNode.
       */
      entryLabel?: React.CSSProperties;
    };
  };

export const Legend = memo(
  forwardRef<HTMLDivElement, LegendProps>(
    (
      {
        flexDirection = 'row',
        justifyContent = 'center',
        alignItems = flexDirection === 'row' ? 'center' : 'flex-start',
        flexWrap = 'wrap',
        columnGap = 2,
        rowGap = 0.75,
        seriesIds,
        EntryComponent = DefaultLegendEntry,
        ShapeComponent = DefaultLegendShape,
        accessibilityLabel = 'Legend',
        className,
        classNames,
        style,
        styles,
        ...props
      },
      ref,
    ) => {
      const { series } = useCartesianChartContext();

      const filteredSeries = useMemo(() => {
        if (seriesIds === undefined) return series;
        return series.filter((s) => seriesIds.includes(s.id));
      }, [series, seriesIds]);

      if (filteredSeries.length === 0) return;

      return (
        <Box
          ref={ref}
          accessibilityLabel={accessibilityLabel}
          alignItems={alignItems}
          className={classNames?.root ?? className}
          columnGap={columnGap}
          flexDirection={flexDirection}
          flexWrap={flexWrap}
          justifyContent={justifyContent}
          role="group"
          rowGap={rowGap}
          style={{ ...style, ...styles?.root }}
          {...props}
        >
          {filteredSeries.map((s) => (
            <EntryComponent
              key={s.id}
              ShapeComponent={ShapeComponent}
              classNames={{
                root: classNames?.entry,
                shape: classNames?.entryShape,
                label: classNames?.entryLabel,
              }}
              color={s.color}
              label={s.label ?? s.id}
              seriesId={s.id}
              shape={s.legendShape}
              styles={{
                root: styles?.entry,
                shape: styles?.entryShape,
                label: styles?.entryLabel,
              }}
            />
          ))}
        </Box>
      );
    },
  ),
);
