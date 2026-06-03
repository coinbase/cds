export const meta = {
  name: 'code-connect-refresh',
  description:
    'Generate Figma Code Connect template files for all 80 CDS Core Components. Idempotent: reads progress file on startup and skips already-completed components.',
  phases: [
    { title: 'Initialize', detail: 'Read existing progress file, determine remaining work' },
    {
      title: 'Generate',
      detail: 'Generate Code Connect templates — max 4 agents in parallel (Figma MCP rate limit)',
    },
    { title: 'Report', detail: 'Write final progress summary and post to Linear issue CDS-2144' },
  ],
};

const FILE_KEY = 'k5CtyJccNQUGMI5bI4lJ2g';
const PROJECT_ROOT = '/Users/erichkuerschner/workspace/cds-public';
const PROGRESS_FILE = PROJECT_ROOT + '/.claude/code-connect-progress.json';

// All 80 CDS Core components from the CDS Figma Component URLs document (Linear doc 830e67d5).
// nodeId is in colon-format as required by Figma MCP APIs (hyphens → colons).
// platform: 'web' | 'mobile' | 'both'
const COMPONENTS = [
  // Layout
  {
    name: 'Accordion',
    section: 'Layout',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=148-2954',
    nodeId: '148:2954',
    platform: 'both',
  },
  {
    name: 'Carousel',
    section: 'Layout',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=48671-10433',
    nodeId: '48671:10433',
    platform: 'both',
  },
  {
    name: 'Card Carousel',
    section: 'Layout',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=48671-10271',
    nodeId: '48671:10271',
    platform: 'both',
  },
  {
    name: 'Divider (Horizontal)',
    section: 'Layout',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=283-19869',
    nodeId: '283:19869',
    platform: 'both',
  },
  {
    name: 'Divider (Vertical)',
    section: 'Layout',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=60-654',
    nodeId: '60:654',
    platform: 'both',
  },
  {
    name: 'MultiContentModule',
    section: 'Layout',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=14727-26365',
    nodeId: '14727:26365',
    platform: 'web',
  },
  // Actions
  {
    name: 'Button',
    section: 'Actions',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=89-3096',
    nodeId: '89:3096',
    platform: 'both',
  },
  {
    name: 'ButtonGroup',
    section: 'Actions',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=283-19617',
    nodeId: '283:19617',
    platform: 'both',
  },
  {
    name: 'IconButton',
    section: 'Actions',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=47-358',
    nodeId: '47:358',
    platform: 'both',
  },
  {
    name: 'IconButtonGroup',
    section: 'Actions',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=283-19688',
    nodeId: '283:19688',
    platform: 'both',
  },
  {
    name: 'Link',
    section: 'Actions',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=324-14982',
    nodeId: '324:14982',
    platform: 'both',
  },
  {
    name: 'SlideButton',
    section: 'Actions',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49598-10283',
    nodeId: '49598:10283',
    platform: 'both',
  },
  {
    name: 'TileButton',
    section: 'Actions',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=286-18370',
    nodeId: '286:18370',
    platform: 'both',
  },
  // Inputs
  {
    name: 'Checkbox',
    section: 'Inputs',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-9873',
    nodeId: '155:9873',
    platform: 'both',
  },
  {
    name: 'CheckboxCell',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=54927-2772',
    nodeId: '54927:2772',
    platform: 'both',
  },
  {
    name: 'CheckboxGroup',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-10032',
    nodeId: '155:10032',
    platform: 'both',
  },
  {
    name: 'DatePicker',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=14743-53206',
    nodeId: '14743:53206',
    platform: 'web',
  },
  {
    name: 'InputChip',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=10177-5161',
    nodeId: '10177:5161',
    platform: 'both',
  },
  {
    name: 'NativeTextArea',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=14089-46502',
    nodeId: '14089:46502',
    platform: 'both',
  },
  {
    name: 'Numpad',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=14012-4589',
    nodeId: '14012:4589',
    platform: 'mobile',
  },
  {
    name: 'RadioButton',
    section: 'Inputs',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-9979',
    nodeId: '155:9979',
    platform: 'both',
  },
  {
    name: 'RadioCell',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=54927-2624',
    nodeId: '54927:2624',
    platform: 'both',
  },
  {
    name: 'RadioGroup',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=355-14414',
    nodeId: '355:14414',
    platform: 'both',
  },
  {
    name: 'SearchInput (Desktop)',
    section: 'Inputs',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=67-767',
    nodeId: '67:767',
    platform: 'web',
  },
  {
    name: 'SearchInput (Mobile)',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=252-12575',
    nodeId: '252:12575',
    platform: 'mobile',
  },
  {
    name: 'Select',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=71762-14938',
    nodeId: '71762:14938',
    platform: 'both',
  },
  {
    name: 'SelectChip',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=10177-5222',
    nodeId: '10177:5222',
    platform: 'both',
  },
  {
    name: 'Switch',
    section: 'Inputs',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-9924',
    nodeId: '155:9924',
    platform: 'both',
  },
  {
    name: 'TextInput',
    section: 'Inputs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=252-16679',
    nodeId: '252:16679',
    platform: 'both',
  },
  // Media
  {
    name: 'Avatar',
    section: 'Media',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=60-643',
    nodeId: '60:643',
    platform: 'both',
  },
  {
    name: 'AvatarButton',
    section: 'Media',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=276-23400',
    nodeId: '276:23400',
    platform: 'both',
  },
  {
    name: 'DotSymbol',
    section: 'Media',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-12033',
    nodeId: '155:12033',
    platform: 'both',
  },
  // Cards
  {
    name: 'Content Card',
    section: 'Cards',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=72941-16019',
    nodeId: '72941:16019',
    platform: 'both',
  },
  {
    name: 'Data Card',
    section: 'Cards',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=72941-17832',
    nodeId: '72941:17832',
    platform: 'both',
  },
  {
    name: 'Media Card',
    section: 'Cards',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=72941-18302',
    nodeId: '72941:18302',
    platform: 'both',
  },
  {
    name: 'Messaging Card',
    section: 'Cards',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=72941-20711',
    nodeId: '72941:20711',
    platform: 'both',
  },
  // Content Display
  {
    name: 'List Cells',
    section: 'Content Display',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=62311-39845',
    nodeId: '62311:39845',
    platform: 'both',
  },
  {
    name: 'Rolling Numbers',
    section: 'Content Display',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=70552-507',
    nodeId: '70552:507',
    platform: 'both',
  },
  {
    name: 'TableCell',
    section: 'Content Display',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=8298-12299',
    nodeId: '8298:12299',
    platform: 'web',
  },
  {
    name: 'TableHeader',
    section: 'Content Display',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=8298-12088',
    nodeId: '8298:12088',
    platform: 'web',
  },
  // Status + Feedback
  {
    name: 'AssetProgressCircle',
    section: 'Status + Feedback',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=45256-228',
    nodeId: '45256:228',
    platform: 'both',
  },
  {
    name: 'Banner',
    section: 'Status + Feedback',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=17671-3736',
    nodeId: '17671:3736',
    platform: 'both',
  },
  {
    name: 'DotCount',
    section: 'Status + Feedback',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-11976',
    nodeId: '155:11976',
    platform: 'both',
  },
  {
    name: 'Fallback',
    section: 'Status + Feedback',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=731-14951',
    nodeId: '731:14951',
    platform: 'both',
  },
  {
    name: 'ProgressBar',
    section: 'Status + Feedback',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=64-746',
    nodeId: '64:746',
    platform: 'both',
  },
  {
    name: 'ProgressCircle',
    section: 'Status + Feedback',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=64-917',
    nodeId: '64:917',
    platform: 'both',
  },
  {
    name: 'Tag',
    section: 'Status + Feedback',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=68-996',
    nodeId: '68:996',
    platform: 'both',
  },
  // Overlay
  {
    name: 'Alert',
    section: 'Overlay',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=35-698',
    nodeId: '35:698',
    platform: 'both',
  },
  {
    name: 'Coachmark',
    section: 'Overlay',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=24997-8568',
    nodeId: '24997:8568',
    platform: 'both',
  },
  {
    name: 'Dropdown (ListCell)',
    section: 'Overlay',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=696-13841',
    nodeId: '696:13841',
    platform: 'both',
  },
  {
    name: 'Dropdown (Radio)',
    section: 'Overlay',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=71452-1267',
    nodeId: '71452:1267',
    platform: 'both',
  },
  {
    name: 'Dropdown (Custom)',
    section: 'Overlay',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=47410-8499',
    nodeId: '47410:8499',
    platform: 'both',
  },
  {
    name: 'FullScreenModal',
    section: 'Overlay',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49476-6084',
    nodeId: '49476:6084',
    platform: 'both',
  },
  {
    name: 'Modal',
    section: 'Overlay',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=68-1065',
    nodeId: '68:1065',
    platform: 'both',
  },
  {
    name: 'StickyFooter',
    section: 'Overlay',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=10340-69579',
    nodeId: '10340:69579',
    platform: 'both',
  },
  {
    name: 'Toast',
    section: 'Overlay',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=8500-674',
    nodeId: '8500:674',
    platform: 'both',
  },
  {
    name: 'Tooltip',
    section: 'Overlay',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=715-14162',
    nodeId: '715:14162',
    platform: 'web',
  },
  {
    name: 'Tray',
    section: 'Overlay',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=74148-11495',
    nodeId: '74148:11495',
    platform: 'both',
  },
  // Navigation
  {
    name: 'BottomTabBar',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49598-4408',
    nodeId: '49598:4408',
    platform: 'mobile',
  },
  {
    name: 'BrowserBar',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49598-4224',
    nodeId: '49598:4224',
    platform: 'mobile',
  },
  {
    name: 'NavigationBar',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=10414-896',
    nodeId: '10414:896',
    platform: 'both',
  },
  {
    name: 'NavLink',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=240-16872',
    nodeId: '240:16872',
    platform: 'web',
  },
  {
    name: 'NavLinkGroup',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=283-19790',
    nodeId: '283:19790',
    platform: 'web',
  },
  {
    name: 'PageFooter',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=17685-3266',
    nodeId: '17685:3266',
    platform: 'web',
  },
  {
    name: 'PageHeader',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=17685-3171',
    nodeId: '17685:3171',
    platform: 'web',
  },
  {
    name: 'Responsive PageHeader',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=17685-3213',
    nodeId: '17685:3213',
    platform: 'web',
  },
  {
    name: 'Pagination',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49607-6651',
    nodeId: '49607:6651',
    platform: 'web',
  },
  {
    name: 'SectionHeader',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=19270-19118',
    nodeId: '19270:19118',
    platform: 'both',
  },
  {
    name: 'SegmentedTabs',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=20859-2979',
    nodeId: '20859:2979',
    platform: 'both',
  },
  {
    name: 'Sidebar',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=252-13321',
    nodeId: '252:13321',
    platform: 'web',
  },
  {
    name: 'Sidebar Item',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=252-12892',
    nodeId: '252:12892',
    platform: 'web',
  },
  {
    name: 'Sidebar Label',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=55825-1620',
    nodeId: '55825:1620',
    platform: 'web',
  },
  {
    name: 'Stepper (Horizontal)',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=54927-8503',
    nodeId: '54927:8503',
    platform: 'both',
  },
  {
    name: 'Stepper (Vertical)',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=54927-8607',
    nodeId: '54927:8607',
    platform: 'both',
  },
  {
    name: 'TabbedChips',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=10188-4476',
    nodeId: '10188:4476',
    platform: 'both',
  },
  {
    name: 'TabNavigation',
    section: 'Navigation',
    figmaUrl: 'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=240-8930',
    nodeId: '240:8930',
    platform: 'both',
  },
  {
    name: 'TopNavBar',
    section: 'Navigation',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49598-4137',
    nodeId: '49598:4137',
    platform: 'mobile',
  },
  // Graphs (visualization package, web-only)
  {
    name: 'Bar Chart',
    section: 'Graphs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=60677-35156',
    nodeId: '60677:35156',
    platform: 'web',
  },
  {
    name: 'Percentage Bar Chart',
    section: 'Graphs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=80632-2295',
    nodeId: '80632:2295',
    platform: 'web',
  },
  {
    name: 'Line Charts',
    section: 'Graphs',
    figmaUrl:
      'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=60677-2698',
    nodeId: '60677:2698',
    platform: 'web',
  },
];

// Schema for structured output returned by each component agent
const RESULT_SCHEMA = {
  type: 'object',
  properties: {
    componentName: { type: 'string' },
    status: { type: 'string', enum: ['completed', 'skipped', 'rate_limited', 'failed'] },
    webTemplatePath: { type: 'string' },
    mobileTemplatePath: { type: 'string' },
    skipReason: { type: 'string' },
    skippedFigmaProperties: {
      type: 'array',
      items: {
        type: 'object',
        properties: { property: { type: 'string' }, reason: { type: 'string' } },
        required: ['property', 'reason'],
      },
    },
    figmaImprovementNotes: { type: 'string' },
    validationOutput: { type: 'string' },
    errorMessage: { type: 'string' },
  },
  required: ['componentName', 'status'],
};

// Schema for reading the progress file
const PROGRESS_READ_SCHEMA = {
  type: 'object',
  properties: {
    exists: { type: 'boolean' },
    content: { type: 'string' },
  },
  required: ['exists', 'content'],
};

function buildComponentPrompt(comp) {
  const platformNote =
    comp.platform === 'mobile'
      ? 'This component is mobile-only. Search packages/mobile/src/ as the primary package. Create only a mobile template — no web template needed.'
      : comp.platform === 'web'
        ? 'This component is web-only. Create only a web template. Skip the mobile check in Step 6.'
        : 'Check both packages. Create the web template first, then in Step 6 create a mobile copy if the component also exists in packages/mobile/src/.';

  return (
    'Using the figma-code-connect skill process, generate a Figma Code Connect template for the "' +
    comp.name +
    '" CDS component.\n\n' +
    'Figma details:\n' +
    '- Component name: ' +
    comp.name +
    '\n' +
    '- Section: ' +
    comp.section +
    '\n' +
    '- Figma file key: ' +
    FILE_KEY +
    '\n' +
    '- Node ID (colon-format for API calls): ' +
    comp.nodeId +
    '\n' +
    '- Figma URL: ' +
    comp.figmaUrl +
    '\n' +
    '- Platform: ' +
    comp.platform +
    '\n\n' +
    'Platform instructions: ' +
    platformNote +
    '\n\n' +
    'Execute all steps from your system prompt (read the skill file first, then follow through Steps 1-8):\n' +
    '1. Read the figma-code-connect skill file per your system prompt instructions\n' +
    '2. Load Figma MCP tools via ToolSearch\n' +
    '3. Find the React component source (check for @deprecated, use alpha/ if needed)\n' +
    '4. Call get_code_connect_suggestions with nodeId "' +
    comp.nodeId +
    '"\n' +
    '5. Call get_context_for_code_connect with the resolved mainComponentNodeId\n' +
    '6. Write the template to the appropriate __figma__/ directory\n' +
    '7. Create mobile version if applicable per platform instructions\n' +
    '8. Run CLI dry-run validation\n' +
    '9. Return your structured result via StructuredOutput'
  );
}

// ─── Phase 1: Initialize (idempotent — reads existing progress) ────────────
phase('Initialize');
log('Code Connect Refresh starting. Checking for existing progress...');

// Read the existing progress file to determine which components are already done.
// This makes the workflow idempotent: re-running after rate-limit interruption
// will skip completed/skipped components and only process the remainder.
const progressCheck = await agent(
  'Attempt to read the file at path: ' +
    PROGRESS_FILE +
    '\n\n' +
    'If the file exists and is readable, return {"exists": true, "content": <the full file contents as a string>}.\n' +
    'If the file does not exist or cannot be read, return {"exists": false, "content": ""}.\n' +
    'Use the Read tool to read the file. Return only the raw file content as a string in the content field — do not summarize or modify it.',
  { label: 'Read progress file', phase: 'Initialize', schema: PROGRESS_READ_SCHEMA },
);

// Parse previous run results to determine what's already done
const previouslySaved = {}; // name -> saved component entry from progress file
const alreadyDone = new Set(); // names of components that are completed or intentionally skipped

if (progressCheck && progressCheck.exists && progressCheck.content) {
  let prevData = null;
  try {
    prevData = JSON.parse(progressCheck.content);
  } catch (e) {
    log('Warning: existing progress file could not be parsed. Starting fresh.');
  }

  if (prevData && prevData.components) {
    Object.keys(prevData.components).forEach(function (name) {
      const info = prevData.components[name];
      previouslySaved[name] = info;
      // Only carry over truly terminal states: completed and skipped (no code match).
      // rate_limited and failed should be retried.
      if (info.status === 'completed' || info.status === 'skipped') {
        alreadyDone.add(name);
      }
    });
  }
}

const toProcess = COMPONENTS.filter((comp) => !alreadyDone.has(comp.name));
const alreadyDoneCount = alreadyDone.size;

if (alreadyDoneCount > 0) {
  log(
    'Resuming: ' +
      alreadyDoneCount +
      ' components already done (completed/skipped). Processing remaining ' +
      toProcess.length +
      ' components.',
  );
} else {
  log('Fresh start: processing all ' + toProcess.length + ' components.');
}

// Write/overwrite the progress file with current state (marking remaining as pending)
const initComponents = COMPONENTS.reduce(function (acc, c) {
  if (alreadyDone.has(c.name) && previouslySaved[c.name]) {
    // Carry forward the saved entry for already-done components
    acc[c.name] = previouslySaved[c.name];
  } else {
    acc[c.name] = { status: 'pending', section: c.section, platform: c.platform };
  }
  return acc;
}, {});

const initSummary = {
  total: COMPONENTS.length,
  completed: Array.from(alreadyDone).filter(
    (n) => previouslySaved[n] && previouslySaved[n].status === 'completed',
  ).length,
  skipped: Array.from(alreadyDone).filter(
    (n) => previouslySaved[n] && previouslySaved[n].status === 'skipped',
  ).length,
  rateLimited: 0,
  failed: 0,
  pending: toProcess.length,
};

const initProgressData = {
  runNote:
    'Re-running after interruption will automatically skip completed/skipped components and retry rate-limited ones.',
  summary: initSummary,
  components: initComponents,
};

await agent(
  'Write the following JSON exactly as-is to the file ' +
    PROGRESS_FILE +
    '. Use the Write tool to create or overwrite the file:\n\n' +
    JSON.stringify(initProgressData, null, 2),
  { label: 'Write initial progress', phase: 'Initialize' },
);

log('Progress file ready. Starting generation of ' + toProcess.length + ' components...');

// ─── Phase 2: Generate (max 4 in parallel per Figma MCP rate limit) ────────
phase('Generate');

// allResults holds results from THIS run only
const allResults = [];
const BATCH_SIZE = 4;
let rateLimitHit = false;

// Precompute counts from previous runs — used for progress writes and early-exit return
const prevCompletedCount = Array.from(alreadyDone).filter(
  (n) => previouslySaved[n] && previouslySaved[n].status === 'completed',
).length;
const prevSkippedCount = Array.from(alreadyDone).filter(
  (n) => previouslySaved[n] && previouslySaved[n].status === 'skipped',
).length;

for (let i = 0; i < toProcess.length; i += BATCH_SIZE) {
  // Stop dispatching new batches the moment a rate limit was seen in a prior batch.
  // The current batch's parallel() already resolved naturally before we got here.
  if (rateLimitHit) break;

  const batch = toProcess.slice(i, i + BATCH_SIZE);
  const batchNum = Math.floor(i / BATCH_SIZE) + 1;
  const totalBatches = Math.ceil(toProcess.length / BATCH_SIZE);

  log('Batch ' + batchNum + '/' + totalBatches + ': ' + batch.map((c) => c.name).join(', '));

  // parallel() awaits all agents in this batch before continuing — any rate-limited
  // agent returns immediately with status:"rate_limited" so the batch still finishes.
  const batchResults = await parallel(
    batch.map(
      (comp) => () =>
        agent(buildComponentPrompt(comp), {
          label: comp.name,
          phase: 'Generate',
          schema: RESULT_SCHEMA,
          agentType: 'code-connect-generator',
        }),
    ),
  );

  const validResults = batchResults.filter(Boolean);
  allResults.push(...validResults);

  const rateLimitedInBatch = validResults.filter((r) => r.status === 'rate_limited');
  if (rateLimitedInBatch.length > 0) {
    rateLimitHit = true;
    log(
      'Rate limit hit in batch ' +
        batchNum +
        ' (' +
        rateLimitedInBatch.map((r) => r.componentName).join(', ') +
        '). No further batches will be dispatched.',
    );
  }

  // Build combined component map: previous run's completed/skipped + this run's results so far
  const completedThisRun = allResults.filter((r) => r.status === 'completed').length;
  const skippedThisRun = allResults.filter((r) => r.status === 'skipped').length;
  const rateLimitedThisRun = allResults.filter((r) => r.status === 'rate_limited').length;
  const failedThisRun = allResults.filter((r) => r.status === 'failed').length;

  const combinedComponents = COMPONENTS.reduce(function (acc, c) {
    const currentResult = allResults.find((r) => r.componentName === c.name);
    if (currentResult) {
      acc[c.name] = {
        status: currentResult.status,
        section: c.section,
        platform: c.platform,
        webTemplatePath: currentResult.webTemplatePath || null,
        mobileTemplatePath: currentResult.mobileTemplatePath || null,
      };
    } else if (alreadyDone.has(c.name) && previouslySaved[c.name]) {
      acc[c.name] = previouslySaved[c.name];
    } else {
      acc[c.name] = { status: 'pending', section: c.section, platform: c.platform };
    }
    return acc;
  }, {});

  const batchProgressData = {
    runNote:
      'Re-running after interruption will automatically skip completed/skipped components and retry rate-limited ones.',
    summary: {
      total: COMPONENTS.length,
      completed: prevCompletedCount + completedThisRun,
      skipped: prevSkippedCount + skippedThisRun,
      rateLimited: rateLimitedThisRun,
      failed: failedThisRun,
      pending: COMPONENTS.length - alreadyDoneCount - allResults.length,
    },
    components: combinedComponents,
  };

  await agent(
    'Write the following JSON exactly as-is to ' +
      PROGRESS_FILE +
      '. Use the Write tool:\n\n' +
      JSON.stringify(batchProgressData, null, 2),
    {
      label:
        'Update progress (' +
        (alreadyDoneCount + allResults.length) +
        '/' +
        COMPONENTS.length +
        ')',
      phase: 'Generate',
    },
  );
}

log(
  'Generation ' +
    (rateLimitHit ? 'stopped early (rate limit)' : 'complete') +
    '. ' +
    allResults.length +
    ' processed this run, ' +
    alreadyDoneCount +
    ' carried from previous runs.',
);

// ─── Early exit on rate limit ────────────────────────────────────────────────
// Progress is already saved after each batch. Skip the Linear report so we don't
// post a misleading "complete" summary, and tell the user when to retry.
if (rateLimitHit) {
  const completedThisRun = allResults.filter((r) => r.status === 'completed').length;
  const skippedThisRun = allResults.filter((r) => r.status === 'skipped').length;
  const rateLimitedThisRun = allResults.filter((r) => r.status === 'rate_limited').length;
  const failedThisRun = allResults.filter((r) => r.status === 'failed').length;
  const totalCompleted = prevCompletedCount + completedThisRun;
  const totalSkipped = prevSkippedCount + skippedThisRun;

  log(
    'Progress saved to .claude/code-connect-progress.json. Re-run the workflow in ~2 minutes to resume automatically — completed and skipped components will not be re-processed.',
  );

  return {
    total: COMPONENTS.length,
    completedAllRuns: totalCompleted,
    skippedAllRuns: totalSkipped,
    rateLimitedThisRun: rateLimitedThisRun,
    failedThisRun: failedThisRun,
    stillPending:
      COMPONENTS.length - totalCompleted - totalSkipped - rateLimitedThisRun - failedThisRun,
    rateLimitHit: true,
    message:
      'Figma MCP rate limit reached (20 tool calls/min). Progress is saved — re-run the workflow in ~2 minutes to resume from where it left off.',
  };
}

// ─── Phase 3: Report ────────────────────────────────────────────────────────
phase('Report');

// Combine this run's results with previously-done components for reporting
const allCompletedNames = new Set();
const allSkippedResults = [];
const allRateLimitedResults = [];
const allFailedResults = [];

// Accumulate from this run
allResults.forEach((r) => {
  if (r.status === 'completed') allCompletedNames.add(r.componentName);
  if (r.status === 'skipped') allSkippedResults.push(r);
  if (r.status === 'rate_limited') allRateLimitedResults.push(r);
  if (r.status === 'failed') allFailedResults.push(r);
});

// prevCompletedCount / prevSkippedCount declared in Phase 2 scope above
const totalCompleted = prevCompletedCount + allCompletedNames.size;
const totalSkipped = prevSkippedCount + allSkippedResults.length;

const skippedSection =
  allSkippedResults.length > 0
    ? '## Skipped Components (this run)\n\nNo matching non-deprecated code component found.\n\n' +
      allSkippedResults
        .map((r) => '- **' + r.componentName + '**: ' + (r.skipReason || 'No reason provided'))
        .join('\n') +
      '\n\n'
    : '';

const rateLimitedSection =
  allRateLimitedResults.length > 0
    ? '## Rate-Limited Components\n\nInterrupted by Figma MCP rate limits. Run the workflow again — it will pick up from where it left off (already-completed components are tracked in `.claude/code-connect-progress.json`).\n\n' +
      allRateLimitedResults
        .map((r) => '- **' + r.componentName + '**: ' + (r.errorMessage || 'Rate limited'))
        .join('\n') +
      '\n\n'
    : '';

const failedSection =
  allFailedResults.length > 0
    ? '## Failed Components\n\n' +
      allFailedResults
        .map((r) => '- **' + r.componentName + '**: ' + (r.errorMessage || 'Unknown error'))
        .join('\n') +
      '\n\n'
    : '';

const skippedPropsResults = allResults.filter(
  (r) => r.skippedFigmaProperties && r.skippedFigmaProperties.length > 0,
);
const skippedPropsSection =
  skippedPropsResults.length > 0
    ? '## Unmapped Figma Properties\n\nFigma properties with no code equivalent — omitted from templates. Future improvement opportunities.\n\n' +
      skippedPropsResults
        .map(
          (r) =>
            '### ' +
            r.componentName +
            '\n' +
            r.skippedFigmaProperties.map((p) => '- **' + p.property + '**: ' + p.reason).join('\n'),
        )
        .join('\n\n') +
      '\n\n'
    : '';

const improvementResults = allResults.filter((r) => r.figmaImprovementNotes);
const improvementSection =
  improvementResults.length > 0
    ? '## Figma Design Improvement Opportunities\n\nObservations for future Figma library improvements (naming, organization, missing variants).\n\n' +
      improvementResults
        .map((r) => '### ' + r.componentName + '\n' + r.figmaImprovementNotes)
        .join('\n\n')
    : '';

const overallStatus =
  totalCompleted + totalSkipped === COMPONENTS.length ? 'Complete' : 'In Progress';
const reportBody =
  '## Code Connect Refresh — Run Summary (' +
  overallStatus +
  ')\n\n' +
  'Progress is tracked in `.claude/code-connect-progress.json`. Re-run the workflow at any time — it resumes from where it left off.\n\n' +
  '| Metric | Count |\n' +
  '|---|---|\n' +
  '| Total components | ' +
  COMPONENTS.length +
  ' |\n' +
  '| Completed (all runs) | ' +
  totalCompleted +
  ' |\n' +
  '| Skipped — no code match (all runs) | ' +
  totalSkipped +
  ' |\n' +
  '| Rate limited this run (retry by re-running) | ' +
  allRateLimitedResults.length +
  ' |\n' +
  '| Failed this run | ' +
  allFailedResults.length +
  ' |\n' +
  '| Still pending | ' +
  (COMPONENTS.length -
    totalCompleted -
    totalSkipped -
    allRateLimitedResults.length -
    allFailedResults.length) +
  ' |\n\n' +
  skippedSection +
  rateLimitedSection +
  failedSection +
  skippedPropsSection +
  improvementSection;

await agent(
  'Post a comment to Linear issue CDS-2144.\n\n' +
    'First use ToolSearch with query "select:mcp__linear-server__save_comment" to load the tool schema.\n' +
    'Then call mcp__linear-server__save_comment with issueId "CDS-2144" and the body text below.\n\n' +
    '---BEGIN COMMENT---\n' +
    reportBody +
    '\n---END COMMENT---',
  { label: 'Post summary to Linear', phase: 'Report' },
);

log('Run complete. Summary posted to Linear CDS-2144.');

return {
  total: COMPONENTS.length,
  completedAllRuns: totalCompleted,
  skippedAllRuns: totalSkipped,
  rateLimitedThisRun: allRateLimitedResults.length,
  failedThisRun: allFailedResults.length,
  stillPending:
    COMPONENTS.length -
    totalCompleted -
    totalSkipped -
    allRateLimitedResults.length -
    allFailedResults.length,
};
