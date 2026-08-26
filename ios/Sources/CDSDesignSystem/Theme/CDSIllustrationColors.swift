import SwiftUI

/// Illustration color palette, mirroring `lightIllustrationColor` / `darkIllustrationColor`
/// in `defaultTheme.ts`.
///
/// These are the tokens consumed by CDS illustrations/pictograms. In RN every token is
/// optional and omitted tokens fall back to the default theme; here the defaults are always
/// fully populated and consumers override selectively via ``with(_:)``.
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

    // `internal`: build a custom palette with ``with(_:)`` from ``light`` / ``dark`` so adding a
    // token stays a non-breaking change (mirrors ``CDSColors``).
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

    public static let light = CDSIllustrationColors(
        primary: Color(cdsRGB: 0, 82, 255),
        black: Color(cdsRGB: 10, 11, 13),
        white: Color(cdsRGB: 255, 255, 255),
        gray: Color(cdsRGB: 206, 210, 219),
        gray2: Color(cdsRGB: 10, 11, 15),
        gray3: Color(cdsRGB: 206, 210, 220),
        gray4: Color(cdsRGB: 200, 203, 210),
        positive: Color(cdsRGB: 60, 194, 138),
        negative: Color(cdsRGB: 225, 57, 71),
        accent1: Color(cdsRGB: 255, 210, 0),
        accent2: Color(cdsRGB: 93, 226, 248),
        accent3: Color(cdsRGB: 237, 112, 47),
        accent4: Color(cdsRGB: 115, 162, 255),
        invert: Color(cdsRGB: 10, 11, 14),
        invert2: Color(cdsRGB: 255, 255, 254)
    )

    public static let dark = CDSIllustrationColors(
        primary: Color(cdsRGB: 87, 139, 250),
        black: Color(cdsRGB: 10, 11, 13),
        white: Color(cdsRGB: 255, 255, 255),
        gray: Color(cdsRGB: 70, 75, 85),
        gray2: Color(cdsRGB: 70, 75, 85),
        gray3: Color(cdsRGB: 255, 255, 255),
        gray4: Color(cdsRGB: 255, 255, 255),
        positive: Color(cdsRGB: 68, 194, 141),
        negative: Color(cdsRGB: 240, 97, 109),
        accent1: Color(cdsRGB: 236, 208, 105),
        accent2: Color(cdsRGB: 69, 217, 245),
        accent3: Color(cdsRGB: 240, 120, 54),
        accent4: Color(cdsRGB: 132, 170, 253),
        invert: Color(cdsRGB: 255, 255, 255),
        invert2: Color(cdsRGB: 114, 120, 134)
    )
}
