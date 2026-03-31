import { memo } from 'react';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Text, type TextBaseProps, type TextProps } from '../typography/Text';

export type NavigationTitleBaseProps = TextBaseProps;

export type NavigationTitleProps = NavigationTitleBaseProps & TextProps;

export const NavigationTitle = memo((_props: NavigationTitleProps) => {
  const mergedProps = useComponentConfig('NavigationTitle', _props);
  const { accessibilityRole = 'header', font = 'headline', ...props } = mergedProps;
  return <Text accessibilityRole={accessibilityRole} font={font} {...props} />;
});

NavigationTitle.displayName = 'NavigationTitle';
