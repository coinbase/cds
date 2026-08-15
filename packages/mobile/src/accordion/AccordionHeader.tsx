import React, { memo, useCallback, useMemo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import { useAccordionContext } from '@coinbase/cds-common/accordion/AccordionProvider';
import {
  accordionIconHiddenRotate,
  accordionIconVisibleRotate,
} from '@coinbase/cds-common/animation/accordion';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { listHeight } from '@coinbase/cds-common/tokens/cell';
import type { IconSize } from '@coinbase/cds-common/types/IconSize';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { PaddingProps } from '@coinbase/cds-common/types/SpacingProps';

import type { CellSpacing } from '../cells/Cell';
import type { CollapsibleBaseProps } from '../collapsible/Collapsible';
import { useCellSpacing } from '../hooks/useCellSpacing';
import { Box, type BoxBaseProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { AnimatedCaret } from '../motion/AnimatedCaret';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

const compactPaddingProps = (paddingProps: PaddingProps): CellSpacing | undefined => {
  const entries = Object.entries(paddingProps).filter(([, value]) => value !== undefined);
  if (entries.length === 0) return undefined;
  return Object.fromEntries(entries) as CellSpacing;
};

export type AccordionMediaBaseProps = {
  /* Media (icon, asset, image, etc) to display at the start of the cell. */
  media?: React.ReactNode;
};

export type AccordionTitleBaseProps = {
  /**
   * Title of the accordion item
   */
  title: string;
  /**
   * Subtitle of the accordion item
   */
  subtitle?: string;
  /**
   * Tertiary text of the accordion item. Uses the CDS `legal` font.
   */
  tertiaryTitle?: string;
};

export type AccordionIconBaseProps = Pick<CollapsibleBaseProps, 'collapsed'> & {
  /** Size of the caret icon.
   * @default s
   */
  caretSize?: IconSize;
};

export type AccordionHeaderBaseProps = SharedProps &
  AccordionMediaBaseProps &
  AccordionTitleBaseProps &
  AccordionIconBaseProps &
  Pick<BoxBaseProps, keyof PaddingProps> & {
    /**
     * Callback function fired when the accordion item is pressed
     */
    onPress?: (key: string) => void;
    /**
     * Key of the accordion item.
     * This should be unique inside the same Accordion
     * unless you want multiple items to be controlled at the same time.
     */
    itemKey: string;
    /**
     * Background color of the header pressable.
     * @default bg
     */
    background?: ThemeVars.Color;
  };

export type AccordionMediaProps = AccordionMediaBaseProps;

export const AccordionMedia = memo(({ media }: AccordionMediaProps) => <Box>{media}</Box>);

export type AccordionTitleProps = AccordionTitleBaseProps;

export const AccordionTitle = memo(({ title, subtitle, tertiaryTitle }: AccordionTitleProps) => (
  <Box flexGrow={1} flexShrink={1} justifyContent="flex-start">
    <VStack>
      <Text font="headline">{title}</Text>
      {!!subtitle && (
        <Text color={tertiaryTitle ? undefined : 'fgMuted'} font="label2">
          {subtitle}
        </Text>
      )}
      {!!tertiaryTitle && (
        <Text color="fgMuted" font="legal">
          {tertiaryTitle}
        </Text>
      )}
    </VStack>
  </Box>
));

export type AccordionIconProps = AccordionIconBaseProps;

export const AccordionIcon = memo(({ collapsed, caretSize = 's' }: AccordionIconProps) => {
  return (
    <Box justifyContent="flex-end">
      <AnimatedCaret
        rotate={collapsed ? accordionIconHiddenRotate : accordionIconVisibleRotate}
        size={caretSize}
      />
    </Box>
  );
});

export type AccordionHeaderProps = AccordionHeaderBaseProps & {
  /** Custom style for the header pressable element */
  style?: StyleProp<ViewStyle>;
};

/**
 * Renders a Pressable element to use as the header to an AccordionItem.
 * Composes an Accordion Media, Title, and Icon.
 */
export const AccordionHeader = memo(
  ({
    ref: forwardedRef,
    itemKey,
    title,
    subtitle,
    tertiaryTitle,
    onPress,
    media,
    collapsed,
    testID,
    style,
    background = 'bg',
    caretSize,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingStart,
    paddingEnd,
  }: AccordionHeaderProps & {
    ref?: React.Ref<View>;
  }) => {
    const { setActiveKey, activeKey } = useAccordionContext();
    const outerSpacing = useMemo(
      () =>
        compactPaddingProps({
          padding,
          paddingX,
          paddingY,
          paddingTop,
          paddingBottom,
          paddingStart,
          paddingEnd,
        }),
      [padding, paddingX, paddingY, paddingTop, paddingBottom, paddingStart, paddingEnd],
    );
    // Header padding follows the same outer spacing rules as Cell.
    const spacing = useCellSpacing({ outerSpacing });
    const accessibilityLabel = [title, subtitle, tertiaryTitle].filter(Boolean).join(', ');

    const handlePress = useCallback(() => {
      onPress?.(itemKey);
      setActiveKey(itemKey === activeKey ? null : itemKey);
    }, [onPress, itemKey, setActiveKey, activeKey]);

    return (
      <Pressable
        ref={forwardedRef}
        noScaleOnPress
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="togglebutton"
        accessibilityState={{ expanded: !collapsed }}
        background={background}
        onPress={handlePress}
        style={style}
        testID={testID}
        transparentWhileInactive
      >
        <HStack alignItems="center" gap={2} minHeight={listHeight} width="100%" {...spacing.outer}>
          {!!media && <AccordionMedia media={media} />}
          <AccordionTitle subtitle={subtitle} tertiaryTitle={tertiaryTitle} title={title} />
          <AccordionIcon caretSize={caretSize} collapsed={collapsed} />
        </HStack>
      </Pressable>
    );
  },
);
