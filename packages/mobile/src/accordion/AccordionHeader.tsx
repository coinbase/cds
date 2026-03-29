import React, { forwardRef, memo, useCallback } from 'react';
import type { View } from 'react-native';
import { useAccordionContext } from '@coinbase/cds-common/accordion/AccordionProvider';
import {
  accordionIconHiddenRotate,
  accordionIconVisibleRotate,
} from '@coinbase/cds-common/animation/accordion';
import { listHeight } from '@coinbase/cds-common/tokens/cell';
import type { SharedProps } from '@coinbase/cds-common/types';

import type { CollapsibleBaseProps } from '../collapsible/Collapsible';
import { useCellSpacing } from '../hooks/useCellSpacing';
import { Box, HStack, VStack } from '../layout';
import { AnimatedCaret } from '../motion/AnimatedCaret';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

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
};

export type AccordionIconBaseProps = Pick<CollapsibleBaseProps, 'collapsed'>;

export type AccordionHeaderBaseProps = SharedProps &
  AccordionMediaBaseProps &
  AccordionTitleBaseProps &
  AccordionIconBaseProps & {
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
  };

export type AccordionMediaProps = AccordionMediaBaseProps;

export const AccordionMedia = memo(({ media }: AccordionMediaProps) => <Box>{media}</Box>);

export type AccordionTitleProps = AccordionTitleBaseProps;

export const AccordionTitle = memo(({ title, subtitle }: AccordionTitleProps) => (
  <Box flexGrow={1} flexShrink={1} justifyContent="flex-start">
    <VStack>
      <Text font="headline">{title}</Text>
      {!!subtitle && (
        <Text color="fgMuted" font="body">
          {subtitle}
        </Text>
      )}
    </VStack>
  </Box>
));

export type AccordionIconProps = AccordionIconBaseProps;

export const AccordionIcon = memo(({ collapsed }: AccordionIconProps) => {
  return (
    <Box justifyContent="flex-end">
      <AnimatedCaret rotate={collapsed ? accordionIconHiddenRotate : accordionIconVisibleRotate} />
    </Box>
  );
});

export type AccordionHeaderProps = AccordionHeaderBaseProps;

/**
 * Renders a Pressable element to use as the header to an AccordionItem.
 * Composes an Accordion Media, Title, and Icon.
 */
export const AccordionHeader = memo(
  forwardRef(
    (
      { itemKey, title, subtitle, onPress, media, collapsed, testID }: AccordionHeaderProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const { setActiveKey, activeKey } = useAccordionContext();
      const spacing = useCellSpacing();
      const accessibilityLabel = subtitle ? `${title}, ${subtitle}` : title;

      const handlePress = useCallback(() => {
        onPress?.(itemKey);
        setActiveKey(itemKey === activeKey ? null : itemKey);
      }, [onPress, itemKey, setActiveKey, activeKey]);

      return (
        <Pressable
          ref={forwardedRef}
          noScaleOnPress
          transparentWhileInactive
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="togglebutton"
          accessibilityState={{ expanded: !collapsed }}
          background="bg"
          onPress={handlePress}
          testID={testID}
        >
          <HStack
            alignItems="center"
            gap={2}
            minHeight={listHeight}
            width="100%"
            {...spacing.outer}
          >
            {!!media && <AccordionMedia media={media} />}
            <AccordionTitle subtitle={subtitle} title={title} />
            <AccordionIcon collapsed={collapsed} />
          </HStack>
        </Pressable>
      );
    },
  ),
);
