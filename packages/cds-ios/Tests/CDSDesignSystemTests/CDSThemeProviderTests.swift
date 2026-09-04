import SwiftUI
import XCTest
@testable import CDSDesignSystem

/// Behavior tests for the theme providers. There's no SwiftUI render host in a pure SwiftPM
/// `swift test` target, so these exercise the resolution/inversion LOGIC that the providers wrap
/// (``CDSThemeSet/resolve(_:)`` and ``CDSInvertedThemeEnvironment``) rather than view rendering,
/// mirroring how ``CDSThemeTests`` models logic instead of layout.
final class CDSThemeProviderTests: XCTestCase {
    // MARK: - (a) Scheme-dependent resolution

    func testResolvingSetPicksSchemeDependentSlices() {
        let set = CDSThemeSet.default
        let light = set.resolve(.light)
        let dark = set.resolve(.dark)

        // Scheme-dependent axes follow the requested scheme.
        XCTAssertEqual(light.colorScheme, .light)
        XCTAssertEqual(dark.colorScheme, .dark)
        XCTAssertEqual(light.colors, set.light)
        XCTAssertEqual(dark.colors, set.dark)
        XCTAssertEqual(light.spectrum, set.lightSpectrum)
        XCTAssertEqual(dark.spectrum, set.darkSpectrum)
        XCTAssertEqual(light.illustrationColors, set.lightIllustrationColors)
        XCTAssertEqual(dark.illustrationColors, set.darkIllustrationColors)

        // Light and dark actually differ where they should.
        XCTAssertNotEqual(light.colors, dark.colors)
        XCTAssertNotEqual(light.spectrum, dark.spectrum)

        // Scheme-independent scales pass through unchanged.
        XCTAssertEqual(light.spacing, dark.spacing)
        XCTAssertEqual(light.radius, dark.radius)
        XCTAssertEqual(light.typography, dark.typography)
    }

    // MARK: - (b) Inversion flips the scheme; double inversion is identity

    func testInversionFlipsSchemeFromStoredTheme() {
        let set = CDSThemeSet.default
        let storedLight = set.resolve(.light)

        let inverted = CDSInvertedThemeEnvironment.resolved(
            stored: storedLight,
            set: set,
            scheme: .light,
            isPreview: false
        )
        XCTAssertEqual(inverted.colorScheme, .dark)
        XCTAssertEqual(inverted, set.resolve(.dark))

        let storedDark = set.resolve(.dark)
        let invertedFromDark = CDSInvertedThemeEnvironment.resolved(
            stored: storedDark,
            set: set,
            scheme: .dark,
            isPreview: false
        )
        XCTAssertEqual(invertedFromDark.colorScheme, .light)
    }

    func testDoubleInversionReturnsOriginalScheme() {
        let set = CDSThemeSet.default
        let storedLight = set.resolve(.light)

        let once = CDSInvertedThemeEnvironment.resolved(
            stored: storedLight,
            set: set,
            scheme: .light,
            isPreview: false
        )
        // Feeding the once-inverted theme back through inversion returns to the original.
        let twice = CDSInvertedThemeEnvironment.resolved(
            stored: once,
            set: set,
            scheme: once.colorScheme,
            isPreview: false
        )
        XCTAssertEqual(twice.colorScheme, storedLight.colorScheme)
        XCTAssertEqual(twice, storedLight)
    }

    // MARK: - (c) Nested / override theme set resolves overridden tokens through inversion

    func testInvertedProviderResolvesOverriddenTokensOfNestedSet() {
        // A rebranded set that overrides the *dark* slice — the scheme inversion will land on.
        let brandDark = Color(cdsHex: 0x7C3AED)
        let set = cdsTheme {
            $0.id = "acme"
            $0.dark.bgPrimary = brandDark
            $0.spacing.x2 = 24
        }

        // Starting from the light theme, inverting must resolve the overridden dark tokens.
        let inverted = CDSInvertedThemeEnvironment.resolved(
            stored: set.resolve(.light),
            set: set,
            scheme: .light,
            isPreview: false
        )
        XCTAssertEqual(inverted.colorScheme, .dark)
        XCTAssertEqual(inverted.colors.bgPrimary, brandDark)
        // Scheme-independent override carries through too.
        XCTAssertEqual(inverted.spacing.x2, 24)
    }

    // MARK: - (d) No-ancestor fail-loud contract

    // The trapping `CDSInvertedThemeEnvironment.resolved(...)` (and the view's use of it) calls
    // `preconditionFailure` when there is no `CDSThemeProvider` ancestor outside a preview. That is
    // uncatchable in XCTest, so we assert the contract via the non-trapping `resolvedOrNil` core
    // instead of crashing the runner.
    func testInvertedProviderReturnsNilWithoutAncestorOutsidePreview() {
        XCTAssertNil(
            CDSInvertedThemeEnvironment.resolvedOrNil(
                stored: nil,
                set: .default,
                scheme: .light,
                isPreview: false
            )
        )
    }

    func testInvertedProviderFallsBackToInvertedDefaultInPreview() {
        // Mirrors the `\.cdsTheme` preview fallback: an unwrapped inverted preview renders the
        // default theme resolved against the opposite of the preview's scheme.
        let previewLight = CDSInvertedThemeEnvironment.resolvedOrNil(
            stored: nil,
            set: .default,
            scheme: .light,
            isPreview: true
        )
        XCTAssertEqual(previewLight, CDSThemeSet.default.resolve(.dark))

        let previewDark = CDSInvertedThemeEnvironment.resolvedOrNil(
            stored: nil,
            set: .default,
            scheme: .dark,
            isPreview: true
        )
        XCTAssertEqual(previewDark, CDSThemeSet.default.resolve(.light))
    }

    func testInvertedProviderResolvesWhenAncestorPresent() {
        // With a stored theme (i.e. a CDSThemeProvider ancestor), resolution never returns nil.
        XCTAssertNotNil(
            CDSInvertedThemeEnvironment.resolvedOrNil(
                stored: CDSThemeSet.default.resolve(.light),
                set: .default,
                scheme: .light,
                isPreview: false
            )
        )
    }
}
