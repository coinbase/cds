import React, { type KeyboardEvent, memo, useCallback } from 'react';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import { RefMapContext, useRefMapContext } from '@coinbase/cds-common/system/RefMapContext';
import type { SharedProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';
import { motion, useTransform } from 'framer-motion';

import { cx } from '../cx';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableProps } from '../system/Pressable';

import type { CarouselPaginationComponentProps } from './Carousel';
import { useCarouselAutoplayContext } from './CarouselContext';

const MotionPressable = motion(Pressable);

const defaultPaginationCss = css`
  padding: var(--space-0_5) 0;
`;

const pillCss = css`
  width: var(--space-3);
  height: var(--space-0_5);
  border-radius: var(--borderRadius-100);
`;

const dotCss = css`
  height: var(--space-0_5);
  border-radius: var(--borderRadius-100);
  overflow: hidden;
`;

const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 25,
};

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
  id: string;
  isActive?: boolean;
};

const PaginationPill = memo(function PaginationPill({
  id,
  isActive,
  ...props
}: PaginationIndicatorProps) {
  const { registerRef } = useRefMapContext();
  const refCallback = useCallback(
    (ref: HTMLButtonElement) => registerRef(id, ref),
    [registerRef, id],
  );

  return (
    <Pressable
      ref={refCallback}
      background={isActive ? 'bgPrimary' : 'bgLine'}
      borderColor="transparent"
      data-active={isActive}
      tabIndex={isActive ? undefined : -1}
      {...props}
    />
  );
});

const PaginationDot = memo(function PaginationDot({
  id,
  isActive,
  className,
  ...props
}: PaginationIndicatorProps) {
  const { registerRef } = useRefMapContext();
  const autoplayContext = useCarouselAutoplayContext();

  const refCallback = useCallback(
    (ref: HTMLButtonElement | null) => {
      if (ref) registerRef(id, ref);
    },
    [registerRef, id],
  );

  const progressWidth = useTransform(
    autoplayContext.progress,
    (value: number) => `${value * 100}%`,
  );

  const showProgress = isActive && autoplayContext.isEnabled;

  return (
    <MotionPressable
      ref={refCallback}
      animate={{
        width: isActive ? 'var(--space-3)' : 'var(--space-0_5)',
        backgroundColor:
          isActive && !showProgress ? 'var(--color-bgPrimary)' : 'var(--color-bgLine)',
      }}
      borderColor="transparent"
      borderWidth={0}
      className={cx(dotCss, className)}
      data-active={isActive}
      initial={false}
      tabIndex={isActive ? undefined : -1}
      transition={springTransition}
      {...props}
    >
      {showProgress && (
        <motion.div
          style={{
            width: progressWidth,
            height: '100%',
            background: 'var(--color-bgPrimary)',
            borderRadius: 'var(--borderRadius-100)',
          }}
        />
      )}
    </MotionPressable>
  );
});

export const DefaultCarouselPagination = memo(function DefaultCarouselPagination({
  totalPages,
  activePageIndex,
  onClickPage,
  paginationAccessibilityLabel = 'Go to page',
  className,
  classNames,
  style,
  styles,
  testID = 'carousel-pagination',
  variant = 'pill',
}: DefaultCarouselPaginationProps) {
  const paginationRefMap = useRefMap<HTMLElement>();
  const isDot = variant === 'dot';

  const getPaginationKeyDownHandler = useCallback(
    (pageIndex: number) => {
      const lastIndex = totalPages - 1;
      const nextIndex = pageIndex < lastIndex ? pageIndex + 1 : 0;
      const prevIndex = pageIndex !== 0 ? pageIndex - 1 : lastIndex;
      return function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault();
            paginationRefMap.getRef(`${testID}-${nextIndex}`)?.focus();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            paginationRefMap.getRef(`${testID}-${prevIndex}`)?.focus();
            break;
          case 'Home': {
            e.preventDefault();
            paginationRefMap.getRef(`${testID}-0`)?.focus();
            break;
          }
          case 'End': {
            e.preventDefault();
            paginationRefMap.getRef(`${testID}-${lastIndex}`)?.focus();
            break;
          }
          case ' ':
          case 'Enter':
            e.preventDefault();
            onClickPage?.(pageIndex);
            break;
          default:
            break;
        }
      };
    },
    [paginationRefMap, testID, totalPages, onClickPage],
  );

  const getAccessibilityLabel = useCallback(
    (index: number) =>
      typeof paginationAccessibilityLabel === 'function'
        ? paginationAccessibilityLabel(index)
        : `${paginationAccessibilityLabel} ${index + 1}`,
    [paginationAccessibilityLabel],
  );

  return (
    <RefMapContext.Provider value={paginationRefMap}>
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
                id={`${testID}-${index}`}
                isActive={index === activePageIndex}
                onClick={() => onClickPage?.(index)}
                onKeyDown={getPaginationKeyDownHandler(index)}
                style={styles?.dot}
                testID={`${testID}-${index}`}
              />
            ) : (
              <PaginationPill
                key={index}
                accessibilityLabel={getAccessibilityLabel(index)}
                className={cx(pillCss, classNames?.dot)}
                id={`${testID}-${index}`}
                isActive={index === activePageIndex}
                onClick={() => onClickPage?.(index)}
                onKeyDown={getPaginationKeyDownHandler(index)}
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
              width: isDot ? 'var(--space-0_5)' : undefined,
              ...styles?.dot,
            }}
          />
        )}
      </HStack>
    </RefMapContext.Provider>
  );
});
