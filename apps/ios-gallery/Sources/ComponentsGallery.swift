@testable import CDSDesignSystem
import SwiftUI

/// Button styles, SlideButton, and the inverted theme. The components are `internal`, reached via
/// `@testable import`.
struct ComponentsGallery: View {
    @Environment(\.cdsTheme) private var cds
    @State private var slideChecked = false

    var body: some View {
        SectionCard(
            "Components",
            subtitle: "ButtonStyle · SlideButton · inverted theme"
        ) {
            VStack(alignment: .leading, spacing: cds.space.x3) {
                buttons
                slideButton
                invertedDemo
            }
        }
    }

    private var buttons: some View {
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

    private var slideButton: some View {
        VStack(alignment: .leading, spacing: cds.space.x1) {
            Text("SlideButton").cdsText(.label1, color: cds.colors.fgMuted)
            SlideButton(
                checked: $slideChecked,
                uncheckedLabel: "Slide to confirm",
                checkedLabel: "Confirming…"
            )
            Button("Reset slider") { slideChecked = false }
                .buttonStyle(.cds(.secondary, size: .s))
        }
    }

    /// Same content rendered under `InvertedThemeProvider`, which flips the scheme for its subtree.
    private var invertedDemo: some View {
        VStack(alignment: .leading, spacing: cds.space.x1) {
            Text("InvertedThemeProvider").cdsText(.label1, color: cds.colors.fgMuted)
            InvertedThemeProvider {
                InvertedCard()
            }
        }
    }
}

/// SwiftUI `Text` styled with `.cdsText`.
struct TextGallery: View {
    @Environment(\.cdsTheme) private var cds

    var body: some View {
        SectionCard("Text", subtitle: "Text + .cdsText") {
            VStack(alignment: .leading, spacing: cds.space.x1) {
                Text("Default foreground").cdsText(.body)
                Text("Muted foreground").cdsText(.body, color: cds.colors.fgMuted)
                Text("Underlined").cdsText(.body, underline: true)
                Text("Monospace 1234567890").cdsText(.body, mono: true)
                Text("Disabled").cdsText(.body).disabled(true)
                Text("Caption").cdsText(.caption)
            }
        }
    }
}

/// SwiftUI `ProgressView` styled with `.progressViewStyle(.cds)`.
struct ProgressGallery: View {
    @Environment(\.cdsTheme) private var cds

    var body: some View {
        SectionCard("ProgressView", subtitle: "ProgressView + .progressViewStyle(.cds)") {
            HStack(spacing: cds.space.x3) {
                ProgressView()
                    .progressViewStyle(.cds(.s))
                ProgressView()
                    .progressViewStyle(.cds(.m))
                ProgressView()
                    .progressViewStyle(.cds(.l))
                ProgressView(value: 0.65)
                    .progressViewStyle(.cds(.l, color: cds.colors.fgPrimary))
            }
        }
    }
}

/// SwiftUI `Toggle` styled with `.toggleStyle(.cds)`.
struct ToggleGallery: View {
    @Environment(\.cdsTheme) private var cds
    @State private var notificationsOn = true
    @State private var biometricsOn = false
    @State private var sellOn = true

    var body: some View {
        SectionCard("Toggle", subtitle: "Toggle + .toggleStyle(.cds)") {
            VStack(alignment: .leading, spacing: cds.space.x1) {
                Toggle("Notifications (primary)", isOn: $notificationsOn)
                    .toggleStyle(.cds(.primary))
                Toggle("Biometrics (positive)", isOn: $biometricsOn)
                    .toggleStyle(.cds(.positive))
                Toggle("Sell (negative)", isOn: $sellOn)
                    .toggleStyle(.cds(.negative))
                Toggle("Disabled", isOn: .constant(true))
                    .toggleStyle(.cds(.primary))
                    .disabled(true)
            }
        }
    }
}

/// SwiftUI `.alert`, the OS dialog, shown for contrast with CDS styling.
struct AlertGallery: View {
    @Environment(\.cdsTheme) private var cds
    @State private var showDeleteAlert = false

    var body: some View {
        SectionCard("Alert", subtitle: "System .alert") {
            VStack(alignment: .leading, spacing: cds.space.x1) {
                Text("OS dialog, not the CDS Alert component.")
                    .cdsText(.body, color: cds.colors.fgMuted)
                Button("Show system alert") { showDeleteAlert = true }
                    .buttonStyle(.cds(.negative))
                    .alert("Delete wallet?", isPresented: $showDeleteAlert) {
                        Button("Delete", role: .destructive) {}
                        Button("Cancel", role: .cancel) {}
                    } message: {
                        SwiftUI.Text("This cannot be undone.")
                    }
            }
        }
    }
}

/// Reads the (inverted) theme from the environment so its background/foreground come from the
/// flipped scheme.
private struct InvertedCard: View {
    @Environment(\.cdsTheme) private var cds

    var body: some View {
        Text("Content on the opposite scheme").cdsText(.body)
            .padding(cds.space.x2)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(cds.colors.bg)
            .cdsBorderedCard(radius: cds.borderRadius.radius300)
    }
}
