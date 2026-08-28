@testable import CDSDesignSystem
import SwiftUI

extension View {
    /// The gallery's bordered-surface look: clip to a rounded rect and stroke the theme's hairline.
    func cdsBorderedCard(radius: CGFloat) -> some View {
        modifier(BorderedCard(radius: radius))
    }
}

private struct BorderedCard: ViewModifier {
    @Environment(\.cdsTheme) private var cds
    let radius: CGFloat

    func body(content: Content) -> some View {
        content
            .clipShape(RoundedRectangle(cornerRadius: radius))
            .overlay(
                RoundedRectangle(cornerRadius: radius)
                    .strokeBorder(cds.colors.bgLine, lineWidth: cds.borderWidth.w100)
            )
    }
}

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
                CDSDesignSystem.Text(title, style: .title4)
                if let subtitle {
                    CDSDesignSystem.Text(subtitle, style: .label2, color: cds.colors.fgMuted)
                }
            }
            content
        }
        .padding(cds.spacing.x2)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(cds.colors.bgElevation1)
        .cdsBorderedCard(radius: cds.radius.r300)
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
                .cdsBorderedCard(radius: cds.radius.r200)
            CDSDesignSystem.Text(label, style: .legal, color: cds.colors.fgMuted)
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
            CDSDesignSystem.Text(label, style: .label2)
                .frame(width: 96, alignment: .leading)
            sample
            Spacer(minLength: 0)
        }
    }
}
