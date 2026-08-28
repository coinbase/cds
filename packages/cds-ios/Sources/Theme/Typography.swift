import SwiftUI

/// The set of typography roles, mirroring the `font*` maps in `defaultTheme.ts`. Doubles as the
/// font token (the counterpart to Android's `CdsFontToken`): enumerate every role with
/// `CDSTextStyle.allCases` and resolve one against a theme with `theme.typography[role]`.
public enum CDSTextStyle: String, CaseIterable, Sendable {
    case display1, display2, display3
    case title1, title2, title3, title4
    case headline, body
    case label1, label2
    case caption, legal

    /// The canonical CDS spelling (`title1`), for labels and serialized themes.
    public var tokenName: String { rawValue }
}

/// The resolved attributes for a single typography role — the per-role slice of
/// `fontSize` / `lineHeight` / `fontWeight` / `textTransform` (+ optional `fontFamily`).
public struct CDSTextAttributes: Sendable, Equatable {
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
public struct CDSTypography: Sendable, Equatable {
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
