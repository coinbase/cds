import { useOverlay } from './useOverlay';

/**
 * @deprecated Use the visible and onRequestClose props as outlined in the docs here https://cds.cbhq.net/components/modal#get-started
 */
export const useAlert = () => {
  return useOverlay('alert_');
};
