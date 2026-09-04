import { useMemo } from 'react';
import { usePrefixedId } from '@coinbase/cds-common/hooks/usePrefixedId';

export type AriaHasPopupType = 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

export type Options = {
  accessibilityLabel?: string;
  hasPopupType?: AriaHasPopupType;
};
const defaultOptions: Options = {
  accessibilityLabel: undefined,
  hasPopupType: undefined,
};

export type AccessibleControlledReturnType = {
  triggerAccessibilityProps: {
    'aria-expanded': boolean;
    'aria-controls': string;
    'aria-haspopup': AriaHasPopupType;
  };
  controlledElementAccessibilityProps: {
    id: string;
    accessibilityLabel?: string;
  };
};

/** hook that generates unique aria labels and attributes for trigger element that controls the visibility of another controlled element */
export const useA11yControlledVisibility = (
  isVisible: boolean,
  { accessibilityLabel, hasPopupType = 'dialog' }: Options | undefined = defaultOptions,
): AccessibleControlledReturnType => {
  const uniqueId = usePrefixedId(accessibilityLabel);

  const triggerAccessibilityProps = useMemo(
    () => ({
      'aria-expanded': isVisible,
      'aria-controls': uniqueId,
      'aria-haspopup': hasPopupType,
    }),
    [hasPopupType, isVisible, uniqueId],
  );

  const controlledElementAccessibilityProps = useMemo(
    () => ({
      id: uniqueId,
      accessibilityLabel,
    }),
    [uniqueId, accessibilityLabel],
  );

  return {
    triggerAccessibilityProps,
    controlledElementAccessibilityProps,
  };
};
