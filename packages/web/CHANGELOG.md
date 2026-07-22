# @coinbase/cds-web

> [NPM registry](https://www.npmjs.com/package/@coinbase/cds-web)

All notable changes to this project will be documented in this file.

`@coinbase/cds-web` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- template-start -->

## 9.6.8 (7/22/2026 PST)

#### 🐞 Fixes

- Make Coachmark close button transparent. [[#798](https://github.com/coinbase/cds/pull/798)]

## 9.6.7 ((7/20/2026, 09:01 AM PST))

This is an artificial version bump with no new change.

## 9.6.6 (7/14/2026 PST)

This is an artificial version bump with no new change.

## 9.6.5 (7/13/2026 PST)

#### 📘 Misc

- Docs(CDS-2463): document non-token color customization on RollingNumber (web changes are documentation only). [[#787](https://github.com/coinbase/cds/pull/787)]

## 9.6.4 ((7/13/2026, 07:14 AM PST))

This is an artificial version bump with no new change.

## 9.6.3 ((7/9/2026, 10:48 AM PST))

This is an artificial version bump with no new change.

## 9.6.2 ((7/8/2026, 07:16 AM PST))

This is an artificial version bump with no new change.

## 9.6.1 ((7/7/2026, 12:21 PM PST))

This is an artificial version bump with no new change.

## 9.6.0 (7/6/2026 PST)

#### 🚀 Updates

- Feat: add TextFallback. [[#780](https://github.com/coinbase/cds/pull/780)]

## 9.5.0 (6/25/2026 PST)

#### 🚀 Updates

- Chore: add styled element for Tab's TabContainer component to support equal width tabs. [[#772](https://github.com/coinbase/cds/pull/772)]

## 9.4.3 (6/23/2026 PST)

#### 🐞 Fixes

- Fix: Add `activeBackground` and `activeColor` props to alpha `TabbedChips`. `activeBackground` sets a custom chip background color when active (replacing the default `invertColorScheme` behavior); `activeColor` sets a custom chip label text color when active. [[#766](https://github.com/coinbase/cds/pull/766)]

## 9.4.2 (6/23/2026 PST)

#### 🐞 Fixes

- Fix: Button CSS was preventing height prop from working due to CSS specificity issue. [[#764](https://github.com/coinbase/cds/pull/764)]

## 9.4.1 (6/15/2026 PST)

#### 🐞 Fixes

- Fix: Modal appearance props now apply to the modal card. [[#758](https://github.com/coinbase/cds/pull/758)]

## 9.4.0 (6/15/2026 PST)

#### 🚀 Updates

- Feat: add gray4 illustration color token. [[#746](https://github.com/coinbase/cds/pull/746)]

## 9.3.1 (6/12/2026 PST)

#### 🐞 Fixes

- Chore: replace barrel file imports with targeted imports to specific modules. [[#757](https://github.com/coinbase/cds/pull/757)]

## 9.3.0 (6/11/2026 PST)

#### 🚀 Updates

- Feat: support tooltip theming. [[#753](https://github.com/coinbase/cds/pull/753)]

## 9.2.2 (6/10/2026 PST)

#### 🐞 Fixes

- Fix: custom Switch sizes now center in the background track correctly. [[#750](https://github.com/coinbase/cds/pull/750)]

## 9.2.1 (6/9/2026 PST)

#### 🐞 Fixes

- Fix: add tabbed-chips to exports in web/mobile packages.

## 9.2.0 (5/28/2026 PST)

#### 🚀 Updates

- Feat: improve Select theming support. [[#733](https://github.com/coinbase/cds/pull/733)]
- Feat: add readOnly support to Select. [[#733](https://github.com/coinbase/cds/pull/733)]

## 9.1.3 ((5/28/2026, 09:35 AM PST))

This is an artificial version bump with no new change.

## 9.1.2 (5/28/2026 PST)

#### 🐞 Fixes

- Add data attribute to popover container. [[#717](https://github.com/coinbase/cds/pull/717)]

## 9.1.1 (5/27/2026 PST)

#### 🐞 Fixes

- Fix: support inside label variant on select. [[#726](https://github.com/coinbase/cds/pull/726)]

## 9.1.0 (5/26/2026 PST)

#### 🚀 Updates

- Feat: support DotCount theming. [[#723](https://github.com/coinbase/cds/pull/723)]

## 9.0.2 (5/22/2026 PST)

#### 🐞 Fixes

- Fix: improve button text alignment by using flexbox. [[#720](https://github.com/coinbase/cds/pull/720)]

## 9.0.1 ((5/22/2026, 09:25 AM PST))

This is an artificial version bump with no new change.

## 9.0.0 (5/20/2026 PST)

CDS 9 is here!!

For more details and to help upgrading from CDS 8 using our automated migration tool, see our official [upgrade guide](https://cds.coinbase.com/guides/v9-upgrade-guide)!

#### 💥 Breaking

- Nested ThemeProviders will not inject the full set of CSS variables by default. You can opt in to the old behavior by setting the `isolated` prop to `false`.
- Removed remaining instances of fixed height/width values across all components which may cause subtle layout shifts in your app.
- Some component props’ types have narrowed in response to React 19 upgrade.
- Read our upgrade guilde for more details!

#### 🚀 Updates

- React 19 support! React 18 is still supported for backwards compatibility.
- Migrated full set of components from web-visualization package to new `visualizations/chart` and `visualizations/sparkline` sub-paths.
- Read our upgrade guilde for more details!

## 8.75.2 (5/19/2026 PST)

#### 🐞 Fixes

- Fix: unstable svg sizing caused by flexbox. [[#696](https://github.com/coinbase/cds/pull/696)]

## 8.75.1 (5/19/2026 PST)

#### 🐞 Fixes

- Fix: android web tray footer cut off. [[#694](https://github.com/coinbase/cds/pull/694)]

## 8.75.0 (5/15/2026 PST)

#### 🚀 Updates

- Feat: support selectionColor on Inputs. [[#688](https://github.com/coinbase/cds/pull/688)]

## 8.74.3 (5/14/2026 PST)

#### 🐞 Fixes

- Fix: prevent flickering when illustration palette changes on web. [[#685](https://github.com/coinbase/cds/pull/685)]

## 8.74.2 (5/14/2026 PST)

#### 🐞 Fixes

- Fix: unreliable version check. [[#684](https://github.com/coinbase/cds/pull/684)]

## 8.74.1 (5/14/2026 PST)

#### 🐞 Fixes

- Fix: adjust tabs default tab label padding. [[#682](https://github.com/coinbase/cds/pull/682)]

## 8.74.0 (5/13/2026 PST)

#### 🚀 Updates

- Feat: add illustration theming via applyTheme prop. [[#672](https://github.com/coinbase/cds/pull/672)]

## 8.73.0 (5/13/2026 PST)

#### 🚀 Updates

- Feat: support more props on TextInputBaseProps. [[#679](https://github.com/coinbase/cds/pull/679)]

## 8.72.0 (5/12/2026 PST)

#### 🚀 Updates

- Feat: support key Tag props in component configs. [[#671](https://github.com/coinbase/cds/pull/671)]

## 8.71.0 (5/12/2026 PST)

#### 🚀 Updates

- Add icon glyph and progress circle styles to IconButton. [[#606](https://github.com/coinbase/cds/pull/606)]

## 8.70.0 (5/8/2026 PST)

#### 🚀 Updates

- Feat: support active color on Tabs. [[#669](https://github.com/coinbase/cds/pull/669)]

## 8.69.1 ((5/6/2026, 10:08 AM PST))

This is an artificial version bump with no new change.

## 8.69.0 (5/5/2026 PST)

#### 🚀 Updates

- Fix: NavigationBar no longer reserves space for absent start content. [[#664](https://github.com/coinbase/cds/pull/664)]
- Add collapsedStyle prop to Collapsible.[[#664](https://github.com/coinbase/cds/pull/664)]

## 8.68.0 (5/1/2026 PST)

#### 🚀 Updates

- Feat: update bgWarning to orange60. [[#659](https://github.com/coinbase/cds/pull/659)]

## 8.67.0 (5/1/2026 PST)

#### 🚀 Updates

- Feat: Add legalText prop to PageFooter component. [[#661](https://github.com/coinbase/cds/pull/661)]

## 8.66.2 (4/28/2026 PST)

#### 🐞 Fixes

- Fix SegmentedTab color not applied during Suspense transition. [[#650](https://github.com/coinbase/cds/pull/650)]

## 8.66.1 ((4/27/2026, 12:59 PM PST))

This is an artificial version bump with no new change.

## 8.66.0 (4/16/2026 PST)

#### 🚀 Updates

- Deprecate Dropdown and add PopoverPanel component. [[#566](https://github.com/coinbase/cds/pull/566)]

## 8.65.0 (4/16/2026 PST)

#### 🚀 Updates

- Add customization to text for ModalHeader. [[#613](https://github.com/coinbase/cds/pull/613)]

## 8.64.5 (4/16/2026 PST)

#### 🐞 Fixes

- Fix: remove extra padding on combobox input. [[#617](https://github.com/coinbase/cds/pull/617)]

## 8.64.4 (4/10/2026 PST)

#### 🐞 Fixes

- Fix Toast enter animation in React 19 StrictMode. [[#607](https://github.com/coinbase/cds/pull/607)]

## 8.64.3 (4/8/2026 PST)

#### 🐞 Fixes

- Fix: Stepper animation with react-spring ^10.0.1. [[#603](https://github.com/coinbase/cds/pull/603)]

## 8.64.2 ((4/8/2026, 11:26 AM PST))

This is an artificial version bump with no new change.

## 8.64.1 (4/7/2026 PST)

#### 🐞 Fixes

- Chore: Add styles and classNames APIs to Tour and TourStep components. [[#592](https://github.com/coinbase/cds/pull/592)]

## 8.64.0 (4/2/2026 PST)

#### 🚀 Updates

- Added DefaultTab and DefaultTabActiveIndicator and deprecate types used by TabNavigation. [[#558](https://github.com/coinbase/cds/pull/558)]

## 8.63.0 (4/1/2026 PST)

#### 🚀 Updates

- Add type focus to Select. [[#571](https://github.com/coinbase/cds/pull/571)]

## 8.62.1 (4/1/2026 PST)

#### 🐞 Fixes

- Remove usage of Array.prototype.at(). [[#575](https://github.com/coinbase/cds/pull/575)]

## 8.62.0 (3/30/2026 PST)

#### 🚀 Updates

- Add ComponentConfigProvider. [[#507](https://github.com/coinbase/cds/pull/507)]

## 8.61.0 (3/30/2026 PST)

#### 🚀 Updates

- Feat: support SearchInput height customization. [[#565](https://github.com/coinbase/cds/pull/565)]

#### 📘 Misc

- Deprecate Card and its sub-components. [[#562](https://github.com/coinbase/cds/pull/562)]

#### 📘 Misc

- Chore: deprecate CardGroup. [[#560](https://github.com/coinbase/cds/pull/560)]

## 8.60.0 (3/29/2026 PST)

#### 🚀 Updates

- Add indeterminate ProgressCircle. [[#501](https://github.com/coinbase/cds/pull/501)]

## 8.59.0 (3/27/2026 PST)

#### 🚀 Updates

- Suppoer controlSize on Checkbox and Radio. [[#546](https://github.com/coinbase/cds/pull/546)]

## 8.58.0 (3/25/2026 PST)

#### 🚀 Updates

- Feat: support font prop on inputs. [[#545](https://github.com/coinbase/cds/pull/545)]
- Feat: support borderRadius on SearchInput. [[#545](https://github.com/coinbase/cds/pull/545)]

## 8.57.1 (3/24/2026 PST)

#### 🐞 Fixes

- Use aria-describedby for all tooltip's triggers. [[#541](https://github.com/coinbase/cds/pull/541)]

## 8.57.0 (3/24/2026 PST)

#### 🚀 Updates

- Feat: support focusedBorderWidth on TextInput. [[#537](https://github.com/coinbase/cds/pull/537)]

## 8.56.1 (3/24/2026 PST)

#### 🐞 Fixes

- Fixed issue when typing space in combobox input closes the popover by mistake. [[#523](https://github.com/coinbase/cds/pull/523)]

## 8.56.0 (3/23/2026 PST)

#### 🚀 Updates

- Support modal subcomponent props. [[#534](https://github.com/coinbase/cds/pull/534)]

#### 📘 Misc

- Chore: Updated numerous deprecation annotation messages.

## 8.55.1 (3/22/2026 PST)

#### 🐞 Fixes

- Fix icon inconsistent rendering. [[#527](https://github.com/coinbase/cds/pull/527)]

## 8.55.0 ((3/19/2026, 01:41 PM PST))

This is an artificial version bump with no new change.

## 8.54.0 (3/18/2026 PST)

#### 🚀 Updates

- Add component styling, improve a11y for Calendar and DatePicker. [[#139](https://github.com/coinbase/cds/pull/139)]

## 8.53.1 (3/17/2026 PST)

#### 🐞 Fixes

- Fix: update RemoteImageGroup excess bg color. [[#512](https://github.com/coinbase/cds/pull/512)]

## 8.53.0 (3/16/2026 PST)

#### 🚀 Updates

- Feat: update Checkbox borderRadius to match design. [[#509](https://github.com/coinbase/cds/pull/509)]

#### 📘 Misc

- Deprecate SegmentedControl. [[#493](https://github.com/coinbase/cds/pull/493)]

## 8.52.2 (3/11/2026 PST)

#### 🐞 Fixes

- Configure control borderWidth and controlColor. [[#457](https://github.com/coinbase/cds/pull/457)]

## 8.52.1 (3/11/2026 PST)

#### 🐞 Fixes

- Add keyboard scroll support to FocusTrap, Tray, and Modal. [[#481](https://github.com/coinbase/cds/pull/481)]

## 8.52.0 (3/10/2026 PST)

#### 🚀 Updates

- A11y improvements to Fallback, Spinner, and LottieStatusAnimation. [[#388](https://github.com/coinbase/cds/pull/388)]
- Simplify the ProgressBar component implementation. [[#388](https://github.com/coinbase/cds/pull/388)]
- Use shapeBorderRadius tokens in RemoteImage/RemoteImageGroup. [[#388](https://github.com/coinbase/cds/pull/388)]
- Removed useFallbackShape implementation from web and reuse the same hook defined in common. [[#388](https://github.com/coinbase/cds/pull/388)]

## 8.51.0 (3/9/2026 PST)

#### 🚀 Updates

- Added hasInteractiveContent prop to Tooltip to correctly handle keyboard navigation when content includes interactive elements. [[#469](https://github.com/coinbase/cds/pull/469)] [DX-5097]

#### 🐞 Fixes

- Fixed issue when tooltip does not announce its content when content is a React Node instead of a string. [[#469](https://github.com/coinbase/cds/pull/469)]

## 8.50.0 (3/6/2026 PST)

#### 🚀 Updates

- Feat: iconSize customization for IconButton. [[#474](https://github.com/coinbase/cds/pull/474)]

## 8.49.2 (3/6/2026 PST)

#### 🐞 Fixes

- Feat: improve deprecation notice in ListCell. [[#411](https://github.com/coinbase/cds/pull/411)]

## 8.49.1 (3/5/2026 PST)

#### 🐞 Fixes

- Fix: spread tabs props at end for Tabs. [[#472](https://github.com/coinbase/cds/pull/472)]

## 8.49.0 (2/26/2026 PST)

#### 🚀 Updates

- Add styles and classnames props to Tab components. [[#438](https://github.com/coinbase/cds/pull/438)]

## 8.48.3 (2/25/2026 PST)

#### 🐞 Fixes

- Fix: allow arrow up/down keys within focus trapped text area. [[#417](https://github.com/coinbase/cds/pull/417)]

## 8.48.2 ((2/25/2026, 04:21 PM PST))

This is an artificial version bump with no new change.

## 8.48.1 (2/25/2026 PST)

#### 🐞 Fixes

- Truncate text mid-word in multi-select chips. [[#412](https://github.com/coinbase/cds/pull/412)]

## 8.48.0 (2/24/2026 PST)

#### 🚀 Updates

- Add start/end icon/node support to Tag. [[#421](https://github.com/coinbase/cds/pull/421)]

## 8.47.4 ((2/23/2026, 03:04 PM PST))

This is an artificial version bump with no new change.

## 8.47.3 (2/20/2026 PST)

#### 🐞 Fixes

- Remove behavior of scrolling inside TextInput updating numeric values. [[#413](https://github.com/coinbase/cds/pull/413)]

## 8.47.2 ((2/19/2026, 03:18 PM PST))

This is an artificial version bump with no new change.

## 8.47.1 ((2/19/2026, 01:18 PM PST))

This is an artificial version bump with no new change.

## 8.47.0 (2/19/2026 PST)

#### 🚀 Updates

- Feat: enable Button text customization via font props. [[#408](https://github.com/coinbase/cds/pull/408)]

## 8.46.1 (2/12/2026 PST)

#### 🐞 Fixes

- Fix: (DX-5052) use previous active step value for calculating remaining steps to animate to for a completed stepper. [[#397](https://github.com/coinbase/cds/pull/397)] [DX-5052]

## 8.46.0 (2/12/2026 PST)

#### 🚀 Updates

- Add open/close visibility delays to Tooltip. [[#234](https://github.com/coinbase/cds/pull/234)]

## 8.45.0 (2/12/2026 PST)

#### 🚀 Updates

- Add reduce motion support for Tray. [[#386](https://github.com/coinbase/cds/pull/386)]

## 8.44.2 (2/10/2026 PST)

#### 🐞 Fixes

- Fix Tray drag elastic. [[#385](https://github.com/coinbase/cds/pull/385)]

## 8.44.1 (2/10/2026 PST)

#### 🐞 Fixes

- Enabled customer to override the width prop in Banner so they can explicitly pass in a width for any bleed effect. [[#383](https://github.com/coinbase/cds/pull/383)]

#### 📘 Misc

- Update jsdocs for styles props. [[#384](https://github.com/coinbase/cds/pull/384)]

## 8.44.0 (2/9/2026 PST)

#### 🚀 Updates

- Add new tray design. [[#349](https://github.com/coinbase/cds/pull/349)]

## 8.43.2 ((2/9/2026, 09:05 AM PST))

This is an artificial version bump with no new change.

## 8.43.1 (2/6/2026 PST)

#### 🐞 Fixes

- Update chpi prop export. [[#328](https://github.com/coinbase/cds/pull/328)]
- Add NavigationBar classNames. [[#328](https://github.com/coinbase/cds/pull/328)]

## 8.43.0 (2/6/2026 PST)

#### 🚀 Updates

- Carousel autoplay. [[#361](https://github.com/coinbase/cds/pull/361)]

## 8.42.0 (2/4/2026 PST)

#### 🚀 Updates

- Added MediaCard, MessagingCard, and alpha DataCard. [[#329](https://github.com/coinbase/cds/pull/329)]
- Updated ContentCard. [[#329](https://github.com/coinbase/cds/pull/329)]

## 8.41.0 (2/4/2026 PST)

#### 🚀 Updates

- Add align prop to Select and Combobox. [[#348](https://github.com/coinbase/cds/pull/348)]

## 8.40.2 ((2/2/2026, 11:25 AM PST))

This is an artificial version bump with no new change.

## 8.40.1 ((1/30/2026, 04:58 PM PST))

This is an artificial version bump with no new change.

#### 📘 Misc

- Add descriptive names for generic types. [[#341](https://github.com/coinbase/cds/pull/341)] [DX-5037]

## 8.40.0 ((1/28/2026, 11:12 AM PST))

This is an artificial version bump with no new change.

## 8.39.1 (1/27/2026 PST)

#### 🐞 Fixes

- Fix padding on Tab components. [[#330](https://github.com/coinbase/cds/pull/330)]

## 8.39.0 (1/27/2026 PST)

#### 🚀 Updates

- Support Carousel looping. [[#327](https://github.com/coinbase/cds/pull/327)]

## 8.38.7 (1/26/2026 PST)

#### 🐞 Fixes

- Fix Switch rendering with an unintended drop shadow. Add optional `elevation` prop to Control components (Switch, Checkbox, Radio). [[#325](https://github.com/coinbase/cds/pull/325)]

## 8.38.6 (1/23/2026 PST)

#### 🐞 Fixes

- Fix(RadioCell): Adjusted Pressable to have a tabindex="-1" instead of 0. [CDS-1170]

## 8.38.5 (1/23/2026 PST)

#### 🐞 Fixes

- Improve keyboard navigation and ARIA labels on Select and Combobox. [[#250](https://github.com/coinbase/cds/pull/250)]

## 8.38.4 (1/22/2026 PST)

#### 🐞 Fixes

- Fixed spacing props not working on web Button.

## 8.38.3 (1/22/2026 PST)

#### 🐞 Fixes

- Fix: destructure unused props from default horizontal stepper components to prevent dev mode React warnings. [[#324](https://github.com/coinbase/cds/pull/324)]

## 8.38.2 (1/22/2026 PST)

#### 🐞 Fixes

- FocusTrap supports single focusable child and updates to its tests. [[#306](https://github.com/coinbase/cds/pull/306)]

## 8.38.1 (1/15/2026 PST)

#### 🐞 Fixes

- Support TextInput labelNode on compact and inside labelVariant. [[#293](https://github.com/coinbase/cds/pull/293)]

#### 📘 Misc

- Internal: code connect file lint fixes. [[#311](https://github.com/coinbase/cds/pull/311)]

#### 📘 Misc

- Internal: update figma code connect config and some mapping files. [[#304](https://github.com/coinbase/cds/pull/304)]

## 8.38.0 (1/14/2026 PST)

#### 🚀 Updates

- Add bordered prop to Select. [[#298](https://github.com/coinbase/cds/pull/298)]

## 8.37.1 (1/14/2026 PST)

#### 🐞 Fixes

- Fix focus shift bug for includeTriggerInFocusTrap prop being true in FocusTrap. [[#258](https://github.com/coinbase/cds/pull/258)]

## 8.37.0 (1/12/2026 PST)

#### 🚀 Updates

- Add state data attributes to Button and IconButton on web.

## 8.36.3 (1/9/2026 PST)

#### 🐞 Fixes

- Remove focus ring from inside label for Select. [[#299](https://github.com/coinbase/cds/pull/299)]

## 8.36.2 ((1/7/2026, 10:19 AM PST))

This is an artificial version bump with no new change.

## 8.36.1 (1/6/2026 PST)

#### 🐞 Fixes

- Added customization for ListCell `titleStack`. [[#288](https://github.com/coinbase/cds/pull/288)] [DX-5075]

## 8.36.0 ((1/6/2026, 01:00 PM PST))

This is an artificial version bump with no new change.

## 8.35.1 (1/5/2026 PST)

#### 🐞 Fixes

- Fix disableAnimateOnMount for progress bar label components. [[#284](https://github.com/coinbase/cds/pull/284)]

## 8.35.0 (1/5/2026 PST)

#### 🚀 Updates

- Add border props to RemoteImageGroup.

## 8.34.2 (1/2/2026 PST)

#### 🐞 Fixes

- Handle disableAnimateOnMount prop for web ProgressCircle. [[#280](https://github.com/coinbase/cds/pull/280)]

## 8.34.1 (12/23/2025 PST)

#### 🐞 Fixes

- Updated docgen version and enhanced props table with polymorphic default element extraction. [[#276](https://github.com/coinbase/cds/pull/276)]

## 8.34.0 ((12/19/2025, 02:32 PM PST))

This is an artificial version bump with no new change.

## 8.33.1 (12/19/2025 PST)

#### 🐞 Fixes

- Fix RemoteImageGroup zIndex and trailing space issue. [[#170](https://github.com/coinbase/cds/pull/170)]

#### 📘 Misc

- Fix: rename invalid class names on docsite. [[#265](https://github.com/coinbase/cds/pull/265)]

## 8.33.0 (12/18/2025 PST)

#### 🚀 Updates

- New digitTransitionVariant for RollingNumber. [[#237](https://github.com/coinbase/cds/pull/237)]

## 8.32.3 (12/18/2025 PST)

#### 🐞 Fixes

- Fix: update package exports. [[#261](https://github.com/coinbase/cds/pull/261)]

## 8.32.2 (12/18/2025 PST)

#### 🐞 Fixes

- Add fuse.js dependency. [[#256](https://github.com/coinbase/cds/pull/256)]

## 8.32.1 ((12/17/2025, 11:31 AM PST))

This is an artificial version bump with no new change.

## 8.32.0 (12/16/2025 PST)

#### 🚀 Updates

- Add static class names to components.

## 8.31.5 (12/16/2025 PST)

#### 🐞 Fixes

- Fixed caption font-size on web dense theme.

## 8.31.4 (12/16/2025 PST)

#### 🐞 Fixes

- Update date types barrel to export. [[#255](https://github.com/coinbase/cds/pull/255)]

## 8.31.3 (12/16/2025 PST)

#### 🐞 Fixes

- Isolate tabs container so the paddles don't cover elements outside. [[#254](https://github.com/coinbase/cds/pull/254)]

## 8.31.2 ((12/15/2025, 01:12 PM PST))

This is an artificial version bump with no new change.

## 8.31.1 (12/15/2025 PST)

#### 🐞 Fixes

- Chore: add barrel files to web/mobile components. [[#251](https://github.com/coinbase/cds/pull/251)]

## 8.31.0 (12/12/2025 PST)

#### 🚀 Updates

- Add inputBackground prop to InputStack and TextInput.

## 8.30.1 (12/12/2025 PST)

#### 🐞 Fixes

- Add classNames and styles to sidebar. [[#239](https://github.com/coinbase/cds/pull/239)]

## 8.30.0 (12/12/2025 PST)

#### 🚀 Updates

- Add autoScrollOffset prop to TabbedChips alpha. [[#232](https://github.com/coinbase/cds/pull/232)]
- Add maxWidth prop to SelectChip alpha [[#232](https://github.com/coinbase/cds/pull/232)] [DX-5072]
- Add displayValue prop to SelectChip alpha [[#232](https://github.com/coinbase/cds/pull/232)]

## 8.29.0 (12/12/2025 PST)

#### 🚀 Updates

- Combobox component and header prop for Tray. [[#182](https://github.com/coinbase/cds/pull/182)]

## 8.28.2 ((12/12/2025, 06:23 AM PST))

This is an artificial version bump with no new change.

## 8.28.1 (12/10/2025 PST)

#### 🐞 Fixes

- Fix a11y bug on ModalHeader.

## 8.28.0 (12/10/2025 PST)

#### 🚀 Updates

- Updated ContentCell to support condensed variant. [[#205](https://github.com/coinbase/cds/pull/205)] [DX-5013]

## 8.27.4 ((12/7/2025, 11:54 AM PST))

This is an artificial version bump with no new change.

## 8.27.3 ((12/5/2025, 01:46 PM PST))

This is an artificial version bump with no new change.

## 8.27.2 (12/4/2025 PST)

#### 🐞 Fixes

- Fix a bug where Banner will incorrectly grow to its parent height. [[#209](https://github.com/coinbase/cds/pull/209)] [DX-5059]

## 8.27.1 (12/4/2025 PST)

#### 🐞 Fixes

- Fix mobile safari not rendering radio icon issue. [[#208](https://github.com/coinbase/cds/pull/208)]

## 8.27.0 (12/3/2025 PST)

#### 🚀 Updates

- Feat: introduce `unselected` state for ListCell. [[#194](https://github.com/coinbase/cds/pull/194)] [DX-4947]

## 8.26.0 (12/1/2025 PST)

#### 🚀 Updates

- Add SelectChip alpha component. [[#180](https://github.com/coinbase/cds/pull/180)]
- Add support for option grouping. [[#180](https://github.com/coinbase/cds/pull/180)]

#### 🐞 Fixes

- Fix Select select all when options disabled. [[#180](https://github.com/coinbase/cds/pull/180)]

## 8.25.1 (12/1/2025 PST)

#### 🐞 Fixes

- Improve keyboard navigation for Tabs components and update ARIA roles. [[#96](https://github.com/coinbase/cds/pull/96)]

## 8.25.0 (12/1/2025 PST)

#### 🚀 Updates

- Add emphasis prop to Tag. [[#197](https://github.com/coinbase/cds/pull/197)]

## 8.24.0 (12/1/2025 PST)

#### 🚀 Updates

- Support labelNode in TextInput. [[#198](https://github.com/coinbase/cds/pull/198)]

## 8.23.0 (12/1/2025 PST)

#### 🚀 Updates

- Enable custom text label for "First" and "Last" buttons of Pagination. [[#192](https://github.com/coinbase/cds/pull/192)] [DX-4997]

## 8.22.2 (11/26/2025 PST)

#### 🐞 Fixes

- Wrap Select labels instead of truncating them. [[#179](https://github.com/coinbase/cds/pull/179)]

## 8.22.1 (11/24/2025 PST)

#### 🐞 Fixes

- Fix the borderRadius prop issue in Banner. [[#190](https://github.com/coinbase/cds/pull/190)]

## 8.22.0 (11/24/2025 PST)

#### 🚀 Updates

- Added `subtitle` for ListCell and accessory for `ListCellFallback`. [[#149](https://github.com/coinbase/cds/pull/149)] [DX-5015]

## 8.21.8 (11/21/2025 PST)

#### 🐞 Fixes

- Feat: added default a11y label for banner close button. [[#185](https://github.com/coinbase/cds/pull/185)]

## 8.21.7 ((11/21/2025, 09:39 AM PST))

This is an artificial version bump with no new change.

## 8.21.6 (11/21/2025 PST)

#### 🐞 Fixes

- Fix text input border color missing issue. [[#147](https://github.com/coinbase/cds/pull/147)] [DX-5030]

## 8.21.5 (11/19/2025 PST)

#### 🐞 Fixes

- Auto-fill DatePicker width. [[#118](https://github.com/coinbase/cds/pull/118)] [DX-4988]

## 8.21.4 (11/18/2025 PST)

#### 🐞 Fixes

- Update styling of DefaultSelectControl to use compact chips. [[#156](https://github.com/coinbase/cds/pull/156)]

## 8.21.3 ((11/17/2025, 10:03 AM PST))

This is an artificial version bump with no new change.

## 8.21.2 (11/13/2025 PST)

#### 🐞 Fixes

- Uniform flex alignment for all Avatar variants. [[#162](https://github.com/coinbase/cds/pull/162)] [DX-4991]

## 8.21.1 (11/13/2025 PST)

#### 🐞 Fixes

- Fixed select alpha dropdown zIndex. [[#161](https://github.com/coinbase/cds/pull/161)]
- Corrected ListCell spacingVariant jsdoc. [[#161](https://github.com/coinbase/cds/pull/161)]
- Updated docs of FullscreenModal and FullscreenModalLayout to show a more precise 3-column layout example. [[#161](https://github.com/coinbase/cds/pull/161)]

## 8.21.0 (11/12/2025 PST)

#### 🚀 Updates

- Deprecate TabbedChips and create new TabbedChips(Alpha), whose props mirror Tabs' props. [[#138](https://github.com/coinbase/cds/pull/138)]

## 8.20.2 (11/12/2025 PST)

#### 🐞 Fixes

- Support custom buttons in ModalFooter. [[#155](https://github.com/coinbase/cds/pull/155)]

## 8.20.1 (11/7/2025 PST)

#### 🐞 Fixes

- Add deprecation decorator to old Select. [[#148](https://github.com/coinbase/cds/pull/148)]

## 8.20.0 (11/7/2025 PST)

#### 🚀 Updates

- Add new alpha Select component, useClickOutside hook, and findClosestNonDisabledNode util method. [[#21](https://github.com/coinbase/cds/pull/21)]

## 8.19.1 (11/4/2025 PST)

This is an artificial version bump with no new change.

## 8.19.0 (10/29/2025 PST)

#### 🚀 Updates

- Added MediaChip component. [[#125](https://github.com/coinbase/cds/pull/125)]
- Simplified Chip construct. [[#125](https://github.com/coinbase/cds/pull/125)]

#### 🐞 Fixes

- Fixed TabbedChip auto-scrolling issue. [[#125](https://github.com/coinbase/cds/pull/125)]

## 8.18.0 (10/29/2025 PST)

#### 🚀 Updates

- Support custom `titleNode` `descriptionNode` `detailNode` `subdetailNode``accessoryNode` for ListCell. [[#131](https://github.com/coinbase/cds/pull/131)] [DX-5006]

## 8.17.6 (10/28/2025 PST)

#### 🐞 Fixes

- Fixed Select height on web.

## 8.17.5 (10/27/2025 PST)

#### 🐞 Fixes

- Increased ListCell innerSpacing when spacingVariant=“condensed” [[#133](https://github.com/coinbase/cds/pull/133)]

## 8.17.4 (10/27/2025 PST)

This is an artificial version bump with no new change.

## 8.17.3 (10/14/2025 PST)

#### 🐞 Fixes

- Fix avatar hexagon shape. [[#107](https://github.com/coinbase/cds/pull/107)]

## 8.17.2 (10/16/2025 PST)

#### 🐞 Fixes

- Fix RollingNumber copy issue. [[#102](https://github.com/coinbase/cds/pull/102)]

## 8.17.1 (10/16/2025 PST)

#### 🐞 Fixes

- Remove console.error() call on action props for Banner. [[#113](https://github.com/coinbase/cds/pull/113)]

## 8.17.0 ((10/16/2025, 07:14 AM PST))

This is an artificial version bump with no new change.

## 8.16.5 (10/16/2025 PST)

#### 🐞 Fixes

- Fix onMount Stepper animations when step other than first is initially active. [[#109](https://github.com/coinbase/cds/pull/109)]

## 8.16.4 ((10/15/2025, 07:38 AM PST))

This is an artificial version bump with no new change.

## 8.16.3 ((10/14/2025, 02:02 PM PST))

This is an artificial version bump with no new change.

## 8.16.2 (10/10/2025 PST)

#### 🐞 Fixes

- Change layoutSpacing to spacingVariant. [[#95](https://github.com/coinbase/cds/pull/95)]

## 8.16.1 (10/9/2025 PST)

#### 🐞 Fixes

- Update createThemeCssVars to use String.prototype.replace instead of replaceAll. [[#90](https://github.com/coinbase/cds/pull/90)]

## 8.16.0 (10/8/2025 PST)

#### 🚀 Updates

- New ListCell in layoutSpacing variants. [[#31](https://github.com/coinbase/cds/pull/31)]

## 8.15.0 (10/8/2025 PST)

### 🚀 Updates

- Fix: drop unused useThemeContext. [[#86](https://github.com/coinbase/cds/pull/86)]

## 8.14.2 (10/7/2025 PST)

#### 🐞 Fixes

- Feat: drop specified color for accordion divider. [[#75](https://github.com/coinbase/cds/pull/75)]

## 8.14.1 (10/7/2025 PST)

#### 🐞 Fixes

- Fixed web responsive styles.

## 8.14.0 (10/6/2025 PST)

#### 🚀 Updates

- Add display, style and className props to ThemeProvider and InvertedThemeProvider.

## 8.13.7 (10/6/2025 PST)

This is an artificial version bump with no new change.

## 8.13.6 ((10/3/2025, 01:54 PM PST))

This is an artificial version bump with no new change.

## 8.13.5 (10/3/2025 PST)

#### 🐞 Fixes

- Support custom font in SegmentedTab. [[#65](https://github.com/coinbase/cds/pull/65)]

## 8.13.4 (10/1/2025 PST)

#### 🐞 Fixes

- Fix tour position flickering issue.

## 8.13.3 ((10/1/2025, 03:05 PM PST))

This is an artificial version bump with no new change.

## 8.13.2 (10/1/2025 PST)

#### 🐞 Fixes

- Update links for new repo. [[#42](https://github.com/coinbase/cds/pull/42)]

#### 📘 Misc

- Update Code Connect for Button, IconButton, TabbedChips, MultiContentModule.

## 8.13.1 (9/26/2025 PST)

#### 🐞 Fixes

- Update ARIA attributes for TabbedChips. [[#27](https://github.com/coinbase/cds/pull/27)]

## 8.13.0 (9/25/2025 PST)

#### 🚀 Updates

- Added RollingNumber component.

## 8.12.2 (9/25/2025 PST)

#### 🐞 Fixes

- Fix Dropdown heading covered by overlay issue when mobile modal is enabled.

## 8.12.1 ((9/24/2025, 09:42 AM PST))

This is an artificial version bump with no new change.

## 8.12.0 (9/18/2025 PST)

- Prepare for open source release.
