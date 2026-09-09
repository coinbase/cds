@testable import CDSDesignSystem
import SwiftUI

struct OtherComponentsGalleryView: View {
    @Environment(\.cdsTheme) private var cds
    @State private var slideChecked = false
    @State private var notificationsOn = true
    @State private var biometricsOn = false
    @State private var sellOn = true
    @State private var showDeleteAlert = false
    let onBack: () -> Void
    let onNavigateToComponent: (GalleryDestination) -> Void

    private let destination = GalleryDestination.otherComponents

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
            text
            slideButton
            progressView
            toggle
            alert
            invertedDemo
        }
    }

    private var text: some View {
        VStack(alignment: .leading, spacing: cds.space.x1) {
            Text("Text").cdsText(.label1, color: cds.colors.fgMuted)
            Text("Default foreground").cdsText(.body)
            Text("Muted foreground").cdsText(.body, color: cds.colors.fgMuted)
            Text("Underlined").cdsText(.body, underline: true)
            Text("Monospace 1234567890").cdsText(.body, mono: true)
            Text("Disabled").cdsText(.body).disabled(true)
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

    private var progressView: some View {
        VStack(alignment: .leading, spacing: cds.space.x1) {
            Text("ProgressView").cdsText(.label1, color: cds.colors.fgMuted)
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

    private var toggle: some View {
        VStack(alignment: .leading, spacing: cds.space.x1) {
            Text("Toggle").cdsText(.label1, color: cds.colors.fgMuted)
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

    private var alert: some View {
        VStack(alignment: .leading, spacing: cds.space.x1) {
            Text("Alert (system .alert)").cdsText(.label1, color: cds.colors.fgMuted)
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

    private var invertedDemo: some View {
        VStack(alignment: .leading, spacing: cds.space.x1) {
            Text("InvertedThemeProvider").cdsText(.label1, color: cds.colors.fgMuted)
            InvertedThemeProvider {
                InvertedCard()
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
