import React, { memo } from 'react';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';

import type { HStackProps } from '../../layout/HStack';
import { HStack } from '../../layout/HStack';

export type CarouselControlsWrapperProps = HStackProps & {
  children?: React.ReactNode;
};

/** Wrapper to house ProgressIndicators and Dismiss IconButton when controls are shown in Carousel */
export const CarouselControlsWrapper = memo(function CarouselControlsWrapper({
  children,
  opacity,
  ...props
}: CarouselControlsWrapperProps) {
  return (
    <HStack
      animated
      left={0}
      opacity={opacity}
      paddingX={gutter}
      position="absolute"
      right={0}
      top={0}
      zIndex={zIndex.interactable}
      {...props}
    >
      {children}
    </HStack>
  );
});

CarouselControlsWrapper.displayName = 'CarouselControlsWrapper';
