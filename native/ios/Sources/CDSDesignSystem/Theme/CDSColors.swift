import SwiftUI

/// Semantic color tokens (tier 2 of the CDS two-layer color system).
///
/// Semantic tokens are what components actually consume (`bg`, `fgPrimary`, `bgLineHeavy`,
/// …). Each one resolves to a spectrum value per color scheme, mirroring the derivation in
/// `defaultTheme.ts` (`lightColor` / `darkColor`).
///
/// Consumers can customize a theme by either:
/// - copying a built-in set and tweaking a few tokens: `CDSColors.light.with { $0.bgPrimary = … }`,
/// - deriving a full set from their own palette: `CDSColors.lightDeriving(from:)`, or
/// - constructing one from scratch via ``init``.
public struct CDSColors: Sendable {
    // Foreground
    public var fg: Color
    public var fgMuted: Color
    public var fgInverse: Color
    public var fgPrimary: Color
    public var fgPositive: Color
    public var fgNegative: Color
    public var fgWarning: Color

    // Background
    public var bg: Color
    public var bgAlternate: Color
    public var bgInverse: Color
    public var bgOverlay: Color
    public var bgPrimary: Color
    public var bgPrimaryWash: Color
    public var bgSecondary: Color
    public var bgTertiary: Color
    public var bgSecondaryWash: Color
    public var bgNegative: Color
    public var bgNegativeWash: Color
    public var bgPositive: Color
    public var bgPositiveWash: Color
    public var bgWarning: Color
    public var bgWarningWash: Color

    // Line
    public var bgLine: Color
    public var bgLineHeavy: Color
    public var bgLinePrimary: Color

    // Elevation
    public var bgElevation1: Color
    public var bgElevation2: Color

    public init(
        fg: Color,
        fgMuted: Color,
        fgInverse: Color,
        fgPrimary: Color,
        fgPositive: Color,
        fgNegative: Color,
        fgWarning: Color,
        bg: Color,
        bgAlternate: Color,
        bgInverse: Color,
        bgOverlay: Color,
        bgPrimary: Color,
        bgPrimaryWash: Color,
        bgSecondary: Color,
        bgTertiary: Color,
        bgSecondaryWash: Color,
        bgNegative: Color,
        bgNegativeWash: Color,
        bgPositive: Color,
        bgPositiveWash: Color,
        bgWarning: Color,
        bgWarningWash: Color,
        bgLine: Color,
        bgLineHeavy: Color,
        bgLinePrimary: Color,
        bgElevation1: Color,
        bgElevation2: Color
    ) {
        self.fg = fg
        self.fgMuted = fgMuted
        self.fgInverse = fgInverse
        self.fgPrimary = fgPrimary
        self.fgPositive = fgPositive
        self.fgNegative = fgNegative
        self.fgWarning = fgWarning
        self.bg = bg
        self.bgAlternate = bgAlternate
        self.bgInverse = bgInverse
        self.bgOverlay = bgOverlay
        self.bgPrimary = bgPrimary
        self.bgPrimaryWash = bgPrimaryWash
        self.bgSecondary = bgSecondary
        self.bgTertiary = bgTertiary
        self.bgSecondaryWash = bgSecondaryWash
        self.bgNegative = bgNegative
        self.bgNegativeWash = bgNegativeWash
        self.bgPositive = bgPositive
        self.bgPositiveWash = bgPositiveWash
        self.bgWarning = bgWarning
        self.bgWarningWash = bgWarningWash
        self.bgLine = bgLine
        self.bgLineHeavy = bgLineHeavy
        self.bgLinePrimary = bgLinePrimary
        self.bgElevation1 = bgElevation1
        self.bgElevation2 = bgElevation2
    }
}

private func spectrumColor(_ table: [String: String], _ key: String, _ opacity: Double = 1) -> Color {
    Color(cdsSpectrum: table[key] ?? "0,0,0", opacity: opacity)
}

public extension CDSColors {
    /// Return a copy with a handful of tokens overridden.
    ///
    /// ```swift
    /// let brand = CDSColors.light.with { $0.bgPrimary = Color(cdsRGB: 124, 58, 237) }
    /// ```
    func with(_ mutate: (inout CDSColors) -> Void) -> CDSColors {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Derive the **light** semantic set from a spectrum palette, applying the same mapping
    /// as `defaultTheme.ts` `lightColor`. Pass your own `"hue"` → `"r,g,b"` table to rebrand.
    static func lightDeriving(from s: [String: String]) -> CDSColors {
        CDSColors(
            fg: spectrumColor(s, "gray100"),
            fgMuted: spectrumColor(s, "gray60"),
            fgInverse: spectrumColor(s, "gray0"),
            fgPrimary: spectrumColor(s, "blue60"),
            fgPositive: spectrumColor(s, "green60"),
            fgNegative: spectrumColor(s, "red60"),
            fgWarning: spectrumColor(s, "orange60"),
            bg: spectrumColor(s, "gray0"),
            bgAlternate: spectrumColor(s, "gray10"),
            bgInverse: spectrumColor(s, "gray100"),
            bgOverlay: spectrumColor(s, "gray80", 0.33),
            bgPrimary: spectrumColor(s, "blue60"),
            bgPrimaryWash: spectrumColor(s, "blue0"),
            bgSecondary: spectrumColor(s, "gray10"),
            bgTertiary: spectrumColor(s, "gray20"),
            bgSecondaryWash: spectrumColor(s, "gray5"),
            bgNegative: spectrumColor(s, "red60"),
            bgNegativeWash: spectrumColor(s, "red0"),
            bgPositive: spectrumColor(s, "green60"),
            bgPositiveWash: spectrumColor(s, "green0"),
            bgWarning: spectrumColor(s, "orange60"),
            bgWarningWash: spectrumColor(s, "orange0"),
            bgLine: spectrumColor(s, "gray60", 0.2),
            bgLineHeavy: spectrumColor(s, "gray60", 0.66),
            bgLinePrimary: spectrumColor(s, "blue60"),
            bgElevation1: spectrumColor(s, "gray0"),
            bgElevation2: spectrumColor(s, "gray0")
        )
    }

    /// Derive the **dark** semantic set from a spectrum palette, applying the same mapping
    /// as `defaultTheme.ts` `darkColor`.
    static func darkDeriving(from s: [String: String]) -> CDSColors {
        CDSColors(
            fg: spectrumColor(s, "gray100"),
            fgMuted: spectrumColor(s, "gray60"),
            fgInverse: spectrumColor(s, "gray0"),
            fgPrimary: spectrumColor(s, "blue70"),
            fgPositive: spectrumColor(s, "green60"),
            fgNegative: spectrumColor(s, "red60"),
            fgWarning: spectrumColor(s, "orange70"),
            bg: spectrumColor(s, "gray0"),
            bgAlternate: spectrumColor(s, "gray5"),
            bgInverse: spectrumColor(s, "gray100"),
            bgOverlay: spectrumColor(s, "gray0", 0.33),
            bgPrimary: spectrumColor(s, "blue70"),
            bgPrimaryWash: spectrumColor(s, "blue0"),
            bgSecondary: spectrumColor(s, "gray15"),
            bgTertiary: spectrumColor(s, "gray20"),
            bgSecondaryWash: spectrumColor(s, "gray5"),
            bgNegative: spectrumColor(s, "red60"),
            bgNegativeWash: spectrumColor(s, "red0"),
            bgPositive: spectrumColor(s, "green60"),
            bgPositiveWash: spectrumColor(s, "green0"),
            bgWarning: spectrumColor(s, "orange60"),
            bgWarningWash: spectrumColor(s, "orange0"),
            bgLine: spectrumColor(s, "gray60", 0.2),
            bgLineHeavy: spectrumColor(s, "gray60", 0.66),
            bgLinePrimary: spectrumColor(s, "blue70"),
            bgElevation1: spectrumColor(s, "gray5"),
            bgElevation2: spectrumColor(s, "gray10")
        )
    }

    static let light: CDSColors = lightDeriving(from: CDSSpectrumData.light)
    static let dark: CDSColors = darkDeriving(from: CDSSpectrumData.dark)
}
