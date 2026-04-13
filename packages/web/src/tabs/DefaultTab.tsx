import React, { forwardRef, memo, useCallback } from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { DotCount, type DotCountBaseProps } from '../dots/DotCount';
import { HStack } from '../layout';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { Text } from '../typography/Text';

import type { TabComponentProps } from './Tabs';

/** Optional dot count and a11y overrides for the default tab row. */
export type DefaultTabLabelProps = Partial<Pick<DotCountBaseProps, 'count' | 'max'>> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

const pressableCss = css`
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;

const insetFocusRingCss = css`
  position: relative;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: -3px;
    border-radius: 4px;
  }
`;

const labelPaddingCss = css`
  padding-top: var(--space-2);
  padding-bottom: calc(var(--space-2) - 2px); /* Account for the 2px tab indicator */
`;

export type DefaultTabProps<TabId extends string = string> = Omit<PressableBaseProps, 'onClick'> &
  TabComponentProps<TabId, TabValue<TabId> & DefaultTabLabelProps> & {
    /** Callback that is fired when the tab is pressed, after the active tab updates. */
    onClick?: (id: TabId) => void;
  };

type DefaultTabComponent = <TabId extends string = string>(
  props: DefaultTabProps<TabId> & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => React.ReactElement;

const DefaultTabComponent = memo(
  forwardRef(
    <TabId extends string>(
      {
        id,
        label,
        disabled: disabledProp,
        onClick,
        count,
        max,
        accessibilityLabel,
        className,
        ...props
      }: DefaultTabProps<TabId>,
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const {
        activeTab,
        updateActiveTab,
        disabled: allTabsDisabled,
      } = useTabsContext<TabId, TabValue<TabId> & DefaultTabLabelProps>();
      const isActive = activeTab?.id === id;
      const isDisabled = disabledProp || allTabsDisabled;

      const handlePress = useCallback(() => {
        updateActiveTab(id);
        onClick?.(id);
      }, [id, onClick, updateActiveTab]);

      return (
        <Pressable
          ref={ref}
          data-rendered-tab
          accessibilityLabel={accessibilityLabel}
          aria-controls={`tabpanel--${id}`}
          aria-selected={isActive}
          background="transparent"
          className={cx(pressableCss, insetFocusRingCss, className)}
          disabled={isDisabled}
          id={`tab--${id}`}
          onClick={handlePress}
          {...props}
        >
          <HStack alignItems="center" gap={0.5}>
            <Text
              as="h2"
              className={labelPaddingCss}
              color={isActive ? 'fgPrimary' : 'fg'}
              display="block"
              font="headline"
            >
              {label}
            </Text>
            {!!count && (
              <DotCount
                accessibilityLabel={`${
                  accessibilityLabel ?? (typeof label === 'string' ? label : '')
                } count: ${count}`}
                count={count}
                max={max}
              />
            )}
          </HStack>
        </Pressable>
      );
    },
  ),
);

DefaultTabComponent.displayName = 'DefaultTab';

export const DefaultTab = DefaultTabComponent as DefaultTabComponent;
