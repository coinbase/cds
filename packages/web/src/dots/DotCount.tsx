import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import {
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
} from '@coinbase/cds-common/motion/dot';
import { dotCountSize } from '@coinbase/cds-common/tokens/dot';
import type { DotOverlap } from '@coinbase/cds-common/types/DotBaseProps';
import type {
  DotCountPinPlacement,
  DotCountVariants,
} from '@coinbase/cds-common/types/DotCountBaseProps';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { parseDotCountMaxOverflow } from '@coinbase/cds-common/utils/parseDotCountMaxOverflow';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { NewAnimatePresence } from '../animation/NewAnimatePresence';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box, type BoxBaseProps, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { useMotionProps } from '../motion/useMotionProps';
import { Text } from '../typography/Text';

import { getTransform } from './dotStyles';

const MotionBox = motion<BoxProps<BoxDefaultElement>>(Box);

const baseCss = css`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const variantColorMap: Record<DotCountVariants, ThemeVars.Color> = {
  negative: 'fgNegative',
};

export type DotCountBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Omit<BoxBaseProps, 'children' | 'color' | 'background' | 'pin' | 'height'> & {
    /**
     * The number value to be shown in the dot. If count is <= 0, dot will not show up.
     *  */
    count: number;
    /**
     * If a badge count is greater than max, it will truncate the numbers so its max+
     * @default 99
     *  */
    max?: number;
    /**
     * Background color of dot
     * @default negative
     * */
    variant?: DotCountVariants;
    /** Position of dot relative to its parent */
    pin?: DotCountPinPlacement;
    /** Children of where the dot will anchor to */
    children?: React.ReactNode;
    /** Indicates what shape Dot is overlapping */
    overlap?: DotOverlap;
    /**
     * Fixed height of the DotCount badge container. Width grows based on content length.
     * @default 24
     */
    height?: BoxBaseProps['height'];
  };

export type DotCountProps = DotCountBaseProps & {
  /** Class name for the root element */
  className?: string;
  /** Color token for the count label */
  color?: BoxBaseProps['color'];
  /** Custom class names for individual elements of the DotCount component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Container element */
    container?: string;
    /** Text element */
    text?: string;
  };
  /** Custom styles for individual elements of the DotCount component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Container element */
    container?: React.CSSProperties;
    /** Text element */
    text?: React.CSSProperties;
  };
};

export const DotCount = memo((_props: DotCountProps) => {
  const mergedProps = useComponentConfig('DotCount', _props);
  const {
    children,
    pin,
    variant = 'negative',
    count,
    max,
    height = dotCountSize,
    width,
    testID = 'dot-count',
    accessibilityLabel,
    overlap,
    className,
    classNames,
    style,
    styles,
    alignItems = 'center',
    justifyContent = 'center',
    display = 'flex',
    paddingX = 0.75,
    borderWidth = 100,
    borderRadius = 400,
    borderColor = 'bgSecondary',
    font = 'caption',
    color = 'fgInverse',
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    ...props
  } = mergedProps;
  const pinStyles = getTransform(pin, overlap);

  const containerStyle = useMemo(
    () => ({
      ...pinStyles,
      ...styles?.container,
    }),
    [pinStyles, styles?.container],
  );

  const motionProps = useMotionProps({
    enterConfigs: [dotOpacityEnterConfig, dotScaleEnterConfig],
    exitConfigs: [dotOpacityExitConfig, dotScaleExitConfig],
    exit: 'exit',
  });

  const rootStyles = useMemo(
    () => ({
      ...style,
      ...styles?.root,
    }),
    [styles?.root, style],
  );

  const displayCount = useMemo(() => parseDotCountMaxOverflow(count, max), [count, max]);

  return (
    <div
      aria-label={accessibilityLabel}
      className={cx(baseCss, className, classNames?.root)}
      data-testid={testID}
      style={rootStyles}
    >
      {children}
      <NewAnimatePresence>
        {count > 0 && (
          // TODO: Remove type assertion after upgrading framer-motion to v11+ for React 19 compatibility
          <MotionBox
            {...({
              ...motionProps,
              alignItems,
              background: variantColorMap[variant],
              borderColor,
              borderRadius,
              borderWidth,
              className: classNames?.container,
              'data-testid': 'dotcount-container',
              display,
              height,
              justifyContent,
              minWidth: height,
              paddingX,
              style: containerStyle,
              width,
              ...props,
            } as React.ComponentProps<typeof MotionBox>)}
          >
            <Text
              as="p"
              className={classNames?.text}
              color={color}
              display="block"
              font={font}
              fontFamily={fontFamily}
              fontSize={fontSize}
              fontWeight={fontWeight}
              lineHeight={lineHeight}
              style={styles?.text}
              textAlign="center"
            >
              {displayCount}
            </Text>
          </MotionBox>
        )}
      </NewAnimatePresence>
    </div>
  );
});
