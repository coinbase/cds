package com.coinbase.cds.components.internal

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.unit.Dp

/**
 * An indeterminate spinner shared by any component that needs a "busy" state (currently
 * `Button`'s `loading` and `SlideButton`'s checked/confirming state), hand-drawn with [Canvas] for
 * the same reason the sample app's gallery icons are -- no Material dependency to pull in for one
 * glyph.
 */
@Composable
internal fun Spinner(color: Color, diameter: Dp, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "cdsSpinner")
    val rotationDegrees by transition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(tween(durationMillis = 700, easing = LinearEasing)),
        label = "cdsSpinnerRotation",
    )
    Canvas(modifier = modifier.size(diameter)) {
        val strokeWidth = size.minDimension * 0.16f
        rotate(rotationDegrees) {
            drawArc(
                color = color,
                startAngle = 0f,
                sweepAngle = 270f,
                useCenter = false,
                style = Stroke(width = strokeWidth, cap = StrokeCap.Round),
            )
        }
    }
}
