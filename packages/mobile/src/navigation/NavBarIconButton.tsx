import { memo, useContext, useEffect } from 'react';
import type { IconName, IconSize, SharedProps } from '@cbhq/cds-common/types';

import type { ButtonBaseProps } from '../buttons/Button';
import { Icon } from '../icons';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

import { BrowserBarContext } from './BrowserBar';
import { TopNavBarContext } from './TopNavBar';

/**
 * Hook to check if NavBarButton is being used within the correct navigation context
 */
const useNavigationContext = () => {
  const { isWithinBrowserBar } = useContext(BrowserBarContext);
  const { isWithinTopNavBar } = useContext(TopNavBarContext);

  useEffect(() => {
    if (!isWithinBrowserBar && !isWithinTopNavBar) {
      console.warn(
        'NavBarButton should be used within BrowserBar or TopNavBar components for optimal functionality and consistent styling.',
      );
    }
  }, [isWithinBrowserBar, isWithinTopNavBar]);
};

export type NavBarButtonProps = SharedProps &
  Omit<PressableBaseProps, 'children'> &
  Pick<ButtonBaseProps, 'disabled'> & {
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    size?: IconSize;
    /** Whether the icon is active */
    active?: boolean;
  };

/**
 * This component is used to render an icon button in the navigation bar.
 * It has the same pressable size as a compact IconButton but with a medium-sized icon.
 */
export const NavBarIconButton = memo(
  ({
    name,
    color = 'fg',
    height = 40,
    width = 40,
    size = 'm',
    borderWidth = 0,
    borderRadius = 1000,
    active,
    ...props
  }: NavBarButtonProps) => {
    useNavigationContext();

    return (
      <Pressable
        alignItems="center"
        background="transparent"
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        height={height}
        justifyContent="center"
        width={width}
        {...props}
      >
        <Icon active={active} color={color} name={name} size={size} />
      </Pressable>
    );
  },
);

NavBarIconButton.displayName = 'NavBarIconButton';
