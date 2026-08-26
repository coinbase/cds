import CDSDesignSystem
import SwiftUI

/// A titled card that groups a gallery section, styled from the active theme.
struct SectionCard<Content: View>: View {
    @Environment(\.cdsTheme) private var cds
    let title: String
    let subtitle: String?
    @ViewBuilder let content: Content

    init(_ title: String, subtitle: String? = nil, @ViewBuilder content: () -> Content) {
        self.title = title
        self.subtitle = subtitle
        self.content = content()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1_5) {
            VStack(alignment: .leading, spacing: cds.spacing.x0_5) {
                CDSText(title, style: .title4)
                if let subtitle {
                    CDSText(subtitle, style: .label2, color: cds.colors.fgMuted)
                }
            }
            content
        }
        .padding(cds.spacing.x2)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(cds.colors.bgElevation1)
        .clipShape(RoundedRectangle(cornerRadius: cds.radius.r300))
        .overlay(
            RoundedRectangle(cornerRadius: cds.radius.r300)
                .strokeBorder(cds.colors.bgLine, lineWidth: cds.borderWidth.w100)
        )
    }
}

/// A single color swatch with its token label, bordered so light swatches stay visible.
struct Swatch: View {
    @Environment(\.cdsTheme) private var cds
    let color: Color
    let label: String

    var body: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x0_5) {
            RoundedRectangle(cornerRadius: cds.radius.r200)
                .fill(color)
                .frame(height: 44)
                .overlay(
                    RoundedRectangle(cornerRadius: cds.radius.r200)
                        .strokeBorder(cds.colors.bgLine, lineWidth: cds.borderWidth.w100)
                )
            CDSText(label, style: .legal, color: cds.colors.fgMuted)
                .lineLimit(1)
        }
    }
}

/// A labeled row: a caption on the left and an arbitrary sample on the right.
struct SampleRow<Sample: View>: View {
    @Environment(\.cdsTheme) private var cds
    let label: String
    @ViewBuilder let sample: Sample

    var body: some View {
        HStack(alignment: .center, spacing: cds.spacing.x2) {
            CDSText(label, style: .label2)
                .frame(width: 96, alignment: .leading)
            sample
            Spacer(minLength: 0)
        }
    }
}
