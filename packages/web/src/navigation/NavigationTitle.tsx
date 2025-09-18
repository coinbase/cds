import { memo } from 'react';

import { Text, type TextProps } from '../typography/Text';

export const navigationTitleDefaultElement = 'h1';

export type NavigationTitleProps = TextProps<React.ElementType>;

export const NavigationTitle = memo(
  ({ as = navigationTitleDefaultElement, font = 'title1', ...props }: NavigationTitleProps) => {
    return <Text as={as} font={font} {...props} />;
  },
);

NavigationTitle.displayName = 'NavigationTitle';
