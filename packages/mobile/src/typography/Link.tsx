import React, { memo, useCallback } from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useWebBrowserOpener } from '../hooks/useWebBrowserOpener';

import { Text, type TextBaseProps, type TextProps } from './Text';

export type LinkBaseProps = SharedProps &
  TextBaseProps & {
    /** URL that this link goes to when pressed. */
    to?: string;
    /** Use monospace font family. */
    mono?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false (unless nested inside a paragraph tag)
     */
    underline?: boolean;
    /** Callback to fire when pressed */
    onPress?: (event: GestureResponderEvent) => void;
    /**
     * Toggles whether the link should be opened outside or within app
     * @default false
     * */
    forceOpenOutsideApp?: boolean;
    /**
     * Toggles whether we allow users to go back to app
     * when they are in an external browser
     * @default false
     */
    preventRedirectionIntoApp?: boolean;
    /**
     * Toggles readerMode flag for web browser.
     * Note: readerMode is only available on ios
     * @default false
     */
    readerMode?: boolean;
  };

export type LinkProps = LinkBaseProps & TextProps;

export const Link = memo((_props: LinkProps) => {
  const mergedProps = useComponentConfig('Link', _props);
  const {
    children,
    to,
    color = 'fgPrimary',
    font = 'inherit',
    onPress,
    forceOpenOutsideApp = false,
    preventRedirectionIntoApp = false,
    readerMode = false,
    underline,
    accessibilityLabel,
    testID,
    ...props
  } = mergedProps;
  const openUrl = useWebBrowserOpener();

  const openUrlOnPress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      if (to === undefined) return;
      void openUrl(to, {
        forceOpenOutsideApp,
        preventRedirectionIntoApp,
        readerMode,
      });
    },
    [openUrl, to, onPress, forceOpenOutsideApp, preventRedirectionIntoApp, readerMode],
  );

  return (
    <Text
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="link"
      color={color}
      font={font}
      onPress={openUrlOnPress}
      testID={testID}
      underline={underline}
      {...props}
    >
      {children}
    </Text>
  );
});

Link.displayName = 'Link';
