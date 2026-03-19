import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Modal as RNModal, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import type { ModalProps as RNModalProps } from 'react-native';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { ModalContext, type ModalContextValue } from '@coinbase/cds-common/overlays/ModalContext';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import type { PositionStyles, SharedProps } from '@coinbase/cds-common/types';

import { useComponentConfig } from '../../hooks/useComponentConfig';
import { VStack } from '../../layout';

import { useModalAnimation } from './useModalAnimation';

type ModalChildrenRenderProps = { closeModal: () => void };

export type ModalBaseProps = SharedProps &
  ModalContextValue &
  Pick<PositionStyles, 'zIndex'> &
  Omit<RNModalProps, 'children' | 'visible' | 'onRequestClose' | 'animationType'> & {
    /** Component to render as the Modal content */
    children?: React.ReactNode | React.FC<ModalChildrenRenderProps>;
    /**
     * Callback fired after the component is closed.
     */
    onDidClose?: () => void;
    /**
     * @danger This is a migration escape hatch. It is not intended to be used normally.
     * */
    width?: number;
  };

export type ModalRefBaseProps = Pick<ModalBaseProps, 'onRequestClose'>;

export type ModalProps = ModalBaseProps;

const overlayContentContextValue: OverlayContentContextValue = {
  isModal: true,
};

export const Modal = memo(
  forwardRef<ModalRefBaseProps, ModalProps>((_props, ref) => {
    const mergedProps = useComponentConfig('Modal', _props);
    const props = mergedProps;
    const {
      children,
      visible,
      onRequestClose,
      onDidClose,
      hideDividers,
      hideCloseButton,
      ...restProps
    } = props;
    const [{ opacity, scale }, animateIn, animateOut] = useModalAnimation();
    const [internalVisible, setInternalVisible] = useState(visible);
    const prevVisible = usePreviousValue(visible);

    const handleClose = useCallback(() => {
      animateOut.start(({ finished }) => {
        if (finished) {
          setInternalVisible(false);
          onDidClose?.();
        }
      });
    }, [animateOut, onDidClose]);

    useEffect(() => {
      if (!prevVisible && visible) {
        animateIn.start();
        setInternalVisible(true);
      } else if (prevVisible && !visible) {
        handleClose();
      }
    }, [visible, handleClose, onRequestClose, prevVisible, animateIn]);

    useImperativeHandle(
      ref,
      () => ({
        onRequestClose,
      }),
      [onRequestClose],
    );

    const modalData = useMemo(
      () => ({
        visible,
        onRequestClose,
        hideDividers,
        hideCloseButton,
      }),
      [visible, onRequestClose, hideDividers, hideCloseButton],
    );

    const renderChildrenProps = useMemo(
      () => ({ closeModal: () => onRequestClose?.() }),
      [onRequestClose],
    );

    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <RNModal
          hardwareAccelerated
          statusBarTranslucent
          transparent
          onRequestClose={onRequestClose}
          visible={internalVisible}
          {...restProps}
          // prevent animation from overridden
          animationType="none"
        >
          <VStack
            animated
            elevation={2}
            pin="all"
            style={{ transform: [{ scale }], opacity, borderWidth: 0 }}
          >
            <SafeAreaView style={styles.safeAreaContainer}>
              <ModalContext.Provider value={modalData}>
                {typeof children === 'function' ? children(renderChildrenProps) : children}
              </ModalContext.Provider>
            </SafeAreaView>
          </VStack>
        </RNModal>
      </OverlayContentContext.Provider>
    );
  }),
);

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
