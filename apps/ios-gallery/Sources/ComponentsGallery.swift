@testable import CDSDesignSystem
import SwiftUI

/// The component surface. `Text`, `Button`, and `SlideButton` are `internal`, so the gallery
/// reaches them via `@testable import` (Debug enables testability) to demo the real components.
struct ComponentsGallery: View {
    @Environment(\.cdsTheme) private var cds
    @State private var slideChecked = false

    var body: some View {
        SectionCard("Components", subtitle: "Text · Button · SlideButton · ProgressCircle · inverted theme") {
            VStack(alignment: .leading, spacing: cds.spacing.x3) {
                text
                buttons
                slideButton
                progressCircle
                invertedDemo
            }
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

    private var buttons: some View {
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

    /// Same content rendered under `InvertedThemeProvider`, which flips the scheme for its subtree.
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
