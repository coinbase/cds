import CoreGraphics

/// Spacing scale, mirroring `theme.space` in `defaultTheme.ts` and Android's `CdsSpace`.
///
/// Token names map to the RN scale (e.g. `x1 == 8`, `x0_5 == 4`). Carried on the theme so
/// consumers can override the scale per ``CDSThemeProvider`` (RN parity: `space` is themeable).
public struct CDSSpace: Sendable, Equatable {
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

    public func with(_ mutate: (inout CDSSpace) -> Void) -> CDSSpace {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve a space token: `theme.space[.x2]`. Pairs with ``CDSSpaceToken``.
    public subscript(_ token: CDSSpaceToken) -> CGFloat {
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

    public static let `default` = CDSSpace()
}

/// Border radius scale, mirroring `theme.borderRadius` in `defaultTheme.ts` and Android's
/// `CdsBorderRadius`.
public struct CDSBorderRadius: Sendable, Equatable {
    public var radius0: CGFloat
    public var radius100: CGFloat
    public var radius200: CGFloat
    public var radius300: CGFloat
    public var radius400: CGFloat
    public var radius500: CGFloat
    public var radius600: CGFloat
    public var radius700: CGFloat
    public var radius800: CGFloat
    public var radius900: CGFloat
    /// The pill rung (`borderRadius["1000"]` in RN, `radius1000` on Android): deliberately
    /// oversized (1e5) so it always renders fully rounded at any size.
    public var radius1000: CGFloat

    public init(
        radius0: CGFloat = 0, radius100: CGFloat = 4, radius200: CGFloat = 8, radius300: CGFloat = 12,
        radius400: CGFloat = 16, radius500: CGFloat = 24, radius600: CGFloat = 32, radius700: CGFloat = 40,
        radius800: CGFloat = 48, radius900: CGFloat = 56, radius1000: CGFloat = 100_000
    ) {
        self.radius0 = radius0; self.radius100 = radius100; self.radius200 = radius200; self.radius300 = radius300
        self.radius400 = radius400; self.radius500 = radius500; self.radius600 = radius600; self.radius700 = radius700
        self.radius800 = radius800; self.radius900 = radius900; self.radius1000 = radius1000
    }

    public func with(_ mutate: (inout CDSBorderRadius) -> Void) -> CDSBorderRadius {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve a border-radius token: `theme.borderRadius[.radius400]`. Pairs with
    /// ``CDSBorderRadiusToken`` for dynamic, data-driven, and serialized lookups.
    public subscript(_ token: CDSBorderRadiusToken) -> CGFloat {
        switch token {
        case .radius0: return radius0
        case .radius100: return radius100
        case .radius200: return radius200
        case .radius300: return radius300
        case .radius400: return radius400
        case .radius500: return radius500
        case .radius600: return radius600
        case .radius700: return radius700
        case .radius800: return radius800
        case .radius900: return radius900
        case .radius1000: return radius1000
        }
    }

    public static let `default` = CDSBorderRadius()
}

/// Border width scale, mirroring `theme.borderWidth` in `defaultTheme.ts` and Android's
/// `CdsBorderWidth`.
public struct CDSBorderWidth: Sendable, Equatable {
    public var borderWidth0: CGFloat
    public var borderWidth100: CGFloat
    public var borderWidth200: CGFloat
    public var borderWidth300: CGFloat
    public var borderWidth400: CGFloat
    public var borderWidth500: CGFloat

    public init(
        borderWidth0: CGFloat = 0, borderWidth100: CGFloat = 1, borderWidth200: CGFloat = 2,
        borderWidth300: CGFloat = 4, borderWidth400: CGFloat = 6, borderWidth500: CGFloat = 8
    ) {
        self.borderWidth0 = borderWidth0; self.borderWidth100 = borderWidth100
        self.borderWidth200 = borderWidth200
        self.borderWidth300 = borderWidth300; self.borderWidth400 = borderWidth400
        self.borderWidth500 = borderWidth500
    }

    public func with(_ mutate: (inout CDSBorderWidth) -> Void) -> CDSBorderWidth {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve a border-width token: `theme.borderWidth[.borderWidth100]`. Pairs with
    /// ``CDSBorderWidthToken``.
    public subscript(_ token: CDSBorderWidthToken) -> CGFloat {
        switch token {
        case .borderWidth0: return borderWidth0
        case .borderWidth100: return borderWidth100
        case .borderWidth200: return borderWidth200
        case .borderWidth300: return borderWidth300
        case .borderWidth400: return borderWidth400
        case .borderWidth500: return borderWidth500
        }
    }

    public static let `default` = CDSBorderWidth()
}
