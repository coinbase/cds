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
            VStack(alignment: .leading, spacing: cds.space.x1) {
                Text("ButtonStyle").cdsText(.label1, color: cds.colors.fgMuted)
                Button("Primary") {}
                    .buttonStyle(.cds(.primary))
                Button("Secondary") {}
                    .buttonStyle(.cds(.secondary))
                Button("Tertiary") {}
                    .buttonStyle(.cds(.tertiary))
                Button("Positive") {}
                    .buttonStyle(.cds(.positive))
                Button("Negative") {}
                    .buttonStyle(.cds(.negative))
                Button("Ghost") {}
                    .buttonStyle(.cds(.primary, transparent: true))
                Button("Disabled") {}
                    .buttonStyle(.cds(.primary))
                    .disabled(true)
                Button("Loading") {}
                    .buttonStyle(.cds(.primary, loading: true))
                Button("Full width") {}
                    .buttonStyle(.cds(.primary, fullWidth: true))

                Text("CDSButtonLabel (icon spacing + tint)").cdsText(.label1, color: cds.colors.fgMuted)
                    .padding(.top, cds.space.x2)
                Button(action: {}) {
                    CDSButtonLabel("Continue", trailing: Image(systemName: "chevron.right"))
                }
                .buttonStyle(.cds(.primary))
                Button(action: {}) {
                    CDSButtonLabel("Add", leading: Image(systemName: "plus"))
                }
                .buttonStyle(.cds(.secondary))
                Button(action: {}) {
                    CDSButtonLabel(
                        "Wallet",
                        leading: Image(systemName: "creditcard"),
                        trailing: Image(systemName: "chevron.right")
                    )
                }
                .buttonStyle(.cds(.tertiary))
                Button(action: {}) {
                    CDSButtonLabel("Continue", trailing: Image(systemName: "chevron.right"))
                }
                .buttonStyle(.cds(.primary, size: .s))
                Button(action: {}) {
                    CDSButtonLabel("Disabled", trailing: Image(systemName: "chevron.right"))
                }
                .buttonStyle(.cds(.primary))
                .disabled(true)
            }
        }
    }
}
