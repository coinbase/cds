package com.coinbase.cds.androidapp.gallery

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import com.coinbase.cds.components.button.Button
import com.coinbase.cds.components.button.ButtonVariant
import com.coinbase.cds.theme.CdsTheme

@Composable
internal fun HomeGalleryScreen(
    darkTheme: Boolean,
    onToggleDarkTheme: () -> Unit,
    customBrand: Boolean,
    onToggleBrand: () -> Unit,
    onOpenThemeTokens: () -> Unit,
    onOpenComponent: (GalleryDestination) -> Unit,
    modifier: Modifier = Modifier,
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .background(CdsTheme.colors.bg)
            .systemBarsPadding()
            .padding(CdsTheme.space.x3)
            .testTag("gallery-home"),
        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x2),
    ) {
        GalleryText(
            text = "Coinbase Design System",
            style = CdsTheme.typography.title1,
            color = CdsTheme.colors.fg,
        )
        GalleryText(
            text = "Android gallery for theme tokens and CDS components.",
            style = CdsTheme.typography.body,
            color = CdsTheme.colors.fgMuted,
        )

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(CdsTheme.borderRadius.radius400))
                .background(CdsTheme.colors.bgSecondary)
                .padding(CdsTheme.space.x2),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
        ) {
            GalleryText(
                text = "Theme",
                style = CdsTheme.typography.headline,
                color = CdsTheme.colors.fg,
            )
            Button(
                text = if (darkTheme) "Switch to light theme" else "Switch to dark theme",
                onClick = onToggleDarkTheme,
                modifier = Modifier.fillMaxWidth(),
            )
            Button(
                text = if (customBrand) {
                    "Switch to default CDS theme"
                } else {
                    "Switch to Acme brand theme"
                },
                onClick = onToggleBrand,
                modifier = Modifier.fillMaxWidth(),
                variant = ButtonVariant.Tertiary,
            )
        }

        GalleryText(
            text = "Galleries",
            style = CdsTheme.typography.headline,
            color = CdsTheme.colors.fg,
        )

        GalleryDestinationRow(
            title = "Theme tokens",
            subtitle = "Colors, spacing, typography, and the full token scale",
            onClick = onOpenThemeTokens,
            testTag = "gallery-destination-theme-tokens",
        )

        GalleryText(
            text = "Components",
            style = CdsTheme.typography.headline,
            color = CdsTheme.colors.fg,
        )

        GalleryDestination.entries.forEach { destination ->
            GalleryDestinationRow(
                title = destination.title,
                subtitle = destination.subtitle,
                onClick = { onOpenComponent(destination) },
                testTag = destination.testTag,
            )
        }
    }
}
