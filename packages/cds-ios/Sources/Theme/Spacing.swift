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

    public func with(_ mutate: (inout CDSSpacing) -> Void) -> CDSSpacing {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve a spacing token: `theme.spacing[.x2]`. Pairs with ``CDSSpacingToken``.
    public subscript(_ token: CDSSpacingToken) -> CGFloat {
        switch token {
        case .x0: return x0
        case .x0_25: return x0_25
        case .x0_5: return x0_5
        case .x0_75: return x0_75
        case .x1: return x1
        case .x1_5: return x1_5
        case .x2: return x2
        case .x3: return x3
        case .x4: return x4
        case .x5: return x5
        case .x6: return x6
        case .x7: return x7
        case .x8: return x8
        case .x9: return x9
        case .x10: return x10
        }
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
    public var     r800: CGFloat
    public var r900: CGFloat
    /// The pill rung (`borderRadius["1000"]` in RN, `radius1000` on Android): deliberately
    /// oversized (1e5) so it always renders fully rounded at any size.
    public var r1000: CGFloat

    public init(
        r0: CGFloat = 0, r100: CGFloat = 4, r200: CGFloat = 8, r300: CGFloat = 12,
        r400: CGFloat = 16, r500: CGFloat = 24, r600: CGFloat = 32, r700: CGFloat = 40,
        r800: CGFloat = 48, r900: CGFloat = 56, r1000: CGFloat = 100_000
    ) {
        self.r0 = r0; self.r100 = r100; self.r200 = r200; self.r300 = r300
        self.r400 = r400; self.r500 = r500; self.r600 = r600; self.r700 = r700
        self.r800 = r800; self.r900 = r900; self.r1000 = r1000
    }

    public func with(_ mutate: (inout CDSRadius) -> Void) -> CDSRadius {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve a border-radius token: `theme.radius[.r400]`. Pairs with ``CDSRadiusToken`` for
    /// dynamic, data-driven, and serialized lookups (mirrors ``CDSColors/subscript(_:)``).
    public subscript(_ token: CDSRadiusToken) -> CGFloat {
        switch token {
        case .r0: return r0
        case .r100: return r100
        case .r200: return r200
        case .r300: return r300
        case .r400: return r400
        case .r500: return r500
        case .r600: return r600
        case .r700: return r700
        case .r800: return r800
        case .r900: return r900
        case .r1000: return r1000
        }
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

    public func with(_ mutate: (inout CDSBorderWidth) -> Void) -> CDSBorderWidth {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve a border-width token: `theme.borderWidth[.w100]`. Pairs with ``CDSBorderWidthToken``.
    public subscript(_ token: CDSBorderWidthToken) -> CGFloat {
        switch token {
        case .w0: return w0
        case .w100: return w100
        case .w200: return w200
        case .w300: return w300
        case .w400: return w400
        case .w500: return w500
        }
    }

    public static let `default` = CDSBorderWidth()
}
