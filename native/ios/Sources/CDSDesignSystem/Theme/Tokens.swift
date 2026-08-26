import Foundation

/// Design tokens as enumerable, addressable values — the iOS counterpart to Android's
/// `CdsColorToken` / `CdsSpectrumHueToken` / `CdsColorRampToken`.
///
/// These carry no color data themselves. Resolve one against a resolved set
/// (`theme.colors[token]`, `theme.spectrum[hue][step]`) and enumerate the whole scale with
/// `.allCases`. Each token also exposes a `tokenName`: the canonical CDS spelling used for
/// labels and for parsing/serializing themes shared with the web and Android token contracts.
///
/// Adding a token in a future minor is a source-compatible addition, so `switch` statements over
/// these enums outside this module should include a `default` branch.

/// Every semantic color name in ``CDSColors``.
public enum CDSColorToken: String, CaseIterable, Sendable {
    // Foreground
    case fg, fgMuted, fgInverse, fgPrimary, fgPositive, fgNegative, fgWarning

    // Background
    case bg, bgAlternate, bgInverse, bgOverlay, bgPrimary, bgPrimaryWash
    case bgSecondary, bgTertiary, bgSecondaryWash
    case bgNegative, bgNegativeWash, bgPositive, bgPositiveWash, bgWarning, bgWarningWash

    // Line
    case bgLine, bgLineHeavy, bgLineInverse, bgLinePrimary, bgLinePrimarySubtle

    // Elevation
    case bgElevation1, bgElevation2

    // Accent
    case accentSubtleGreen, accentBoldGreen, accentSubtleBlue, accentBoldBlue
    case accentSubtlePurple, accentBoldPurple, accentSubtleYellow, accentBoldYellow
    case accentSubtleRed, accentBoldRed, accentSubtleGray, accentBoldGray

    // Special
    case currentColor, transparent

    /// The canonical CDS spelling (`fgMuted`), for labels and serialized themes.
    public var tokenName: String { rawValue }
}

/// Every hue in a ``CDSSpectrum``.
public enum CDSSpectrumHueToken: String, CaseIterable, Sendable {
    case blue, green, orange, gray, indigo, pink, purple, red, teal, yellow, chartreuse

    /// The canonical CDS spelling of the hue (`blue`).
    public var tokenName: String { rawValue }
}

/// Every tonal step of a ``CDSColorRamp`` (0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100).
public enum CDSColorRampToken: String, CaseIterable, Sendable {
    case step0, step5, step10, step15, step20, step30, step40
    case step50, step60, step70, step80, step90, step100

    /// The canonical CDS spelling of the step alone (`60`), for labels and serialized themes.
    /// Pairs with a ``CDSSpectrumHueToken`` to name a spectrum value: `blue` + `60` is `blue60`.
    public var tokenName: String { String(rawValue.dropFirst("step".count)) }
}
