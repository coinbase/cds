import CoreGraphics

/// Icon size scale, mirroring `theme.iconSize` in `defaultTheme.ts`.
public struct CDSIconSize: Sendable, Equatable {
    public var xs: CGFloat
    public var s: CGFloat
    public var m: CGFloat
    public var l: CGFloat

    public init(xs: CGFloat = 12, s: CGFloat = 16, m: CGFloat = 24, l: CGFloat = 32) {
        self.xs = xs; self.s = s; self.m = m; self.l = l
    }

    public func with(_ mutate: (inout CDSIconSize) -> Void) -> CDSIconSize {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve an icon-size token: `theme.iconSize[.m]`. Pairs with ``CDSIconSizeToken``.
    public subscript(_ token: CDSIconSizeToken) -> CGFloat {
        switch token {
        case .xs: return xs
        case .s: return s
        case .m: return m
        case .l: return l
        }
    }

    public static let `default` = CDSIconSize()
}

/// Avatar size scale, mirroring `theme.avatarSize` in `defaultTheme.ts`.
public struct CDSAvatarSize: Sendable, Equatable {
    public var s: CGFloat
    public var m: CGFloat
    public var l: CGFloat
    public var xl: CGFloat
    public var xxl: CGFloat
    public var xxxl: CGFloat

    public init(
        s: CGFloat = 16, m: CGFloat = 24, l: CGFloat = 32,
        xl: CGFloat = 40, xxl: CGFloat = 48, xxxl: CGFloat = 56
    ) {
        self.s = s; self.m = m; self.l = l
        self.xl = xl; self.xxl = xxl; self.xxxl = xxxl
    }

    public func with(_ mutate: (inout CDSAvatarSize) -> Void) -> CDSAvatarSize {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve an avatar-size token: `theme.avatarSize[.xl]`. Pairs with ``CDSAvatarSizeToken``.
    public subscript(_ token: CDSAvatarSizeToken) -> CGFloat {
        switch token {
        case .s: return s
        case .m: return m
        case .l: return l
        case .xl: return xl
        case .xxl: return xxl
        case .xxxl: return xxxl
        }
    }

    public static let `default` = CDSAvatarSize()
}

/// Control size scale, mirroring `theme.controlSize` in `defaultTheme.ts`.
public struct CDSControlSize: Sendable, Equatable {
    public var checkboxSize: CGFloat
    public var radioSize: CGFloat
    public var switchWidth: CGFloat
    public var switchHeight: CGFloat
    public var switchThumbSize: CGFloat
    public var tileSize: CGFloat

    public init(
        checkboxSize: CGFloat = 20, radioSize: CGFloat = 20,
        switchWidth: CGFloat = 52, switchHeight: CGFloat = 32,
        switchThumbSize: CGFloat = 30, tileSize: CGFloat = 106
    ) {
        self.checkboxSize = checkboxSize
        self.radioSize = radioSize
        self.switchWidth = switchWidth
        self.switchHeight = switchHeight
        self.switchThumbSize = switchThumbSize
        self.tileSize = tileSize
    }

    public func with(_ mutate: (inout CDSControlSize) -> Void) -> CDSControlSize {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve a control measurement: `theme.controlSize[.checkboxSize]`. Pairs with ``CDSControlSizeToken``.
    public subscript(_ token: CDSControlSizeToken) -> CGFloat {
        switch token {
        case .checkboxSize: return checkboxSize
        case .radioSize: return radioSize
        case .switchWidth: return switchWidth
        case .switchHeight: return switchHeight
        case .switchThumbSize: return switchThumbSize
        case .tileSize: return tileSize
        }
    }

    public static let `default` = CDSControlSize()
}
