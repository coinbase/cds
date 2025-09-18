import { useEffect, useRef } from 'react';

export const usePreviousValue = <T>(value: T): T | undefined => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
    // Cleanup on unmount
    return () => {
      ref.current = undefined;
    };
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
};
