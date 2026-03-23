import React, { useMemo } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import type { ScrollViewProps } from 'react-native';
import { useModalContext } from '@coinbase/cds-common/overlays/ModalContext';

import { useContentSize } from '../../hooks/useContentSize';
import { useLayout } from '../../hooks/useLayout';
import { Box, type BoxBaseProps } from '../../layout/Box';

export type ModalBodyBaseProps = ScrollViewProps &
  Pick<
    BoxBaseProps,
    | 'padding'
    | 'paddingX'
    | 'paddingY'
    | 'paddingTop'
    | 'paddingBottom'
    | 'paddingStart'
    | 'paddingEnd'
  >;

export type ModalBodyProps = ModalBodyBaseProps;

export const ModalBody: React.FC<React.PropsWithChildren<ModalBodyProps>> = ({
  children,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingBottom,
  paddingStart,
  paddingEnd,
  ...scrollViewProps
}) => {
  const [{ height: contentHeight }, onContentSizeChange] = useContentSize();
  const [{ height: scrollHeight }, onLayout] = useLayout();
  const { hideDividers } = useModalContext();

  // dynamically set scrollEnabled base on content height
  const shouldEnableScroll = useMemo(
    () => contentHeight > scrollHeight,
    [contentHeight, scrollHeight],
  );

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        scrollEnabled={shouldEnableScroll}
        {...scrollViewProps}
      >
        <Box
          flexGrow={1}
          padding={padding}
          paddingBottom={paddingBottom}
          paddingEnd={paddingEnd}
          paddingStart={paddingStart}
          paddingTop={paddingTop}
          paddingX={paddingX ?? (padding === undefined ? 3 : undefined)}
          // remove vertical padding when dividers hidden
          paddingY={paddingY ?? (padding === undefined ? (hideDividers ? 0 : 3) : undefined)}
        >
          {children}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
