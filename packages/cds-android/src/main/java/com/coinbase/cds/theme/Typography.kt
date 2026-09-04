package com.coinbase.cds.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

/**
 * The primitive tier for type: the four font families the 13 [CdsTypography] composites are built
 * from. The grouping is `display1`-`title2` on [display], `title3`-`body` on [sans], `label1`
 * onward on [text], plus [mono].
 *
 * Internal, and staying that way: the 13 [TextStyle]s are the public surface. This exists so a
 * theme can restate a family once instead of thirteen times.
 *
 * CDS specifies Inter (sans/display/text) and Source Code Pro (mono), but no font resources are
 * bundled here, so all four currently resolve to a platform family -- the split is structural
 * rather than visible.
 */
@Immutable
internal class CdsFontFamilies(
    val display: FontFamily,
    val sans: FontFamily,
    val text: FontFamily,
    val mono: FontFamily,
) {
    companion object {
        val Default: CdsFontFamilies = CdsFontFamilies(
            display = FontFamily.Default,
            sans = FontFamily.Default,
            text = FontFamily.Default,
            mono = FontFamily.Monospace,
        )
    }
}

/**
 * The thirteen named type variants CDS exposes (not a numeric scale), each a composite token:
 * family, size, weight, and line height bundled into one [TextStyle]. The composite is the right
 * unit because a theme can vary all four per role independently, so splitting them into parallel
 * per-axis scales would only invite mismatched combinations.
 *
 * Families come from the internal [CdsFontFamilies] primitive.
 *
 * One token isn't representable as a [TextStyle]: `textTransform` is `uppercase` for [caption]
 * only (every other variant is `none`). Compose has no text-transform equivalent, so
 * [com.coinbase.cds.components.text.Text] applies it itself (uppercasing its string when given
 * [caption]) rather than pushing that burden onto every caller; anyone rendering raw [caption]
 * text outside of `Text` still needs to uppercase it manually.
 */
@Immutable
public class CdsTypography internal constructor(
    public val display1: TextStyle,
    public val display2: TextStyle,
    public val display3: TextStyle,
    public val title1: TextStyle,
    public val title2: TextStyle,
    public val title3: TextStyle,
    public val title4: TextStyle,
    public val headline: TextStyle,
    public val body: TextStyle,
    public val label1: TextStyle,
    public val label2: TextStyle,
    public val caption: TextStyle,
    public val legal: TextStyle,
) {
    /** Resolves a [CdsFontToken]: `CdsTheme.typography[CdsFontToken.Headline]`. */
    public operator fun get(token: CdsFontToken): TextStyle = when (token) {
        CdsFontToken.Display1 -> display1
        CdsFontToken.Display2 -> display2
        CdsFontToken.Display3 -> display3
        CdsFontToken.Title1 -> title1
        CdsFontToken.Title2 -> title2
        CdsFontToken.Title3 -> title3
        CdsFontToken.Title4 -> title4
        CdsFontToken.Headline -> headline
        CdsFontToken.Body -> body
        CdsFontToken.Label1 -> label1
        CdsFontToken.Label2 -> label2
        CdsFontToken.Caption -> caption
        CdsFontToken.Legal -> legal
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsTypography) return false
        return CdsFontToken.entries.all { this[it] == other[it] }
    }

    override fun hashCode(): Int {
        var result = 0
        for (token in CdsFontToken.entries) result = 31 * result + this[token].hashCode()
        return result
    }

    override fun toString(): String = "CdsTypography(body=$body, ...)"

    public companion object {
        /** The `cds-default` type scale. */
        public val Default: CdsTypography = CdsFontFamilies.Default.run {
            fun style(family: FontFamily, fontSize: Int, lineHeight: Int, fontWeight: FontWeight) =
                TextStyle(
                    fontFamily = family,
                    fontWeight = fontWeight,
                    fontSize = fontSize.sp,
                    lineHeight = lineHeight.sp,
                )
            CdsTypography(
                display1 = style(display, fontSize = 64, lineHeight = 72, fontWeight = FontWeight.Normal),
                display2 = style(display, fontSize = 48, lineHeight = 56, fontWeight = FontWeight.Normal),
                display3 = style(display, fontSize = 40, lineHeight = 48, fontWeight = FontWeight.Normal),
                title1 = style(display, fontSize = 28, lineHeight = 36, fontWeight = FontWeight.SemiBold),
                title2 = style(display, fontSize = 28, lineHeight = 36, fontWeight = FontWeight.Normal),
                title3 = style(sans, fontSize = 20, lineHeight = 28, fontWeight = FontWeight.SemiBold),
                title4 = style(sans, fontSize = 20, lineHeight = 28, fontWeight = FontWeight.Normal),
                headline = style(sans, fontSize = 16, lineHeight = 24, fontWeight = FontWeight.SemiBold),
                body = style(sans, fontSize = 16, lineHeight = 24, fontWeight = FontWeight.Normal),
                label1 = style(text, fontSize = 14, lineHeight = 20, fontWeight = FontWeight.SemiBold),
                label2 = style(text, fontSize = 14, lineHeight = 20, fontWeight = FontWeight.Normal),
                caption = style(text, fontSize = 13, lineHeight = 16, fontWeight = FontWeight.SemiBold),
                legal = style(text, fontSize = 13, lineHeight = 16, fontWeight = FontWeight.Normal),
            )
        }
    }
}

/**
 * The named type variant to render -- the same thirteen keys as [CdsTypography]. This is the whole
 * story for family, size, weight, and line height: all four are baked together into one [TextStyle]
 * per variant, so picking a [CdsFontToken] is enough to get every one of them correct at once.
 *
 * Resolve one against a theme with [CdsTypography.get]; iterate the whole set with
 * `CdsFontToken.entries`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsFontToken {
    Display1, Display2, Display3,
    Title1, Title2, Title3, Title4,
    Headline, Body, Label1, Label2,
    Caption, Legal,
    ;

    /** The canonical CDS key (`title1`), for labels and for parsing serialized themes. */
    public val tokenName: String get() = name.replaceFirstChar { it.lowercase() }
}
