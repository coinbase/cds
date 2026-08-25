package com.coinbase.cds.components.button

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.lerp
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.style.TextOverflow
import com.coinbase.cds.components.internal.Spinner
import com.coinbase.cds.theme.CdsColorScheme
import com.coinbase.cds.theme.CdsTheme
import com.coinbase.cds.theme.CdsThemeProvider

/** Visual/semantic variant -- the five in the current Figma Button spec. */
internal enum class ButtonVariant { Primary, Secondary, Tertiary, Positive, Negative }

/** Size tier. The four sizes (`xs`/`s`/`m`/`l`) in the Figma Button spec. */
internal enum class ButtonSize { Xs, S, M, L }

private const val PressedScale = 0.98f
private const val DisabledAlpha = 0.4f
private const val PressedBlendFraction = 0.15f

/**
 * CDS's primary call-to-action control. Covers [variant], [size], [enabled]/[loading] state,
 * [transparent], [fullWidth], and leading/trailing icon slots. Raw color/background/border
 * overrides are deliberately absent -- re-theme via [CdsThemeProvider] instead, so the override
 * applies consistently rather than one call site at a time.
 *
 * Temporarily `internal` for the first AAR release — this was an experiment and is not customer
 * API yet.
 *
 * Reads colors and metrics from the ambient [CdsTheme], so wrapping a subtree in a
 * [CdsThemeProvider] override -- e.g. a customer brand theme -- is picked up automatically with no
 * extra wiring.
 *
 * @param transparent Renders on the plain page background with variant-colored text instead of a
 * filled, variant-colored container -- CDS's lower-emphasis "ghost" treatment.
 * @param leadingIcon Called with the button's resolved content color so an icon's tint
 * automatically matches the label and stays correct across variants and themes.
 */
@Composable
internal fun Button(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: ButtonVariant = ButtonVariant.Primary,
    size: ButtonSize = ButtonSize.L,
    enabled: Boolean = true,
    loading: Boolean = false,
    transparent: Boolean = false,
    fullWidth: Boolean = false,
    leadingIcon: (@Composable (tint: Color) -> Unit)? = null,
    trailingIcon: (@Composable (tint: Color) -> Unit)? = null,
) {
    val colors = buttonColors(variant, transparent)
    val metrics = buttonMetrics(size)

    val interactionSource = remember { MutableInteractionSource() }
    val pressed by interactionSource.collectIsPressedAsState()
    val active = pressed && enabled && !loading

    val scale by animateFloatAsState(if (active) PressedScale else 1f, label = "cdsButtonScale")
    val containerColor = if (active) {
        val scrim = if (CdsTheme.colorScheme == CdsColorScheme.Dark) Color.White else Color.Black
        lerp(colors.container, scrim, PressedBlendFraction)
    } else {
        colors.container
    }

    Row(
        modifier = modifier
            .then(if (fullWidth) Modifier.fillMaxWidth() else Modifier)
            .scale(scale)
            .alpha(if (enabled) 1f else DisabledAlpha)
            .clip(RoundedCornerShape(metrics.radius))
            .background(containerColor)
            .clickable(
                interactionSource = interactionSource,
                indication = null,
                enabled = enabled && !loading,
                role = Role.Button,
                onClick = onClick,
            )
            .padding(horizontal = metrics.paddingX, vertical = metrics.paddingY),
        horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1, Alignment.CenterHorizontally),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        if (loading) {
            Spinner(color = colors.content, diameter = metrics.iconSize)
        } else {
            leadingIcon?.invoke(colors.content)
            BasicText(
                text = text,
                style = metrics.font.copy(color = colors.content),
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
            )
            trailingIcon?.invoke(colors.content)
        }
    }
}
