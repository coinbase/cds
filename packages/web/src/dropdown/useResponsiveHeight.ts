import { useCallback, useEffect, useMemo, useState } from 'react';
import type { RectReadOnly } from 'react-use-measure';
import type { DimensionValue } from '@coinbase/cds-common';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useIsoEffect } from '../hooks/useIsoEffect';
import { useTheme } from '../hooks/useTheme';
import { type PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';
import { getBrowserGlobals, isSSR } from '../utils/browser';

type UseResponsiveHeightParams = {
  gap?: ThemeVars.Space;
  dropdownBounds: RectReadOnly;
  maxHeight?: React.CSSProperties['maxHeight'];
  visible: boolean;
  placement: PopoverContentPositionConfig['placement'];
};

const BOTTOM_GUTTER_SPACE: ThemeVars.Space = 2;

/**
 * @deprecated Import `useResponsivePanelMaxHeight` from `@coinbase/cds-web/popover` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export function useResponsiveHeight({
  gap,
  dropdownBounds,
  maxHeight,
  visible,
  placement,
}: UseResponsiveHeightParams) {
  // we need to extract the raw values from the theme for style calculations in javascript
  const { space } = useTheme();
  const bottomGutter = space[BOTTOM_GUTTER_SPACE];
  const calculatedGap = space[gap ?? 0];

  const [dropdownHeight, setDropdownHeight] = useState<DimensionValue | undefined>(maxHeight);

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
    if (typeof maxHeight === 'number') return maxHeight;
    if (maxHeight === undefined) return 0;
    const percentWindowHeight = ((windowHeight ?? 0) * parseInt(maxHeight, 10)) / 100;
    return percentWindowHeight;
  }, [maxHeight, windowHeight]);

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
  }, [windowHeight, verticalBreakpoint, responsivePopoverMenuHeight, visible]);

  return { dropdownHeight };
}
