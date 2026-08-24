import CoreGraphics

/// Spacing scale, mirroring `theme.space` in `defaultTheme.ts`.
///
/// Token keys map to the RN scale (e.g. `space["1"] == 8`, `space["0.5"] == 4`).
public enum CDSSpacing {
    public static let x0: CGFloat = 0
    public static let x0_25: CGFloat = 2
    public static let x0_5: CGFloat = 4
    public static let x0_75: CGFloat = 6
    public static let x1: CGFloat = 8
    public static let x1_5: CGFloat = 12
    public static let x2: CGFloat = 16
    public static let x3: CGFloat = 24
    public static let x4: CGFloat = 32
    public static let x5: CGFloat = 40
    public static let x6: CGFloat = 48
    public static let x7: CGFloat = 56
    public static let x8: CGFloat = 64
    public static let x9: CGFloat = 72
    public static let x10: CGFloat = 80
}

/// Border radius scale, mirroring `theme.borderRadius` in `defaultTheme.ts`.
public enum CDSRadius {
    public static let r0: CGFloat = 0
    public static let r100: CGFloat = 4
    public static let r200: CGFloat = 8
    public static let r300: CGFloat = 12
    public static let r400: CGFloat = 16
    public static let r500: CGFloat = 24
    public static let r600: CGFloat = 32
    public static let r700: CGFloat = 40
    public static let r800: CGFloat = 48
    public static let r900: CGFloat = 56
    /// `borderRadius["1000"]` in RN is 1e5 — an effectively-pill radius.
    public static let pill: CGFloat = 100_000
}

/// Border width scale, mirroring `theme.borderWidth` in `defaultTheme.ts`.
public enum CDSBorderWidth {
    public static let w0: CGFloat = 0
    public static let w100: CGFloat = 1
    public static let w200: CGFloat = 2
    public static let w300: CGFloat = 4
    public static let w400: CGFloat = 6
    public static let w500: CGFloat = 8
}
