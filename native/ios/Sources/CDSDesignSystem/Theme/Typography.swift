import SwiftUI

/// The set of typography roles, mirroring the `font*` maps in `defaultTheme.ts`.
public enum CDSTextStyle: String, CaseIterable, Sendable {
    case display1, display2, display3
    case title1, title2, title3, title4
    case headline, body
    case label1, label2
    case caption, legal
}

/// The resolved attributes for a single typography role — the per-role slice of
/// `fontSize` / `lineHeight` / `fontWeight` / `textTransform` (+ optional `fontFamily`).
public struct CDSTextAttributes: Sendable {
    public var size: CGFloat
    public var lineHeight: CGFloat
    public var weight: Font.Weight
    public var uppercased: Bool
    /// Registered font family name (e.g. `"Inter"`). When `nil`, the system font is used.
    public var fontName: String?

    public init(
        size: CGFloat,
        lineHeight: CGFloat,
        weight: Font.Weight,
        uppercased: Bool = false,
        fontName: String? = nil
    ) {
        self.size = size
        self.lineHeight = lineHeight
        self.weight = weight
        self.uppercased = uppercased
        self.fontName = fontName
    }

    public var font: Font {
        if let fontName {
            return .custom(fontName, size: size)
        }
        return .system(size: size, weight: weight)
    }
}

/// Typography scale carried on the theme, so a consumer can override sizes / weights / fonts
/// per ``CDSThemeProvider`` (RN parity: `fontSize`, `lineHeight`, etc. are themeable).
public struct CDSTypography: Sendable {
    private var roles: [CDSTextStyle: CDSTextAttributes]

    public init(roles: [CDSTextStyle: CDSTextAttributes]) {
        self.roles = roles
    }

    public subscript(_ style: CDSTextStyle) -> CDSTextAttributes {
        get { roles[style] ?? CDSTypography.default.roles[style] ?? Self.fallback }
        set { roles[style] = newValue }
    }

    /// Return a copy with a handful of roles overridden.
    public func with(_ mutate: (inout CDSTypography) -> Void) -> CDSTypography {
        var copy = self
        mutate(&copy)
        return copy
    }

    private static let fallback = CDSTextAttributes(size: 16, lineHeight: 24, weight: .regular)

    /// The built-in CDS defaults, matching `defaultTheme.ts`.
    ///
    /// Fonts default to the system font. In production, register the Inter / Source Code Pro
    /// font files and set `fontName` per role (or override the whole scale in a theme).
    public static let `default` = CDSTypography(roles: [
        .display1: CDSTextAttributes(size: 64, lineHeight: 72, weight: .regular),
        .display2: CDSTextAttributes(size: 48, lineHeight: 56, weight: .regular),
        .display3: CDSTextAttributes(size: 40, lineHeight: 48, weight: .regular),
        .title1: CDSTextAttributes(size: 28, lineHeight: 36, weight: .semibold),
        .title2: CDSTextAttributes(size: 28, lineHeight: 36, weight: .regular),
        .title3: CDSTextAttributes(size: 20, lineHeight: 28, weight: .semibold),
        .title4: CDSTextAttributes(size: 20, lineHeight: 28, weight: .regular),
        .headline: CDSTextAttributes(size: 16, lineHeight: 24, weight: .semibold),
        .body: CDSTextAttributes(size: 16, lineHeight: 24, weight: .regular),
        .label1: CDSTextAttributes(size: 14, lineHeight: 20, weight: .semibold),
        .label2: CDSTextAttributes(size: 14, lineHeight: 20, weight: .regular),
        .caption: CDSTextAttributes(size: 13, lineHeight: 16, weight: .semibold, uppercased: true),
        .legal: CDSTextAttributes(size: 13, lineHeight: 16, weight: .regular),
    ])
}

/// A themed text primitive that applies a CDS typography role from the active theme.
///
/// Analogous to the RN `Text` component's `font` prop. Color defaults to the current theme's
/// `fg` when not specified; the role's attributes are read from `theme.typography`.
public struct CDSText: View {
    @Environment(\.cdsTheme) private var theme

    private let text: String
    private let style: CDSTextStyle
    private let color: Color?

    public init(_ text: String, style: CDSTextStyle = .body, color: Color? = nil) {
        self.text = text
        self.style = style
        self.color = color
    }

    public var body: some View {
        let attrs = theme.typography[style]
        return Text(attrs.uppercased ? text.uppercased() : text)
            .font(attrs.font)
            .tracking(attrs.uppercased ? 0.5 : 0)
            .lineSpacing(max(0, attrs.lineHeight - attrs.size))
            .foregroundStyle(color ?? theme.colors.fg)
    }
}
