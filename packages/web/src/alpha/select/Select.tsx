import { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common';
import { flip, useFloating, type UseFloatingReturn } from '@floating-ui/react-dom';

import type { CellBaseProps } from '../../cells/Cell';
import type { InputStackBaseProps } from '../../controls/InputStack';
import { cx } from '../../cx';
import type { AriaHasPopupType } from '../../hooks/useA11yControlledVisibility';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useHasMounted } from '../../hooks/useHasMounted';
import { Box, type BoxDefaultElement, type BoxProps } from '../../layout/Box';
import { Portal } from '../../overlays/Portal';
import { modalContainerId } from '../../overlays/PortalProvider';
import type { InteractableBlendStyles } from '../../system/Interactable';
import type { PressableDefaultElement, PressableProps } from '../../system/Pressable';

import { DefaultSelectAllOption } from './DefaultSelectAllOption';
import { DefaultSelectControl } from './DefaultSelectControl';
import { DefaultSelectDropdown } from './DefaultSelectDropdown';
import { DefaultSelectEmptyDropdownContents } from './DefaultSelectEmptyDropdownContents';
import { DefaultSelectOption } from './DefaultSelectOption';

export const defaultAccessibilityRoles: SelectDropdownProps['accessibilityRoles'] = {
  dropdown: 'listbox',
  option: 'option',
};

export type SelectType = 'single' | 'multi';

/**
 * Configuration for a single option in the Select component
 */
export type SelectOption<SelectOptionValue extends string = string> = {
  /** The value associated with this option */
  value: SelectOptionValue | null;
  /** The label displayed for the option */
  label?: React.ReactNode;
  /** Additional description text shown below the label */
  description?: React.ReactNode;
  /** Whether this option is disabled and cannot be selected */
  disabled?: boolean;
};

/**
 * Props for individual option components within the Select dropdown
 */
export type SelectOptionProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectOption<SelectOptionValue> &
  Pick<CellBaseProps, 'accessory' | 'media' | 'end'> &
  Omit<PressableProps<PressableDefaultElement>, 'value' | 'type' | 'onClick'> & {
    /** Click handler for the option */
    onClick?: (value: SelectOptionValue | null) => void;
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Whether this option is currently selected */
    selected?: boolean;
    /** Whether the option is in an indeterminate state (for multi-select) */
    indeterminate?: boolean;
    /** Whether to allow multiline text in the option */
    multiline?: boolean;
    /** ARIA role for the option element */
    accessibilityRole?: string;
    /** Whether to use compact styling for the option */
    compact?: boolean;
    /** Inline styles for the option */
    style?: React.CSSProperties;
    /** Custom styles for different parts of the option */
    styles?: {
      /** Styles for the option cell element */
      optionCell?: React.CSSProperties;
      /** Styles for the option content wrapper */
      optionContent?: React.CSSProperties;
      /** Styles for the option label element */
      optionLabel?: React.CSSProperties;
      /** Styles for the option description element */
      optionDescription?: React.CSSProperties;
      /** Styles for the select all divider element */
      selectAllDivider?: React.CSSProperties;
    };
    /** CSS class name for the option */
    className?: string;
    /** Custom class names for different parts of the option */
    classNames?: {
      /** Class name for the option cell element */
      optionCell?: string;
      /** Class name for the option content wrapper */
      optionContent?: string;
      /** Class name for the option label element */
      optionLabel?: string;
      /** Class name for the option description element */
      optionDescription?: string;
      /** Class name for the select all divider element */
      selectAllDivider?: string;
    };
  };

/**
 * Custom UI to render for an option in the Select component options array
 */
export type SelectOptionCustomUI<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Pick<SelectOptionProps<Type>, 'accessory' | 'media' | 'end'> & {
  /** Custom component to render the option */
  Component?: SelectOptionComponent<Type, SelectOptionValue>;
};

export type SelectOptionComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<
  SelectOptionProps<Type, SelectOptionValue> & {
    ref?: React.Ref<HTMLButtonElement>;
  }
>;

export type SelectEmptyDropdownContentProps = {
  label: string;
  /** Custom styles for different parts of the empty dropdown content */
  styles?: {
    /** Styles for the container element */
    emptyContentsContainer?: React.CSSProperties;
    /** Styles for the text element */
    emptyContentsText?: React.CSSProperties;
  };
  /** Custom class names for different parts of the empty dropdown content */
  classNames?: {
    /** Class name for the container element */
    emptyContentsContainer?: string;
    /** Class name for the text element */
    emptyContentsText?: string;
  };
};

export type SelectEmptyDropdownContentComponent = React.FC<SelectEmptyDropdownContentProps>;

type SelectState<Type extends SelectType = 'single', SelectOptionValue extends string = string> = {
  value: Type extends 'multi' ? SelectOptionValue[] : SelectOptionValue | null;
  onChange: (
    value: Type extends 'multi'
      ? SelectOptionValue | SelectOptionValue[] | null
      : SelectOptionValue | null,
  ) => void;
};

/**
 * Props for the select control component (the clickable input that opens the dropdown)
 */
export type SelectControlProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Omit<BoxProps<BoxDefaultElement>, 'borderWidth' | 'onChange'> &
  Pick<
    InputStackBaseProps,
    'disabled' | 'startNode' | 'variant' | 'labelVariant' | 'testID' | 'endNode'
  > &
  SelectState<Type, SelectOptionValue> & {
    /** Array of options to display in the select dropdown */
    options: (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)[];
    /** Label displayed above the control */
    label?: React.ReactNode;
    /** Placeholder text displayed when no option is selected */
    placeholder?: React.ReactNode;
    /** Helper text displayed below the select */
    helperText?: React.ReactNode;
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Whether the dropdown is currently open */
    open: boolean;
    /** Function to update the dropdown open state */
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
    /** Maximum number of selected options to show before truncating */
    maxSelectedOptionsToShow?: number;
    /** Label to show for showcasing count of hidden selected options */
    hiddenSelectedOptionsLabel?: string;
    /** Accessibility label for each chip in a multi-select */
    removeSelectedOptionAccessibilityLabel?: string;
    /** Blend styles for control interactivity */
    blendStyles?: InteractableBlendStyles;
    /** ARIA haspopup attribute value */
    ariaHaspopup?: AriaHasPopupType;
    /** Whether to use compact styling for the control */
    compact?: boolean;
    /** Inline styles for the control */
    style?: React.CSSProperties;
    /** Custom styles for different parts of the control */
    styles?: {
      /** Styles for the start node element */
      controlStartNode?: React.CSSProperties;
      /** Styles for the input node element */
      controlInputNode?: React.CSSProperties;
      /** Styles for the value node element */
      controlValueNode?: React.CSSProperties;
      /** Styles for the label node element */
      controlLabelNode?: React.CSSProperties;
      /** Styles for the helper text node element */
      controlHelperTextNode?: React.CSSProperties;
      /** Styles for the end node element */
      controlEndNode?: React.CSSProperties;
    };
    /** CSS class name for the control */
    className?: string;
    /** Custom class names for different parts of the control */
    classNames?: {
      /** Class name for the start node element */
      controlStartNode?: string;
      /** Class name for the input node element */
      controlInputNode?: string;
      /** Class name for the value node element */
      controlValueNode?: string;
      /** Class name for the label node element */
      controlLabelNode?: string;
      /** Class name for the helper text node element */
      controlHelperTextNode?: string;
      /** Class name for the end node element */
      controlEndNode?: string;
    };
  };

export type SelectControlComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<
  SelectControlProps<Type, SelectOptionValue> & {
    ref?: React.Ref<HTMLElement>;
  }
>;

/**
 * Props for the dropdown component that contains the list of options
 */
export type SelectDropdownProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectState<Type, SelectOptionValue> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Omit<BoxProps<BoxDefaultElement>, 'onChange'> &
  Pick<SelectOptionProps<Type>, 'accessory' | 'media' | 'end'> & {
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Array of options with their configuration and optional custom components */
    options: (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)[];
    /** Whether the dropdown is currently open */
    open: boolean;
    /** Function to update the dropdown open state */
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
    /** Label displayed above the dropdown */
    label?: React.ReactNode;
    /** Whether the dropdown is disabled */
    disabled?: boolean;
    /** Label for the "Select All" option in multi-select mode */
    selectAllLabel?: string;
    /** Label displayed when there are no options available */
    emptyOptionsLabel?: string;
    /** Label for the "Clear All" option in multi-select mode */
    clearAllLabel?: string;
    /** Whether to hide the "Select All" option in multi-select mode */
    hideSelectAll?: boolean;
    /** Reference to the control element for positioning */
    controlRef: React.MutableRefObject<HTMLElement | null>;
    /** Inline styles for the dropdown */
    style?: React.CSSProperties;
    /** Custom styles for dropdown elements */
    styles?: {
      /** Styles for the dropdown root container */
      root?: React.CSSProperties;
      /** Styles for individual options */
      option?: React.CSSProperties;
      /** Blend styles for option interactivity */
      optionBlendStyles?: InteractableBlendStyles;
      /** Styles for the option cell element */
      optionCell?: React.CSSProperties;
      /** Styles for the option content wrapper */
      optionContent?: React.CSSProperties;
      /** Styles for the option label element */
      optionLabel?: React.CSSProperties;
      /** Styles for the option description element */
      optionDescription?: React.CSSProperties;
      /** Styles for the select all divider element */
      selectAllDivider?: React.CSSProperties;
      /** Styles for the empty contents container element */
      emptyContentsContainer?: React.CSSProperties;
      /** Styles for the empty contents text element */
      emptyContentsText?: React.CSSProperties;
    };
    /** CSS class name for the dropdown */
    className?: string;
    /** Custom class names for dropdown elements */
    classNames?: {
      /** Class name for the dropdown root container */
      root?: string;
      /** Class name for individual options */
      option?: string;
      /** Class name for the option cell element */
      optionCell?: string;
      /** Class name for the option content wrapper */
      optionContent?: string;
      /** Class name for the option label element */
      optionLabel?: string;
      /** Class name for the option description element */
      optionDescription?: string;
      /** Class name for the select all divider element */
      selectAllDivider?: string;
      /** Class name for the empty contents container element */
      emptyContentsContainer?: string;
      /** Class name for the empty contents text element */
      emptyContentsText?: string;
    };
    /** Whether to use compact styling for the dropdown */
    compact?: boolean;
    /** Custom component to render individual options */
    SelectOptionComponent?: SelectOptionComponent<Type, SelectOptionValue>;
    /** Custom component to render the "Select All" option */
    SelectAllOptionComponent?: SelectOptionComponent<Type, SelectOptionValue>;
    /** Custom component to render when no options are available */
    SelectEmptyDropdownContentsComponent?: SelectEmptyDropdownContentComponent;
    /** Accessibility roles for dropdown and option elements */
    accessibilityRoles?: {
      /** ARIA role for the dropdown element */
      dropdown?: AriaHasPopupType;
      /** ARIA role for option elements */
      option?: string;
    };
  };

export type SelectDropdownComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<
  SelectDropdownProps<Type, SelectOptionValue> & {
    ref?: React.Ref<HTMLElement>;
  }
>;

export type SelectBaseProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  SelectState<Type, SelectOptionValue> &
  Pick<
    SelectControlProps<Type, SelectOptionValue>,
    | 'label'
    | 'placeholder'
    | 'helperText'
    | 'hiddenSelectedOptionsLabel'
    | 'removeSelectedOptionAccessibilityLabel'
    | 'startNode'
    | 'variant'
    | 'disabled'
    | 'labelVariant'
    | 'endNode'
  > &
  Pick<SelectOptionProps<Type>, 'accessory' | 'media' | 'end'> &
  Pick<
    SelectDropdownProps<Type>,
    | 'selectAllLabel'
    | 'emptyOptionsLabel'
    | 'clearAllLabel'
    | 'hideSelectAll'
    | 'accessibilityRoles'
  > & {
    /** Whether the select allows single or multiple selections */
    type?: Type;
    /** Array of options to display in the select dropdown */
    options: (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)[];
    /** Controlled open state of the dropdown */
    open?: boolean;
    /** Callback to update the open state */
    setOpen?: (open: boolean | ((open: boolean) => boolean)) => void;
    /** Whether clicking outside the dropdown should close it */
    disableClickOutsideClose?: boolean;
    /** Whether to use compact styling for the select */
    compact?: boolean;
    /** Initial open state when component mounts (uncontrolled mode) */
    defaultOpen?: boolean;
    /** Maximum number of selected options to show before truncating */
    maxSelectedOptionsToShow?: number;
    /** Custom component to render the dropdown container */
    SelectDropdownComponent?: SelectDropdownComponent<Type, SelectOptionValue>;
    /** Custom component to render the select control */
    SelectControlComponent?: SelectControlComponent<Type, SelectOptionValue>;
    /** Custom component to render individual options */
    SelectOptionComponent?: SelectOptionComponent<Type, SelectOptionValue>;
    /** Custom component to render the "Select All" option */
    SelectAllOptionComponent?: SelectOptionComponent<Type, SelectOptionValue>;
    /** Custom component to render when no options are available */
    SelectEmptyDropdownContentsComponent?: SelectEmptyDropdownContentComponent;
    /** Accessibility label for the control */
    controlAccessibilityLabel?: string;
    /** Inline styles for the root element */
    style?: React.CSSProperties;
    /** CSS class name for the root element */
    className?: string;
    /** Test ID for the root element */
    testID?: string;
  };

/**
 * Props for the Select component
 */
export type SelectProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectBaseProps<Type, SelectOptionValue> & {
  /** Custom styles for different parts of the select */
  styles?: {
    /** Styles for the root container */
    root?: React.CSSProperties;
    /** Styles for the control element */
    control?: React.CSSProperties;
    /** Styles for the start node element */
    controlStartNode?: React.CSSProperties;
    /** Styles for the input node element */
    controlInputNode?: React.CSSProperties;
    /** Styles for the value node element */
    controlValueNode?: React.CSSProperties;
    /** Styles for the label node element */
    controlLabelNode?: React.CSSProperties;
    /** Styles for the helper text node element */
    controlHelperTextNode?: React.CSSProperties;
    /** Styles for the end node element */
    controlEndNode?: React.CSSProperties;
    /** Blend styles for control interactivity */
    controlBlendStyles?: InteractableBlendStyles;
    /** Styles for the dropdown container */
    dropdown?: React.CSSProperties;
    /** Styles for individual options */
    option?: React.CSSProperties;
    /** Styles for the option cell element */
    optionCell?: React.CSSProperties;
    /** Styles for the option content wrapper */
    optionContent?: React.CSSProperties;
    /** Styles for the option label element */
    optionLabel?: React.CSSProperties;
    /** Styles for the option description element */
    optionDescription?: React.CSSProperties;
    /** Blend styles for option interactivity */
    optionBlendStyles?: InteractableBlendStyles;
    /** Styles for the select all divider element */
    selectAllDivider?: React.CSSProperties;
    /** Styles for the empty contents container element */
    emptyContentsContainer?: React.CSSProperties;
    /** Styles for the empty contents text element */
    emptyContentsText?: React.CSSProperties;
  };
  /** Custom class names for different parts of the select */
  classNames?: {
    /** Class name for the root container */
    root?: string;
    /** Class name for the control element */
    control?: string;
    /** Class name for the start node element */
    controlStartNode?: string;
    /** Class name for the input node element */
    controlInputNode?: string;
    /** Class name for the value node element */
    controlValueNode?: string;
    /** Class name for the label node element */
    controlLabelNode?: string;
    /** Class name for the helper text node element */
    controlHelperTextNode?: string;
    /** Class name for the end node element */
    controlEndNode?: string;
    /** Class name for the dropdown container */
    dropdown?: string;
    /** Class name for individual options */
    option?: string;
    /** Class name for the option cell element */
    optionCell?: string;
    /** Class name for the option content wrapper */
    optionContent?: string;
    /** Class name for the option label element */
    optionLabel?: string;
    /** Class name for the option description element */
    optionDescription?: string;
    /** Class name for the select all divider element */
    selectAllDivider?: string;
    /** Class name for the empty contents container element */
    emptyContentsContainer?: string;
    /** Class name for the empty contents text element */
    emptyContentsText?: string;
  };
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
        accessibilityLabel = 'Select control',
        accessibilityRoles = defaultAccessibilityRoles,
        controlAccessibilityLabel,
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
        SelectOptionComponent = DefaultSelectOption,
        SelectAllOptionComponent = DefaultSelectAllOption,
        SelectDropdownComponent = DefaultSelectDropdown,
        SelectControlComponent = DefaultSelectControl,
        SelectEmptyDropdownContentsComponent = DefaultSelectEmptyDropdownContents as SelectEmptyDropdownContentComponent,
        style,
        styles,
        className,
        classNames,
        testID,
        ...props
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
