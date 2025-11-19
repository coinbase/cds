import React from 'react';
import { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { useEventHandler } from '@coinbase/cds-common/hooks/useEventHandler';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import { useSort } from '@coinbase/cds-common/hooks/useSort';
import { accounts } from '@coinbase/cds-common/internal/data/accounts';
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
import { Select } from '@coinbase/cds-web/alpha/select/Select';
import { SelectChip } from '@coinbase/cds-web/alpha/select-chip/SelectChip';
import { TabbedChips } from '@coinbase/cds-web/alpha/tabbed-chips/TabbedChips';
import { Lottie, LottieStatusAnimation } from '@coinbase/cds-web/animation';
import { Banner } from '@coinbase/cds-web/banner/Banner';
import * as CDSButtons from '@coinbase/cds-web/buttons';
import { ContainedAssetCard } from '@coinbase/cds-web/cards/ContainedAssetCard';
import * as ContentCardComponents from '@coinbase/cds-web/cards/ContentCard';
import { FloatingAssetCard } from '@coinbase/cds-web/cards/FloatingAssetCard';
import { NudgeCard } from '@coinbase/cds-web/cards/NudgeCard';
import { UpsellCard } from '@coinbase/cds-web/cards/UpsellCard';
import {
  Carousel,
  CarouselItem,
  DefaultCarouselNavigation,
  DefaultCarouselPagination,
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
import { Calendar } from '@coinbase/cds-web/dates/Calendar';
import { DatePicker } from '@coinbase/cds-web/dates/DatePicker';
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
import { Stepper } from '@coinbase/cds-web/stepper/Stepper';
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
import * as motion from 'framer-motion';

import { SparklineInteractivePrice, SparklineInteractivePriceWithHeader } from '../Sparkline';
// Add react-live imports you need here
const ReactLiveScope: Record<string, unknown> = {
  React,
  ...React,
  JSONCodeBlock,
  defaultTheme,
  // CDS tokens
  avatarDotSizeMap,
  avatarIconSizeMap,
  // hooks
  useA11yControlledVisibility,
  useCheckboxGroupState,
  useTheme,
  useMediaQuery,
  useToast,
  useAlert,
  useModal,
  OverlayContentContext,
  useOverlayContentContext,
  // layout
  ...CDSLayout,
  Collapsible,
  Accordion,
  AccordionItem,
  Carousel,
  CarouselItem,
  DefaultCarouselNavigation,
  DefaultCarouselPagination,
  Dropdown,
  ...CDSLottie,
  Lottie,
  LottieStatusAnimation,
  MultiContentModule,
  SectionHeader,
  // data display
  ...CDSCells,
  ...CDSTables,
  // cells
  ...CDSCells,
  useSort,
  useSortableCell,
  // overlays
  ...CDSOverlays,
  // navigation
  ...CDSNavigation,
  ...CDSTabs,
  Pagination,
  PageHeader,
  PageFooter,
  // tour
  Tour,
  TourStep,
  Coachmark,
  useTourContext,
  // stepper
  Stepper,
  useStepper,
  // typography
  ...CDSTypography,
  // numbers
  ...CDSNumbers,
  Tag,
  // input
  ...CDSButtons,
  ...CDSControls,
  InputLabel,
  Select,
  Combobox,
  OldSelect,
  useMultiSelect,
  ...CDSSystem,
  MediaQueryProvider,
  // chips
  Chip,
  InputChip,
  MediaChip,
  OldSelectChip,
  SelectChip,
  OldTabbedChips,
  TabbedChips,
  // loaders
  Spinner,
  // media
  ...CDSMedia,
  ...CDSIcons,
  ...CDSIllustrations,
  // cards
  ContainedAssetCard,
  FloatingAssetCard,
  NudgeCard,
  UpsellCard,
  ...ContentCardComponents,
  // visualizations
  btcCandles,
  ...CDSChartComponents,
  ...CDSVisualizations,
  ...CDSSparklineComponents,
  useSparklinePath,
  useSparklineArea,
  SparklineInteractivePrice,
  SparklineInteractivePriceWithHeader,
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
  // other
  ...CDSDots,
  DatePicker,
  Calendar,
  LocaleProvider,
  DateInputValidationError,
  Banner,
  // utils
  ...CDSDataAssets,
  ...CDSDataAccounts,
  loremIpsum,
  prices,
  accounts,
  users,
  product,
  ...motion,
  // hooks
  useBreakpoints,
  useDimensions,
  useScrollBlocker,
  useHasMounted,
  usePreviousValue,
  useIsoEffect,
  useMergeRefs,
  useRefMap,
  useEventHandler,
  usePagination,
  useTabsContext,
  ThemeProvider,
};

export default ReactLiveScope;
