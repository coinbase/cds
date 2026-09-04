import React from 'react';
import { useOverlayContentContext } from '@coinbase/cds-common/overlays/OverlayContentContext';
import { renderHook } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { FullscreenModal } from '../modal/FullscreenModal';
import { Modal } from '../modal/Modal';
import { Overlay } from '../overlay/Overlay';

describe('useOverlayContentContext', () => {
  it('should return isOverlay as true when rendered inside Overlay', () => {
    const { result } = renderHook(() => useOverlayContentContext(), {
      wrapper: Overlay,
    });
    expect(result.current.isOverlay).toBe(true);
    expect(result.current.isModal).toBeUndefined();
    expect(result.current.isDrawer).toBeUndefined();
  });

  it('should return isOverlay and isModal as true when rendered inside Modal', () => {
    const { result } = renderHook(() => useOverlayContentContext(), {
      wrapper: ({ children }) => (
        <DefaultThemeProvider>
          <Modal visible onRequestClose={() => void false}>
            <>{children}</>
          </Modal>
        </DefaultThemeProvider>
      ),
    });
    expect(result.current.isOverlay).toBe(true);
    expect(result.current.isModal).toBe(true);
    expect(result.current.isDrawer).toBeUndefined();
  });

  it('should return isOverlay and isModal as true when rendered inside FullscreenModal', () => {
    const { result } = renderHook(() => useOverlayContentContext(), {
      wrapper: ({ children }) => (
        <DefaultThemeProvider>
          <FullscreenModal
            visible
            onRequestClose={() => void false}
            primaryContent={<>{children}</>}
          />
        </DefaultThemeProvider>
      ),
    });
    expect(result.current.isOverlay).toBe(true);
    expect(result.current.isModal).toBe(true);
    expect(result.current.isDrawer).toBeUndefined();
  });

  it('should return all values as undefined when rendered without provider', () => {
    const { result } = renderHook(() => useOverlayContentContext());
    expect(result.current.isOverlay).toBeUndefined();
    expect(result.current.isModal).toBeUndefined();
    expect(result.current.isDrawer).toBeUndefined();
  });
});
