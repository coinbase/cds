import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  type StyleProp,
  type View,
  type ViewStyle,
} from 'react-native';
import type { SharedAccessibilityProps } from '@coinbase/cds-common';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { accessibleOpacityDisabled } from '@coinbase/cds-common/tokens/interactable';

import { DotCount, type DotCountBaseProps } from '../dots/DotCount';
import { useTheme } from '../hooks/useTheme';
import { HStack } from '../layout';
import { Text } from '../typography/Text';

import type { TabComponentProps } from './Tabs';

/** Optional dot count and a11y overrides for the default tab row. */
export type DefaultTabLabelProps = Partial<Pick<DotCountBaseProps, 'count' | 'max'>> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

export type DefaultTabProps<TabId extends string = string> = Omit<
  PressableProps,
  'children' | 'onPress' | 'style'
> &
  TabComponentProps<TabId, TabValue<TabId> & DefaultTabLabelProps> & {
    /** Callback that is fired when the tab is pressed, after the active tab updates. */
    onPress?: (id: TabId, event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
  };

type DefaultTabComponent = <TabId extends string = string>(
  props: DefaultTabProps<TabId> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const DefaultTabComponent = memo(
  forwardRef(
    <TabId extends string>(
      {
        id,
        label,
        disabled: disabledProp,
        onPress,
        count,
        max,
        accessibilityLabel,
        style,
        testID,
        ...props
      }: DefaultTabProps<TabId>,
      ref: React.ForwardedRef<View>,
    ) => {
      const theme = useTheme();
      const {
        activeTab,
        updateActiveTab,
        disabled: allTabsDisabled,
      } = useTabsContext<TabId, TabValue<TabId> & DefaultTabLabelProps>();
      const isActive = activeTab?.id === id;
      const isDisabled = disabledProp || allTabsDisabled;

      const handlePress = useCallback(
        (event: GestureResponderEvent) => {
          updateActiveTab(id);
          onPress?.(id, event);
        },
        [id, onPress, updateActiveTab],
      );

      const labelPaddingStyle = useMemo(
        () => ({
          paddingTop: theme.space[2],
          paddingBottom: theme.space[2] - 2,
        }),
        [theme.space],
      );

      return (
        <Pressable
          ref={ref}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="tab"
          accessibilityState={{ disabled: isDisabled, selected: isActive }}
          disabled={isDisabled}
          onPress={handlePress}
          style={[
            disabledProp && !allTabsDisabled ? { opacity: accessibleOpacityDisabled } : undefined,
            style,
          ]}
          testID={testID}
          {...props}
        >
          <HStack alignItems="center" gap={0.5}>
            <Text color={isActive ? 'fgPrimary' : 'fg'} font="headline" style={labelPaddingStyle}>
              {label}
            </Text>
            {!!count && <DotCount count={count} max={max} />}
          </HStack>
        </Pressable>
      );
    },
  ),
);

DefaultTabComponent.displayName = 'DefaultTab';

export const DefaultTab = DefaultTabComponent as DefaultTabComponent;
