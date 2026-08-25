package com.coinbase.cds.androidapp.gallery

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import com.coinbase.cds.theme.CdsColorRampToken
import com.coinbase.cds.theme.CdsColorToken
import com.coinbase.cds.theme.CdsSpectrumHueToken
import com.coinbase.cds.theme.CdsTheme

/**
 * The section headings the gallery renders, in order. Every [CdsColorToken] belongs to exactly one
 * group, so [ColorTokenSection] can walk `CdsColorToken.entries` and stay complete on its own as
 * new tokens are added to the design system.
 */
private enum class ColorGroup(val title: String) {
    Foreground("Foreground"),
    Background("Background"),
    Line("Line"),
    Elevation("Elevation"),
    Accent("Accent"),
    Transparent("Transparent"),
}

private val CdsColorToken.group: ColorGroup
    get() = when {
        this == CdsColorToken.Transparent -> ColorGroup.Transparent
        name.startsWith("BgLine") -> ColorGroup.Line
        name.startsWith("BgElevation") -> ColorGroup.Elevation
        name.startsWith("Accent") -> ColorGroup.Accent
        name.startsWith("Bg") -> ColorGroup.Background
        else -> ColorGroup.Foreground
    }

@Composable
internal fun ColorTokenSection() {
    val grouped = CdsColorToken.entries.groupBy { it.group }
    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x2)) {
        GallerySectionTitle("Color")
        ColorGroup.entries.forEach { group ->
            ColorGroupRow(group.title, grouped[group].orEmpty())
        }
    }
}

@Composable
private fun ColorGroupRow(title: String, tokens: List<CdsColorToken>) {
    val colors = CdsTheme.colors
    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1)) {
        GalleryText(text = title, style = CdsTheme.typography.label1, color = colors.fgMuted)
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
        ) {
            tokens.forEach { GallerySwatchCard(it.tokenName, colors[it]) }
        }
    }
}

@Composable
internal fun SpectrumSection() {
    val spectrum = CdsTheme.spectrum
    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5)) {
        GallerySectionTitle("Spectrum")
        // Both axes are token enums, so this stays complete on its own as hues or tonal steps are
        // added -- no hand-maintained list of 11 hues times 13 steps.
        CdsSpectrumHueToken.entries.forEach { hue ->
            Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5)) {
                GalleryText(
                    text = hue.tokenName,
                    style = CdsTheme.typography.legal,
                    color = CdsTheme.colors.fgMuted,
                )
                Row(horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5)) {
                    CdsColorRampToken.entries.forEach { step ->
                        GalleryColorChip(spectrum[hue][step], 20.dp)
                    }
                }
            }
        }
    }
}
