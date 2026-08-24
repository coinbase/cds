import SwiftUI
import XCTest
@testable import CDSDesignSystem

final class CDSThemeTests: XCTestCase {
    func testSpectrumTablesCoverAllHues() {
        let hues = ["blue", "green", "orange", "gray", "indigo", "pink", "purple", "red", "teal", "yellow", "chartreuse"]
        let shades = ["0", "5", "10", "15", "20", "30", "40", "50", "60", "70", "80", "90", "100"]
        for hue in hues {
            for shade in shades {
                let key = hue + shade
                XCTAssertNotNil(CDSSpectrumData.light[key], "light spectrum missing \(key)")
                XCTAssertNotNil(CDSSpectrumData.dark[key], "dark spectrum missing \(key)")
            }
        }
    }

    func testThemeResolvesByScheme() {
        XCTAssertEqual(CDSTheme.resolve(.light).colorScheme, .light)
        XCTAssertEqual(CDSTheme.resolve(.dark).colorScheme, .dark)
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
        // Swap blue60 and the derived accentBoldBlue / bgPrimary should follow.
        var palette = CDSSpectrumData.light
        palette["blue60"] = "1,2,3"
        let colors = CDSColors.lightDeriving(from: palette)
        let primary = colors.bgPrimary.resolve(in: .init())
        XCTAssertEqual(Double(primary.red), 1.0 / 255.0, accuracy: 0.01)
        XCTAssertEqual(Double(primary.green), 2.0 / 255.0, accuracy: 0.01)
        XCTAssertEqual(Double(primary.blue), 3.0 / 255.0, accuracy: 0.01)
    }

    func testIllustrationColorsResolveByScheme() {
        XCTAssertEqual(
            CDSThemeSet.default.resolve(.light).illustration.primary.resolve(in: .init()).blue,
            Color(cdsRGB: 0, 82, 255).resolve(in: .init()).blue,
            accuracy: 0.01
        )
    }
}
