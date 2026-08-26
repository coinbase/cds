import Foundation
import SwiftUI

/// The fully-resolved theme for the current color scheme.
///
/// Analogous to the object returned by RN's `useTheme()`. `colors` and `illustration` are the
/// scheme-dependent slices; the scales (`spacing`, `radius`, `typography`, …) are
/// scheme-independent but still carried here so components read everything from one place.
public struct CDSTheme: Sendable, Equatable {
    public let id: String
    /// The raw spectrum palette for the resolved scheme — read `theme.spectrum[.blue][.step60]`
    /// to reach past the semantic tier when necessary.
    public let spectrum: CDSSpectrum
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

    // `internal`: a resolved theme is produced by ``CDSThemeSet/resolve(_:)``, not built by hand.
    // Keeping the schema out of the public initializer makes adding a token a non-breaking change.
    init(
        id: String = "cds-default",
        spectrum: CDSSpectrum,
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
        self.spectrum = spectrum
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
public struct CDSThemeSet: Sendable, Equatable {
    public var id: String
    public var lightSpectrum: CDSSpectrum
    public var darkSpectrum: CDSSpectrum
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

    // Every parameter is defaulted, so adding a token to the set stays a source-compatible
    // change: existing call sites keep compiling. Combined with ``cdsTheme(base:_:)`` this is
    // the evolution-safe construction surface for a full theme.
    public init(
        id: String = "cds-default",
        lightSpectrum: CDSSpectrum = .light,
        darkSpectrum: CDSSpectrum = .dark,
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
        self.lightSpectrum = lightSpectrum
        self.darkSpectrum = darkSpectrum
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

    /// Return a copy with a handful of axes overridden. See also ``cdsTheme(base:_:)``.
    public func with(_ mutate: (inout CDSThemeSet) -> Void) -> CDSThemeSet {
        var copy = self
        mutate(&copy)
        return copy
    }

    public func resolve(_ scheme: ColorScheme) -> CDSTheme {
        CDSTheme(
            id: id,
            spectrum: scheme == .dark ? darkSpectrum : lightSpectrum,
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

/// Builds a ``CDSThemeSet`` by overriding tokens on a base theme — the ergonomic, evolution-safe
/// construction surface, mirroring Android's `cdsTheme { }` DSL.
///
/// ```swift
/// let acme = cdsTheme {
///     $0.id = "acme"
///     $0.light.bgPrimary = Color(cdsRGB: 124, 58, 237)
///     $0.dark.bgPrimary = Color(cdsRGB: 124, 58, 237)
///     $0.spacing.x2 = 24
/// }
/// ```
///
/// To rebrand from a custom palette, override the spectrum and re-derive the semantic colors:
///
/// ```swift
/// let brand = cdsTheme {
///     $0.lightSpectrum = $0.lightSpectrum.with { $0.blue = $0.blue.with { $0.step60 = brandBlue } }
///     $0.light = .lightDeriving(from: $0.lightSpectrum)
/// }
/// ```
///
/// Adding a token to the theme never changes this signature, so a from-a-base build stays
/// compiling across minor versions.
public func cdsTheme(
    base: CDSThemeSet = .default,
    _ block: (inout CDSThemeSet) -> Void
) -> CDSThemeSet {
    base.with(block)
}

// `nil` means no ``CDSThemeProvider`` is installed above the reader. Storing an optional (rather
// than defaulting to the light theme) is what lets a missing provider be *detected* instead of
// silently papered over — see ``CDSThemeEnvironment``.
private struct CDSThemeKey: EnvironmentKey {
    static let defaultValue: CDSTheme? = nil
}

private struct CDSThemeSetKey: EnvironmentKey {
    static let defaultValue: CDSThemeSet = .default
}

/// Resolves what a `\.cdsTheme` reader sees, and decides how to treat a missing provider.
///
/// This mirrors Android's `CdsTheme.current`: a component with no ``CDSThemeProvider`` ancestor
/// renders the default theme inside an Xcode Preview (so unwrapped component previews work), and
/// hard-fails everywhere else so a missing provider surfaces immediately in development rather
/// than shipping subtly-wrong colors.
enum CDSThemeEnvironment {
    static func resolved(stored: CDSTheme?, scheme: ColorScheme, isPreview: Bool) -> CDSTheme {
        if let stored { return stored }
        if isPreview { return CDSThemeSet.default.resolve(scheme) }
        preconditionFailure("No CDS theme found. Wrap your views in CDSThemeProvider { … }.")
    }

    /// Whether the process is rendering an Xcode Preview — the SwiftUI analog of Compose's
    /// `LocalInspectionMode.current`.
    static let isRunningInXcodePreview: Bool =
        ProcessInfo.processInfo.environment["XCODE_RUNNING_FOR_PREVIEWS"] == "1"
}

extension EnvironmentValues {
    /// Non-trapping storage the providers write to.
    ///
    /// The public ``cdsTheme`` read accessor is intentionally get-only + trapping. Injecting a
    /// value through a *computed, writable* key path is unsafe here: SwiftUI's
    /// `swift_setAtWritableKeyPath` materializes a mutable address by first calling the property's
    /// getter, so writing through a trapping getter would crash during injection. Providers write
    /// this plain optional instead, whose getter never traps.
    var cdsThemeStorage: CDSTheme? {
        get { self[CDSThemeKey.self] }
        set { self[CDSThemeKey.self] = newValue }
    }
}

public extension EnvironmentValues {
    /// The active resolved CDS theme. Read it in components via `@Environment(\.cdsTheme) var theme`.
    ///
    /// Requires a ``CDSThemeProvider`` ancestor at runtime; without one, reading this traps
    /// (except inside an Xcode Preview, which falls back to the default theme).
    ///
    /// This is read-only by design — install a theme with ``CDSThemeProvider`` rather than setting
    /// `\.cdsTheme` directly (see ``cdsThemeStorage`` for why).
    var cdsTheme: CDSTheme {
        CDSThemeEnvironment.resolved(
            stored: self[CDSThemeKey.self],
            scheme: self.colorScheme,
            isPreview: CDSThemeEnvironment.isRunningInXcodePreview
        )
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
        // `resolve` runs on every body pass, but the injected value is `Equatable`: when a
        // re-render produces a theme equal to the previous one (e.g. an ancestor recomposed
        // without changing tokens), SwiftUI's environment diffing skips invalidating the
        // views that read `\.cdsTheme`. This is the SwiftUI analog of Compose keying
        // `remember(theme, colorScheme)` on value equality.
        content
            .environment(\.cdsThemeStorage, theme.resolve(scheme))
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
            .environment(\.cdsThemeStorage, themeSet.resolve(inverse))
            .environment(\.colorScheme, inverse)
    }
}
