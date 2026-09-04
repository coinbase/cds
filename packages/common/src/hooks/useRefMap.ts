import { useCallback, useMemo, useRef } from 'react';

export type RefMapOptions<RefValue> = {
  initialRefMap?: Record<string, RefValue>;
};

export type RefMapItem = { id: string };

export type RefMapApi<RefValue> = {
  refs: Record<string, RefValue>;
  getRef: (id: string) => RefValue | null;
  registerRef: (id: string, ref: RefValue) => void;
};

export const useRefMap = <RefValue>({
  initialRefMap = {},
}: RefMapOptions<RefValue> = {}): RefMapApi<RefValue> => {
  const refs = useRef<Record<string, RefValue>>(initialRefMap);

  const getRef = useCallback((id: string) => (id in refs.current ? refs.current[id] : null), []);

  const registerRef = useCallback((id: string, ref: RefValue) => {
    refs.current[id] = ref;
  }, []);

  const api = useMemo(
    () => ({ refs: refs.current, getRef, registerRef }),
    [refs, getRef, registerRef],
  );
  return api;
};
