import SwiftUI

/// Size tier for ``ProgressCircle``. Each tier resolves to a concrete diameter from the theme's
/// icon-size scale.
enum ProgressCircleSize { case s, m, l }

/// Resolve a ``ProgressCircleSize`` to a concrete diameter from the theme's icon-size scale.
/// Pure and deterministic so the tier → diameter mapping is unit-testable.
func progressCircleDiameter(_ size: ProgressCircleSize, theme: CDSTheme) -> CGFloat {
    switch size {
    case .s: return theme.iconSize.s
    case .m: return theme.iconSize.m
    case .l: return theme.iconSize.l
    }
}

/// CDS's indeterminate progress indicator: a trimmed ``Circle`` that spins forever to signal a busy
/// state. The size tiers cover standalone use; the explicit-diameter initializer lets ``Button`` and
/// ``SlideButton`` request the exact icon diameter their busy state computes. Colors come from the
/// ambient ``CDSTheme`` and default to `fgMuted`.
struct ProgressCircle: View {
    @Environment(\.cdsTheme) private var theme

    /// How the diameter is determined: a theme size tier, or an exact pixel diameter.
    private enum Sizing {
        case tier(ProgressCircleSize)
        case explicit(CGFloat)
    }

    private let sizing: Sizing
    private let color: Color?
    private let accessibilityLabel: String

    @State private var rotation = 0.0

    /// Pick a size tier, optionally override the color, and label it for VoiceOver.
    /// `color == nil` resolves to `theme.colors.fgMuted`.
    init(
        size: ProgressCircleSize = .m,
        color: Color? = nil,
        accessibilityLabel: String = "Loading"
    ) {
        self.sizing = .tier(size)
        self.color = color
        self.accessibilityLabel = accessibilityLabel
    }

    /// Explicit-diameter initializer for call sites (``Button``'s loading state, ``SlideButton``'s
    /// confirming state) that must match the exact icon diameter they compute.
    init(
        color: Color?,
        diameter: CGFloat,
        accessibilityLabel: String = "Loading"
    ) {
        self.sizing = .explicit(diameter)
        self.color = color
        self.accessibilityLabel = accessibilityLabel
    }

    var body: some View {
        let diameter: CGFloat
        switch sizing {
        case .tier(let size): diameter = progressCircleDiameter(size, theme: theme)
        case .explicit(let value): diameter = value
        }
        let strokeColor = color ?? theme.colors.fgMuted

        return Circle()
            .trim(from: 0, to: 0.75)
            .stroke(strokeColor, style: StrokeStyle(lineWidth: diameter * 0.16, lineCap: .round))
            .frame(width: diameter, height: diameter)
            .rotationEffect(.degrees(rotation))
            .onAppear {
                withAnimation(.linear(duration: 0.7).repeatForever(autoreverses: false)) {
                    rotation = 360
                }
            }
            .accessibilityElement()
            .accessibilityLabel(accessibilityLabel)
            .accessibilityAddTraits(.updatesFrequently)
    }
}

#if DEBUG
// No provider on purpose: renders the default theme via the preview fallback instead of trapping.
#Preview("ProgressCircle — sizes (no provider)") {
    HStack(spacing: 24) {
        ProgressCircle(size: .s)
        ProgressCircle(size: .m)
        ProgressCircle(size: .l)
    }
    .padding()
}

#Preview("ProgressCircle — with CDSThemeProvider") {
    CDSThemeProvider {
        HStack(spacing: 24) {
            ProgressCircle(size: .m)
            ProgressCircle(size: .l, color: .red)
        }
        .padding()
    }
}
#endif
