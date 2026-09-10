package com.coinbase.cds.androidapp.gallery

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.Dp
import com.coinbase.cds.components.button.Button
import com.coinbase.cds.components.button.ButtonSize
import com.coinbase.cds.components.button.ButtonVariant
import com.coinbase.cds.theme.CdsTheme

@Composable
fun ButtonGallerySection(modifier: Modifier = Modifier) {
    var clickCount by remember { mutableIntStateOf(0) }

    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x2),
    ) {
        GalleryText(
            text = "Clicks on the interactive primary button: $clickCount",
            style = CdsTheme.typography.body,
            color = CdsTheme.colors.fgMuted,
        )

        GallerySubsectionTitle("Variants")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
        ) {
            Button(
                text = "Primary",
                onClick = { clickCount++ },
                modifier = Modifier.testTag("gallery-button-primary-interactive"),
            )
            Button(text = "Secondary", onClick = {}, variant = ButtonVariant.Secondary)
            Button(text = "Tertiary", onClick = {}, variant = ButtonVariant.Tertiary)
            Button(text = "Positive", onClick = {}, variant = ButtonVariant.Positive)
            Button(text = "Negative", onClick = {}, variant = ButtonVariant.Negative)
            Button(text = "Inverse", onClick = {}, variant = ButtonVariant.Inverse)
        }

        GallerySubsectionTitle("Transparent")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
        ) {
            Button(text = "Primary", onClick = {}, transparent = true)
            Button(text = "Positive", onClick = {}, variant = ButtonVariant.Positive, transparent = true)
            Button(text = "Inverse", onClick = {}, variant = ButtonVariant.Inverse, transparent = true)
        }

        GallerySubsectionTitle("States")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
        ) {
            Button(
                text = "Disabled",
                onClick = {},
                enabled = false,
                modifier = Modifier.testTag("gallery-button-disabled"),
            )
            Button(
                text = "Loading",
                onClick = {},
                loading = true,
                modifier = Modifier.testTag("gallery-button-loading"),
            )
            Button(
                text = "Transparent loading",
                onClick = {},
                loading = true,
                transparent = true,
                variant = ButtonVariant.Secondary,
            )
        }

        GallerySubsectionTitle("Sizes")
        Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1)) {
            Button(text = "Extra small", onClick = {}, size = ButtonSize.Xs)
            Button(text = "Small", onClick = {}, size = ButtonSize.S)
            Button(text = "Medium", onClick = {}, size = ButtonSize.M)
            Button(text = "Large", onClick = {}, size = ButtonSize.L)
        }

        GallerySubsectionTitle("Icons")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
        ) {
            Button(
                text = "Back",
                onClick = {},
                startIcon = { tint, size -> GalleryArrowIcon(tint, size, pointsLeft = true) },
            )
            Button(
                text = "Next",
                onClick = {},
                endIcon = { tint, size -> GalleryArrowIcon(tint, size, pointsLeft = false) },
            )
            Button(
                text = "Both",
                onClick = {},
                startIcon = { tint, size -> GalleryArrowIcon(tint, size, pointsLeft = true) },
                endIcon = { tint, size -> GalleryArrowIcon(tint, size, pointsLeft = false) },
            )
        }

        GallerySubsectionTitle("Layout")
        Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1)) {
            Button(
                text = "Full width via Modifier.fillMaxWidth()",
                onClick = {},
                modifier = Modifier.fillMaxWidth(),
            )
            Button(
                text = "Long label that should truncate when the button cannot grow any wider",
                onClick = {},
                modifier = Modifier.fillMaxWidth(),
                maxLines = 1,
            )
        }
    }
}

@Composable
private fun GalleryArrowIcon(color: Color, iconSize: Dp, pointsLeft: Boolean) {
    Canvas(modifier = Modifier.size(iconSize)) {
        val strokeWidth = size.minDimension * 0.14f
        val path = Path().apply {
            if (pointsLeft) {
                moveTo(size.width * 0.62f, size.height * 0.12f)
                lineTo(size.width * 0.3f, size.height * 0.5f)
                lineTo(size.width * 0.62f, size.height * 0.88f)
            } else {
                moveTo(size.width * 0.38f, size.height * 0.12f)
                lineTo(size.width * 0.7f, size.height * 0.5f)
                lineTo(size.width * 0.38f, size.height * 0.88f)
            }
        }
        drawPath(
            path = path,
            color = color,
            style = Stroke(width = strokeWidth, cap = StrokeCap.Round, join = StrokeJoin.Round),
        )
    }
}
