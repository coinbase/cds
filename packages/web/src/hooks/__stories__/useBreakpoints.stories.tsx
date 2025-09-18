import React from 'react';

import { VStack } from '../../layout/VStack';
import { MediaQueryProvider } from '../../system/MediaQueryProvider';
import { Text } from '../../typography/Text';
import type { DeviceBreakpointValues } from '../useBreakpoints';
import { useBreakpoints } from '../useBreakpoints';

const deviceMap: Record<string, string> = {
  isPhone: 'a phone',
  isPhonePortrait: 'a phone in portrait',
  isPhoneLandscape: 'a phone in landscape',
  isTablet: 'a tablet',
  isTabletPortrait: 'a tablet in portrait',
  isTabletLandscape: 'a tablet in landscape',
  isDesktop: 'a desktop',
  isDesktopSmall: 'a small desktop',
  isDesktopLarge: 'a large desktop',
  isExtraWide: 'an extra wide desktop',
};

const Example = () => {
  const result = useBreakpoints();
  const deviceArr: string[] = [];

  const deviceName = () => {
    for (const device in result) {
      if (device in deviceMap && result[device as DeviceBreakpointValues]) {
        deviceArr.push(deviceMap[device]);
      }
    }
    if (deviceArr.length === 1) {
      return deviceArr[0];
    }
    if (deviceArr.length) {
      return deviceArr.join(' and ');
    }
    return 'no device breakpoints';
  };

  return (
    <VStack background="bgAlternate" borderColor="bgLine" borderRadius={200} gap={2} padding={3}>
      <Text as="h3" display="block" font="headline">
        I am as wide as {deviceName()}
      </Text>
      <VStack as="pre" color="fg">
        {JSON.stringify(result, null, 2)}
      </VStack>
    </VStack>
  );
};

export const DefaultToDevice = () => {
  return (
    <MediaQueryProvider>
      <VStack gap={2}>
        <Example />
      </VStack>
    </MediaQueryProvider>
  );
};
DefaultToDevice.parameters = { percy: { enableJavaScript: true } };

export default {
  title: 'Hooks/useBreakpoints',
  component: Example,
};
