import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'doc',
      id: 'home/home',
      label: `CDS`, // This is hidden, but docusaurus does not allow empty label
      customProps: { hidden: true },
    },
    {
      type: 'category',
      label: 'Get started',
      customProps: {
        icon: 'compass',
        kbar: {
          icon: 'compass',
          description: 'How to get started with CDS',
        },
      },
      items: [
        'getting-started/introduction',
        'getting-started/installation/installation',
        'getting-started/templates/templates',
        // 'getting-started/api-overview/api-overview',
        'getting-started/theming/theming',
        'getting-started/styling/styling',
        'getting-started/playground',
        'getting-started/ai-overview',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      customProps: {
        icon: 'newsFeed',
        kbar: {
          icon: 'newsFeed',
          description: 'Docs for components',
        },
      },
      items: [
        {
          type: 'category',
          label: 'Layout',
          items: [
            {
              type: 'doc',
              id: 'components/layout/Accordion/accordion',
              label: 'Accordion',
            },
            {
              type: 'doc',
              id: 'components/layout/AccordionItem/accordionItem',
              label: 'AccordionItem',
            },
            {
              type: 'doc',
              id: 'components/layout/Box/box',
              label: 'Box',
            },
            {
              type: 'doc',
              id: 'components/layout/ButtonGroup/buttonGroup',
              label: 'ButtonGroup',
            },
            {
              type: 'doc',
              id: 'components/layout/Carousel/carousel',
              label: 'Carousel',
            },
            {
              type: 'doc',
              id: 'components/layout/Collapsible/collapsible',
              label: 'Collapsible',
            },
            { type: 'doc', id: 'components/layout/Divider/divider', label: 'Divider' },
            {
              type: 'doc',
              id: 'components/layout/Dropdown/dropdown',
              label: 'Dropdown',
            },
            { type: 'doc', id: 'components/layout/Grid/grid', label: 'Grid' },
            { type: 'doc', id: 'components/layout/GridColumn/gridColumn', label: 'GridColumn' },
            { type: 'doc', id: 'components/layout/HStack/hStack', label: 'HStack' },
            {
              type: 'doc',
              id: 'components/layout/MultiContentModule/multiContentModule',
              label: 'MultiContentModule',
            },
            { type: 'doc', id: 'components/layout/Spacer/spacer', label: 'Spacer' },
            { type: 'doc', id: 'components/layout/VStack/vStack', label: 'VStack' },
          ],
        },
        {
          type: 'category',
          label: 'Typography',
          items: [
            { type: 'doc', id: 'components/typography/Link/link', label: 'Link' },
            { type: 'doc', id: 'components/typography/Tag/tag', label: 'Tag' },
            { type: 'doc', id: 'components/typography/Text/text', label: 'Text' },
          ],
        },
        {
          type: 'category',
          label: 'Inputs',
          items: [
            {
              type: 'doc',
              id: 'components/inputs/AvatarButton/avatarButton',
              label: 'AvatarButton',
            },
            { type: 'doc', id: 'components/inputs/Button/button', label: 'Button' },
            {
              type: 'doc',
              id: 'components/inputs/SlideButton/slideButton',
              label: 'SlideButton',
            },
            {
              type: 'doc',
              id: 'components/inputs/Checkbox/checkbox',
              label: 'Checkbox',
            },
            {
              type: 'doc',
              id: 'components/inputs/CheckboxCell/checkboxCell',
              label: 'CheckboxCell',
            },
            {
              type: 'doc',
              id: 'components/inputs/CheckboxGroup/checkboxGroup',
              label: 'CheckboxGroup',
            },
            {
              type: 'doc',
              id: 'components/inputs/Combobox/combobox',
              label: 'Combobox (Alpha)',
            },
            {
              type: 'doc',
              id: 'components/inputs/ControlGroup/controlGroup',
              label: 'ControlGroup',
            },
            {
              type: 'doc',
              id: 'components/inputs/Chip/chip',
              label: 'Chip',
            },
            {
              type: 'doc',
              id: 'components/inputs/IconButton/iconButton',
              label: 'IconButton',
            },
            {
              type: 'doc',
              id: 'components/inputs/TileButton/tileButton',
              label: 'TileButton',
            },
            {
              type: 'doc',
              id: 'components/inputs/InputChip/input-chip',
              label: 'InputChip',
            },
            {
              type: 'doc',
              id: 'components/inputs/MediaChip/mediaChip',
              label: 'MediaChip',
            },
            {
              type: 'doc',
              id: 'components/inputs/Interactable/interactable',
              label: 'Interactable',
            },
            { type: 'doc', id: 'components/inputs/Numpad/numpad', label: 'Numpad' },
            {
              type: 'doc',
              id: 'components/inputs/Pressable/pressable',
              label: 'Pressable',
            },
            {
              type: 'doc',
              id: 'components/inputs/Radio/radio',
              label: 'Radio',
            },
            {
              type: 'doc',
              id: 'components/inputs/RadioCell/radioCell',
              label: 'RadioCell',
            },
            {
              type: 'doc',
              id: 'components/inputs/RadioGroup/radioGroup',
              label: 'RadioGroup',
            },
            {
              type: 'doc',
              id: 'components/inputs/SelectAlpha/select-alpha',
              label: 'Select (Alpha)',
            },
            { type: 'doc', id: 'components/inputs/Select/select', label: 'Select (Deprecated)' },
            {
              type: 'doc',
              id: 'components/inputs/SelectOption/selectOption',
              label: 'SelectOption',
            },
            {
              type: 'doc',
              id: 'components/inputs/SelectChipAlpha/selectChipAlpha',
              label: 'SelectChip (Alpha)',
            },
            {
              type: 'doc',
              id: 'components/inputs/SelectChip/selectChip',
              label: 'SelectChip (Deprecated)',
            },
            { type: 'doc', id: 'components/inputs/Switch/switch', label: 'Switch' },
            {
              type: 'doc',
              id: 'components/inputs/TextInput/textInput',
              label: 'TextInput',
            },
            {
              type: 'doc',
              id: 'components/inputs/SearchInput/searchInput',
              label: 'SearchInput',
            },
          ],
        },
        {
          type: 'category',
          label: 'Media',
          items: [
            {
              type: 'doc',
              id: 'components/media/Avatar/avatar',
              label: 'Avatar',
            },

            {
              type: 'doc',
              id: 'components/media/CellMedia/cell-media',
              label: 'CellMedia',
            },
            {
              type: 'doc',
              id: 'components/media/HeroSquare/heroSquare',
              label: 'HeroSquare',
            },
            { type: 'doc', id: 'components/media/Icon/icon', label: 'Icon' },
            {
              type: 'doc',
              id: 'components/media/LogoMark/logoMark',
              label: 'LogoMark',
            },
            {
              type: 'doc',
              id: 'components/media/LogoWordMark/logoWordMark',
              label: 'LogoWordMark',
            },
            {
              type: 'doc',
              id: 'components/media/Pictogram/pictogram',
              label: 'Pictogram',
            },
            {
              type: 'doc',
              id: 'components/media/RemoteImage/remoteImage',
              label: 'RemoteImage',
            },
            {
              type: 'doc',
              id: 'components/media/RemoteImageGroup/remoteImageGroup',
              label: 'RemoteImageGroup',
            },
            {
              type: 'doc',
              id: 'components/media/SpotIcon/spotIcon',
              label: 'SpotIcon',
            },
            {
              type: 'doc',
              id: 'components/media/SpotRectangle/spotRectangle',
              label: 'SpotRectangle',
            },
            {
              type: 'doc',
              id: 'components/media/SpotSquare/spotSquare',
              label: 'SpotSquare',
            },
            {
              type: 'doc',
              id: 'components/media/SubBrandLogoMark/subBrandLogoMark',
              label: 'SubBrandLogoMark',
            },
            {
              type: 'doc',
              id: 'components/media/SubBrandLogoWordMark/subBrandLogoWordMark',
              label: 'SubBrandLogoWordMark',
            },
          ],
        },
        {
          type: 'category',
          label: 'Cards',
          items: [
            {
              type: 'doc',
              id: 'components/cards/ContainedAssetCard/containedAssetCard',
              label: 'ContainedAssetCard',
            },
            {
              type: 'doc',
              id: 'components/cards/ContentCard/contentCard',
              label: 'ContentCard',
            },
            {
              type: 'doc',
              id: 'components/cards/ContentCardHeader/contentCardHeader',
              label: 'ContentCardHeader',
            },
            {
              type: 'doc',
              id: 'components/cards/ContentCardBody/contentCardBody',
              label: 'ContentCardBody',
            },
            {
              type: 'doc',
              id: 'components/cards/ContentCardFooter/contentCardFooter',
              label: 'ContentCardFooter',
            },
            {
              type: 'doc',
              id: 'components/cards/FloatingAssetCard/floatingAssetCard',
              label: 'FloatingAssetCard',
            },
            {
              type: 'doc',
              id: 'components/cards/NudgeCard/nudgeCard',
              label: 'NudgeCard',
            },
            {
              type: 'doc',
              id: 'components/cards/UpsellCard/upsellCard',
              label: 'UpsellCard',
            },
          ],
        },
        {
          type: 'category',
          label: 'Data Display',
          items: [
            {
              type: 'doc',
              id: 'components/data-display/ContentCell/content-cell',
              label: 'ContentCell',
            },
            { type: 'doc', id: 'components/data-display/ListCell/listCell', label: 'ListCell' },
            {
              type: 'doc',
              id: 'components/data-display/Table/table',
              label: 'Table',
            },
            {
              type: 'doc',
              id: 'components/data-display/TableBody/tableBody',
              label: 'TableBody',
            },
            {
              type: 'doc',
              id: 'components/data-display/TableCaption/tableCaption',
              label: 'TableCaption',
            },
            {
              type: 'doc',
              id: 'components/data-display/TableCell/tableCell',
              label: 'TableCell',
            },
            {
              type: 'doc',
              id: 'components/data-display/TableCellFallback/tableCellFallback',
              label: 'TableCellFallback',
            },
            {
              type: 'doc',
              id: 'components/data-display/TableFooter/tableFooter',
              label: 'TableFooter',
            },
            {
              type: 'doc',
              id: 'components/data-display/TableHeader/tableHeader',
              label: 'TableHeader',
            },
            {
              type: 'doc',
              id: 'components/data-display/TableRow/tableRow',
              label: 'TableRow',
            },
          ],
        },
        {
          type: 'category',
          label: 'Feedback',
          items: [
            { type: 'doc', id: 'components/feedback/Banner/banner', label: 'Banner' },
            {
              type: 'doc',
              id: 'components/feedback/Fallback/fallback',
              label: 'Fallback',
            },
            {
              type: 'doc',
              id: 'components/feedback/ProgressBar/progress-bar',
              label: 'ProgressBar',
            },
            {
              type: 'doc',
              id: 'components/feedback/ProgressBarWithFixedLabels/progress-bar-with-fixed-labels',
              label: 'ProgressBarWithFixedLabels',
            },
            {
              type: 'doc',
              id: 'components/feedback/ProgressBarWithFloatLabel/progress-bar-with-float-label',
              label: 'ProgressBarWithFloatLabel',
            },
            {
              type: 'doc',
              id: 'components/feedback/ProgressCircle/progress-circle',
              label: 'ProgressCircle',
            },
            {
              type: 'doc',
              id: 'components/feedback/Spinner/spinner',
              label: 'Spinner',
            },
          ],
        },
        {
          type: 'category',
          label: 'Overlay',
          items: [
            { type: 'doc', id: 'components/overlay/Alert/alert', label: 'Alert' },
            { type: 'doc', id: 'components/overlay/FocusTrap/focusTrap', label: 'FocusTrap' },
            {
              type: 'doc',
              id: 'components/overlay/FullscreenAlert/fullscreenAlert',
              label: 'FullscreenAlert',
            },
            {
              type: 'doc',
              id: 'components/overlay/FullscreenModal/fullScreenModal',
              label: 'FullscreenModal',
            },
            {
              type: 'doc',
              id: 'components/overlay/FullscreenModalLayout/fullscreenModalLayout',
              label: 'FullscreenModalLayout',
            },
            { type: 'doc', id: 'components/overlay/Modal/modal', label: 'Modal' },
            { type: 'doc', id: 'components/overlay/ModalHeader/modalHeader', label: 'ModalHeader' },
            { type: 'doc', id: 'components/overlay/ModalBody/modalBody', label: 'ModalBody' },
            { type: 'doc', id: 'components/overlay/ModalFooter/modalFooter', label: 'ModalFooter' },
            {
              type: 'doc',
              id: 'components/overlay/Overlay/overlay',
              label: 'Overlay',
            },
            {
              type: 'doc',
              id: 'components/overlay/PortalProvider/portalProvider',
              label: 'PortalProvider',
            },
            { type: 'doc', id: 'components/overlay/Toast/toast', label: 'Toast' },
            {
              type: 'doc',
              id: 'components/overlay/Tray/tray',
              label: 'Tray',
            },
            { type: 'doc', id: 'components/overlay/Tooltip/tooltip', label: 'Tooltip' },
          ],
        },
        {
          type: 'category',
          label: 'Navigation',
          items: [
            {
              type: 'doc',
              id: 'components/navigation/NavigationBar/navigationBar',
              label: 'NavigationBar',
            },
            {
              type: 'doc',
              id: 'components/navigation/NavigationTitle/navigationTitle',
              label: 'NavigationTitle',
            },
            {
              type: 'doc',
              id: 'components/navigation/NavigationTitleSelect/navigationTitleSelect',
              label: 'NavigationTitleSelect',
            },
            {
              type: 'doc',
              id: 'components/navigation/Pagination/pagination',
              label: 'Pagination',
            },
            {
              type: 'doc',
              id: 'components/navigation/PageHeader/pageHeader',
              label: 'PageHeader',
            },
            {
              type: 'doc',
              id: 'components/navigation/PageFooter/pageFooter',
              label: 'PageFooter',
            },
            {
              type: 'doc',
              id: 'components/navigation/SegmentedTabs/segmentedTabs',
              label: 'SegmentedTabs',
            },
            {
              type: 'doc',
              id: 'components/navigation/SectionHeader/sectionHeader',
              label: 'SectionHeader',
            },
            {
              type: 'doc',
              id: 'components/navigation/Sidebar/sidebar',
              label: 'Sidebar',
            },
            {
              type: 'doc',
              id: 'components/navigation/SidebarItem/sidebarItem',
              label: 'SidebarItem',
            },
            {
              type: 'doc',
              id: 'components/navigation/SidebarMoreMenu/sidebarMoreMenu',
              label: 'SidebarMoreMenu',
            },
            {
              type: 'doc',
              id: 'components/navigation/TabNavigation/tabNavigation',
              label: 'TabNavigation (Deprecated)',
            },
            {
              type: 'doc',
              id: 'components/navigation/TabLabel/tabLabel',
              label: 'TabLabel',
            },
            {
              type: 'doc',
              id: 'components/navigation/TabIndicator/tabIndicator',
              label: 'TabIndicator',
            },
            {
              type: 'doc',
              id: 'components/navigation/TabbedChips/tabbedChips',
              label: 'TabbedChips (Deprecated)',
            },
            {
              type: 'doc',
              id: 'components/navigation/TabbedChipsAlpha/tabbedChipsAlpha',
              label: 'TabbedChips (Alpha)',
            },
            {
              type: 'doc',
              id: 'components/navigation/Tour/tour',
              label: 'Tour',
            },
            {
              type: 'doc',
              id: 'components/navigation/Stepper/stepper',
              label: 'Stepper',
            },
            {
              type: 'doc',
              id: 'components/navigation/TopNavBar/topNavBar',
              label: 'TopNavBar',
            },
            {
              type: 'doc',
              id: 'components/navigation/BrowserBar/browserBar',
              label: 'BrowserBar',
            },
            { type: 'doc', id: 'components/navigation/Tabs/tabs', label: 'Tabs' },
            {
              type: 'doc',
              id: 'components/navigation/Coachmark/coachmark',
              label: 'Coachmark',
            },
          ],
        },
        {
          type: 'category',
          label: 'Graphs',
          items: [
            {
              type: 'doc',
              id: 'components/graphs/AreaChart/areaChart',
              label: 'AreaChart',
            },
            {
              type: 'doc',
              id: 'components/graphs/BarChart/barChart',
              label: 'BarChart',
            },
            {
              type: 'doc',
              id: 'components/graphs/CartesianChart/cartesianChart',
              label: 'CartesianChart',
            },
            {
              type: 'doc',
              id: 'components/graphs/LineChart/lineChart',
              label: 'LineChart',
            },
            {
              type: 'doc',
              id: 'components/graphs/ReferenceLine/referenceLine',
              label: 'ReferenceLine',
            },
            {
              type: 'doc',
              id: 'components/graphs/PeriodSelector/periodSelector',
              label: 'PeriodSelector',
            },
            {
              type: 'doc',
              id: 'components/graphs/Point/point',
              label: 'Point',
            },
            {
              type: 'doc',
              id: 'components/graphs/Scrubber/scrubber',
              label: 'Scrubber',
            },
            {
              type: 'doc',
              id: 'components/graphs/Sparkline/sparkline',
              label: 'Sparkline (Deprecated)',
            },
            {
              type: 'doc',
              id: 'components/graphs/SparklineGradient/sparklineGradient',
              label: 'SparklineGradient (Deprecated)',
            },
            {
              type: 'doc',
              id: 'components/graphs/SparklineInteractive/sparklineInteractive',
              label: 'SparklineInteractive (Deprecated)',
            },
            {
              type: 'doc',
              id: 'components/graphs/SparklineInteractiveHeader/sparklineInteractiveHeader',
              label: 'SparklineInteractiveHeader (Deprecated)',
            },
            {
              type: 'doc',
              id: 'components/graphs/XAxis/xAxis',
              label: 'XAxis',
            },
            {
              type: 'doc',
              id: 'components/graphs/YAxis/yAxis',
              label: 'YAxis',
            },
          ],
        },
        {
          type: 'category',
          label: 'Numbers',
          items: [
            {
              type: 'doc',
              id: 'components/numbers/RollingNumber/rollingNumber',
              label: 'RollingNumber',
            },
          ],
        },
        {
          type: 'category',
          label: 'Animation',
          items: [
            {
              type: 'doc',
              id: 'components/animation/Lottie/lottie',
              label: 'Lottie',
            },
            {
              type: 'doc',
              id: 'components/animation/LottieStatusAnimation/lottie-status-animation',
              label: 'LottieStatusAnimation',
            },
          ],
        },
        {
          type: 'category',
          label: 'Other',
          items: [
            {
              type: 'doc',
              id: 'components/other/Calendar/calendar',
              label: 'Calendar',
            },
            { type: 'doc', id: 'components/other/DateInput/date-input', label: 'DateInput' },
            { type: 'doc', id: 'components/other/DatePicker/date-picker', label: 'DatePicker' },
            { type: 'doc', id: 'components/other/DotCount/dot-count', label: 'DotCount' },
            {
              type: 'doc',
              id: 'components/other/DotStatusColor/dot-status-color',
              label: 'DotStatusColor',
            },
            {
              type: 'doc',
              id: 'components/other/DotSymbol/dot-symbol',
              label: 'DotSymbol',
            },
            {
              type: 'doc',
              id: 'components/other/MediaQueryProvider/mediaQueryProvider',
              label: 'MediaQueryProvider',
            },
            {
              type: 'doc',
              id: 'components/other/ThemeProvider/theme-provider',
              label: 'ThemeProvider',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Hooks',
      customProps: {
        icon: 'participate',
        kbar: {
          icon: 'participate',
          description: 'Docs for hooks',
        },
      },
      items: [
        {
          type: 'doc',
          id: 'hooks/useBreakpoints/useBreakpoints',
          label: 'useBreakpoints',
        },
        {
          type: 'doc',
          id: 'hooks/useDimensions/useDimensions',
          label: 'useDimensions',
        },
        {
          type: 'doc',
          id: 'hooks/useEventHandler/useEventHandler',
          label: 'useEventHandler',
        },
        {
          type: 'doc',
          id: 'hooks/useHasMounted/useHasMounted',
          label: 'useHasMounted',
        },
        {
          type: 'doc',
          id: 'hooks/useIsoEffect/useIsoEffect',
          label: 'useIsoEffect',
        },
        {
          type: 'doc',
          id: 'hooks/useMediaQuery/useMediaQuery',
          label: 'useMediaQuery',
        },
        {
          type: 'doc',
          id: 'hooks/useMergeRefs/useMergeRefs',
          label: 'useMergeRefs',
        },
        {
          type: 'doc',
          id: 'hooks/usePreviousValue/usePreviousValue',
          label: 'usePreviousValue',
        },
        {
          type: 'doc',
          id: 'hooks/useRefMap/useRefMap',
          label: 'useRefMap',
        },
        {
          type: 'doc',
          id: 'hooks/useScrollBlocker/useScrollBlocker',
          label: 'useScrollBlocker',
        },
        {
          type: 'doc',
          id: 'hooks/useTheme/useTheme',
          label: 'useTheme',
        },
        {
          type: 'doc',
          id: 'hooks/useOverlayContentContext/useOverlayContentContext',
          label: 'useOverlayContentContext',
        },
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Guides',
    //   customProps: {
    //     icon: 'application',
    //     kbar: {
    //       description: 'Guides for using CDS',
    //     },
    //   },
    //   items: [
    //     // {
    //     //   type: 'doc',
    //     //   id: 'guides/polymorphic-components',
    //     //   label: 'Polymorphic Components',
    //     // },
    //     // {
    //     //   type: 'doc',
    //     //   id: 'guides/integrate-with-build-tools',
    //     //   label: 'Integrate with Build Tools',
    //     // },
    //     // {
    //     //   type: 'doc',
    //     //   id: 'guides/build-new-components',
    //     //   label: 'Build New Components',
    //     // },
    //     // {
    //     //   type: 'doc',
    //     //   id: 'guides/contribute-guidelines',
    //     //   label: 'Contribute Guidelines',
    //     // },
    //     // {
    //     //   type: 'doc',
    //     //   id: 'guides/advanced-customization',
    //     //   label: 'Advanced Customization',
    //     // },
    //   ],
    // },
    {
      type: 'category',
      label: `Changelogs`,
      customProps: {
        icon: 'continuous',
        kbar: {
          icon: 'continuous',
          description: 'Changelogs for CDS packages',
        },
      },
      items: [
        {
          type: 'link',
          href: 'https://github.com/coinbase/cds/blob/master/packages/common/CHANGELOG.md',
          label: '@coinbase/cds-common',
          customProps: {
            kbar: {
              keywords: 'changelog',
            },
          },
        },
        {
          type: 'link',
          href: 'https://github.com/coinbase/cds/blob/master/packages/mobile/CHANGELOG.md',
          label: '@coinbase/cds-mobile',
          customProps: {
            kbar: {
              keywords: 'changelog',
            },
          },
        },
        {
          type: 'link',
          href: 'https://github.com/coinbase/cds/blob/master/packages/web/CHANGELOG.md',
          label: '@coinbase/cds-web',
          customProps: {
            kbar: {
              keywords: 'changelog',
            },
          },
        },
        {
          type: 'link',
          href: 'https://github.com/coinbase/cds/blob/master/packages/icons/CHANGELOG.md',
          label: '@coinbase/cds-icons',
          customProps: {
            kbar: {
              keywords: 'changelog',
            },
          },
        },
        {
          type: 'link',
          href: 'https://github.com/coinbase/cds/blob/master/packages/illustrations/CHANGELOG.md',
          label: '@coinbase/cds-illustrations',
          customProps: {
            kbar: {
              keywords: 'changelog',
            },
          },
        },
        {
          type: 'link',
          href: 'https://github.com/coinbase/cds/blob/master/packages/mobile-visualization/CHANGELOG.md',
          label: '@coinbase/cds-mobile-visualization',
          customProps: {
            kbar: {
              keywords: 'changelog',
            },
          },
        },
        {
          type: 'link',
          href: 'https://github.com/coinbase/cds/blob/master/packages/web-visualization/CHANGELOG.md',
          label: '@coinbase/cds-web-visualization',
          customProps: {
            kbar: {
              keywords: 'changelog',
            },
          },
        },
      ],
    },
  ],
};

export default sidebars;
