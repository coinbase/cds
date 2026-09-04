import { useId, useMemo } from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';

type Options = Pick<SharedAccessibilityProps, 'accessibilityLabelledBy' | 'accessibilityLabel'>;
/**
 * @typedef {Object} A11yLabels
 * @property {(string|undefined)} labelledBySource - The generated random id for the text element, if neither `accessibilityLabelledBy` nor `accessibilityLabel` is provided.
 * @property {(string|undefined)} labelledBy - The id reference to be used with `aria-labelledby` for the element requiring context.
 * @property {(string|undefined)} label - The text to be used with `aria-label` for the element requiring context.
 */

/**
 *
 * =======================================
 * A HOOK TO MANAGE THE GENERATION AND
 * PRIORITIZATION OF ACCESSIBILITY LABELS.
 * =======================================
 *
 * If neither `accessibilityLabelledBy` nor `accessibilityLabel` is defined, a
 * random id is generated and returned via the `labelledBySource` and `labelledBy`
 * props for use with `aria-labelledby`.
 *
 * =====================
 * CONTROL FLOW DETAILS
 * =====================
 *
 * If neither the `accessibilityLabelledBy` nor `accessibilityLabel` params are defined,
 * then a random id is generated and returned via the `labelledBySource`
 * and `labelledBy` props for use with `aria-labelledby`.
 *
 * If either accessibilityLabelledBy or accessibilityLabel is defined, the
 * value is passed through to either the labelledBy or label prop, respectively.
 *
 * If both accessibilityLabelledBy and accessibilityLabel are defined, accessibilityLabelledBy is
 * prioritized and passed through to labelledBy while labelledBySource and label are undefined.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.accessibilityLabelledBy] - Element id to use with `aria-labelledby`.
 * @param {string} [options.accessibilityLabel] - Text to use with `aria-label`.
 * @returns {A11yLabels}
 */
export const useA11yLabels = ({ accessibilityLabelledBy, accessibilityLabel }: Options = {}) => {
  const randomId = useId();
  const labelledById = !(accessibilityLabelledBy ?? accessibilityLabel) ? randomId : undefined;

  return useMemo(
    () => ({
      labelledBySource: labelledById,
      labelledBy: accessibilityLabelledBy ?? labelledById,
      label: accessibilityLabelledBy ? undefined : accessibilityLabel,
    }),
    [labelledById, accessibilityLabelledBy, accessibilityLabel],
  );
};
