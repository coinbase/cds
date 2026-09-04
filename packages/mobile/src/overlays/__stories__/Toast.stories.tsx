import React, { useCallback } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { useToast } from '../../overlays/useToast';

const BasicToast = () => {
  const toast = useToast();

  const onActionPressConsole = useCallback(() => console.log('action pressed'), []);
  const onWillHideConsole = useCallback(() => console.log('toast hiding'), []);
  const onDidHideConsole = useCallback(() => console.log('toast hidden'), []);

  const handleShow = useCallback(() => {
    toast.show('Toast copy', {
      action: { label: 'Action', onPress: onActionPressConsole },
      onWillHide: onWillHideConsole,
      onDidHide: onDidHideConsole,
    });
  }, [toast, onActionPressConsole, onWillHideConsole, onDidHideConsole]);

  const handleShowMultiline = useCallback(() => {
    toast.show(`Very${' very'.repeat(30)} long toast copy`, {
      action: { label: 'Action', onPress: onActionPressConsole },
    });
  }, [toast, onActionPressConsole]);

  const handleShowBottomOffset = useCallback(() => {
    toast.show('Toast copy', {
      action: { label: 'Action', onPress: onActionPressConsole },
      bottomOffset: 100,
    });
  }, [toast, onActionPressConsole]);

  const handleVariant = useCallback(() => {
    toast.show('Toast copy', {
      variant: 'bgNegative',
    });
  }, [toast]);

  return (
    <VStack gap={3}>
      <Button onPress={handleShow}>Show Toast</Button>
      <Button onPress={handleShowMultiline}>Multiline Toast</Button>
      <Button onPress={handleShowBottomOffset}>Bottom Offset Toast</Button>
      <Button onPress={handleVariant}>Variant</Button>
    </VStack>
  );
};

const ToastScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic Toast">
        <BasicToast />
      </Example>
    </ExampleScreen>
  );
};

export default ToastScreen;
