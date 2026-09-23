import SwiftUI

private let cdsProgressStrokeRatio: CGFloat = 0.16
private let cdsIndeterminateTrim: CGFloat = 0.75
private let cdsIndeterminateSpinDuration: Double = 0.7

/// Size tier for ``CDSCircularProgressViewStyle``. Each tier resolves to a diameter on the theme's
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

/// CDS circular look for a SwiftUI `ProgressView`. Owns stroke color and diameter.
/// Does **not** replace `ProgressView` — indeterminate is `ProgressView()`, determinate is
/// `ProgressView(value:)`.
///
/// ```swift
/// ProgressView()
///     .progressViewStyle(.cds(.m))
/// ProgressView(value: 0.6)
///     .progressViewStyle(.cds(.l, color: theme.colors.fgPrimary))
/// ```
///
/// Contrast with the old `ProgressCircle` view: the spinner lives inside this style's `makeBody`.
struct CDSCircularProgressViewStyle: ProgressViewStyle {
    var size: ProgressCircleSize = .m
    var color: Color?
    var diameter: CGFloat?

    func makeBody(configuration: Configuration) -> some View {
        CDSCircularProgress(
            fractionCompleted: configuration.fractionCompleted,
            size: size,
            color: color,
            diameter: diameter
        )
    }
}

extension ProgressViewStyle where Self == CDSCircularProgressViewStyle {
    static func cds(
        _ size: ProgressCircleSize = .m,
        color: Color? = nil
    ) -> CDSCircularProgressViewStyle {
        CDSCircularProgressViewStyle(size: size, color: color)
    }

    static func cds(diameter: CGFloat, color: Color? = nil) -> CDSCircularProgressViewStyle {
        CDSCircularProgressViewStyle(color: color, diameter: diameter)
    }
}

/// Drawn by ``CDSCircularProgressViewStyle``. Holds spin state so the style itself stays a value.
private struct CDSCircularProgress: View {
    @Environment(\.cdsTheme) private var theme

    var fractionCompleted: Double?
    var size: ProgressCircleSize
    var color: Color?
    var diameter: CGFloat?

    @State private var rotation = 0.0

    var body: some View {
        let resolvedDiameter = diameter ?? progressCircleDiameter(size, theme: theme)
        let strokeColor = color ?? theme.colors.fgMuted
        let isIndeterminate = fractionCompleted == nil
        let trimTo = fractionCompleted ?? cdsIndeterminateTrim

        Circle()
            .trim(from: 0, to: trimTo)
            .stroke(
                strokeColor,
                style: StrokeStyle(lineWidth: resolvedDiameter * cdsProgressStrokeRatio, lineCap: .round)
            )
            .frame(width: resolvedDiameter, height: resolvedDiameter)
            .rotationEffect(.degrees(isIndeterminate ? rotation : -90))
            .onAppear {
                guard isIndeterminate else { return }
                withAnimation(.linear(duration: cdsIndeterminateSpinDuration).repeatForever(autoreverses: false)) {
                    rotation = 360
                }
            }
    }
}

#if DEBUG
#Preview("ProgressViewStyle — sizes (no provider)") {
    HStack(spacing: 24) {
        ProgressView().progressViewStyle(.cds(.s))
        ProgressView().progressViewStyle(.cds(.m))
        ProgressView().progressViewStyle(.cds(.l))
        ProgressView(value: 0.65).progressViewStyle(.cds(.l))
    }
    .padding()
}

#Preview("ProgressViewStyle — with CDSThemeProvider") {
    CDSThemeProvider {
        HStack(spacing: 24) {
            ProgressView().progressViewStyle(.cds(.m))
            ProgressView().progressViewStyle(.cds(.l, color: .red))
        }
        .padding()
    }
}
#endif
