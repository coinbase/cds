import { memo } from 'react';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Text, type TextProps } from '../typography/Text';

export const navigationTitleDefaultElement = 'h1';

export type NavigationTitleBaseProps = TextProps<React.ElementType>;

export type NavigationTitleProps = NavigationTitleBaseProps;

export const NavigationTitle = memo((_props: NavigationTitleProps) => {
  const mergedProps = useComponentConfig('NavigationTitle', _props);
  const { as = navigationTitleDefaultElement, font = 'title1', ...props } = mergedProps;
  return <Text as={as} font={font} {...props} />;
});

NavigationTitle.displayName = 'NavigationTitle';
