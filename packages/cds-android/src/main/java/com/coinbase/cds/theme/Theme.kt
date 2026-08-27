package com.coinbase.cds.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocal
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.ProvidableCompositionLocal
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.remember
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.platform.LocalInspectionMode

/**
 * A complete set of CDS design token values, in both color schemes. This is the thing you *author*
 * -- see [cdsTheme] -- while the accessors on its [Companion] read the *ambient* theme installed by
 * the nearest [CdsThemeProvider].
 *
 * Both halves of the light/dark pair live here rather than in two separate themes. That's what
 * makes [CdsInvertedThemeProvider] writeable at all (the inverse colors have to be *reachable*),
 * and it means scheme selection is a [CdsColorScheme] argument to the provider instead of something
 * every consumer re-implements as a `when` over theme-times-scheme.
 *
 * Watch one seam: `CdsTheme.colors` (on the companion) is the ambient, *resolved* color set for the
 * current scheme, while `someTheme.lightColors` (on an instance) is one explicit scheme of one
 * explicit theme. They read similarly and mean different things.
 *
 * The constructor is `internal` on purpose. In Kotlin, a public constructor with one parameter per
 * token would put the entire token schema into the published ABI: adding a token changes the
 * constructor signature, so anything compiled against the old jar breaks. [cdsTheme] exists so
 * adding a token stays a one-field, non-breaking change.
 */
@Immutable
public class CdsTheme internal constructor(
    /** Stable identifier, e.g. `cds-default`. */
    public val id: String,
    public val lightSpectrum: CdsSpectrum,
    public val darkSpectrum: CdsSpectrum,
    public val lightColors: CdsColors,
    public val darkColors: CdsColors,
    public val lightIllustrationColors: CdsIllustrationColors,
    public val darkIllustrationColors: CdsIllustrationColors,
    public val space: CdsSpace,
    public val borderWidth: CdsBorderWidth,
    public val borderRadius: CdsBorderRadius,
    public val iconSize: CdsIconSize,
    public val avatarSize: CdsAvatarSize,
    public val controlSize: CdsControlSize,
    public val typography: CdsTypography,
    public val shadows: CdsShadows,
) {
    // Value equality, not identity. Load-bearing: [CdsThemeProvider] keys `remember` on it, so with
    // identity equality a theme built inline at a call site would produce a new resolved theme --
    // and re-invalidate the whole subtree -- on every recomposition.
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsTheme) return false
        return id == other.id &&
            lightSpectrum == other.lightSpectrum &&
            darkSpectrum == other.darkSpectrum &&
            lightColors == other.lightColors &&
            darkColors == other.darkColors &&
            lightIllustrationColors == other.lightIllustrationColors &&
            darkIllustrationColors == other.darkIllustrationColors &&
            space == other.space &&
            borderWidth == other.borderWidth &&
            borderRadius == other.borderRadius &&
            iconSize == other.iconSize &&
            avatarSize == other.avatarSize &&
            controlSize == other.controlSize &&
            typography == other.typography &&
            shadows == other.shadows
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + lightSpectrum.hashCode()
        result = 31 * result + darkSpectrum.hashCode()
        result = 31 * result + lightColors.hashCode()
        result = 31 * result + darkColors.hashCode()
        result = 31 * result + lightIllustrationColors.hashCode()
        result = 31 * result + darkIllustrationColors.hashCode()
        result = 31 * result + space.hashCode()
        result = 31 * result + borderWidth.hashCode()
        result = 31 * result + borderRadius.hashCode()
        result = 31 * result + iconSize.hashCode()
        result = 31 * result + avatarSize.hashCode()
        result = 31 * result + controlSize.hashCode()
        result = 31 * result + typography.hashCode()
        result = 31 * result + shadows.hashCode()
        return result
    }

    override fun toString(): String = "CdsTheme(id=$id)"

    /**
     * A [CdsTheme] with one [CdsColorScheme] selected -- what [LocalCdsTheme] holds. The
     * scheme-dependent axes are picked, and the scheme-independent ones pass through.
     */
    @Immutable
    public class Resolved internal constructor(
        public val theme: CdsTheme,
        public val colorScheme: CdsColorScheme,
    ) {
        private val isLight = colorScheme == CdsColorScheme.Light

        public val colors: CdsColors = if (isLight) theme.lightColors else theme.darkColors
        public val spectrum: CdsSpectrum = if (isLight) theme.lightSpectrum else theme.darkSpectrum
        public val illustrationColors: CdsIllustrationColors =
            if (isLight) theme.lightIllustrationColors else theme.darkIllustrationColors

        public val space: CdsSpace get() = theme.space
        public val borderWidth: CdsBorderWidth get() = theme.borderWidth
        public val borderRadius: CdsBorderRadius get() = theme.borderRadius
        public val iconSize: CdsIconSize get() = theme.iconSize
        public val avatarSize: CdsAvatarSize get() = theme.avatarSize
        public val controlSize: CdsControlSize get() = theme.controlSize
        public val typography: CdsTypography get() = theme.typography
        public val shadows: CdsShadows get() = theme.shadows

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (other !is Resolved) return false
            return theme == other.theme && colorScheme == other.colorScheme
        }

        override fun hashCode(): Int = 31 * theme.hashCode() + colorScheme.hashCode()

        override fun toString(): String = "CdsTheme.Resolved(theme=${theme.id}, $colorScheme)"
    }

    /**
     * Reads design tokens from the nearest [CdsThemeProvider] above the call site, e.g.
     * `CdsTheme.colors.bgPrimary` or `CdsTheme.space.x2`.
     */
    public companion object {
        private val current: Resolved
            @Composable @ReadOnlyComposable
            get() = LocalCdsTheme.current
                // A `@Preview` of a :cds component with no provider renders the default theme
                // instead of crashing. External developers hit that before anything else, and the
                // error message wouldn't be in a codebase they can grep.
                ?: if (LocalInspectionMode.current) previewTheme() else noThemeError()

        public val colorScheme: CdsColorScheme
            @Composable @ReadOnlyComposable get() = current.colorScheme
        public val spectrum: CdsSpectrum
            @Composable @ReadOnlyComposable get() = current.spectrum
        public val colors: CdsColors
            @Composable @ReadOnlyComposable get() = current.colors
        public val illustrationColors: CdsIllustrationColors
            @Composable @ReadOnlyComposable get() = current.illustrationColors
        public val space: CdsSpace
            @Composable @ReadOnlyComposable get() = current.space
        public val borderWidth: CdsBorderWidth
            @Composable @ReadOnlyComposable get() = current.borderWidth
        public val borderRadius: CdsBorderRadius
            @Composable @ReadOnlyComposable get() = current.borderRadius
        public val iconSize: CdsIconSize
            @Composable @ReadOnlyComposable get() = current.iconSize
        public val avatarSize: CdsAvatarSize
            @Composable @ReadOnlyComposable get() = current.avatarSize
        public val controlSize: CdsControlSize
            @Composable @ReadOnlyComposable get() = current.controlSize
        public val typography: CdsTypography
            @Composable @ReadOnlyComposable get() = current.typography
        public val shadows: CdsShadows
            @Composable @ReadOnlyComposable get() = current.shadows
    }
}

/**
 * The ambient resolved theme, or `null` outside any [CdsThemeProvider].
 *
 * Read-only by design -- provide a theme with [CdsThemeProvider] rather than by writing to this.
 * It's public so `CompositionLocalConsumerModifierNode` implementations can read theme values
 * outside composition, which is what custom `Modifier`s need and what Material 3 exposes
 * `LocalMaterialTheme` for.
 *
 * Globally *accessible*, but not globally *valued*: `.current` resolves per call site by walking up
 * the composition tree to the nearest enclosing provider, so providers nest -- a [CdsThemeProvider]
 * deeper in the tree overrides this for its subtree only.
 */
public val LocalCdsTheme: CompositionLocal<CdsTheme.Resolved?> get() = LocalCdsThemeProvidable

private val LocalCdsThemeProvidable: ProvidableCompositionLocal<CdsTheme.Resolved?> =
    staticCompositionLocalOf { null }

/**
 * The scheme the device's dark-mode setting implies. The single answer to "which scheme, if nobody
 * said?" -- shared by [CdsThemeProvider]'s default and by the preview fallback so the two can't
 * drift into disagreeing.
 */
@Composable
@ReadOnlyComposable
private fun systemColorScheme(): CdsColorScheme =
    if (isSystemInDarkTheme()) CdsColorScheme.Dark else CdsColorScheme.Light

// One per scheme, so the fallback can honor `@Preview(uiMode = UI_MODE_NIGHT_YES)` without
// allocating a Resolved on every token read in the preview.
//
// Lazy rather than eager so this file's initializer doesn't depend on CdsDefaultTheme's, and only
// previews ever pay for it -- the elvis in `current` short-circuits everywhere else.
private val PreviewThemeLight: CdsTheme.Resolved by lazy(LazyThreadSafetyMode.PUBLICATION) {
    CdsTheme.Resolved(CdsDefaultTheme, CdsColorScheme.Light)
}

private val PreviewThemeDark: CdsTheme.Resolved by lazy(LazyThreadSafetyMode.PUBLICATION) {
    CdsTheme.Resolved(CdsDefaultTheme, CdsColorScheme.Dark)
}

// Takes the scheme from the preview environment rather than assuming light: `@Preview` surfaces
// dark mode as a Configuration, which is exactly what `isSystemInDarkTheme()` reads, so a dark
// preview of an unwrapped component renders dark.
@Composable
@ReadOnlyComposable
private fun previewTheme(): CdsTheme.Resolved =
    if (systemColorScheme() == CdsColorScheme.Dark) PreviewThemeDark else PreviewThemeLight

private fun noThemeError(): Nothing =
    error("No CDS theme found. Wrap your composables in CdsThemeProvider.")

/**
 * Provides CDS design tokens to the composition. Consume them via [CdsTheme], e.g.
 * `CdsTheme.colors.bgPrimary` or `CdsTheme.space.x2`, from anywhere below this provider.
 *
 * Both parameters default to the enclosing provider's value, so passing one overrides only that
 * one: `CdsThemeProvider(colorScheme = CdsColorScheme.Dark) { }` keeps the ancestor's theme, and a
 * bare nested `CdsThemeProvider { }` changes nothing rather than silently reverting to
 * [CdsDefaultTheme]. Default parameter expressions on a composable are evaluated in the
 * composable's own scope and may read CompositionLocals, which is the same mechanism behind
 * `MaterialTheme(colorScheme = MaterialTheme.colorScheme)`.
 *
 * At the root of a tree, where there's no ancestor, [theme] falls back to [CdsDefaultTheme] and
 * [colorScheme] to the system dark-mode setting.
 */
@Composable
public fun CdsThemeProvider(
    theme: CdsTheme = LocalCdsTheme.current?.theme ?: CdsDefaultTheme,
    colorScheme: CdsColorScheme = LocalCdsTheme.current?.colorScheme ?: systemColorScheme(),
    content: @Composable () -> Unit,
) {
    val resolved = remember(theme, colorScheme) { CdsTheme.Resolved(theme, colorScheme) }
    CompositionLocalProvider(LocalCdsThemeProvidable provides resolved, content = content)
}

/**
 * Flips the ambient [CdsColorScheme] for its subtree, keeping the same [CdsTheme] -- CDS's
 * treatment for content that has to read against the opposite background, e.g. a dark tooltip on a
 * light screen.
 *
 * No component changes were needed to support this: [com.coinbase.cds.components.text.Text] already
 * defaults its color to `CdsTheme.colors.fg` and
 * [com.coinbase.cds.components.button.Button] resolves everything through `CdsTheme.colors`, so
 * both pick up the inverted colors automatically.
 *
 * There is no "inverse colors missing" case to handle: [CdsTheme] holds both schemes as non-null,
 * so the scheme this flips to always exists.
 *
 * @throws IllegalStateException if there is no [CdsThemeProvider] ancestor -- there's nothing to
 * invert without one.
 */
@Composable
public fun CdsInvertedThemeProvider(content: @Composable () -> Unit) {
    val parent = LocalCdsTheme.current
        ?: error("CdsInvertedThemeProvider requires a CdsThemeProvider ancestor.")
    CdsThemeProvider(
        theme = parent.theme,
        colorScheme = parent.colorScheme.inverse(),
        content = content,
    )
}
