@testable import CDSDesignSystem
import SwiftUI

struct ThemeTokensGalleryView: View {
    @Environment(\.cdsTheme) private var cds
    let onBack: () -> Void

    var body: some View {
        GalleryScreenScaffold(
            title: "Theme tokens",
            subtitle: "Live view of every token scale in the active theme.",
            onBack: onBack,
            testTag: "gallery-destination-theme-tokens"
        ) {
            ColorGallery()
            IllustrationGallery()
            SpectrumGallery()
            TypographyGallery()
            SpacingGallery()
            RadiusGallery()
            BorderWidthGallery()
            SizesGallery()
            ShadowGallery()
        }
    }
}
