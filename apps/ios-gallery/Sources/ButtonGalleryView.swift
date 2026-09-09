@testable import CDSDesignSystem
import SwiftUI

struct ButtonGalleryView: View {
    @Environment(\.cdsTheme) private var cds
    let onBack: () -> Void
    let onNavigateToComponent: (GalleryDestination) -> Void

    private let destination = GalleryDestination.button

    var body: some View {
        GalleryScreenScaffold(
            title: destination.title,
            subtitle: destination.subtitle,
            onBack: onBack,
            testTag: destination.testTag,
            previousDestination: destination.previous(),
            nextDestination: destination.next(),
            onNavigateToComponent: onNavigateToComponent
        ) {
            VStack(alignment: .leading, spacing: cds.spacing.x1) {
                CDSDesignSystem.Text("Button", style: .label1, color: cds.colors.fgMuted)
                CDSDesignSystem.Button(text: "Primary", action: {})
                CDSDesignSystem.Button(text: "Secondary", action: {}, variant: .secondary)
                CDSDesignSystem.Button(text: "Tertiary", action: {}, variant: .tertiary)
                CDSDesignSystem.Button(text: "Positive", action: {}, variant: .positive)
                CDSDesignSystem.Button(text: "Negative", action: {}, variant: .negative)
                CDSDesignSystem.Button(text: "Ghost", action: {}, transparent: true)
                CDSDesignSystem.Button(text: "Disabled", action: {}, isEnabled: false)
                CDSDesignSystem.Button(text: "Loading", action: {}, loading: true)
                CDSDesignSystem.Button(text: "Full width", action: {}, fullWidth: true)
            }
        }
    }
}
