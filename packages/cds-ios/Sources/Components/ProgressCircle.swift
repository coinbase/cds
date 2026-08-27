import SwiftUI

/// Size tier for ``CDSProgressCircle``. Each tier resolves to a concrete diameter from the theme's
/// icon-size scale, mirroring the `s`/`m`/`l` naming used by ``CDSButtonSize`` / ``CDSSlideButtonSize``.
enum CDSProgressCircleSize { case s, m, l }

/// Resolve a ``CDSProgressCircleSize`` to a concrete diameter from the theme's icon-size scale.
/// Pure and deterministic so the tier → diameter mapping is unit-testable.
func cdsProgressCircleDiameter(_ size: CDSProgressCircleSize, theme: CDSTheme) -> CGFloat {
    switch size {
    case .s: return theme.iconSize.s
    case .m: return theme.iconSize.m
    case .l: return theme.iconSize.l
    }
}

/// CDS's indeterminate progress indicator: a trimmed ``Circle`` that spins forever to signal a busy
/// state. This is the non-deprecated successor to cds-mobile's `Spinner` (`packages/mobile/src/loaders/
/// Spinner.tsx`), which is `@deprecated` in favor of an "indeterminate ProgressCircle" and slated for
/// removal in v10.
///
/// `internal` for v0.0.1 — like the sibling candidate components (``CDSText``, ``CDSButton``,
/// ``CDSSlideButton``) it ships in the artifact but is not customer API yet; the gallery reaches it
/// via `@testable import`. It is `internal` *for now*, not permanently.
///
/// The size tiers cover standalone use; the explicit-diameter initializer lets ``CDSButton`` and
/// ``CDSSlideButton`` request the exact icon diameter their busy state computes, so those controls
/// render identically to before. Colors come from the ambient ``CDSTheme`` and default to
/// `fgMuted` (the muted foreground mark), matching RN's indeterminate `ProgressCircle`. RN's
/// deprecated `Spinner` used `bgPrimary`; the non-deprecated `ProgressCircle` uses `fgMuted`, so we
/// mirror that here.
struct CDSProgressCircle: View {
    @Environment(\.cdsTheme) private var theme

    /// How the diameter is determined: a theme size tier, or an exact pixel diameter (used by the
    /// internal button call sites so their busy state matches the icon size they compute).
    private enum Sizing {
        case tier(CDSProgressCircleSize)
        case explicit(CGFloat)
    }

    private let sizing: Sizing
    private let color: Color?
    private let accessibilityLabel: String

    @State private var rotation = 0.0

    /// The component-grade initializer: pick a size tier, optionally override the color, and label it
    /// for VoiceOver. `color == nil` resolves to `theme.colors.fgMuted`.
    init(
        size: CDSProgressCircleSize = .m,
        color: Color? = nil,
        accessibilityLabel: String = "Loading"
    ) {
        self.sizing = .tier(size)
        self.color = color
        self.accessibilityLabel = accessibilityLabel
    }

    /// Explicit-diameter initializer for internal call sites (``CDSButton``'s loading state,
    /// ``CDSSlideButton``'s confirming state) that must match the exact icon diameter they compute.
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
        case .tier(let size): diameter = cdsProgressCircleDiameter(size, theme: theme)
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
// No provider on purpose: inside an Xcode Preview this renders the default theme via the preview
// fallback instead of trapping, so a component preview "just works".
#Preview("CDSProgressCircle — sizes (no provider)") {
    HStack(spacing: 24) {
        CDSProgressCircle(size: .s)
        CDSProgressCircle(size: .m)
        CDSProgressCircle(size: .l)
    }
    .padding()
}

#Preview("CDSProgressCircle — with CDSThemeProvider") {
    CDSThemeProvider {
        HStack(spacing: 24) {
            CDSProgressCircle(size: .m)
            CDSProgressCircle(size: .l, color: .red)
        }
        .padding()
    }
}
#endif
