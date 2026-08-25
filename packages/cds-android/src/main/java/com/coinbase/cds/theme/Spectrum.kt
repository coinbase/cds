package com.coinbase.cds.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.graphics.Color

/**
 * One hue's thirteen tonal steps (0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100).
 * Split out from [CdsSpectrum] into a per-hue class -- rather than one 143-property
 * class -- because a single JVM constructor with that many Color-typed parameters
 * ([Color] is a value class over `ULong`, so each one occupies two JVM parameter slots)
 * would exceed the 255-slot method limit.
 *
 * Instances come from [CdsSpectrum]; build a modified one through `cdsTheme { lightSpectrum { } }`.
 */
@Immutable
public class CdsColorRamp internal constructor(
    public val step0: Color,
    public val step5: Color,
    public val step10: Color,
    public val step15: Color,
    public val step20: Color,
    public val step30: Color,
    public val step40: Color,
    public val step50: Color,
    public val step60: Color,
    public val step70: Color,
    public val step80: Color,
    public val step90: Color,
    public val step100: Color,
) {
    /** Resolves a [CdsColorRampToken]: `theme.spectrum.blue[CdsColorRampToken.Step60]`. */
    public operator fun get(token: CdsColorRampToken): Color = when (token) {
        CdsColorRampToken.Step0 -> step0
        CdsColorRampToken.Step5 -> step5
        CdsColorRampToken.Step10 -> step10
        CdsColorRampToken.Step15 -> step15
        CdsColorRampToken.Step20 -> step20
        CdsColorRampToken.Step30 -> step30
        CdsColorRampToken.Step40 -> step40
        CdsColorRampToken.Step50 -> step50
        CdsColorRampToken.Step60 -> step60
        CdsColorRampToken.Step70 -> step70
        CdsColorRampToken.Step80 -> step80
        CdsColorRampToken.Step90 -> step90
        CdsColorRampToken.Step100 -> step100
    }

    // Driven by [CdsColorRampToken] rather than listing every step by hand, so a step added to the
    // scale can't be silently left out of equality. Equality is load-bearing -- see [CdsColors].
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsColorRamp) return false
        return CdsColorRampToken.entries.all { this[it] == other[it] }
    }

    override fun hashCode(): Int {
        var result = 0
        for (token in CdsColorRampToken.entries) result = 31 * result + this[token].hashCode()
        return result
    }

    override fun toString(): String = "CdsColorRamp(step60=$step60, ...)"
}

/**
 * Every tonal step of a [CdsColorRamp] as an enumerable value. Resolve one against a ramp with
 * [CdsColorRamp.get]; iterate the whole ramp with `CdsColorRampToken.entries`.
 *
 * Pairs with a [CdsSpectrumHueToken] to name a single spectrum value: `Blue` + `Step60` is the
 * color CDS calls `blue60`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsColorRampToken {
    Step0, Step5, Step10, Step15, Step20, Step30, Step40,
    Step50, Step60, Step70, Step80, Step90, Step100,
    ;

    /** The canonical CDS spelling of the step alone (`60`), for labels and serialized themes. */
    public val tokenName: String get() = name.removePrefix("Step")
}

/**
 * The raw CDS color palette ("spectrum"): eleven hues, each a [CdsColorRamp]. This is the
 * primitive tier the semantic [CdsColors] tier is built from.
 *
 * Public deliberately. Hiding it wouldn't stop anyone reaching past the semantic tier, it would
 * only push them to a hardcoded `Color(0xFF...)`, which is invisible to both theming and tooling.
 */
@Immutable
public class CdsSpectrum internal constructor(
    public val blue: CdsColorRamp,
    public val green: CdsColorRamp,
    public val orange: CdsColorRamp,
    public val gray: CdsColorRamp,
    public val indigo: CdsColorRamp,
    public val pink: CdsColorRamp,
    public val purple: CdsColorRamp,
    public val red: CdsColorRamp,
    public val teal: CdsColorRamp,
    public val yellow: CdsColorRamp,
    public val chartreuse: CdsColorRamp,
) {
    /**
     * Resolves a [CdsSpectrumHueToken]. Composes with [CdsColorRamp.get], so
     * `spectrum[hue][step]` walks a fully token-addressed path to one [Color].
     */
    public operator fun get(token: CdsSpectrumHueToken): CdsColorRamp = when (token) {
        CdsSpectrumHueToken.Blue -> blue
        CdsSpectrumHueToken.Green -> green
        CdsSpectrumHueToken.Orange -> orange
        CdsSpectrumHueToken.Gray -> gray
        CdsSpectrumHueToken.Indigo -> indigo
        CdsSpectrumHueToken.Pink -> pink
        CdsSpectrumHueToken.Purple -> purple
        CdsSpectrumHueToken.Red -> red
        CdsSpectrumHueToken.Teal -> teal
        CdsSpectrumHueToken.Yellow -> yellow
        CdsSpectrumHueToken.Chartreuse -> chartreuse
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsSpectrum) return false
        return CdsSpectrumHueToken.entries.all { this[it] == other[it] }
    }

    override fun hashCode(): Int {
        var result = 0
        for (token in CdsSpectrumHueToken.entries) result = 31 * result + this[token].hashCode()
        return result
    }

    override fun toString(): String = "CdsSpectrum(blue=$blue, ...)"

    public companion object {
        /** The `cds-default` spectrum in its light color scheme. */
        public val Light: CdsSpectrum = CdsSpectrum(
            blue = CdsColorRamp(step0 = Color(0xFFF5F8FF), step5 = Color(0xFFD3E1FF), step10 = Color(0xFFB0CAFF), step15 = Color(0xFF92B6FF), step20 = Color(0xFF73A2FF), step30 = Color(0xFF4684FF), step40 = Color(0xFF266EFF), step50 = Color(0xFF105EFF), step60 = Color(0xFF0052FF), step70 = Color(0xFF004BEB), step80 = Color(0xFF003EC1), step90 = Color(0xFF002982), step100 = Color(0xFF00184D)),
            green = CdsColorRamp(step0 = Color(0xFFF5FFFB), step5 = Color(0xFFCBF5E3), step10 = Color(0xFFA3EBCD), step15 = Color(0xFF83E0BA), step20 = Color(0xFF65D6A7), step30 = Color(0xFF3CC28A), step40 = Color(0xFF22AD73), step50 = Color(0xFF129961), step60 = Color(0xFF098551), step70 = Color(0xFF047043), step80 = Color(0xFF025332), step90 = Color(0xFF003923), step100 = Color(0xFF001F12)),
            orange = CdsColorRamp(step0 = Color(0xFFFFFAF5), step5 = Color(0xFFFEE8D2), step10 = Color(0xFFFDD5B0), step15 = Color(0xFFFBC293), step20 = Color(0xFFF9AE76), step30 = Color(0xFFF48C4C), step40 = Color(0xFFED702F), step50 = Color(0xFFE1591B), step60 = Color(0xFFCF470E), step70 = Color(0xFFB53606), step80 = Color(0xFF912702), step90 = Color(0xFF641A00), step100 = Color(0xFF330D00)),
            gray = CdsColorRamp(step0 = Color(0xFFFFFFFF), step5 = Color(0xFFF7F8F9), step10 = Color(0xFFEEF0F3), step15 = Color(0xFFDEE1E7), step20 = Color(0xFFCED2DB), step30 = Color(0xFFB1B7C3), step40 = Color(0xFF89909E), step50 = Color(0xFF717886), step60 = Color(0xFF5B616E), step70 = Color(0xFF464B55), step80 = Color(0xFF32353D), step90 = Color(0xFF1E2025), step100 = Color(0xFF0A0B0D)),
            indigo = CdsColorRamp(step0 = Color(0xFFF6F7FF), step5 = Color(0xFFE6E8FF), step10 = Color(0xFFD6DAFE), step15 = Color(0xFFC6CCFD), step20 = Color(0xFFB5BDFD), step30 = Color(0xFF94A1FB), step40 = Color(0xFF7487F7), step50 = Color(0xFF596FF2), step60 = Color(0xFF425BE9), step70 = Color(0xFF2F4AD7), step80 = Color(0xFF1F36AD), step90 = Color(0xFF11206B), step100 = Color(0xFF080F33)),
            pink = CdsColorRamp(step0 = Color(0xFFFFF5FF), step5 = Color(0xFFFDE4FD), step10 = Color(0xFFFBD4FA), step15 = Color(0xFFF8C3F5), step20 = Color(0xFFF4B2F0), step30 = Color(0xFFEB8FE3), step40 = Color(0xFFDD6ED1), step50 = Color(0xFFCB51BB), step60 = Color(0xFFB33AA2), step70 = Color(0xFF952785), step80 = Color(0xFF741A66), step90 = Color(0xFF531148), step100 = Color(0xFF330A2C)),
            purple = CdsColorRamp(step0 = Color(0xFFFBF7FF), step5 = Color(0xFFF4E8FF), step10 = Color(0xFFEDD9FF), step15 = Color(0xFFE6C9FF), step20 = Color(0xFFDEB8FF), step30 = Color(0xFFCD99FD), step40 = Color(0xFFBC7BFB), step50 = Color(0xFF9D6BF2), step60 = Color(0xFF8A55E9), step70 = Color(0xFF7743D7), step80 = Color(0xFF5A30AD), step90 = Color(0xFF361B6B), step100 = Color(0xFF190D33)),
            red = CdsColorRamp(step0 = Color(0xFFFFF5F6), step5 = Color(0xFFFEE1E4), step10 = Color(0xFFFDCED2), step15 = Color(0xFFFBBABF), step20 = Color(0xFFF9A6AD), step30 = Color(0xFFF47F88), step40 = Color(0xFFED5966), step50 = Color(0xFFE13947), step60 = Color(0xFFCF202F), step70 = Color(0xFFB50F1D), step80 = Color(0xFF910510), step90 = Color(0xFF640109), step100 = Color(0xFF330004)),
            teal = CdsColorRamp(step0 = Color(0xFFF0FEFF), step5 = Color(0xFFBCF6FD), step10 = Color(0xFF88EDFB), step15 = Color(0xFF5DE2F8), step20 = Color(0xFF33D5F4), step30 = Color(0xFF00BCEB), step40 = Color(0xFF00A9DD), step50 = Color(0xFF0093CB), step60 = Color(0xFF007BB3), step70 = Color(0xFF006195), step80 = Color(0xFF004774), step90 = Color(0xFF002F53), step100 = Color(0xFF001B33)),
            yellow = CdsColorRamp(step0 = Color(0xFFFFFCF1), step5 = Color(0xFFFFF4C0), step10 = Color(0xFFFFF091), step15 = Color(0xFFFFEA64), step20 = Color(0xFFFFE436), step30 = Color(0xFFF7D21A), step40 = Color(0xFFEBBA00), step50 = Color(0xFFCF9700), step60 = Color(0xFFAE7100), step70 = Color(0xFF884C00), step80 = Color(0xFF603000), step90 = Color(0xFF3A1400), step100 = Color(0xFF1B0600)),
            chartreuse = CdsColorRamp(step0 = Color(0xFFF5FFFA), step5 = Color(0xFFDDFBE8), step10 = Color(0xFFC6F7D1), step15 = Color(0xFFB0F2B6), step20 = Color(0xFF9FEE9B), step30 = Color(0xFF89DF75), step40 = Color(0xFF7FD057), step50 = Color(0xFF56B340), step60 = Color(0xFF359730), step70 = Color(0xFF237A2B), step80 = Color(0xFF195D29), step90 = Color(0xFF114023), step100 = Color(0xFF071A11)),
        )

        /** The `cds-default` spectrum in its dark color scheme. */
        public val Dark: CdsSpectrum = CdsSpectrum(
            blue = CdsColorRamp(step0 = Color(0xFF001033), step5 = Color(0xFF011D5B), step10 = Color(0xFF012A82), step15 = Color(0xFF03339A), step20 = Color(0xFF053BB1), step30 = Color(0xFF0A48CE), step40 = Color(0xFF1354E1), step50 = Color(0xFF2162EE), step60 = Color(0xFF3773F5), step70 = Color(0xFF578BFA), step80 = Color(0xFF84AAFD), step90 = Color(0xFFB9CFFF), step100 = Color(0xFFF5F8FF)),
            green = CdsColorRamp(step0 = Color(0xFF001F12), step5 = Color(0xFF00301D), step10 = Color(0xFF01462A), step15 = Color(0xFF025230), step20 = Color(0xFF025C37), step30 = Color(0xFF067044), step40 = Color(0xFF0B8552), step50 = Color(0xFF159962), step60 = Color(0xFF27AD75), step70 = Color(0xFF44C28D), step80 = Color(0xFF6FD6AB), step90 = Color(0xFFABEBD0), step100 = Color(0xFFF5FFFB)),
            orange = CdsColorRamp(step0 = Color(0xFF330D00), step5 = Color(0xFF4F1400), step10 = Color(0xFF6B1C01), step15 = Color(0xFF832402), step20 = Color(0xFF9B2C04), step30 = Color(0xFFBD3B09), step40 = Color(0xFFD54C12), step50 = Color(0xFFE66020), step60 = Color(0xFFF07836), step70 = Color(0xFFF89656), step80 = Color(0xFFFCB983), step90 = Color(0xFFFEDBB9), step100 = Color(0xFFFFFAF5)),
            gray = CdsColorRamp(step0 = Color(0xFF0A0B0D), step5 = Color(0xFF141519), step10 = Color(0xFF1E2025), step15 = Color(0xFF282B31), step20 = Color(0xFF32353D), step30 = Color(0xFF464B55), step40 = Color(0xFF5B616E), step50 = Color(0xFF727886), step60 = Color(0xFF8A919E), step70 = Color(0xFFA5AAB6), step80 = Color(0xFFC1C6CF), step90 = Color(0xFFE0E2E7), step100 = Color(0xFFFFFFFF)),
            indigo = CdsColorRamp(step0 = Color(0xFF080F33), step5 = Color(0xFF0E1B5B), step10 = Color(0xFF152782), step15 = Color(0xFF1B2F9A), step20 = Color(0xFF2138B1), step30 = Color(0xFF3049CE), step40 = Color(0xFF445CE1), step50 = Color(0xFF5C71EE), step60 = Color(0xFF798AF5), step70 = Color(0xFF99A5FA), step80 = Color(0xFFBBC2FD), step90 = Color(0xFFDBDFFF), step100 = Color(0xFFF6F7FF)),
            pink = CdsColorRamp(step0 = Color(0xFF330A2C), step5 = Color(0xFF460E3D), step10 = Color(0xFF59134E), step15 = Color(0xFF6C185E), step20 = Color(0xFF7E1E6F), step30 = Color(0xFF9F2C8E), step40 = Color(0xFFBB40AA), step50 = Color(0xFFD058C1), step60 = Color(0xFFE175D6), step70 = Color(0xFFED95E6), step80 = Color(0xFFF6B8F3), step90 = Color(0xFFFCD9FB), step100 = Color(0xFFFFF5FF)),
            purple = CdsColorRamp(step0 = Color(0xFF190D33), step5 = Color(0xFF2B1659), step10 = Color(0xFF491E89), step15 = Color(0xFF6125AF), step20 = Color(0xFF7B2DD3), step30 = Color(0xFF8E33EA), step40 = Color(0xFFA454F4), step50 = Color(0xFFBC7BFB), step60 = Color(0xFFCD99FD), step70 = Color(0xFFD9B0FE), step80 = Color(0xFFE6C9FF), step90 = Color(0xFFEDD9FF), step100 = Color(0xFFFBF7FF)),
            red = CdsColorRamp(step0 = Color(0xFF330004), step5 = Color(0xFF4F0007), step10 = Color(0xFF6B010A), step15 = Color(0xFF83040E), step20 = Color(0xFF9B0713), step30 = Color(0xFFBD1321), step40 = Color(0xFFD52634), step50 = Color(0xFFE6404E), step60 = Color(0xFFF0616D), step70 = Color(0xFFF88690), step80 = Color(0xFFFCAEB5), step90 = Color(0xFFFED5D8), step100 = Color(0xFFFFF5F6)),
            teal = CdsColorRamp(step0 = Color(0xFF001426), step5 = Color(0xFF00203B), step10 = Color(0xFF002D4F), step15 = Color(0xFF003A63), step20 = Color(0xFF004876), step30 = Color(0xFF006399), step40 = Color(0xFF007DB6), step50 = Color(0xFF0095CD), step60 = Color(0xFF00AADF), step70 = Color(0xFF06BEEC), step80 = Color(0xFF45D9F5), step90 = Color(0xFF95EFFB), step100 = Color(0xFFF0FEFF)),
            yellow = CdsColorRamp(step0 = Color(0xFF1B0600), step5 = Color(0xFF311100), step10 = Color(0xFF512800), step15 = Color(0xFF603000), step20 = Color(0xFF734000), step30 = Color(0xFF936000), step40 = Color(0xFFAF8000), step50 = Color(0xFFC79E00), step60 = Color(0xFFDEBD17), step70 = Color(0xFFE5CD30), step80 = Color(0xFFF2DE5E), step90 = Color(0xFFFFF091), step100 = Color(0xFFFFFCF1)),
            chartreuse = CdsColorRamp(step0 = Color(0xFF05160E), step5 = Color(0xFF0E361D), step10 = Color(0xFF154F22), step15 = Color(0xFF1D6724), step20 = Color(0xFF2D8028), step30 = Color(0xFF499836), step40 = Color(0xFF6BB049), step50 = Color(0xFF7BC869), step60 = Color(0xFF8CD188), step70 = Color(0xFF9ED9A3), step80 = Color(0xFFB2DEBC), step90 = Color(0xFFD1EEDC), step100 = Color(0xFFF5FFFA)),
        )
    }
}

/**
 * Every hue in a [CdsSpectrum] as an enumerable value. Resolve one against a spectrum with
 * [CdsSpectrum.get]; iterate every hue with `CdsSpectrumHueToken.entries`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsSpectrumHueToken {
    Blue, Green, Orange, Gray, Indigo, Pink, Purple, Red, Teal, Yellow, Chartreuse,
    ;

    /** The canonical CDS spelling of the hue alone (`blue`), for labels and serialized themes. */
    public val tokenName: String get() = name.replaceFirstChar { it.lowercase() }
}
