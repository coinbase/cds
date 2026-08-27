import SwiftUI

/// Visual/semantic variant — the five in the current Figma Button spec.
enum ButtonVariant { case primary, secondary, tertiary, positive, negative }

/// Size tier — the four sizes (`xs`/`s`/`m`/`l`) in the Figma Button spec.
enum ButtonSize { case xs, s, m, l }

/// Resolved container/content colors for a ``ButtonVariant``. Transparent variants use a true
/// `.clear` container so the button reads correctly on any surface.
struct ButtonColors {
    let container: Color
    let content: Color
}

func buttonColors(_ variant: ButtonVariant, transparent: Bool, theme: CDSTheme) -> ButtonColors {
    let colors = theme.colors
    if transparent {
        switch variant {
        case .primary: return ButtonColors(container: .clear, content: colors.fgPrimary)
        case .secondary: return ButtonColors(container: .clear, content: colors.fg)
        case .tertiary: return ButtonColors(container: .clear, content: colors.fg)
        case .positive: return ButtonColors(container: .clear, content: colors.fgPositive)
        case .negative: return ButtonColors(container: .clear, content: colors.fgNegative)
        }
    }
    switch variant {
    case .primary: return ButtonColors(container: colors.bgPrimary, content: colors.fgInverse)
    case .secondary: return ButtonColors(container: colors.bgSecondary, content: colors.fg)
    case .tertiary: return ButtonColors(container: colors.bgTertiary, content: colors.fg)
    case .positive: return ButtonColors(container: colors.bgPositive, content: colors.fgInverse)
    case .negative: return ButtonColors(container: colors.bgNegative, content: colors.fgInverse)
    }
}

/// Resolved size-derived metrics for a ``ButtonSize``. There is no `height` field: height falls
/// out of `paddingY` plus the font's line height.
struct ButtonMetrics {
    let paddingX: CGFloat
    let paddingY: CGFloat
    let radius: CGFloat
    let iconSize: CGFloat
    let font: CDSTextStyle
}

func buttonMetrics(_ size: ButtonSize, theme: CDSTheme) -> ButtonMetrics {
    let space = theme.spacing
    let radius = theme.radius
    let icon = theme.iconSize
    switch size {
    case .xs: return ButtonMetrics(paddingX: space.x2, paddingY: space.x0_75, radius: radius.r700, iconSize: icon.s, font: .label1)
    case .s: return ButtonMetrics(paddingX: space.x2, paddingY: space.x1, radius: radius.r700, iconSize: icon.s, font: .headline)
    case .m: return ButtonMetrics(paddingX: space.x3, paddingY: space.x1_5, radius: radius.r900, iconSize: icon.m, font: .headline)
    case .l: return ButtonMetrics(paddingX: space.x4, paddingY: space.x2, radius: radius.r900, iconSize: icon.m, font: .headline)
    }
}
