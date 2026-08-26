import CDSDesignSystem
import SwiftUI

/// The (currently small) component surface: `CDSText` color variants, a themed "button"-style
/// surface built from tokens, and an `InvertedThemeProvider` demo.
struct ComponentsGallery: View {
    @Environment(\.cdsTheme) private var cds

    var body: some View {
        SectionCard("Components", subtitle: "CDSText · token-built surfaces · inverted theme") {
            VStack(alignment: .leading, spacing: cds.spacing.x2) {
                VStack(alignment: .leading, spacing: cds.spacing.x0_5) {
                    CDSText("Default foreground", style: .body)
                    CDSText("Muted foreground", style: .body, color: cds.colors.fgMuted)
                    CDSText("Primary foreground", style: .body, color: cds.colors.fgPrimary)
                    CDSText("Positive / Negative", style: .body, color: cds.colors.fgPositive)
                }

                pseudoButton

                invertedDemo
            }
        }
    }

    /// A primary "button" surface assembled purely from theme tokens (no Button component yet).
    private var pseudoButton: some View {
        CDSText("Primary action", style: .headline, color: cds.colors.fgInverse)
            .padding(.horizontal, cds.spacing.x2)
            .padding(.vertical, cds.spacing.x1_5)
            .background(cds.colors.bgPrimary)
            .clipShape(RoundedRectangle(cornerRadius: cds.radius.pill))
    }

    /// Same content rendered under `InvertedThemeProvider`, which flips the scheme for its subtree.
    private var invertedDemo: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x0_5) {
            CDSText("InvertedThemeProvider", style: .label1)
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
            .clipShape(RoundedRectangle(cornerRadius: cds.radius.r300))
            .overlay(
                RoundedRectangle(cornerRadius: cds.radius.r300)
                    .strokeBorder(cds.colors.bgLine, lineWidth: cds.borderWidth.w100)
            )
    }
}
