@testable import CDSDesignSystem
import SwiftUI

struct OtherComponentsGalleryView: View {
    @Environment(\.cdsTheme) private var cds
    @State private var slideChecked = false
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
            progressCircle
            invertedDemo
        }
    }

    private var text: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1) {
            CDSDesignSystem.Text("Text", style: .label1, color: cds.colors.fgMuted)
            CDSDesignSystem.Text("Default foreground", style: .body)
            CDSDesignSystem.Text("Muted foreground", style: .body, color: cds.colors.fgMuted)
            CDSDesignSystem.Text("Underlined", style: .body, underline: true)
            CDSDesignSystem.Text("Monospace 1234567890", style: .body, mono: true)
            CDSDesignSystem.Text("Disabled", style: .body, enabled: false)
        }
    }

    private var slideButton: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1) {
            CDSDesignSystem.Text("SlideButton", style: .label1, color: cds.colors.fgMuted)
            SlideButton(
                checked: $slideChecked,
                uncheckedLabel: "Slide to confirm",
                checkedLabel: "Confirming…"
            )
            CDSDesignSystem.Button(text: "Reset slider", action: { slideChecked = false }, variant: .secondary, size: .s)
        }
    }

    private var progressCircle: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1) {
            CDSDesignSystem.Text("ProgressCircle", style: .label1, color: cds.colors.fgMuted)
            HStack(spacing: cds.spacing.x3) {
                ProgressCircle(size: .s)
                ProgressCircle(size: .m)
                ProgressCircle(size: .l)
            }
        }
    }

    private var invertedDemo: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1) {
            CDSDesignSystem.Text("InvertedThemeProvider", style: .label1, color: cds.colors.fgMuted)
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
        CDSDesignSystem.Text("Content on the opposite scheme", style: .body)
            .padding(cds.spacing.x2)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(cds.colors.bg)
            .cdsBorderedCard(radius: cds.radius.r300)
    }
}
