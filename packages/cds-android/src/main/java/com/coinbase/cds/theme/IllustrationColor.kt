package com.coinbase.cds.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.graphics.Color

/**
 * Color tokens intended for illustrations and graphics rather than UI chrome. A few are hand-tuned
 * literals rather than references into [CdsSpectrum], which is why they appear here as raw hex.
 *
 * Plural: this is a container of colors, matching [CdsColors].
 */
@Immutable
public class CdsIllustrationColors internal constructor(
    public val primary: Color,
    public val black: Color,
    public val white: Color,
    public val gray: Color,
    public val gray2: Color,
    public val gray3: Color,
    public val gray4: Color,
    public val positive: Color,
    public val negative: Color,
    public val accent1: Color,
    public val accent2: Color,
    public val accent3: Color,
    public val accent4: Color,
    public val invert: Color,
    public val invert2: Color,
) {
    /** Resolves a [CdsIllustrationColorToken]: `CdsTheme.illustrationColors[CdsIllustrationColorToken.Primary]`. */
    public operator fun get(token: CdsIllustrationColorToken): Color = when (token) {
        CdsIllustrationColorToken.Primary -> primary
        CdsIllustrationColorToken.Black -> black
        CdsIllustrationColorToken.White -> white
        CdsIllustrationColorToken.Gray -> gray
        CdsIllustrationColorToken.Gray2 -> gray2
        CdsIllustrationColorToken.Gray3 -> gray3
        CdsIllustrationColorToken.Gray4 -> gray4
        CdsIllustrationColorToken.Positive -> positive
        CdsIllustrationColorToken.Negative -> negative
        CdsIllustrationColorToken.Accent1 -> accent1
        CdsIllustrationColorToken.Accent2 -> accent2
        CdsIllustrationColorToken.Accent3 -> accent3
        CdsIllustrationColorToken.Accent4 -> accent4
        CdsIllustrationColorToken.Invert -> invert
        CdsIllustrationColorToken.Invert2 -> invert2
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsIllustrationColors) return false
        return primary == other.primary &&
            black == other.black &&
            white == other.white &&
            gray == other.gray &&
            gray2 == other.gray2 &&
            gray3 == other.gray3 &&
            gray4 == other.gray4 &&
            positive == other.positive &&
            negative == other.negative &&
            accent1 == other.accent1 &&
            accent2 == other.accent2 &&
            accent3 == other.accent3 &&
            accent4 == other.accent4 &&
            invert == other.invert &&
            invert2 == other.invert2
    }

    override fun hashCode(): Int {
        var result = primary.hashCode()
        result = 31 * result + black.hashCode()
        result = 31 * result + white.hashCode()
        result = 31 * result + gray.hashCode()
        result = 31 * result + gray2.hashCode()
        result = 31 * result + gray3.hashCode()
        result = 31 * result + gray4.hashCode()
        result = 31 * result + positive.hashCode()
        result = 31 * result + negative.hashCode()
        result = 31 * result + accent1.hashCode()
        result = 31 * result + accent2.hashCode()
        result = 31 * result + accent3.hashCode()
        result = 31 * result + accent4.hashCode()
        result = 31 * result + invert.hashCode()
        result = 31 * result + invert2.hashCode()
        return result
    }

    override fun toString(): String = "CdsIllustrationColors(primary=$primary, ...)"

    public companion object {
        /** The `cds-default` illustration colors in the light scheme. */
        public val Light: CdsIllustrationColors = CdsSpectrum.Light.run {
            CdsIllustrationColors(
                primary = blue.step60,
                black = gray.step100,
                white = gray.step0,
                gray = gray.step20,
                gray2 = Color(0xFF0A0B0F),
                gray3 = Color(0xFFCED2DC),
                gray4 = Color(0xFFC8CBD2),
                positive = green.step30,
                negative = red.step50,
                accent1 = Color(0xFFFFD200),
                accent2 = teal.step15,
                accent3 = orange.step40,
                accent4 = blue.step20,
                invert = Color(0xFF0A0B0E),
                invert2 = Color(0xFFFFFFFE),
            )
        }

        /** The `cds-default` illustration colors in the dark scheme. */
        public val Dark: CdsIllustrationColors = CdsSpectrum.Dark.run {
            CdsIllustrationColors(
                primary = blue.step70,
                black = gray.step0,
                white = gray.step100,
                gray = gray.step30,
                gray2 = gray.step30,
                gray3 = gray.step100,
                gray4 = gray.step100,
                positive = green.step70,
                negative = red.step60,
                accent1 = Color(0xFFECD069),
                accent2 = teal.step80,
                accent3 = orange.step60,
                accent4 = blue.step80,
                invert = gray.step100,
                invert2 = gray.step50,
            )
        }
    }
}

/**
 * Every color in [CdsIllustrationColors] as an enumerable value. Resolve one against a theme with
 * [CdsIllustrationColors.get]; iterate the palette with `CdsIllustrationColorToken.entries`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsIllustrationColorToken {
    Primary, Black, White, Gray, Gray2, Gray3, Gray4,
    Positive, Negative, Accent1, Accent2, Accent3, Accent4, Invert, Invert2,
    ;

    /** The canonical CDS spelling (`gray4`), matching the RN `illustrationColor` key. */
    public val tokenName: String get() = name.replaceFirstChar { it.lowercase() }
}
