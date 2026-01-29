import { type CSSProperties, forwardRef, memo, useId, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { Box, HStack, VStack } from '../layout';
import type { ResponsiveProp } from '../styles/styleProps';
import { Pressable, type PressableProps } from '../system';
import { Text } from '../typography/Text';

import type { ControlBaseProps } from './Control';
import { Radio } from './Radio';
import { useSelectionCellControlHeight } from './useSelectionCellControlHeight';

export type RadioCellBaseProps<RadioValue extends string> = Omit<
  PressableProps<'label'>,
  'title' | 'onChange'
> &
  Omit<
    ControlBaseProps<RadioValue>,
    'onChange' | 'title' | 'children' | 'iconStyle' | 'labelStyle' | 'checked'
  > & {
    checked?: boolean;
    title: React.ReactNode;
    onChange?: (inputChangeEvent: React.ChangeEvent<HTMLInputElement>) => void;
    description?: React.ReactNode;
    columnGap?: ResponsiveProp<ThemeVars.Space>;
    rowGap?: ResponsiveProp<ThemeVars.Space>;
    /** Custom ID for the title element. If not provided, a unique ID will be generated. */
    titleId?: string;
    /** Custom ID for the description element. If not provided, a unique ID will be generated. */
    descriptionId?: string;
  };

export type RadioCellProps<RadioValue extends string> = RadioCellBaseProps<RadioValue> & {
  classNames?: {
    root?: string;
    radioContainer?: string;
    title?: string;
    description?: string;
    contentContainer?: string;
  };
  styles?: {
    root?: CSSProperties;
    radioContainer?: CSSProperties;
    title?: CSSProperties;
    description?: CSSProperties;
    contentContainer?: CSSProperties;
  };
};

const baseCss = css`
  &:focus-within {
    border-color: var(--border-color-focused);
    box-shadow: 0 0 0 var(--border-width-focused) var(--border-color-focused);
  }
`;

const RadioCellWithRef = forwardRef(function RadioCell<RadioValue extends string>(
  {
    title,
    description,
    checked,
    onChange,
    disabled,
    columnGap = 2,
    rowGap = 0,
    padding = 2,
    borderWidth = 100,
    borderRadius = 200,
    titleId: customTitleId,
    descriptionId: customDescriptionId,
    testID,
    style,
    value,
    noScaleOnPress = true,
    readOnly,
    className,
    classNames,
    styles,
    ...props
  }: RadioCellProps<RadioValue>,
  ref: React.ForwardedRef<HTMLLabelElement>,
) {
  const generatedTitleId = useId();
  const generatedDescriptionId = useId();

  const titleId = customTitleId ?? generatedTitleId;
  const descriptionId = customDescriptionId ?? generatedDescriptionId;

  const pressableStyle = useMemo(() => {
    return {
      '--border-color-unfocused': 'transparent',
      '--border-color-focused': 'var(--color-bgPrimary)',
      '--border-width-focused': `var(--borderWidth-${borderWidth})`,
      ...style,
      ...styles?.root,
    };
  }, [borderWidth, style, styles?.root]);

  const ariaLabelledBy = titleId;
  const ariaDescribedBy = description ? descriptionId : undefined;

  const radioContainerHeight = useSelectionCellControlHeight();

  return (
    <Pressable
      ref={ref}
      as="label"
      background="bg"
      borderColor="bgLine"
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      className={cx(baseCss, className, classNames?.root)}
      disabled={disabled || readOnly}
      gap={columnGap}
      noScaleOnPress={noScaleOnPress}
      padding={padding}
      style={pressableStyle}
      tabIndex={-1}
      testID={testID}
      {...props}
    >
      <HStack
        alignItems="center"
        className={classNames?.radioContainer}
        height={radioContainerHeight}
        style={styles?.radioContainer}
      >
        <Radio
          aria-describedby={ariaDescribedBy}
          aria-labelledby={ariaLabelledBy}
          checked={!!checked}
          disabled={disabled}
          onChange={onChange}
          readOnly={readOnly}
          value={value}
        />
      </HStack>
      <VStack
        className={classNames?.contentContainer}
        gap={rowGap}
        style={styles?.contentContainer}
      >
        {typeof title === 'string' ? (
          <Text className={classNames?.title} font="headline" id={titleId} style={styles?.title}>
            {title}
          </Text>
        ) : (
          <Box className={classNames?.title} id={titleId} style={styles?.title}>
            {title}
          </Box>
        )}
        {description &&
          (typeof description === 'string' ? (
            <Text
              className={classNames?.description}
              color="fgMuted"
              font="body"
              id={descriptionId}
              style={styles?.description}
            >
              {description}
            </Text>
          ) : (
            <Box className={classNames?.description} id={descriptionId} style={styles?.description}>
              {description}
            </Box>
          ))}
      </VStack>
    </Pressable>
  );
}) as <RadioValue extends string>(
  props: RadioCellProps<RadioValue> & { ref?: React.Ref<HTMLLabelElement> },
) => React.ReactElement;

export const RadioCell = memo(RadioCellWithRef) as typeof RadioCellWithRef &
  React.MemoExoticComponent<typeof RadioCellWithRef>;

RadioCell.displayName = 'RadioCell';
