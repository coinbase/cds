package com.coinbase.cds.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Corner radius scale. Unlike [CdsSpace] these rungs aren't multiples of a base unit -- they're
 * abstract steps -- so each property's numeric suffix is the CDS scale key itself, not a dp value:
 *
 * | property | default |
 * | --- | --- |
 * | [radius0] | 0dp |
 * | [radius100] | 4dp |
 * | [radius200] | 8dp |
 * | [radius300] | 12dp |
 * | [radius400] | 16dp |
 * | [radius500] | 24dp |
 * | [radius600] | 32dp |
 * | [radius700] | 40dp |
 * | [radius800] | 48dp |
 * | [radius900] | 56dp |
 * | [radius1000] | 100000dp |
 *
 * [radius1000] is the pill rung: deliberately oversized so it always renders fully rounded
 * regardless of the component's size.
 */
@Immutable
public class CdsBorderRadius internal constructor(
    public val radius0: Dp,
    public val radius100: Dp,
    public val radius200: Dp,
    public val radius300: Dp,
    public val radius400: Dp,
    public val radius500: Dp,
    public val radius600: Dp,
    public val radius700: Dp,
    public val radius800: Dp,
    public val radius900: Dp,
    public val radius1000: Dp,
) {
    /** Resolves a [CdsBorderRadiusToken]: `CdsTheme.borderRadius[CdsBorderRadiusToken.Radius200]`. */
    public operator fun get(token: CdsBorderRadiusToken): Dp = when (token) {
        CdsBorderRadiusToken.Radius0 -> radius0
        CdsBorderRadiusToken.Radius100 -> radius100
        CdsBorderRadiusToken.Radius200 -> radius200
        CdsBorderRadiusToken.Radius300 -> radius300
        CdsBorderRadiusToken.Radius400 -> radius400
        CdsBorderRadiusToken.Radius500 -> radius500
        CdsBorderRadiusToken.Radius600 -> radius600
        CdsBorderRadiusToken.Radius700 -> radius700
        CdsBorderRadiusToken.Radius800 -> radius800
        CdsBorderRadiusToken.Radius900 -> radius900
        CdsBorderRadiusToken.Radius1000 -> radius1000
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsBorderRadius) return false
        return CdsBorderRadiusToken.entries.all { this[it] == other[it] }
    }

    override fun hashCode(): Int {
        var result = 0
        for (token in CdsBorderRadiusToken.entries) result = 31 * result + this[token].hashCode()
        return result
    }

    override fun toString(): String = "CdsBorderRadius(radius200=$radius200, ...)"

    public companion object {
        /** The `cds-default` corner radius scale. */
        public val Default: CdsBorderRadius = CdsBorderRadius(
            radius0 = 0.dp,
            radius100 = 4.dp,
            radius200 = 8.dp,
            radius300 = 12.dp,
            radius400 = 16.dp,
            radius500 = 24.dp,
            radius600 = 32.dp,
            radius700 = 40.dp,
            radius800 = 48.dp,
            radius900 = 56.dp,
            radius1000 = 100_000.dp,
        )
    }
}

/**
 * Every rung of the [CdsBorderRadius] scale as an enumerable value. Resolve one against a theme
 * with [CdsBorderRadius.get]; iterate the whole scale with `CdsBorderRadiusToken.entries`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsBorderRadiusToken {
    Radius0, Radius100, Radius200, Radius300, Radius400, Radius500,
    Radius600, Radius700, Radius800, Radius900, Radius1000,
    ;

    /** The canonical CDS key (`200`), for labels and for parsing serialized themes. */
    public val tokenName: String get() = name.removePrefix("Radius")
}

/**
 * Border/stroke width scale. Abstract rungs like [CdsBorderRadius], so the property names are the
 * CDS scale keys: `0`, `100` (1dp), `200` (2dp), `300` (4dp), `400` (6dp), `500` (8dp).
 */
@Immutable
public class CdsBorderWidth internal constructor(
    public val borderWidth0: Dp,
    public val borderWidth100: Dp,
    public val borderWidth200: Dp,
    public val borderWidth300: Dp,
    public val borderWidth400: Dp,
    public val borderWidth500: Dp,
) {
    /** Resolves a [CdsBorderWidthToken]: `CdsTheme.borderWidth[CdsBorderWidthToken.BorderWidth100]`. */
    public operator fun get(token: CdsBorderWidthToken): Dp = when (token) {
        CdsBorderWidthToken.BorderWidth0 -> borderWidth0
        CdsBorderWidthToken.BorderWidth100 -> borderWidth100
        CdsBorderWidthToken.BorderWidth200 -> borderWidth200
        CdsBorderWidthToken.BorderWidth300 -> borderWidth300
        CdsBorderWidthToken.BorderWidth400 -> borderWidth400
        CdsBorderWidthToken.BorderWidth500 -> borderWidth500
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsBorderWidth) return false
        return CdsBorderWidthToken.entries.all { this[it] == other[it] }
    }

    override fun hashCode(): Int {
        var result = 0
        for (token in CdsBorderWidthToken.entries) result = 31 * result + this[token].hashCode()
        return result
    }

    override fun toString(): String = "CdsBorderWidth(borderWidth100=$borderWidth100, ...)"

    public companion object {
        /** The `cds-default` border width scale. */
        public val Default: CdsBorderWidth = CdsBorderWidth(
            borderWidth0 = 0.dp,
            borderWidth100 = 1.dp,
            borderWidth200 = 2.dp,
            borderWidth300 = 4.dp,
            borderWidth400 = 6.dp,
            borderWidth500 = 8.dp,
        )
    }
}

/**
 * Every rung of the [CdsBorderWidth] scale as an enumerable value. Resolve one against a theme
 * with [CdsBorderWidth.get]; iterate the whole scale with `CdsBorderWidthToken.entries`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsBorderWidthToken {
    BorderWidth0, BorderWidth100, BorderWidth200, BorderWidth300, BorderWidth400, BorderWidth500,
    ;

    /** The canonical CDS key (`100`), for labels and for parsing serialized themes. */
    public val tokenName: String get() = name.removePrefix("BorderWidth")
}
