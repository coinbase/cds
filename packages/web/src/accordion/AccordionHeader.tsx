import React, { forwardRef, memo, useCallback } from 'react';
import { useAccordionContext } from '@coinbase/cds-common/accordion/AccordionProvider';
import {
  accordionIconHiddenRotate,
  accordionIconVisibleRotate,
} from '@coinbase/cds-common/animation/accordion';
import { listHeight } from '@coinbase/cds-common/tokens/cell';
import type { SharedProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import type { CollapsibleBaseProps } from '../collapsible';
import { useCellSpacing } from '../hooks/useCellSpacing';
import { Box, HStack, VStack } from '../layout';
import { AnimatedCaret } from '../motion/AnimatedCaret';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

import { getAccordionHeaderId, getAccordionPanelId } from './utils';

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
     * Callback function fired when the accordion item is clicked
     */
    onClick?: (key: string) => void;
    /**
     * Key of the accordion item.
     * This should be unique inside the same Accordion
     * unless you want multiple items to be controlled at the same time.
     */
    itemKey: string;
  };

const baseCss = css`
  margin: 0;
`;

const subtitleCss = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

const titleCss = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

type AccordionMediaProps = AccordionMediaBaseProps;

export const AccordionMedia = memo(({ media }: AccordionMediaProps) => (
  <Box flexGrow={0} flexShrink={0}>
    {media}
  </Box>
));

type AccordionTitleProps = AccordionTitleBaseProps;

export const AccordionTitle = memo(({ title, subtitle }: AccordionTitleProps) => (
  <Box className={titleCss} flexGrow={1} flexShrink={1} justifyContent="flex-start">
    <VStack>
      <Text as="div" display="block" font="headline" overflow="wrap">
        {title}
      </Text>
      {!!subtitle && (
        <Text
          as="div"
          className={subtitleCss}
          color="fgMuted"
          display="block"
          font="body"
          overflow="wrap"
        >
          {subtitle}
        </Text>
      )}
    </VStack>
  </Box>
));

type AccordionIconProps = AccordionIconBaseProps;

export const AccordionIcon = memo(({ collapsed }: AccordionIconProps) => {
  return (
    <Box justifyContent="flex-end">
      <AnimatedCaret rotate={collapsed ? accordionIconHiddenRotate : accordionIconVisibleRotate} />
    </Box>
  );
});

type AccordionHeaderProps = AccordionHeaderBaseProps;

/**
 * Renders a Pressable element to use as the header to an AccordionItem.
 * Composes an Accordion Media, Title, and Icon.
 */
export const AccordionHeader = memo(
  forwardRef(
    (
      { itemKey, title, subtitle, onClick, media, collapsed = false, testID }: AccordionHeaderProps,
      forwardedRef: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const { setActiveKey, activeKey } = useAccordionContext();
      const spacing = useCellSpacing();

      const handleClick = useCallback(() => {
        onClick?.(itemKey);
        setActiveKey(itemKey === activeKey ? null : itemKey);
      }, [onClick, setActiveKey, itemKey, activeKey]);

      return (
        <h2 className={baseCss}>
          <Pressable
            ref={forwardedRef}
            noScaleOnPress
            transparentWhileInactive
            aria-controls={getAccordionPanelId(itemKey)}
            aria-expanded={!collapsed} // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
            background="bg"
            id={getAccordionHeaderId(itemKey)}
            onClick={handleClick}
            testID={testID}
            width="100%"
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
        </h2>
      );
    },
  ),
);
