package com.coinbase.cds.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * The spacing scale, an 8dp base unit. Rung names are the CDS scale keys, which are multiples of
 * that base (`0`, `0.25`, `0.5`, `0.75`, `1`, `1.5`, `2`, `3` ... `10`). Kotlin identifiers can't
 * begin with a digit, so each takes an `x` prefix -- which reads as the multiplier it is -- and `_`
 * stands in for the decimal point:
 *
 * ```
 * CdsTheme.space.x0      // key '0'    = 0
 * CdsTheme.space.x0_25   // key '0.25' = 2
 * CdsTheme.space.x1      // key '1'    = 8
 * CdsTheme.space.x1_5    // key '1.5'  = 12
 * CdsTheme.space.x2      // key '2'    = 16
 * ```
 *
 * Deliberately *not* named for the dp values they resolve to. A name that encodes a value is only
 * correct if the value can't be re-themed, which defeats the purpose of a token: a denser theme is
 * free to remap the `2` rung from 16dp to 12dp, and a property called `space16` handing back 12dp
 * would be worse than no name at all.
 */
@Immutable
public class CdsSpace internal constructor(
    public val x0: Dp,
    public val x0_25: Dp,
    public val x0_5: Dp,
    public val x0_75: Dp,
    public val x1: Dp,
    public val x1_5: Dp,
    public val x2: Dp,
    public val x3: Dp,
    public val x4: Dp,
    public val x5: Dp,
    public val x6: Dp,
    public val x7: Dp,
    public val x8: Dp,
    public val x9: Dp,
    public val x10: Dp,
) {
    /** Resolves a [CdsSpaceToken]: `CdsTheme.space[CdsSpaceToken.X2]`. */
    public operator fun get(token: CdsSpaceToken): Dp = when (token) {
        CdsSpaceToken.X0 -> x0
        CdsSpaceToken.X0_25 -> x0_25
        CdsSpaceToken.X0_5 -> x0_5
        CdsSpaceToken.X0_75 -> x0_75
        CdsSpaceToken.X1 -> x1
        CdsSpaceToken.X1_5 -> x1_5
        CdsSpaceToken.X2 -> x2
        CdsSpaceToken.X3 -> x3
        CdsSpaceToken.X4 -> x4
        CdsSpaceToken.X5 -> x5
        CdsSpaceToken.X6 -> x6
        CdsSpaceToken.X7 -> x7
        CdsSpaceToken.X8 -> x8
        CdsSpaceToken.X9 -> x9
        CdsSpaceToken.X10 -> x10
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsSpace) return false
        return CdsSpaceToken.entries.all { this[it] == other[it] }
    }

    override fun hashCode(): Int {
        var result = 0
        for (token in CdsSpaceToken.entries) result = 31 * result + this[token].hashCode()
        return result
    }

    override fun toString(): String = "CdsSpace(x1=$x1, x2=$x2, ...)"

    public companion object {
        /** The `cds-default` spacing scale. */
        public val Default: CdsSpace = CdsSpace(
            x0 = 0.dp,
            x0_25 = 2.dp,
            x0_5 = 4.dp,
            x0_75 = 6.dp,
            x1 = 8.dp,
            x1_5 = 12.dp,
            x2 = 16.dp,
            x3 = 24.dp,
            x4 = 32.dp,
            x5 = 40.dp,
            x6 = 48.dp,
            x7 = 56.dp,
            x8 = 64.dp,
            x9 = 72.dp,
            x10 = 80.dp,
        )
    }
}

/**
 * Every rung of the [CdsSpace] scale as an enumerable value. Resolve one against a theme with
 * [CdsSpace.get]; iterate the whole scale with `CdsSpaceToken.entries`.
 *
 * Entries may be added in a minor release, so this enum is not safe to match exhaustively --
 * include an `else` branch in any `when` over it.
 */
public enum class CdsSpaceToken {
    X0, X0_25, X0_5, X0_75, X1, X1_5, X2, X3,
    X4, X5, X6, X7, X8, X9, X10,
    ;

    /**
     * The canonical CDS key (`1.5`), for labels and for parsing serialized themes -- a theme
     * serialized through this has the shape `{"space": {"1.5": 12}}`.
     */
    public val tokenName: String get() = name.removePrefix("X").replace('_', '.')
}
