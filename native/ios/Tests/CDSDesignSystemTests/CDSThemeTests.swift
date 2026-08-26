import SwiftUI
import XCTest
@testable import CDSDesignSystem

final class CDSThemeTests: XCTestCase {
    func testSpectrumCoversAllHuesAndSteps() {
        for hue in CDSSpectrumHueToken.allCases {
            let lightRamp = CDSSpectrum.light[hue]
            let darkRamp = CDSSpectrum.dark[hue]
            for step in CDSColorRampToken.allCases {
                // Every hue/step resolves to a concrete Color (strong typing: no optional lookup).
                _ = lightRamp[step]
                _ = darkRamp[step]
            }
        }
        XCTAssertEqual(CDSSpectrumHueToken.allCases.count, 11)
        XCTAssertEqual(CDSColorRampToken.allCases.count, 13)
    }

    func testTokenNamesUseCanonicalCdsSpelling() {
        XCTAssertEqual(CDSColorToken.fgMuted.tokenName, "fgMuted")
        XCTAssertEqual(CDSColorToken.bgLinePrimarySubtle.tokenName, "bgLinePrimarySubtle")
        XCTAssertEqual(CDSSpectrumHueToken.blue.tokenName, "blue")
        XCTAssertEqual(CDSColorRampToken.step60.tokenName, "60")
        XCTAssertEqual(CDSColorRampToken.step0.tokenName, "0")
        XCTAssertEqual(CDSTextStyle.title1.tokenName, "title1")
    }

    func testColorSubscriptMatchesStoredProperties() {
        let colors = CDSColors.light
        XCTAssertEqual(colors[.fg], colors.fg)
        XCTAssertEqual(colors[.bgPrimary], colors.bgPrimary)
        XCTAssertEqual(colors[.accentBoldBlue], colors.accentBoldBlue)
        XCTAssertEqual(colors[.transparent], colors.transparent)
        // The subscript is exhaustive over every token in the enum.
        for token in CDSColorToken.allCases {
            _ = colors[token]
        }
    }

    func testSpectrumTokenPathResolvesSameColorAsProperty() {
        let s = CDSSpectrum.light
        XCTAssertEqual(s[.blue][.step60], s.blue.step60)
    }

    func testThemeResolvesByScheme() {
        XCTAssertEqual(CDSTheme.resolve(.light).colorScheme, .light)
        XCTAssertEqual(CDSTheme.resolve(.dark).colorScheme, .dark)
    }

    func testThemeCarriesResolvedSpectrum() {
        XCTAssertEqual(CDSTheme.resolve(.light).spectrum.blue.step60, CDSSpectrum.light.blue.step60)
        XCTAssertEqual(CDSTheme.resolve(.dark).spectrum.blue.step60, CDSSpectrum.dark.blue.step60)
    }

    func testSpectrumStringParsesToComponents() {
        // "0,82,255" (blue60 light) → ~ (0, 0.32, 1.0)
        let resolved = Color(cdsSpectrum: "0,82,255").resolve(in: .init())
        XCTAssertEqual(Double(resolved.red), 0, accuracy: 0.01)
        XCTAssertEqual(Double(resolved.green), 82.0 / 255.0, accuracy: 0.01)
        XCTAssertEqual(Double(resolved.blue), 1.0, accuracy: 0.01)
    }

    func testDefaultThemeCarriesAllScales() {
        let theme = CDSThemeSet.default.resolve(.light)
        XCTAssertEqual(theme.spacing.x2, 16)
        XCTAssertEqual(theme.radius.r200, 8)
        XCTAssertEqual(theme.borderWidth.w100, 1)
        XCTAssertEqual(theme.iconSize.m, 24)
        XCTAssertEqual(theme.avatarSize.xl, 40)
        XCTAssertEqual(theme.controlSize.switchWidth, 52)
        XCTAssertEqual(theme.shadow.elevation2.radius, 24)
    }

    func testTypographyIsThemeableAndDefaults() {
        XCTAssertEqual(CDSTypography.default[.body].size, 16)
        XCTAssertTrue(CDSTypography.default[.caption].uppercased)

        let custom = CDSTypography.default.with { $0[.body] = CDSTextAttributes(size: 18, lineHeight: 26, weight: .medium) }
        XCTAssertEqual(custom[.body].size, 18)
        // Untouched roles keep defaults.
        XCTAssertEqual(custom[.title1].size, 28)
    }

    func testCustomColorThemeOverridesSelectively() {
        let brand = CDSColors.light.with { $0.bgPrimary = Color(cdsRGB: 124, 58, 237) }
        let set = CDSThemeSet(light: brand)
        let resolved = set.resolve(.light).colors.bgPrimary.resolve(in: .init())
        XCTAssertEqual(Double(resolved.red), 124.0 / 255.0, accuracy: 0.01)
        XCTAssertEqual(Double(resolved.green), 58.0 / 255.0, accuracy: 0.01)
        XCTAssertEqual(Double(resolved.blue), 237.0 / 255.0, accuracy: 0.01)
    }

    func testDerivingFromCustomSpectrumRebrandsAccents() {
        // Swap blue60 in a typed spectrum; the derived bgPrimary should follow.
        let palette = CDSSpectrum.light.with {
            $0.blue = $0.blue.with { $0.step60 = Color(cdsRGB: 1, 2, 3) }
        }
        let colors = CDSColors.lightDeriving(from: palette)
        let primary = colors.bgPrimary.resolve(in: .init())
        XCTAssertEqual(Double(primary.red), 1.0 / 255.0, accuracy: 0.01)
        XCTAssertEqual(Double(primary.green), 2.0 / 255.0, accuracy: 0.01)
        XCTAssertEqual(Double(primary.blue), 3.0 / 255.0, accuracy: 0.01)
    }

    func testCdsThemeBuilderOverridesFromBase() {
        let acme = cdsTheme {
            $0.id = "acme"
            $0.light.bgPrimary = Color(cdsRGB: 124, 58, 237)
            $0.spacing.x2 = 24
        }
        XCTAssertEqual(acme.id, "acme")
        XCTAssertEqual(acme.spacing.x2, 24)
        // Untouched axes inherit the default theme.
        XCTAssertEqual(acme.radius.r200, CDSRadius.default.r200)
        XCTAssertEqual(acme.dark.bgPrimary, CDSColors.dark.bgPrimary)

        let resolved = acme.resolve(.light).colors.bgPrimary.resolve(in: .init())
        XCTAssertEqual(Double(resolved.red), 124.0 / 255.0, accuracy: 0.01)
    }

    func testResolvingSameSetTwiceProducesEqualThemes() {
        // Load-bearing for SwiftUI environment diffing: two resolves of an unchanged set must
        // compare equal so theme-reading subviews aren't re-invalidated on a no-op re-render.
        let a = CDSThemeSet.default.resolve(.light)
        let b = CDSThemeSet.default.resolve(.light)
        XCTAssertEqual(a, b)
    }

    func testChangingAnyTokenBreaksThemeEquality() {
        let base = CDSThemeSet.default.resolve(.light)

        let colorChanged = cdsTheme { $0.light.bgPrimary = Color(cdsRGB: 1, 2, 3) }.resolve(.light)
        XCTAssertNotEqual(base, colorChanged)

        let spacingChanged = cdsTheme { $0.spacing.x2 = 999 }.resolve(.light)
        XCTAssertNotEqual(base, spacingChanged)

        let typographyChanged = cdsTheme {
            $0.typography[.body] = CDSTextAttributes(size: 99, lineHeight: 99, weight: .black)
        }.resolve(.light)
        XCTAssertNotEqual(base, typographyChanged)

        // Same tokens, different scheme resolves to a different theme.
        XCTAssertNotEqual(base, CDSThemeSet.default.resolve(.dark))
    }

    func testTokenTypesAreEquatable() {
        XCTAssertEqual(CDSColors.light, CDSColors.light)
        XCTAssertNotEqual(CDSColors.light, CDSColors.dark)
        XCTAssertEqual(CDSSpectrum.light, CDSSpectrum.light)
        XCTAssertEqual(CDSTypography.default, CDSTypography.default)
        XCTAssertEqual(CDSSpacing.default, CDSSpacing.default)
        XCTAssertEqual(CDSShadowScale.default, CDSShadowScale.default)
    }

    func testProviderValueTakesPrecedenceOverFallback() {
        let brand = cdsTheme { $0.light.bgPrimary = Color(cdsRGB: 1, 2, 3) }.resolve(.light)
        let resolved = CDSThemeEnvironment.resolved(stored: brand, scheme: .light, isPreview: false)
        XCTAssertEqual(resolved, brand)
    }

    func testNoProviderFallsBackToDefaultThemeInPreview() {
        // Mirrors Android's LocalInspectionMode fallback: unwrapped component previews render the
        // default theme (honoring the preview's color scheme) instead of trapping.
        XCTAssertEqual(
            CDSThemeEnvironment.resolved(stored: nil, scheme: .light, isPreview: true),
            CDSThemeSet.default.resolve(.light)
        )
        XCTAssertEqual(
            CDSThemeEnvironment.resolved(stored: nil, scheme: .dark, isPreview: true),
            CDSThemeSet.default.resolve(.dark)
        )
    }

    func testPreviewDetectionIsFalseUnderTests() {
        // The hard-fail path (no provider, not a preview) is exactly the case guarded here; we
        // can't assert the trap without crashing the suite, so we at least pin the detector.
        XCTAssertFalse(CDSThemeEnvironment.isRunningInXcodePreview)
    }

    func testIllustrationColorsResolveByScheme() {
        XCTAssertEqual(
            CDSThemeSet.default.resolve(.light).illustration.primary.resolve(in: .init()).blue,
            Color(cdsRGB: 0, 82, 255).resolve(in: .init()).blue,
            accuracy: 0.01
        )
    }
}
