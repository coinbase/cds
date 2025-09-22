import React, { useMemo } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import type { ScrollViewProps } from 'react-native';
import { useModalContext } from '@cbhq/cds-common/overlays/ModalContext';

import { useContentSize } from '../../hooks/useContentSize';
import { useLayout } from '../../hooks/useLayout';
import { Box } from '../../layout';

type ModalBodyProps = ScrollViewProps;

export const ModalBody: React.FC<React.PropsWithChildren<ModalBodyProps>> = ({
  children,
  ...props
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
        {...props}
      >
        <Box
          flexGrow={1}
          paddingX={3}
          // remove vertical padding when dividers hidden
          paddingY={hideDividers ? 0 : 3}
        >
          {children}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
