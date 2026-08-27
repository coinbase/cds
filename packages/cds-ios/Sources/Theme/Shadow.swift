import SwiftUI

/// A single shadow definition, mirroring an entry in `theme.shadow` in `defaultTheme.ts`
/// (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`).
public struct CDSShadow: Sendable, Equatable {
    public var color: Color
    public var opacity: Double
    public var radius: CGFloat
    public var x: CGFloat
    public var y: CGFloat

    public init(
        color: Color = .black,
        opacity: Double = 0.12,
        radius: CGFloat = 12,
        x: CGFloat = 0,
        y: CGFloat = 8
    ) {
        self.color = color
        self.opacity = opacity
        self.radius = radius
        self.x = x
        self.y = y
    }
}

/// Shadow (elevation) scale, mirroring `theme.shadow` in `defaultTheme.ts`.
public struct CDSShadowScale: Sendable, Equatable {
    public var elevation1: CDSShadow
    public var elevation2: CDSShadow

    public init(
        elevation1: CDSShadow = CDSShadow(),
        elevation2: CDSShadow = CDSShadow(radius: 24, y: 8)
    ) {
        self.elevation1 = elevation1
        self.elevation2 = elevation2
    }

    public func with(_ mutate: (inout CDSShadowScale) -> Void) -> CDSShadowScale {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve a shadow token: `theme.shadow[.elevation1]`. Pairs with ``CDSShadowToken``.
    public subscript(_ token: CDSShadowToken) -> CDSShadow {
        switch token {
        case .elevation1: return elevation1
        case .elevation2: return elevation2
        }
    }

    public static let `default` = CDSShadowScale()
}

public extension View {
    /// Apply a CDS shadow token. SwiftUI's `shadow` folds opacity into the color.
    func cdsShadow(_ shadow: CDSShadow) -> some View {
        self.shadow(
            color: shadow.color.opacity(shadow.opacity),
            radius: shadow.radius,
            x: shadow.x,
            y: shadow.y
        )
    }
}
