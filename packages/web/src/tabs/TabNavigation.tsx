import React, {
  createRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ForwardedRef, KeyboardEvent, Ref } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import type { SharedProps } from '@coinbase/cds-common/types';
import { isDevelopment } from '@coinbase/cds-utils';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { type DotCountBaseProps } from '../dots/DotCount';
import { useDimensions } from '../hooks/useDimensions';
import type { BoxBaseProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Pressable } from '../system/Pressable';

import { Paddle, paddleWidth } from './Paddle';
import { TabIndicator, type TabIndicatorProps } from './TabIndicator';
import { TabLabel } from './TabLabel';

export const tabNavigationTestId = 'tabNavigation';
export const tabNavigationPaddleLeftTestId = 'tabNavigationPaddleLeft';
export const tabNavigationPaddleRightTestId = 'tabNavigationPaddleRight';

const scrollPadding = 5; // How much breathing room do we want before showing the paddles
const pressTimeout = 50;

let scrollTimeout: NodeJS.Timeout;
const containerCss = css`
  position: relative;
  display: flex;
  align-items: center;
  isolation: isolate;
`;
const scrollContainerCss = css`
  overflow-y: hidden;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
const pressableCss = css`
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;
const pressableCustomTabCss = css`
  margin: 0;
  padding: 0;
  flex-shrink: 0;
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

export type TabProps<T extends string | undefined = string> = SharedProps &
  Partial<Pick<DotCountBaseProps, 'count' | 'max'>> & {
    /** The id should be a meaningful and useful identifier like "watchlist" or "forSale" */
    id: T;
    /** Define a label for this Tab */
    label: React.ReactNode;
    /** See the Tabs TDD to understand which variant should be used.
     *  @default 'primary'
     */
    variant?: 'primary' | 'secondary';
    /** Disable interactions on the tab. */
    disabled?: boolean;
    /** Full length accessibility label when the child text is not descriptive enough. */
    accessibilityLabel?: string;
    /** Callback to fire when pressed */
    onClick?: (id: T) => void;
    /** Render a custom Component for the Tab */
    Component?: (props: CustomTabProps) => React.ReactNode;
  };

export type CustomTabProps = Pick<TabProps, 'id'> & {
  /**
   * @default false
   * When true, used to surface an active state for the currently selected tab
   */
  active?: boolean;
  /** Define a label for this Tab */
  label?: React.ReactNode;
};

export type TabNavigationBaseProps<T extends string | undefined = string> = SharedProps &
  BoxBaseProps &
  Pick<TabProps<T>, 'variant' | 'Component'> & {
    /** The active tabId
     *  @default tabs[0].id
     */
    value?: T;
    /** Children should be TabLabels. If you only have one child, don't use tabs 🤪 */
    tabs: TabProps<T>[];
    /** Use the onChange handler to deal with any side effects, ie event tracking or showing a tooltip */
    onChange: ((tabId: T) => void) | React.Dispatch<React.SetStateAction<T>>;
    /** This should always match the background color of the parent container
     * @default: 'bg'
     */
    background?: ThemeVars.Color;
    /**
     * The spacing between Tabs
     * @default 4
     */
    gap?: ThemeVars.Space;
    /**
     * Used to generate a11y attributes for the Tabs
     * If TabNavigation is used to display options that will filter data, use `radiogroup`
     * If TabNavigation is used to display a list of pages or views, use `tablist`
     * @default tablist
     */
    role?: 'radiogroup' | 'tablist';
    /**
     * Web only. Accessibility label for the previous arrow paddle (skip to beginning).
     */
    previousArrowAccessibilityLabel?: string | undefined;
    /**
     * Web only. Accessibility label for the next arrow paddle (skip to end).
     */
    nextArrowAccessibilityLabel?: string | undefined;
    /**
     * Web only. Styling for the paddle icon buttons. Mobile does not have paddles.
     */
    paddleStyle?: React.CSSProperties;
  };

export type TabNavigationProps<T extends string | undefined = string> = TabNavigationBaseProps<T>;

type LayoutProps = { width: number; x: number };
type TabRefs = Ref<{ id: string; ref: React.RefObject<HTMLButtonElement> }[]>;
const fallbackLayout: LayoutProps = { width: 0, x: 0 };

type TabNavigationFC = <T extends string | undefined = string>(
  props: TabNavigationProps<T> & { ref?: ForwardedRef<HTMLElement | null> },
) => React.ReactElement;

/**
 * TabNavigation renders a horizontal, tab-based navigation bar.
 * This component has a opinionated default style, but allows for customization through custom Component props.
 * @deprecated Use Tabs instead.
 */
const TabNavigationComponent = memo(
  forwardRef(
    <T extends string>(
      {
        tabs,
        value: valueFromProps,
        variant = 'primary',
        testID = tabNavigationTestId,
        onChange,
        background,
        accessibilityLabelledBy,
        accessibilityLabel,
        previousArrowAccessibilityLabel = 'Skip to beginning',
        nextArrowAccessibilityLabel = 'Skip to end',
        Component,
        gap = 4,
        role = 'tablist',
        paddleStyle,
        ...props
      }: TabNavigationProps<T>,
      forwardedRef: ForwardedRef<HTMLElement | null>,
    ) => {
      const value = valueFromProps ?? tabs[0].id;
      const [activeTabLayout, setActiveTabLayout] = useState(fallbackLayout);
      const { observe, width } = useDimensions();
      const isPrimary = useMemo(() => variant === 'primary', [variant]);
      const offsetRef = useRef(0);
      const tabsRefs: TabRefs = useRef(tabs.map(({ id }) => ({ id, ref: createRef() })));
      const scrollRef = useRef<HTMLDivElement>(null);
      useImperativeHandle(forwardedRef, () => scrollRef.current as HTMLDivElement);
      const end = Number(scrollRef.current?.scrollWidth) - Number(scrollRef.current?.offsetWidth);
      const canScrollRight = Number(scrollRef.current?.scrollLeft) < end;
      const [showLeftPaddle, setShowLeftPaddle] = useState(false);
      const [showRightPaddle, setShowRightPaddle] = useState(canScrollRight);
      const descendantAriaRole = role === 'tablist' ? 'tab' : 'radio';
      const roleBasedA11yProps =
        role === 'radiogroup'
          ? {
              'aria-activedescendant': `tab--${value}`,
            }
          : undefined;

      const handleOnScroll = useCallback(() => {
        const scrollDistance = Number(scrollRef.current?.scrollLeft);
        const endTrigger = end - scrollPadding;
        const startTrigger = scrollPadding;

        // Hide/show the left paddle
        if (scrollDistance > startTrigger && !showLeftPaddle) setShowLeftPaddle(true);
        else if (scrollDistance <= startTrigger && showLeftPaddle) setShowLeftPaddle(false);

        // Hide/show the right paddle
        if (scrollDistance < endTrigger && !showRightPaddle) setShowRightPaddle(true);
        else if (scrollDistance >= endTrigger && showRightPaddle) setShowRightPaddle(false);
      }, [end, showLeftPaddle, showRightPaddle]);

      /** ⚡️ Side effects */
      useEffect(() => {
        handleOnScroll();
      }, [handleOnScroll, width]);

      const handleScrollLeft = useCallback(() => {
        scrollRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
      }, [scrollRef]);
      const handleScrollRight = useCallback(() => {
        scrollRef?.current?.scrollTo({ left: end, behavior: 'smooth' });
      }, [end]);

      useEffect(() => {
        if (isDevelopment() && variant === 'secondary') {
          console.warn(
            'Deprecation Warning: Secondary tabs are deprecated, please migrate to primary tabs. In the case of nested tabs, consider using TabbedChips',
          );
        }
      }, [variant]);

      /** 🛼
       *  Recreating handleLayout every time value changes will
       *  cause the active TabLabel to call setActiveTabLayout
       *  with its layout values, updating the TabIndicator.
       */
      const handleLayout = useCallback(
        (id: string, layout: TabIndicatorProps) => {
          // Track offset
          if (id === tabs[0].id) offsetRef.current = layout.x;
          if (id === value) {
            setActiveTabLayout({
              width: layout.width,
              x: layout.x - offsetRef.current,
            });
          }
        },
        [tabs, value],
      );

      const getTabKeydownHandler = useCallback((currentId: T) => {
        return function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
          const refs = tabsRefs?.current;
          const currentActiveIndex = refs?.findIndex(({ id }) => id === currentId) ?? 0;
          const lastIndex = Number(refs?.length) - 1;
          const nextIndex = currentActiveIndex < lastIndex ? currentActiveIndex + 1 : 0;
          const prevIndex = currentActiveIndex !== 0 ? currentActiveIndex - 1 : lastIndex;

          switch (e.key) {
            case 'ArrowRight':
              e.preventDefault();
              refs?.[nextIndex].ref?.current?.focus();
              break;
            case 'ArrowLeft':
              e.preventDefault();
              refs?.[prevIndex].ref?.current?.focus();
              break;
            default:
              break;
          }
        };
      }, []);

      const getScrollIntoViewHandler = useCallback((ref: React.RefObject<HTMLElement>) => {
        return function handleFocus() {
          // Container
          const container = scrollRef.current;
          const containerScrollLeft = Number(container?.scrollLeft);
          const containerWidth = Number(container?.getBoundingClientRect().width);
          const containerRightEdge = containerWidth + Number(container?.scrollLeft);
          // Element
          const elementWidth = Number(ref?.current?.clientWidth);
          const elementOffsetLeft = Number(ref?.current?.offsetLeft);
          // State
          const isOffscreenLeft = elementOffsetLeft < containerScrollLeft + paddleWidth;
          const isOffscreenRight =
            elementOffsetLeft + elementWidth > containerRightEdge - paddleWidth;
          // Set the new scroll location
          let newPosition: number | undefined;
          if (isOffscreenLeft) newPosition = elementOffsetLeft - paddleWidth;
          if (isOffscreenRight)
            newPosition = elementWidth + elementOffsetLeft + paddleWidth - containerWidth;

          // SCROLL TO THE NEW POSITION
          // Wrapped in a timeout so the scroll event doesn't fire before the press handler
          scrollTimeout = setTimeout(() => {
            if (newPosition && (isOffscreenLeft || isOffscreenRight)) {
              container?.scrollTo({ left: newPosition, behavior: 'smooth' });
            }
          }, pressTimeout);
        };
      }, []);

      const getTabClickHandler = useCallback(
        (id: T, onClick?: (id: T) => void) => {
          return function handleTabPress() {
            clearTimeout(scrollTimeout);
            onChange(id);
            onClick?.(id); // handle callback
          };
        },
        [onChange],
      );

      const getChildren = useCallback(
        ({ label, ...props }: Pick<TabProps<T>, 'id' | 'count' | 'label' | 'Component'>) => (
          <TabLabel
            active={props.id === value}
            {...props}
            onLayout={handleLayout}
            variant={variant}
          >
            {label}
          </TabLabel>
        ),
        [handleLayout, value, variant],
      );

      // Iterate over the tabs and create Pressable TabLabels
      const tabLabels = useMemo(
        () =>
          (tabs as TabProps<T>[])
            ?.filter(Boolean)
            ?.map(
              ({
                id,
                onClick,
                label,
                disabled,
                accessibilityLabel = typeof label === 'string' ? label : undefined,
                count,
                testID: tabLabelTestID = `${testID}-tabLabel--${id}`,
                Component: TabComponent,
              }: TabProps<T>) => {
                const isActiveTab = id === value;
                const roleBasedTabA11yProps =
                  role === 'radiogroup'
                    ? { 'aria-checked': isActiveTab }
                    : { 'aria-selected': isActiveTab };
                const currentRef =
                  tabsRefs.current?.find((tab) => tab.id === id)?.ref ?? createRef();

                const CustomTabComponent = TabComponent ?? Component;

                return (
                  <Pressable
                    key={`${id}--button`}
                    ref={currentRef}
                    accessibilityLabel={accessibilityLabel}
                    aria-controls={`tabpanel--${id}`}
                    background="transparent"
                    {...roleBasedTabA11yProps}
                    className={cx(
                      CustomTabComponent ? pressableCustomTabCss : pressableCss,
                      insetFocusRingCss,
                    )}
                    disabled={disabled}
                    id={`tab--${id}`}
                    onClick={getTabClickHandler(id, onClick)}
                    onFocus={getScrollIntoViewHandler(currentRef)}
                    onKeyDown={getTabKeydownHandler(id)}
                    role={descendantAriaRole}
                    tabIndex={isActiveTab ? undefined : -1}
                    testID={tabLabelTestID}
                  >
                    {CustomTabComponent && variant !== 'primary' ? (
                      <CustomTabComponent active={isActiveTab} id={id} label={label} />
                    ) : (
                      getChildren({ id, count, label, Component: CustomTabComponent })
                    )}
                  </Pressable>
                );
              },
            ),
        [
          tabs,
          testID,
          value,
          role,
          Component,
          getScrollIntoViewHandler,
          getTabKeydownHandler,
          getTabClickHandler,
          descendantAriaRole,
          variant,
          getChildren,
        ],
      );

      return (
        <div ref={observe} className={containerCss}>
          <Paddle
            accessibilityLabel={previousArrowAccessibilityLabel}
            background={background}
            onClick={handleScrollLeft}
            paddleStyle={paddleStyle}
            show={showLeftPaddle}
            testID={tabNavigationPaddleLeftTestId}
            variant={variant}
          />
          <HStack
            ref={scrollRef}
            alignItems="center"
            background={background}
            className={scrollContainerCss}
            onScroll={handleOnScroll}
            position="relative"
          >
            <VStack testID={testID} {...props} padding={0}>
              <HStack
                accessibilityLabel={accessibilityLabel}
                accessibilityLabelledBy={accessibilityLabelledBy}
                flexShrink={0}
                gap={gap}
                role={role}
                zIndex={zIndex.navigation}
                {...roleBasedA11yProps}
              >
                {tabLabels}
              </HStack>
              {isPrimary && activeTabLayout?.width > 0 && (
                <TabIndicator background={background} {...activeTabLayout} />
              )}
            </VStack>
          </HStack>
          <Paddle
            accessibilityLabel={nextArrowAccessibilityLabel}
            background={background}
            direction="right"
            onClick={handleScrollRight}
            paddleStyle={paddleStyle}
            show={showRightPaddle}
            testID={tabNavigationPaddleRightTestId}
            variant={variant}
          />
        </div>
      );
    },
  ),
);

TabNavigationComponent.displayName = 'TabNavigation';

export const TabNavigation = TabNavigationComponent as TabNavigationFC;
