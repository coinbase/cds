package com.coinbase.cds.components.slidebutton

import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Dp
import com.coinbase.cds.theme.CdsTheme

/** Resolved handle/content colors for a [SlideButtonVariant]. The track is always `bgSecondary`
 * regardless of variant -- only the handle recolors. */
@Immutable
internal data class SlideButtonColors(val container: Color, val content: Color)

@Composable
internal fun slideButtonColors(variant: SlideButtonVariant): SlideButtonColors {
    val colors = CdsTheme.colors
    return when (variant) {
        SlideButtonVariant.Primary -> SlideButtonColors(colors.bgPrimary, colors.fgInverse)
        SlideButtonVariant.Positive -> SlideButtonColors(colors.bgPositive, colors.fgInverse)
        SlideButtonVariant.Negative -> SlideButtonColors(colors.bgNegative, colors.fgInverse)
    }
}

/**
 * Resolved size-derived metrics for a [SlideButtonSize]. Deliberately has no `height` field: the
 * drag math needs the handle's collapsed width up front, before any layout pass, but rather than
 * take that as a number [SlideButton] measures its own track at layout time and derives it. Height
 * then falls out of [paddingY] plus line height, the same way
 * [com.coinbase.cds.components.button.Button] is never given a height either.
 *
 * There's no `handleInset` field either, for the same reason: a fixed token only happens to center
 * the icon inside the collapsed (idle) handle if it exactly matches half the leftover space, which
 * depends on the *measured* collapsed diameter -- so [SlideButton] computes that inset directly
 * from the same track measurement instead of guessing at a static value.
 */
@Immutable
internal data class SlideButtonMetrics(
    val paddingY: Dp,
    val labelPaddingX: Dp,
    val radius: Dp,
    val iconSize: Dp,
    val font: TextStyle,
)

@Composable
internal fun slideButtonMetrics(size: SlideButtonSize): SlideButtonMetrics {
    val space = CdsTheme.space
    val radius = CdsTheme.borderRadius
    val iconSize = CdsTheme.iconSize
    val font = CdsTheme.typography.headline
    return when (size) {
        SlideButtonSize.S -> SlideButtonMetrics(space.x1, space.x2, radius.radius700, iconSize.s, font)
        SlideButtonSize.M -> SlideButtonMetrics(space.x1_5, space.x2, radius.radius900, iconSize.m, font)
        SlideButtonSize.L -> SlideButtonMetrics(space.x2, space.x2, radius.radius900, iconSize.m, font)
    }
}
