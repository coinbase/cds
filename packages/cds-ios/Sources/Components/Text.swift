import SwiftUI

/// CDS's text primitive. `internal` — not customer API yet. `style` drives family/size/weight/
/// line-height (read from `theme.typography`); `color` defaults to `fg`. Roles whose typography
/// marks `uppercased` (e.g. `.caption`) are uppercased automatically.
struct CDSText: View {
    @Environment(\.cdsTheme) private var theme

    private let text: String
    private let style: CDSTextStyle
    private let color: Color?
    private let alignment: TextAlignment
    private let lineLimit: Int?
    private let underline: Bool
    private let mono: Bool
    private let isEnabled: Bool

    init(
        _ text: String,
        style: CDSTextStyle = .body,
        color: Color? = nil,
        alignment: TextAlignment = .leading,
        lineLimit: Int? = nil,
        underline: Bool = false,
        mono: Bool = false,
        enabled: Bool = true
    ) {
        self.text = text
        self.style = style
        self.color = color
        self.alignment = alignment
        self.lineLimit = lineLimit
        self.underline = underline
        self.mono = mono
        self.isEnabled = enabled
    }

    var body: some View {
        let attrs = theme.typography[style]
        let displayed = attrs.uppercased ? text.uppercased() : text
        let font: Font = mono
            ? .system(size: attrs.size, weight: attrs.weight, design: .monospaced)
            : attrs.font
        return Text(displayed)
            .font(font)
            .tracking(attrs.uppercased ? 0.5 : 0)
            .underline(underline)
            .lineSpacing(max(0, attrs.lineHeight - attrs.size))
            .foregroundStyle(color ?? theme.colors.fg)
            .multilineTextAlignment(alignment)
            .lineLimit(lineLimit)
            .opacity(isEnabled ? 1 : cdsDisabledAlpha)
    }
}

#if DEBUG
// No provider on purpose: inside an Xcode Preview this renders the default theme via the preview
// fallback instead of trapping, so a component preview "just works".
#Preview("CDSText — preview fallback (no provider)") {
    VStack(alignment: .leading, spacing: 8) {
        CDSText("Display 3", style: .display3)
        CDSText("Headline", style: .headline)
        CDSText("Body", style: .body)
        CDSText("Underlined", style: .body, underline: true)
        CDSText("Monospace 123", style: .body, mono: true)
        CDSText("Disabled", style: .body, enabled: false)
        CDSText("Caption", style: .caption)
    }
    .padding()
}

#Preview("CDSText — with CDSThemeProvider") {
    CDSThemeProvider {
        VStack(alignment: .leading, spacing: 8) {
            CDSText("Title 2", style: .title2)
            CDSText("Body", style: .body)
        }
        .padding()
    }
}
#endif
