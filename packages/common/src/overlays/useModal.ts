import { useMemo } from 'react';

import { useOverlay } from './useOverlay';

/**
 * @deprecated Use the visible and onRequestClose props as outlined in the docs here https://cds.coinbase.com/components/modal#get-started
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
