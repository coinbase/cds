import React, { memo, useMemo } from 'react';
import { TextInput } from 'react-native';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { useTextAlign } from '../hooks/useTextAlign';
import { useTheme } from '../hooks/useTheme';
import type { TextBaseProps } from '../typography/Text';

export type NativeInputProps = {
  /**
   * Text Align Input
   * @default start
   * */
  align?: TextBaseProps['align'];
  /** Custom container spacing if needed. This will add to the existing spacing */
  containerSpacing?: ViewStyle | undefined;
  /**
   * Decreases the padding within the input element
   * @default false
   * @deprecated Use style object instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  compact?: boolean;
  /**
   * Disables input
   * @default false
   * */
  disabled?: boolean;
  /**
   * Native TextInput textAlign with the extra unset option to remove the textAlign style.
   * Use this to workaround the issue where long text does not ellipsis in TextInput
   * @warning Setting this to unset will break alignment for RTL languages.
   */
  textAlign?: TextInputProps['textAlign'] | 'unset';
  /**
   * Typography font token used for typed input text.
   * @default body
   */
  font?: ThemeVars.Font;
  /**
   * Color of the selection (including caret).
   * @default fgPrimary
   */
  selectionColor?: ThemeVars.Color;
} & SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Omit<TextInputProps, 'textAlign' | 'selectionColor'>;

export const NativeInput = memo(
  ({
    ref,
    containerSpacing,
    testID = '',
    align = 'start',
    disabled,
    textAlign,
    font = 'body',
    accessibilityLabel,
    compact,
    selectionColor = 'fgPrimary',
    style,
    ...editableInputAddonProps
  }: NativeInputProps & {
    ref?: React.Ref<TextInput>;
  }) => {
    const theme = useTheme();
    const textAlignInputTransformed = useTextAlign(align).textAlign;

    const inputTextStyle: TextStyle = useMemo(
      () => ({
        fontSize: theme.fontSize[font],
        fontFamily: theme.fontFamily[font],
        minHeight: theme.lineHeight[font],
        fontWeight: theme.fontWeight[font],
        padding: 0,
        margin: 0,
        color: theme.color.fg,
        // When the field is floored to a taller target height (TextInput passes a size-derived
        // minHeight), keep the single-line text centered in the extra space. Multiline inputs must
        // grow and top-align, so this is skipped for them.
        ...(editableInputAddonProps.multiline ? null : { textAlignVertical: 'center' as const }),
      }),
      [
        theme.fontSize,
        theme.fontFamily,
        theme.lineHeight,
        theme.fontWeight,
        theme.color.fg,
        font,
        editableInputAddonProps.multiline,
      ],
    );

    const containerStyle: ViewStyle = useMemo(() => {
      // NativeInput has no `size` prop, so the deprecated `compact` still drives its own base
      // padding here. When rendered inside TextInput, `containerSpacing` (size-derived) is
      // spread after and overrides this fallback.
      return {
        flex: 2,
        minWidth: 0,
        padding: theme.space[compact ? 1 : 2],
        ...containerSpacing,
        ...(!disabled &&
          editableInputAddonProps.readOnly && {
            backgroundColor: theme.color.bgSecondary,
          }),
      };
    }, [
      containerSpacing,
      theme.space,
      theme.color,
      compact,
      editableInputAddonProps.readOnly,
      disabled,
    ]);

    const inputRootStyles = useMemo(() => {
      return [
        inputTextStyle,
        containerStyle,
        /**
         * To workaround a known RN bug (link below) where long text does not ellipsis correctly in TextInput
         * @link https://github.com/facebook/react-native/issues/29068
         */
        { textAlign: textAlign === 'unset' ? undefined : textAlignInputTransformed },
        style,
      ];
    }, [inputTextStyle, containerStyle, textAlign, textAlignInputTransformed, style]);

    return (
      <TextInput
        ref={ref}
        accessibilityHint={accessibilityLabel}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="search"
        editable={!disabled}
        keyboardAppearance={theme.activeColorScheme}
        placeholderTextColor={theme.color.fgMuted}
        selectionColor={theme.color[selectionColor]}
        style={inputRootStyles}
        testID={testID}
        textAlign={textAlign !== 'unset' ? textAlign : undefined}
        {...editableInputAddonProps}
      />
    );
  },
);
