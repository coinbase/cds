import React, { useCallback } from 'react';
import { Box } from '@coinbase/cds-web/layout/Box';
import type { PressableProps } from '@coinbase/cds-web/system/Pressable';
import { Pressable } from '@coinbase/cds-web/system/Pressable';
import { Text } from '@coinbase/cds-web/typography';
import { useThrottledValue } from '@site/src/utils/useThrottledValue';

import { characterSet, maxUpdatesPerSecond } from './constants';
type HeroCellProps = Omit<
  PressableProps<'button'>,
  'children' | 'background' | 'onHoverStart' | 'onHoverEnd' | 'onClick'
> & {
  charSetIndex: number;
  cellIndex: number;
  onHoverStart: (cellIndex: number) => void;
  onHoverEnd: (cellIndex: number) => void;
  onClick: (cellIndex: number) => void;
  style?: React.CSSProperties;
};

export const HeroCell = ({
  charSetIndex,
  cellIndex,
  onHoverStart,
  onHoverEnd,
  onClick,
}: HeroCellProps) => {
  const throttledCharSetIndex = useThrottledValue(charSetIndex, 1000 / maxUpdatesPerSecond);
  const character = characterSet[throttledCharSetIndex % characterSet.length];
  const isColor = character.startsWith('#') && character !== '#';

  const handleHoverStart = useCallback(
    (event: React.PointerEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => {
      if ('pointerType' in event && event.pointerType === 'mouse') onHoverStart(cellIndex);
    },
    [onHoverStart, cellIndex],
  );
  const handleHoverEnd = useCallback(
    (event: React.PointerEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => {
      if ('pointerType' in event && event.pointerType === 'mouse') onHoverEnd(cellIndex);
    },
    [onHoverEnd, cellIndex],
  );
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClick(cellIndex);
    },
    [onClick, cellIndex],
  );
  return (
    <Pressable
      aria-hidden={true}
      aspectRatio={1}
      background="bgAlternate"
      borderRadius={{ base: 200, phone: 100 }}
      borderWidth={0}
      onBlur={handleHoverEnd}
      onClick={handleClick}
      onFocus={handleHoverStart}
      onPointerEnter={handleHoverStart}
      onPointerLeave={handleHoverEnd}
      overflow="hidden"
      tabIndex={-1}
    >
      <Box
        alignItems="center"
        borderRadius={{ base: 200, phone: 100 }}
        dangerouslySetBackground={isColor ? character : undefined}
        height="100%"
        justifyContent="center"
        overflow="hidden"
        width="100%"
      >
        <Text font={{ base: 'display2', tablet: 'display3', phone: 'title4' }}>
          {isColor ? ' ' : character}
        </Text>
      </Box>
    </Pressable>
  );
};
