package com.coinbase.cds.interaction

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class CdsInteractionStateTest {
    @Test
    fun pressedTakesPriorityOverHoverAndFocus() {
        val state = resolveCdsInteractionVisualState(
            isPressed = true,
            isDragged = false,
            isHovered = true,
            isFocused = true,
        )
        assertEquals(CdsInteractionTokens.PressedContentAlpha, state.contentAlpha)
        assertEquals(CdsInteractionTokens.PressedScale, state.scale)
        assertTrue(state.showPressedScrim)
        assertFalse(state.showFocusRing)
    }

    @Test
    fun draggedMatchesPressedPriority() {
        val state = resolveCdsInteractionVisualState(
            isPressed = false,
            isDragged = true,
            isHovered = true,
            isFocused = true,
        )
        assertEquals(CdsInteractionTokens.PressedContentAlpha, state.contentAlpha)
        assertTrue(state.showPressedScrim)
        assertFalse(state.showFocusRing)
    }

    @Test
    fun hoverAppliesWhenNotActive() {
        val state = resolveCdsInteractionVisualState(
            isPressed = false,
            isDragged = false,
            isHovered = true,
            isFocused = false,
        )
        assertEquals(CdsInteractionTokens.HoveredContentAlpha, state.contentAlpha)
        assertEquals(1f, state.scale)
        assertFalse(state.showPressedScrim)
    }

    @Test
    fun focusRingShownOnlyWhenNotActive() {
        val state = resolveCdsInteractionVisualState(
            isPressed = false,
            isDragged = false,
            isHovered = false,
            isFocused = true,
        )
        assertTrue(state.showFocusRing)
        assertEquals(1f, state.contentAlpha)
    }
}
