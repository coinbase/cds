import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';

export const X = () => {
  const ref = useMergeRefs(a, b);
  return ref;
};
