import SwiftUI

/// Visual/semantic variant — the subset of ``CDSButtonVariant`` that makes sense for a
/// confirm-by-sliding action.
enum CDSSlideButtonVariant { case primary, positive, negative }

/// Size tier (`s`/`m`/`l`).
enum CDSSlideButtonSize { case s, m, l }

/// Resolved handle/content colors for a ``CDSSlideButtonVariant``. The track is always
/// `bgSecondary`; only the handle recolors.
struct CDSSlideButtonColors {
    let container: Color
    let content: Color
}

func cdsSlideButtonColors(_ variant: CDSSlideButtonVariant, theme: CDSTheme) -> CDSSlideButtonColors {
    // The handle mirrors the equivalent solid button variant, so derive from the button mapping
    // rather than re-listing the same tokens.
    let buttonVariant: CDSButtonVariant
    switch variant {
    case .primary: buttonVariant = .primary
    case .positive: buttonVariant = .positive
    case .negative: buttonVariant = .negative
    }
    let colors = cdsButtonColors(buttonVariant, transparent: false, theme: theme)
    return CDSSlideButtonColors(container: colors.container, content: colors.content)
}

/// Resolved size-derived metrics for a ``CDSSlideButtonSize``. Height is not a field: it emerges
/// from `paddingY` plus the font's line height, and the collapsed handle is a square of that height.
struct CDSSlideButtonMetrics {
    let paddingY: CGFloat
    let labelPaddingX: CGFloat
    let radius: CGFloat
    let iconSize: CGFloat
    let font: CDSTextStyle
}

func cdsSlideButtonMetrics(_ size: CDSSlideButtonSize, theme: CDSTheme) -> CDSSlideButtonMetrics {
    let space = theme.spacing
    let radius = theme.radius
    let icon = theme.iconSize
    switch size {
    case .s: return CDSSlideButtonMetrics(paddingY: space.x1, labelPaddingX: space.x2, radius: radius.r700, iconSize: icon.s, font: .headline)
    case .m: return CDSSlideButtonMetrics(paddingY: space.x1_5, labelPaddingX: space.x2, radius: radius.r900, iconSize: icon.m, font: .headline)
    case .l: return CDSSlideButtonMetrics(paddingY: space.x2, labelPaddingX: space.x2, radius: radius.r900, iconSize: icon.m, font: .headline)
    }
}
