import { memo } from 'react';

import { Text, type TextProps } from '../typography/Text';

export type NavigationTitleProps = TextProps;

export const NavigationTitle = memo(
  ({ accessibilityRole = 'header', font = 'headline', ...props }: NavigationTitleProps) => {
    return <Text accessibilityRole={accessibilityRole} font={font} {...props} />;
  },
);

NavigationTitle.displayName = 'NavigationTitle';
