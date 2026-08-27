import SwiftUI

private let settleSpring = Animation.spring(response: 0.35, dampingFraction: 0.6)
// A tap that never moves the handle must not confirm, even on a track so narrow that the collapsed
// handle alone already exceeds `checkThreshold`.
private let minConfirmProgress: CGFloat = 0.01

/// A "slide to confirm" control for actions that shouldn't trigger on an accidental tap. Covers
/// `variant`, `size`, `enabled`, `checkThreshold`, and `onSlideComplete`. Height emerges from the
/// size's padding plus the theme's line height, and the collapsed handle is a square derived from
/// that height. `checked` is controlled — this view never resets itself; set it back to `false` to
/// re-enable dragging.
struct SlideButton: View {
    @Environment(\.cdsTheme) private var theme

    @Binding var checked: Bool
    let uncheckedLabel: String
    let checkedLabel: String
    var variant: SlideButtonVariant = .primary
    var size: SlideButtonSize = .l
    var isEnabled: Bool = true
    var checkThreshold: CGFloat = 0.7
    var onSlideComplete: (() -> Void)? = nil

    // `progress` is the 0…1 position of the handle within its travel.
    @State private var progress: CGFloat = 0

    var body: some View {
        let colors = slideButtonColors(variant, theme: theme)
        let metrics = slideButtonMetrics(size, theme: theme)
        let lineHeight = theme.typography[metrics.font].lineHeight
        let height = lineHeight + metrics.paddingY * 2
        let shape = RoundedRectangle(cornerRadius: metrics.radius)
        let checkedAlpha: CGFloat = checked ? 1 : 0

        return GeometryReader { geo in
            let width = max(geo.size.width, 1)
            // The collapsed handle is a square as wide as the track is tall.
            let collapsedFraction = min(max(height / width, 0), 1)
            let displayedFraction = collapsedFraction + progress * (1 - collapsedFraction)
            let handleWidth = width * displayedFraction
            // Inset that centers the icon in the collapsed handle.
            let handleInset = max(0, (height - metrics.iconSize) / 2)

            ZStack(alignment: .leading) {
                shape.fill(theme.colors.bgSecondary)

                Text(uncheckedLabel, style: metrics.font, color: theme.colors.fg, alignment: .center, lineLimit: 1)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.horizontal, metrics.labelPaddingX)
                    .opacity((1 - displayedFraction) * (1 - checkedAlpha))

                Text(checkedLabel, style: metrics.font, color: colors.content, alignment: .center, lineLimit: 1)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.horizontal, metrics.labelPaddingX)
                    .opacity(checkedAlpha)

                ZStack(alignment: .trailing) {
                    RoundedRectangle(cornerRadius: metrics.radius).fill(colors.container)
                    ZStack {
                        SlideArrow()
                            .stroke(colors.content, style: StrokeStyle(lineWidth: metrics.iconSize * 0.12, lineCap: .round, lineJoin: .round))
                            .frame(width: metrics.iconSize, height: metrics.iconSize)
                            .opacity(1 - checkedAlpha)
                        ProgressCircle(color: colors.content, diameter: metrics.iconSize)
                            .opacity(checkedAlpha)
                    }
                    .padding(.trailing, handleInset)
                }
                .frame(width: handleWidth)
            }
            .frame(width: width, height: height)
            .clipShape(shape)
            .contentShape(shape)
            .gesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { value in
                        guard isEnabled, !checked else { return }
                        let range = max(width * (1 - collapsedFraction), 1)
                        progress = min(max(value.translation.width / range, 0), 1)
                    }
                    .onEnded { _ in
                        guard isEnabled, !checked else { return }
                        let finalDisplayed = collapsedFraction + progress * (1 - collapsedFraction)
                        if progress >= minConfirmProgress, finalDisplayed >= checkThreshold {
                            // Fire callbacks before the settle animation so the caller isn't delayed
                            // by the spring's duration.
                            checked = true
                            onSlideComplete?()
                            withAnimation(settleSpring) { progress = 1 }
                        } else {
                            withAnimation(settleSpring) { progress = 0 }
                        }
                    }
            )
        }
        .frame(height: height)
        .opacity(isEnabled ? 1 : cdsDisabledAlpha)
        .onChange(of: checked) { _, isChecked in
            withAnimation(settleSpring) { progress = isChecked ? 1 : 0 }
        }
    }
}

/// A simple forward arrow, standing in for CDS's `forwardArrow` icon glyph.
private struct SlideArrow: Shape {
    func path(in rect: CGRect) -> Path {
        let w = rect.width
        let h = rect.height
        var p = Path()
        p.move(to: CGPoint(x: w * 0.20, y: h * 0.5))
        p.addLine(to: CGPoint(x: w * 0.54, y: h * 0.5))
        p.move(to: CGPoint(x: w * 0.54, y: h * 0.26))
        p.addLine(to: CGPoint(x: w * 0.80, y: h * 0.5))
        p.addLine(to: CGPoint(x: w * 0.54, y: h * 0.74))
        return p
    }
}

#if DEBUG
private struct SlideButtonPreview: View {
    @State private var checked = false
    var body: some View {
        CDSThemeProvider {
            VStack(spacing: 16) {
                SlideButton(checked: $checked, uncheckedLabel: "Slide to send", checkedLabel: "Sending…")
                SwiftUI.Button("Reset") { checked = false }
            }
            .padding()
        }
    }
}

#Preview("SlideButton") { SlideButtonPreview() }
#endif
