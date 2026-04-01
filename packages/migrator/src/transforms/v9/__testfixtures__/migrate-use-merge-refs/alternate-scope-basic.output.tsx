import { mergeRefs } from "@example/cds-common/utils/mergeRefs";

export const X = () => {
  const ref = mergeRefs(a, b);
  return ref;
};
