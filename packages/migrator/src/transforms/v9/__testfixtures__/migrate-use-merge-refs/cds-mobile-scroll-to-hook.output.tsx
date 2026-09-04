import { useCallback, useRef } from 'react';
import type { ScrollView } from 'react-native';
import { mergeRefs } from "@coinbase/cds-common/utils/mergeRefs";

/** Representative pattern: hook merges a caller ref with an internal ref for imperative APIs. */
type AnyRef<T> =
  | React.Ref<T | null | undefined>
  | ((node: T | null | undefined) => void)
  | React.MutableRefObject<T | null | undefined>;

export const useScrollTo = (ref?: AnyRef<ScrollView>) => {
  const internalRef = useRef<ScrollView>(undefined);
  const scrollRef = mergeRefs(ref, internalRef);
  const scrollTo = useCallback(() => {
    internalRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, []);
  return [scrollRef, scrollTo] as const;
};
