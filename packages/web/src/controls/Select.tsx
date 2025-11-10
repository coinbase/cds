import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { useInputVariant } from '@coinbase/cds-common/hooks/useInputVariant';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import { helperTextHeight, inputStackGap } from '@coinbase/cds-common/tokens/input';
import type {
  SharedAccessibilityProps,
  SharedInputProps,
  SharedProps,
} from '@coinbase/cds-common/types';

import { Dropdown } from '../dropdown/Dropdown';
import type { DropdownProps } from '../dropdown/DropdownProps';
import { useTheme } from '../hooks/useTheme';
import { HStack } from '../layout/HStack';
import { type PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';

import { TextInputFocusVariantContext } from './context';
import type { InputStackBaseProps } from './InputStack';
import { SelectTrigger } from './SelectTrigger';
import { useRefocusTrigger } from './useRefocusTrigger';

export type SelectBaseProps = SharedProps &
  Omit<SharedInputProps, 'label'> &
  Pick<InputStackBaseProps, 'disabled' | 'focused' | 'startNode' | 'variant' | 'labelVariant'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Pick<DropdownProps, 'disablePortal' | 'width'> & {
    children?: React.ReactNode;
    /** Event handler for when the Select Input trigger is pressed */
    onClick?: () => void;
    /** Pass a value that will prepopulate the select input. This will replace the placeholder text. */
    value?: string;
    /** Optional label for selected value when using a value/label object model */
    valueLabel?: string;
    /** Optional string placed above the input (or within if compact is enabled) to indicate purpose of the input */
    label?: string;
    /** Callback that is fired whenever a select option is selected */
    onChange?: ((newValue: string) => void) | React.Dispatch<React.SetStateAction<string>>;
  };

export type SelectProps = SelectBaseProps;

/**
 * @deprecated Please use the new Select alpha component instead.
 */
export const Select = memo(
  forwardRef<HTMLButtonElement, SelectProps>(function Select(
    {
      children,
      value,
      valueLabel,
      variant = 'foregroundMuted',
      disabled = false,
      width = '100%',
      onClick,
      helperText,
      onChange,
      disablePortal,
      ...props
    },
    ref,
  ) {
    const [visible, setVisible] = useState(false);
    const [menuHasClosed, setMenuHasClosed] = useState(false);
    const focusedVariant = useInputVariant(visible, variant);
    /** prevents animation from firing on mount */
    const [animationsEnabled, setAnimationsEnabled] = useState(false);
    const theme = useTheme();

    /** If the spacer height in InputStack between the helper text and the input changes, this value will need to change */
    const calculateInputStackGap = theme.space[inputStackGap];
    const menuOffset = calculateInputStackGap + helperTextHeight;
    const triggerRef = useRefocusTrigger(menuHasClosed);

    const handleOnSelectClick = useCallback(() => {
      onClick?.();
      setAnimationsEnabled(true);
    }, [onClick]);

    const onOpenMenu = useCallback(() => {
      setVisible(true);
      // this makes sure if you open/close the menu more than once it'll work as expected
      if (menuHasClosed) {
        setMenuHasClosed(false);
      }
    }, [menuHasClosed]);

    const onCloseMenu = useCallback(() => {
      setVisible(false);
      setMenuHasClosed(true);
    }, []);

    const refs = useMergeRefs(ref, triggerRef);

    const trigger = useMemo(
      () => (
        <TextInputFocusVariantContext.Provider value={focusedVariant}>
          <SelectTrigger
            ref={refs}
            disabled={disabled}
            helperText={helperText}
            onClick={handleOnSelectClick}
            triggerHasFocus={visible}
            value={valueLabel ?? value}
            variant={variant}
            visible={animationsEnabled && visible}
            {...props}
          />
        </TextInputFocusVariantContext.Provider>
      ),
      [
        focusedVariant,
        disabled,
        valueLabel,
        value,
        variant,
        visible,
        handleOnSelectClick,
        refs,
        helperText,
        animationsEnabled,
        props,
      ],
    );

    const contentPosition: PopoverContentPositionConfig = useMemo(
      () => ({
        gap: 0.5,
        offsetGap: helperText ? menuOffset : undefined,
      }),
      [helperText, menuOffset],
    );

    return (
      <HStack width={width}>
        {disabled ? (
          trigger
        ) : (
          <Dropdown
            block
            content={children}
            contentPosition={contentPosition}
            disablePortal={disablePortal}
            maxWidth="95vw"
            onChange={onChange}
            onCloseMenu={onCloseMenu}
            onOpenMenu={onOpenMenu}
            value={value}
            width={width}
          >
            {trigger}
          </Dropdown>
        )}
      </HStack>
    );
  }),
);
