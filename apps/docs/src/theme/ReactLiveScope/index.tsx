import React from 'react';
import { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { useEventHandler } from '@coinbase/cds-common/hooks/useEventHandler';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import { useSort } from '@coinbase/cds-common/hooks/useSort';
import * as CDSDataAccounts from '@coinbase/cds-common/internal/data/accounts';
import * as CDSDataAssets from '@coinbase/cds-common/internal/data/assets';
import { candles as btcCandles } from '@coinbase/cds-common/internal/data/candles';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { prices } from '@coinbase/cds-common/internal/data/prices';
import { product } from '@coinbase/cds-common/internal/data/product';
import { users } from '@coinbase/cds-common/internal/data/users';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
} from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import {
  OverlayContentContext,
  useOverlayContentContext,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import { useAlert } from '@coinbase/cds-common/overlays/useAlert';
import { useModal } from '@coinbase/cds-common/overlays/useModal';
import { useMultiSelect } from '@coinbase/cds-common/select/useMultiSelect';
import { useStepper } from '@coinbase/cds-common/stepper/useStepper';
import { LocaleProvider } from '@coinbase/cds-common/system/LocaleProvider';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import { avatarDotSizeMap, avatarIconSizeMap } from '@coinbase/cds-common/tokens/dot';
import { useTourContext } from '@coinbase/cds-common/tour/TourContext';
import { useSparklineArea } from '@coinbase/cds-common/visualizations/useSparklineArea';
import { useSparklinePath } from '@coinbase/cds-common/visualizations/useSparklinePath';
import * as CDSLottie from '@coinbase/cds-lottie-files';
import * as CDSAccordion from '@coinbase/cds-web/accordion';
import { Combobox } from '@coinbase/cds-web/alpha/combobox/Combobox';
import { DataCard } from '@coinbase/cds-web/alpha/data-card';
import { Select } from '@coinbase/cds-web/alpha/select/Select';
import { SelectChip } from '@coinbase/cds-web/alpha/select-chip/SelectChip';
import { TabbedChips } from '@coinbase/cds-web/alpha/tabbed-chips/TabbedChips';
import * as CDSAnimation from '@coinbase/cds-web/animation';
import * as CDSBanner from '@coinbase/cds-web/banner';
import * as CDSButtons from '@coinbase/cds-web/buttons';
import * as CDSCards from '@coinbase/cds-web/cards';
import * as ContentCardComponents from '@coinbase/cds-web/cards/ContentCard';
import * as CDSCarousel from '@coinbase/cds-web/carousel';
import * as CDSCells from '@coinbase/cds-web/cells';
import * as CDSChips from '@coinbase/cds-web/chips';
import { SelectChip as OldSelectChip } from '@coinbase/cds-web/chips/SelectChip';
import { TabbedChips as OldTabbedChips } from '@coinbase/cds-web/chips/TabbedChips';
import * as CDSCoachmark from '@coinbase/cds-web/coachmark';
import * as CDSCollapsible from '@coinbase/cds-web/collapsible';
import * as CDSControls from '@coinbase/cds-web/controls';
import { InputLabel } from '@coinbase/cds-web/controls/InputLabel';
import { Select as OldSelect } from '@coinbase/cds-web/controls/Select';
import * as CDSDates from '@coinbase/cds-web/dates';
import * as CDSDots from '@coinbase/cds-web/dots';
import * as CDSDropdown from '@coinbase/cds-web/dropdown';
import { useA11yControlledVisibility } from '@coinbase/cds-web/hooks/useA11yControlledVisibility';
import { useBreakpoints } from '@coinbase/cds-web/hooks/useBreakpoints';
import { useCheckboxGroupState } from '@coinbase/cds-web/hooks/useCheckboxGroupState';
import { useDimensions } from '@coinbase/cds-web/hooks/useDimensions';
import { useHasMounted } from '@coinbase/cds-web/hooks/useHasMounted';
import { useIsoEffect } from '@coinbase/cds-web/hooks/useIsoEffect';
import { useMediaQuery } from '@coinbase/cds-web/hooks/useMediaQuery';
import { useScrollBlocker } from '@coinbase/cds-web/hooks/useScrollBlocker';
import { useTheme } from '@coinbase/cds-web/hooks/useTheme';
import * as CDSIcons from '@coinbase/cds-web/icons';
import * as CDSIllustrations from '@coinbase/cds-web/illustrations';
import * as CDSLayout from '@coinbase/cds-web/layout';
import * as CDSLoaders from '@coinbase/cds-web/loaders';
import * as CDSMedia from '@coinbase/cds-web/media';
import * as CDSMultiContentModule from '@coinbase/cds-web/multi-content-module';
import * as CDSNavigation from '@coinbase/cds-web/navigation';
import * as CDSNumbers from '@coinbase/cds-web/numbers';
import * as CDSOverlays from '@coinbase/cds-web/overlays';
import { useToast } from '@coinbase/cds-web/overlays/useToast';
import * as CDSPage from '@coinbase/cds-web/page';
import * as CDSPagination from '@coinbase/cds-web/pagination';
import * as CDSSectionHeader from '@coinbase/cds-web/section-header';
import * as StepperComponents from '@coinbase/cds-web/stepper';
import * as CDSSystem from '@coinbase/cds-web/system';
import * as CDSTables from '@coinbase/cds-web/tables';
import { useSortableCell } from '@coinbase/cds-web/tables/hooks/useSortableCell';
import * as CDSTabs from '@coinbase/cds-web/tabs';
import * as CDSTag from '@coinbase/cds-web/tag';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import * as CDSTour from '@coinbase/cds-web/tour';
import * as CDSTypography from '@coinbase/cds-web/typography';
import * as CDSVisualizations from '@coinbase/cds-web/visualizations';
import * as CDSChartComponents from '@coinbase/cds-web-visualization/chart';
import * as CDSSparklineComponents from '@coinbase/cds-web-visualization/sparkline';
import * as framerMotion from 'framer-motion';

export type ImportMapEntry = {
  source: string;
  /** When the local name differs from the exported name, e.g. { candles as btcCandles } */
  exportedAs?: string;
};

/**
 * Barrel package registrations. All runtime exports are auto-captured for
 * both the react-live scope and the sandbox import map. When a new component
 * is added to one of these packages, it is automatically available.
 */
const namespaceRegistrations: [Record<string, unknown>, string][] = [
  [React, 'react'],
  [CDSLayout, '@coinbase/cds-web/layout'],
  [CDSButtons, '@coinbase/cds-web/buttons'],
  [CDSTypography, '@coinbase/cds-web/typography'],
  [CDSControls, '@coinbase/cds-web/controls'],
  [CDSOverlays, '@coinbase/cds-web/overlays'],
  [CDSTables, '@coinbase/cds-web/tables'],
  [CDSTabs, '@coinbase/cds-web/tabs'],
  [CDSNavigation, '@coinbase/cds-web/navigation'],
  [CDSSystem, '@coinbase/cds-web/system'],
  [CDSMedia, '@coinbase/cds-web/media'],
  [CDSIcons, '@coinbase/cds-web/icons'],
  [CDSIllustrations, '@coinbase/cds-web/illustrations'],
  [CDSCells, '@coinbase/cds-web/cells'],
  [CDSDots, '@coinbase/cds-web/dots'],
  [CDSDates, '@coinbase/cds-web/dates'],
  [CDSNumbers, '@coinbase/cds-web/numbers'],
  [CDSVisualizations, '@coinbase/cds-web/visualizations'],
  [CDSChartComponents, '@coinbase/cds-web-visualization/chart'],
  [CDSSparklineComponents, '@coinbase/cds-web-visualization/sparkline'],
  [StepperComponents, '@coinbase/cds-web/stepper'],
  [ContentCardComponents, '@coinbase/cds-web/cards/ContentCard'],
  [CDSDataAssets, '@coinbase/cds-common/internal/data/assets'],
  [CDSDataAccounts, '@coinbase/cds-common/internal/data/accounts'],
  [CDSLottie, '@coinbase/cds-lottie-files'],
  [framerMotion, 'framer-motion'],
  [CDSAccordion, '@coinbase/cds-web/accordion'],
  [CDSAnimation, '@coinbase/cds-web/animation'],
  [CDSBanner, '@coinbase/cds-web/banner'],
  [CDSCards, '@coinbase/cds-web/cards'],
  [CDSCarousel, '@coinbase/cds-web/carousel'],
  [CDSChips, '@coinbase/cds-web/chips'],
  [CDSCoachmark, '@coinbase/cds-web/coachmark'],
  [CDSCollapsible, '@coinbase/cds-web/collapsible'],
  [CDSDropdown, '@coinbase/cds-web/dropdown'],
  [CDSLoaders, '@coinbase/cds-web/loaders'],
  [CDSMultiContentModule, '@coinbase/cds-web/multi-content-module'],
  [CDSPage, '@coinbase/cds-web/page'],
  [CDSPagination, '@coinbase/cds-web/pagination'],
  [CDSSectionHeader, '@coinbase/cds-web/section-header'],
  [CDSTag, '@coinbase/cds-web/tag'],
  [CDSTour, '@coinbase/cds-web/tour'],
];

type ExplicitEntry = { value: unknown; source: string; exportedAs?: string };

/**
 * Individual registrations for identifiers that come from specific subpaths
 * (not in a barrel above), that override a barrel export with a different
 * package (e.g. Select from alpha instead of controls), or use an alias.
 *
 * To add a new identifier:
 *   1. Add the import statement at the top of this file
 *   2. Add entry here
 */
const explicitRegistrations: Record<string, ExplicitEntry> = {
  // Alpha overrides (replace barrel versions from CDSControls / chips)
  Select: { value: Select, source: '@coinbase/cds-web/alpha/select/Select' },
  SelectChip: { value: SelectChip, source: '@coinbase/cds-web/alpha/select-chip/SelectChip' },
  TabbedChips: { value: TabbedChips, source: '@coinbase/cds-web/alpha/tabbed-chips/TabbedChips' },

  // Aliased imports
  OldSelect: {
    value: OldSelect,
    source: '@coinbase/cds-web/controls/Select',
    exportedAs: 'Select',
  },
  OldSelectChip: {
    value: OldSelectChip,
    source: '@coinbase/cds-web/chips/SelectChip',
    exportedAs: 'SelectChip',
  },
  OldTabbedChips: {
    value: OldTabbedChips,
    source: '@coinbase/cds-web/chips/TabbedChips',
    exportedAs: 'TabbedChips',
  },

  // Alpha components from specific subpaths
  Combobox: { value: Combobox, source: '@coinbase/cds-web/alpha/combobox/Combobox' },
  DataCard: { value: DataCard, source: '@coinbase/cds-web/alpha/data-card' },

  // Components not exported from their barrel
  InputLabel: { value: InputLabel, source: '@coinbase/cds-web/controls/InputLabel' },
  useToast: { value: useToast, source: '@coinbase/cds-web/overlays/useToast' },
  useSortableCell: {
    value: useSortableCell,
    source: '@coinbase/cds-web/tables/hooks/useSortableCell',
  },
  defaultTheme: { value: defaultTheme, source: '@coinbase/cds-web/themes/defaultTheme' },

  // CDS web hooks (no barrel for hooks/)
  useA11yControlledVisibility: {
    value: useA11yControlledVisibility,
    source: '@coinbase/cds-web/hooks/useA11yControlledVisibility',
  },
  useBreakpoints: { value: useBreakpoints, source: '@coinbase/cds-web/hooks/useBreakpoints' },
  useCheckboxGroupState: {
    value: useCheckboxGroupState,
    source: '@coinbase/cds-web/hooks/useCheckboxGroupState',
  },
  useDimensions: { value: useDimensions, source: '@coinbase/cds-web/hooks/useDimensions' },
  useHasMounted: { value: useHasMounted, source: '@coinbase/cds-web/hooks/useHasMounted' },
  useIsoEffect: { value: useIsoEffect, source: '@coinbase/cds-web/hooks/useIsoEffect' },
  useMediaQuery: { value: useMediaQuery, source: '@coinbase/cds-web/hooks/useMediaQuery' },
  useScrollBlocker: { value: useScrollBlocker, source: '@coinbase/cds-web/hooks/useScrollBlocker' },
  useTheme: { value: useTheme, source: '@coinbase/cds-web/hooks/useTheme' },

  // CDS common hooks & providers
  useAlert: { value: useAlert, source: '@coinbase/cds-common/overlays/useAlert' },
  useModal: { value: useModal, source: '@coinbase/cds-common/overlays/useModal' },
  OverlayContentContext: {
    value: OverlayContentContext,
    source: '@coinbase/cds-common/overlays/OverlayContentContext',
  },
  useOverlayContentContext: {
    value: useOverlayContentContext,
    source: '@coinbase/cds-common/overlays/OverlayContentContext',
  },
  useMultiSelect: { value: useMultiSelect, source: '@coinbase/cds-common/select/useMultiSelect' },
  useStepper: { value: useStepper, source: '@coinbase/cds-common/stepper/useStepper' },
  useTabsContext: { value: useTabsContext, source: '@coinbase/cds-common/tabs/TabsContext' },
  useTourContext: { value: useTourContext, source: '@coinbase/cds-common/tour/TourContext' },
  useSort: { value: useSort, source: '@coinbase/cds-common/hooks/useSort' },
  useEventHandler: { value: useEventHandler, source: '@coinbase/cds-common/hooks/useEventHandler' },
  useMergeRefs: { value: useMergeRefs, source: '@coinbase/cds-common/hooks/useMergeRefs' },
  usePreviousValue: {
    value: usePreviousValue,
    source: '@coinbase/cds-common/hooks/usePreviousValue',
  },
  useRefMap: { value: useRefMap, source: '@coinbase/cds-common/hooks/useRefMap' },
  useSparklineArea: {
    value: useSparklineArea,
    source: '@coinbase/cds-common/visualizations/useSparklineArea',
  },
  useSparklinePath: {
    value: useSparklinePath,
    source: '@coinbase/cds-common/visualizations/useSparklinePath',
  },
  LocaleProvider: { value: LocaleProvider, source: '@coinbase/cds-common/system/LocaleProvider' },
  DateInputValidationError: {
    value: DateInputValidationError,
    source: '@coinbase/cds-common/dates/DateInputValidationError',
  },
  avatarDotSizeMap: { value: avatarDotSizeMap, source: '@coinbase/cds-common/tokens/dot' },
  avatarIconSizeMap: { value: avatarIconSizeMap, source: '@coinbase/cds-common/tokens/dot' },

  // CDS common data
  btcCandles: {
    value: btcCandles,
    source: '@coinbase/cds-common/internal/data/candles',
    exportedAs: 'candles',
  },
  loremIpsum: { value: loremIpsum, source: '@coinbase/cds-common/internal/data/loremIpsum' },
  prices: { value: prices, source: '@coinbase/cds-common/internal/data/prices' },
  product: { value: product, source: '@coinbase/cds-common/internal/data/product' },
  users: { value: users, source: '@coinbase/cds-common/internal/data/users' },
  sparklineInteractiveData: {
    value: sparklineInteractiveData,
    source: '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData',
  },
  sparklineInteractiveHoverData: {
    value: sparklineInteractiveHoverData,
    source: '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData',
  },
};

const liveScope: Record<string, unknown> = { React };
const importMapResult: Record<string, ImportMapEntry> = {};

for (const [ns, source] of namespaceRegistrations) {
  Object.assign(liveScope, ns);
  for (const key of Object.keys(ns)) {
    if (key.startsWith('_') || key === '__esModule') continue;
    if (typeof (ns as Record<string, unknown>)[key] === 'undefined') continue;
    importMapResult[key] = { source };
  }
}

for (const [name, entry] of Object.entries(explicitRegistrations)) {
  liveScope[name] = entry.value;
  importMapResult[name] = {
    source: entry.source,
    ...(entry.exportedAs ? { exportedAs: entry.exportedAs } : {}),
  };
}

export const sandboxImportMap: Record<string, ImportMapEntry> = importMapResult;
export default liveScope;
