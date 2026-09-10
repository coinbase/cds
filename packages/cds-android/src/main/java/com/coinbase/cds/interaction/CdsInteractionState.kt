package com.coinbase.cds.interaction

import androidx.compose.runtime.Immutable

/**
 * Resolved CDS interaction affordances for a single frame. Pure data so priority rules are
 * unit-testable without a composition.
 */
@Immutable
internal data class CdsInteractionVisualState(
    val isPressed: Boolean = false,
    val isDragged: Boolean = false,
    val isHovered: Boolean = false,
    val isFocused: Boolean = false,
) {
    val isActive: Boolean
        get() = isPressed || isDragged

    val contentAlpha: Float
        get() = when {
            isActive -> CdsInteractionTokens.PressedContentAlpha
            isHovered -> CdsInteractionTokens.HoveredContentAlpha
            else -> 1f
        }

    val scale: Float
        get() = if (isActive) CdsInteractionTokens.PressedScale else 1f

    val showPressedScrim: Boolean
        get() = isActive

    val showFocusRing: Boolean
        get() = isFocused && !isActive
}

/**
 * Collapses raw interaction flags into the CDS visual priority: pressed/dragged beat hover, and
 * focus is shown only when not actively pressed.
 */
internal fun resolveCdsInteractionVisualState(
    isPressed: Boolean,
    isDragged: Boolean,
    isHovered: Boolean,
    isFocused: Boolean,
): CdsInteractionVisualState = CdsInteractionVisualState(
    isPressed = isPressed,
    isDragged = isDragged,
    isHovered = isHovered,
    isFocused = isFocused,
)
