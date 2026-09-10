package com.coinbase.cds.androidapp.gallery

import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
internal fun ButtonGalleryScreen(
    onBack: () -> Unit,
    onNavigateToComponent: (GalleryDestination) -> Unit,
    modifier: Modifier = Modifier,
) {
    val destination = GalleryDestination.Button
    GalleryScreenScaffold(
        title = destination.title,
        subtitle = destination.subtitle,
        onBack = onBack,
        modifier = modifier.systemBarsPadding(),
        testTag = destination.testTag,
        previousDestination = destination.previous(),
        nextDestination = destination.next(),
        onNavigateToComponent = onNavigateToComponent,
    ) {
        ButtonGallerySection()
    }
}
