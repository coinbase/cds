import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';

import { IconButton } from '../../buttons';
import type { Polymorphic } from '../../core/polymorphism';
import { LogoMark } from '../../icons/LogoMark';
import { Box, HStack, type HStackDefaultElement, type HStackProps } from '../../layout';
import { breakpoints } from '../../styles/media';
import { Text } from '../../typography/Text';

export type FullscreenModalHeaderBaseProps = {
  logo?: React.ReactElement;
  title?: string;
  onRequestClose: () => void;
  hideDivider?: boolean;
  labelledBySource?: string;
  closeAccessibilityLabel?: string;
};

export type FullscreenModalHeaderProps = Polymorphic.ExtendableProps<
  HStackProps<HStackDefaultElement>,
  FullscreenModalHeaderBaseProps
>;

const paddingStartSmall = 80;
const paddingStartLarge = 240;

const headerLogoCss = css`
  display: none;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    display: flex;
    width: ${paddingStartSmall}px;
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    display: flex;
    width: ${paddingStartSmall}px;
  }

  @media only screen and (min-width: ${breakpoints.desktop}px) {
    width: ${paddingStartLarge}px;
  }
`;

const headerLogoInnerCss = css`
  display: flex;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    display: none;
  }
`;

export const FullscreenModalHeader = memo(
  forwardRef(function FullscreenModalHeader(
    {
      logo,
      title,
      onRequestClose,
      hideDivider,
      labelledBySource,
      closeAccessibilityLabel,
      alignItems = 'center',
      borderedBottom = true,
      paddingX = 4,
      paddingY = 2,
      ...props
    }: FullscreenModalHeaderProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    const actualBorderedBottom = hideDivider === undefined ? borderedBottom : !hideDivider;

    return (
      <HStack
        ref={ref}
        alignItems={alignItems}
        borderedBottom={actualBorderedBottom}
        paddingX={paddingX}
        paddingY={paddingY}
        {...props}
      >
        <Box className={headerLogoCss} paddingEnd={3}>
          {logo ?? <LogoMark size={32} />}
        </Box>
        <Box flexGrow={1}>
          {title ? (
            <Text as="h1" display="block" font="title1" id={labelledBySource}>
              {title}
            </Text>
          ) : (
            <div className={headerLogoInnerCss}>{logo ?? <LogoMark size={32} />}</div>
          )}
          <Box flexGrow={1} justifyContent="flex-end">
            <IconButton
              transparent
              aria-label={closeAccessibilityLabel}
              name="close"
              onClick={onRequestClose}
            />
          </Box>
        </Box>
      </HStack>
    );
  }),
);
