import SwiftUI

private let pressedScale = 0.98
private let disabledAlpha = 0.4
private let pressedScrimOpacity = 0.15

/// CDS's primary call-to-action control. `internal` — not customer API yet. Covers `variant`,
/// `size`, `enabled`/`loading`, `transparent`, `fullWidth`, and leading/trailing icon slots.
/// Colors and metrics come from the ambient ``CDSTheme``. Icon slots receive the resolved content
/// color so an icon's tint matches the label across variants and themes.
struct CDSButton: View {
    @Environment(\.cdsTheme) private var theme

    let text: String
    let action: () -> Void
    var variant: CDSButtonVariant = .primary
    var size: CDSButtonSize = .l
    var isEnabled: Bool = true
    var loading: Bool = false
    var transparent: Bool = false
    var fullWidth: Bool = false
    var leadingIcon: ((Color) -> AnyView)? = nil
    var trailingIcon: ((Color) -> AnyView)? = nil

    var body: some View {
        let colors = cdsButtonColors(variant, transparent: transparent, theme: theme)
        let metrics = cdsButtonMetrics(size, theme: theme)
        return Button(action: action) { EmptyView() }
            .buttonStyle(
                CDSButtonInnerStyle(
                    text: text,
                    theme: theme,
                    colors: colors,
                    metrics: metrics,
                    isEnabled: isEnabled,
                    loading: loading,
                    fullWidth: fullWidth,
                    leadingIcon: leadingIcon,
                    trailingIcon: trailingIcon
                )
            )
            .disabled(!isEnabled || loading)
    }
}

/// Draws the whole button. Lives in a `ButtonStyle` because `configuration.isPressed` — needed for
/// the press scale + scrim — is only available there.
private struct CDSButtonInnerStyle: ButtonStyle {
    let text: String
    let theme: CDSTheme
    let colors: CDSButtonColors
    let metrics: CDSButtonMetrics
    let isEnabled: Bool
    let loading: Bool
    let fullWidth: Bool
    let leadingIcon: ((Color) -> AnyView)?
    let trailingIcon: ((Color) -> AnyView)?

    func makeBody(configuration: Configuration) -> some View {
        let active = configuration.isPressed && isEnabled && !loading
        // Darken (light scheme) or lighten (dark scheme) the container while pressed.
        let scrim: Color = theme.colorScheme == .dark ? .white : .black
        let shape = RoundedRectangle(cornerRadius: metrics.radius)

        return HStack(spacing: theme.spacing.x1) {
            if loading {
                CDSSpinner(color: colors.content, diameter: metrics.iconSize)
            } else {
                leadingIcon?(colors.content)
                CDSText(text, style: metrics.font, color: colors.content, lineLimit: 1)
                trailingIcon?(colors.content)
            }
        }
        .padding(.horizontal, metrics.paddingX)
        .padding(.vertical, metrics.paddingY)
        .frame(maxWidth: fullWidth ? .infinity : nil)
        .background(colors.container)
        .overlay(active ? scrim.opacity(pressedScrimOpacity) : .clear)
        .clipShape(shape)
        .scaleEffect(active ? pressedScale : 1)
        .opacity(isEnabled ? 1 : disabledAlpha)
        .animation(.easeOut(duration: 0.12), value: active)
    }
}

#if DEBUG
#Preview("CDSButton — variants & states") {
    CDSThemeProvider {
        VStack(spacing: 12) {
            CDSButton(text: "Primary", action: {})
            CDSButton(text: "Secondary", action: {}, variant: .secondary)
            CDSButton(text: "Tertiary", action: {}, variant: .tertiary)
            CDSButton(text: "Positive", action: {}, variant: .positive)
            CDSButton(text: "Negative", action: {}, variant: .negative)
            CDSButton(text: "Transparent", action: {}, transparent: true)
            CDSButton(text: "Disabled", action: {}, isEnabled: false)
            CDSButton(text: "Loading", action: {}, loading: true)
            CDSButton(text: "Full width", action: {}, fullWidth: true)
            HStack {
                CDSButton(text: "Small", action: {}, size: .s)
                CDSButton(text: "XSmall", action: {}, size: .xs)
            }
        }
        .padding()
    }
}
#endif
