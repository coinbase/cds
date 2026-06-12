import React, { memo, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  tooltipMaxWidth,
  tooltipPaddingX,
  tooltipPaddingY,
} from '@coinbase/cds-common/tokens/tooltip';

import { useLayout } from '../../hooks/useLayout';
import { useTheme } from '../../hooks/useTheme';
import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';

import type { InternalTooltipProps } from './TooltipProps';
import { useTooltipPosition } from './useTooltipPosition';

export const InternalTooltip = memo(function InternalTooltip({
  subjectLayout,
  content,
  placement,
  opacity,
  animateIn,
  translateY,
  gap,
  yShiftByStatusBarHeight,
  testID,
  onAccessibilityEscape,
  onAccessibilityTap,
  elevation,
  background = 'bg',
  borderRadius = 200,
  maxWidth = tooltipMaxWidth,
  paddingX = tooltipPaddingX,
  paddingY = tooltipPaddingY,
  color = 'fg',
  font = 'label2',
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  ...props
}: InternalTooltipProps) {
  const theme = useTheme();
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      animateIn.start();
    }
  }, [animateIn]);

  const [tooltipLayout, onTooltipLayout] = useLayout();

  const calculatedTooltipPosition = useTooltipPosition({
    placement,
    subjectLayout,
    tooltipLayout,
    yShiftByStatusBarHeight,
  });

  const outerTooltipStyles = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      ...styles.tooltip,
      ...calculatedTooltipPosition,
      paddingTop: theme.space[gap ?? 0],
      paddingBottom: theme.space[gap ?? 0],
    };
  }, [calculatedTooltipPosition, theme.space, gap]);

  return (
    <View
      accessible
      onAccessibilityEscape={onAccessibilityEscape}
      onAccessibilityTap={onAccessibilityTap}
      // close tooltip on double tapping in voiceover mode
      onLayout={onTooltipLayout}
      // close tooltip on escape a11y gesture
      style={outerTooltipStyles}
    >
      <Box
        animated
        background={background}
        borderRadius={borderRadius}
        elevation={elevation}
        maxWidth={maxWidth}
        opacity={opacity}
        paddingX={paddingX}
        paddingY={paddingY}
        style={{
          transform: [
            {
              translateY,
            },
          ],
        }}
        testID={testID}
        {...props}
      >
        {typeof content === 'string' ? (
          <Text
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
          content
        )}
      </Box>
    </View>
  );
});

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    alignItems: 'flex-start',
    flex: 1,
  },
});
