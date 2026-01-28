import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { NativeInput } from '../../controls/NativeInput';
import { HStack } from '../../layout';
import { NAVIGATION_KEYS } from '../../overlays/FocusTrap';
import { Text } from '../../typography';
import type { SelectType } from '../select';
import { DefaultSelectControl } from '../select/DefaultSelectControl';

import type { ComboboxControlComponent, ComboboxControlProps } from './Combobox';

const hasSelectedValue = (currentValue: unknown): boolean =>
  currentValue !== null &&
  typeof currentValue !== 'undefined' &&
  !(Array.isArray(currentValue) && currentValue.length === 0);

export const DefaultComboboxControl = memo(
  <Type extends SelectType = 'single', SelectOptionValue extends string = string>({
    SelectControlComponent = DefaultSelectControl,
    value,
    placeholder,
    controlRef,
    hideSearchInput,
    options,
    open,
    setOpen,
    compact,
    searchText,
    onSearch,
    accessibilityLabel,
    ...props
  }: ComboboxControlProps<Type, SelectOptionValue>) => {
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const hasValue = hasSelectedValue(value);
    const shouldShowSearchInput = !hideSearchInput && (!hasValue || open);

    useEffect(() => {
      if (shouldShowSearchInput && open) {
        searchInputRef.current?.focus();
      }
    }, [shouldShowSearchInput, open]);

    const handleSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
      },
      [onSearch],
    );

    const handleSearchClick = useCallback(
      (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setOpen(true);
      },
      [setOpen],
    );

    const computedAccessibilityLabel = useMemo(() => {
      let label = accessibilityLabel;
      if (!hasValue && typeof placeholder === 'string') {
        label = `${label}, ${placeholder}`;
      }
      return label;
    }, [hasValue, accessibilityLabel, placeholder]);

    return (
      <SelectControlComponent
        ref={controlRef.current?.refs.setReference}
        accessibilityLabel={computedAccessibilityLabel}
        compact={compact}
        open={open}
        options={options}
        setOpen={setOpen}
        value={value}
        {...props}
        contentNode={
          shouldShowSearchInput ? (
            <HStack flexGrow={1} flexWrap="wrap" width="100%">
              <NativeInput
                ref={searchInputRef}
                onChange={handleSearchChange}
                onClick={handleSearchClick}
                onKeyDown={(event) => {
                  if (!NAVIGATION_KEYS.includes(event.key)) {
                    event.stopPropagation();
                  }
                  if (
                    event.key === 'Enter' ||
                    (!NAVIGATION_KEYS.includes(event.key) && !event.shiftKey)
                  ) {
                    setOpen(true);
                  }
                }}
                placeholder={typeof placeholder === 'string' ? placeholder : undefined}
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  height: hasValue ? 24 : compact ? 40 : 48,
                  minWidth: 0,
                  flexGrow: 1,
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                tabIndex={0}
                value={searchText}
              />
            </HStack>
          ) : (
            <>
              {hasValue ? null : (
                <Text
                  as="p"
                  color="fgMuted"
                  display="block"
                  font="body"
                  overflow="truncate"
                  paddingY={0}
                >
                  {placeholder}
                </Text>
              )}
            </>
          )
        }
        styles={{
          ...props.styles,
          controlEndNode: {
            ...props.styles?.controlEndNode,
            alignItems: hasValue && shouldShowSearchInput ? 'flex-end' : 'center',
          },
          controlValueNode: {
            ...props.styles?.controlValueNode,
            paddingTop: hasValue ? (compact ? 'var(--space-1)' : 'var(--space-1_5)') : 0,
            paddingBottom: hasValue ? (compact ? 'var(--space-1)' : 'var(--space-1_5)') : 0,
          },
        }}
        tabIndex={shouldShowSearchInput ? -1 : 0}
      />
    );
  },
) as ComboboxControlComponent;
