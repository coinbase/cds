import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { StickyFooter } from '../StickyFooter';

const StickyFooterScreen = () => {
  const [showStickyFooter, setShowStickyFooter] = useState(true);
  const handleButtonPress = useCallback(() => {
    setShowStickyFooter(!showStickyFooter);
  }, [showStickyFooter]);
  const inset = useSafeAreaInsets();

  return (
    <View>
      <ExampleScreen>
        <Example title="StickyFooter with Screen">
          <Button onPress={handleButtonPress}>{showStickyFooter ? 'Close' : 'Open'}</Button>
        </Example>
      </ExampleScreen>
      {showStickyFooter && (
        <View style={{ position: 'absolute', bottom: inset.bottom / 2, left: 0, right: 0 }}>
          <StickyFooter>
            <VStack
              alignContent="center"
              alignItems="center"
              gap={1}
              justifyContent="center"
              width="100%"
            >
              <Button block onPress={handleButtonPress}>
                Primary
              </Button>
              <Button block variant="secondary">
                Secondary
              </Button>
            </VStack>
          </StickyFooter>
        </View>
      )}
    </View>
  );
};

export default StickyFooterScreen;
