import React, { type JSX, useCallback, useEffect, useMemo } from 'react';
import type { IconName } from '@coinbase/cds-common/types';
import { cx } from '@coinbase/cds-web';
import { Collapsible } from '@coinbase/cds-web/collapsible';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { Pressable } from '@coinbase/cds-web/system/Pressable';
import { Text } from '@coinbase/cds-web/typography/Text';
import Link from '@docusaurus/Link';
import {
  findFirstSidebarItemLink,
  isActiveSidebarItem,
  useDocSidebarItemsExpandedState,
} from '@docusaurus/plugin-content-docs/client';
import {
  ThemeClassNames,
  useCollapsible,
  usePrevious,
  useThemeConfig,
} from '@docusaurus/theme-common';
import { isSamePath } from '@docusaurus/theme-common/internal';
import useIsBrowser from '@docusaurus/useIsBrowser';
import type { Props } from '@theme/DocSidebarItem/Category';
import DocSidebarItems from '@theme/DocSidebarItems';
// If we navigate to a category and it becomes active, it should automatically
// expand itself
function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  updateCollapsed,
}: {
  isActive: boolean;
  collapsed: boolean;
  updateCollapsed: (b: boolean) => void;
}) {
  const wasActive = usePrevious(isActive);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      updateCollapsed(false);
    }
  }, [isActive, wasActive, collapsed, updateCollapsed]);
}

/**
 * When a collapsible category has no link, we still link it to its first child
 * during SSR as a temporary fallback. This allows to be able to navigate inside
 * the category even when JS fails to load, is delayed or simply disabled
 * React hydration becomes an optional progressive enhancement
 * see https://github.com/facebookincubator/infima/issues/36#issuecomment-772543188
 * see https://github.com/facebook/docusaurus/issues/3030
 */
function useCategoryHrefWithSSRFallback(item: Props['item']): string | undefined {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    // In these cases, it's not necessary to render a fallback
    // We skip the "findFirstCategoryLink" computation
    if (isBrowser || !item.collapsible) {
      return undefined;
    }
    return findFirstSidebarItemLink(item);
  }, [item, isBrowser]);
}

export default function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  index,
  tabIndex,
  ...props
}: Props): JSX.Element {
  const { items, label, collapsible, className, href, customProps } = item;
  const {
    docs: {
      sidebar: { autoCollapseCategories },
    },
  } = useThemeConfig();
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);

  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);

  const { collapsed, setCollapsed } = useCollapsible({
    // Active categories are always initialized as expanded. The default
    // (`item.collapsed`) is only used for non-active categories.
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : item.collapsed;
    },
  });

  const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState();
  // Use this instead of `setCollapsed`, because it is also reactive
  const updateCollapsed = useCallback(
    (toCollapsed = !collapsed) => {
      setExpandedItem(toCollapsed ? null : index);
      setCollapsed(toCollapsed);
    },
    [collapsed, index, setExpandedItem, setCollapsed],
  );
  useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed });
  useEffect(() => {
    if (collapsible && expandedItem != null && expandedItem !== index && autoCollapseCategories) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);

  const controlsId = `sidebar-item-${label}-${index}`;

  return (
    <li
      className={cx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        collapsed && 'menu__list-item--collapsed',
        className,
      )}
    >
      {level === 1 ? (
        <Pressable
          aria-controls={controlsId}
          aria-expanded={collapsible && !href ? !collapsed : undefined}
          background="bgSecondary"
          borderRadius={600}
          borderWidth={0}
          onClick={
            collapsible
              ? (e) => {
                  onItemClick?.(item);
                  if (href) {
                    updateCollapsed(false);
                  } else {
                    e.preventDefault();
                    updateCollapsed();
                  }
                }
              : () => {
                  onItemClick?.(item);
                }
          }
          width="100%"
        >
          <HStack
            alignContent="center"
            alignItems="center"
            gap={1}
            justifyContent="space-between"
            paddingX={2}
            paddingY={1}
            width="100%"
          >
            <HStack alignContent="center" alignItems="center" gap={1}>
              {typeof customProps?.icon === 'string' && (
                <Icon color="fg" name={customProps.icon as IconName} size="s" />
              )}
              <Text font="label1">{label}</Text>
            </HStack>
            <Icon color="fg" name={!collapsed ? 'minus' : 'add'} size="s" />
          </HStack>
        </Pressable>
      ) : (
        <Box padding={0.5}>
          <Pressable
            noScaleOnPress
            aria-current={isCurrentPage ? 'page' : undefined}
            aria-expanded={collapsible && !href ? !collapsed : undefined}
            as={Link}
            background="transparent"
            borderRadius={1000}
            borderWidth={0}
            flexGrow={1}
            href={collapsible ? (hrefWithSSRFallback ?? '#') : hrefWithSSRFallback}
            onClick={
              collapsible
                ? (e) => {
                    onItemClick?.(item);
                    if (href) {
                      updateCollapsed(false);
                    } else {
                      e.preventDefault();
                      updateCollapsed();
                    }
                  }
                : () => {
                    onItemClick?.(item);
                  }
            }
            role={collapsible && !href ? 'button' : undefined}
            tabIndex={tabIndex}
            {...props}
          >
            <HStack
              alignItems="center"
              gap={1}
              justifyContent="space-between"
              paddingX={1.5}
              paddingY={0.5}
              width="100%"
            >
              <Text color="fg" font="label2">
                {label}
              </Text>
              {level !== 1 && (
                <Icon color="fg" name={expandedItem === index ? 'caretUp' : 'caretDown'} size="s" />
              )}
            </HStack>
          </Pressable>
        </Box>
      )}

      <Collapsible
        collapsed={collapsed}
        paddingStart={level === 1 ? 0 : 1.5}
        paddingTop={level === 1 ? 2 : 1}
      >
        <VStack
          as="ul"
          borderColor="bgLine"
          borderStartWidth={100}
          id={controlsId}
          paddingStart={0}
          width="100%"
        >
          <DocSidebarItems
            activePath={activePath}
            items={items}
            level={level + 1}
            onItemClick={onItemClick}
            tabIndex={collapsed ? -1 : (tabIndex ?? 0)}
          />
        </VStack>
      </Collapsible>
    </li>
  );
}
