import React, { forwardRef, memo, useMemo } from 'react';
import { TextInput, View } from 'react-native';
import type { TextInputProps, ViewStyle } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';

import { useTextAlign } from '../hooks/useTextAlign';
import { useTheme } from '../hooks/useTheme';
import type { TextBaseProps } from '../typography/Text';

import type { TextInputBaseProps } from './TextInput';

export type NativeInputProps = {
  /**
   * Text Align Input
   * @default start
   * */
  align?: TextBaseProps['align'];
  /** Custom container spacing if needed. This will add to the existing spacing */
  containerSpacing?: ViewStyle | undefined;
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
} & SharedProps &
  Pick<TextInputBaseProps, 'compact'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Omit<TextInputProps, 'textAlign'>;

export const NativeInput = memo(
  forwardRef(
    (
      {
        containerSpacing,
        testID = '',
        align = 'start',
        disabled,
        textAlign,
        accessibilityLabel,
        compact,
        style,
        ...editableInputAddonProps
      }: NativeInputProps,
      ref: React.ForwardedRef<TextInput>,
    ) => {
      const theme = useTheme();
      const textAlignInputTransformed = useTextAlign(align).textAlign;

      // Text styling only - lineHeight provides vertical rhythm
      // Note: iOS doesn't support textAlignVertical, so we don't set explicit height
      // The text will be naturally centered within its lineHeight
      const inputTextStyle = useMemo(
        () => ({
          fontSize: theme.fontSize.body,
          fontFamily: theme.fontFamily.body,
          lineHeight: theme.lineHeight.body,
          padding: 0,
          margin: 0,
          color: theme.color.fg,
          flexGrow: 1,
          textAlignVertical: 'center' as const, // Android only
          /**
           * To workaround a known RN bug (link below) where long text does not ellipsis correctly in TextInput
           * @link https://github.com/facebook/react-native/issues/29068
           */
          textAlign: textAlign === 'unset' ? undefined : textAlignInputTransformed,
        }),
        [
          theme.fontSize.body,
          theme.fontFamily.body,
          theme.lineHeight.body,
          theme.color.fg,
          textAlign,
          textAlignInputTransformed,
        ],
      );

      // Container styling - handles padding, flex, background
      const containerStyle = useMemo(() => {
        const baseStyle: ViewStyle = {
          flex: 2,
          justifyContent: 'center',
          padding: theme.space[compact ? 1 : 2],
          ...containerSpacing,
          ...(!disabled &&
            editableInputAddonProps.readOnly && {
              backgroundColor: theme.color.bgSecondary,
            }),
        };
        // Merge with custom style if provided
        return style ? [baseStyle, style] : baseStyle;
      }, [
        containerSpacing,
        theme.space,
        theme.color,
        compact,
        editableInputAddonProps.readOnly,
        disabled,
        style,
      ]);

      return (
        <View style={containerStyle}>
          <TextInput
            ref={ref}
            accessibilityHint={accessibilityLabel}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="search"
            editable={!disabled}
            keyboardAppearance={theme.activeColorScheme}
            placeholderTextColor={theme.color.fgMuted}
            style={inputTextStyle}
            testID={testID}
            textAlign={textAlign !== 'unset' ? textAlign : undefined}
            {...editableInputAddonProps}
          />
        </View>
      );
    },
  ),
);
