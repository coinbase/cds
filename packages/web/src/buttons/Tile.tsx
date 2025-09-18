import React, { memo, useCallback, useMemo, useState } from 'react';
import { css } from '@linaria/core';

import { DotCount } from '../dots/DotCount';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

export type TileBaseProps = {
  title: string;
  /** Surfaces a DotCount around the content */
  count?: number;
  /** Reveals truncated title text */
  showOverflow?: boolean;
  children?: JSX.Element;
};

export type TileProps = TileBaseProps;

const truncatedCss = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const visibleCss = css`
  overflow: visible;
  white-space: normal;
  hyphens: auto;
  overflow-wrap: anywhere;
`;

/**
 * @danger this component is for internal use only
 */
export const Tile = memo(({ title, count, showOverflow, children }: TileProps) => {
  const [shouldOverflow, setShouldOverflow] = useState(false);
  const overflowTextStyles = (showOverflow ?? shouldOverflow) ? visibleCss : truncatedCss;

  const handleShowOverflow = useCallback(() => {
    if (showOverflow === undefined) setShouldOverflow(true);
  }, [showOverflow]);

  const handleHideOverflow = useCallback(() => {
    if (showOverflow === undefined) setShouldOverflow(false);
  }, [showOverflow]);

  /* If count is provided, wrap the children in a DotCount */
  const renderContent = useMemo(
    () =>
      count ? (
        <DotCount count={count} pin="top-end">
          {children}
        </DotCount>
      ) : (
        children
      ),
    [children, count],
  );

  return (
    <VStack
      alignItems="center"
      gap={1}
      justifyContent="center"
      onMouseEnter={handleShowOverflow}
      onMouseLeave={handleHideOverflow}
      padding={1}
      width="var(--controlSize-tileSize)"
    >
      <VStack alignItems="center" justifyContent="center">
        {renderContent}
      </VStack>
      <Text as="p" className={overflowTextStyles} display="block" font="label2" textAlign="center">
        {title}
      </Text>
    </VStack>
  );
});
