import { mergeRefs } from "@coinbase/cds-common/utils/mergeRefs";

export const X = () => {
  const ref = mergeRefs(a, b);
  return ref;
};
