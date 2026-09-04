import SwiftUI

/// Semantic color tokens (tier 2 of the CDS two-layer color system).
///
/// Semantic tokens are what components actually consume (`bg`, `fgPrimary`, `bgLineHeavy`,
/// `accentBoldBlue`, …). Each one resolves to a spectrum value per color scheme, mirroring
/// the derivation in `defaultTheme.ts` (`lightColor` / `darkColor`).
///
/// The memberwise initializer is `internal` so adding a token stays source-compatible. Build sets
/// through the evolution-safe surface:
/// - copy and tweak: `CDSColors.light.with { $0.bgPrimary = … }`,
/// - derive from a spectrum: `CDSColors.lightDeriving(from:)`, or
/// - address dynamically via ``subscript(_:)`` and ``CDSColorToken``.
public struct CDSColors: Sendable, Equatable {
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
    public var bgLineInverse: Color
    public var bgLinePrimary: Color
    public var bgLinePrimarySubtle: Color

    // Elevation
    public var bgElevation1: Color
    public var bgElevation2: Color

    // Accent
    public var accentSubtleGreen: Color
    public var accentBoldGreen: Color
    public var accentSubtleBlue: Color
    public var accentBoldBlue: Color
    public var accentSubtlePurple: Color
    public var accentBoldPurple: Color
    public var accentSubtleYellow: Color
    public var accentBoldYellow: Color
    public var accentSubtleRed: Color
    public var accentBoldRed: Color
    public var accentSubtleGray: Color
    public var accentBoldGray: Color

    // Special
    /// The current inherited foreground color. `currentColor` in RN/web has no direct
    /// SwiftUI analog; it maps to the environment's primary content color.
    public var currentColor: Color
    public var transparent: Color

    init(
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
        bgLineInverse: Color,
        bgLinePrimary: Color,
        bgLinePrimarySubtle: Color,
        bgElevation1: Color,
        bgElevation2: Color,
        accentSubtleGreen: Color,
        accentBoldGreen: Color,
        accentSubtleBlue: Color,
        accentBoldBlue: Color,
        accentSubtlePurple: Color,
        accentBoldPurple: Color,
        accentSubtleYellow: Color,
        accentBoldYellow: Color,
        accentSubtleRed: Color,
        accentBoldRed: Color,
        accentSubtleGray: Color,
        accentBoldGray: Color,
        currentColor: Color = .primary,
        transparent: Color = .clear
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
        self.bgLineInverse = bgLineInverse
        self.bgLinePrimary = bgLinePrimary
        self.bgLinePrimarySubtle = bgLinePrimarySubtle
        self.bgElevation1 = bgElevation1
        self.bgElevation2 = bgElevation2
        self.accentSubtleGreen = accentSubtleGreen
        self.accentBoldGreen = accentBoldGreen
        self.accentSubtleBlue = accentSubtleBlue
        self.accentBoldBlue = accentBoldBlue
        self.accentSubtlePurple = accentSubtlePurple
        self.accentBoldPurple = accentBoldPurple
        self.accentSubtleYellow = accentSubtleYellow
        self.accentBoldYellow = accentBoldYellow
        self.accentSubtleRed = accentSubtleRed
        self.accentBoldRed = accentBoldRed
        self.accentSubtleGray = accentSubtleGray
        self.accentBoldGray = accentBoldGray
        self.currentColor = currentColor
        self.transparent = transparent
    }

    /// Resolve a semantic color token: `theme.colors[.fgMuted]`. Pairs with ``CDSColorToken``
    /// for dynamic, data-driven, and serialized theme lookups.
    public subscript(_ token: CDSColorToken) -> Color {
        switch token {
        case .fg: return fg
        case .fgMuted: return fgMuted
        case .fgInverse: return fgInverse
        case .fgPrimary: return fgPrimary
        case .fgPositive: return fgPositive
        case .fgNegative: return fgNegative
        case .fgWarning: return fgWarning
        case .bg: return bg
        case .bgAlternate: return bgAlternate
        case .bgInverse: return bgInverse
        case .bgOverlay: return bgOverlay
        case .bgPrimary: return bgPrimary
        case .bgPrimaryWash: return bgPrimaryWash
        case .bgSecondary: return bgSecondary
        case .bgTertiary: return bgTertiary
        case .bgSecondaryWash: return bgSecondaryWash
        case .bgNegative: return bgNegative
        case .bgNegativeWash: return bgNegativeWash
        case .bgPositive: return bgPositive
        case .bgPositiveWash: return bgPositiveWash
        case .bgWarning: return bgWarning
        case .bgWarningWash: return bgWarningWash
        case .bgLine: return bgLine
        case .bgLineHeavy: return bgLineHeavy
        case .bgLineInverse: return bgLineInverse
        case .bgLinePrimary: return bgLinePrimary
        case .bgLinePrimarySubtle: return bgLinePrimarySubtle
        case .bgElevation1: return bgElevation1
        case .bgElevation2: return bgElevation2
        case .accentSubtleGreen: return accentSubtleGreen
        case .accentBoldGreen: return accentBoldGreen
        case .accentSubtleBlue: return accentSubtleBlue
        case .accentBoldBlue: return accentBoldBlue
        case .accentSubtlePurple: return accentSubtlePurple
        case .accentBoldPurple: return accentBoldPurple
        case .accentSubtleYellow: return accentSubtleYellow
        case .accentBoldYellow: return accentBoldYellow
        case .accentSubtleRed: return accentSubtleRed
        case .accentBoldRed: return accentBoldRed
        case .accentSubtleGray: return accentSubtleGray
        case .accentBoldGray: return accentBoldGray
        case .currentColor: return currentColor
        case .transparent: return transparent
        }
    }
}

public extension CDSColors {
    /// Return a copy with a handful of tokens overridden.
    ///
    /// ```swift
    /// let brand = CDSColors.light.with { $0.bgPrimary = Color(cdsHex: 0x7C3AED) }
    /// ```
    func with(_ mutate: (inout CDSColors) -> Void) -> CDSColors {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Derive the **light** semantic set from a ``CDSSpectrum`` palette, applying the same
    /// mapping as `defaultTheme.ts` `lightColor`. Pass a custom spectrum to rebrand.
    static func lightDeriving(from s: CDSSpectrum) -> CDSColors {
        CDSColors(
            fg: s.gray.step100,
            fgMuted: s.gray.step60,
            fgInverse: s.gray.step0,
            fgPrimary: s.blue.step60,
            fgPositive: s.green.step60,
            fgNegative: s.red.step60,
            fgWarning: s.orange.step60,
            bg: s.gray.step0,
            bgAlternate: s.gray.step10,
            bgInverse: s.gray.step100,
            bgOverlay: s.gray.step80.opacity(0.33),
            bgPrimary: s.blue.step60,
            bgPrimaryWash: s.blue.step0,
            bgSecondary: s.gray.step10,
            bgTertiary: s.gray.step20,
            bgSecondaryWash: s.gray.step5,
            bgNegative: s.red.step60,
            bgNegativeWash: s.red.step0,
            bgPositive: s.green.step60,
            bgPositiveWash: s.green.step0,
            bgWarning: s.orange.step60,
            bgWarningWash: s.orange.step0,
            bgLine: s.gray.step60.opacity(0.2),
            bgLineHeavy: s.gray.step60.opacity(0.66),
            bgLineInverse: s.gray.step0,
            bgLinePrimary: s.blue.step60,
            bgLinePrimarySubtle: s.blue.step20,
            bgElevation1: s.gray.step0,
            bgElevation2: s.gray.step0,
            accentSubtleGreen: s.green.step0,
            accentBoldGreen: s.green.step60,
            accentSubtleBlue: s.blue.step0,
            accentBoldBlue: s.blue.step60,
            accentSubtlePurple: s.purple.step0,
            accentBoldPurple: s.purple.step80,
            accentSubtleYellow: s.yellow.step0,
            accentBoldYellow: s.yellow.step30,
            accentSubtleRed: s.red.step0,
            accentBoldRed: s.red.step60,
            accentSubtleGray: s.gray.step10,
            accentBoldGray: s.gray.step80
        )
    }

    /// Derive the **dark** semantic set from a ``CDSSpectrum`` palette, applying the same
    /// mapping as `defaultTheme.ts` `darkColor`.
    static func darkDeriving(from s: CDSSpectrum) -> CDSColors {
        CDSColors(
            fg: s.gray.step100,
            fgMuted: s.gray.step60,
            fgInverse: s.gray.step0,
            fgPrimary: s.blue.step70,
            fgPositive: s.green.step60,
            fgNegative: s.red.step60,
            fgWarning: s.orange.step70,
            bg: s.gray.step0,
            bgAlternate: s.gray.step5,
            bgInverse: s.gray.step100,
            bgOverlay: s.gray.step0.opacity(0.33),
            bgPrimary: s.blue.step70,
            bgPrimaryWash: s.blue.step0,
            bgSecondary: s.gray.step15,
            bgTertiary: s.gray.step20,
            bgSecondaryWash: s.gray.step5,
            bgNegative: s.red.step60,
            bgNegativeWash: s.red.step0,
            bgPositive: s.green.step60,
            bgPositiveWash: s.green.step0,
            bgWarning: s.orange.step60,
            bgWarningWash: s.orange.step0,
            bgLine: s.gray.step60.opacity(0.2),
            bgLineHeavy: s.gray.step60.opacity(0.66),
            bgLineInverse: s.gray.step0,
            bgLinePrimary: s.blue.step70,
            bgLinePrimarySubtle: s.blue.step20,
            bgElevation1: s.gray.step5,
            bgElevation2: s.gray.step10,
            accentSubtleGreen: s.green.step0,
            accentBoldGreen: s.green.step60,
            accentSubtleBlue: s.blue.step0,
            accentBoldBlue: s.blue.step60,
            accentSubtlePurple: s.purple.step0,
            accentBoldPurple: s.purple.step80,
            accentSubtleYellow: s.yellow.step0,
            accentBoldYellow: s.yellow.step30,
            accentSubtleRed: s.red.step0,
            accentBoldRed: s.red.step60,
            accentSubtleGray: s.gray.step10,
            accentBoldGray: s.gray.step80
        )
    }

    static let light: CDSColors = lightDeriving(from: .light)
    static let dark: CDSColors = darkDeriving(from: .dark)
}
