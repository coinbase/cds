import React, { memo, useCallback, useEffect, useRef } from 'react';
import { selectCellSpacingConfig } from '@coinbase/cds-common/tokens/select';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { Cell, type CellBaseProps } from '../cells/Cell';
import { CellAccessory } from '../cells/CellAccessory';
import type { ListCellBaseProps } from '../cells/ListCell';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { VStack } from '../layout/VStack';
import { Pressable, type PressableProps } from '../system/Pressable';
import { Text } from '../typography/Text';

import { useSelectContext } from './selectContext';

export const selectOptionStaticClassName = 'cds-select-option';

const pressableCss = css`
  --bookendRadius: var(--borderRadius-400);
  /* overrides common user agent button defaults */
  padding: 0;
  /* overrides Safari user agent button defaults */
  margin: 0;
  border: none;

  &:first-child {
    border-top-right-radius: var(--bookendRadius);
    border-top-left-radius: var(--bookendRadius);
  }

  &:last-child {
    border-bottom-right-radius: var(--bookendRadius);
    border-bottom-left-radius: var(--bookendRadius);
  }

  /* restrict text from overflow viewport, 95 to leave space for scrollbar */
  max-width: 95vw;

  /* -- START focus ring styles */
  position: relative;
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--borderRadius-100);
      border: 2px solid var(--color-bgLinePrimary);
    }

    &:first-child {
      &::before {
        border-top-right-radius: var(--bookendRadius);
        border-top-left-radius: var(--bookendRadius);
      }
    }

    &:last-child {
      &::before {
        border-bottom-right-radius: var(--bookendRadius);
        border-bottom-left-radius: var(--bookendRadius);
      }
    }
  }
  /* -- END focus ring styles: */
`;

const normalCss = css`
  min-height: 48px;
  max-height: 64px;
`;

const compactCss = css`
  min-height: 40px;
  max-height: 56px;
`;

const multilineCss = css`
  min-height: min-content;
  max-height: max-content;
`;

const multilineTextCss = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

export type SelectOptionBaseProps = Omit<CellBaseProps, 'children' | 'selected'> &
  // href is a valid prop for Cell, but it is not on its BaseProps type
  Pick<PressableProps<'a'>, 'href'> &
  Pick<ListCellBaseProps, 'title' | 'description' | 'multiline' | 'compact'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    onClick?: React.MouseEventHandler;
    /** Prevent menu from closing when an option is selected */
    disableCloseOnOptionChange?: boolean;
    /**
     * Necessary to control roving tabindex for accessibility
     * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
     * */
    tabIndex?: number;
    /** Unique identifier for each option */
    value: string;
  };

export type SelectOptionProps = SelectOptionBaseProps;

export const SelectOption = memo((_props: SelectOptionProps) => {
  const mergedProps = useComponentConfig('SelectOption', _props);
  const {
    title,
    description,
    multiline,
    compact,
    value,
    disableCloseOnOptionChange,
    onClick,
    tabIndex,
    accessibilityLabel,
    testID,
    disabled,
    ...props
  } = mergedProps;
  const selectOptionRef = useRef<HTMLButtonElement | null>(null);
  const { onChange, value: selectedValue, handleCloseMenu } = useSelectContext();
  const selected = selectedValue === value;

  const heightStyles = compact ? compactCss : normalCss;

  useEffect(() => {
    if (selected) {
      selectOptionRef.current?.focus();
    }
  }, [selected]);

  const handleChange = useCallback(() => {
    onChange?.(value);
    // You can disable close on option change from either an individual SelectOption or globally through the Select or Dropdown components
    if (!disableCloseOnOptionChange) {
      handleCloseMenu?.();
    }
  }, [onChange, value, disableCloseOnOptionChange, handleCloseMenu]);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      handleChange();
      onClick?.(event);
    },
    [onClick, handleChange],
  );

  return (
    <Pressable
      ref={selectOptionRef}
      noScaleOnPress
      accessibilityLabel={accessibilityLabel}
      background="bg"
      className={cx(selectOptionStaticClassName, pressableCss)}
      disabled={disabled}
      onClick={handleClick}
      role="menuitem"
      tabIndex={tabIndex ?? -1} // default to -1 since this is a grouped control and the parent control will have tabIndex 0
      testID={testID}
    >
      <Cell
        {...selectCellSpacingConfig}
        accessory={<CellAccessory type="selected" visibility={selected ? 'visible' : 'hidden'} />}
        borderRadius={0}
        className={cx(heightStyles, multiline ? multilineCss : undefined)}
        selected={selected}
        {...props}
      >
        <VStack>
          {!!title && (
            <Text as="div" display="block" font="headline" overflow="truncate">
              {title}
            </Text>
          )}

          {!!description && (
            <Text
              as="div"
              className={multiline ? multilineTextCss : undefined}
              color="fgMuted"
              display="block"
              font="body"
              overflow={multiline ? undefined : 'truncate'}
            >
              {description}
            </Text>
          )}
        </VStack>
      </Cell>
    </Pressable>
  );
});
