package com.coinbase.cds.androidapp.gallery

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
internal fun ComponentGalleryScreen(
    destination: GalleryDestination,
    onBack: () -> Unit,
    onNavigateToComponent: (GalleryDestination) -> Unit,
    modifier: Modifier = Modifier,
) {
    when (destination) {
        GalleryDestination.Button -> ButtonGalleryScreen(
            onBack = onBack,
            onNavigateToComponent = onNavigateToComponent,
            modifier = modifier,
        )
    }
}
