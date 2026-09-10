import SwiftUI

/// A single shadow definition, mirroring an entry in `theme.shadow` in `defaultTheme.ts`
/// (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`) and Android's `CdsShadow`.
///
/// Field names match Android (`blurRadius`, `offsetY`) plus `offsetX`, which SwiftUI's
/// `shadow(x:y:)` accepts and Compose does not.
public struct CDSShadow: Sendable, Equatable {
    public var color: Color
    public var opacity: Double
    public var blurRadius: CGFloat
    public var offsetX: CGFloat
    public var offsetY: CGFloat

    public init(
        color: Color = .black,
        opacity: Double = 0.12,
        blurRadius: CGFloat = 12,
        offsetX: CGFloat = 0,
        offsetY: CGFloat = 8
    ) {
        self.color = color
        self.opacity = opacity
        self.blurRadius = blurRadius
        self.offsetX = offsetX
        self.offsetY = offsetY
    }
}

/// Shadow (elevation) scale, mirroring `theme.shadow` in `defaultTheme.ts` and Android's `CdsShadows`.
public struct CDSShadows: Sendable, Equatable {
    public var elevation1: CDSShadow
    public var elevation2: CDSShadow

    public init(
        elevation1: CDSShadow = CDSShadow(),
        elevation2: CDSShadow = CDSShadow(blurRadius: 24, offsetY: 8)
    ) {
        self.elevation1 = elevation1
        self.elevation2 = elevation2
    }

    public func with(_ mutate: (inout CDSShadows) -> Void) -> CDSShadows {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// Resolve a shadow token: `theme.shadows[.elevation1]`. Pairs with ``CDSShadowToken``.
    public subscript(_ token: CDSShadowToken) -> CDSShadow {
        switch token {
        case .elevation1: return elevation1
        case .elevation2: return elevation2
        }
    }

    public static let `default` = CDSShadows()
}

public extension View {
    /// Apply a CDS shadow token. SwiftUI's `shadow` folds opacity into the color.
    func cdsShadow(_ shadow: CDSShadow) -> some View {
        self.shadow(
            color: shadow.color.opacity(shadow.opacity),
            radius: shadow.blurRadius,
            x: shadow.offsetX,
            y: shadow.offsetY
        )
    }
}
