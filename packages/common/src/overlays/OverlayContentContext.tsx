import { createContext, useContext, useMemo } from 'react';

// WARNING: If you add a new key to this type, you should also update the
// useOverlayContentContext hook's `derivedContext.isOverlay` expression!
export type OverlayContentContextValue = {
  /** True if we are inside any overlay component like Overlay, Modal, Tray, or Drawer. */
  isOverlay?: boolean;
  /** True if we are inside a Modal component. */
  isModal?: boolean;
  /** True if we are inside a Drawer or Tray component. */
  isDrawer?: boolean;
  /** True if we are inside a Tour component. */
  isTour?: boolean;
};

export const OverlayContentContext = createContext<OverlayContentContextValue>({});

export const useOverlayContentContext = () => {
  const context = useContext(OverlayContentContext);
  // userOverlayContentContext does not throw an error when used outside a provider
  // so that any component may check if it's being rendered as overlay content, even
  // if it's not wrapped in an OverlayContentContext.Provider.

  // If context.isOverlay was not explicitly defined then we derive it from the other values.
  const derivedContext = useMemo(
    () => ({ ...context, isOverlay: context.isModal || context.isDrawer || context.isTour }),
    [context],
  );

  if (context?.isOverlay === undefined) return derivedContext;
  return context;
};
