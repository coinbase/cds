import { mergeRefs } from "@cbhq/cds-common/utils/mergeRefs";

export const X = () => {
  const ref = mergeRefs(a, b);
  return ref;
};
