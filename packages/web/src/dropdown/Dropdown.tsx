import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import useMeasure from 'react-use-measure';

import { SelectProvider } from '../controls/selectContext';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { FocusTrap } from '../overlays/FocusTrap';
import { ModalWrapper } from '../overlays/modal/ModalWrapper';
import { Popover } from '../overlays/popover/Popover';
import { type PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';

import { DropdownContent } from './DropdownContent';
import type { DropdownInternalProps, DropdownProps, DropdownRef } from './DropdownProps';
import { useResponsiveHeight } from './useResponsiveHeight';

export const DROPDOWN_MAX_HEIGHT = 300;
const NOOP = () => {};

const ModalDropdown = memo(
  forwardRef<DropdownRef, DropdownInternalProps>(
    (
      {
        children,
        onOpenMenu = NOOP,
        onCloseMenu = NOOP,
        content,
        disablePortal,
        value,
        disableCloseOnOptionChange,
        visible,
        onChange,
        width,
        disabled,
        controlledElementAccessibilityProps,
        respectNegativeTabIndex,
        restoreFocusOnUnmount,
        ...props
      },
      ref,
    ) => {
      const context = useMemo(
        () => ({
          onChange,
          value,
          handleCloseMenu: !disableCloseOnOptionChange ? onCloseMenu : undefined,
        }),
        [onChange, value, disableCloseOnOptionChange, onCloseMenu],
      );

      useImperativeHandle(
        ref,
        () => ({
          openMenu: onOpenMenu,
          closeMenu: onCloseMenu,
        }),
        [onOpenMenu, onCloseMenu],
      );

      return (
        <SelectProvider value={context}>
          <ModalWrapper
            dangerouslyDisableResponsiveness
            disablePortal={disablePortal}
            onOverlayPress={onCloseMenu}
            testID="dropdown-modal"
            visible={visible}
            {...controlledElementAccessibilityProps}
          >
            <FocusTrap
              disableAutoFocus={!!value}
              onEscPress={onCloseMenu}
              respectNegativeTabIndex={respectNegativeTabIndex}
              restoreFocusOnUnmount={restoreFocusOnUnmount}
            >
              <DropdownContent {...props}>{content}</DropdownContent>
            </FocusTrap>
          </ModalWrapper>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div onClick={disabled ? undefined : onOpenMenu} onKeyDown={onOpenMenu} style={{ width }}>
            {children}
          </div>
        </SelectProvider>
      );
    },
  ),
);

const defaultPopoverContentPositionConfig: PopoverContentPositionConfig = {
  gap: 0.5,
  placement: 'bottom-start',
};

// remove the modal implementation detail from the shared props - this prop should ideally be removed in the future or made generic
type PopoverDropdownProps = Omit<DropdownInternalProps, 'enableMobileModal'>;
const PopoverDropdown = memo(
  forwardRef<DropdownRef, PopoverDropdownProps>(
    (
      {
        content,
        showOverlay,
        children,
        visible,
        onCloseMenu = NOOP,
        onOpenMenu = NOOP,
        width,
        minWidth,
        maxWidth,
        value,
        disableCloseOnOptionChange,
        testID,
        maxHeight,
        onChange,
        disablePortal,
        onBlur,
        contentPosition = defaultPopoverContentPositionConfig,
        block,
        disabled,
        restoreFocusOnUnmount,
        ...props
      },
      ref,
    ) => {
      const [dropdownRef, dropdownBounds] = useMeasure();
      const [subjectRef, subjectBounds] = useMeasure();

      // if consumer only customizes some of the contentPosition values, we want to merge them with the defaults
      const combinedContentPosition = useMemo(
        () => ({ ...defaultPopoverContentPositionConfig, ...contentPosition }),
        [contentPosition],
      );

      const { dropdownHeight } = useResponsiveHeight({
        gap: combinedContentPosition.gap,
        dropdownBounds,
        maxHeight,
        visible,
        placement: combinedContentPosition.placement,
      });

      const context = useMemo(
        () => ({
          onChange,
          value,
          handleCloseMenu: !disableCloseOnOptionChange ? onCloseMenu : undefined,
        }),
        [onChange, value, disableCloseOnOptionChange, onCloseMenu],
      );

      const memoizedContent = useMemo(() => {
        return (
          <DropdownContent
            ref={dropdownRef}
            maxHeight={dropdownHeight}
            maxWidth={maxWidth}
            minWidth={minWidth}
            placement={combinedContentPosition.placement}
            width={block ? subjectBounds.width : width}
          >
            {content}
          </DropdownContent>
        );
      }, [
        dropdownRef,
        dropdownHeight,
        maxWidth,
        minWidth,
        combinedContentPosition.placement,
        block,
        subjectBounds.width,
        width,
        content,
      ]);

      useImperativeHandle(
        ref,
        () => ({
          openMenu: onOpenMenu,
          closeMenu: onCloseMenu,
        }),
        [onOpenMenu, onCloseMenu],
      );

      return (
        <SelectProvider value={context}>
          <Popover
            // DropdownContent will handle exit animation on menu blur, including pressing the subject again to close
            block={block}
            content={disabled ? undefined : memoizedContent}
            contentPosition={combinedContentPosition}
            disableAutoFocus={!!value}
            disablePortal={disablePortal}
            disabled={disabled}
            onBlur={onBlur}
            onClose={onCloseMenu}
            onPressSubject={!visible ? onOpenMenu : undefined}
            restoreFocusOnUnmount={restoreFocusOnUnmount}
            showOverlay={showOverlay}
            testID={testID}
            visible={disabled ? false : visible}
            {...props}
          >
            <div ref={subjectRef} style={{ width: '100%' }}>
              {children}
            </div>
          </Popover>
        </SelectProvider>
      );
    },
  ),
);

export const Dropdown = memo(
  forwardRef<DropdownRef, DropdownProps>(
    (
      {
        children,
        maxHeight = DROPDOWN_MAX_HEIGHT,
        enableMobileModal,
        onOpenMenu,
        onCloseMenu,
        restoreFocusOnUnmount = true,
        ...props
      },
      ref,
    ) => {
      const { isPhone } = useBreakpoints();
      const [visible, setVisible] = useState(false);

      const handleOpenMenu = useCallback(() => {
        setVisible(true);
        onOpenMenu?.();
      }, [onOpenMenu]);

      const handleCloseMenu = useCallback(() => {
        setVisible(false);
        onCloseMenu?.();
      }, [onCloseMenu]);

      return isPhone && enableMobileModal ? (
        <ModalDropdown
          ref={ref}
          maxHeight={maxHeight}
          onCloseMenu={handleCloseMenu}
          onOpenMenu={handleOpenMenu}
          restoreFocusOnUnmount={restoreFocusOnUnmount}
          visible={visible}
          {...props}
        >
          {children}
        </ModalDropdown>
      ) : (
        <PopoverDropdown
          ref={ref}
          maxHeight={maxHeight}
          onCloseMenu={handleCloseMenu}
          onOpenMenu={handleOpenMenu}
          restoreFocusOnUnmount={restoreFocusOnUnmount}
          visible={visible}
          {...props}
        >
          {children}
        </PopoverDropdown>
      );
    },
  ),
);
