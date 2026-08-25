package com.coinbase.cds.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Icon size scale. Rung names are the CDS scale keys.
 */
@Immutable
public class CdsIconSize internal constructor(
    public val xs: Dp,
    public val s: Dp,
    public val m: Dp,
    public val l: Dp,
) {
    /** Resolves a [CdsIconSizeToken]: `CdsTheme.iconSize[CdsIconSizeToken.M]`. */
    public operator fun get(token: CdsIconSizeToken): Dp = when (token) {
        CdsIconSizeToken.Xs -> xs
        CdsIconSizeToken.S -> s
        CdsIconSizeToken.M -> m
        CdsIconSizeToken.L -> l
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsIconSize) return false
        return CdsIconSizeToken.entries.all { this[it] == other[it] }
    }

    override fun hashCode(): Int {
        var result = 0
        for (token in CdsIconSizeToken.entries) result = 31 * result + this[token].hashCode()
        return result
    }

    override fun toString(): String = "CdsIconSize(xs=$xs, s=$s, m=$m, l=$l)"

    public companion object {
        /** The `cds-default` icon size scale. */
        public val Default: CdsIconSize = CdsIconSize(
            xs = 12.dp,
            s = 16.dp,
            m = 24.dp,
            l = 32.dp,
        )
    }
}

/**
 * Every rung of the [CdsIconSize] scale as an enumerable value. Resolve one against a theme with
 * [CdsIconSize.get]; iterate the whole scale with `CdsIconSizeToken.entries`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsIconSizeToken {
    Xs, S, M, L,
    ;

    /** The canonical CDS key (`m`), for labels and for parsing serialized themes. */
    public val tokenName: String get() = name.lowercase()
}

/**
 * Avatar size scale. Rung names are the CDS scale keys.
 */
@Immutable
public class CdsAvatarSize internal constructor(
    public val s: Dp,
    public val m: Dp,
    public val l: Dp,
    public val xl: Dp,
    public val xxl: Dp,
    public val xxxl: Dp,
) {
    /** Resolves a [CdsAvatarSizeToken]: `CdsTheme.avatarSize[CdsAvatarSizeToken.Xl]`. */
    public operator fun get(token: CdsAvatarSizeToken): Dp = when (token) {
        CdsAvatarSizeToken.S -> s
        CdsAvatarSizeToken.M -> m
        CdsAvatarSizeToken.L -> l
        CdsAvatarSizeToken.Xl -> xl
        CdsAvatarSizeToken.Xxl -> xxl
        CdsAvatarSizeToken.Xxxl -> xxxl
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsAvatarSize) return false
        return CdsAvatarSizeToken.entries.all { this[it] == other[it] }
    }

    override fun hashCode(): Int {
        var result = 0
        for (token in CdsAvatarSizeToken.entries) result = 31 * result + this[token].hashCode()
        return result
    }

    override fun toString(): String = "CdsAvatarSize(s=$s, m=$m, l=$l, xl=$xl, ...)"

    public companion object {
        /** The `cds-default` avatar size scale. */
        public val Default: CdsAvatarSize = CdsAvatarSize(
            s = 16.dp,
            m = 24.dp,
            l = 32.dp,
            xl = 40.dp,
            xxl = 48.dp,
            xxxl = 56.dp,
        )
    }
}

/**
 * Every rung of the [CdsAvatarSize] scale as an enumerable value. Resolve one against a theme with
 * [CdsAvatarSize.get]; iterate the whole scale with `CdsAvatarSizeToken.entries`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsAvatarSizeToken {
    S, M, L, Xl, Xxl, Xxxl,
    ;

    /** The canonical CDS key (`xl`), for labels and for parsing serialized themes. */
    public val tokenName: String get() = name.lowercase()
}

/**
 * Fixed measurements for CDS's form controls. Not a ramp -- each name measures one specific part of
 * one specific control.
 */
@Immutable
public class CdsControlSize internal constructor(
    public val checkboxSize: Dp,
    public val radioSize: Dp,
    public val switchWidth: Dp,
    public val switchHeight: Dp,
    public val switchThumbSize: Dp,
    public val tileSize: Dp,
) {
    /** Resolves a [CdsControlSizeToken]: `CdsTheme.controlSize[CdsControlSizeToken.CheckboxSize]`. */
    public operator fun get(token: CdsControlSizeToken): Dp = when (token) {
        CdsControlSizeToken.CheckboxSize -> checkboxSize
        CdsControlSizeToken.RadioSize -> radioSize
        CdsControlSizeToken.SwitchWidth -> switchWidth
        CdsControlSizeToken.SwitchHeight -> switchHeight
        CdsControlSizeToken.SwitchThumbSize -> switchThumbSize
        CdsControlSizeToken.TileSize -> tileSize
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsControlSize) return false
        return CdsControlSizeToken.entries.all { this[it] == other[it] }
    }

    override fun hashCode(): Int {
        var result = 0
        for (token in CdsControlSizeToken.entries) result = 31 * result + this[token].hashCode()
        return result
    }

    override fun toString(): String = "CdsControlSize(checkboxSize=$checkboxSize, ...)"

    public companion object {
        /** The `cds-default` control measurements. */
        public val Default: CdsControlSize = CdsControlSize(
            checkboxSize = 20.dp,
            radioSize = 20.dp,
            switchWidth = 52.dp,
            switchHeight = 32.dp,
            switchThumbSize = 30.dp,
            tileSize = 106.dp,
        )
    }
}

/**
 * Every measurement in [CdsControlSize] as an enumerable value. Resolve one against a theme with
 * [CdsControlSize.get]; iterate the whole set with `CdsControlSizeToken.entries`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsControlSizeToken {
    CheckboxSize, RadioSize, SwitchWidth, SwitchHeight, SwitchThumbSize, TileSize,
    ;

    /** The canonical CDS key (`checkboxSize`), for labels and for parsing serialized themes. */
    public val tokenName: String get() = name.replaceFirstChar { it.lowercase() }
}
