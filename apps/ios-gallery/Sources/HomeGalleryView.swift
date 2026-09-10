@testable import CDSDesignSystem
import SwiftUI

struct HomeGalleryView: View {
    @Environment(\.cdsTheme) private var cds
    @Binding var scheme: SchemeChoice
    @Binding var theme: ThemeChoice
    let onOpenThemeTokens: () -> Void
    let onOpenComponent: (GalleryDestination) -> Void

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: cds.spacing.x2) {
                CDSDesignSystem.Text("Coinbase Design System", style: .title1)
                CDSDesignSystem.Text(
                    "iOS gallery for theme tokens and CDS components.",
                    style: .body,
                    color: cds.colors.fgMuted
                )

                themeControls

                CDSDesignSystem.Text("Galleries", style: .headline)

                GalleryDestinationRow(
                    title: "Theme tokens",
                    subtitle: "Colors, spacing, typography, and the full token scale",
                    testTag: "gallery-destination-theme-tokens",
                    action: onOpenThemeTokens
                )

                CDSDesignSystem.Text("Components", style: .headline)

                ForEach(GalleryDestination.allCases) { destination in
                    GalleryDestinationRow(
                        title: destination.title,
                        subtitle: destination.subtitle,
                        testTag: destination.testTag,
                        action: { onOpenComponent(destination) }
                    )
                }
            }
            .padding(cds.spacing.x3)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .background(cds.colors.bg)
        .accessibilityIdentifier("gallery-home")
    }

    private var themeControls: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1_5) {
            CDSDesignSystem.Text("Theme", style: .headline)

            Picker("Theme", selection: $theme) {
                ForEach(ThemeChoice.allCases) { SwiftUI.Text($0.label).tag($0) }
            }
            .pickerStyle(.segmented)

            Picker("Color scheme", selection: $scheme) {
                ForEach(SchemeChoice.allCases) { SwiftUI.Text($0.label).tag($0) }
            }
            .pickerStyle(.segmented)
        }
        .padding(cds.spacing.x2)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(cds.colors.bgSecondary)
        .clipShape(RoundedRectangle(cornerRadius: cds.radius.r400))
    }
}
