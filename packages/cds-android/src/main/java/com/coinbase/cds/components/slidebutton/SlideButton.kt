package com.coinbase.cds.components.slidebutton

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.draggable
import androidx.compose.foundation.gestures.rememberDraggableState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.IntSize
import com.coinbase.cds.components.internal.Spinner
import com.coinbase.cds.theme.CdsTheme
import com.coinbase.cds.theme.CdsThemeProvider

/**
 * Visual/semantic variant -- the subset of [com.coinbase.cds.components.button.ButtonVariant] that
 * makes sense for a confirm-by-sliding action.
 */
internal enum class SlideButtonVariant { Primary, Positive, Negative }

/** Size tier (`s`/`m`/`l`). */
internal enum class SlideButtonSize { S, M, L }

private const val DisabledAlpha = 0.4f
private val SettleSpring = spring<Float>(dampingRatio = Spring.DampingRatioLowBouncy, stiffness = Spring.StiffnessMedium)

/**
 * Temporarily `internal` for the first AAR release — this was an experiment and is not customer
 * API yet.
 *
 * A "slide to confirm" control for actions that shouldn't trigger on a single accidental tap.
 * Covers [variant], [size], [enabled], [checkThreshold], and [onSlideComplete]. The thumb, track,
 * and icon aren't swappable -- this always renders CDS's own arrow/spinner treatment.
 *
 * Takes no height. Drag math needs the handle's collapsed width, which is the kind of thing that
 * otherwise has to be passed in as a number because it's needed before layout runs. Instead the
 * track measures its own rendered size via [Modifier.onSizeChanged] and derives a square handle
 * from that, so the control's height is free to emerge from [size]'s padding plus the theme's line
 * height -- just as [com.coinbase.cds.components.button.Button] takes no height either.
 *
 * The gesture and its settle/snap-back animation are built entirely on
 * [androidx.compose.foundation.gestures.draggable] and [Animatable] -- both already part of
 * Compose Foundation/animation-core, so no extra dependency was needed for this.
 *
 * @param checked Controlled state: true once a slide has completed. This composable never resets
 * itself -- set it back to false (e.g. once an async action finishes or fails) to re-enable
 * dragging.
 * @param onCheckedChange Fires with `true` the moment a drag is released past [checkThreshold].
 * @param checkThreshold Fraction (0..1) of the track the handle must cover for a release to count
 * as complete.
 * @param onSlideComplete Fires once, alongside `onCheckedChange(true)` -- intended for side
 * effects like haptics or analytics, not for state changes.
 */
@Composable
internal fun SlideButton(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    uncheckedLabel: String,
    checkedLabel: String,
    modifier: Modifier = Modifier,
    variant: SlideButtonVariant = SlideButtonVariant.Primary,
    size: SlideButtonSize = SlideButtonSize.L,
    enabled: Boolean = true,
    checkThreshold: Float = 0.7f,
    onSlideComplete: (() -> Unit)? = null,
) {
    val colors = slideButtonColors(variant)
    val metrics = slideButtonMetrics(size)

    var trackSize by remember { mutableStateOf(IntSize.Zero) }
    // A collapsed/idle handle is exactly as wide as the track is tall, so the square-handle
    // assumption comes out of the measurement rather than out of a caller-supplied height.
    val collapsedFraction = if (trackSize.width > 0) {
        (trackSize.height.toFloat() / trackSize.width.toFloat()).coerceIn(0f, 1f)
    } else {
        0f
    }
    // Inset that centers the icon inside the *collapsed* handle -- computed from the same
    // measurement rather than a fixed token, since only the exact leftover space (collapsed
    // diameter minus icon size, halved) centers it regardless of how tall a given size/font
    // combination happens to render.
    val density = LocalDensity.current
    val handleInset = with(density) {
        ((trackSize.height - metrics.iconSize.toPx()) / 2f).coerceAtLeast(0f).toDp()
    }

    val settleProgress = remember { Animatable(if (checked) 1f else 0f) }
    var isDragging by remember { mutableStateOf(false) }
    var liveDragProgress by remember { mutableStateOf(0f) }

    LaunchedEffect(checked) {
        if (!isDragging) settleProgress.animateTo(if (checked) 1f else 0f, SettleSpring)
    }

    val abstractProgress = if (isDragging) liveDragProgress else settleProgress.value
    val displayedFraction = (collapsedFraction + abstractProgress * (1f - collapsedFraction)).coerceIn(0f, 1f)
    val checkedContentAlpha by animateFloatAsState(if (checked) 1f else 0f, tween(200), label = "slideButtonCheckedContent")

    val draggableState = rememberDraggableState { deltaPx ->
        val range = (trackSize.width.toFloat() * (1f - collapsedFraction)).coerceAtLeast(1f)
        liveDragProgress = (liveDragProgress + deltaPx / range).coerceIn(0f, 1f)
    }

    Box(
        modifier = modifier
            .alpha(if (enabled) 1f else DisabledAlpha)
            .fillMaxWidth()
            .clip(RoundedCornerShape(metrics.radius))
            .background(CdsTheme.colors.bgSecondary)
            .onSizeChanged { trackSize = it }
            .draggable(
                state = draggableState,
                orientation = Orientation.Horizontal,
                enabled = enabled && !checked,
                onDragStarted = {
                    isDragging = true
                    liveDragProgress = settleProgress.value
                },
                onDragStopped = {
                    isDragging = false
                    val finalDisplayed = collapsedFraction + liveDragProgress * (1f - collapsedFraction)
                    settleProgress.snapTo(liveDragProgress)
                    if (finalDisplayed >= checkThreshold) {
                        // Callbacks before the settle animation, not after: `animateTo` suspends
                        // for the length of the spring, so awaiting it first delayed the caller's
                        // notification (and any haptic) by a few hundred milliseconds past the
                        // release the user actually made.
                        onCheckedChange(true)
                        onSlideComplete?.invoke()
                        settleProgress.animateTo(1f, SettleSpring)
                    } else {
                        settleProgress.animateTo(0f, SettleSpring)
                    }
                },
            ),
        contentAlignment = Alignment.Center,
    ) {
        // Drawn first (bottom-most): the idle label sits directly on the track and gets covered
        // by the opaque handle as it grows, so it fades out behind the thumb.
        BasicText(
            text = uncheckedLabel,
            modifier = Modifier
                .padding(horizontal = metrics.labelPaddingX, vertical = metrics.paddingY)
                .alpha((1f - displayedFraction) * (1f - checkedContentAlpha)),
            style = metrics.font.copy(color = CdsTheme.colors.fg),
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
        )

        Box(modifier = Modifier.matchParentSize(), contentAlignment = Alignment.CenterStart) {
            Box(
                modifier = Modifier
                    .fillMaxWidth(fraction = displayedFraction)
                    .fillMaxHeight()
                    .clip(RoundedCornerShape(metrics.radius))
                    .background(colors.container),
                contentAlignment = Alignment.CenterEnd,
            ) {
                SlideButtonArrowIcon(
                    color = colors.content,
                    diameter = metrics.iconSize,
                    modifier = Modifier
                        .padding(end = handleInset)
                        .alpha(1f - checkedContentAlpha),
                )
                Spinner(
                    color = colors.content,
                    diameter = metrics.iconSize,
                    modifier = Modifier
                        .padding(end = handleInset)
                        .alpha(checkedContentAlpha),
                )
            }
        }

        // Drawn last (top-most): once checked, the handle is opaque and fully covers the track,
        // so this has to render above it rather than as a sibling of uncheckedLabel underneath.
        BasicText(
            text = checkedLabel,
            modifier = Modifier
                .padding(horizontal = metrics.labelPaddingX, vertical = metrics.paddingY)
                .alpha(checkedContentAlpha),
            style = metrics.font.copy(color = colors.content),
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
        )
    }
}

/** A simple hand-drawn forward arrow, standing in for CDS's `forwardArrow` icon glyph. */
@Composable
private fun SlideButtonArrowIcon(color: Color, diameter: Dp, modifier: Modifier = Modifier) {
    Canvas(modifier = modifier.size(diameter)) {
        val strokeWidth = size.minDimension * 0.12f
        // Bounding box is symmetric (0.2..0.8) so the glyph centers cleanly in its canvas; the
        // shaft/head junction sits a little right of the midpoint since the filled-looking head
        // otherwise reads as visually heavier than the thin shaft, throwing off the balance.
        val shaftPath = Path().apply {
            moveTo(size.width * 0.20f, size.height * 0.5f)
            lineTo(size.width * 0.54f, size.height * 0.5f)
        }
        val headPath = Path().apply {
            moveTo(size.width * 0.54f, size.height * 0.26f)
            lineTo(size.width * 0.80f, size.height * 0.5f)
            lineTo(size.width * 0.54f, size.height * 0.74f)
        }
        val stroke = Stroke(width = strokeWidth, cap = StrokeCap.Round, join = StrokeJoin.Round)
        drawPath(shaftPath, color = color, style = stroke)
        drawPath(headPath, color = color, style = stroke)
    }
}
