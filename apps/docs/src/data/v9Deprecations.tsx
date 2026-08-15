import type { DeprecationTableRow } from '@site/src/components/page/DeprecationTable';

export const componentDeprecations: DeprecationTableRow[] = [
  {
    packages: ['web', 'mobile'],
    deprecated: <>AvatarButton border props</>,
    notes: <>Border-related props have no effect; remove them.</>,
  },
  {
    packages: ['web', 'mobile'],
    deprecated: <>IconCounterButton.dangerouslySetColor</>,
    notes: (
      <>
        Use <code>styles.icon</code>, <code>classNames.icon</code>, or <code>color</code> on web.
        Use <code>styles.icon</code> or <code>color</code> on mobile.
      </>
    ),
  },
  {
    packages: ['web', 'mobile'],
    deprecated: <>Spinner</>,
    notes: (
      <>
        Prefer indeterminate <code>ProgressCircle</code> and <code>ActivityIndicator</code> on
        mobile where documented.
      </>
    ),
  },
  {
    packages: ['web', 'mobile'],
    deprecated: <>Stepper.progressSpringConfig / Stepper.defaultProgressSpringConfig</>,
    notes: (
      <>
        Use <code>progressTimingConfig</code> / <code>defaultProgressTimingConfig</code>.
      </>
    ),
  },
  {
    packages: ['web', 'mobile'],
    deprecated: <>Text.dangerouslySetColor</>,
    notes: (
      <>
        Use <code>style</code>, <code>className</code>, or <code>color</code> on web. Use{' '}
        <code>style</code> or the <code>color</code> style prop on mobile.
      </>
    ),
  },
  {
    packages: ['web', 'mobile'],
    deprecated: (
      <>
        TextBody, TextCaption, TextDisplay*, TextHeadline, TextInherited, TextLabel*, TextLegal,
        TextTitle*
      </>
    ),
    notes: (
      <>
        Use <code>Text</code> with the matching <code>font</code>.
      </>
    ),
  },
  {
    packages: ['mobile'],
    deprecated: <>DefaultSlideButtonHandle.animationConfig</>,
    notes: (
      <>
        Use <code>slideButtonSpringConfig</code> with Reanimated <code>withSpring</code>.
      </>
    ),
  },
];

export const hookFunctionDeprecations: DeprecationTableRow[] = [
  {
    packages: ['common'],
    deprecated: <>getButtonSpacingProps</>,
    notes: (
      <>
        Going away without a built-in replacement. Handle button spacing locally or with your own
        helper.
      </>
    ),
  },
  {
    packages: ['common'],
    deprecated: <>getDotSize</>,
    notes: <>Fixed pixel sizing for dots is no longer provided as a shared helper.</>,
  },
  {
    packages: ['common'],
    deprecated: <>useMergeRefs</>,
    notes: (
      <>
        Use <code>mergeRefs</code> from <code>@coinbase/cds-common/utils/mergeRefs</code>. Automated
        by <code>migrate-use-merge-refs-import</code>.
      </>
    ),
  },
  {
    packages: ['web'],
    deprecated: <>usePopper</>,
    notes: (
      <>
        Temporary compatibility shim. Use Floating UI directly in your app if you still need
        popper-like positioning.
      </>
    ),
  },
  {
    packages: ['mobile'],
    deprecated: <>useStatusBarHeight</>,
    notes: (
      <>
        Use <code>useSafeAreaInsets().top</code> from <code>react-native-safe-area-context</code>.
      </>
    ),
  },
  {
    packages: ['mobile'],
    deprecated: <>useHasNotch</>,
    notes: (
      <>
        Replace with <code>useSafeAreaInsets().top &gt; 20</code> from{' '}
        <code>react-native-safe-area-context</code> if you need an equivalent.
      </>
    ),
  },
];

export const tokenConstantDeprecations: DeprecationTableRow[] = [
  {
    packages: ['common'],
    deprecated: (
      <>
        <code>[tokens/cell]</code> compactListHeight, listHeight, selectOptionHeight
      </>
    ),
    notes: <>Define your own values or rely on layout-driven sizing.</>,
  },
  {
    packages: ['common'],
    deprecated: (
      <>
        <code>[tokens/dot]</code> dotSizeTokens
      </>
    ),
    notes: <>Define your own values or rely on layout-driven sizing.</>,
  },
];

export const typeDeprecations: DeprecationTableRow[] = [
  {
    packages: ['mobile'],
    deprecated: <>MobileBannerProps</>,
    notes: (
      <>
        Use <code>BannerProps</code>.
      </>
    ),
  },
  {
    packages: ['common'],
    deprecated: (
      <>
        <code>[types/BoxBaseProps]</code> PositionStyles
      </>
    ),
    notes: (
      <>
        Prefer <code>PositionStyles</code> from mobile <code>styleProps</code> or web{' '}
        <code>styleProps</code> where the guidance applies.
      </>
    ),
  },
  {
    packages: ['common'],
    deprecated: <>CardHeaderProps</>,
    notes: (
      <>
        Use <code>ContentCardHeaderProps</code> for content cards.
      </>
    ),
  },
  {
    packages: ['common'],
    deprecated: <>CardMediaProps</>,
    notes: (
      <>
        Use <code>SpotSquare</code>, <code>Pictogram</code>, or <code>RemoteImage</code> by type,
        per JSDoc.
      </>
    ),
  },
  {
    packages: ['common'],
    deprecated: <>DimensionStyles value types</>,
    notes: (
      <>
        Prefer dimension props with <code>&apos;auto&apos; | number | string</code>.
      </>
    ),
  },
  {
    packages: ['common'],
    deprecated: (
      <>
        <code>[types/Position]</code> Position
      </>
    ),
    notes: (
      <>
        Use <code>CSSProperties[&apos;position&apos;]</code> on web or{' '}
        <code>ViewStyle[&apos;position&apos;]</code> on React Native.
      </>
    ),
  },
];
