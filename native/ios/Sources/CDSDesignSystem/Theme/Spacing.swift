import CoreGraphics

/// Spacing scale, mirroring `theme.space` in `defaultTheme.ts`.
///
/// Token names map to the RN scale (e.g. `x1 == 8`, `x0_5 == 4`). Carried on the theme so
/// consumers can override the scale per ``CDSThemeProvider`` (RN parity: `space` is themeable).
public struct CDSSpacing: Sendable, Equatable {
    public var x0: CGFloat
    public var x0_25: CGFloat
    public var x0_5: CGFloat
    public var x0_75: CGFloat
    public var x1: CGFloat
    public var x1_5: CGFloat
    public var x2: CGFloat
    public var x3: CGFloat
    public var x4: CGFloat
    public var x5: CGFloat
    public var x6: CGFloat
    public var x7: CGFloat
    public var x8: CGFloat
    public var x9: CGFloat
    public var x10: CGFloat

    public init(
        x0: CGFloat = 0, x0_25: CGFloat = 2, x0_5: CGFloat = 4, x0_75: CGFloat = 6,
        x1: CGFloat = 8, x1_5: CGFloat = 12, x2: CGFloat = 16, x3: CGFloat = 24,
        x4: CGFloat = 32, x5: CGFloat = 40, x6: CGFloat = 48, x7: CGFloat = 56,
        x8: CGFloat = 64, x9: CGFloat = 72, x10: CGFloat = 80
    ) {
        self.x0 = x0; self.x0_25 = x0_25; self.x0_5 = x0_5; self.x0_75 = x0_75
        self.x1 = x1; self.x1_5 = x1_5; self.x2 = x2; self.x3 = x3
        self.x4 = x4; self.x5 = x5; self.x6 = x6; self.x7 = x7
        self.x8 = x8; self.x9 = x9; self.x10 = x10
    }

    public static let `default` = CDSSpacing()
}

/// Border radius scale, mirroring `theme.borderRadius` in `defaultTheme.ts`.
public struct CDSRadius: Sendable, Equatable {
    public var r0: CGFloat
    public var r100: CGFloat
    public var r200: CGFloat
    public var r300: CGFloat
    public var r400: CGFloat
    public var r500: CGFloat
    public var r600: CGFloat
    public var r700: CGFloat
    public var r800: CGFloat
    public var r900: CGFloat
    /// `borderRadius["1000"]` in RN is 1e5 — an effectively-pill radius.
    public var pill: CGFloat

    public init(
        r0: CGFloat = 0, r100: CGFloat = 4, r200: CGFloat = 8, r300: CGFloat = 12,
        r400: CGFloat = 16, r500: CGFloat = 24, r600: CGFloat = 32, r700: CGFloat = 40,
        r800: CGFloat = 48, r900: CGFloat = 56, pill: CGFloat = 100_000
    ) {
        self.r0 = r0; self.r100 = r100; self.r200 = r200; self.r300 = r300
        self.r400 = r400; self.r500 = r500; self.r600 = r600; self.r700 = r700
        self.r800 = r800; self.r900 = r900; self.pill = pill
    }

    public static let `default` = CDSRadius()
}

/// Border width scale, mirroring `theme.borderWidth` in `defaultTheme.ts`.
public struct CDSBorderWidth: Sendable, Equatable {
    public var w0: CGFloat
    public var w100: CGFloat
    public var w200: CGFloat
    public var w300: CGFloat
    public var w400: CGFloat
    public var w500: CGFloat

    public init(
        w0: CGFloat = 0, w100: CGFloat = 1, w200: CGFloat = 2,
        w300: CGFloat = 4, w400: CGFloat = 6, w500: CGFloat = 8
    ) {
        self.w0 = w0; self.w100 = w100; self.w200 = w200
        self.w300 = w300; self.w400 = w400; self.w500 = w500
    }

    public static let `default` = CDSBorderWidth()
}
