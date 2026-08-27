package com.coinbase.cds.theme

import androidx.compose.runtime.Immutable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * One soft, downward drop shadow, described independent of any single rendering API so it can back
 * a `Modifier.shadow(...)` call, a custom `drawBehind`, or an elevation value. Kept as four fields
 * rather than collapsed to a Dp elevation: that preserves the design intent and lets the call site
 * choose how to render it.
 *
 * Singular, and the container is [CdsShadows] -- item types singular, container types plural.
 */
@Immutable
public class CdsShadow internal constructor(
    public val color: Color,
    public val offsetY: Dp,
    public val opacity: Float,
    public val blurRadius: Dp,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsShadow) return false
        return color == other.color &&
            offsetY == other.offsetY &&
            opacity == other.opacity &&
            blurRadius == other.blurRadius
    }

    override fun hashCode(): Int {
        var result = color.hashCode()
        result = 31 * result + offsetY.hashCode()
        result = 31 * result + opacity.hashCode()
        result = 31 * result + blurRadius.hashCode()
        return result
    }

    override fun toString(): String =
        "CdsShadow(color=$color, offsetY=$offsetY, opacity=$opacity, blurRadius=$blurRadius)"
}

/**
 * The elevation shadows a theme defines. These are identical across light and dark, so a
 * [CdsTheme] holds one of these rather than one per color scheme.
 */
@Immutable
public class CdsShadows internal constructor(
    public val elevation1: CdsShadow,
    public val elevation2: CdsShadow,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CdsShadows) return false
        return elevation1 == other.elevation1 && elevation2 == other.elevation2
    }

    override fun hashCode(): Int = 31 * elevation1.hashCode() + elevation2.hashCode()

    override fun toString(): String =
        "CdsShadows(elevation1=$elevation1, elevation2=$elevation2)"

    public companion object {
        /** The `cds-default` elevation shadows. */
        public val Default: CdsShadows = CdsShadows(
            elevation1 = CdsShadow(
                color = Color.Black,
                offsetY = 8.dp,
                opacity = 0.12f,
                blurRadius = 12.dp,
            ),
            elevation2 = CdsShadow(
                color = Color.Black,
                offsetY = 8.dp,
                opacity = 0.12f,
                blurRadius = 24.dp,
            ),
        )
    }
}
