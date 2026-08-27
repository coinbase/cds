@testable import CDSDesignSystem
import SwiftUI

/// The component surface. `CDSText`, `CDSButton`, and `CDSSlideButton` are `internal` (not customer
/// API yet), so the gallery reaches them via `@testable import` (Debug enables testability) to demo
/// the real components.
struct ComponentsGallery: View {
    @Environment(\.cdsTheme) private var cds
    @State private var slideChecked = false

    var body: some View {
        SectionCard("Components", subtitle: "CDSText · CDSButton · CDSSlideButton · CDSProgressCircle · inverted theme") {
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
            CDSText("CDSText", style: .label1, color: cds.colors.fgMuted)
            CDSText("Default foreground", style: .body)
            CDSText("Muted foreground", style: .body, color: cds.colors.fgMuted)
            CDSText("Underlined", style: .body, underline: true)
            CDSText("Monospace 1234567890", style: .body, mono: true)
            CDSText("Disabled", style: .body, enabled: false)
        }
    }

    private var buttons: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1) {
            CDSText("CDSButton", style: .label1, color: cds.colors.fgMuted)
            CDSButton(text: "Primary", action: {})
            CDSButton(text: "Secondary", action: {}, variant: .secondary)
            CDSButton(text: "Tertiary", action: {}, variant: .tertiary)
            CDSButton(text: "Positive", action: {}, variant: .positive)
            CDSButton(text: "Negative", action: {}, variant: .negative)
            CDSButton(text: "Ghost", action: {}, transparent: true)
            CDSButton(text: "Disabled", action: {}, isEnabled: false)
            CDSButton(text: "Loading", action: {}, loading: true)
            CDSButton(text: "Full width", action: {}, fullWidth: true)
        }
    }

    private var slideButton: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1) {
            CDSText("CDSSlideButton", style: .label1, color: cds.colors.fgMuted)
            CDSSlideButton(
                checked: $slideChecked,
                uncheckedLabel: "Slide to confirm",
                checkedLabel: "Confirming…"
            )
            CDSButton(text: "Reset slider", action: { slideChecked = false }, variant: .secondary, size: .s)
        }
    }

    private var progressCircle: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1) {
            CDSText("CDSProgressCircle", style: .label1, color: cds.colors.fgMuted)
            HStack(spacing: cds.spacing.x3) {
                CDSProgressCircle(size: .s)
                CDSProgressCircle(size: .m)
                CDSProgressCircle(size: .l)
            }
        }
    }

    /// Same content rendered under `InvertedThemeProvider`, which flips the scheme for its subtree.
    private var invertedDemo: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1) {
            CDSText("InvertedThemeProvider", style: .label1, color: cds.colors.fgMuted)
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
        CDSText("Content on the opposite scheme", style: .body)
            .padding(cds.spacing.x2)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(cds.colors.bg)
            .cdsBorderedCard(radius: cds.radius.r300)
    }
}
