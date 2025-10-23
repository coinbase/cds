import { forwardRef, memo, useCallback, useMemo } from 'react';
import { selectCellSpacingConfig } from '@coinbase/cds-common/tokens/select';
import { css } from '@linaria/core';

import { Cell } from '../../cells/Cell';
import { cx } from '../../cx';
import { VStack } from '../../layout/VStack';
import { Pressable } from '../../system/Pressable';
import { Text } from '../../typography/Text';

import type { SelectOptionProps, SelectType } from './Select';

const selectOptionCss = css`
  --bookendRadius: var(--borderRadius-400);
  position: relative;
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

  /* -- START focus ring styles */
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--bookendRadius);
      border: 2px solid var(--color-bgLinePrimary);
    }

    &:first-child::after {
      border-top-right-radius: var(--bookendRadius);
      border-top-left-radius: var(--bookendRadius);
    }

    &:last-child::after {
      border-bottom-right-radius: var(--bookendRadius);
      border-bottom-left-radius: var(--bookendRadius);
    }
  }
  /* -- END focus ring styles: */
`;

const multilineTextCss = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

type DefaultSelectOptionBase = <Type extends SelectType, SelectOptionValue extends string = string>(
  props: SelectOptionProps<Type, SelectOptionValue> & { ref?: React.Ref<HTMLButtonElement> },
) => React.ReactElement;

const DefaultSelectOptionComponent = memo(
  forwardRef(
    <Type extends SelectType, SelectOptionValue extends string = string>(
      {
        value,
        label,
        onClick,
        disabled,
        selected,
        compact,
        description,
        multiline,
        styles,
        className,
        classNames,
        accessory,
        media,
        end,
        type,
        accessibilityRole = 'option',
        background = type === 'single' && selected && value !== null ? 'bgAlternate' : 'bg',
        ...props
      }: SelectOptionProps<Type, SelectOptionValue>,
      ref: React.Ref<HTMLButtonElement>,
    ) => {
      const labelNode = useMemo(
        () =>
          typeof label === 'string' ? (
            <Text
              as="div"
              className={classNames?.optionLabel}
              font="headline"
              overflow="truncate"
              style={styles?.optionLabel}
            >
              {label}
            </Text>
          ) : (
            label
          ),
        [label, classNames?.optionLabel, styles?.optionLabel],
      );

      const descriptionNode = useMemo(
        () =>
          typeof description === 'string' ? (
            <Text
              as="div"
              className={cx(
                multiline ? multilineTextCss : undefined,
                classNames?.optionDescription,
              )}
              color="fgMuted"
              font="body"
              overflow={multiline ? undefined : 'truncate'}
              style={styles?.optionDescription}
            >
              {description}
            </Text>
          ) : (
            description
          ),
        [description, multiline, classNames?.optionDescription, styles?.optionDescription],
      );

      const handleClick = useCallback(() => onClick?.(value), [onClick, value]);

      // Since Cell's ref prop is type HTMLDivElement, we need to wrap it in a Pressable to get ref forwarding.
      // On web, the option role doesn't work well with ara-checked and screen readers
      // so we use aria-selected regardless of the option type.
      return (
        <Pressable
          ref={ref}
          noScaleOnPress
          aria-selected={selected}
          background={background}
          className={cx(selectOptionCss, className)}
          disabled={disabled}
          onClick={handleClick}
          role={accessibilityRole}
          {...props}
        >
          <Cell
            accessory={accessory}
            background={type === 'multi' || disabled || value === null ? 'transparent' : undefined}
            borderRadius={0}
            className={cx(multiline ? multilineTextCss : undefined, classNames?.optionCell)}
            end={end}
            innerSpacing={selectCellSpacingConfig.innerSpacing}
            maxHeight={compact ? 56 : 64}
            media={media}
            minHeight={compact ? 40 : 56}
            outerSpacing={selectCellSpacingConfig.outerSpacing}
            priority="end"
            selected={selected}
            style={styles?.optionCell}
            // This is a workaround to ensure the end element is displayed correctly
            styles={{ end: { width: 'fit-content' } }}
          >
            <VStack
              className={classNames?.optionContent}
              justifyContent="center"
              style={styles?.optionContent}
            >
              {labelNode}
              {descriptionNode}
            </VStack>
          </Cell>
        </Pressable>
      );
    },
  ),
);

export const DefaultSelectOption = DefaultSelectOptionComponent as DefaultSelectOptionBase;
