import React, { forwardRef, memo, useCallback, useState } from 'react';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';

import type { SelectBaseProps } from '../controls/Select';
import { useRefocusTrigger } from '../controls/useRefocusTrigger';
import type { DropdownProps } from '../dropdown';
import { Dropdown } from '../dropdown';
import { AnimatedCaret } from '../motion/AnimatedCaret';

import type { ChipProps } from './ChipProps';
import { MediaChip } from './MediaChip';

export const SELECT_CHIP_DEFAULT_TEST_ID = 'select-chip';

export type SelectChipProps = {
  /** Indicates that the control is being used to manipulate data elsewhere */
  active?: boolean;
  /**
   * @deprecated The prop will be removed in a future version.
   */
  children?: React.ReactNode;
} & Omit<ChipProps, 'inverted' | 'children' | 'onBlur' | 'noScaleOnPress' | 'content'> &
  Pick<SelectBaseProps, 'onChange' | 'valueLabel' | 'placeholder' | 'value'> &
  Omit<DropdownProps, 'onChange' | 'children'>;

export const SelectChip = memo(
  forwardRef(function SelectChip(
    {
      active,
      value,
      valueLabel,
      placeholder,
      content,
      onChange,
      onCloseMenu,
      onOpenMenu,
      end,
      testID = SELECT_CHIP_DEFAULT_TEST_ID,
      // dropdown props
      block,
      contentPosition,
      disableCloseOnOptionChange,
      disablePortal,
      disabled,
      enableMobileModal,
      maxHeight,
      maxWidth,
      minWidth,
      onBlur,
      showOverlay,
      width,
      respectNegativeTabIndex,
      ...props
    }: SelectChipProps,
    ref,
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const [menuHasClosed, setMenuHasClosed] = useState(false);
    const triggerRef = useRefocusTrigger(menuHasClosed);
    const mergedRefs = useMergeRefs(ref, triggerRef);

    const handleOpenMenu = useCallback(() => {
      setIsOpen(true);
      setMenuHasClosed(false);
    }, []);

    const handleCloseMenu = useCallback(() => {
      setIsOpen(false);
      setMenuHasClosed(true);
      onCloseMenu?.();
    }, [onCloseMenu]);

    return (
      <Dropdown
        block={block}
        content={content}
        contentPosition={contentPosition}
        disableCloseOnOptionChange={disableCloseOnOptionChange}
        disablePortal={disablePortal}
        disabled={disabled}
        enableMobileModal={enableMobileModal}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        minWidth={minWidth}
        onBlur={onBlur}
        onChange={onChange}
        onCloseMenu={handleCloseMenu}
        onOpenMenu={onOpenMenu}
        respectNegativeTabIndex={respectNegativeTabIndex}
        showOverlay={showOverlay}
        testID={`${testID}-dropdown`}
        value={value}
        width={width}
      >
        <MediaChip
          ref={mergedRefs}
          noScaleOnPress
          disabled={disabled}
          end={end ?? <AnimatedCaret active color="fg" rotate={isOpen ? 0 : 180} size="xs" />}
          inverted={active}
          onClick={handleOpenMenu}
          testID={testID}
          {...props}
        >
          {valueLabel ?? value ?? placeholder}
        </MediaChip>
      </Dropdown>
    );
  }),
);
