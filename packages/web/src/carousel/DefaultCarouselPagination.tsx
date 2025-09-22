import React, { type KeyboardEvent, memo, useCallback } from 'react';
import { useRefMap } from '@cbhq/cds-common/hooks/useRefMap';
import { RefMapContext, useRefMapContext } from '@cbhq/cds-common/system/RefMapContext';
import type { SharedProps } from '@cbhq/cds-common/types';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableProps } from '../system/Pressable';

import type { CarouselPaginationComponentProps } from './Carousel';

const defaultPaginationCss = css`
  padding: var(--space-0_5) 0;
`;

const dotCss = css`
  width: var(--space-3);
  height: var(--space-0_5);
  border-radius: var(--borderRadius-100);
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

type PaginationDotProps = PressableProps<'button'> & {
  id: string;
  isActive?: boolean;
};

const PaginationDot = memo(function PressableWithRef({
  id,
  isActive,
  ...props
}: PaginationDotProps) {
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
}: DefaultCarouselPaginationProps) {
  const paginationRefMap = useRefMap<HTMLElement>();

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

  return (
    <RefMapContext.Provider value={paginationRefMap}>
      <HStack
        className={cx(defaultPaginationCss, className, classNames?.root)}
        gap={0.5}
        justifyContent="center"
        style={{ ...style, ...styles?.root }}
      >
        {totalPages > 0 ? (
          Array.from({ length: totalPages }, (_, index) => (
            <PaginationDot
              key={index}
              accessibilityLabel={
                typeof paginationAccessibilityLabel === 'function'
                  ? paginationAccessibilityLabel(index)
                  : `${paginationAccessibilityLabel} ${index + 1}`
              }
              className={cx(dotCss, classNames?.dot)}
              id={`${testID}-${index}`}
              isActive={index === activePageIndex}
              onClick={() => onClickPage?.(index)}
              onKeyDown={getPaginationKeyDownHandler(index)}
              style={styles?.dot}
              testID={`${testID}-${index}`}
            />
          ))
        ) : (
          <Pressable
            disabled
            aria-hidden="true"
            background="bgLine"
            borderColor="transparent"
            className={cx(dotCss, classNames?.dot)}
            style={{ opacity: 0, ...styles?.dot }}
          />
        )}
      </HStack>
    </RefMapContext.Provider>
  );
});
