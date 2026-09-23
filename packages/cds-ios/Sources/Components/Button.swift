import SwiftUI

private let pressedScale = 0.98
private let pressedScrimOpacity = 0.15

// MARK: - Environment

private struct CDSButtonMetricsKey: EnvironmentKey {
    static let defaultValue: ButtonMetrics? = nil
}

extension EnvironmentValues {
    /// Set by ``CDSButtonStyle`` so ``CDSButtonLabel`` can pick up icon size and label spacing
    /// for the active button size. `nil` outside a CDS-styled button (the label then falls back
    /// to size `.l` from the ambient theme).
    var cdsButtonMetrics: ButtonMetrics? {
        get { self[CDSButtonMetricsKey.self] }
        set { self[CDSButtonMetricsKey.self] = newValue }
    }
}

// MARK: - ButtonStyle (chrome)

/// CDS look for a SwiftUI `Button`. Owns fill, radius, padding, press, loading, and the
/// content color / metrics environment. Does **not** own the label — pass title and icons as
/// the button's content (plain `Text`, or ``CDSButtonLabel`` for consistent icon spacing).
///
/// ```swift
/// Button("Save") { save() }
///     .buttonStyle(.cds(.primary))
///
/// Button(action: next) {
///     CDSButtonLabel("Continue", trailing: Image(systemName: "chevron.right"))
/// }
/// .buttonStyle(.cds(.primary, size: .l))
/// ```
struct CDSButtonStyle: ButtonStyle {
    @Environment(\.cdsTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    var variant: ButtonVariant = .primary
    var size: ButtonSize = .l
    var loading: Bool = false
    var transparent: Bool = false
    var fullWidth: Bool = false

    func makeBody(configuration: Configuration) -> some View {
        let colors = buttonColors(variant, transparent: transparent, theme: theme)
        let metrics = buttonMetrics(size, theme: theme)
        let active = configuration.isPressed && isEnabled && !loading
        let scrim: Color = theme.colorScheme == .dark ? .white : .black
        let shape = RoundedRectangle(cornerRadius: metrics.radius)

        return Group {
            if loading {
                ProgressView()
                    .progressViewStyle(.cds(diameter: metrics.iconSize, color: colors.content))
            } else {
                configuration.label
                    .font(theme.typography[metrics.font].font)
                    .foregroundStyle(colors.content)
            }
        }
        .environment(\.cdsButtonMetrics, metrics)
        .padding(.horizontal, metrics.paddingX)
        .padding(.vertical, metrics.paddingY)
        .frame(maxWidth: fullWidth ? .infinity : nil)
        .background(colors.container)
        .overlay(active ? scrim.opacity(pressedScrimOpacity) : .clear)
        .clipShape(shape)
        .scaleEffect(active ? pressedScale : 1)
        .opacity(isEnabled ? 1 : cdsDisabledAlpha)
        .animation(.easeOut(duration: 0.12), value: active)
        .allowsHitTesting(!loading)
    }
}

extension ButtonStyle where Self == CDSButtonStyle {
    static func cds(
        _ variant: ButtonVariant = .primary,
        size: ButtonSize = .l,
        loading: Bool = false,
        transparent: Bool = false,
        fullWidth: Bool = false
    ) -> CDSButtonStyle {
        CDSButtonStyle(
            variant: variant,
            size: size,
            loading: loading,
            transparent: transparent,
            fullWidth: fullWidth
        )
    }
}

// MARK: - Label helper (icons + spacing)

/// Standard CDS button label: leading icon, title, trailing icon. Reads icon size and
/// spacing from ``CDSButtonStyle`` via the environment so every call site stays consistent
/// without a CDS `Button` type. Tint comes from the style's `foregroundStyle`.
///
/// Custom layouts can skip this and compose `configuration.label` themselves.
struct CDSButtonLabel<Leading: View, Trailing: View>: View {
    @Environment(\.cdsTheme) private var theme
    @Environment(\.cdsButtonMetrics) private var environmentMetrics

    private let title: String
    private let leading: Leading
    private let trailing: Trailing

    init(_ title: String, leading: Leading, trailing: Trailing) {
        self.title = title
        self.leading = leading
        self.trailing = trailing
    }

    var body: some View {
        let metrics = environmentMetrics ?? buttonMetrics(.l, theme: theme)
        HStack(spacing: metrics.labelSpacing) {
            if Leading.self != EmptyView.self {
                leading
                    .font(.system(size: metrics.iconSize, weight: .semibold))
                    .frame(width: metrics.iconSize, height: metrics.iconSize)
            }
            SwiftUI.Text(title)
                .font(theme.typography[metrics.font].font)
                .lineLimit(1)
            if Trailing.self != EmptyView.self {
                trailing
                    .font(.system(size: metrics.iconSize, weight: .semibold))
                    .frame(width: metrics.iconSize, height: metrics.iconSize)
            }
        }
    }
}

extension CDSButtonLabel where Leading == EmptyView, Trailing == EmptyView {
    init(_ title: String) {
        self.init(title, leading: EmptyView(), trailing: EmptyView())
    }
}

extension CDSButtonLabel where Leading == EmptyView {
    init(_ title: String, trailing: Trailing) {
        self.init(title, leading: EmptyView(), trailing: trailing)
    }
}

extension CDSButtonLabel where Trailing == EmptyView {
    init(_ title: String, leading: Leading) {
        self.init(title, leading: leading, trailing: EmptyView())
    }
}

#if DEBUG
#Preview("ButtonStyle — variants & states") {
    CDSThemeProvider {
        VStack(spacing: 12) {
            Button("Primary") {}
                .buttonStyle(.cds(.primary))
            Button("Secondary") {}
                .buttonStyle(.cds(.secondary))
            Button("Tertiary") {}
                .buttonStyle(.cds(.tertiary))
            Button("Positive") {}
                .buttonStyle(.cds(.positive))
            Button("Negative") {}
                .buttonStyle(.cds(.negative))
            Button("Transparent") {}
                .buttonStyle(.cds(.primary, transparent: true))
            Button("Disabled") {}
                .buttonStyle(.cds(.primary))
                .disabled(true)
            Button("Loading") {}
                .buttonStyle(.cds(.primary, loading: true))
            Button("Full width") {}
                .buttonStyle(.cds(.primary, fullWidth: true))
            HStack {
                Button("Small") {}
                    .buttonStyle(.cds(.primary, size: .s))
                Button("XSmall") {}
                    .buttonStyle(.cds(.primary, size: .xs))
            }
        }
        .padding()
    }
}

#Preview("ButtonStyle — CDSButtonLabel icons") {
    CDSThemeProvider {
        VStack(spacing: 12) {
            Button(action: {}) {
                CDSButtonLabel("Continue", trailing: Image(systemName: "chevron.right"))
            }
            .buttonStyle(.cds(.primary))

            Button(action: {}) {
                CDSButtonLabel("Add", leading: Image(systemName: "plus"))
            }
            .buttonStyle(.cds(.secondary))

            Button(action: {}) {
                CDSButtonLabel("Wallet", leading: Image(systemName: "creditcard"), trailing: Image(systemName: "chevron.right"))
            }
            .buttonStyle(.cds(.tertiary))

            Button(action: {}) {
                CDSButtonLabel("Continue", trailing: Image(systemName: "chevron.right"))
            }
            .buttonStyle(.cds(.primary, size: .s))

            Button(action: {}) {
                CDSButtonLabel("Disabled", trailing: Image(systemName: "chevron.right"))
            }
            .buttonStyle(.cds(.primary))
            .disabled(true)
        }
        .padding()
    }
}
#endif
