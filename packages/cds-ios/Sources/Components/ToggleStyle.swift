import SwiftUI

/// Semantic color of a CDS-styled SwiftUI `Toggle` when on. Matches RN `Switch` variants.
enum ToggleVariant { case primary, positive, negative }

/// Track fill for ``CDSToggleStyle``. Off is always `bgTertiary`; on follows ``ToggleVariant``.
func toggleTrackColor(_ variant: ToggleVariant, isOn: Bool, theme: CDSTheme) -> Color {
    if !isOn { return theme.colors.bgTertiary }
    switch variant {
    case .primary: return theme.colors.bgPrimary
    case .positive: return theme.colors.bgPositive
    case .negative: return theme.colors.bgNegative
    }
}

/// Thumb fill. Light scheme uses `fgInverse` on the colored track; dark scheme uses `fg`.
func toggleThumbColor(theme: CDSTheme) -> Color {
    theme.colorScheme == .dark ? theme.colors.fg : theme.colors.fgInverse
}

/// CDS look for a SwiftUI `Toggle`. Owns track/thumb colors and control-size metrics.
/// Does **not** replace `Toggle` — the caller still owns the label and `isOn` binding.
///
/// ```swift
/// Toggle("Notifications", isOn: $on)
///     .toggleStyle(.cds(.primary))
/// ```
///
/// Contrast with Alert: there is no `AlertStyle`. Alerts are presented with `.alert`, not a
/// CDS view. See the gallery "Alert" section.
struct CDSToggleStyle: ToggleStyle {
    @Environment(\.cdsTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    var variant: ToggleVariant = .primary

    func makeBody(configuration: Configuration) -> some View {
        let control = theme.controlSize
        let track = toggleTrackColor(variant, isOn: configuration.isOn, theme: theme)
        let thumb = toggleThumbColor(theme: theme)
        let inset = max((control.switchHeight - control.switchThumbSize) / 2, 0)

        HStack(spacing: theme.space.x2) {
            configuration.label
                .cdsText(.body)
            Spacer(minLength: theme.space.x2)
            Capsule()
                .fill(track)
                .frame(width: control.switchWidth, height: control.switchHeight)
                .overlay(alignment: configuration.isOn ? .trailing : .leading) {
                    Circle()
                        .fill(thumb)
                        .frame(width: control.switchThumbSize, height: control.switchThumbSize)
                        .padding(inset)
                }
                .opacity(isEnabled ? 1 : cdsDisabledAlpha)
                .animation(.easeOut(duration: 0.15), value: configuration.isOn)
        }
        .contentShape(Rectangle())
        .onTapGesture {
            guard isEnabled else { return }
            configuration.isOn.toggle()
        }
        .accessibilityAddTraits(.isToggle)
        .accessibilityValue(configuration.isOn ? "On" : "Off")
    }
}

extension ToggleStyle where Self == CDSToggleStyle {
    static func cds(_ variant: ToggleVariant = .primary) -> CDSToggleStyle {
        CDSToggleStyle(variant: variant)
    }
}

#if DEBUG
#Preview("ToggleStyle — style a SwiftUI Toggle") {
    CDSThemeProvider {
        TogglePreview()
            .padding()
    }
}

private struct TogglePreview: View {
    @State private var notifications = true
    @State private var biometrics = false
    @State private var destructive = true

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Toggle("Notifications (primary)", isOn: $notifications)
                .toggleStyle(.cds(.primary))
            Toggle("Biometrics (positive)", isOn: $biometrics)
                .toggleStyle(.cds(.positive))
            Toggle("Sell (negative)", isOn: $destructive)
                .toggleStyle(.cds(.negative))
            Toggle("Disabled", isOn: .constant(true))
                .toggleStyle(.cds(.primary))
                .disabled(true)
        }
    }
}

#endif
