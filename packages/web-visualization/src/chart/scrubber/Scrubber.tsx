import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import type { SharedProps } from '@coinbase/cds-common/types';
import {
  type ChartScaleFunction,
  getPointOnScale,
  projectPoint,
  useScrubberContext,
} from '@coinbase/cds-common/visualizations/charts';
import {
  useChartContext,
  useChartDrawingAreaContext,
} from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-web';
import { m } from 'framer-motion';

import { axisTickLabelsInitialAnimationVariants } from '../axis';
import { ReferenceLine, type ReferenceLineProps } from '../line';
import type { PointProps } from '../point';

import {
  ScrubberHead,
  ScrubberHeadLabel,
  type ScrubberHeadLabelProps,
  type ScrubberHeadProps,
  type ScrubberHeadRef,
} from './';

/**
 * Configuration for scrubber functionality across chart components.
 * Provides consistent API with smart defaults and component customization.
 */
export type ScrubberProps = SharedProps &
  Pick<PointProps, 'pulse'> & {
    /**
     * An array of series IDs that will receive visual emphasis as the user scrubs through the chart.
     * Use this prop to restrict the scrubbing visual behavior to specific series.
     * By default, all series will be highlighted by the Scrubber.
     */
    seriesIds?: string[];

    /**
     * Hide scrubber line (vertical line at current position).
     * @default false
     */
    hideScrubberLine?: boolean;

    /**
     * Whether to hide the overlay rect which hides future data.
     */
    hideOverlay?: boolean;

    /**
     * Offset of the overlay rect relative to the drawing area.
     * Useful for when scrubbing over lines, where the stroke width would cause part of the line to be visible.
     * @default 2
     */
    overlayOffset?: number;

    /**
     * Label content for scrubber (shows above the scrubber line).
     */
    scrubberLabel?: ReferenceLineProps['label'];

    /**
     * Label configuration for the scrubber line label
     */
    scrubberLabelConfig?: ReferenceLineProps['labelConfig'];

    /**
     * Custom styles for scrubber elements.
     */
    scrubberStyles?: {
      scrubberHead?: React.CSSProperties;
      scrubberLine?: React.CSSProperties;
      scrubberLabel?: React.CSSProperties;
      scrubberHeadLabel?: React.CSSProperties;
    };

    /**
     * Custom class names for scrubber elements.
     */
    scrubberClassNames?: {
      scrubberHead?: string;
      scrubberLine?: string;
      scrubberLabel?: string;
      scrubberHeadLabel?: string;
    };

    /**
     * Custom component replacements.
     */
    scrubberComponents?: {
      ScrubberHeadComponent?: React.ComponentType<ScrubberHeadProps>;
      ScrubberHeadLabelComponent?: React.ComponentType<ScrubberHeadLabelProps>;
      ScrubberLineComponent?: React.ComponentType<ReferenceLineProps>;
    };
  };

type LabelDimensions = {
  id: string;
  width: number;
  height: number;
  preferredX: number;
  preferredY: number;
};

export type ScrubberRef = ScrubberHeadRef;

/**
 * Unified component that manages all scrubber elements (heads, line, labels)
 * with intelligent collision detection and consistent positioning.
 */
export const Scrubber = memo(
  forwardRef<ScrubberRef, ScrubberProps>(
    (
      {
        seriesIds,
        hideScrubberLine,
        scrubberLabel,
        scrubberLabelConfig,
        scrubberComponents,
        hideOverlay,
        overlayOffset = 2,
        testID,
        pulse,
        scrubberStyles,
        scrubberClassNames,
      },
      ref,
    ) => {
      const theme = useTheme();
      const scrubberGroupRef = useRef<SVGGElement>(null);
      const scrubberHeadRefs = useRefMap<ScrubberHeadRef>();

      const { highlightedIndex } = useScrubberContext();
      const { getXScale, getYScale, getSeriesData, getXAxis, animate, series } = useChartContext();
      const { drawingArea } = useChartDrawingAreaContext();
      const getStackedSeriesData = getSeriesData; // getSeriesData now returns stacked data

      // Track label dimensions for collision detection
      const [labelDimensions, setLabelDimensions] = useState<Map<string, LabelDimensions>>(
        new Map(),
      );

      // Expose imperative handle with pulse method
      useImperativeHandle(ref, () => ({
        pulse: () => {
          // Pulse all registered scrubber heads
          Object.values(scrubberHeadRefs.refs).forEach((headRef) => {
            headRef?.pulse();
          });
        },
      }));

      const { dataX, dataIndex } = useMemo(() => {
        const xScale = getXScale() as ChartScaleFunction;
        const xAxis = getXAxis();
        if (!xScale) return { dataX: undefined, dataIndex: undefined };

        // todo: can we store this in axis config?
        const maxDataLength =
          series?.reduce((max: any, s: any) => {
            const seriesData = getStackedSeriesData(s.id) || getSeriesData(s.id);
            return Math.max(max, seriesData?.length ?? 0);
          }, 0) ?? 0;

        const dataIndex = highlightedIndex ?? Math.max(0, maxDataLength - 1);

        // Convert index to actual x value if axis has data
        let dataX: number;
        if (xAxis?.data && Array.isArray(xAxis.data) && xAxis.data[dataIndex] !== undefined) {
          const dataValue = xAxis.data[dataIndex];
          dataX = typeof dataValue === 'string' ? dataIndex : dataValue;
        } else {
          dataX = dataIndex;
        }

        return { dataX, dataIndex };
      }, [getXScale, getXAxis, series, highlightedIndex, getStackedSeriesData, getSeriesData]);

      // TODO: forecast chart is broken
      const headPositions = useMemo(() => {
        const xScale = getXScale() as ChartScaleFunction;

        if (!xScale || dataX === undefined || dataIndex === undefined) return [];

        return (
          series
            ?.filter((s) => {
              if (seriesIds === undefined) return true;
              return seriesIds.includes(s.id);
            })
            ?.map((s) => {
              const sourceData = getStackedSeriesData(s.id) || getSeriesData(s.id);

              // Use dataIndex to get the y value from the series data array
              const stuff = sourceData?.[dataIndex];
              let dataY: number | undefined;
              if (Array.isArray(stuff)) {
                dataY = stuff[stuff.length - 1];
              } else if (typeof stuff === 'number') {
                dataY = stuff;
              }

              if (dataY !== undefined) {
                const yScale = getYScale(s.yAxisId) as ChartScaleFunction;
                if (!yScale) {
                  return undefined;
                }

                const pixelPosition = projectPoint({
                  x: dataX,
                  y: dataY,
                  xScale,
                  yScale,
                });

                const resolvedLabel = typeof s.label === 'function' ? s.label(dataIndex) : s.label;

                return {
                  x: dataX,
                  y: dataY,
                  label: resolvedLabel,
                  pixelX: pixelPosition.x,
                  pixelY: pixelPosition.y,
                  targetSeries: s,
                };
              }
            })
            .filter((head: any) => head !== undefined) ?? []
        );
      }, [
        getXScale,
        dataX,
        dataIndex,
        series,
        seriesIds,
        getStackedSeriesData,
        getSeriesData,
        getYScale,
      ]);

      // todo: the padding around the label shouldn't be needed for this collision calculation since the ChatText onDimensionsChange will report the bounding box that includes the padding
      const labelPadding = 4;
      const minLabelGap = 0.25;

      // Calculate optimal label positioning strategy
      const labelPositioning = useMemo(() => {
        // Get current head IDs that are actually being rendered
        const currentHeadIds = new Set(
          headPositions.map((head: any) => head?.targetSeries.id).filter(Boolean),
        );

        // Only use dimensions for heads that are currently being rendered
        const dimensions = Array.from(labelDimensions.values()).filter((dim) =>
          currentHeadIds.has(dim.id),
        );

        if (dimensions.length === 0) return { strategy: 'auto', adjustments: new Map() };

        const adjustments = new Map<string, { x: number; y: number; side: 'left' | 'right' }>();

        // Sort by Y position to handle overlaps systematically
        const sortedDimensions = [...dimensions].sort((a, b) => a.preferredY - b.preferredY);

        // Determine if we need to switch sides globally based on overflow
        let globalSide: 'left' | 'right' = 'right';

        // Check if any labels would overflow on the right side
        const paddingPx = theme.space[labelPadding];
        const anchorRadius = 10; // Same as used in ScrubberHeadLabel
        const bufferPx = 5; // Small buffer to prevent premature switching

        // Safety check for valid bounds
        if (drawingArea.width <= 0 || drawingArea.height <= 0) {
          globalSide = 'right'; // Default to right if bounds are invalid
        } else {
          // Check if labels would overflow when positioned on the right side
          // Account for anchor radius and padding when calculating right edge
          const wouldOverflow = sortedDimensions.some((dim) => {
            const labelRightEdge = dim.preferredX + anchorRadius + paddingPx + dim.width + bufferPx;
            return labelRightEdge > drawingArea.x + drawingArea.width;
          });

          globalSide = wouldOverflow ? 'left' : 'right';
        }

        // Natural positioning with collision detection
        const minGap = theme.space[minLabelGap];

        // Initialize all labels at their preferred positions
        for (const dim of sortedDimensions) {
          adjustments.set(dim.id, {
            x: dim.preferredX,
            y: dim.preferredY,
            side: globalSide,
          });
        }

        // Check for collisions and resolve them
        const maxIterations = 10;
        let iteration = 0;

        while (iteration < maxIterations) {
          let hasCollisions = false;
          iteration++;

          // Sort by current Y position for systematic collision resolution
          const currentPositions = sortedDimensions
            .map((dim) => ({
              ...dim,
              currentY: adjustments.get(dim.id)!.y,
            }))
            .sort((a, b) => a.currentY - b.currentY);

          // Check adjacent labels for overlaps
          for (let i = 0; i < currentPositions.length - 1; i++) {
            const current = currentPositions[i];
            const next = currentPositions[i + 1];

            const currentAdjustment = adjustments.get(current.id)!;
            const nextAdjustment = adjustments.get(next.id)!;

            // Calculate required separation
            const requiredSeparation = current.height / 2 + next.height / 2 + minGap;
            const currentSeparation = nextAdjustment.y - currentAdjustment.y;

            if (currentSeparation < requiredSeparation) {
              hasCollisions = true;
              const deficit = requiredSeparation - currentSeparation;

              // Move labels apart - split the adjustment
              const offsetPerLabel = deficit / 2;

              adjustments.set(current.id, {
                ...currentAdjustment,
                y: currentAdjustment.y - offsetPerLabel,
              });
              adjustments.set(next.id, {
                ...nextAdjustment,
                y: nextAdjustment.y + offsetPerLabel,
              });
            }
          }

          if (!hasCollisions) {
            break;
          }
        }

        // After collision resolution, ensure all labels are within bounds
        const labelIds = Array.from(adjustments.keys());

        // Group labels that are close together or overlapping
        // This prevents distant labels from being unnecessarily shifted
        const findConnectedGroups = () => {
          const groups: string[][] = [];
          const visited = new Set<string>();

          for (const id of labelIds) {
            if (visited.has(id)) continue;

            const group: string[] = [id];
            visited.add(id);
            const queue = [id];

            while (queue.length > 0) {
              const currentId = queue.shift()!;
              const currentAdjustment = adjustments.get(currentId)!;
              const currentDim = sortedDimensions.find((d) => d.id === currentId)!;

              // Check if this label overlaps or is close to any other unvisited label
              for (const otherId of labelIds) {
                if (visited.has(otherId)) continue;

                const otherAdjustment = adjustments.get(otherId)!;
                const otherDim = sortedDimensions.find((d) => d.id === otherId)!;

                // Calculate distance between labels
                const distance = Math.abs(currentAdjustment.y - otherAdjustment.y);
                const minDistance = (currentDim.height + otherDim.height) / 2 + minGap * 2;

                // Labels are considered connected if they're close enough to potentially overlap
                if (distance <= minDistance) {
                  visited.add(otherId);
                  group.push(otherId);
                  queue.push(otherId);
                }
              }
            }

            groups.push(group);
          }

          return groups;
        };

        const connectedGroups = findConnectedGroups();

        // Process each connected group independently
        for (const groupIds of connectedGroups) {
          // Check if any labels in this group are outside bounds
          const groupOutOfBounds = groupIds.some((id) => {
            const adjustment = adjustments.get(id)!;
            const dim = sortedDimensions.find((d) => d.id === id)!;
            const labelTop = adjustment.y - dim.height / 2;
            const labelBottom = adjustment.y + dim.height / 2;
            return labelTop < drawingArea.y || labelBottom > drawingArea.y + drawingArea.height;
          });

          if (groupOutOfBounds) {
            // Get labels in this group sorted by their preferred Y position
            const groupLabels = groupIds
              .map((id) => ({
                id,
                dim: sortedDimensions.find((d) => d.id === id)!,
                preferredY: sortedDimensions.find((d) => d.id === id)!.preferredY,
                currentY: adjustments.get(id)!.y,
              }))
              .sort((a, b) => a.preferredY - b.preferredY);

            // Calculate total height needed for this group
            const totalLabelHeight = groupLabels.reduce((sum, label) => sum + label.dim.height, 0);
            const totalGaps = (groupLabels.length - 1) * minGap;
            const totalNeeded = totalLabelHeight + totalGaps;

            if (totalNeeded > drawingArea.height) {
              // Not enough space - use compressed equal spacing as fallback
              const compressedGap = Math.max(
                2,
                (drawingArea.height - totalLabelHeight) / Math.max(1, groupLabels.length - 1),
              );
              let currentY = drawingArea.y + groupLabels[0].dim.height / 2;

              for (const label of groupLabels) {
                adjustments.set(label.id, {
                  ...adjustments.get(label.id)!,
                  y: currentY,
                });

                currentY += label.dim.height + compressedGap;
              }
            } else {
              // Enough space - use minimal displacement algorithm for this group
              const finalPositions = [...groupLabels];

              // Ensure minimum spacing between adjacent labels in this group
              for (let i = 1; i < finalPositions.length; i++) {
                const prev = finalPositions[i - 1];
                const current = finalPositions[i];

                // Calculate minimum Y position for current label
                const minCurrentY =
                  prev.preferredY + prev.dim.height / 2 + minGap + current.dim.height / 2;

                if (current.preferredY < minCurrentY) {
                  // Need to push this label down
                  current.preferredY = minCurrentY;
                }
              }

              // Check if this specific group fits within bounds, if not shift only this group
              const groupTop = finalPositions[0].preferredY - finalPositions[0].dim.height / 2;
              const groupBottom =
                finalPositions[finalPositions.length - 1].preferredY +
                finalPositions[finalPositions.length - 1].dim.height / 2;

              let shiftAmount = 0;

              if (groupTop < drawingArea.y) {
                // Group is too high, shift down
                shiftAmount = drawingArea.y - groupTop;
              } else if (groupBottom > drawingArea.y + drawingArea.height) {
                // Group is too low, shift up
                shiftAmount = drawingArea.y + drawingArea.height - groupBottom;
              }

              // Apply final positions with shift only to this group
              for (const label of finalPositions) {
                const finalY = label.preferredY + shiftAmount;

                // Final bounds check for individual labels
                const clampedY = Math.max(
                  drawingArea.y + label.dim.height / 2,
                  Math.min(drawingArea.y + drawingArea.height - label.dim.height / 2, finalY),
                );

                adjustments.set(label.id, {
                  ...adjustments.get(label.id)!,
                  y: clampedY,
                });
              }
            }
          }
        }

        return { strategy: globalSide, adjustments };
      }, [headPositions, labelDimensions, theme.space, minLabelGap, drawingArea]);

      // Callback for labels to register their dimensions
      const registerLabelDimensions = useCallback(
        (id: string, width: number, height: number, x: number, y: number) => {
          setLabelDimensions((prev) => {
            const existing = prev.get(id);
            const newDimensions = { id, width, height, preferredX: x, preferredY: y };

            // Only update if dimensions actually changed
            if (
              existing &&
              existing.width === width &&
              existing.height === height &&
              existing.preferredX === x &&
              existing.preferredY === y
            ) {
              return prev;
            }

            const next = new Map(prev);
            next.set(id, newDimensions);
            return next;
          });
        },
        [],
      );

      // Callback to create ref handlers for scrubber heads
      const createScrubberHeadRef = useCallback(
        (seriesId: string) => {
          return (headRef: ScrubberHeadRef | null) => {
            if (headRef) {
              scrubberHeadRefs.registerRef(seriesId, headRef);
            }
          };
        },
        [scrubberHeadRefs],
      );

      // synchronize label positioning state when the position of any scrubber heads change
      useEffect(() => {
        const currentHeadIds = new Set(
          headPositions.map((head: any) => head?.targetSeries.id).filter(Boolean),
        );

        setLabelDimensions((prev) => {
          const next = new Map();
          for (const [id, dimensions] of prev) {
            if (currentHeadIds.has(id)) {
              next.set(id, dimensions);
            }
          }
          return next;
        });
      }, [headPositions]);

      // Check if we have at least the default X scale
      const defaultXScale = getXScale?.();
      if (!defaultXScale) return null;

      // Use custom components if provided
      const ScrubberLineComponent = scrubberComponents?.ScrubberLineComponent ?? ReferenceLine;
      const ScrubberHeadComponent = scrubberComponents?.ScrubberHeadComponent ?? ScrubberHead;
      const ScrubberHeadLabelComponent =
        scrubberComponents?.ScrubberHeadLabelComponent ?? ScrubberHeadLabel;

      // todo: figure out why scrubber heads across dataKey values isn't working anymore
      // for animations

      const pixelX =
        dataX !== undefined && defaultXScale ? getPointOnScale(dataX, defaultXScale) : undefined;

      // todo: figure out if we should disable 'pulse' animation when scrubbing
      return (
        <m.g
          ref={scrubberGroupRef}
          data-component="scrubber-group"
          data-testid={testID}
          {...(animate
            ? {
                animate: 'animate',
                exit: 'exit',
                initial: 'initial',
                variants: axisTickLabelsInitialAnimationVariants,
              }
            : {})}
        >
          {!hideOverlay &&
            dataX !== undefined &&
            highlightedIndex !== undefined &&
            pixelX !== undefined && (
              <rect
                fill="var(--color-bg)"
                height={drawingArea.height + overlayOffset * 2}
                opacity={0.8}
                width={drawingArea.x + drawingArea.width - pixelX + overlayOffset}
                x={pixelX}
                y={drawingArea.y - overlayOffset}
              />
            )}
          {!hideScrubberLine && highlightedIndex !== undefined && dataX !== undefined && (
            <ScrubberLineComponent
              className={scrubberClassNames?.scrubberLine}
              dataX={dataX}
              label={scrubberLabel}
              labelConfig={scrubberLabelConfig}
              labelPosition="top"
              style={scrubberStyles?.scrubberLine}
            />
          )}
          {headPositions.map((scrubberHead: any) => {
            if (!scrubberHead) return null;
            const adjustment = labelPositioning.adjustments.get(scrubberHead.targetSeries.id);
            const dotStroke = scrubberHead.targetSeries?.color || 'var(--color-fgPrimary)';

            return (
              <g key={scrubberHead.targetSeries.id} data-component="scrubber-head">
                {/* todo: fix this type cast, seems to be due to custom components */}
                <ScrubberHeadComponent
                  ref={createScrubberHeadRef(scrubberHead.targetSeries.id) as any}
                  className={scrubberClassNames?.scrubberHead}
                  color={scrubberHead.targetSeries?.color}
                  dataX={scrubberHead.x}
                  dataY={scrubberHead.y}
                  pulse={pulse}
                  seriesId={scrubberHead.targetSeries.id}
                  style={scrubberStyles?.scrubberHead}
                  testID={testID ? `${testID}-${scrubberHead.targetSeries.id}-dot` : undefined}
                />
                {scrubberHead.label &&
                  (() => {
                    const finalAnchorX = adjustment?.x ?? scrubberHead.pixelX;
                    const finalAnchorY = adjustment?.y ?? scrubberHead.pixelY;
                    const finalSide = adjustment?.side ?? labelPositioning.strategy;

                    return (
                      <ScrubberHeadLabelComponent
                        background="var(--color-bg)"
                        bounds={drawingArea}
                        className={scrubberClassNames?.scrubberHeadLabel}
                        color={dotStroke}
                        dx={16}
                        onDimensionsChange={({ width, height }) =>
                          registerLabelDimensions(
                            scrubberHead.targetSeries.id,
                            width,
                            height,
                            scrubberHead.pixelX,
                            scrubberHead.pixelY,
                          )
                        }
                        padding={labelPadding}
                        preferredSide={finalSide}
                        style={scrubberStyles?.scrubberHeadLabel}
                        testID={
                          testID ? `${testID}-${scrubberHead.targetSeries.id}-label` : undefined
                        }
                        x={finalAnchorX}
                        y={finalAnchorY}
                      >
                        {scrubberHead.label}
                      </ScrubberHeadLabelComponent>
                    );
                  })()}
              </g>
            );
          })}
        </m.g>
      );
    },
  ),
);
