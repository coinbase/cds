import React, { useCallback } from 'react';

import { Button } from '../../buttons/Button';
import { HStack } from '../../layout/HStack';
import { useToast } from '../../overlays/useToast';
import { PortalProvider } from '../PortalProvider';
import { Toast } from '../Toast';

export default {
  title: 'Components/Toast',
  component: Toast,
};

const onActionPressConsole = () => console.log('action pressed');
const onWillHideConsole = () => console.log('toast hiding');
const onDidHideConsole = () => console.log('toast hidden');

export const BasicToast = () => {
  const toast = useToast();

  const handleShow = useCallback(() => {
    toast.show('Toast copy', {
      action: { label: 'Action', onPress: onActionPressConsole },
      hideCloseButton: true,
      disablePortal: true,
      onWillHide: onWillHideConsole,
      onDidHide: onDidHideConsole,
    });
  }, [toast]);

  const handleShowMultiline = useCallback(() => {
    toast.show(`Very${' very'.repeat(30)} long toast copy`, {
      action: { label: 'Action', onPress: onActionPressConsole },
    });
  }, [toast]);

  const handleShowBottomOffset = useCallback(() => {
    toast.show('Toast copy', {
      action: { label: 'Action', onPress: onActionPressConsole },
      bottomOffset: 100,
    });
  }, [toast]);

  const handleVariant = useCallback(() => {
    toast.show('Toast copy', {
      variant: 'bgNegative',
    });
  }, [toast]);

  return (
    <PortalProvider>
      <HStack gap={3}>
        <Button onClick={handleShow}>Show Toast</Button>
        <Button onClick={handleShowMultiline}>Multiline Toast</Button>
        <Button onClick={handleShowBottomOffset}>Bottom Offset Toast</Button>
        <Button onClick={handleVariant}>Variant</Button>
      </HStack>
    </PortalProvider>
  );
};
