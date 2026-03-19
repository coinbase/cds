import React, { memo, useMemo } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import type { ScrollViewProps } from 'react-native';
import { useModalContext } from '@coinbase/cds-common/overlays/ModalContext';

import { useComponentConfig } from '../../hooks/useComponentConfig';
import { useContentSize } from '../../hooks/useContentSize';
import { useLayout } from '../../hooks/useLayout';
import { Box } from '../../layout';

export type ModalBodyBaseProps = ScrollViewProps;
type ModalBodyProps = ModalBodyBaseProps;

export const ModalBody: React.FC<React.PropsWithChildren<ModalBodyProps>> = memo((_props) => {
  const mergedProps = useComponentConfig('ModalBody', _props);
  const { children, ...props } = mergedProps;
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
});
