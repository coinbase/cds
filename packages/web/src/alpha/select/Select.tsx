import { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { autoUpdate, flip, useFloating, type UseFloatingReturn } from '@floating-ui/react-dom';

import { cx } from '../../cx';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useHasMounted } from '../../hooks/useHasMounted';
import { Box } from '../../layout/Box';
import { Portal } from '../../overlays/Portal';
import { modalContainerId } from '../../overlays/PortalProvider';

import { DefaultSelectAllOption } from './DefaultSelectAllOption';
import { DefaultSelectControl } from './DefaultSelectControl';
import { DefaultSelectDropdown } from './DefaultSelectDropdown';
import { DefaultSelectEmptyDropdownContents } from './DefaultSelectEmptyDropdownContents';
import { DefaultSelectOption } from './DefaultSelectOption';
import { DefaultSelectOptionGroup } from './DefaultSelectOptionGroup';
import { type SelectDropdownProps, type SelectProps, type SelectType } from './types';

// Re-export all types for backward compatibility
export type {
  SelectBaseProps,
  SelectControlComponent,
  SelectControlProps,
  SelectDropdownComponent,
  SelectDropdownProps,
  SelectEmptyDropdownContentComponent,
  SelectEmptyDropdownContentProps,
  SelectOption,
  SelectOptionComponent,
  SelectOptionCustomUI,
  SelectOptionGroup,
  SelectOptionGroupComponent,
  SelectOptionGroupCustomUI,
  SelectOptionGroupProps,
  SelectOptionProps,
  SelectProps,
  SelectType,
} from './types';

// Re-export the type guard function
export { isSelectOptionGroup } from './types';

export const defaultAccessibilityRoles: SelectDropdownProps['accessibilityRoles'] = {
  dropdown: 'listbox',
  option: 'option',
};

export type SelectRef = HTMLElement &
  Pick<SelectProps, 'open' | 'setOpen'> & {
    refs: UseFloatingReturn['refs'];
  };

type SelectComponent = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: SelectProps<Type, SelectOptionValue> & { ref?: React.Ref<SelectRef> },
) => React.ReactElement;

const SelectBase = memo(
  forwardRef(
    <Type extends SelectType = 'single', SelectOptionValue extends string = string>(
      {
        value,
        type = 'single' as Type,
        options,
        onChange,
        open: openProp,
        setOpen: setOpenProp,
        disabled,
        disableClickOutsideClose,
        placeholder,
        helperText,
        compact,
        label,
        labelVariant,
        accessibilityLabel = typeof label === 'string' ? label : 'Select dropdown',
        accessibilityRoles = defaultAccessibilityRoles,
        controlAccessibilityLabel = typeof label === 'string' ? label : 'Select control',
        selectAllLabel,
        emptyOptionsLabel,
        clearAllLabel,
        hideSelectAll,
        defaultOpen,
        startNode,
        endNode,
        variant,
        maxSelectedOptionsToShow,
        hiddenSelectedOptionsLabel,
        removeSelectedOptionAccessibilityLabel,
        accessory,
        media,
        end,
        bordered = true,
        SelectOptionComponent = DefaultSelectOption,
        SelectAllOptionComponent = DefaultSelectAllOption,
        SelectDropdownComponent = DefaultSelectDropdown,
        SelectControlComponent = DefaultSelectControl,
        SelectEmptyDropdownContentsComponent = DefaultSelectEmptyDropdownContents,
        SelectOptionGroupComponent = DefaultSelectOptionGroup,
        style,
        styles,
        className,
        classNames,
        testID,
      }: SelectProps<Type, SelectOptionValue>,
      ref: React.Ref<SelectRef>,
    ) => {
      const hasMounted = useHasMounted();
      const [openInternal, setOpenInternal] = useState(defaultOpen ?? false);
      const open = openProp ?? openInternal;
      const setOpen = setOpenProp ?? setOpenInternal;

      if (
        (typeof openProp === 'undefined' && typeof setOpenProp !== 'undefined') ||
        (typeof openProp !== 'undefined' && typeof setOpenProp === 'undefined')
      )
        throw Error(
          'Select component must be fully controlled or uncontrolled: "open" and "setOpen" props must be provided together or not at all',
        );

      const { refs, floatingStyles } = useFloating({
        open,
        middleware: [flip()],
        placement: 'bottom-start',
        whileElementsMounted: autoUpdate,
      });

      useClickOutside(() => !disableClickOutsideClose && setOpen(false), {
        ref: refs.floating,
        excludeRefs: [refs.reference as React.MutableRefObject<HTMLElement>],
      });

      const rootStyles = useMemo(
        () => ({
          ...style,
          ...styles?.root,
        }),
        [style, styles?.root],
      );

      const controlStyles = useMemo(
        () => ({
          controlStartNode: styles?.controlStartNode,
          controlInputNode: styles?.controlInputNode,
          controlValueNode: styles?.controlValueNode,
          controlLabelNode: styles?.controlLabelNode,
          controlHelperTextNode: styles?.controlHelperTextNode,
          controlEndNode: styles?.controlEndNode,
        }),
        [
          styles?.controlStartNode,
          styles?.controlInputNode,
          styles?.controlValueNode,
          styles?.controlLabelNode,
          styles?.controlHelperTextNode,
          styles?.controlEndNode,
        ],
      );

      const controlClassNames = useMemo(
        () => ({
          controlStartNode: classNames?.controlStartNode,
          controlInputNode: classNames?.controlInputNode,
          controlValueNode: classNames?.controlValueNode,
          controlLabelNode: classNames?.controlLabelNode,
          controlHelperTextNode: classNames?.controlHelperTextNode,
          controlEndNode: classNames?.controlEndNode,
        }),
        [
          classNames?.controlStartNode,
          classNames?.controlInputNode,
          classNames?.controlValueNode,
          classNames?.controlLabelNode,
          classNames?.controlHelperTextNode,
          classNames?.controlEndNode,
        ],
      );

      const dropdownStyles = useMemo(
        () => ({
          root: { ...floatingStyles, ...styles?.dropdown },
          option: styles?.option,
          optionBlendStyles: styles?.optionBlendStyles,
          optionCell: styles?.optionCell,
          optionContent: styles?.optionContent,
          optionLabel: styles?.optionLabel,
          optionDescription: styles?.optionDescription,
          selectAllDivider: styles?.selectAllDivider,
          emptyContentsContainer: styles?.emptyContentsContainer,
          emptyContentsText: styles?.emptyContentsText,
          optionGroup: styles?.optionGroup,
        }),
        [
          floatingStyles,
          styles?.dropdown,
          styles?.option,
          styles?.optionBlendStyles,
          styles?.optionCell,
          styles?.optionContent,
          styles?.optionLabel,
          styles?.optionDescription,
          styles?.selectAllDivider,
          styles?.emptyContentsContainer,
          styles?.emptyContentsText,
          styles?.optionGroup,
        ],
      );

      const dropdownClassNames = useMemo(
        () => ({
          root: classNames?.dropdown,
          option: classNames?.option,
          optionCell: classNames?.optionCell,
          optionContent: classNames?.optionContent,
          optionLabel: classNames?.optionLabel,
          optionDescription: classNames?.optionDescription,
          selectAllDivider: classNames?.selectAllDivider,
          emptyContentsContainer: classNames?.emptyContentsContainer,
          emptyContentsText: classNames?.emptyContentsText,
          optionGroup: classNames?.optionGroup,
        }),
        [
          classNames?.dropdown,
          classNames?.option,
          classNames?.optionCell,
          classNames?.optionContent,
          classNames?.optionLabel,
          classNames?.optionDescription,
          classNames?.selectAllDivider,
          classNames?.emptyContentsContainer,
          classNames?.emptyContentsText,
          classNames?.optionGroup,
        ],
      );

      const containerRef = useRef<HTMLElement>(null);
      useImperativeHandle(ref, () =>
        Object.assign(containerRef.current as HTMLElement, {
          open,
          setOpen,
          refs,
        }),
      );

      return (
        <Box
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className={cx(classNames?.root, className)}
          data-testid={testID}
          style={rootStyles}
        >
          <SelectControlComponent
            ref={refs.setReference}
            accessibilityLabel={controlAccessibilityLabel}
            ariaHaspopup={accessibilityRoles?.dropdown}
            blendStyles={styles?.controlBlendStyles}
            bordered={bordered}
            className={classNames?.control}
            classNames={controlClassNames}
            compact={compact}
            disabled={disabled}
            endNode={endNode}
            helperText={helperText}
            hiddenSelectedOptionsLabel={hiddenSelectedOptionsLabel}
            label={label}
            labelVariant={labelVariant}
            maxSelectedOptionsToShow={maxSelectedOptionsToShow}
            onChange={onChange}
            open={open}
            options={options}
            placeholder={placeholder}
            removeSelectedOptionAccessibilityLabel={removeSelectedOptionAccessibilityLabel}
            setOpen={setOpen}
            startNode={startNode}
            style={styles?.control}
            styles={controlStyles}
            type={type}
            value={value}
            variant={variant}
          />
          <Portal containerId={modalContainerId}>
            <SelectDropdownComponent
              ref={refs.setFloating}
              SelectAllOptionComponent={SelectAllOptionComponent}
              SelectEmptyDropdownContentsComponent={SelectEmptyDropdownContentsComponent}
              SelectOptionComponent={SelectOptionComponent}
              SelectOptionGroupComponent={SelectOptionGroupComponent}
              accessibilityLabel={accessibilityLabel}
              accessibilityRoles={accessibilityRoles}
              accessory={accessory}
              classNames={dropdownClassNames}
              clearAllLabel={clearAllLabel}
              compact={compact}
              controlRef={refs.reference as React.MutableRefObject<HTMLElement>}
              disabled={disabled}
              emptyOptionsLabel={emptyOptionsLabel}
              end={end}
              hideSelectAll={hideSelectAll}
              label={label}
              media={media}
              onChange={onChange}
              open={hasMounted && open}
              options={options}
              selectAllLabel={selectAllLabel}
              setOpen={setOpen}
              styles={dropdownStyles}
              type={type}
              value={value}
            />
          </Portal>
        </Box>
      );
    },
  ),
);

export const Select = SelectBase as SelectComponent;
