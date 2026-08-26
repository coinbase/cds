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

    public static let `default` = CDSControlSize()
}
