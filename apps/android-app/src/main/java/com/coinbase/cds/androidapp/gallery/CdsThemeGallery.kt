package com.coinbase.cds.androidapp.gallery

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.add
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.coinbase.cds.theme.CdsColorScheme
import com.coinbase.cds.theme.CdsTheme
import com.coinbase.cds.theme.CdsThemeProvider

/**
 * Renders every color, spectrum, spacing, radius, size, shadow, and typography token in [theme],
 * resolved against [colorScheme], as labeled swatches -- so a team building a custom [CdsTheme] can
 * visually sanity-check the whole thing (contrast, coverage, scale) in one screen instead of
 * eyeballing it one UI at a time.
 *
 * Takes the theme it inspects as a parameter, because the point is inspecting a theme that may not
 * be the one installed ambiently -- e.g. comparing a draft brand theme against
 * [com.coinbase.cds.theme.CdsDefaultTheme] side by side. It then installs that theme over its own
 * subtree with [CdsThemeProvider] and reads it back through the normal `CdsTheme` accessors, so the
 * sections below stay ordinary CDS consumers rather than a parallel way of reading a theme.
 * Everything else in this package is an internal implementation detail; consumers only ever call
 * this one entry point.
 *
 * Handles its own edge-to-edge inset safety: the background always fills the full bounds given by
 * [modifier] (including behind the status/navigation bars), while list content is padded away
 * from the system bars internally via `contentPadding`. Callers should NOT add
 * `Modifier.systemBarsPadding()` themselves -- doing so would shrink the bounds this composable
 * paints its background into, leaving a mismatched strip showing the window background behind the
 * system bars instead of [theme]'s background.
 *
 * @param onBack when non-null, renders a back affordance in the header that invokes this on tap.
 * Left null by default so the gallery can be embedded inside a screen that already provides its
 * own navigation chrome (a host Activity/screen still needs to handle the system back
 * gesture/button itself either way -- this only adds an on-screen, discoverable affordance).
 */
@Composable
fun CdsThemeGallery(
    theme: CdsTheme,
    colorScheme: CdsColorScheme,
    modifier: Modifier = Modifier,
    onBack: (() -> Unit)? = null,
) {
    CdsThemeProvider(theme = theme, colorScheme = colorScheme) {
        GalleryContent(modifier = modifier, onBack = onBack)
    }
}

@Composable
private fun GalleryContent(modifier: Modifier, onBack: (() -> Unit)?) {
    val edgePadding = CdsTheme.space.x2
    val contentPadding = WindowInsets.systemBars
        .add(WindowInsets(edgePadding, edgePadding, edgePadding, edgePadding))
        .asPaddingValues()
    LazyColumn(
        modifier = modifier.background(CdsTheme.colors.bg),
        contentPadding = contentPadding,
        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x4),
    ) {
        item { GalleryHeader(onBack) }
        item { ColorTokenSection() }
        item { SpectrumSection() }
        item { SpaceSection() }
        item { BorderSection() }
        item { SizeSection() }
        item { ShadowSection() }
        item { TypographySection() }
    }
}

@Composable
private fun GalleryHeader(onBack: (() -> Unit)?) {
    // Stacked rather than a single Row with the title: the title can wrap onto two lines, and a
    // side-by-side back affordance ends up vertically stranded against whichever line it happens
    // to land next to. Its own line above the title avoids that regardless of title length.
    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1)) {
        if (onBack != null) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5),
                modifier = Modifier
                    .clickable(onClick = onBack)
                    .padding(vertical = CdsTheme.space.x0_5),
            ) {
                GalleryChevronLeftIcon(color = CdsTheme.colors.fgPrimary, iconSize = 16.dp)
                GalleryText(
                    text = "Back",
                    style = CdsTheme.typography.label1,
                    color = CdsTheme.colors.fgPrimary,
                )
            }
        }
        GalleryText(
            text = "CDS Theme Gallery — ${CdsTheme.colorScheme}",
            style = CdsTheme.typography.title1,
            color = CdsTheme.colors.fg,
        )
    }
}
