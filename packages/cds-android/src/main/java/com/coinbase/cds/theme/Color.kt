package com.coinbase.cds.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.graphics.Color

/** Light or dark. A selection *within* a [CdsTheme], not a theme of its own. */
public enum class CdsColorScheme {
    Light,
    Dark,
    ;

    /** The other scheme. What [CdsInvertedThemeProvider] switches to. */
    public fun inverse(): CdsColorScheme = if (this == Light) Dark else Light
}

/**
 * The semantic color tier: one resolved [Color] per name components should reach for (`fg`,
 * `bgPrimary`, `bgLine`, ...) rather than raw [CdsSpectrum] steps. A [CdsTheme] holds one of these
 * per color scheme -- see [CdsColors.Light] and [CdsColors.Dark]. Each name maps onto a specific
 * spectrum step.
 *
 * Named `Colors` rather than `Palette` on purpose. Across Material 3, MUI, Orbit, and Firefox's
 * Acorn, "palette" names the *primitive* tier; the semantic tier is uniformly `<Name>Colors`. CDS
 * already has its own word for the primitive tier -- [CdsSpectrum] -- so calling this a palette
 * would invert the industry meaning of both.
 *
 * Note the three layers this sits between: [CdsSpectrum] is the raw ramps (`gray.step70`), this is
 * the semantic values (`fgMuted` -> an actual [Color]), and [CdsColorToken] is the semantic *names*
 * on their own. `colors[CdsColorToken.FgMuted]` walks from the last to the middle.
 */
@Immutable
public class CdsColors internal constructor(
    // Foreground
    public val fg: Color,
    public val fgMuted: Color,
    public val fgInverse: Color,
    public val fgPrimary: Color,
    public val fgWarning: Color,
    public val fgPositive: Color,
    public val fgNegative: Color,
    // Background
    public val bg: Color,
    public val bgAlternate: Color,
    public val bgInverse: Color,
    public val bgOverlay: Color,
    public val bgPrimary: Color,
    public val bgPrimaryWash: Color,
    public val bgSecondary: Color,
    public val bgTertiary: Color,
    public val bgSecondaryWash: Color,
    public val bgNegative: Color,
    public val bgNegativeWash: Color,
    public val bgPositive: Color,
    public val bgPositiveWash: Color,
    public val bgWarning: Color,
    public val bgWarningWash: Color,
    // Line
    public val bgLine: Color,
    public val bgLineHeavy: Color,
    public val bgLineInverse: Color,
    public val bgLinePrimary: Color,
    public val bgLinePrimarySubtle: Color,
    // Elevation
    public val bgElevation1: Color,
    public val bgElevation2: Color,
    // Accent
    public val accentSubtleGreen: Color,
    public val accentBoldGreen: Color,
    public val accentSubtleBlue: Color,
    public val accentBoldBlue: Color,
    public val accentSubtlePurple: Color,
    public val accentBoldPurple: Color,
    public val accentSubtleYellow: Color,
    public val accentBoldYellow: Color,
    public val accentSubtleRed: Color,
    public val accentBoldRed: Color,
    public val accentSubtleGray: Color,
    public val accentBoldGray: Color,
    // Transparent
    public val transparent: Color,
) {
    /** Resolves a [CdsColorToken] against this set: `CdsTheme.colors[CdsColorToken.FgMuted]`. */
    public operator fun get(token: CdsColorToken): Color = when (token) {
        CdsColorToken.Fg -> fg
        CdsColorToken.FgMuted -> fgMuted
        CdsColorToken.FgInverse -> fgInverse
        CdsColorToken.FgPrimary -> fgPrimary
        CdsColorToken.FgWarning -> fgWarning
        CdsColorToken.FgPositive -> fgPositive
        CdsColorToken.FgNegative -> fgNegative
        CdsColorToken.Bg -> bg
        CdsColorToken.BgAlternate -> bgAlternate
        CdsColorToken.BgInverse -> bgInverse
        CdsColorToken.BgOverlay -> bgOverlay
        CdsColorToken.BgPrimary -> bgPrimary
        CdsColorToken.BgPrimaryWash -> bgPrimaryWash
        CdsColorToken.BgSecondary -> bgSecondary
        CdsColorToken.BgTertiary -> bgTertiary
        CdsColorToken.BgSecondaryWash -> bgSecondaryWash
        CdsColorToken.BgNegative -> bgNegative
        CdsColorToken.BgNegativeWash -> bgNegativeWash
        CdsColorToken.BgPositive -> bgPositive
        CdsColorToken.BgPositiveWash -> bgPositiveWash
        CdsColorToken.BgWarning -> bgWarning
        CdsColorToken.BgWarningWash -> bgWarningWash
        CdsColorToken.BgLine -> bgLine
        CdsColorToken.BgLineHeavy -> bgLineHeavy
        CdsColorToken.BgLineInverse -> bgLineInverse
        CdsColorToken.BgLinePrimary -> bgLinePrimary
        CdsColorToken.BgLinePrimarySubtle -> bgLinePrimarySubtle
        CdsColorToken.BgElevation1 -> bgElevation1
        CdsColorToken.BgElevation2 -> bgElevation2
        CdsColorToken.AccentSubtleGreen -> accentSubtleGreen
        CdsColorToken.AccentBoldGreen -> accentBoldGreen
        CdsColorToken.AccentSubtleBlue -> accentSubtleBlue
        CdsColorToken.AccentBoldBlue -> accentBoldBlue
        CdsColorToken.AccentSubtlePurple -> accentSubtlePurple
        CdsColorToken.AccentBoldPurple -> accentBoldPurple
        CdsColorToken.AccentSubtleYellow -> accentSubtleYellow
        CdsColorToken.AccentBoldYellow -> accentBoldYellow
        CdsColorToken.AccentSubtleRed -> accentSubtleRed
        CdsColorToken.AccentBoldRed -> accentBoldRed
        CdsColorToken.AccentSubtleGray -> accentSubtleGray
        CdsColorToken.AccentBoldGray -> accentBoldGray
        CdsColorToken.Transparent -> transparent
    }

    // Driven by [CdsColorToken] rather than listing 43 properties by hand, so a token added to the
    // scale can't be silently left out of equality -- [get] already forces every property to have
    // a token, and this makes that pairing carry the whole contract. Equality is load-bearing:
    // `CdsThemeProvider` keys `remember` on it, so identity equality would rebuild the resolved
    // theme (and invalidate the whole subtree) on every recomposition of an inline-built theme.
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsColors) return false
        return CdsColorToken.entries.all { this[it] == other[it] }
    }

    override fun hashCode(): Int {
        var result = 0
        for (token in CdsColorToken.entries) result = 31 * result + this[token].hashCode()
        return result
    }

    override fun toString(): String = "CdsColors(bg=$bg, fg=$fg, bgPrimary=$bgPrimary, ...)"

    public companion object {
        /** The `cds-default` semantic colors in the light scheme. */
        public val Light: CdsColors = CdsSpectrum.Light.run {
            CdsColors(
                fg = gray.step100,
                fgMuted = gray.step60,
                fgInverse = gray.step0,
                fgPrimary = blue.step60,
                fgWarning = orange.step60,
                fgPositive = green.step60,
                fgNegative = red.step60,
                bg = gray.step0,
                bgAlternate = gray.step10,
                bgInverse = gray.step100,
                bgOverlay = gray.step80.copy(alpha = 0.33f),
                bgPrimary = blue.step60,
                bgPrimaryWash = blue.step0,
                bgSecondary = gray.step10,
                bgTertiary = gray.step20,
                bgSecondaryWash = gray.step5,
                bgNegative = red.step60,
                bgNegativeWash = red.step0,
                bgPositive = green.step60,
                bgPositiveWash = green.step0,
                bgWarning = orange.step60,
                bgWarningWash = orange.step0,
                bgLine = gray.step60.copy(alpha = 0.2f),
                bgLineHeavy = gray.step60.copy(alpha = 0.66f),
                bgLineInverse = gray.step0,
                bgLinePrimary = blue.step60,
                bgLinePrimarySubtle = blue.step20,
                bgElevation1 = gray.step0,
                bgElevation2 = gray.step0,
                accentSubtleGreen = green.step0,
                accentBoldGreen = green.step60,
                accentSubtleBlue = blue.step0,
                accentBoldBlue = blue.step60,
                accentSubtlePurple = purple.step0,
                accentBoldPurple = purple.step80,
                accentSubtleYellow = yellow.step0,
                accentBoldYellow = yellow.step30,
                accentSubtleRed = red.step0,
                accentBoldRed = red.step60,
                accentSubtleGray = gray.step10,
                accentBoldGray = gray.step80,
                transparent = Color.Transparent,
            )
        }

        /** The `cds-default` semantic colors in the dark scheme. */
        public val Dark: CdsColors = CdsSpectrum.Dark.run {
            CdsColors(
                fg = gray.step100,
                fgMuted = gray.step60,
                fgInverse = gray.step0,
                fgPrimary = blue.step70,
                fgWarning = orange.step70,
                fgPositive = green.step60,
                fgNegative = red.step60,
                bg = gray.step0,
                bgAlternate = gray.step5,
                bgInverse = gray.step100,
                bgOverlay = gray.step0.copy(alpha = 0.33f),
                bgPrimary = blue.step70,
                bgPrimaryWash = blue.step0,
                bgSecondary = gray.step15,
                bgTertiary = gray.step20,
                bgSecondaryWash = gray.step5,
                bgNegative = red.step60,
                bgNegativeWash = red.step0,
                bgPositive = green.step60,
                bgPositiveWash = green.step0,
                bgWarning = orange.step60,
                bgWarningWash = orange.step0,
                bgLine = gray.step60.copy(alpha = 0.2f),
                bgLineHeavy = gray.step60.copy(alpha = 0.66f),
                bgLineInverse = gray.step0,
                bgLinePrimary = blue.step70,
                bgLinePrimarySubtle = blue.step20,
                bgElevation1 = gray.step5,
                bgElevation2 = gray.step10,
                accentSubtleGreen = green.step0,
                accentBoldGreen = green.step60,
                accentSubtleBlue = blue.step0,
                accentBoldBlue = blue.step60,
                accentSubtlePurple = purple.step0,
                accentBoldPurple = purple.step80,
                accentSubtleYellow = yellow.step0,
                accentBoldYellow = yellow.step30,
                accentSubtleRed = red.step0,
                accentBoldRed = red.step60,
                accentSubtleGray = gray.step10,
                accentBoldGray = gray.step80,
                transparent = Color.Transparent,
            )
        }
    }
}

/**
 * Every semantic color name in [CdsColors], as a value you can store, pass around, and enumerate.
 * This carries no color data itself; resolve one against a [CdsColors] with [CdsColors.get], and
 * iterate the whole set with `CdsColorToken.entries`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsColorToken {
    // Foreground
    Fg, FgMuted, FgInverse, FgPrimary, FgWarning, FgPositive, FgNegative,

    // Background
    Bg, BgAlternate, BgInverse, BgOverlay, BgPrimary, BgPrimaryWash, BgSecondary, BgTertiary,
    BgSecondaryWash, BgNegative, BgNegativeWash, BgPositive, BgPositiveWash, BgWarning,
    BgWarningWash,

    // Line
    BgLine, BgLineHeavy, BgLineInverse, BgLinePrimary, BgLinePrimarySubtle,

    // Elevation
    BgElevation1, BgElevation2,

    // Accent
    AccentSubtleGreen, AccentBoldGreen, AccentSubtleBlue, AccentBoldBlue, AccentSubtlePurple,
    AccentBoldPurple, AccentSubtleYellow, AccentBoldYellow, AccentSubtleRed, AccentBoldRed,
    AccentSubtleGray, AccentBoldGray,

    // Transparent
    Transparent,
    ;

    /** The canonical CDS spelling (`fgMuted`), for labels and for parsing serialized themes. */
    public val tokenName: String get() = name.replaceFirstChar { it.lowercase() }
}
