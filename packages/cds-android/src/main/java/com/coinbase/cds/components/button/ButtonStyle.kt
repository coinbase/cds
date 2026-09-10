package com.coinbase.cds.components.button

import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Dp
import com.coinbase.cds.theme.CdsTheme

/**
 * Resolved container/content colors for a [ButtonVariant] — a flat lookup by variant, nothing more.
 *
 * The transparent variants use a true [Color.Transparent] container rather than the base `bg`
 * token. Painting `bg` only reads as "transparent" when the button happens to sit directly on the
 * screen's base background; this way it looks right on any surface a caller places it on, such as
 * a `bgSecondary` card.
 */
@Immutable
internal data class ButtonColors(val container: Color, val content: Color)

@Composable
internal fun buttonColors(variant: ButtonVariant, transparent: Boolean): ButtonColors =
    resolveButtonColors(variant, transparent, CdsTheme.colors)

internal fun resolveButtonColors(
    variant: ButtonVariant,
    transparent: Boolean,
    colors: com.coinbase.cds.theme.CdsColors,
): ButtonColors {
    return if (transparent) {
        when (variant) {
            ButtonVariant.Primary -> ButtonColors(Color.Transparent, colors.fgPrimary)
            ButtonVariant.Secondary -> ButtonColors(Color.Transparent, colors.fg)
            ButtonVariant.Tertiary -> ButtonColors(Color.Transparent, colors.fg)
            ButtonVariant.Positive -> ButtonColors(Color.Transparent, colors.fgPositive)
            ButtonVariant.Negative -> ButtonColors(Color.Transparent, colors.fgNegative)
            ButtonVariant.Inverse -> ButtonColors(Color.Transparent, colors.fg)
        }
    } else {
        when (variant) {
            ButtonVariant.Primary -> ButtonColors(colors.bgPrimary, colors.fgInverse)
            ButtonVariant.Secondary -> ButtonColors(colors.bgSecondary, colors.fg)
            ButtonVariant.Tertiary -> ButtonColors(colors.bgTertiary, colors.fg)
            ButtonVariant.Positive -> ButtonColors(colors.bgPositive, colors.fgInverse)
            ButtonVariant.Negative -> ButtonColors(colors.bgNegative, colors.fgInverse)
            ButtonVariant.Inverse -> ButtonColors(colors.bgInverse, colors.fgInverse)
        }
    }
}

/** Resolved size-derived metrics for a [ButtonSize]. */
@Immutable
internal data class ButtonMetrics(
    val paddingX: Dp,
    val paddingY: Dp,
    val radius: Dp,
    val iconSize: Dp,
    val font: TextStyle,
)

@Composable
internal fun buttonMetrics(size: ButtonSize): ButtonMetrics =
    resolveButtonMetrics(
        size = size,
        space = CdsTheme.space,
        borderRadius = CdsTheme.borderRadius,
        iconSize = CdsTheme.iconSize,
        typography = CdsTheme.typography,
    )

internal fun resolveButtonMetrics(
    size: ButtonSize,
    space: com.coinbase.cds.theme.CdsSpace,
    borderRadius: com.coinbase.cds.theme.CdsBorderRadius,
    iconSize: com.coinbase.cds.theme.CdsIconSize,
    typography: com.coinbase.cds.theme.CdsTypography,
): ButtonMetrics = when (size) {
    ButtonSize.Xs -> ButtonMetrics(space.x2, space.x0_75, borderRadius.radius700, iconSize.s, typography.label1)
    ButtonSize.S -> ButtonMetrics(space.x2, space.x1, borderRadius.radius700, iconSize.s, typography.headline)
    ButtonSize.M -> ButtonMetrics(space.x3, space.x1_5, borderRadius.radius900, iconSize.m, typography.headline)
    ButtonSize.L -> ButtonMetrics(space.x4, space.x2, borderRadius.radius900, iconSize.m, typography.headline)
}
