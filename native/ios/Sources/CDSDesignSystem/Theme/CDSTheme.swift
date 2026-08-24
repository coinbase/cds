import SwiftUI

/// The resolved theme for the current color scheme.
///
/// Analogous to the object returned by RN's `useTheme()`. Spacing / radius / typography
/// are scheme-independent and exposed as static scales (`CDSSpacing`, `CDSRadius`, …);
/// `colors` is the scheme-dependent slice.
public struct CDSTheme: Sendable {
    public let colors: CDSColors
    public let colorScheme: ColorScheme

    public init(colors: CDSColors, colorScheme: ColorScheme) {
        self.colors = colors
        self.colorScheme = colorScheme
    }

    public static let light = CDSTheme(colors: .light, colorScheme: .light)
    public static let dark = CDSTheme(colors: .dark, colorScheme: .dark)

    public static func resolve(_ scheme: ColorScheme) -> CDSTheme {
        scheme == .dark ? .dark : .light
    }
}

/// A complete theme: its light and dark semantic color sets.
///
/// This is the object a consumer supplies to ``CDSThemeProvider`` to apply a custom theme —
/// analogous to passing a `ThemeConfig` to the RN `ThemeProvider`. The correct set is chosen
/// automatically based on the active color scheme.
public struct CDSThemeSet: Sendable {
    public let light: CDSColors
    public let dark: CDSColors

    public init(light: CDSColors, dark: CDSColors) {
        self.light = light
        self.dark = dark
    }

    /// The built-in CDS default theme.
    public static let `default` = CDSThemeSet(light: .light, dark: .dark)

    public func resolve(_ scheme: ColorScheme) -> CDSTheme {
        CDSTheme(colors: scheme == .dark ? dark : light, colorScheme: scheme)
    }
}

private struct CDSThemeKey: EnvironmentKey {
    static let defaultValue: CDSTheme = .light
}

public extension EnvironmentValues {
    /// The active CDS theme. Read it in components via `@Environment(\.cdsTheme) var theme`.
    var cdsTheme: CDSTheme {
        get { self[CDSThemeKey.self] }
        set { self[CDSThemeKey.self] = newValue }
    }
}

/// Injects a `CDSTheme` into the environment, analogous to RN's `ThemeProvider`.
///
/// - Pass a custom `theme` (a ``CDSThemeSet``) to rebrand a subtree; defaults to the built-in
///   CDS theme.
/// - By default it follows the system color scheme (`activeColorScheme` in RN). Pass an
///   explicit `colorScheme` to force light or dark for a subtree.
///
/// Providers nest: an inner provider overrides the theme for its subtree while still
/// inheriting the surrounding color scheme unless it forces its own.
public struct CDSThemeProvider<Content: View>: View {
    @Environment(\.colorScheme) private var systemScheme

    private let theme: CDSThemeSet
    private let forcedScheme: ColorScheme?
    private let content: Content

    public init(
        theme: CDSThemeSet = .default,
        colorScheme: ColorScheme? = nil,
        @ViewBuilder content: () -> Content
    ) {
        self.theme = theme
        self.forcedScheme = colorScheme
        self.content = content()
    }

    public var body: some View {
        let scheme = forcedScheme ?? systemScheme
        content
            .environment(\.cdsTheme, theme.resolve(scheme))
            .environment(\.colorScheme, scheme)
    }
}
