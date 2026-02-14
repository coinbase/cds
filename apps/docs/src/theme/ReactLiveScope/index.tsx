/**
 * ReactLiveScope — single source of truth for both the react-live playground
 * scope AND the StackBlitz import map.
 *
 * HOW TO ADD A NEW IDENTIFIER:
 *
 *   Barrel package (e.g. a new component in @coinbase/cds-web/buttons):
 *     → Nothing to do! The namespace registration auto-captures it.
 *
 *   Individual import (e.g. a new hook or component from a specific subpath):
 *     1. Add the import statement at the top of this file
 *     2. Add ONE entry to `explicitRegistrations` below
 *
 *   Docs-only (not available on npm, e.g. a local docs helper component):
 *     1. Add the import statement at the top of this file
 *     2. Add to the `scopeOnlyEntries` object below
 */

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
import { Accordion } from '@coinbase/cds-web/accordion/Accordion';
import { AccordionItem } from '@coinbase/cds-web/accordion/AccordionItem';
import { Combobox } from '@coinbase/cds-web/alpha/combobox/Combobox';
import { DataCard } from '@coinbase/cds-web/alpha/data-card';
import { Select } from '@coinbase/cds-web/alpha/select/Select';
import { SelectChip } from '@coinbase/cds-web/alpha/select-chip/SelectChip';
import { TabbedChips } from '@coinbase/cds-web/alpha/tabbed-chips/TabbedChips';
import { Lottie, LottieStatusAnimation } from '@coinbase/cds-web/animation';
import { Banner } from '@coinbase/cds-web/banner/Banner';
import * as CDSButtons from '@coinbase/cds-web/buttons';
import {
  ContainedAssetCard,
  FloatingAssetCard,
  MediaCard,
  MessagingCard,
  NudgeCard,
  UpsellCard,
} from '@coinbase/cds-web/cards';
import * as ContentCardComponents from '@coinbase/cds-web/cards/ContentCard';
import {
  Carousel,
  CarouselItem,
  DefaultCarouselNavigation,
  DefaultCarouselPagination,
  useCarouselAutoplayContext,
} from '@coinbase/cds-web/carousel';
import * as CDSCells from '@coinbase/cds-web/cells';
import { Chip } from '@coinbase/cds-web/chips/Chip';
import { InputChip } from '@coinbase/cds-web/chips/InputChip';
import { MediaChip } from '@coinbase/cds-web/chips/MediaChip';
import { SelectChip as OldSelectChip } from '@coinbase/cds-web/chips/SelectChip';
import { TabbedChips as OldTabbedChips } from '@coinbase/cds-web/chips/TabbedChips';
import { Coachmark } from '@coinbase/cds-web/coachmark/Coachmark';
import { Collapsible } from '@coinbase/cds-web/collapsible/Collapsible';
import * as CDSControls from '@coinbase/cds-web/controls';
import { InputLabel } from '@coinbase/cds-web/controls/InputLabel';
import { Select as OldSelect } from '@coinbase/cds-web/controls/Select';
import * as CDSDates from '@coinbase/cds-web/dates';
import * as CDSDots from '@coinbase/cds-web/dots';
import { Dropdown } from '@coinbase/cds-web/dropdown/Dropdown';
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
import { Spinner } from '@coinbase/cds-web/loaders/Spinner';
import * as CDSMedia from '@coinbase/cds-web/media';
import { MultiContentModule } from '@coinbase/cds-web/multi-content-module/MultiContentModule';
import * as CDSNavigation from '@coinbase/cds-web/navigation';
import * as CDSNumbers from '@coinbase/cds-web/numbers';
import * as CDSOverlays from '@coinbase/cds-web/overlays';
import { useToast } from '@coinbase/cds-web/overlays/useToast';
import { PageFooter } from '@coinbase/cds-web/page/PageFooter';
import { PageHeader } from '@coinbase/cds-web/page/PageHeader';
import { Pagination } from '@coinbase/cds-web/pagination/Pagination';
import { usePagination } from '@coinbase/cds-web/pagination/usePagination';
import { SectionHeader } from '@coinbase/cds-web/section-header/SectionHeader';
import * as StepperComponents from '@coinbase/cds-web/stepper';
import * as CDSSystem from '@coinbase/cds-web/system';
import { MediaQueryProvider } from '@coinbase/cds-web/system/MediaQueryProvider';
import { ThemeProvider } from '@coinbase/cds-web/system/ThemeProvider';
import * as CDSTables from '@coinbase/cds-web/tables';
import { useSortableCell } from '@coinbase/cds-web/tables/hooks/useSortableCell';
import * as CDSTabs from '@coinbase/cds-web/tabs';
import { Tag } from '@coinbase/cds-web/tag/Tag';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import { Tour } from '@coinbase/cds-web/tour/Tour';
import { TourStep } from '@coinbase/cds-web/tour/TourStep';
import * as CDSTypography from '@coinbase/cds-web/typography';
import * as CDSVisualizations from '@coinbase/cds-web/visualizations';
import * as CDSChartComponents from '@coinbase/cds-web-visualization/chart';
import * as CDSSparklineComponents from '@coinbase/cds-web-visualization/sparkline';
import { JSONCodeBlock } from '@site/src/components/page/JSONCodeBlock';
import * as framerMotion from 'framer-motion';

import { SparklineInteractivePrice, SparklineInteractivePriceWithHeader } from '../Sparkline';

// =============================================================================
// Types
// =============================================================================

export type ImportMapEntry = {
  source: string;
  /** When the local name differs from the exported name, e.g. { candles as btcCandles } */
  exportedAs?: string;
};

// =============================================================================
// Namespace registrations
//
// All runtime exports are auto-captured for BOTH the scope and import map.
// When a new component is added to one of these barrel packages, it's
// automatically available — no changes needed.
// =============================================================================

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
];

// =============================================================================
// Explicit registrations
//
// Each entry provides the runtime value, its npm import path, and an optional
// alias. These are used for identifiers that come from specific subpaths
// (not in a barrel above), or that override a barrel export with a different
// package (e.g. Select from alpha instead of controls).
//
// To add a new identifier:
//   1. Add the import statement at the top of this file
//   2. Add one entry here — that's it!
// =============================================================================

type ExplicitEntry = { value: unknown; source: string; exportedAs?: string };

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
  btcCandles: {
    value: btcCandles,
    source: '@coinbase/cds-common/internal/data/candles',
    exportedAs: 'candles',
  },

  // Components from specific subpaths
  Accordion: { value: Accordion, source: '@coinbase/cds-web/accordion/Accordion' },
  AccordionItem: { value: AccordionItem, source: '@coinbase/cds-web/accordion/AccordionItem' },
  Combobox: { value: Combobox, source: '@coinbase/cds-web/alpha/combobox/Combobox' },
  DataCard: { value: DataCard, source: '@coinbase/cds-web/alpha/data-card' },
  Lottie: { value: Lottie, source: '@coinbase/cds-web/animation' },
  LottieStatusAnimation: { value: LottieStatusAnimation, source: '@coinbase/cds-web/animation' },
  Banner: { value: Banner, source: '@coinbase/cds-web/banner/Banner' },
  ContainedAssetCard: { value: ContainedAssetCard, source: '@coinbase/cds-web/cards' },
  FloatingAssetCard: { value: FloatingAssetCard, source: '@coinbase/cds-web/cards' },
  MediaCard: { value: MediaCard, source: '@coinbase/cds-web/cards' },
  MessagingCard: { value: MessagingCard, source: '@coinbase/cds-web/cards' },
  NudgeCard: { value: NudgeCard, source: '@coinbase/cds-web/cards' },
  UpsellCard: { value: UpsellCard, source: '@coinbase/cds-web/cards' },
  Carousel: { value: Carousel, source: '@coinbase/cds-web/carousel' },
  CarouselItem: { value: CarouselItem, source: '@coinbase/cds-web/carousel' },
  DefaultCarouselNavigation: {
    value: DefaultCarouselNavigation,
    source: '@coinbase/cds-web/carousel',
  },
  DefaultCarouselPagination: {
    value: DefaultCarouselPagination,
    source: '@coinbase/cds-web/carousel',
  },
  useCarouselAutoplayContext: {
    value: useCarouselAutoplayContext,
    source: '@coinbase/cds-web/carousel',
  },
  Chip: { value: Chip, source: '@coinbase/cds-web/chips/Chip' },
  InputChip: { value: InputChip, source: '@coinbase/cds-web/chips/InputChip' },
  MediaChip: { value: MediaChip, source: '@coinbase/cds-web/chips/MediaChip' },
  Coachmark: { value: Coachmark, source: '@coinbase/cds-web/coachmark/Coachmark' },
  Collapsible: { value: Collapsible, source: '@coinbase/cds-web/collapsible/Collapsible' },
  InputLabel: { value: InputLabel, source: '@coinbase/cds-web/controls/InputLabel' },
  Dropdown: { value: Dropdown, source: '@coinbase/cds-web/dropdown/Dropdown' },
  Spinner: { value: Spinner, source: '@coinbase/cds-web/loaders/Spinner' },
  MultiContentModule: {
    value: MultiContentModule,
    source: '@coinbase/cds-web/multi-content-module/MultiContentModule',
  },
  PageFooter: { value: PageFooter, source: '@coinbase/cds-web/page/PageFooter' },
  PageHeader: { value: PageHeader, source: '@coinbase/cds-web/page/PageHeader' },
  Pagination: { value: Pagination, source: '@coinbase/cds-web/pagination/Pagination' },
  SectionHeader: { value: SectionHeader, source: '@coinbase/cds-web/section-header/SectionHeader' },
  Tag: { value: Tag, source: '@coinbase/cds-web/tag/Tag' },
  Tour: { value: Tour, source: '@coinbase/cds-web/tour/Tour' },
  TourStep: { value: TourStep, source: '@coinbase/cds-web/tour/TourStep' },
  defaultTheme: { value: defaultTheme, source: '@coinbase/cds-web/themes/defaultTheme' },

  // Subpath overrides (prefer specific path over barrel for these)
  MediaQueryProvider: {
    value: MediaQueryProvider,
    source: '@coinbase/cds-web/system/MediaQueryProvider',
  },
  ThemeProvider: { value: ThemeProvider, source: '@coinbase/cds-web/system/ThemeProvider' },
  useToast: { value: useToast, source: '@coinbase/cds-web/overlays/useToast' },
  useSortableCell: {
    value: useSortableCell,
    source: '@coinbase/cds-web/tables/hooks/useSortableCell',
  },
  usePagination: { value: usePagination, source: '@coinbase/cds-web/pagination/usePagination' },

  // CDS web hooks
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

// =============================================================================
// Scope-only entries — docs-internal components not available on npm.
// These are added to the react-live scope but NOT to the StackBlitz import map.
// =============================================================================

const scopeOnlyEntries: Record<string, unknown> = {
  JSONCodeBlock,
  SparklineInteractivePrice,
  SparklineInteractivePriceWithHeader,
};

// =============================================================================
// Build scope + import map from the registrations above
// =============================================================================

const scope: Record<string, unknown> = { React };
const importMapResult: Record<string, ImportMapEntry> = {};

// Process namespaces — auto-capture all runtime exports
for (const [ns, source] of namespaceRegistrations) {
  Object.assign(scope, ns);
  for (const key of Object.keys(ns)) {
    if (key.startsWith('_') || key === '__esModule') continue;
    if (typeof (ns as Record<string, unknown>)[key] === 'undefined') continue;
    importMapResult[key] = { source };
  }
}

// Process explicit entries — overrides namespace entries where needed
for (const [name, entry] of Object.entries(explicitRegistrations)) {
  scope[name] = entry.value;
  importMapResult[name] = {
    source: entry.source,
    ...(entry.exportedAs ? { exportedAs: entry.exportedAs } : {}),
  };
}

// Process scope-only entries (no import map counterpart)
Object.assign(scope, scopeOnlyEntries);

// =============================================================================
// Exports
// =============================================================================

/** Import map for StackBlitz export — maps identifier names to package paths. */
export const stackBlitzImportMap: Record<string, ImportMapEntry> = importMapResult;

/** Scope object for react-live LiveProvider. */
export default scope;
