package com.coinbase.cds.androidapp.gallery

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.coinbase.cds.theme.CdsTheme

/**
 * Small building blocks shared by every category [CdsThemeGallery] renders. Kept `internal`:
 * consumers only ever call [CdsThemeGallery] itself. Each reads the theme [CdsThemeGallery]
 * installed over this subtree through the ambient `CdsTheme` accessors.
 */

/**
 * :cds is a Material3-independent design system, so its own gallery tooling shouldn't pull in a
 * dependency on Material3 just to render text -- BasicText is Compose Foundation's
 * theme-agnostic equivalent.
 */
@Composable
internal fun GalleryText(text: String, style: TextStyle, color: Color, modifier: Modifier = Modifier) {
    BasicText(text = text, modifier = modifier, style = style.copy(color = color))
}

@Composable
internal fun GallerySectionTitle(text: String) {
    GalleryText(text = text, style = CdsTheme.typography.title3, color = CdsTheme.colors.fg)
}

/**
 * A labeled color swatch with its hex value, laid out as a fixed-width vertical card so several
 * fit per row in a wrapping [androidx.compose.foundation.layout.FlowRow] instead of stacking one
 * per line down the whole screen.
 */
@Composable
internal fun GallerySwatchCard(name: String, color: Color) {
    Column(
        modifier = Modifier.width(104.dp),
        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5),
    ) {
        GalleryColorChip(color, 48.dp)
        GalleryText(text = name, style = CdsTheme.typography.legal, color = CdsTheme.colors.fg)
        GalleryText(
            text = "#%08X".format(color.toArgb()),
            style = CdsTheme.typography.legal,
            color = CdsTheme.colors.fgMuted,
        )
    }
}

/**
 * A minimal left-pointing chevron, hand-drawn with [Canvas] so a back affordance doesn't require
 * pulling a Material Icons dependency into a Material3-independent design system just for one
 * glyph.
 */
@Composable
internal fun GalleryChevronLeftIcon(color: Color, iconSize: Dp, modifier: Modifier = Modifier) {
    Canvas(modifier = modifier.size(iconSize)) {
        val strokeWidth = size.minDimension * 0.14f
        val path = Path().apply {
            moveTo(size.width * 0.62f, size.height * 0.12f)
            lineTo(size.width * 0.3f, size.height * 0.5f)
            lineTo(size.width * 0.62f, size.height * 0.88f)
        }
        drawPath(
            path = path,
            color = color,
            style = Stroke(width = strokeWidth, cap = StrokeCap.Round, join = StrokeJoin.Round),
        )
    }
}

/** An unlabeled square swatch, used for dense grids like the spectrum ramp. */
@Composable
internal fun GalleryColorChip(color: Color, size: Dp) {
    Box(
        modifier = Modifier
            .size(size)
            .clip(RoundedCornerShape(CdsTheme.borderRadius.radius100))
            .background(color)
            .border(
                CdsTheme.borderWidth.borderWidth100,
                CdsTheme.colors.bgLine,
                RoundedCornerShape(CdsTheme.borderRadius.radius100),
            ),
    )
}
