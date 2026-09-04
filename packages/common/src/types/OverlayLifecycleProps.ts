export type OverlayLifecycleProps = {
  /**
   * Callback fired before the component shows.
   */
  onWillShow?: () => void;
  /**
   * Callback fired after the component is visible.
   */
  onDidShow?: () => void;
  /**
   * Callback fired before the component hides.
   */
  onWillHide?: () => void;
  /**
   * Callback fired after the component is hidden.
   */
  onDidHide?: () => void;
};
