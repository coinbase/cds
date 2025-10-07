import { memo, useCallback, useMemo } from 'react';
import { selectCellSpacingConfig } from '@coinbase/cds-common/tokens/select';
import { css } from '@linaria/core';

import { Cell } from '../../cells/Cell';
import { cx } from '../../cx';
import { VStack } from '../../layout/VStack';
import { Pressable } from '../../system/Pressable';
import { Text } from '../../typography/Text';

import type { SelectOptionComponent } from './Select';

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

export const DefaultSelectOption: SelectOptionComponent<'single' | 'multi'> = memo(
  ({
    value,
    label,
    onClick,
    disabled,
    selected,
    compact,
    description,
    multiline,
    className,
    accessory,
    media,
    detail,
    type,
    accessibilityRole = 'option',
    background = type === 'single' && selected && value !== null ? 'bgAlternate' : 'bg',
    ...props
  }) => {
    const labelNode = useMemo(
      () =>
        typeof label === 'string' ? (
          <Text as="div" display="block" font="headline" overflow="truncate">
            {label}
          </Text>
        ) : (
          label
        ),
      [label],
    );

    const descriptionNode = useMemo(
      () =>
        typeof description === 'string' ? (
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
        ) : (
          description
        ),
      [description, multiline],
    );

    const handleClick = useCallback(() => onClick?.(value), [onClick, value]);

    return (
      <Pressable
        // TO DO: Do we need this Pressable? Cell can render as a Pressable when passed onClick...
        noScaleOnPress
        // On web, the option role doesn't work well with ara-checked and screen readers
        // so we use aria-selected regardless of the option type
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
          // TO DO: Double check this
          background={type === 'multi' || disabled || value === null ? 'transparent' : undefined}
          borderRadius={0}
          className={multiline ? multilineTextCss : undefined}
          detail={detail}
          detailWidth="fit-content"
          innerSpacing={selectCellSpacingConfig.innerSpacing}
          maxHeight={compact ? 56 : 64}
          media={media}
          minHeight={compact ? 40 : 56}
          outerSpacing={selectCellSpacingConfig.outerSpacing}
          priority="end"
          selected={selected}
        >
          <VStack>
            {labelNode}
            {descriptionNode}
          </VStack>
        </Cell>
      </Pressable>
    );
  },
);
