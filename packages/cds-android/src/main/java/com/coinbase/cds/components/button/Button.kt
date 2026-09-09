package com.coinbase.cds.components.button

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.focusable
import androidx.compose.foundation.hoverable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.ProgressBarRangeInfo
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.disabled
import androidx.compose.ui.semantics.progressBarRangeInfo
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import com.coinbase.cds.components.internal.Spinner
import com.coinbase.cds.interaction.CdsInteractionDefaults
import com.coinbase.cds.theme.CdsTheme

/** Visual/semantic variant for [Button]. */
public enum class ButtonVariant {
    Primary,
    Secondary,
    Tertiary,
    Positive,
    Negative,
    Inverse,
}

/** Size tier for [Button]. */
public enum class ButtonSize {
    Xs,
    S,
    M,
    L,
}

/**
 * CDS's primary call-to-action control. Covers [variant], [size], [enabled]/[loading] state,
 * [transparent], icon slots, and accessibility semantics. Raw color/background/border overrides
 * are deliberately absent — re-theme via [com.coinbase.cds.theme.CdsThemeProvider] instead.
 *
 * For full-width layout, pass `Modifier.fillMaxWidth()`. For test hooks (RN `testID` equivalent),
 * pass `modifier = Modifier.testTag("confirm")` — the tag is applied on this root `Row` alongside
 * button semantics and gestures. Maestro can select it with `id:` when the host app enables
 * `testTagsAsResourceId` at the activity root; prefer matching visible label text when unique.
 * See `packages/cds-android/docs/button.md` and the cds-rn-to-compose `ui-testing` reference.
 *
 * @param transparent Renders on the plain page background with variant-colored text instead of a
 * filled, variant-colored container — CDS's lower-emphasis "ghost" treatment.
 * @param interactionSource Hoisted source for press, hover, and focus interactions. Pass the same
 * instance you observe via `collectIsPressedAsState()` or `interactions.collect`.
 * @param startIcon Called with the button's resolved content color and icon size so an icon's tint
 * and dimensions automatically match the label across variants and themes.
 * @param endIcon Same contract as [startIcon], rendered after the label.
 */
@Composable
public fun Button(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: ButtonVariant = ButtonVariant.Primary,
    size: ButtonSize = ButtonSize.L,
    enabled: Boolean = true,
    loading: Boolean = false,
    transparent: Boolean = false,
    maxLines: Int = 1,
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    startIcon: (@Composable (tint: Color, size: Dp) -> Unit)? = null,
    endIcon: (@Composable (tint: Color, size: Dp) -> Unit)? = null,
) {
    val colors = buttonColors(variant, transparent)
    val metrics = buttonMetrics(size)
    val shape = RoundedCornerShape(metrics.radius)
    val interactive = enabled && !loading

    Row(
        modifier = modifier
            .alpha(if (enabled) 1f else CdsInteractionDefaults.DisabledAlpha)
            .semantics(mergeDescendants = true) {
                role = Role.Button
                contentDescription = text
                if (loading) {
                    stateDescription = "Loading"
                    progressBarRangeInfo = ProgressBarRangeInfo.Indeterminate
                }
                if (!enabled) {
                    disabled()
                }
            }
            .clip(shape)
            .background(colors.container)
            .hoverable(interactionSource = interactionSource, enabled = interactive)
            .focusable(enabled = interactive, interactionSource = interactionSource)
            .clickable(
                interactionSource = interactionSource,
                indication = CdsInteractionDefaults.indication(shape),
                enabled = interactive,
                role = Role.Button,
                onClick = onClick,
            )
            .padding(horizontal = metrics.paddingX, vertical = metrics.paddingY),
        horizontalArrangement = Arrangement.spacedBy(
            CdsTheme.space.x1,
            Alignment.CenterHorizontally,
        ),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        if (loading) {
            Spinner(color = colors.content, diameter = metrics.iconSize)
        } else {
            startIcon?.invoke(colors.content, metrics.iconSize)
            BasicText(
                text = text,
                style = metrics.font.copy(
                    color = colors.content,
                    textAlign = TextAlign.Center,
                ),
                maxLines = maxLines,
                overflow = TextOverflow.Ellipsis,
            )
            endIcon?.invoke(colors.content, metrics.iconSize)
        }
    }
}
