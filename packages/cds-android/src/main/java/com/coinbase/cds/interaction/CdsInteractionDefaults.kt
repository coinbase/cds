package com.coinbase.cds.interaction

import androidx.compose.foundation.Indication
import androidx.compose.foundation.IndicationNodeFactory
import androidx.compose.ui.graphics.Shape

/**
 * Shared CDS interaction affordances for clickable, focusable, hoverable, and draggable
 * composables.
 *
 * Paint the component's normal colors from [com.coinbase.cds.theme.CdsTheme], then pass
 * [indication] to `clickable`, `focusable`, or `indication` so press, hover, drag, and keyboard
 * focus render with CDS tokens. Disabled styling is separate: apply [DisabledAlpha] when the
 * component is not interactive.
 *
 * This uses Compose's standard [Indication] / [IndicationNodeFactory] APIs — not the alpha
 * Compose Styles API — so it can be adopted today and replaced internally later without changing
 * component parameters.
 */
public object CdsInteractionDefaults {
    /** Matches `accessibleOpacityDisabled` from `@coinbase/cds-common/tokens/interactable`. */
    public const val DisabledAlpha: Float = CdsInteractionTokens.DisabledAlpha

    /**
     * CDS interaction feedback with a rectangular focus outline. Use this when corners are square
     * or when an exact outline match is unnecessary.
     */
    public fun indication(): IndicationNodeFactory = CdsIndicationNodeFactory(shape = null)

    /**
     * CDS interaction feedback clipped to [shape]. Pass the same shape used by `clip` or
     * `background` when the focus ring and pressed scrim should follow rounded corners.
     */
    public fun indication(shape: Shape): IndicationNodeFactory = CdsIndicationNodeFactory(shape)
}
