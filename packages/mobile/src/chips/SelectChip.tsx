import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import type { GestureResponderEvent, View } from 'react-native';
import { animateCaretInConfig, animateCaretOutConfig } from '@coinbase/cds-common/animation/select';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';

import { useRotateAnimation } from '../animation/useRotateAnimation';
import type { SelectBaseProps } from '../controls/Select';
import { SelectProvider } from '../controls/SelectContext';
import { useSelect } from '../controls/useSelect';
import { useA11y } from '../hooks/useA11y';
import { Icon } from '../icons';
import { Tray } from '../overlays';
import type { DrawerRefBaseProps } from '../overlays/drawer/Drawer';
import type { TrayBaseProps } from '../overlays/tray/Tray';

import type { ChipProps } from './ChipProps';
import { MediaChip } from './MediaChip';

export type SelectChipProps = Pick<
  SelectBaseProps,
  'onChange' | 'valueLabel' | 'placeholder' | 'value'
> &
  Omit<ChipProps, 'children' | 'onBlur'> &
  Omit<TrayBaseProps, 'onCloseComplete' | 'children'> & {
    children: React.ReactNode;
    /** Indicates that the control is being used to manipulate data elsewhere */
    active?: boolean;
  };

export const SelectChip = memo(
  forwardRef(
    (
      {
        children,
        value: defaultValue,
        valueLabel,
        placeholder,
        disabled,
        accessibilityLabel,
        onPress,
        end,
        onChange,
        onBlur,
        testID = 'select-chip',
        // tray props
        preventDismissGestures,
        hideHandleBar,
        disableCapturePanGestureToDismiss,
        verticalDrawerPercentageOfView,
        handleBarAccessibilityLabel,
        active,
        ...props
      }: SelectChipProps,
      ref: React.ForwardedRef<View>,
    ) => {
      const [isSelectTrayOpen, setIsSelectTrayOpen] = useState(false);
      const { animateRotateIn, animateRotateOut, rotateAnimationStyles } = useRotateAnimation(
        animateCaretInConfig,
        animateCaretOutConfig,
        180,
      );
      const { setA11yFocus, announceForA11y } = useA11y();

      const trayRef = useRef<DrawerRefBaseProps>(null);
      const internalRef = useRef(null);
      const refs = useMergeRefs(ref, internalRef);

      const handleCloseTray = useCallback(() => {
        trayRef.current?.handleClose();
        animateRotateOut.start();
      }, [animateRotateOut]);

      const handleBlurTray = useCallback(() => {
        handleCloseTray();
        onBlur?.();
      }, [handleCloseTray, onBlur]);

      const context = useSelect({
        value: defaultValue,
        onChange,
        handleClose: handleCloseTray,
      });
      const { value } = context;

      const handleA11y = useCallback(() => {
        // bring a11y focus back to the trigger
        setA11yFocus(internalRef);
        // announce select value to screen reader
        announceForA11y(`${value} selected`);
      }, [value, announceForA11y, setA11yFocus]);

      useEffect(() => {
        handleA11y();
      }, [handleA11y, value]);

      const handleChipPress = useCallback(
        (event: GestureResponderEvent) => {
          onPress?.(event);
          setIsSelectTrayOpen(true);
          animateRotateIn.start();
        },
        [animateRotateIn, onPress],
      );

      const onCloseComplete = useCallback(() => {
        setIsSelectTrayOpen(false);
        // bring a11y focus back to the trigger
        setA11yFocus(internalRef);
        // announce select value to screen reader
        announceForA11y(`${value} selected`);
      }, [announceForA11y, setA11yFocus, value]);

      return (
        <SelectProvider value={context}>
          <MediaChip
            ref={refs}
            accessibilityLabel={accessibilityLabel ?? value}
            accessibilityRole="menu"
            accessibilityState={{ disabled }}
            disabled={disabled}
            end={
              end ?? (
                <Icon
                  active
                  animated
                  color="fg"
                  name="caretDown"
                  size="xs"
                  style={rotateAnimationStyles}
                />
              )
            }
            inverted={active}
            onPress={handleChipPress}
            testID={testID}
            {...props}
          >
            {valueLabel ?? value ?? placeholder}
          </MediaChip>
          {isSelectTrayOpen && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss={disableCapturePanGestureToDismiss}
              handleBarAccessibilityLabel={handleBarAccessibilityLabel}
              hideHandleBar={hideHandleBar}
              onBlur={handleBlurTray}
              onCloseComplete={onCloseComplete}
              preventDismissGestures={preventDismissGestures}
              testID={`${testID}-tray`}
              verticalDrawerPercentageOfView={verticalDrawerPercentageOfView}
            >
              {children}
            </Tray>
          )}
        </SelectProvider>
      );
    },
  ),
);
