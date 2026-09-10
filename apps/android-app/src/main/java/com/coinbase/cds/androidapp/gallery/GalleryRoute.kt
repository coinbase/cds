package com.coinbase.cds.androidapp.gallery

internal sealed interface GalleryRoute {
    data object Home : GalleryRoute

    data object ThemeTokens : GalleryRoute

    data class Component(val destination: GalleryDestination) : GalleryRoute
}
