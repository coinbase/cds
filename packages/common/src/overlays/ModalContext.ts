import { createContext, useContext } from 'react';

export type ModalContextValue = {
  /**
   * Controls visibility of the Modal
   * @default false
   */
  visible: boolean;
  /**
   * Callback function fired when modal is closed.
   */
  onRequestClose: () => void;
  /**
   * Hide top and bottom dividers inside Modal body
   * @default false
   */
  hideDividers?: boolean;
  /**
   * Hide the close icon on the top right
   * @default false
   */
  hideCloseButton?: boolean;
  accessibilityLabelledBy?: string;
};

export const ModalContext = createContext<ModalContextValue>({
  visible: false,
  onRequestClose: () => {},
  hideDividers: false,
  hideCloseButton: false,
});

export const useModalContext = () => useContext(ModalContext);
