import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';
import { motion, type Transition } from 'framer-motion';

import { cx } from '../cx';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableProps } from '../system/Pressable';

import type { CarouselPaginationComponentProps } from './Carousel';
import { useCarouselAutoplayContext } from './CarouselContext';

const MotionPressable = motion(Pressable);

const INDICATOR_ACTIVE_WIDTH = 24;
const INDICATOR_INACTIVE_WIDTH = 4;
const INDICATOR_HEIGHT = 4;

const animationConfig: Transition = {
  type: 'spring',
  stiffness: 900,
  damping: 120,
  mass: 4,
  clamp: true,
};

const defaultPaginationCss = css`
  padding: ${INDICATOR_HEIGHT}px 0;
`;

const pillCss = css`
  width: ${INDICATOR_ACTIVE_WIDTH}px;
  height: ${INDICATOR_HEIGHT}px;
  border-radius: var(--borderRadius-100);
`;

const dotCss = css`
  height: ${INDICATOR_HEIGHT}px;
  border-radius: var(--borderRadius-100);
  overflow: hidden;
`;

export type DefaultCarouselPaginationProps = CarouselPaginationComponentProps &
  SharedProps & {
    /**
     * Custom class names for the component.
     */
    classNames?: {
      /**
       * Custom class name for the root element.
       */
      root?: string;
      /**
       * Custom class name for the dot element.
       */
      dot?: string;
    };
    /**
     * Custom styles for the component.
     */
    styles?: {
      /**
       * Custom styles for the root element.
       */
      root?: React.CSSProperties;
      /**
       * Custom styles for the dot element.
       */
      dot?: React.CSSProperties;
    };
  };

type PaginationIndicatorProps = PressableProps<'button'> & {
  isActive?: boolean;
};

const PaginationPill = memo(function PaginationPill({
  isActive,
  ...props
}: PaginationIndicatorProps) {
  return (
    <Pressable
      aria-current={isActive ? 'true' : undefined}
      background={isActive ? 'bgPrimary' : 'bgLine'}
      borderColor="transparent"
      data-active={isActive}
      {...props}
    />
  );
});

const PaginationDot = memo(function PaginationDot({
  isActive,
  className,
  ...props
}: PaginationIndicatorProps) {
  const autoplayContext = useCarouselAutoplayContext();
  const { isPlaying, isEnabled, interval, getRemainingTime } = autoplayContext;

  const showProgress = isActive && isEnabled;

  // Track the progress width as a percentage string for animation
  const [progressState, setProgressState] = useState<{
    width: string;
    duration: number;
  }>({ width: '0%', duration: 0 });

  // Use a ref to track the last paused progress so we can resume from it
  const lastProgressRef = useRef(0);

  useEffect(() => {
    if (!showProgress) {
      setProgressState({ width: '0%', duration: 0 });
      lastProgressRef.current = 0;
      return;
    }

    const remainingTime = getRemainingTime();
    const currentProgress = 1 - remainingTime / interval;

    if (isPlaying) {
      lastProgressRef.current = currentProgress;
      setProgressState({
        width: '100%',
        duration: remainingTime / 1000,
      });
    } else {
      setProgressState({
        width: `${currentProgress * 100}%`,
        duration: 0,
      });
      lastProgressRef.current = currentProgress;
    }
  }, [isPlaying, showProgress, interval, getRemainingTime]);

  return (
    <MotionPressable
      animate={{
        width: isActive ? INDICATOR_ACTIVE_WIDTH : INDICATOR_INACTIVE_WIDTH,
        backgroundColor:
          isActive && !showProgress ? 'var(--color-bgPrimary)' : 'var(--color-bgLine)',
      }}
      aria-current={isActive ? 'true' : undefined}
      borderColor="transparent"
      borderWidth={0}
      className={cx(dotCss, className)}
      data-active={isActive}
      initial={false}
      transition={animationConfig}
      {...props}
    >
      {showProgress && (
        <motion.div
          animate={{ width: progressState.width }}
          initial={false}
          style={{
            height: '100%',
            background: 'var(--color-bgPrimary)',
            borderRadius: 'var(--borderRadius-100)',
          }}
          transition={{
            duration: progressState.duration,
            ease: 'linear',
          }}
        />
      )}
    </MotionPressable>
  );
});

const defaultPaginationAccessibilityLabel = (pageIndex: number) => `Go to page ${pageIndex + 1}`;

export const DefaultCarouselPagination = memo(function DefaultCarouselPagination({
  totalPages,
  activePageIndex,
  onClickPage,
  paginationAccessibilityLabel = defaultPaginationAccessibilityLabel,
  className,
  classNames,
  style,
  styles,
  testID = 'carousel-pagination',
  variant = 'pill',
}: DefaultCarouselPaginationProps) {
  const isDot = variant === 'dot';

  const getAccessibilityLabel = useCallback(
    (index: number) =>
      typeof paginationAccessibilityLabel === 'function'
        ? paginationAccessibilityLabel(index)
        : paginationAccessibilityLabel,
    [paginationAccessibilityLabel],
  );

  return (
    <HStack
      className={cx(defaultPaginationCss, className, classNames?.root)}
      gap={0.5}
      justifyContent="center"
      style={{ ...style, ...styles?.root }}
    >
      {totalPages > 0 ? (
        Array.from({ length: totalPages }, (_, index) =>
          isDot ? (
            <PaginationDot
              key={index}
              accessibilityLabel={getAccessibilityLabel(index)}
              className={classNames?.dot}
              isActive={index === activePageIndex}
              onClick={() => onClickPage?.(index)}
              style={styles?.dot}
              testID={`${testID}-${index}`}
            />
          ) : (
            <PaginationPill
              key={index}
              accessibilityLabel={getAccessibilityLabel(index)}
              className={cx(pillCss, classNames?.dot)}
              isActive={index === activePageIndex}
              onClick={() => onClickPage?.(index)}
              style={styles?.dot}
              testID={`${testID}-${index}`}
            />
          ),
        )
      ) : (
        <Pressable
          disabled
          aria-hidden="true"
          background="bgLine"
          borderColor="transparent"
          className={cx(isDot ? dotCss : pillCss, classNames?.dot)}
          style={{
            opacity: 0,
            width: isDot ? INDICATOR_INACTIVE_WIDTH : undefined,
            ...styles?.dot,
          }}
        />
      )}
    </HStack>
  );
});
