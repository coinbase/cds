import SwiftUI

/// The fully-resolved theme for the current color scheme.
///
/// Analogous to the object returned by RN's `useTheme()`. `colors` and `illustration` are the
/// scheme-dependent slices; the scales (`spacing`, `radius`, `typography`, …) are
/// scheme-independent but still carried here so components read everything from one place.
public struct CDSTheme: Sendable {
    public let id: String
    public let colors: CDSColors
    public let illustration: CDSIllustrationColors
    public let spacing: CDSSpacing
    public let radius: CDSRadius
    public let borderWidth: CDSBorderWidth
    public let iconSize: CDSIconSize
    public let avatarSize: CDSAvatarSize
    public let controlSize: CDSControlSize
    public let typography: CDSTypography
    public let shadow: CDSShadowScale
    public let colorScheme: ColorScheme

    public init(
        id: String = "cds-default",
        colors: CDSColors,
        illustration: CDSIllustrationColors,
        spacing: CDSSpacing,
        radius: CDSRadius,
        borderWidth: CDSBorderWidth,
        iconSize: CDSIconSize,
        avatarSize: CDSAvatarSize,
        controlSize: CDSControlSize,
        typography: CDSTypography,
        shadow: CDSShadowScale,
        colorScheme: ColorScheme
    ) {
        self.id = id
        self.colors = colors
        self.illustration = illustration
        self.spacing = spacing
        self.radius = radius
        self.borderWidth = borderWidth
        self.iconSize = iconSize
        self.avatarSize = avatarSize
        self.controlSize = controlSize
        self.typography = typography
        self.shadow = shadow
        self.colorScheme = colorScheme
    }

    public static let light = CDSThemeSet.default.resolve(.light)
    public static let dark = CDSThemeSet.default.resolve(.dark)

    public static func resolve(_ scheme: ColorScheme) -> CDSTheme {
        CDSThemeSet.default.resolve(scheme)
    }
}

/// A complete theme configuration: its scheme-dependent color/illustration sets plus the
/// scheme-independent scales. This is the object a consumer supplies to ``CDSThemeProvider``,
/// analogous to a `ThemeConfig` in RN. All fields default to the built-in CDS theme so a
/// consumer can override just the tokens they care about.
public struct CDSThemeSet: Sendable {
    public var id: String
    public var light: CDSColors
    public var dark: CDSColors
    public var lightIllustration: CDSIllustrationColors
    public var darkIllustration: CDSIllustrationColors
    public var spacing: CDSSpacing
    public var radius: CDSRadius
    public var borderWidth: CDSBorderWidth
    public var iconSize: CDSIconSize
    public var avatarSize: CDSAvatarSize
    public var controlSize: CDSControlSize
    public var typography: CDSTypography
    public var shadow: CDSShadowScale

    public init(
        id: String = "cds-default",
        light: CDSColors = .light,
        dark: CDSColors = .dark,
        lightIllustration: CDSIllustrationColors = .light,
        darkIllustration: CDSIllustrationColors = .dark,
        spacing: CDSSpacing = .default,
        radius: CDSRadius = .default,
        borderWidth: CDSBorderWidth = .default,
        iconSize: CDSIconSize = .default,
        avatarSize: CDSAvatarSize = .default,
        controlSize: CDSControlSize = .default,
        typography: CDSTypography = .default,
        shadow: CDSShadowScale = .default
    ) {
        self.id = id
        self.light = light
        self.dark = dark
        self.lightIllustration = lightIllustration
        self.darkIllustration = darkIllustration
        self.spacing = spacing
        self.radius = radius
        self.borderWidth = borderWidth
        self.iconSize = iconSize
        self.avatarSize = avatarSize
        self.controlSize = controlSize
        self.typography = typography
        self.shadow = shadow
    }

    /// The built-in CDS default theme.
    public static let `default` = CDSThemeSet()

    public func resolve(_ scheme: ColorScheme) -> CDSTheme {
        CDSTheme(
            id: id,
            colors: scheme == .dark ? dark : light,
            illustration: scheme == .dark ? darkIllustration : lightIllustration,
            spacing: spacing,
            radius: radius,
            borderWidth: borderWidth,
            iconSize: iconSize,
            avatarSize: avatarSize,
            controlSize: controlSize,
            typography: typography,
            shadow: shadow,
            colorScheme: scheme
        )
    }
}

private struct CDSThemeKey: EnvironmentKey {
    static let defaultValue: CDSTheme = CDSThemeSet.default.resolve(.light)
}

private struct CDSThemeSetKey: EnvironmentKey {
    static let defaultValue: CDSThemeSet = .default
}

public extension EnvironmentValues {
    /// The active resolved CDS theme. Read it in components via `@Environment(\.cdsTheme) var theme`.
    var cdsTheme: CDSTheme {
        get { self[CDSThemeKey.self] }
        set { self[CDSThemeKey.self] = newValue }
    }

    /// The active theme configuration (light + dark). Used by ``InvertedThemeProvider`` to
    /// re-resolve the opposite color scheme.
    var cdsThemeSet: CDSThemeSet {
        get { self[CDSThemeSetKey.self] }
        set { self[CDSThemeSetKey.self] = newValue }
    }
}

/// Injects a `CDSTheme` into the environment, analogous to RN's `ThemeProvider`.
///
/// - Pass a custom `theme` (a ``CDSThemeSet``) to rebrand a subtree; defaults to the built-in
///   CDS theme.
/// - By default it follows the system color scheme. Pass an explicit `colorScheme` to force
///   light or dark for a subtree.
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
            .environment(\.cdsThemeSet, theme)
            .environment(\.colorScheme, scheme)
    }
}

/// Flips the active color scheme for its subtree, analogous to RN's `InvertedThemeProvider`.
///
/// Re-resolves the current ``CDSThemeSet`` against the opposite scheme (dark → light and
/// vice-versa) while keeping the same theme configuration.
public struct InvertedThemeProvider<Content: View>: View {
    @Environment(\.cdsTheme) private var theme
    @Environment(\.cdsThemeSet) private var themeSet
    private let content: Content

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    public var body: some View {
        let inverse: ColorScheme = theme.colorScheme == .dark ? .light : .dark
        content
            .environment(\.cdsTheme, themeSet.resolve(inverse))
            .environment(\.colorScheme, inverse)
    }
}
