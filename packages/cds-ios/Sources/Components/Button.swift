import SwiftUI

private let pressedScale = 0.98
private let pressedScrimOpacity = 0.15

/// CDS's primary call-to-action control. Covers `variant`, `size`, `enabled`/`loading`,
/// `transparent`, `fullWidth`, and leading/trailing icon slots. Colors and metrics come from the
/// ambient ``CDSTheme``; icon slots receive the resolved content color so an icon's tint matches
/// the label across variants and themes.
///
/// The icon slots are generic (`Leading`/`Trailing` default to `EmptyView`) so an icon keeps its
/// concrete view type instead of being erased through `AnyView`.
struct Button<Leading: View, Trailing: View>: View {
    @Environment(\.cdsTheme) private var theme

    let text: String
    let action: () -> Void
    var variant: ButtonVariant = .primary
    var size: ButtonSize = .l
    var isEnabled: Bool = true
    var loading: Bool = false
    var transparent: Bool = false
    var fullWidth: Bool = false
    let leadingIcon: (Color) -> Leading
    let trailingIcon: (Color) -> Trailing

    init(
        text: String,
        action: @escaping () -> Void,
        variant: ButtonVariant = .primary,
        size: ButtonSize = .l,
        isEnabled: Bool = true,
        loading: Bool = false,
        transparent: Bool = false,
        fullWidth: Bool = false,
        @ViewBuilder leadingIcon: @escaping (Color) -> Leading,
        @ViewBuilder trailingIcon: @escaping (Color) -> Trailing
    ) {
        self.text = text
        self.action = action
        self.variant = variant
        self.size = size
        self.isEnabled = isEnabled
        self.loading = loading
        self.transparent = transparent
        self.fullWidth = fullWidth
        self.leadingIcon = leadingIcon
        self.trailingIcon = trailingIcon
    }

    var body: some View {
        let colors = buttonColors(variant, transparent: transparent, theme: theme)
        let metrics = buttonMetrics(size, theme: theme)
        return SwiftUI.Button(action: action) { EmptyView() }
            .buttonStyle(
                ButtonInnerStyle(
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

extension Button where Leading == EmptyView, Trailing == EmptyView {
    /// The common icon-less button — the general initializer's icon slots default to `EmptyView`.
    init(
        text: String,
        action: @escaping () -> Void,
        variant: ButtonVariant = .primary,
        size: ButtonSize = .l,
        isEnabled: Bool = true,
        loading: Bool = false,
        transparent: Bool = false,
        fullWidth: Bool = false
    ) {
        self.init(
            text: text,
            action: action,
            variant: variant,
            size: size,
            isEnabled: isEnabled,
            loading: loading,
            transparent: transparent,
            fullWidth: fullWidth,
            leadingIcon: { _ in EmptyView() },
            trailingIcon: { _ in EmptyView() }
        )
    }
}

/// Draws the whole button. Lives in a `ButtonStyle` because `configuration.isPressed` — needed for
/// the press scale + scrim — is only available there.
private struct ButtonInnerStyle<Leading: View, Trailing: View>: ButtonStyle {
    let text: String
    let theme: CDSTheme
    let colors: ButtonColors
    let metrics: ButtonMetrics
    let isEnabled: Bool
    let loading: Bool
    let fullWidth: Bool
    let leadingIcon: (Color) -> Leading
    let trailingIcon: (Color) -> Trailing

    func makeBody(configuration: Configuration) -> some View {
        let active = configuration.isPressed && isEnabled && !loading
        // Darken (light scheme) or lighten (dark scheme) the container while pressed.
        let scrim: Color = theme.colorScheme == .dark ? .white : .black
        let shape = RoundedRectangle(cornerRadius: metrics.radius)

        return HStack(spacing: theme.spacing.x1) {
            if loading {
                ProgressCircle(color: colors.content, diameter: metrics.iconSize)
            } else {
                leadingIcon(colors.content)
                Text(text, style: metrics.font, color: colors.content, lineLimit: 1)
                trailingIcon(colors.content)
            }
        }
        .padding(.horizontal, metrics.paddingX)
        .padding(.vertical, metrics.paddingY)
        .frame(maxWidth: fullWidth ? .infinity : nil)
        .background(colors.container)
        .overlay(active ? scrim.opacity(pressedScrimOpacity) : .clear)
        .clipShape(shape)
        .scaleEffect(active ? pressedScale : 1)
        .opacity(isEnabled ? 1 : cdsDisabledAlpha)
        .animation(.easeOut(duration: 0.12), value: active)
    }
}

#if DEBUG
#Preview("Button — variants & states") {
    CDSThemeProvider {
        VStack(spacing: 12) {
            Button(text: "Primary", action: {})
            Button(text: "Secondary", action: {}, variant: .secondary)
            Button(text: "Tertiary", action: {}, variant: .tertiary)
            Button(text: "Positive", action: {}, variant: .positive)
            Button(text: "Negative", action: {}, variant: .negative)
            Button(text: "Transparent", action: {}, transparent: true)
            Button(text: "Disabled", action: {}, isEnabled: false)
            Button(text: "Loading", action: {}, loading: true)
            Button(text: "Full width", action: {}, fullWidth: true)
            HStack {
                Button(text: "Small", action: {}, size: .s)
                Button(text: "XSmall", action: {}, size: .xs)
            }
        }
        .padding()
    }
}
#endif
