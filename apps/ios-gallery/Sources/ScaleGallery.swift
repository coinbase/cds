@testable import CDSDesignSystem
import SwiftUI

/// Spacing scale, drawn as bars whose width equals the token value.
struct SpacingGallery: View {
    @Environment(\.cdsTheme) private var cds

    private var items: [(String, CGFloat)] {
        CDSSpacingToken.allCases.map { ($0.rawValue, cds.spacing[$0]) }
    }

    var body: some View {
        SectionCard("Spacing", subtitle: "theme.spacing") {
            VStack(alignment: .leading, spacing: cds.spacing.x0_75) {
                ForEach(items, id: \.0) { name, value in
                    SampleRow(label: "\(name) · \(Int(value))") {
                        Rectangle()
                            .fill(cds.colors.bgPrimary)
                            .frame(width: max(1, value), height: 12)
                            .clipShape(RoundedRectangle(cornerRadius: 2))
                    }
                }
            }
        }
    }
}

/// Border radius scale, drawn as rounded squares (the r1000 pill value is clamped for display).
struct RadiusGallery: View {
    @Environment(\.cdsTheme) private var cds

    private var items: [(String, CGFloat)] {
        CDSRadiusToken.allCases.map { ($0.rawValue, cds.radius[$0]) }
    }

    var body: some View {
        SectionCard("Radius", subtitle: "theme.radius") {
            VStack(alignment: .leading, spacing: cds.spacing.x0_75) {
                ForEach(items, id: \.0) { name, value in
                    SampleRow(label: name) {
                        RoundedRectangle(cornerRadius: min(value, 28))
                            .fill(cds.colors.bgSecondary)
                            .overlay(
                                RoundedRectangle(cornerRadius: min(value, 28))
                                    .strokeBorder(cds.colors.bgLinePrimary, lineWidth: cds.borderWidth.w200)
                            )
                            .frame(width: 56, height: 40)
                    }
                }
            }
        }
    }
}

/// Border width scale, drawn as lines of the corresponding thickness.
struct BorderWidthGallery: View {
    @Environment(\.cdsTheme) private var cds

    private var items: [(String, CGFloat)] {
        CDSBorderWidthToken.allCases.map { ($0.rawValue, cds.borderWidth[$0]) }
    }

    var body: some View {
        SectionCard("Border width", subtitle: "theme.borderWidth") {
            VStack(alignment: .leading, spacing: cds.spacing.x0_75) {
                ForEach(items, id: \.0) { name, value in
                    SampleRow(label: "\(name) · \(Int(value))") {
                        Rectangle()
                            .fill(cds.colors.fg)
                            .frame(width: 120, height: max(1, value))
                    }
                }
            }
        }
    }
}

/// Icon / avatar / control size scales, drawn as squares at their pixel size.
struct SizesGallery: View {
    @Environment(\.cdsTheme) private var cds

    var body: some View {
        SectionCard("Sizes", subtitle: "theme.iconSize · avatarSize · controlSize") {
            VStack(alignment: .leading, spacing: cds.spacing.x1_5) {
                sizeRow("Icon", CDSIconSizeToken.allCases.map { ($0.rawValue, cds.iconSize[$0]) })
                sizeRow("Avatar", CDSAvatarSizeToken.allCases.map { ($0.rawValue, cds.avatarSize[$0]) })
                sizeRow("Control", CDSControlSizeToken.allCases.map { ($0.tokenName, cds.controlSize[$0]) })
            }
        }
    }

    private func sizeRow(_ title: String, _ items: [(String, CGFloat)]) -> some View {
        VStack(alignment: .leading, spacing: cds.spacing.x0_5) {
            CDSDesignSystem.Text(title, style: .label1)
            HStack(alignment: .bottom, spacing: cds.spacing.x1_5) {
                ForEach(items, id: \.0) { name, value in
                    VStack(spacing: cds.spacing.x0_25) {
                        RoundedRectangle(cornerRadius: 4)
                            .fill(cds.colors.accentBoldBlue)
                            .frame(width: value, height: value)
                        CDSDesignSystem.Text("\(name)\n\(Int(value))", style: .legal, color: cds.colors.fgMuted)
                            .multilineTextAlignment(.center)
                    }
                }
            }
        }
    }
}

/// Elevation shadows applied via the `.cdsShadow(_:)` modifier.
struct ShadowGallery: View {
    @Environment(\.cdsTheme) private var cds

    var body: some View {
        SectionCard("Shadows", subtitle: "theme.shadow · .cdsShadow()") {
            HStack(spacing: cds.spacing.x3) {
                ForEach(CDSShadowToken.allCases, id: \.self) { token in
                    shadowCard(token.rawValue, cds.shadow[token])
                }
            }
            .padding(.vertical, cds.spacing.x1)
        }
    }

    private func shadowCard(_ label: String, _ shadow: CDSShadow) -> some View {
        VStack(spacing: cds.spacing.x1) {
            RoundedRectangle(cornerRadius: cds.radius.r300)
                .fill(cds.colors.bgElevation2)
                .frame(width: 96, height: 64)
                .cdsShadow(shadow)
            CDSDesignSystem.Text(label, style: .legal, color: cds.colors.fgMuted)
        }
    }
}
