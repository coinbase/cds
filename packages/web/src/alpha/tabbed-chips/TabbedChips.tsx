import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import type { ChipProps, ChipSize } from '../../chips/ChipProps';
import { MediaChip, type MediaChipBaseProps } from '../../chips/MediaChip';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import type { HStackDefaultElement, HStackProps } from '../../layout/HStack';
import {
  Tabs,
  type TabsActiveIndicatorComponent,
  type TabsBaseProps,
  type TabsProps,
} from '../../tabs/Tabs';
import { TabsScrollArea } from '../../tabs/TabsScrollArea';

const DefaultTabComponent = <TabId extends string = string>({
  label = '',
  id,
  activeBackground,
  activeColor,
  color,
  ...tabProps
}: TabbedChipProps<TabId>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const chipRef = useRef<HTMLButtonElement>(null);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      updateActiveTab(id);
    },
    [id, updateActiveTab],
  );

  // Keep focus on the newly active chip
  useEffect(() => {
    if (isActive && chipRef.current) {
      chipRef.current.focus();
    }
  }, [isActive]);

  return (
    <MediaChip
      ref={chipRef}
      aria-selected={isActive}
      background={isActive && activeBackground ? activeBackground : undefined}
      color={isActive && activeColor ? activeColor : color}
      invertColorScheme={isActive && !activeBackground}
      onClick={handleClick}
      role="tab"
      width="max-content"
      {...tabProps}
    >
      {label}
    </MediaChip>
  );
};

const DefaultTabsActiveIndicatorComponent: TabsActiveIndicatorComponent = () => {
  return null;
};

export type TabbedChipProps<TabId extends string = string> = Omit<
  ChipProps,
  'children' | 'onClick'
> &
  TabValue<TabId> & {
    Component?: React.FC<Omit<ChipProps, 'children'> & TabValue<TabId>>;
    /**
     * Custom background color applied to the chip when it is the active tab.
     * When set, takes precedence over the default `invertColorScheme` behavior.
     */
    activeBackground?: MediaChipBaseProps['background'];
    /**
     * Custom foreground color applied to the chip label when it is the active tab.
     */
    activeColor?: MediaChipBaseProps['color'];
  };

export type TabbedChipsBaseProps<TabId extends string = string> = Omit<
  TabsBaseProps<TabId>,
  | 'TabComponent'
  | 'TabsActiveIndicatorComponent'
  | 'tabs'
  | 'onActiveTabElementChange'
  | 'activeBackground'
  | 'activeColor'
> & {
  TabComponent?: React.FC<TabbedChipProps<TabId>>;
  TabsActiveIndicatorComponent?: TabsProps<TabId>['TabsActiveIndicatorComponent'];
  tabs: TabbedChipProps<TabId>[];
  /**
   * Turn on to use a compact `MediaChip` for each tab.
   * @default false
   * @deprecated Use `size="xs"` instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  compact?: boolean;
  /**
   * Set the size of each tab chip. Also sizes the overflow indicator buttons rendered by
   * {@link TabsScrollArea}.
   * @default s
   */
  size?: ChipSize;
  /**
   * X position offset when auto-scrolling to active tab (to avoid active tab being covered by the overflow indicator on the left side, default: 50px)
   * @default 50
   */
  autoScrollOffset?: number;
};

export type TabbedChipsProps<TabId extends string = string> = TabbedChipsBaseProps<TabId> &
  SharedProps &
  SharedAccessibilityProps & {
    background?: ThemeVars.Color;
    previousArrowAccessibilityLabel?: string;
    nextArrowAccessibilityLabel?: string;
    /**
     * The spacing between Tabs
     * @default 1
     */
    gap?: HStackProps<HStackDefaultElement>['gap'];
    /**
     * Width of the scroll region; defaults to the full width of the parent. When the tab row is wider
     * than this container, overflow indicators appear.
     * @default 100%
     */
    width?: HStackProps<HStackDefaultElement>['width'];
    styles?: {
      /** Root container element */
      root?: React.CSSProperties;
      /** Horizontal scroll region wrapping the tab row (aligned with {@link TabsScrollArea}). */
      scrollContainer?: React.CSSProperties;
      /**
       * @deprecated Use `overflowIndicatorButton` (or other `overflowIndicator*` style slots).
       * @deprecationExpectedRemoval v10
       */
      paddle?: React.CSSProperties;
      /** Tabs root element */
      tabs?: React.CSSProperties;
      /** Overflow indicator root */
      overflowIndicator?: React.CSSProperties;
      /** Overflow indicator icon button. */
      overflowIndicatorButton?: React.CSSProperties;
      /** Overflow indicator icon button container. */
      overflowIndicatorButtonContainer?: React.CSSProperties;
      /** Overflow indicator gradient. */
      overflowIndicatorGradient?: React.CSSProperties;
    };
    classNames?: {
      /** Root container element */
      root?: string;
      /** Horizontal scroll region wrapping the tab row */
      scrollContainer?: string;
      /** Tabs root element */
      tabs?: string;
      /** Overflow control outer wrapper (each side). */
      overflowIndicator?: string;
      /** Overflow indicator icon button. */
      overflowIndicatorButton?: string;
      /** Overflow indicator icon button container. */
      overflowIndicatorButtonContainer?: string;
      /** Overflow indicator gradient. */
      overflowIndicatorGradient?: string;
    };
  };

type TabbedChipsFC = <TabId extends string = string>(
  props: TabbedChipsProps<TabId> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.ReactElement;

const TabbedChipsComponent = memo(
  forwardRef(function TabbedChips<TabId extends string = string>(
    _props: TabbedChipsProps<TabId>,
    ref: React.ForwardedRef<HTMLElement | null>,
  ) {
    const mergedProps = useComponentConfig('TabbedChips', _props);
    const {
      tabs,
      activeTab,
      onChange,
      TabComponent = DefaultTabComponent,
      testID,
      background = 'bg',
      gap = 1,
      previousArrowAccessibilityLabel = 'Previous',
      nextArrowAccessibilityLabel = 'Next',
      width = '100%',
      TabsActiveIndicatorComponent = DefaultTabsActiveIndicatorComponent,
      disabled,
      compact,
      size,
      styles,
      classNames,
      autoScrollOffset = 50,
      ...accessibilityProps
    } = mergedProps;
    // Size is driven by `size`; deprecated `compact` falls back to its legacy `xs` size.
    const resolvedSize: ChipSize = size ?? (compact ? 'xs' : 's');

    const TabComponentWithSize = useCallback(
      (props: TabValue<TabId>) => {
        return <TabComponent size={resolvedSize} {...props} />;
      },
      [TabComponent, resolvedSize],
    );

    const tabsScrollAreaStyles = useMemo(
      () => ({
        root: styles?.root,
        scrollContainer: styles?.scrollContainer,
        overflowIndicator: styles?.overflowIndicator,
        overflowIndicatorButton: {
          ...styles?.paddle,
          ...styles?.overflowIndicatorButton,
        },
        overflowIndicatorButtonContainer: styles?.overflowIndicatorButtonContainer,
        overflowIndicatorGradient: styles?.overflowIndicatorGradient,
      }),
      [styles],
    );

    const tabsScrollAreaClassNames = useMemo(
      () => ({
        root: classNames?.root,
        scrollContainer: classNames?.scrollContainer,
        overflowIndicator: classNames?.overflowIndicator,
        overflowIndicatorButton: classNames?.overflowIndicatorButton,
        overflowIndicatorButtonContainer: classNames?.overflowIndicatorButtonContainer,
        overflowIndicatorGradient: classNames?.overflowIndicatorGradient,
      }),
      [classNames],
    );

    return (
      <TabsScrollArea
        autoScrollOffset={autoScrollOffset}
        background={background}
        classNames={tabsScrollAreaClassNames}
        nextArrowAccessibilityLabel={nextArrowAccessibilityLabel}
        previousArrowAccessibilityLabel={previousArrowAccessibilityLabel}
        size={resolvedSize}
        styles={tabsScrollAreaStyles}
        testID={testID}
        width={width}
      >
        {({ onActiveTabElementChange }) => (
          <Tabs
            ref={ref}
            TabComponent={TabComponentWithSize}
            TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
            activeTab={activeTab || null}
            background={background}
            className={classNames?.tabs}
            disabled={disabled}
            gap={gap}
            onActiveTabElementChange={onActiveTabElementChange}
            onChange={onChange}
            style={styles?.tabs}
            tabs={tabs}
            {...accessibilityProps}
          />
        )}
      </TabsScrollArea>
    );
  }),
);

TabbedChipsComponent.displayName = 'TabbedChips';

export const TabbedChips = TabbedChipsComponent as TabbedChipsFC;
