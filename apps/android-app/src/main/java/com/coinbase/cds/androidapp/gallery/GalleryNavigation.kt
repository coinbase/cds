package com.coinbase.cds.androidapp.gallery

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import com.coinbase.cds.theme.CdsTheme

/**
 * Shared chrome for full-screen gallery destinations: back affordance, title, optional prev/next
 * pager between component galleries, and a single scrollable content region.
 */
@Composable
internal fun GalleryScreenScaffold(
    title: String,
    subtitle: String?,
    onBack: () -> Unit,
    modifier: Modifier = Modifier,
    testTag: String? = null,
    previousDestination: GalleryDestination? = null,
    nextDestination: GalleryDestination? = null,
    onNavigateToComponent: ((GalleryDestination) -> Unit)? = null,
    content: @Composable () -> Unit,
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .background(CdsTheme.colors.bg)
            .then(if (testTag != null) Modifier.testTag(testTag) else Modifier),
    ) {
        GalleryScreenHeader(
            title = title,
            subtitle = subtitle,
            onBack = onBack,
        )
        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(rememberScrollState())
                .padding(horizontal = CdsTheme.space.x3)
                .padding(bottom = CdsTheme.space.x2),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x2),
        ) {
            content()
        }
        if (onNavigateToComponent != null && (previousDestination != null || nextDestination != null)) {
            GalleryComponentPager(
                previousDestination = previousDestination,
                nextDestination = nextDestination,
                onNavigateToComponent = onNavigateToComponent,
            )
        }
    }
}

@Composable
private fun GalleryScreenHeader(
    title: String,
    subtitle: String?,
    onBack: () -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = CdsTheme.space.x3)
            .padding(top = CdsTheme.space.x3, bottom = CdsTheme.space.x2),
        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5),
            modifier = Modifier
                .clickable(onClick = onBack)
                .padding(vertical = CdsTheme.space.x0_5)
                .testTag("gallery-nav-back"),
        ) {
            GalleryChevronLeftIcon(color = CdsTheme.colors.fgPrimary, iconSize = 16.dp)
            GalleryText(
                text = "Back",
                style = CdsTheme.typography.label1,
                color = CdsTheme.colors.fgPrimary,
            )
        }
        GalleryText(text = title, style = CdsTheme.typography.title1, color = CdsTheme.colors.fg)
        if (subtitle != null) {
            GalleryText(
                text = subtitle,
                style = CdsTheme.typography.body,
                color = CdsTheme.colors.fgMuted,
            )
        }
    }
}

@Composable
internal fun GalleryDestinationRow(
    title: String,
    subtitle: String,
    onClick: () -> Unit,
    testTag: String,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(CdsTheme.borderRadius.radius300))
            .background(CdsTheme.colors.bgSecondary)
            .clickable(onClick = onClick)
            .padding(CdsTheme.space.x2)
            .testTag(testTag),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
    ) {
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5),
        ) {
            GalleryText(text = title, style = CdsTheme.typography.headline, color = CdsTheme.colors.fg)
            GalleryText(text = subtitle, style = CdsTheme.typography.body, color = CdsTheme.colors.fgMuted)
        }
        GalleryChevronRightIcon(color = CdsTheme.colors.fgMuted, iconSize = 16.dp)
    }
}

@Composable
private fun GalleryComponentPager(
    previousDestination: GalleryDestination?,
    nextDestination: GalleryDestination?,
    onNavigateToComponent: (GalleryDestination) -> Unit,
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(CdsTheme.colors.bgSecondary)
            .padding(horizontal = CdsTheme.space.x3, vertical = CdsTheme.space.x1_5),
        horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
    ) {
        GalleryPagerButton(
            label = previousDestination?.title?.let { "← $it" } ?: "← Previous",
            enabled = previousDestination != null,
            onClick = { previousDestination?.let(onNavigateToComponent) },
            modifier = Modifier
                .weight(1f)
                .testTag("gallery-nav-previous"),
        )
        GalleryPagerButton(
            label = nextDestination?.title?.let { "$it →" } ?: "Next →",
            enabled = nextDestination != null,
            onClick = { nextDestination?.let(onNavigateToComponent) },
            modifier = Modifier
                .weight(1f)
                .testTag("gallery-nav-next"),
        )
    }
}

@Composable
private fun GalleryPagerButton(
    label: String,
    enabled: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val background = if (enabled) CdsTheme.colors.bgTertiary else CdsTheme.colors.bgSecondary
    val foreground = if (enabled) CdsTheme.colors.fg else CdsTheme.colors.fgMuted
    GalleryText(
        text = label,
        style = CdsTheme.typography.label1,
        color = foreground,
        modifier = modifier
            .clip(RoundedCornerShape(CdsTheme.borderRadius.radius300))
            .background(background)
            .then(
                if (enabled) {
                    Modifier.clickable(onClick = onClick)
                } else {
                    Modifier
                },
            )
            .padding(vertical = CdsTheme.space.x1_5, horizontal = CdsTheme.space.x1),
    )
}
