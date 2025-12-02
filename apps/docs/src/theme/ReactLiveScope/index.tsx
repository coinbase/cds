import React from 'react';
import { DateInputValidationError } from '@cbhq/cds-common/dates/DateInputValidationError';
import { useEventHandler } from '@cbhq/cds-common/hooks/useEventHandler';
import { useMergeRefs } from '@cbhq/cds-common/hooks/useMergeRefs';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import { useRefMap } from '@cbhq/cds-common/hooks/useRefMap';
import { useSort } from '@cbhq/cds-common/hooks/useSort';
import { accounts } from '@cbhq/cds-common/internal/data/accounts';
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
import { Accordion } from '@cbhq/cds-web/accordion/Accordion';
import { AccordionItem } from '@cbhq/cds-web/accordion/AccordionItem';
import { Select } from '@cbhq/cds-web/alpha/select/Select';
import { TabbedChips } from '@cbhq/cds-web/alpha/tabbed-chips/TabbedChips';
import { Lottie, LottieStatusAnimation } from '@cbhq/cds-web/animation';
import { Banner } from '@cbhq/cds-web/banner/Banner';
import * as CDSButtons from '@cbhq/cds-web/buttons';
import { ContainedAssetCard } from '@cbhq/cds-web/cards/ContainedAssetCard';
import * as ContentCardComponents from '@cbhq/cds-web/cards/ContentCard';
import { FloatingAssetCard } from '@cbhq/cds-web/cards/FloatingAssetCard';
import { NudgeCard } from '@cbhq/cds-web/cards/NudgeCard';
import { UpsellCard } from '@cbhq/cds-web/cards/UpsellCard';
import {
  Carousel,
  CarouselItem,
  DefaultCarouselNavigation,
  DefaultCarouselPagination,
} from '@cbhq/cds-web/carousel';
import * as CDSCells from '@cbhq/cds-web/cells';
import { Chip } from '@cbhq/cds-web/chips/Chip';
import { InputChip } from '@cbhq/cds-web/chips/InputChip';
import { MediaChip } from '@cbhq/cds-web/chips/MediaChip';
import { SelectChip } from '@cbhq/cds-web/chips/SelectChip';
import { TabbedChips as OldTabbedChips } from '@cbhq/cds-web/chips/TabbedChips';
import { Coachmark } from '@cbhq/cds-web/coachmark/Coachmark';
import { Collapsible } from '@cbhq/cds-web/collapsible/Collapsible';
import * as CDSControls from '@cbhq/cds-web/controls';
import { InputLabel } from '@cbhq/cds-web/controls/InputLabel';
import { Select as OldSelect } from '@cbhq/cds-web/controls/Select';
import { Calendar } from '@cbhq/cds-web/dates/Calendar';
import { DatePicker } from '@cbhq/cds-web/dates/DatePicker';
import * as CDSDots from '@cbhq/cds-web/dots';
import { Dropdown } from '@cbhq/cds-web/dropdown/Dropdown';
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
import { Spinner } from '@cbhq/cds-web/loaders/Spinner';
import * as CDSMedia from '@cbhq/cds-web/media';
import { MultiContentModule } from '@cbhq/cds-web/multi-content-module/MultiContentModule';
import * as CDSNavigation from '@cbhq/cds-web/navigation';
import * as CDSNumbers from '@cbhq/cds-web/numbers';
import * as CDSOverlays from '@cbhq/cds-web/overlays';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { PageFooter } from '@cbhq/cds-web/page/PageFooter';
import { PageHeader } from '@cbhq/cds-web/page/PageHeader';
import { Pagination } from '@cbhq/cds-web/pagination/Pagination';
import { usePagination } from '@cbhq/cds-web/pagination/usePagination';
import { SectionHeader } from '@cbhq/cds-web/section-header/SectionHeader';
import { Stepper } from '@cbhq/cds-web/stepper/Stepper';
import * as CDSSystem from '@cbhq/cds-web/system';
import { MediaQueryProvider } from '@cbhq/cds-web/system/MediaQueryProvider';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import * as CDSTables from '@cbhq/cds-web/tables';
import { useSortableCell } from '@cbhq/cds-web/tables/hooks/useSortableCell';
import * as CDSTabs from '@cbhq/cds-web/tabs';
import { Tag } from '@cbhq/cds-web/tag/Tag';
import { defaultTheme } from '@cbhq/cds-web/themes/defaultTheme';
import { Tour } from '@cbhq/cds-web/tour/Tour';
import { TourStep } from '@cbhq/cds-web/tour/TourStep';
import * as CDSTypography from '@cbhq/cds-web/typography';
import * as CDSVisualizations from '@cbhq/cds-web/visualizations';
import * as CDSChartComponents from '@cbhq/cds-web-visualization/chart';
import * as CDSSparklineComponents from '@cbhq/cds-web-visualization/sparkline';
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
  OldSelect,
  useMultiSelect,
  ...CDSSystem,
  MediaQueryProvider,
  // chips
  Chip,
  InputChip,
  MediaChip,
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
