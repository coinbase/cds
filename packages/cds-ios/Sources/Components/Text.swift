import SwiftUI

private let cdsUppercaseTracking: CGFloat = 0.5

/// CDS typography for a SwiftUI `Text` (or any text-bearing view). Owns font, default `fg` color,
/// line-height spacing, and uppercase tracking. Does **not** replace `Text` — the caller still
/// owns the string.
///
/// ```swift
/// Text("Balance")
///     .cdsText(.title3)
/// Text("Muted")
///     .cdsText(.body, color: theme.colors.fgMuted)
/// ```
///
/// Caption roles that mark `uppercased` on the theme apply `.textCase(.uppercase)` — there is no
/// CDS `Text` type that mutates the string.
struct CDSTextModifier: ViewModifier {
    @Environment(\.cdsTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    var style: CDSTextStyle = .body
    var color: Color?
    var underline: Bool = false
    var mono: Bool = false

    func body(content: Content) -> some View {
        let attrs = theme.typography[style]
        let font: Font = mono
            ? .system(size: attrs.size, weight: attrs.weight, design: .monospaced)
            : attrs.font
        content
            .font(font)
            .tracking(attrs.uppercased ? cdsUppercaseTracking : 0)
            .underline(underline)
            .lineSpacing(max(0, attrs.lineHeight - attrs.size))
            .foregroundStyle(color ?? theme.colors.fg)
            .textCase(attrs.uppercased ? .uppercase : nil)
            .opacity(isEnabled ? 1 : cdsDisabledAlpha)
    }
}

extension View {
    func cdsText(
        _ style: CDSTextStyle = .body,
        color: Color? = nil,
        underline: Bool = false,
        mono: Bool = false
    ) -> some View {
        modifier(CDSTextModifier(style: style, color: color, underline: underline, mono: mono))
    }
}

#if DEBUG
#Preview("cdsText — preview fallback (no provider)") {
    VStack(alignment: .leading, spacing: 8) {
        Text("Display 3").cdsText(.display3)
        Text("Headline").cdsText(.headline)
        Text("Body").cdsText(.body)
        Text("Underlined").cdsText(.body, underline: true)
        Text("Monospace 123").cdsText(.body, mono: true)
        Text("Disabled").cdsText(.body).disabled(true)
        Text("Caption").cdsText(.caption)
    }
    .padding()
}

#Preview("cdsText — with CDSThemeProvider") {
    CDSThemeProvider {
        VStack(alignment: .leading, spacing: 8) {
            Text("Title 2").cdsText(.title2)
            Text("Body").cdsText(.body)
        }
        .padding()
    }
}
#endif
