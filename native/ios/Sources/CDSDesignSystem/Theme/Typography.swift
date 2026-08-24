import SwiftUI

/// Typography roles, mirroring the `font*` maps in `defaultTheme.ts`.
///
/// CDS ships Inter / Source Code Pro; since those aren't bundled in this POC we map to
/// the system font at the correct size/weight. In production you'd register the Inter
/// font files and use `.custom("Inter", size:)`.
public enum CDSTextStyle: CaseIterable, Sendable {
    case display1, display2, display3
    case title1, title2, title3, title4
    case headline, body
    case label1, label2
    case caption, legal

    public var size: CGFloat {
        switch self {
        case .display1: return 64
        case .display2: return 48
        case .display3: return 40
        case .title1, .title2: return 28
        case .title3, .title4: return 20
        case .headline, .body: return 16
        case .label1, .label2: return 14
        case .caption, .legal: return 13
        }
    }

    public var lineHeight: CGFloat {
        switch self {
        case .display1: return 72
        case .display2: return 56
        case .display3, .title4, .title3: return self == .display3 ? 48 : 28
        case .title1, .title2: return 36
        case .headline, .body: return 24
        case .label1, .label2: return 20
        case .caption, .legal: return 16
        }
    }

    /// Semibold roles (600) in the default theme; everything else is regular (400).
    public var weight: Font.Weight {
        switch self {
        case .title1, .title3, .headline, .label1, .caption: return .semibold
        default: return .regular
        }
    }

    /// `textTransform` is `uppercase` only for `caption` in the default theme.
    public var isUppercased: Bool { self == .caption }

    public var font: Font { .system(size: size, weight: weight) }
}

/// A themed text primitive that applies a CDS typography role.
///
/// Analogous to the RN `Text` component's `font` prop. Color defaults to the
/// current theme's `fg` when not specified.
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
        Text(style.isUppercased ? text.uppercased() : text)
            .font(style.font)
            .tracking(style.isUppercased ? 0.5 : 0)
            .foregroundStyle(color ?? theme.colors.fg)
    }
}
