import React, { memo, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Modal as RNModal, Platform, StatusBar, StyleSheet } from 'react-native';
import type { ModalProps as RNModalProps, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { ModalContext, type ModalContextValue } from '@coinbase/cds-common/overlays/ModalContext';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { useComponentConfig } from '../../hooks/useComponentConfig';
import type { BoxProps } from '../../layout/Box';
import { VStack } from '../../layout/VStack';

import { useModalAnimation } from './useModalAnimation';

type ModalChildrenRenderProps = { closeModal: () => void };

/**
 * Appearance style props forwarded to the visible dialog surface (rather than the
 * underlying React Native Modal, which silently ignores them).
 */
type DialogStyleProps = Pick<
  BoxProps,
  | 'background'
  | 'color'
  | 'borderColor'
  | 'borderWidth'
  | 'borderRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
  | 'borderTopWidth'
  | 'borderBottomWidth'
  | 'borderStartWidth'
  | 'borderEndWidth'
  | 'bordered'
  | 'borderedTop'
  | 'borderedBottom'
  | 'borderedStart'
  | 'borderedEnd'
  | 'borderedHorizontal'
  | 'borderedVertical'
  | 'elevation'
  | 'padding'
  | 'paddingX'
  | 'paddingY'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingStart'
  | 'paddingEnd'
  | 'minWidth'
  | 'minHeight'
  | 'maxWidth'
  | 'maxHeight'
>;

export type ModalBaseProps = SharedProps &
  ModalContextValue &
  DialogStyleProps &
  Omit<RNModalProps, 'children' | 'visible' | 'onRequestClose' | 'animationType'> & {
    /** Component to render as the Modal content */
    children?: React.ReactNode | ((props: ModalChildrenRenderProps) => React.ReactNode);
    /**
     * Callback fired after the component is closed.
     */
    onDidClose?: () => void;
    /**
     * @danger This is a migration escape hatch. It is not intended to be used normally.
     * */
    width?: number;
    zIndex?: ViewStyle['zIndex'];
    /** Custom styles for individual elements of the Modal */
    styles?: {
      /** Visible modal card element */
      modal?: StyleProp<ViewStyle>;
      /** Safe area region wrapping the modal children */
      safeArea?: StyleProp<ViewStyle>;
    };
  };

export type ModalRefBaseProps = Pick<ModalBaseProps, 'onRequestClose'>;

export type ModalProps = ModalBaseProps;

const overlayContentContextValue: OverlayContentContextValue = {
  isModal: true,
};

export const Modal = memo(
  ({
    ref,
    ..._props
  }: ModalProps & {
    ref?: React.Ref<ModalRefBaseProps>;
  }) => {
    const mergedProps = useComponentConfig('Modal', _props);
    const props = mergedProps;
    const {
      children,
      visible,
      onRequestClose,
      onDidClose,
      hideDividers,
      hideCloseButton,
      styles: customStyles,
      // Dialog surface appearance
      background,
      color,
      borderColor,
      borderWidth,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopWidth,
      borderBottomWidth,
      borderStartWidth,
      borderEndWidth,
      bordered,
      borderedTop,
      borderedBottom,
      borderedStart,
      borderedEnd,
      borderedHorizontal,
      borderedVertical,
      elevation = 2,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingStart,
      paddingEnd,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
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
            background={background}
            borderBottomLeftRadius={borderBottomLeftRadius}
            borderBottomRightRadius={borderBottomRightRadius}
            borderBottomWidth={borderBottomWidth}
            borderColor={borderColor}
            borderEndWidth={borderEndWidth}
            borderRadius={borderRadius}
            borderStartWidth={borderStartWidth}
            borderTopLeftRadius={borderTopLeftRadius}
            borderTopRightRadius={borderTopRightRadius}
            borderTopWidth={borderTopWidth}
            borderWidth={borderWidth}
            bordered={bordered}
            borderedBottom={borderedBottom}
            borderedEnd={borderedEnd}
            borderedHorizontal={borderedHorizontal}
            borderedStart={borderedStart}
            borderedTop={borderedTop}
            borderedVertical={borderedVertical}
            color={color}
            elevation={elevation}
            maxHeight={maxHeight}
            maxWidth={maxWidth}
            minHeight={minHeight}
            minWidth={minWidth}
            padding={padding}
            paddingBottom={paddingBottom}
            paddingEnd={paddingEnd}
            paddingStart={paddingStart}
            paddingTop={paddingTop}
            paddingX={paddingX}
            paddingY={paddingY}
            pin="all"
            style={[{ transform: [{ scale }], opacity }, customStyles?.modal]}
          >
            <SafeAreaView style={[styles.safeAreaContainer, customStyles?.safeArea]}>
              <ModalContext.Provider value={modalData}>
                {typeof children === 'function' ? children(renderChildrenProps) : children}
              </ModalContext.Provider>
            </SafeAreaView>
          </VStack>
        </RNModal>
      </OverlayContentContext.Provider>
    );
  },
);

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
