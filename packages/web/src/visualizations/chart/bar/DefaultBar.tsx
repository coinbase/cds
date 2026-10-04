import React, { memo, useCallback, useMemo } from 'react';
import { cx } from '@coinbase/cds-web';
import { m as motion, type Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { Path } from '../Path';
import {
  defaultBarEnterOpacityTransition,
  defaultBarEnterTransition,
  withStaggerDelayTransition,
} from '../utils/bar';
import { type BarTransition, getNormalizedStagger } from '../utils/bar';
import { useHighlightContext } from '../utils/context';
import type { HighlightedItem } from '../utils/highlight';
import { getBarPath } from '../utils/path';
import { defaultTransition, getTransition } from '../utils/transition';

import type { BarComponentProps } from './Bar';

const fadeOpacity = 0.3;
const fadeTransition: Transition = { duration: 0.1, ease: 'easeOut' };

export type DefaultBarProps = BarComponentProps & {
  /**
   * Custom class name for the bar.
   */
  className?: string;
  /**
   * Custom styles for the bar.
   */
  style?: React.CSSProperties;
};

/**
 * Default bar component that renders a solid bar with animation and highlighting support.
 */
export const DefaultBar = memo<DefaultBarProps>(
  ({
    x,
    y,
    width,
    height,
    borderRadius = 4,
    roundTop,
    roundBottom,
    origin,
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    dataX,
    dataY,
    seriesId,
    minSize = 1,
    transitions,
    transition,
    fadeOnHighlight,
    ...props
  }) => {
    const { animate, drawingArea, layout } = useCartesianChartContext();
    const highlightContext = useHighlightContext();
    const { enabled: highlightEnabled, highlight, scope } = highlightContext;

    const dataIndex = useMemo(() => {
      if (typeof dataX === 'number') return dataX;
      if (typeof dataY === 'number') return dataY;
      return null;
    }, [dataX, dataY]);

    const highlightByDataIndex = scope.dataIndex ?? false;
    const highlightBySeries = scope.series ?? false;

    const highlightOpacity = useMemo(() => {
      if (!fadeOnHighlight || !highlightEnabled) return 1;

      let opacity = 1;
      if (highlight.length > 0) {
        const isHighlighted = highlight.some((item) => {
          const indexMatch =
            !highlightByDataIndex ||
            (typeof item.dataIndex === 'number' && item.dataIndex === dataIndex);
          // When seriesId is null/undefined (pointer between bars), all series at this index match.
          // Only narrow to a specific series when one is identified.
          const seriesMatch =
            !highlightBySeries || item.seriesId == null || item.seriesId === seriesId;
          return indexMatch && seriesMatch;
        });
        opacity = isHighlighted ? 1 : fadeOpacity;
      }
      return opacity;
    }, [
      fadeOnHighlight,
      highlightEnabled,
      highlight,
      highlightByDataIndex,
      highlightBySeries,
      dataIndex,
      seriesId,
    ]);

    const handlePointerEnter = useCallback(
      (event: React.PointerEvent<SVGPathElement>) => {
        if (!highlightEnabled || !highlightBySeries) return;
        const item: HighlightedItem = { seriesId };
        if (highlightByDataIndex && typeof dataIndex === 'number') {
          item.dataIndex = dataIndex;
        }
        highlightContext.updatePointerHighlight(event.pointerId, item);
      },
      [
        highlightContext,
        highlightEnabled,
        highlightBySeries,
        highlightByDataIndex,
        seriesId,
        dataIndex,
      ],
    );

    const handlePointerLeave = useCallback(
      (event: React.PointerEvent<SVGPathElement>) => {
        if (!highlightEnabled || !highlightBySeries) return;
        highlightContext.updatePointerHighlight(event.pointerId, { seriesId: null });
      },
      [highlightContext, highlightEnabled, highlightBySeries],
    );

    const normalizedStagger = useMemo(
      () => getNormalizedStagger(layout, x, y, drawingArea),
      [layout, x, y, drawingArea],
    );

    const enterTransition = useMemo(
      () =>
        getTransition(
          transitions?.enter,
          animate,
          defaultBarEnterTransition,
        ) as BarTransition | null,
      [transitions?.enter, animate],
    );
    const enterTransitionWithStagger = useMemo(
      () => withStaggerDelayTransition(enterTransition, normalizedStagger),
      [enterTransition, normalizedStagger],
    );
    const enterOpacityTransition = useMemo(() => {
      if (transitions?.enterOpacity === undefined && enterTransition === null) return null;

      const enterOpacityTransition: BarTransition | null = getTransition(
        transitions?.enterOpacity,
        animate,
        defaultBarEnterOpacityTransition,
      );

      if (!enterOpacityTransition) return null;

      return {
        ...enterOpacityTransition,
        delay: enterOpacityTransition.delay ?? enterTransition?.delay,
        staggerDelay: enterOpacityTransition.staggerDelay ?? enterTransition?.staggerDelay,
      };
    }, [transitions?.enterOpacity, animate, enterTransition]);
    const enterOpacityTransitionWithStagger = useMemo(
      () => withStaggerDelayTransition(enterOpacityTransition, normalizedStagger),
      [enterOpacityTransition, normalizedStagger],
    );
    const updateTransition = useMemo(
      () =>
        withStaggerDelayTransition(
          getTransition(
            transitions?.update !== undefined ? transitions.update : transition,
            animate,
            defaultTransition,
          ),
          normalizedStagger,
        ),
      [transitions?.update, transition, animate, normalizedStagger],
    );

    const initialPath = useMemo(() => {
      if (!animate) return;
      const isHorizontalLayout = layout === 'horizontal';
      const baseline = origin ?? (isHorizontalLayout ? x : y + height);

      const initialX = isHorizontalLayout ? baseline : x;
      const initialY = isHorizontalLayout ? y : baseline;
      const initialWidth = isHorizontalLayout ? minSize : width;
      const initialHeight = isHorizontalLayout ? height : minSize;

      return getBarPath(
        initialX,
        initialY,
        initialWidth,
        initialHeight,
        borderRadius,
        !!roundTop,
        !!roundBottom,
        layout,
      );
    }, [
      animate,
      layout,
      x,
      y,
      origin,
      width,
      height,
      borderRadius,
      roundTop,
      roundBottom,
      minSize,
    ]);

    const path = (
      <Path
        animate={animate}
        clipRect={null}
        d={d}
        fill={fill}
        fillOpacity={fillOpacity}
        initialPath={initialPath}
        onPointerEnter={highlightEnabled && highlightBySeries ? handlePointerEnter : undefined}
        onPointerLeave={highlightEnabled && highlightBySeries ? handlePointerLeave : undefined}
        transitions={{
          enter: enterTransitionWithStagger,
          enterOpacity: enterOpacityTransitionWithStagger,
          update: updateTransition,
        }}
        {...props}
      />
    );

    if (fadeOnHighlight) {
      return (
        <motion.g
          animate={{ opacity: highlightOpacity }}
          initial={false}
          transition={fadeTransition}
        >
          {path}
        </motion.g>
      );
    }

    return path;
  },
);
