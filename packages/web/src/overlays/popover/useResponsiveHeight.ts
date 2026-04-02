import { useCallback, useEffect, useMemo, useState } from 'react';
import type { RectReadOnly } from 'react-use-measure';
import type { DimensionValue } from '@coinbase/cds-common';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useBreakpoints } from '../../hooks/useBreakpoints';
import { useIsoEffect } from '../../hooks/useIsoEffect';
import { useTheme } from '../../hooks/useTheme';
import type { ResponsiveProp } from '../../styles/styleProps';
import { getBrowserGlobals, isSSR } from '../../utils/browser';

import type { PopoverContentPositionConfig } from './PopoverProps';
import { POPOVER_PANEL_MAX_HEIGHT } from './PopoverPanel';

type UseResponsiveHeightParams = {
  gap?: ThemeVars.Space;
  dropdownBounds: RectReadOnly;
  maxHeight?: ResponsiveProp<React.CSSProperties['maxHeight']>;
  visible: boolean;
  placement: PopoverContentPositionConfig['placement'];
};

const BOTTOM_GUTTER_SPACE: ThemeVars.Space = 2;

/**
 * Resolves `ResponsiveProp` maxHeight the same way dynamic style props do: `desktop` overrides on
 * desktop viewports, `tablet` on tablet, `phone` on phone, with `base` as the fallback.
 */
function resolveResponsiveMaxHeight(
  maxHeight: ResponsiveProp<React.CSSProperties['maxHeight']> | undefined,
  bp: ReturnType<typeof useBreakpoints>,
): React.CSSProperties['maxHeight'] | undefined {
  if (maxHeight === undefined) {
    return undefined;
  }
  if (typeof maxHeight !== 'object' || maxHeight === null || Array.isArray(maxHeight)) {
    return maxHeight as React.CSSProperties['maxHeight'];
  }
  const { base = 300, phone, tablet, desktop } = maxHeight;
  if (bp.isDesktop) {
    return desktop ?? base;
  }
  if (bp.isTablet) {
    return tablet ?? base;
  }
  if (bp.isPhone) {
    return phone ?? base;
  }
  return POPOVER_PANEL_MAX_HEIGHT;
}

/**
 * Computes a max height for floating popover or dropdown panels so they stay within the viewport,
 * including `ResponsiveProp` maxHeight resolution and placement-aware `calc(100vh - …)` fallback.
 */
export function useResponsiveHeight({
  gap,
  dropdownBounds,
  maxHeight,
  visible,
  placement,
}: UseResponsiveHeightParams) {
  const bp = useBreakpoints();
  const resolvedMaxHeight = useMemo(
    () => resolveResponsiveMaxHeight(maxHeight, bp),
    [maxHeight, bp],
  );

  // we need to extract the raw values from the theme for style calculations in javascript
  const { space } = useTheme();
  const bottomGutter = space[BOTTOM_GUTTER_SPACE];
  const calculatedGap = space[gap ?? 0];

  const [dropdownHeight, setDropdownHeight] = useState<DimensionValue | undefined>(
    resolvedMaxHeight,
  );

  // the following calculates the window height on resize changes and stores it in state
  const [windowHeight, setWindowHeight] = useState<number | undefined>(
    !isSSR() ? getBrowserGlobals()?.window.innerHeight : undefined,
  );

  const handleWindowSizeChange = useCallback(() => {
    setWindowHeight(getBrowserGlobals()?.window.innerHeight);
  }, [setWindowHeight]);

  useEffect(() => {
    // useEffect will only run client side
    getBrowserGlobals()?.window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      getBrowserGlobals()?.window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  const calculatedMaxHeight = useMemo(() => {
    if (typeof resolvedMaxHeight === 'number') return resolvedMaxHeight;
    if (resolvedMaxHeight === undefined) return 0;
    const percentWindowHeight =
      ((windowHeight ?? 0) * parseInt(String(resolvedMaxHeight), 10)) / 100;
    return percentWindowHeight;
  }, [resolvedMaxHeight, windowHeight]);

  const verticalBreakpoint = useMemo(() => {
    if (dropdownBounds) {
      if (placement?.includes('bottom')) {
        return dropdownBounds.top + calculatedMaxHeight + bottomGutter + calculatedGap;
      }
      if (placement?.includes('top')) {
        return dropdownBounds.bottom + calculatedMaxHeight + bottomGutter + calculatedGap;
      }
    }
    return undefined;
  }, [bottomGutter, calculatedGap, calculatedMaxHeight, dropdownBounds, placement]);

  const responsivePopoverMenuHeight = useMemo(() => {
    if (placement?.includes('bottom')) {
      return dropdownBounds
        ? `calc(100vh - ${dropdownBounds.top}px - ${bottomGutter}px)`
        : undefined;
    }
    if (placement?.includes('top')) {
      return dropdownBounds
        ? `calc(100vh - ${dropdownBounds.bottom}px - ${bottomGutter}px)`
        : undefined;
    }
  }, [placement, dropdownBounds, bottomGutter]);

  useIsoEffect(() => {
    if (windowHeight && verticalBreakpoint && visible && windowHeight <= verticalBreakpoint) {
      // only apply a responsive menu height if the viewport height encroaches on the menu
      setDropdownHeight(responsivePopoverMenuHeight);
    } else {
      setDropdownHeight(calculatedMaxHeight);
    }
  }, [calculatedMaxHeight, responsivePopoverMenuHeight, verticalBreakpoint, visible, windowHeight]);

  return { dropdownHeight };
}
