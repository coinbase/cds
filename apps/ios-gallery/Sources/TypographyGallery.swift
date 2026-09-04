@testable import CDSDesignSystem
import SwiftUI

/// Every typography role rendered with `Text`, annotated with its size / line-height / weight.
/// Driven by `CDSTextStyle.allCases`.
struct TypographyGallery: View {
    @Environment(\.cdsTheme) private var cds

    var body: some View {
        SectionCard("Typography", subtitle: "\(CDSTextStyle.allCases.count) roles · theme.typography[role]") {
            VStack(alignment: .leading, spacing: cds.spacing.x2) {
                ForEach(CDSTextStyle.allCases, id: \.self) { role in
                    let attrs = cds.typography[role]
                    VStack(alignment: .leading, spacing: cds.spacing.x0_25) {
                        CDSDesignSystem.Text(role.tokenName, style: role)
                        CDSDesignSystem.Text(
                            "\(Int(attrs.size))/\(Int(attrs.lineHeight)) · \(weightLabel(attrs.weight))"
                                + (attrs.uppercased ? " · uppercased" : ""),
                            style: .legal,
                            color: cds.colors.fgMuted
                        )
                    }
                }
            }
        }
    }

    private func weightLabel(_ weight: Font.Weight) -> String {
        switch weight {
        case .black: return "black"
        case .bold: return "bold"
        case .heavy: return "heavy"
        case .light: return "light"
        case .medium: return "medium"
        case .semibold: return "semibold"
        case .thin: return "thin"
        case .ultraLight: return "ultraLight"
        default: return "regular"
        }
    }
}
