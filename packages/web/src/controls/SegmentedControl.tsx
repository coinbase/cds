import React, { forwardRef, Fragment, memo, useCallback, useId, useState } from 'react';
import type { ChangeEvent, ForwardedRef } from 'react';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import type {
  IconName,
  IconSize,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { Icon } from '../icons/Icon';
import { Interactable } from '../system/Interactable';

const insetFocusRingCss = css`
  position: relative;
  &:focus {
    outline: none;
  }
  &:focus-visible + label {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: -3px;
  }
`;

// This is a bit risky, but more ideal than a fixed px value
const checkmarkSize = 11;

const containerCss = css`
  max-width: var(--width);
  position: relative;

  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 1px;

  border-radius: var(--borderRadius-200);
`;

const labelCss = css`
  height: ${interactableHeight.regular}px;
  padding-inline-start: ${checkmarkSize}px;
  padding-inline-end: ${checkmarkSize}px;

  display: grid;
  position: relative;
`;

const hiddenLabelCss = css`
  && {
    opacity: 0;
    position: relative;
    pointer-events: none;
    user-select: none;
    font-family: var(--fontFamily-headline);
    font-size: var(--fontSize-headline);
    font-weight: var(--fontWeight-headline);
    line-height: var(--lineHeight-headline);
  }
`;

const optionCss = css`
  position: absolute;
  height: 100%;
  width: 100%;
  /* distribute gap half to both sides */
  padding-inline-start: calc(${checkmarkSize}px + 2px);
  padding-inline-end: calc(${checkmarkSize}px - 2px);

  display: flex;
  gap: var(--space-1);
  justify-content: center;
  align-items: center;

  color: var(--color-fgMuted);
  font-family: var(--fontFamily-body);
  font-size: var(--fontSize-body);
  font-weight: var(--fontWeight-body);
  line-height: var(--lineHeight-body);

  /* checkmark */
  > :last-child {
    visibility: hidden;
    margin-inline-end: -${checkmarkSize}px;
  }
`;

const radioCss = css`
  position: absolute;
  left: -9999em;

  &:first-of-type + label {
    border-top-left-radius: var(--borderRadius-200);
    border-bottom-left-radius: var(--borderRadius-200);
  }

  &:last-of-type + label {
    border-top-right-radius: var(--borderRadius-200);
    border-bottom-right-radius: var(--borderRadius-200);
  }

  &:checked + label {
    background-color: var(--color-bgPrimaryWash);

    > .${optionCss} {
      /* distribute checkmark half to both sides */
      padding-inline-start: calc(${checkmarkSize}px - ${checkmarkSize}px / 2);
      padding-inline-end: calc(${checkmarkSize}px + ${checkmarkSize}px / 2);

      color: var(--color-fgPrimary);
      font-family: var(--fontFamily-headline);
      font-size: var(--fontSize-headline);
      font-weight: var(--fontWeight-headline);
      line-height: var(--lineHeight-headline);

      /* checkmark */
      > :last-child {
        visibility: visible;
      }
    }
  }
`;

type LabelProps = Pick<SegmentedControlProps, 'type'> & {
  option: SegmentedControlProps['options'][number]['label'];
  iconSize: IconSize;
  iconActive?: boolean;
  hidden?: boolean;
};

function Label({ type, option, iconSize, iconActive, hidden }: LabelProps) {
  return (
    <span aria-hidden={hidden} className={cx(optionCss, hidden && hiddenLabelCss)}>
      {type === 'icon' ? (
        <Icon active={iconActive} color="currentColor" name={option as IconName} size={iconSize} />
      ) : (
        option
      )}
      <Icon name="checkmark" size="xs" />
    </span>
  );
}

export type SegmentedControlProps = {
  /** The selected value */
  value?: string;
  /** Expand to 100% of parent width */
  block?: boolean;
  /** Callback fired when an option is selected */
  onChange?: (value: string) => void;
  disabled?: boolean;
} & (TextOptionProps | IconOptionProps) &
  SharedProps;

export type TextOptions = readonly TextOption[];
export type IconOptions = readonly IconOption[];

type BaseOption = {
  /** The option value */
  value: string;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

type TextOption = {
  /** The option label to display in the control */
  label: string;
} & BaseOption;

type TextOptionProps = {
  type?: 'text';
  /** The options to render as an array of values and labels */
  options: TextOptions;
};

type IconOption = {
  /** The option icon to display in the control */
  label: IconName;
  /** Whether the icon is active */
  active?: boolean;
} & BaseOption;

type IconOptionProps = {
  type: 'icon';
  iconSize: IconSize;
  /** The options to render as an array of values and IconNames  */
  options: IconOptions;
};

function SegmentedControlInternal(
  props: SegmentedControlProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { type, options, block, disabled, testID, onChange } = props;

  const [selectedValue, setSelectedValue] = useState(props.value);
  const name = useId();
  const styles = { '--width': block ? '100%' : 'max-content' } as React.CSSProperties;
  const size = type === 'icon' ? props.iconSize : 'l';

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange],
  );

  return (
    <div ref={ref} className={containerCss} style={styles}>
      {options.map(({ label, value, accessibilityLabel, ...props }) => {
        const active = (props as any)?.active;
        return (
          <Fragment key={value}>
            <input
              aria-label={accessibilityLabel}
              checked={selectedValue === value}
              className={cx(radioCss, insetFocusRingCss)}
              data-testid={testID ? `${testID}-${value}` : undefined}
              disabled={disabled}
              id={`${name}-${value}`}
              name={name}
              onChange={handleChange}
              type="radio"
              value={value}
            />
            <Interactable
              as="label"
              background="bgAlternate"
              className={labelCss}
              disabled={disabled}
              htmlFor={`${name}-${value}`}
            >
              {/* Hidden label is used to mitigate resizing */}
              <Label hidden iconActive={active} iconSize={size} option={label} type={type} />
              <Label iconActive={active} iconSize={size} option={label} type={type} />
            </Interactable>
          </Fragment>
        );
      })}
    </div>
  );
}

/**
 * @deprecated SegmentedControl is deprecated and will be removed in a future version. Please use Tabs or SegmentedTabs instead.
 */
export const SegmentedControl = memo(forwardRef(SegmentedControlInternal));

SegmentedControl.displayName = 'SegmentedControl';
