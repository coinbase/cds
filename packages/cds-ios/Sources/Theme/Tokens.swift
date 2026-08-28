import Foundation

/// Design tokens as enumerable, addressable values — the iOS counterpart to Android's
/// `CdsColorToken` / `CdsSpectrumHueToken` / `CdsColorRampToken`.
///
/// These carry no color data themselves. Resolve one against a resolved set
/// (`theme.colors[token]`, `theme.spectrum[hue][step]`) and enumerate a scale with `.allCases`.
/// Each token also exposes a `tokenName`: the canonical CDS spelling shared with the web and
/// Android token contracts.

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

/// Every rung of the ``CDSRadius`` border-radius scale — the iOS counterpart to Android's
/// `CdsBorderRadiusToken`. Resolve one against a theme with `theme.radius[.r400]`; iterate the
/// whole scale with `.allCases`. `r1000` is the pill rung.
public enum CDSRadiusToken: String, CaseIterable, Sendable {
    case r0, r100, r200, r300, r400, r500, r600, r700, r800, r900, r1000

    /// The canonical CDS spelling of the rung (`400`), matching the RN `borderRadius` key and
    /// Android's `tokenName`. `r1000` is the pill rung.
    public var tokenName: String { String(rawValue.dropFirst("r".count)) }
}

/// Every rung of the ``CDSSpacing`` scale — the iOS counterpart to Android's `CdsSpaceToken`.
/// Resolve one against a theme with `theme.spacing[.x2]`; iterate with `.allCases`.
public enum CDSSpacingToken: String, CaseIterable, Sendable {
    case x0, x0_25, x0_5, x0_75, x1, x1_5, x2, x3, x4, x5, x6, x7, x8, x9, x10

    /// The canonical CDS key (`1.5`), matching the RN `space` key and Android's `tokenName`.
    /// A theme serialized through this has the shape `{"space": {"1.5": 12}}`.
    public var tokenName: String { String(rawValue.dropFirst("x".count)).replacingOccurrences(of: "_", with: ".") }
}

/// Every rung of the ``CDSBorderWidth`` scale — the iOS counterpart to Android's
/// `CdsBorderWidthToken`. Resolve one against a theme with `theme.borderWidth[.w100]`.
public enum CDSBorderWidthToken: String, CaseIterable, Sendable {
    case w0, w100, w200, w300, w400, w500

    /// The canonical CDS key (`100`), matching the RN `borderWidth` key and Android's `tokenName`.
    public var tokenName: String { String(rawValue.dropFirst("w".count)) }
}

/// Every rung of the ``CDSIconSize`` scale — the iOS counterpart to Android's `CdsIconSizeToken`.
/// Resolve one against a theme with `theme.iconSize[.m]`.
public enum CDSIconSizeToken: String, CaseIterable, Sendable {
    case xs, s, m, l

    /// The canonical CDS key (`m`).
    public var tokenName: String { rawValue }
}

/// Every rung of the ``CDSAvatarSize`` scale — the iOS counterpart to Android's
/// `CdsAvatarSizeToken`. Resolve one against a theme with `theme.avatarSize[.xl]`.
public enum CDSAvatarSizeToken: String, CaseIterable, Sendable {
    case s, m, l, xl, xxl, xxxl

    /// The canonical CDS key (`xl`).
    public var tokenName: String { rawValue }
}

/// Every measurement in ``CDSControlSize`` — the iOS counterpart to Android's `CdsControlSizeToken`.
/// Not a ramp: each name measures one specific part of one specific control. Resolve one against a
/// theme with `theme.controlSize[.checkboxSize]`.
public enum CDSControlSizeToken: String, CaseIterable, Sendable {
    case checkboxSize, radioSize, switchWidth, switchHeight, switchThumbSize, tileSize

    /// The canonical CDS key (`checkboxSize`).
    public var tokenName: String { rawValue }
}

/// Every color in ``CDSIllustrationColors``. Resolve one against a theme with
/// `theme.illustrationColors[.primary]`; iterate the palette with `.allCases`.
///
/// (Android does not currently expose an illustration token enum; this is an iOS addition.)
public enum CDSIllustrationColorToken: String, CaseIterable, Sendable {
    case primary, black, white, gray, gray2, gray3, gray4
    case positive, negative, accent1, accent2, accent3, accent4, invert, invert2

    /// The canonical CDS spelling (`gray4`), matching the RN `illustrationColor` key.
    public var tokenName: String { rawValue }
}

/// Every elevation rung in ``CDSShadowScale``. Resolve one against a theme with
/// `theme.shadow[.elevation1]`; iterate with `.allCases`.
///
/// (Android does not currently expose a shadow token enum; this is an iOS addition.)
public enum CDSShadowToken: String, CaseIterable, Sendable {
    case elevation1, elevation2

    /// The canonical CDS spelling (`elevation1`), matching the RN `shadow` key.
    public var tokenName: String { rawValue }
}
