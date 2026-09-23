package com.coinbase.cds.interaction

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.IndicationNodeFactory
import androidx.compose.foundation.interaction.DragInteraction
import androidx.compose.foundation.interaction.FocusInteraction
import androidx.compose.foundation.interaction.HoverInteraction
import androidx.compose.foundation.interaction.Interaction
import androidx.compose.foundation.interaction.InteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Paint
import androidx.compose.ui.graphics.Outline
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.drawscope.ContentDrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.scale
import androidx.compose.ui.node.CompositionLocalConsumerModifierNode
import androidx.compose.ui.node.DelegatableNode
import androidx.compose.ui.node.DrawModifierNode
import androidx.compose.ui.node.currentValueOf
import androidx.compose.ui.node.invalidateDraw
import androidx.compose.ui.unit.dp
import com.coinbase.cds.theme.CdsColorScheme
import com.coinbase.cds.theme.LocalCdsTheme
import kotlinx.coroutines.launch

private const val ScaleAnimationDurationMillis = 120

internal class CdsIndicationNodeFactory(
    private val shape: Shape?,
) : IndicationNodeFactory {
    override fun create(interactionSource: InteractionSource): DelegatableNode =
        CdsIndicationNode(interactionSource, shape)

    override fun equals(other: Any?): Boolean =
        other is CdsIndicationNodeFactory && other.shape == shape

    override fun hashCode(): Int = shape.hashCode()
}

private class CdsIndicationNode(
    private val interactionSource: InteractionSource,
    private val shape: Shape?,
) : Modifier.Node(), DrawModifierNode, CompositionLocalConsumerModifierNode {
    private val interactions = mutableStateListOf<Interaction>()
    private val animatedScale = Animatable(1f)

    override fun onAttach() {
        coroutineScope.launch {
            interactionSource.interactions.collect { interaction ->
                when (interaction) {
                    is PressInteraction.Press -> interactions.add(interaction)
                    is PressInteraction.Release -> interactions.remove(interaction.press)
                    is PressInteraction.Cancel -> interactions.remove(interaction.press)
                    is HoverInteraction.Enter -> interactions.add(interaction)
                    is HoverInteraction.Exit -> interactions.remove(interaction.enter)
                    is FocusInteraction.Focus -> interactions.add(interaction)
                    is FocusInteraction.Unfocus -> interactions.remove(interaction.focus)
                    is DragInteraction.Start -> interactions.add(interaction)
                    is DragInteraction.Stop -> interactions.remove(interaction.start)
                    is DragInteraction.Cancel -> interactions.remove(interaction.start)
                    else -> Unit
                }
                val visualState = currentVisualState()
                launch {
                    animatedScale.animateTo(
                        targetValue = visualState.scale,
                        animationSpec = tween(durationMillis = ScaleAnimationDurationMillis),
                    )
                }
                invalidateDraw()
            }
        }
    }

    override fun ContentDrawScope.draw() {
        val visualState = currentVisualState()
        val theme = currentValueOf(LocalCdsTheme)
        val focusColor = theme?.colors?.bgPrimary ?: Color.Unspecified
        val scrimBase = if (theme?.colorScheme == CdsColorScheme.Dark) Color.White else Color.Black
        val layerBounds = Rect(0f, 0f, size.width, size.height)

        scale(animatedScale.value, pivot = Offset(size.width / 2f, size.height / 2f)) {
            val alpha = visualState.contentAlpha
            if (alpha < 1f) {
                val layerPaint = Paint().apply { this.alpha = alpha }
                drawContext.canvas.saveLayer(layerBounds, layerPaint)
                this@draw.drawContent()
                drawContext.canvas.restore()
            } else {
                this@draw.drawContent()
            }
        }

        if (visualState.showPressedScrim) {
            val scrimColor = scrimBase.copy(alpha = CdsInteractionTokens.PressedScrimBlendFraction)
            drawShapeOverlay(color = scrimColor, filled = true)
        }

        if (visualState.showFocusRing && focusColor != Color.Unspecified) {
            val outlineWidth = CdsInteractionTokens.FocusOutlineWidthDp.dp.toPx()
            drawShapeOverlay(
                color = focusColor,
                filled = false,
                strokeWidth = outlineWidth,
            )
        }
    }

    private fun ContentDrawScope.drawShapeOverlay(
        color: Color,
        filled: Boolean,
        strokeWidth: Float = 0f,
    ) {
        val drawStyle = if (filled) androidx.compose.ui.graphics.drawscope.Fill else Stroke(width = strokeWidth)
        val outline = shape?.createOutline(size, layoutDirection, this)
        if (outline != null) {
            when (outline) {
                is Outline.Rectangle -> drawRect(
                    color = color,
                    topLeft = outline.rect.topLeft,
                    size = outline.rect.size,
                    style = drawStyle,
                )
                is Outline.Rounded -> {
                    val roundRect = outline.roundRect
                    drawRoundRect(
                        color = color,
                        topLeft = Offset(roundRect.left, roundRect.top),
                        size = Size(roundRect.width, roundRect.height),
                        cornerRadius = roundRect.topLeftCornerRadius,
                        style = drawStyle,
                    )
                }
                is Outline.Generic -> drawPath(
                    path = outline.path,
                    color = color,
                    style = drawStyle,
                )
            }
        } else if (!filled && strokeWidth > 0f) {
            val inset = CdsInteractionTokens.FocusOutlineOffsetDp.dp.toPx()
            drawRect(
                color = color,
                topLeft = Offset(-inset, -inset),
                size = size.copy(
                    width = size.width + inset * 2,
                    height = size.height + inset * 2,
                ),
                style = Stroke(width = strokeWidth),
            )
        } else if (filled) {
            drawRect(color = color)
        }
    }

    private fun currentVisualState(): CdsInteractionVisualState {
        val isPressed = interactions.any { it is PressInteraction.Press }
        val isDragged = interactions.any { it is DragInteraction.Start }
        val isHovered = interactions.any { it is HoverInteraction.Enter }
        val isFocused = interactions.any { it is FocusInteraction.Focus }
        return resolveCdsInteractionVisualState(isPressed, isDragged, isHovered, isFocused)
    }
}
