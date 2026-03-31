import React, { memo, useCallback, useId, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import type { SharedProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { Collapsible } from '../collapsible';
import { DotCount } from '../dots/DotCount';
import { useDimensions } from '../hooks/useDimensions';
import { useIsoEffect } from '../hooks/useIsoEffect';
import { HStack } from '../layout';
import { Text, type TextProps } from '../typography/Text';

import type { TabIndicatorProps } from './TabIndicator';
import type { TabProps } from './TabNavigation';

const primaryTabLabelCss = css`
  padding-top: var(--space-2);
  padding-bottom: calc(var(--space-2) - 2px); /* Account for the 2px TabIndicator */
`;
const containerCss = css`
  position: relative;
  > * {
    white-space: nowrap;
  }
`;
const hiddenCss = css`
  width: 100%;
  visibility: hidden;
  pointer-events: none;
  height: 0px;
`;

const colorVariantStyle: Record<
  NonNullable<TabLabelProps['variant']>,
  { active: ThemeVars.Color; inactive: ThemeVars.Color }
> = {
  primary: {
    active: 'fgPrimary',
    inactive: 'fg',
  },
  secondary: {
    active: 'fg',
    inactive: 'fgMuted',
  },
} as const;

export type TabLabelBaseProps = SharedProps &
  Pick<TabProps, 'variant' | 'count' | 'accessibilityLabel' | 'max' | 'Component'> & {
    /** Identify the active tab */
    active?: boolean;
    /** Display title to render as the TabLabel. */
    children: React.ReactNode;
    /** Callback to fire when pressed */
    onPress?: () => void;
  };

export type TabLabelProps = TabLabelBaseProps &
  TextProps<'h2'> & { onLayout?: (key: string, props: TabIndicatorProps) => void };

export const TabLabel = memo(
  ({
    id = '',
    active,
    variant = 'primary',
    count = 0,
    max,
    onLayout,
    Component,
    ...props
  }: TabLabelProps) => {
    const shouldMeasureElement = useMemo(() => !active && variant !== 'primary', [active, variant]);
    const color = useMemo(
      () => colorVariantStyle[variant][active ? 'active' : 'inactive'],
      [active, variant],
    );
    const prevCount = usePreviousValue<number>(count);
    const accessibilityLabelId = useId();
    const font = variant === 'primary' ? 'headline' : active ? 'title3' : 'title4';

    // Handle layout events
    const { observe, width, x } = useDimensions();

    const getOnLayoutHandler = useCallback(() => {
      onLayout?.(id, { width, x });
    }, [id, onLayout, width, x]);

    useIsoEffect(() => {
      getOnLayoutHandler();
    }, [getOnLayoutHandler]);

    return (
      <HStack ref={observe} alignItems="center">
        {shouldMeasureElement && (
          <span className={containerCss}>
            {Component ? (
              <>
                <Component active={active} id={id} label={props.children} />
                {/* This element is used to ensure the element width doesn't change when we change font-weight */}
                <span aria-hidden="true" className={hiddenCss}>
                  <Component active={active} id={id} label={props.children} />
                </span>
              </>
            ) : (
              <>
                <Text as="h2" color={color} display="block" font={font} {...props} />
                {/* This element is used to ensure the element width doesn't change when we change font-weight */}
                <Text
                  as="h2"
                  color={color}
                  display="block"
                  font={font}
                  {...props}
                  aria-hidden="true"
                  className={hiddenCss}
                />
              </>
            )}
          </span>
        )}
        {!shouldMeasureElement &&
          (Component ? (
            <Component active={active} id={id} label={props.children} />
          ) : (
            <Text
              as="h2"
              color={color}
              display="block"
              font={font}
              id={accessibilityLabelId}
              {...props}
              className={variant === 'primary' ? primaryTabLabelCss : undefined}
            />
          ))}
        <Collapsible collapsed={!count} direction="horizontal" paddingStart={0.5} role="status">
          {/* When count is set to 0 this will fallback to prevCount
          which has the previous count value to keep the component mounted */}
          <DotCount
            accessibilityLabel={`${
              props.accessibilityLabel ?? (typeof props.children === 'string' ? props.children : '')
            } count: ${count}`}
            count={(count || prevCount) ?? 0}
            max={max}
          />
        </Collapsible>
      </HStack>
    );
  },
);

TabLabel.displayName = 'TabLabel';
