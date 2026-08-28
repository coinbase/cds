@testable import CDSDesignSystem
import SwiftUI

/// Every semantic color token, resolved from the active theme. Driven by `CDSColorToken.allCases`
/// — adding a token to the design system makes it appear here automatically.
struct ColorGallery: View {
    @Environment(\.cdsTheme) private var cds

    private let columns = [GridItem(.adaptive(minimum: 92), spacing: 12)]

    var body: some View {
        SectionCard("Semantic colors", subtitle: "\(CDSColorToken.allCases.count) tokens · theme.colors[token]") {
            LazyVGrid(columns: columns, alignment: .leading, spacing: cds.spacing.x1_5) {
                ForEach(CDSColorToken.allCases, id: \.self) { token in
                    Swatch(color: cds.colors[token], label: token.tokenName)
                }
            }
        }
    }
}

/// Every illustration color token, resolved from the active theme. Driven by
/// `CDSIllustrationColorToken.allCases` — walks `theme.illustrationColors[token]`.
struct IllustrationGallery: View {
    @Environment(\.cdsTheme) private var cds

    private let columns = [GridItem(.adaptive(minimum: 92), spacing: 12)]

    var body: some View {
        SectionCard("Illustration colors", subtitle: "\(CDSIllustrationColorToken.allCases.count) tokens · theme.illustrationColors[token]") {
            LazyVGrid(columns: columns, alignment: .leading, spacing: cds.spacing.x1_5) {
                ForEach(CDSIllustrationColorToken.allCases, id: \.self) { token in
                    Swatch(color: cds.illustrationColors[token], label: token.tokenName)
                }
            }
        }
    }
}

/// The raw spectrum: every hue as a row of its 13 tonal steps. Driven by the hue/step token
/// enums, walking `theme.spectrum[hue][step]`.
struct SpectrumGallery: View {
    @Environment(\.cdsTheme) private var cds

    var body: some View {
        SectionCard("Spectrum", subtitle: "11 hues × 13 steps · theme.spectrum[hue][step]") {
            VStack(alignment: .leading, spacing: cds.spacing.x1_5) {
                ForEach(CDSSpectrumHueToken.allCases, id: \.self) { hue in
                    VStack(alignment: .leading, spacing: cds.spacing.x0_5) {
                        CDSDesignSystem.Text(hue.tokenName, style: .legal, color: cds.colors.fgMuted)
                        HStack(spacing: 2) {
                            ForEach(CDSColorRampToken.allCases, id: \.self) { step in
                                RoundedRectangle(cornerRadius: 3)
                                    .fill(cds.spectrum[hue][step])
                                    .frame(height: 24)
                                    .frame(maxWidth: .infinity)
                            }
                        }
                        .overlay(
                            RoundedRectangle(cornerRadius: 3)
                                .strokeBorder(cds.colors.bgLine, lineWidth: cds.borderWidth.w100)
                        )
                    }
                }
            }
        }
    }
}
