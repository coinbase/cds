import React, { useCallback, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalContext } from '@coinbase/cds-common/overlays/ModalContext';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../buttons/Button';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { VStack } from '../../layout/VStack';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

/** Deep link: expoapp:///DebugReactNavigationModal */

const ModalNavigationScreen = () => {
  const navigation = useNavigation();
  const handleClose = useCallback(() => navigation.goBack(), [navigation]);
  const { top } = useSafeAreaInsets();

  const modalContext = useMemo(
    () => ({
      visible: true,
      onRequestClose: handleClose,
    }),
    [handleClose],
  );

  const rootStyle = useMemo(() => ({ paddingTop: top }), [top]);

  return (
    <ModalContext.Provider value={modalContext}>
      <VStack flexGrow={1} style={rootStyle}>
        <ModalHeader closeAccessibilityLabel="Close" title="Navigation Modal" />
        <ModalBody>
          <LoremIpsum />
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onPress={handleClose}>Save</Button>}
          secondaryAction={
            <Button onPress={handleClose} variant="secondary">
              Cancel
            </Button>
          }
        />
      </VStack>
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line internal/example-screen-default
export default ModalNavigationScreen;
