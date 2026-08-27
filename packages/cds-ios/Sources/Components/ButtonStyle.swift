import SwiftUI

/// Visual/semantic variant — the five in the current Figma Button spec.
enum CDSButtonVariant { case primary, secondary, tertiary, positive, negative }

/// Size tier — the four sizes (`xs`/`s`/`m`/`l`) in the Figma Button spec.
enum CDSButtonSize { case xs, s, m, l }

/// Resolved container/content colors for a ``CDSButtonVariant``. Transparent variants use a true
/// `.clear` container so the button reads correctly on any surface.
struct CDSButtonColors {
    let container: Color
    let content: Color
}

func cdsButtonColors(_ variant: CDSButtonVariant, transparent: Bool, theme: CDSTheme) -> CDSButtonColors {
    let colors = theme.colors
    if transparent {
        switch variant {
        case .primary: return CDSButtonColors(container: .clear, content: colors.fgPrimary)
        case .secondary: return CDSButtonColors(container: .clear, content: colors.fg)
        case .tertiary: return CDSButtonColors(container: .clear, content: colors.fg)
        case .positive: return CDSButtonColors(container: .clear, content: colors.fgPositive)
        case .negative: return CDSButtonColors(container: .clear, content: colors.fgNegative)
        }
    }
    switch variant {
    case .primary: return CDSButtonColors(container: colors.bgPrimary, content: colors.fgInverse)
    case .secondary: return CDSButtonColors(container: colors.bgSecondary, content: colors.fg)
    case .tertiary: return CDSButtonColors(container: colors.bgTertiary, content: colors.fg)
    case .positive: return CDSButtonColors(container: colors.bgPositive, content: colors.fgInverse)
    case .negative: return CDSButtonColors(container: colors.bgNegative, content: colors.fgInverse)
    }
}

/// Resolved size-derived metrics for a ``CDSButtonSize``. There is no `height` field: height falls
/// out of `paddingY` plus the font's line height.
struct CDSButtonMetrics {
    let paddingX: CGFloat
    let paddingY: CGFloat
    let radius: CGFloat
    let iconSize: CGFloat
    let font: CDSTextStyle
}

func cdsButtonMetrics(_ size: CDSButtonSize, theme: CDSTheme) -> CDSButtonMetrics {
    let space = theme.spacing
    let radius = theme.radius
    let icon = theme.iconSize
    switch size {
    case .xs: return CDSButtonMetrics(paddingX: space.x2, paddingY: space.x0_75, radius: radius.r700, iconSize: icon.s, font: .label1)
    case .s: return CDSButtonMetrics(paddingX: space.x2, paddingY: space.x1, radius: radius.r700, iconSize: icon.s, font: .headline)
    case .m: return CDSButtonMetrics(paddingX: space.x3, paddingY: space.x1_5, radius: radius.r900, iconSize: icon.m, font: .headline)
    case .l: return CDSButtonMetrics(paddingX: space.x4, paddingY: space.x2, radius: radius.r900, iconSize: icon.m, font: .headline)
    }
}
