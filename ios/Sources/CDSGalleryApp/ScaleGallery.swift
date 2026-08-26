import CDSDesignSystem
import SwiftUI

/// Spacing scale, drawn as bars whose width equals the token value.
struct SpacingGallery: View {
    @Environment(\.cdsTheme) private var cds

    private var items: [(String, CGFloat)] {
        [
            ("x0", cds.spacing.x0), ("x0_25", cds.spacing.x0_25), ("x0_5", cds.spacing.x0_5),
            ("x0_75", cds.spacing.x0_75), ("x1", cds.spacing.x1), ("x1_5", cds.spacing.x1_5),
            ("x2", cds.spacing.x2), ("x3", cds.spacing.x3), ("x4", cds.spacing.x4),
            ("x5", cds.spacing.x5), ("x6", cds.spacing.x6), ("x7", cds.spacing.x7),
            ("x8", cds.spacing.x8), ("x9", cds.spacing.x9), ("x10", cds.spacing.x10),
        ]
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

/// Border radius scale, drawn as rounded squares (the pill value is clamped for display).
struct RadiusGallery: View {
    @Environment(\.cdsTheme) private var cds

    private var items: [(String, CGFloat)] {
        [
            ("r0", cds.radius.r0), ("r100", cds.radius.r100), ("r200", cds.radius.r200),
            ("r300", cds.radius.r300), ("r400", cds.radius.r400), ("r500", cds.radius.r500),
            ("r600", cds.radius.r600), ("r700", cds.radius.r700), ("r800", cds.radius.r800),
            ("r900", cds.radius.r900), ("pill", cds.radius.pill),
        ]
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
        [
            ("w0", cds.borderWidth.w0), ("w100", cds.borderWidth.w100), ("w200", cds.borderWidth.w200),
            ("w300", cds.borderWidth.w300), ("w400", cds.borderWidth.w400), ("w500", cds.borderWidth.w500),
        ]
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
                sizeRow("Icon", [("xs", cds.iconSize.xs), ("s", cds.iconSize.s), ("m", cds.iconSize.m), ("l", cds.iconSize.l)])
                sizeRow("Avatar", [("s", cds.avatarSize.s), ("m", cds.avatarSize.m), ("l", cds.avatarSize.l), ("xl", cds.avatarSize.xl), ("xxl", cds.avatarSize.xxl), ("xxxl", cds.avatarSize.xxxl)])
                sizeRow("Control", [("checkbox", cds.controlSize.checkboxSize), ("radio", cds.controlSize.radioSize), ("thumb", cds.controlSize.switchThumbSize)])
            }
        }
    }

    private func sizeRow(_ title: String, _ items: [(String, CGFloat)]) -> some View {
        VStack(alignment: .leading, spacing: cds.spacing.x0_5) {
            CDSText(title, style: .label1)
            HStack(alignment: .bottom, spacing: cds.spacing.x1_5) {
                ForEach(items, id: \.0) { name, value in
                    VStack(spacing: cds.spacing.x0_25) {
                        RoundedRectangle(cornerRadius: 4)
                            .fill(cds.colors.accentBoldBlue)
                            .frame(width: value, height: value)
                        CDSText("\(name)\n\(Int(value))", style: .legal, color: cds.colors.fgMuted)
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
                shadowCard("elevation1", cds.shadow.elevation1)
                shadowCard("elevation2", cds.shadow.elevation2)
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
            CDSText(label, style: .legal, color: cds.colors.fgMuted)
        }
    }
}
