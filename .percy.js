module.exports = {
  version: 2,
  storybook: {
    // Useful for isolating Percy diffs when running from the command line
    exclude: [
      'Core Components/AccessibilityAnnouncer',
      'Interactive/Table',
      'Interactive/TabNavigation',
      'Interactive/Dropdown',
      'Interactive/TextInput',
      'Interactive/Select',
      'Components/Modal',
      // Animation and randomized examples aren't reliable for visual regression testing
      'Components/Chart/ChartText: Interactive Chart Text Group',
      'Components/SparklineInteractive: Fallback Compact',
      'Components/SparklineInteractive: Fallback Negative',
      'Components/SparklineInteractive: Fallback Positive',
      'Components/LottieStatusAnimation: Default',
      'Components/Loaders/MaterialSpinner: Material Spinner Default',
      'Components/Chart/LineChart: Transitions',
    ],
    include: [
      // 'Core Components/SparklineInteractive:*',
      // 'Core Components/ProgressBar:*',
      // 'Core Components/Navigation/Sidebar:*',
      // 'Core Components/Overlays:*',
    ],
  },
  // asset discovery configuration
  discovery: {
    // percy will retry asset discovery if it fails.
    retry: true,
    // after 500ms of no network activity, percy will consider the page loaded and end asset discovery.
    networkIdleTimeout: 500,
    /* below are 2 addtional fields that the Percy support team recommended we can try if we experience more flakes with asset uploads */
    // disableCache: false,
    /* percy natually uses concurrency to process/upload assets to its servers.
       Reducing the concurrency can help with stability, but it could also increase CI time. */
    // concurrency: 1,
  },
};
