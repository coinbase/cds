import Foundation
import SwiftUI

/// The fully-resolved theme for the current color scheme (RN's `useTheme()` result).
///
/// `colors` and `illustrationColors` change with the color scheme (light/dark); the scales
/// (`spacing`, `radius`, `typography`, …) do not. Any slice can still vary by brand theme.
public struct CDSTheme: Sendable, Equatable {
    public let id: String
    /// The raw spectrum palette for the resolved scheme — read `theme.spectrum[.blue][.step60]`
    /// to reach past the semantic tier when necessary.
    public let spectrum: CDSSpectrum
    public let colors: CDSColors
    public let illustrationColors: CDSIllustrationColors
    public let spacing: CDSSpacing
    public let radius: CDSRadius
    public let borderWidth: CDSBorderWidth
    public let iconSize: CDSIconSize
    public let avatarSize: CDSAvatarSize
    public let controlSize: CDSControlSize
    public let typography: CDSTypography
    public let shadow: CDSShadowScale
    public let colorScheme: ColorScheme

    // Resolved themes come from ``CDSThemeSet/resolve(_:)``; a non-public init lets new tokens be
    // added without breaking callers.
    init(
        id: String = "cds-default",
        spectrum: CDSSpectrum,
        colors: CDSColors,
        illustrationColors: CDSIllustrationColors,
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
        self.illustrationColors = illustrationColors
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

/// A complete theme configuration (RN's `ThemeConfig`): the light + dark color/illustration sets
/// plus the scales. Supplied to ``CDSThemeProvider``. All fields default to the built-in CDS theme,
/// so a consumer can override only the tokens they care about.
public struct CDSThemeSet: Sendable, Equatable {
    public var id: String
    public var lightSpectrum: CDSSpectrum
    public var darkSpectrum: CDSSpectrum
    public var light: CDSColors
    public var dark: CDSColors
    public var lightIllustrationColors: CDSIllustrationColors
    public var darkIllustrationColors: CDSIllustrationColors
    public var spacing: CDSSpacing
    public var radius: CDSRadius
    public var borderWidth: CDSBorderWidth
    public var iconSize: CDSIconSize
    public var avatarSize: CDSAvatarSize
    public var controlSize: CDSControlSize
    public var typography: CDSTypography
    public var shadow: CDSShadowScale

    // Every parameter is defaulted, so adding a token stays source-compatible.
    public init(
        id: String = "cds-default",
        lightSpectrum: CDSSpectrum = .light,
        darkSpectrum: CDSSpectrum = .dark,
        light: CDSColors = .light,
        dark: CDSColors = .dark,
        lightIllustrationColors: CDSIllustrationColors = .light,
        darkIllustrationColors: CDSIllustrationColors = .dark,
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
        self.lightIllustrationColors = lightIllustrationColors
        self.darkIllustrationColors = darkIllustrationColors
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
            illustrationColors: scheme == .dark ? darkIllustrationColors : lightIllustrationColors,
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
///     $0.light.bgPrimary = Color(cdsHex: 0x7C3AED)
///     $0.dark.bgPrimary = Color(cdsHex: 0x7C3AED)
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
public func cdsTheme(
    base: CDSThemeSet = .default,
    _ block: (inout CDSThemeSet) -> Void
) -> CDSThemeSet {
    base.with(block)
}

// `nil` means no ``CDSThemeProvider`` is installed above the reader, which lets a missing provider
// be detected — see ``CDSThemeEnvironment``.
private struct CDSThemeKey: EnvironmentKey {
    static let defaultValue: CDSTheme? = nil
}

private struct CDSThemeSetKey: EnvironmentKey {
    static let defaultValue: CDSThemeSet = .default
}

/// Resolves what a `\.cdsTheme` reader sees. With no ``CDSThemeProvider`` ancestor it renders the
/// default theme inside an Xcode Preview (so unwrapped previews work) and traps everywhere else, so
/// a missing provider surfaces immediately.
enum CDSThemeEnvironment {
    /// Non-trapping core of the resolution rules: returns the stored theme, the default theme in a
    /// preview, or `nil` when there is no ``CDSThemeProvider`` ancestor (and we're not previewing).
    /// Split out so the "missing provider" branch is unit-testable without a `preconditionFailure`.
    static func resolvedOrNil(stored: CDSTheme?, scheme: ColorScheme, isPreview: Bool) -> CDSTheme? {
        if let stored { return stored }
        if isPreview { return CDSThemeSet.default.resolve(scheme) }
        return nil
    }

    static func resolved(stored: CDSTheme?, scheme: ColorScheme, isPreview: Bool) -> CDSTheme {
        if let theme = resolvedOrNil(stored: stored, scheme: scheme, isPreview: isPreview) {
            return theme
        }
        preconditionFailure("No CDS theme found. Wrap your views in CDSThemeProvider { … }.")
    }

    /// Whether the process is rendering an Xcode Preview — the SwiftUI analog of Compose's
    /// `LocalInspectionMode.current`.
    static let isRunningInXcodePreview: Bool =
        ProcessInfo.processInfo.environment["XCODE_RUNNING_FOR_PREVIEWS"] == "1"
}

/// Resolves what an ``InvertedThemeProvider`` installs for its subtree. Mirrors
/// ``CDSThemeEnvironment`` but flips the color scheme: it re-resolves the ambient ``CDSThemeSet``
/// against the opposite scheme, keeps the Xcode Preview fallback, and — matching Android's
/// `CdsInvertedThemeProvider` — fails loudly when there is no ``CDSThemeProvider`` ancestor, since
/// there is nothing to invert without one.
enum CDSInvertedThemeEnvironment {
    /// Non-trapping core: returns the inverted theme, or `nil` when there is no ``CDSThemeProvider``
    /// ancestor (and we're not previewing). Split out so the "missing provider" branch is
    /// unit-testable without a `preconditionFailure`.
    static func resolvedOrNil(
        stored: CDSTheme?,
        set: CDSThemeSet,
        scheme: ColorScheme,
        isPreview: Bool
    ) -> CDSTheme? {
        guard let base = CDSThemeEnvironment.resolvedOrNil(
            stored: stored,
            scheme: scheme,
            isPreview: isPreview
        ) else {
            return nil
        }
        let inverse: ColorScheme = base.colorScheme == .dark ? .light : .dark
        return set.resolve(inverse)
    }

    static func resolved(
        stored: CDSTheme?,
        set: CDSThemeSet,
        scheme: ColorScheme,
        isPreview: Bool
    ) -> CDSTheme {
        if let theme = resolvedOrNil(stored: stored, set: set, scheme: scheme, isPreview: isPreview) {
            return theme
        }
        preconditionFailure("InvertedThemeProvider requires a CDSThemeProvider ancestor.")
    }
}

extension EnvironmentValues {
    /// Non-trapping storage the providers write to. The public ``cdsTheme`` accessor is get-only and
    /// traps on a missing provider; providers write this plain optional so injection never trips it.
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
        // The injected theme is `Equatable`, so SwiftUI skips invalidating `\.cdsTheme` readers when
        // the resolved tokens are unchanged.
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
///
/// Requires a ``CDSThemeProvider`` ancestor — there is nothing to invert without one — and traps
/// with a clear message when used without one, matching Android's `CdsInvertedThemeProvider`. The
/// only exception is an Xcode Preview, which falls back to the default theme (inverted) so
/// unwrapped previews render instead of crashing.
public struct InvertedThemeProvider<Content: View>: View {
    // Read the non-trapping storage (not `\.cdsTheme`) so the missing-ancestor case surfaces with
    // this provider's own message via ``CDSInvertedThemeEnvironment`` rather than the generic
    // `\.cdsTheme` trap.
    @Environment(\.cdsThemeStorage) private var storedTheme
    @Environment(\.cdsThemeSet) private var themeSet
    @Environment(\.colorScheme) private var scheme
    private let content: Content

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    public var body: some View {
        let inverted = CDSInvertedThemeEnvironment.resolved(
            stored: storedTheme,
            set: themeSet,
            scheme: scheme,
            isPreview: CDSThemeEnvironment.isRunningInXcodePreview
        )
        content
            .environment(\.cdsThemeStorage, inverted)
            .environment(\.colorScheme, inverted.colorScheme)
    }
}
