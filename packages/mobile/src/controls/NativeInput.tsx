import React, { memo, useMemo } from 'react';
import { TextInput } from 'react-native';
import type { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { useTextAlign } from '../hooks/useTextAlign';
import { useTheme } from '../hooks/useTheme';
import type { TextBaseProps } from '../typography/Text';

export type NativeInputProps = SharedProps &
  Omit<TextInputProps, 'textAlign' | 'selectionColor'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /**
     * Text Align Input
     * @default start
     * */
    align?: TextBaseProps['align'];
    /**
     * Custom container spacing if needed. This will add to the existing spacing.
     * @deprecated Use style object instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v10
     */
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
  };

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
        fontWeight: theme.fontWeight[font],
        margin: 0,
        color: theme.color.fg,
        flexGrow: 2,
        flexShrink: 1,
        minWidth: 0,
        // Do not set `height`, `minHeight`, or `lineHeight` on RN TextInput:
        // - `lineHeight` > fontSize shifts glyphs down and clips descenders
        // - explicit heights fight RN's native text layout
        // TextInput owns the theme line-box via a wrapper View minHeight instead.
        // Prefer padding: 0 — vertical field padding is also on that wrapper.
        // Legacy `compact` still applies space-1 for direct NativeInput callers.
        padding: compact ? theme.space[1] : 0,
        // Android: center the value within the input's bounds.
        textAlignVertical: 'center',
        ...(!disabled &&
          editableInputAddonProps.readOnly && {
            backgroundColor: theme.color.bgSecondary,
          }),
      }),
      [
        theme.fontSize,
        theme.fontFamily,
        compact,
        theme.fontWeight,
        theme.color.fg,
        theme.color.bgSecondary,
        theme.space,
        font,
        disabled,
        editableInputAddonProps.readOnly,
      ],
    );

    const inputRootStyles = useMemo(() => {
      return [
        inputTextStyle,
        /**
         * To workaround a known RN bug (link below) where long text does not ellipsis correctly in TextInput
         * @link https://github.com/facebook/react-native/issues/29068
         */
        { textAlign: textAlign === 'unset' ? undefined : textAlignInputTransformed },
        containerSpacing,
        style,
      ];
    }, [inputTextStyle, textAlign, textAlignInputTransformed, containerSpacing, style]);

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
