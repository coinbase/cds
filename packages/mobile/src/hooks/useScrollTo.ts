import { useCallback, useRef } from 'react';
import type { ScrollView } from 'react-native';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';

type CallbackRef<T> = (node: T) => void;
type AnyRef<T> =
  | React.Ref<T | null | undefined>
  | CallbackRef<T | null | undefined>
  | React.MutableRefObject<T | null | undefined>;

export type ScrollRef = CallbackRef<ScrollView> | null;
export type ScrollToParams = { x?: number; y?: number; animated?: boolean };
export type ScrollToFn = (params: ScrollToParams) => void;
export type ScrollToEndFn = (params?: { animated?: boolean }) => void;
export type ScrollToFns = {
  scrollTo: ScrollToFn;
  scrollToEnd: ScrollToEndFn;
};

export const useScrollTo = (ref?: AnyRef<ScrollView>): [ScrollRef, ScrollToFns] => {
  const internalRef = useRef<ScrollView>(undefined);
  const scrollRef = useMergeRefs(ref, internalRef);
  const scrollTo = useCallback(({ x = 0, y = 0, animated = true }: ScrollToParams) => {
    internalRef.current?.scrollTo({ x, y, animated });
  }, []);

  const scrollToEnd = useCallback(({ animated = true }: ScrollToParams = {}) => {
    internalRef.current?.scrollToEnd({ animated });
  }, []);

  return [scrollRef, { scrollTo, scrollToEnd }];
};
