import { useEffect, useRef, useState } from 'react';
import { PixelRatio } from 'react-native';

import { useAppState } from './useAppState';

/** Update font scale on app change. RN does not offer a hook for tapping into this like useColorScheme so we have to manually handle based on app state. */
export const useDeviceFontScale = () => {
  const [fontScale, setFontScale] = useState(PixelRatio.getFontScale());
  const fontScaleRef = useRef(PixelRatio.getFontScale());
  const appState = useAppState();

  useEffect(() => {
    if (appState === 'active') {
      const newFontScale = PixelRatio.getFontScale();
      if (fontScaleRef.current !== newFontScale) {
        setFontScale(newFontScale);
        fontScaleRef.current = newFontScale;
      }
    }
  }, [appState]);

  return fontScale;
};
