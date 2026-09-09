package com.coinbase.cds.androidapp.gallery

/**
 * Registered component galleries in display order. Visreg and manual QA navigate directly to a
 * single destination instead of scrolling a monolithic home screen.
 */
internal enum class GalleryDestination(
    val title: String,
    val subtitle: String,
    val testTag: String,
) {
    Button(
        title = "Button",
        subtitle = "Variants, states, sizes, icons, and layout",
        testTag = "gallery-component-button",
    ),
    ;

    fun previous(): GalleryDestination? = entries.getOrNull(ordinal - 1)

    fun next(): GalleryDestination? = entries.getOrNull(ordinal + 1)
}
