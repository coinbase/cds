import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import {
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
} from '@coinbase/cds-common/motion/dot';
import { dotCountSize } from '@coinbase/cds-common/tokens/dot';
import type {
  DotCountPinPlacement,
  DotCountVariants,
  DotOverlap,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';
import { parseDotCountMaxOverflow } from '@coinbase/cds-common/utils/parseDotCountMaxOverflow';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { NewAnimatePresence } from '../animation/NewAnimatePresence';
import { cx } from '../cx';
import { useTheme } from '../hooks/useTheme';
import { useMotionProps } from '../motion/useMotionProps';
import { Text } from '../typography/Text';

import { getTransform } from './dotStyles';

const baseCss = css`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const dotCountContentCss = css`
  align-items: center;
  justify-content: center;
  display: flex;
  border-style: solid;
  border-width: var(--borderWidth-100);
  border-radius: var(--borderRadius-400);
  padding-inline-start: var(--space-0_75);
  padding-inline-end: var(--space-0_75);
`;

const variantColorMap: Record<DotCountVariants, ThemeVars.Color> = {
  negative: 'fgNegative',
};

export type DotCountBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
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
     * An optional fixed height of the DotCount component.
     * Width grows based on content length.
     * @default 24
     * */
    height?: number;
    /**
     * An optional fixed width of the DotCount component.
     * By default, width grows based on content length.
     * @default auto
     * */
    width?: number;
  };

export type DotCountProps = DotCountBaseProps & {
  className?: string;
  style?: React.CSSProperties;
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

export const DotCount = memo(
  ({
    children,
    pin,
    variant = 'negative',
    count,
    max,
    height = dotCountSize,
    width,
    testID,
    accessibilityLabel,
    overlap,
    className,
    classNames,
    style,
    styles,
    ...props
  }: DotCountProps) => {
    const { color } = useTheme();
    const pinStyles = getTransform(pin, overlap);

    const containerStyles = useMemo(() => {
      const variantColor = variantColorMap[variant];
      return {
        height,
        minWidth: height,
        width,
        backgroundColor: color[variantColor],
        borderColor: color.bgSecondary,
        ...pinStyles,
        ...styles?.container,
      };
    }, [height, width, color, pinStyles, styles?.container, variant]);

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

    return (
      <div
        aria-label={accessibilityLabel}
        className={cx(baseCss, className, classNames?.root)}
        data-testid={testID}
        style={rootStyles}
        {...props}
      >
        {children}
        <NewAnimatePresence>
          {count > 0 && (
            // TODO: Remove type assertion after upgrading framer-motion to v11+ for React 19 compatibility
            <motion.div
              {...({
                ...motionProps,
                className: cx(dotCountContentCss, classNames?.container),
                'data-testid': 'dotcount-container',
                style: containerStyles,
              } as React.ComponentProps<typeof motion.div>)}
            >
              <Text
                as="p"
                className={classNames?.text}
                color="fgInverse"
                display="block"
                font="caption"
                style={styles?.text}
                textAlign="center"
              >
                {parseDotCountMaxOverflow(count, max)}
              </Text>
            </motion.div>
          )}
        </NewAnimatePresence>
      </div>
    );
  },
);
