import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import {
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
} from '@cbhq/cds-common/motion/dot';
import { dotCountSize } from '@cbhq/cds-common/tokens/dot';
import type {
  DotCountPinPlacement,
  DotCountVariants,
  DotOverlap,
  SharedAccessibilityProps,
  SharedProps,
} from '@cbhq/cds-common/types';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/utils/parseDotCountMaxOverflow';
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
  border-width: 1px;
  min-width: ${dotCountSize}px;
  height: ${dotCountSize}px;
  border-radius: 16px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-inline-start: 6px;
  padding-inline-end: 6px;
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
  };

export type DotCountProps = DotCountBaseProps & {
  /**
   * Custom class name for the root element.
   */
  className?: string;
  /**
   * Custom styles for the root element.
   */
  style?: React.CSSProperties;
  /**
   * Custom class names for the component.
   */
  classNames?: {
    /**
     * Custom class name for the root element.
     */
    root?: string;
    /**
     * Custom class name for the container element.
     */
    container?: string;
    /**
     * Custom class name for the text element.
     */
    text?: string;
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
     * Custom styles for the container element.
     */
    container?: React.CSSProperties;
    /**
     * Custom styles for the text element.
     */
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
        backgroundColor: color[variantColor],
        borderColor: color.bgSecondary,
        ...pinStyles,
        ...styles?.container,
      };
    }, [color, pinStyles, styles?.container, variant]);

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
            <motion.div
              {...motionProps}
              className={cx(dotCountContentCss, classNames?.container)}
              data-testid="dotcount-container"
              style={containerStyles}
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
