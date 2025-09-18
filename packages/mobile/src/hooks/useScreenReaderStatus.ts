import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Hook to track screen reader status and update when changed.
 *
 * @returns {boolean} isScreenReaderEnabled - Whether screen reader is enabled
 */

export const useScreenReaderStatus = () => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);

  // initialize accessibility info on mount
  useEffect(() => {
    const initScreenReaderStatus = async () => {
      const enabled = await AccessibilityInfo.isScreenReaderEnabled();
      if (enabled) setIsScreenReaderEnabled(true);

      AccessibilityInfo.addEventListener('screenReaderChanged', (_isScreenReaderEnabled) => {
        if (_isScreenReaderEnabled) setIsScreenReaderEnabled(true);
        else setIsScreenReaderEnabled(false);
      });
    };

    void initScreenReaderStatus();
  }, []);

  return isScreenReaderEnabled;
};
