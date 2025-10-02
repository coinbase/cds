import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { IconSize } from '@coinbase/cds-common';
import { useBreakpoints } from '@coinbase/cds-web/hooks/useBreakpoints';
import { Icon } from '@coinbase/cds-web/icons';
import { Box } from '@coinbase/cds-web/layout';
import { Grid } from '@coinbase/cds-web/layout/Grid';
import { Pressable } from '@coinbase/cds-web/system';
import { animated, useSpring, useSprings } from '@react-spring/web';

import {
  autoTransitionIntervalMs,
  characterSet,
  gridCellDistanceDelayMs,
  messageAccessibilityDescriptions,
  messagesCharSetIndices,
  numberOfColumns,
  numberOfRows,
} from './constants';
import { HeroCell } from './HeroCell';
import styles from './styles.module.css';

const AnimatedHeroCell = animated(HeroCell);

/**
 * Returns a useSprings callback function used to animate the grid cells iterating through
 * characters in the characterSet. If the animation was triggered by a user click on the grid,
 * then the index of the clicked cell will also be passed and used to create an interactive
 * animation delay.
 */
const createGridCellSprings =
  ({
    currentMessageIndex,
    clickedCellIndex,
    initial,
  }: {
    currentMessageIndex: number;
    clickedCellIndex?: number;
    initial?: boolean;
  }) =>
  (springIndex: number) => {
    const message = messagesCharSetIndices[currentMessageIndex];
    const row = Math.floor(springIndex / numberOfColumns);
    const column = springIndex % numberOfColumns;
    const currentCharSetIndex = message[row][column];

    const nextMessageIndex = (currentMessageIndex + 1) % messagesCharSetIndices.length;
    const nextMessage = messagesCharSetIndices[nextMessageIndex];
    let nextCharSetIndex = nextMessage[row][column];

    // Ensure the animation always progresses "forward" in the characterSet
    if (currentCharSetIndex > nextCharSetIndex) nextCharSetIndex += characterSet.length;

    // Calculate delay based on distance from origin in the grid
    let delay = 0;

    // Calculate cell animation delay if the animation was triggered by a user click on a cell
    if (clickedCellIndex !== undefined) {
      const clickedRow = Math.floor(clickedCellIndex / numberOfColumns);
      const clickedColumn = clickedCellIndex % numberOfColumns;

      // Calculate Euclidean distance from clicked cell in the grid
      const deltaRow = row - clickedRow;
      const deltaColumn = column - clickedColumn;
      const gridDistance = Math.sqrt(deltaRow * deltaRow + deltaColumn * deltaColumn);
      delay = gridDistance * gridCellDistanceDelayMs;
    }

    // Character transition distance for step size calculation
    return {
      from: { charSetIndex: currentCharSetIndex },
      to: { charSetIndex: initial ? currentCharSetIndex : nextCharSetIndex },
      config: { round: 1, tension: 160, friction: 30 },
      delay,
    };
  };

/**
 * Returns a useSpring callback function used to animate a single cell iterating through
 * characters in the character set as a user hovers over it.
 */
const createHoverCellSpring = (currentMessageIndex: number, cellIndex: number) => () => {
  const row = Math.floor(cellIndex / numberOfColumns);
  const column = cellIndex % numberOfColumns;
  const currentCharSetIndex = messagesCharSetIndices[currentMessageIndex][row][column];

  const steps: { charSetIndex: number }[] = [];

  let i = 1;
  while (i < characterSet.length) {
    steps.push({ charSetIndex: currentCharSetIndex + i });
    i++;
  }

  return {
    from: { charSetIndex: currentCharSetIndex },
    to: steps,
    config: { tension: 600, friction: 12, mass: 0.1, round: 1 },
    loop: true,
  };
};

const commonGridProps = {
  columns: numberOfColumns,
  rows: numberOfRows,
  columnGap: { base: 1, tablet: 0.75, phone: 0.5 } as const,
  rowGap: { base: 2, tablet: 1.5, phone: 0.75 } as const,
  gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
  gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
};

export const AnimatedHeroGrid = () => {
  const currentMessageIndexRef = useRef(0);
  const [accessibilityDescription, setAccessibilityDescription] = useState(
    messageAccessibilityDescriptions[currentMessageIndexRef.current],
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPeriodicUpdatePaused, setIsPeriodicUpdatePaused] = useState(false);
  const [gridCellSprings, gridCellSpringsRef] = useSprings(
    numberOfRows * numberOfColumns,
    createGridCellSprings({
      currentMessageIndex: currentMessageIndexRef.current,
      initial: true,
    }),
  );

  const [hoveredCellIndex, setHoveredCellIndex] = useState<number | null>(null);

  const [hoverCellSpring] = useSpring(
    createHoverCellSpring(currentMessageIndexRef.current, hoveredCellIndex ?? 0),
    [currentMessageIndexRef, hoveredCellIndex],
  );

  const gridRef = useRef<HTMLDivElement>(null);
  const { isPhone } = useBreakpoints();
  const pauseIconSize: IconSize = isPhone ? 'xs' : 'm';

  const animateMessage = useCallback(
    (clickedCellIndex?: number) => {
      const currentMessageIndex = currentMessageIndexRef.current;
      void gridCellSpringsRef.start(
        createGridCellSprings({
          currentMessageIndex,
          clickedCellIndex,
          initial: false,
        }),
      );
      const nextMessageIndex = (currentMessageIndex + 1) % messagesCharSetIndices.length;
      const newAccessibilityDescription = messageAccessibilityDescriptions[nextMessageIndex];

      setAccessibilityDescription(newAccessibilityDescription);
      currentMessageIndexRef.current = nextMessageIndex;
    },
    [gridCellSpringsRef],
  );

  const pauseMessageUpdateInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const resumeMessageUpdateInterval = useCallback(() => {
    intervalRef.current = setInterval(animateMessage, autoTransitionIntervalMs);
  }, [animateMessage]);

  // Pause the periodic message update interval when the user clicks the pause button
  const handlePauseButtonClick = useCallback(() => {
    pauseMessageUpdateInterval();
    setIsPeriodicUpdatePaused(true);
  }, [pauseMessageUpdateInterval]);

  // Resume the periodic message update interval when the user clicks the play button
  const handleResumeButtonClick = useCallback(() => {
    setIsPeriodicUpdatePaused(false);
    animateMessage();
    resumeMessageUpdateInterval();
  }, [animateMessage, resumeMessageUpdateInterval]);

  // Pause the periodic message update interval when the grid gains focus and resume it when the grid loses focus
  const handleFullGridFocusChange: React.FocusEventHandler<HTMLDivElement> = useCallback(
    ({ target, type }) => {
      if (target !== gridRef.current) return;
      if (type === 'focus') {
        pauseMessageUpdateInterval();
        return;
      }
      if (type === 'blur' && !isPeriodicUpdatePaused) {
        resumeMessageUpdateInterval();
        return;
      }
    },
    [isPeriodicUpdatePaused, pauseMessageUpdateInterval, resumeMessageUpdateInterval],
  );

  // Skip to the next message when the user presses the Enter or Space key while the grid is focused
  const handleFullGridKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.target !== gridRef.current) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        animateMessage();
      }
    },
    [animateMessage],
  );

  const handleCellClick = useCallback(
    (cellIndex: number) => {
      pauseMessageUpdateInterval();
      animateMessage(cellIndex);
      if (!isPeriodicUpdatePaused) {
        resumeMessageUpdateInterval();
      }
    },
    [
      animateMessage,
      isPeriodicUpdatePaused,
      pauseMessageUpdateInterval,
      resumeMessageUpdateInterval,
    ],
  );

  const handleCellHoverStart = useCallback(
    (cellIndex: number) => {
      if (!isPeriodicUpdatePaused) setHoveredCellIndex(cellIndex);
    },
    [isPeriodicUpdatePaused],
  );

  const handleCellHoverEnd = useCallback(() => {
    setHoveredCellIndex(null);
  }, []);

  useEffect(() => {
    // Start an interval for automatic message animation on mount
    resumeMessageUpdateInterval();
    return () => {
      pauseMessageUpdateInterval();
    };
  }, [pauseMessageUpdateInterval, resumeMessageUpdateInterval]);

  return (
    <Box display="block" position="relative">
      <Grid
        ref={gridRef}
        accessibilityLabel={accessibilityDescription}
        aria-live="polite"
        borderRadius={200}
        className={styles.grid}
        onBlur={handleFullGridFocusChange}
        onFocus={handleFullGridFocusChange}
        onKeyDown={handleFullGridKeyDown}
        position="relative"
        role="button"
        tabIndex={0}
        {...commonGridProps}
      >
        {gridCellSprings.map(({ charSetIndex }, cellIndex) =>
          cellIndex < numberOfColumns * numberOfRows - 1 ? (
            <AnimatedHeroCell
              key={charSetIndex.id}
              cellIndex={cellIndex}
              charSetIndex={
                hoveredCellIndex === cellIndex ? hoverCellSpring.charSetIndex : charSetIndex
              }
              onClick={handleCellClick}
              onHoverEnd={handleCellHoverEnd}
              onHoverStart={handleCellHoverStart}
            />
          ) : null,
        )}
      </Grid>
      <Grid
        bottom={0}
        className={styles.gridOverlay}
        height="100%"
        left={0}
        position="absolute"
        right={0}
        top={0}
        {...commonGridProps}
      >
        <Pressable
          accessibilityLabel={isPeriodicUpdatePaused ? 'Play message' : 'Pause message'}
          alignItems="center"
          aria-live="polite"
          aspectRatio={1}
          background="bgAlternate"
          borderRadius={{ base: 200, phone: 100 }}
          borderWidth={0}
          className={styles.pauseButton}
          gridColumnEnd={numberOfColumns + 1}
          gridColumnStart={numberOfColumns}
          gridRowEnd={numberOfRows + 1}
          gridRowStart={numberOfRows}
          justifyContent="center"
          onClick={isPeriodicUpdatePaused ? handleResumeButtonClick : handlePauseButtonClick}
        >
          <Icon
            active
            color="fgMuted"
            name={isPeriodicUpdatePaused ? 'play' : 'pause'}
            size={pauseIconSize}
          />
        </Pressable>
      </Grid>
    </Box>
  );
};
