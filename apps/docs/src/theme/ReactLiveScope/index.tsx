import React from 'react';
import { DateInputValidationError } from '@cbhq/cds-common/dates/DateInputValidationError';
import { useEventHandler } from '@cbhq/cds-common/hooks/useEventHandler';
import { useMergeRefs } from '@cbhq/cds-common/hooks/useMergeRefs';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import { useRefMap } from '@cbhq/cds-common/hooks/useRefMap';
import { useSort } from '@cbhq/cds-common/hooks/useSort';
import * as CDSDataAccounts from '@cbhq/cds-common/internal/data/accounts';
import * as CDSDataAssets from '@cbhq/cds-common/internal/data/assets';
import { candles as btcCandles } from '@cbhq/cds-common/internal/data/candles';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import { product } from '@cbhq/cds-common/internal/data/product';
import { users } from '@cbhq/cds-common/internal/data/users';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
} from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import {
  OverlayContentContext,
  useOverlayContentContext,
} from '@cbhq/cds-common/overlays/OverlayContentContext';
import { useAlert } from '@cbhq/cds-common/overlays/useAlert';
import { useModal } from '@cbhq/cds-common/overlays/useModal';
import { useMultiSelect } from '@cbhq/cds-common/select/useMultiSelect';
import { useStepper } from '@cbhq/cds-common/stepper/useStepper';
import { LocaleProvider } from '@cbhq/cds-common/system/LocaleProvider';
import { useTabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { avatarDotSizeMap, avatarIconSizeMap } from '@cbhq/cds-common/tokens/dot';
import { useTourContext } from '@cbhq/cds-common/tour/TourContext';
import { useSparklineArea } from '@cbhq/cds-common/visualizations/useSparklineArea';
import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';
import * as CDSLottie from '@cbhq/cds-lottie-files';
import * as CDSAccordion from '@cbhq/cds-web/accordion';
import { Combobox } from '@cbhq/cds-web/alpha/combobox/Combobox';
import { DataCard } from '@cbhq/cds-web/alpha/data-card';
import { Select } from '@cbhq/cds-web/alpha/select/Select';
import { SelectChip } from '@cbhq/cds-web/alpha/select-chip/SelectChip';
import { TabbedChips } from '@cbhq/cds-web/alpha/tabbed-chips/TabbedChips';
import * as CDSAnimation from '@cbhq/cds-web/animation';
import * as CDSBanner from '@cbhq/cds-web/banner';
import * as CDSButtons from '@cbhq/cds-web/buttons';
import * as CDSCards from '@cbhq/cds-web/cards';
import * as ContentCardComponents from '@cbhq/cds-web/cards/ContentCard';
import * as CDSCarousel from '@cbhq/cds-web/carousel';
import * as CDSCells from '@cbhq/cds-web/cells';
import * as CDSChips from '@cbhq/cds-web/chips';
import { SelectChip as OldSelectChip } from '@cbhq/cds-web/chips/SelectChip';
import { TabbedChips as OldTabbedChips } from '@cbhq/cds-web/chips/TabbedChips';
import * as CDSCoachmark from '@cbhq/cds-web/coachmark';
import * as CDSCollapsible from '@cbhq/cds-web/collapsible';
import * as CDSControls from '@cbhq/cds-web/controls';
import { InputLabel } from '@cbhq/cds-web/controls/InputLabel';
import { Select as OldSelect } from '@cbhq/cds-web/controls/Select';
import * as CDSDates from '@cbhq/cds-web/dates';
import * as CDSDots from '@cbhq/cds-web/dots';
import * as CDSDropdown from '@cbhq/cds-web/dropdown';
import { useA11yControlledVisibility } from '@cbhq/cds-web/hooks/useA11yControlledVisibility';
import { useBreakpoints } from '@cbhq/cds-web/hooks/useBreakpoints';
import { useCheckboxGroupState } from '@cbhq/cds-web/hooks/useCheckboxGroupState';
import { useDimensions } from '@cbhq/cds-web/hooks/useDimensions';
import { useHasMounted } from '@cbhq/cds-web/hooks/useHasMounted';
import { useIsoEffect } from '@cbhq/cds-web/hooks/useIsoEffect';
import { useMediaQuery } from '@cbhq/cds-web/hooks/useMediaQuery';
import { useScrollBlocker } from '@cbhq/cds-web/hooks/useScrollBlocker';
import { useTheme } from '@cbhq/cds-web/hooks/useTheme';
import * as CDSIcons from '@cbhq/cds-web/icons';
import * as CDSIllustrations from '@cbhq/cds-web/illustrations';
import * as CDSLayout from '@cbhq/cds-web/layout';
import * as CDSLoaders from '@cbhq/cds-web/loaders';
import * as CDSMedia from '@cbhq/cds-web/media';
import * as CDSMultiContentModule from '@cbhq/cds-web/multi-content-module';
import * as CDSNavigation from '@cbhq/cds-web/navigation';
import * as CDSNumbers from '@cbhq/cds-web/numbers';
import * as CDSOverlays from '@cbhq/cds-web/overlays';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import * as CDSPage from '@cbhq/cds-web/page';
import * as CDSPagination from '@cbhq/cds-web/pagination';
import * as CDSSectionHeader from '@cbhq/cds-web/section-header';
import * as StepperComponents from '@cbhq/cds-web/stepper';
import * as CDSSystem from '@cbhq/cds-web/system';
import { ComponentConfigProvider } from '@cbhq/cds-web/system/ComponentConfigProvider';
import * as CDSTables from '@cbhq/cds-web/tables';
import { useSortableCell } from '@cbhq/cds-web/tables/hooks/useSortableCell';
import * as CDSTabs from '@cbhq/cds-web/tabs';
import * as CDSTag from '@cbhq/cds-web/tag';
import { defaultTheme } from '@cbhq/cds-web/themes/defaultTheme';
import * as CDSTour from '@cbhq/cds-web/tour';
import * as CDSTypography from '@cbhq/cds-web/typography';
import * as CDSVisualizations from '@cbhq/cds-web/visualizations';
import * as CDSChartComponents from '@cbhq/cds-web-visualization/chart';
import * as CDSSparklineComponents from '@cbhq/cds-web-visualization/sparkline';
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
  [CDSLayout, '@cbhq/cds-web/layout'],
  [CDSButtons, '@cbhq/cds-web/buttons'],
  [CDSTypography, '@cbhq/cds-web/typography'],
  [CDSControls, '@cbhq/cds-web/controls'],
  [CDSOverlays, '@cbhq/cds-web/overlays'],
  [CDSTables, '@cbhq/cds-web/tables'],
  [CDSTabs, '@cbhq/cds-web/tabs'],
  [CDSNavigation, '@cbhq/cds-web/navigation'],
  [CDSSystem, '@cbhq/cds-web/system'],
  [CDSMedia, '@cbhq/cds-web/media'],
  [CDSIcons, '@cbhq/cds-web/icons'],
  [CDSIllustrations, '@cbhq/cds-web/illustrations'],
  [CDSCells, '@cbhq/cds-web/cells'],
  [CDSDots, '@cbhq/cds-web/dots'],
  [CDSDates, '@cbhq/cds-web/dates'],
  [CDSNumbers, '@cbhq/cds-web/numbers'],
  [CDSVisualizations, '@cbhq/cds-web/visualizations'],
  [CDSChartComponents, '@cbhq/cds-web-visualization/chart'],
  [CDSSparklineComponents, '@cbhq/cds-web-visualization/sparkline'],
  [StepperComponents, '@cbhq/cds-web/stepper'],
  [ContentCardComponents, '@cbhq/cds-web/cards/ContentCard'],
  [CDSDataAssets, '@cbhq/cds-common/internal/data/assets'],
  [CDSDataAccounts, '@cbhq/cds-common/internal/data/accounts'],
  [CDSLottie, '@cbhq/cds-lottie-files'],
  [framerMotion, 'framer-motion'],
  [CDSAccordion, '@cbhq/cds-web/accordion'],
  [CDSAnimation, '@cbhq/cds-web/animation'],
  [CDSBanner, '@cbhq/cds-web/banner'],
  [CDSCards, '@cbhq/cds-web/cards'],
  [CDSCarousel, '@cbhq/cds-web/carousel'],
  [CDSChips, '@cbhq/cds-web/chips'],
  [CDSCoachmark, '@cbhq/cds-web/coachmark'],
  [CDSCollapsible, '@cbhq/cds-web/collapsible'],
  [CDSDropdown, '@cbhq/cds-web/dropdown'],
  [CDSLoaders, '@cbhq/cds-web/loaders'],
  [CDSMultiContentModule, '@cbhq/cds-web/multi-content-module'],
  [CDSPage, '@cbhq/cds-web/page'],
  [CDSPagination, '@cbhq/cds-web/pagination'],
  [CDSSectionHeader, '@cbhq/cds-web/section-header'],
  [CDSTag, '@cbhq/cds-web/tag'],
  [CDSTour, '@cbhq/cds-web/tour'],
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
  Select: { value: Select, source: '@cbhq/cds-web/alpha/select/Select' },
  SelectChip: { value: SelectChip, source: '@cbhq/cds-web/alpha/select-chip/SelectChip' },
  TabbedChips: { value: TabbedChips, source: '@cbhq/cds-web/alpha/tabbed-chips/TabbedChips' },

  // Aliased imports
  OldSelect: {
    value: OldSelect,
    source: '@cbhq/cds-web/controls/Select',
    exportedAs: 'Select',
  },
  OldSelectChip: {
    value: OldSelectChip,
    source: '@cbhq/cds-web/chips/SelectChip',
    exportedAs: 'SelectChip',
  },
  OldTabbedChips: {
    value: OldTabbedChips,
    source: '@cbhq/cds-web/chips/TabbedChips',
    exportedAs: 'TabbedChips',
  },

  // Alpha components from specific subpaths
  Combobox: { value: Combobox, source: '@cbhq/cds-web/alpha/combobox/Combobox' },
  DataCard: { value: DataCard, source: '@cbhq/cds-web/alpha/data-card' },

  // Components not exported from their barrel
  InputLabel: { value: InputLabel, source: '@cbhq/cds-web/controls/InputLabel' },
  ComponentConfigProvider: {
    value: ComponentConfigProvider,
    source: '@cbhq/cds-web/system/ComponentConfigProvider',
  },
  useToast: { value: useToast, source: '@cbhq/cds-web/overlays/useToast' },
  useSortableCell: {
    value: useSortableCell,
    source: '@cbhq/cds-web/tables/hooks/useSortableCell',
  },
  defaultTheme: { value: defaultTheme, source: '@cbhq/cds-web/themes/defaultTheme' },

  // CDS web hooks (no barrel for hooks/)
  useA11yControlledVisibility: {
    value: useA11yControlledVisibility,
    source: '@cbhq/cds-web/hooks/useA11yControlledVisibility',
  },
  useBreakpoints: { value: useBreakpoints, source: '@cbhq/cds-web/hooks/useBreakpoints' },
  useCheckboxGroupState: {
    value: useCheckboxGroupState,
    source: '@cbhq/cds-web/hooks/useCheckboxGroupState',
  },
  useDimensions: { value: useDimensions, source: '@cbhq/cds-web/hooks/useDimensions' },
  useHasMounted: { value: useHasMounted, source: '@cbhq/cds-web/hooks/useHasMounted' },
  useIsoEffect: { value: useIsoEffect, source: '@cbhq/cds-web/hooks/useIsoEffect' },
  useMediaQuery: { value: useMediaQuery, source: '@cbhq/cds-web/hooks/useMediaQuery' },
  useScrollBlocker: { value: useScrollBlocker, source: '@cbhq/cds-web/hooks/useScrollBlocker' },
  useTheme: { value: useTheme, source: '@cbhq/cds-web/hooks/useTheme' },

  // CDS common hooks & providers
  useAlert: { value: useAlert, source: '@cbhq/cds-common/overlays/useAlert' },
  useModal: { value: useModal, source: '@cbhq/cds-common/overlays/useModal' },
  OverlayContentContext: {
    value: OverlayContentContext,
    source: '@cbhq/cds-common/overlays/OverlayContentContext',
  },
  useOverlayContentContext: {
    value: useOverlayContentContext,
    source: '@cbhq/cds-common/overlays/OverlayContentContext',
  },
  useMultiSelect: { value: useMultiSelect, source: '@cbhq/cds-common/select/useMultiSelect' },
  useStepper: { value: useStepper, source: '@cbhq/cds-common/stepper/useStepper' },
  useTabsContext: { value: useTabsContext, source: '@cbhq/cds-common/tabs/TabsContext' },
  useTourContext: { value: useTourContext, source: '@cbhq/cds-common/tour/TourContext' },
  useSort: { value: useSort, source: '@cbhq/cds-common/hooks/useSort' },
  useEventHandler: { value: useEventHandler, source: '@cbhq/cds-common/hooks/useEventHandler' },
  useMergeRefs: { value: useMergeRefs, source: '@cbhq/cds-common/hooks/useMergeRefs' },
  usePreviousValue: {
    value: usePreviousValue,
    source: '@cbhq/cds-common/hooks/usePreviousValue',
  },
  useRefMap: { value: useRefMap, source: '@cbhq/cds-common/hooks/useRefMap' },
  useSparklineArea: {
    value: useSparklineArea,
    source: '@cbhq/cds-common/visualizations/useSparklineArea',
  },
  useSparklinePath: {
    value: useSparklinePath,
    source: '@cbhq/cds-common/visualizations/useSparklinePath',
  },
  LocaleProvider: { value: LocaleProvider, source: '@cbhq/cds-common/system/LocaleProvider' },
  DateInputValidationError: {
    value: DateInputValidationError,
    source: '@cbhq/cds-common/dates/DateInputValidationError',
  },
  avatarDotSizeMap: { value: avatarDotSizeMap, source: '@cbhq/cds-common/tokens/dot' },
  avatarIconSizeMap: { value: avatarIconSizeMap, source: '@cbhq/cds-common/tokens/dot' },

  // CDS common data
  btcCandles: {
    value: btcCandles,
    source: '@cbhq/cds-common/internal/data/candles',
    exportedAs: 'candles',
  },
  loremIpsum: { value: loremIpsum, source: '@cbhq/cds-common/internal/data/loremIpsum' },
  prices: { value: prices, source: '@cbhq/cds-common/internal/data/prices' },
  product: { value: product, source: '@cbhq/cds-common/internal/data/product' },
  users: { value: users, source: '@cbhq/cds-common/internal/data/users' },
  sparklineInteractiveData: {
    value: sparklineInteractiveData,
    source: '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData',
  },
  sparklineInteractiveHoverData: {
    value: sparklineInteractiveHoverData,
    source: '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData',
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
