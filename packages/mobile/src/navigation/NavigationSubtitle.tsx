import { Text, type TextProps } from '../typography/Text';

export type NavigationSubtitleProps = TextProps;

export const NavigationSubtitle = ({
  accessibilityRole = 'header',
  color = 'fgMuted',
  font = 'label2',
  ...props
}: NavigationSubtitleProps) => {
  return <Text accessibilityRole={accessibilityRole} color={color} font={font} {...props} />;
};

NavigationSubtitle.displayName = 'NavigationSubtitle';
