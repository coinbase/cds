package com.coinbase.cds.components.text

import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import com.coinbase.cds.theme.CdsFontToken
import com.coinbase.cds.theme.CdsTheme
import com.coinbase.cds.theme.CdsTypography

private const val DisabledAlpha = 0.4f

/**
 * Temporarily `internal` for the first AAR release — this was an experiment and is not customer
 * API yet.
 *
 * CDS's text primitive. [font] is the primary feature -- it alone drives
 * family/size/weight/line-height -- and [color] is the close second, defaulting to `fg`. [align],
 * [maxLines]/[overflow], [underline], [mono], and [enabled] round out the rest of what's genuinely
 * useful without a native Compose analog already covering it.
 *
 * Deliberately omitted: escape hatches for setting an arbitrary color or background (use [color], or
 * wrap in a `Modifier.background`) and a test-id parameter ([modifier] plus `Modifier.testTag`
 * covers it).
 *
 * [CdsFontToken.Caption] is automatically uppercased here -- see [CdsTypography] for why that one
 * token can't live in a [TextStyle] alone.
 *
 * @param mono Swaps to the platform's generic monospace family. CDS specifies Source Code Pro here;
 * since no custom font files are bundled (see [CdsTypography]), [FontFamily.Monospace] is the
 * closest equivalent Android already provides for free.
 */
@Composable
internal fun Text(
    text: String,
    modifier: Modifier = Modifier,
    font: CdsFontToken = CdsFontToken.Body,
    color: Color = CdsTheme.colors.fg,
    align: TextAlign? = null,
    maxLines: Int = Int.MAX_VALUE,
    overflow: TextOverflow = TextOverflow.Clip,
    underline: Boolean = false,
    mono: Boolean = false,
    enabled: Boolean = true,
) {
    val baseStyle = CdsTheme.typography[font]
    val style = baseStyle.copy(
        color = color,
        textAlign = align ?: baseStyle.textAlign,
        textDecoration = if (underline) TextDecoration.Underline else null,
        fontFamily = if (mono) FontFamily.Monospace else baseStyle.fontFamily,
    )
    val displayedText = if (font == CdsFontToken.Caption) text.uppercase() else text

    BasicText(
        text = displayedText,
        modifier = modifier.alpha(if (enabled) 1f else DisabledAlpha),
        style = style,
        maxLines = maxLines,
        overflow = overflow,
    )
}
