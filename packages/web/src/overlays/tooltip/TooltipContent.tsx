import React, { forwardRef, memo, useMemo } from 'react';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  getTranslateConfigByPlacement,
} from '@coinbase/cds-common/animation/tooltip';
import {
  tooltipMaxWidth,
  tooltipPaddingX,
  tooltipPaddingY,
} from '@coinbase/cds-common/tokens/tooltip';
import { zIndex as zIndexTokens } from '@coinbase/cds-common/tokens/zIndex';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { Box, type BoxBaseProps } from '../../layout/Box';
import { useMotionProps } from '../../motion/useMotionProps';
import { Text } from '../../typography/Text';

import type { PopperTooltipProps } from './TooltipProps';

const textCss = css`
  /**
     * Fallback for mobile safari on iOS < 15.4
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap#browser_compatibility 
     */
  @supports not (overflow-wrap: anywhere) {
    word-break: break-word;
    overflow-wrap: break-word;
  }

  /* Desktop solution */
  overflow-wrap: anywhere;
`;

export type TooltipContentBaseProps = PopperTooltipProps &
  Omit<BoxBaseProps, 'children' | 'gap' | 'pin'>;

export type TooltipContentProps = TooltipContentBaseProps;

export const TooltipContent = memo(
  forwardRef(
    (
      {
        content,
        elevation,
        gap,
        testID,
        zIndex,
        tooltipId,
        placement = 'top',
        background = 'bg',
        borderRadius = 200,
        maxWidth,
        paddingX = tooltipPaddingX,
        paddingY = tooltipPaddingY,
        color = 'fg',
        font = 'label2',
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        ...props
      }: TooltipContentProps,
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const outerStyle = useMemo(
        () => ({
          padding: `var(--space-${gap})`,
          zIndex: zIndex ?? zIndexTokens.tooltip,
        }),
        [gap, zIndex],
      );

      const isTextContent = typeof content === 'string';
      const contentMaxWidth = maxWidth ?? (isTextContent ? tooltipMaxWidth : undefined);

      const motionProps = useMotionProps({
        style: outerStyle,
        enterConfigs: [animateInOpacityConfig, getTranslateConfigByPlacement({ placement })],
        exitConfigs: [
          animateOutOpacityConfig,
          getTranslateConfigByPlacement({ placement, isExiting: true }),
        ],
        exit: 'exit',
      });

      return (
        <motion.div {...motionProps} data-testid={`${testID}-motion`}>
          <Box
            ref={ref}
            background={background}
            borderRadius={borderRadius}
            data-testid={testID}
            elevation={elevation}
            id={tooltipId}
            maxWidth={contentMaxWidth}
            paddingX={paddingX}
            paddingY={paddingY}
            role="tooltip"
            width="max-content"
            {...props}
          >
            {isTextContent ? (
              <Text
                className={textCss}
                color={color}
                font={font}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                lineHeight={lineHeight}
              >
                {content}
              </Text>
            ) : (
              <div>{content}</div>
            )}
          </Box>
        </motion.div>
      );
    },
  ),
);
