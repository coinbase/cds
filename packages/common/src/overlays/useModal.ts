import { useMemo } from 'react';

import { useOverlay } from './useOverlay';

/**
 * @deprecated Use the visible and onRequestClose props as outlined in the docs here https://cds.cbhq.net/components/modal#get-started. This will be removed in a future major release.
 * @deprecationExpectedRemoval v7
 */
export const useModal = () => {
  const { open, close } = useOverlay('modal_');

  return useMemo(
    () => ({
      openModal: open,
      closeModal: close,
    }),
    [open, close],
  );
};
