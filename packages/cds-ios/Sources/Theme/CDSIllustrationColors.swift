import SwiftUI

/// Illustration color palette, mirroring `lightIllustrationColor` / `darkIllustrationColor`
/// in `defaultTheme.ts`.
///
/// The tokens consumed by CDS illustrations/pictograms. Defaults are always fully populated;
/// consumers override selectively via ``with(_:)``.
public struct CDSIllustrationColors: Sendable, Equatable {
    public var primary: Color
    public var black: Color
    public var white: Color
    public var gray: Color
    public var gray2: Color
    public var gray3: Color
    public var gray4: Color
    public var positive: Color
    public var negative: Color
    public var accent1: Color
    public var accent2: Color
    public var accent3: Color
    public var accent4: Color
    public var invert: Color
    public var invert2: Color

    // `internal` so adding a token stays a non-breaking change; build custom palettes with
    // ``with(_:)`` from ``light`` / ``dark``.
    init(
        primary: Color,
        black: Color,
        white: Color,
        gray: Color,
        gray2: Color,
        gray3: Color,
        gray4: Color,
        positive: Color,
        negative: Color,
        accent1: Color,
        accent2: Color,
        accent3: Color,
        accent4: Color,
        invert: Color,
        invert2: Color
    ) {
        self.primary = primary
        self.black = black
        self.white = white
        self.gray = gray
        self.gray2 = gray2
        self.gray3 = gray3
        self.gray4 = gray4
        self.positive = positive
        self.negative = negative
        self.accent1 = accent1
        self.accent2 = accent2
        self.accent3 = accent3
        self.accent4 = accent4
        self.invert = invert
        self.invert2 = invert2
    }

    public func with(_ mutate: (inout CDSIllustrationColors) -> Void) -> CDSIllustrationColors {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve an illustration color token: `theme.illustrationColors[.primary]`. Pairs with
    /// ``CDSIllustrationColorToken`` for dynamic, data-driven, and serialized lookups.
    public subscript(_ token: CDSIllustrationColorToken) -> Color {
        switch token {
        case .primary: return primary
        case .black: return black
        case .white: return white
        case .gray: return gray
        case .gray2: return gray2
        case .gray3: return gray3
        case .gray4: return gray4
        case .positive: return positive
        case .negative: return negative
        case .accent1: return accent1
        case .accent2: return accent2
        case .accent3: return accent3
        case .accent4: return accent4
        case .invert: return invert
        case .invert2: return invert2
        }
    }

    public static let light = CDSIllustrationColors(
        primary: Color(cdsHex: 0x0052FF),
        black: Color(cdsHex: 0x0A0B0D),
        white: Color(cdsHex: 0xFFFFFF),
        // The light grays are intentionally non-monotonic (gray2 is near-black), matching
        // `lightIllustrationColor` in `defaultTheme.ts` — leave the values as-is.
        gray: Color(cdsHex: 0xCED2DB),
        gray2: Color(cdsHex: 0x0A0B0F),
        gray3: Color(cdsHex: 0xCED2DC),
        gray4: Color(cdsHex: 0xC8CBD2),
        positive: Color(cdsHex: 0x3CC28A),
        negative: Color(cdsHex: 0xE13947),
        accent1: Color(cdsHex: 0xFFD200),
        accent2: Color(cdsHex: 0x5DE2F8),
        accent3: Color(cdsHex: 0xED702F),
        accent4: Color(cdsHex: 0x73A2FF),
        invert: Color(cdsHex: 0x0A0B0E),
        invert2: Color(cdsHex: 0xFFFFFE)
    )

    public static let dark = CDSIllustrationColors(
        primary: Color(cdsHex: 0x578BFA),
        black: Color(cdsHex: 0x0A0B0D),
        white: Color(cdsHex: 0xFFFFFF),
        gray: Color(cdsHex: 0x464B55),
        gray2: Color(cdsHex: 0x464B55),
        gray3: Color(cdsHex: 0xFFFFFF),
        gray4: Color(cdsHex: 0xFFFFFF),
        positive: Color(cdsHex: 0x44C28D),
        negative: Color(cdsHex: 0xF0616D),
        accent1: Color(cdsHex: 0xECD069),
        accent2: Color(cdsHex: 0x45D9F5),
        accent3: Color(cdsHex: 0xF07836),
        accent4: Color(cdsHex: 0x84AAFD),
        invert: Color(cdsHex: 0xFFFFFF),
        invert2: Color(cdsHex: 0x727886)
    )
}
