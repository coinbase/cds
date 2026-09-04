import SwiftUI

/// Visual/semantic variant — the subset of ``ButtonVariant`` that makes sense for a
/// confirm-by-sliding action.
enum SlideButtonVariant { case primary, positive, negative }

/// Size tier (`s`/`m`/`l`).
enum SlideButtonSize { case s, m, l }

/// Resolved handle/content colors for a ``SlideButtonVariant``. The track is always
/// `bgSecondary`; only the handle recolors.
struct SlideButtonColors {
    let container: Color
    let content: Color
}

func slideButtonColors(_ variant: SlideButtonVariant, theme: CDSTheme) -> SlideButtonColors {
    // The handle mirrors the equivalent solid button variant, so derive from the button mapping
    // rather than re-listing the same tokens.
    let buttonVariant: ButtonVariant
    switch variant {
    case .primary: buttonVariant = .primary
    case .positive: buttonVariant = .positive
    case .negative: buttonVariant = .negative
    }
    let colors = buttonColors(buttonVariant, transparent: false, theme: theme)
    return SlideButtonColors(container: colors.container, content: colors.content)
}

/// Resolved size-derived metrics for a ``SlideButtonSize``. Height is not a field: it emerges
/// from `paddingY` plus the font's line height, and the collapsed handle is a square of that height.
struct SlideButtonMetrics {
    let paddingY: CGFloat
    let labelPaddingX: CGFloat
    let radius: CGFloat
    let iconSize: CGFloat
    let font: CDSTextStyle
}

func slideButtonMetrics(_ size: SlideButtonSize, theme: CDSTheme) -> SlideButtonMetrics {
    let space = theme.spacing
    let radius = theme.radius
    let icon = theme.iconSize
    switch size {
    case .s: return SlideButtonMetrics(paddingY: space.x1, labelPaddingX: space.x2, radius: radius.r700, iconSize: icon.s, font: .headline)
    case .m: return SlideButtonMetrics(paddingY: space.x1_5, labelPaddingX: space.x2, radius: radius.r900, iconSize: icon.m, font: .headline)
    case .l: return SlideButtonMetrics(paddingY: space.x2, labelPaddingX: space.x2, radius: radius.r900, iconSize: icon.m, font: .headline)
    }
}
