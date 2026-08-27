import SwiftUI
import XCTest
@testable import CDSDesignSystem

/// Covers the pure style-mapping functions behind ``CDSButton`` and ``CDSSlideButton``: given a
/// resolved theme they must map each variant/size to the expected theme tokens.
final class ComponentStyleTests: XCTestCase {
    private let theme = CDSTheme.resolve(.light)

    func testButtonColorsSolidVariants() {
        let c = theme.colors
        let expected: [(CDSButtonVariant, Color, Color)] = [
            (.primary, c.bgPrimary, c.fgInverse),
            (.secondary, c.bgSecondary, c.fg),
            (.tertiary, c.bgTertiary, c.fg),
            (.positive, c.bgPositive, c.fgInverse),
            (.negative, c.bgNegative, c.fgInverse),
        ]
        for (variant, container, content) in expected {
            let colors = cdsButtonColors(variant, transparent: false, theme: theme)
            XCTAssertEqual(colors.container, container)
            XCTAssertEqual(colors.content, content)
        }
    }

    func testButtonColorsTransparentVariants() {
        let c = theme.colors
        let expected: [(CDSButtonVariant, Color)] = [
            (.primary, c.fgPrimary),
            (.secondary, c.fg),
            (.tertiary, c.fg),
            (.positive, c.fgPositive),
            (.negative, c.fgNegative),
        ]
        for (variant, content) in expected {
            let colors = cdsButtonColors(variant, transparent: true, theme: theme)
            // Transparent variants read correctly on any surface via a true `.clear` container.
            XCTAssertEqual(colors.container, .clear)
            XCTAssertEqual(colors.content, content)
        }
    }

    func testButtonMetricsBySize() {
        let space = theme.spacing
        let radius = theme.radius
        let icon = theme.iconSize

        let xs = cdsButtonMetrics(.xs, theme: theme)
        XCTAssertEqual(xs.paddingX, space.x2)
        XCTAssertEqual(xs.paddingY, space.x0_75)
        XCTAssertEqual(xs.radius, radius.r700)
        XCTAssertEqual(xs.iconSize, icon.s)
        XCTAssertEqual(xs.font, .label1)

        let s = cdsButtonMetrics(.s, theme: theme)
        XCTAssertEqual(s.paddingX, space.x2)
        XCTAssertEqual(s.paddingY, space.x1)
        XCTAssertEqual(s.radius, radius.r700)
        XCTAssertEqual(s.iconSize, icon.s)
        XCTAssertEqual(s.font, .headline)

        let m = cdsButtonMetrics(.m, theme: theme)
        XCTAssertEqual(m.paddingX, space.x3)
        XCTAssertEqual(m.paddingY, space.x1_5)
        XCTAssertEqual(m.radius, radius.r900)
        XCTAssertEqual(m.iconSize, icon.m)
        XCTAssertEqual(m.font, .headline)

        let l = cdsButtonMetrics(.l, theme: theme)
        XCTAssertEqual(l.paddingX, space.x4)
        XCTAssertEqual(l.paddingY, space.x2)
        XCTAssertEqual(l.radius, radius.r900)
        XCTAssertEqual(l.iconSize, icon.m)
        XCTAssertEqual(l.font, .headline)
    }

    func testSlideButtonColorsMatchSolidButtonMapping() {
        let c = theme.colors
        let expected: [(CDSSlideButtonVariant, Color, Color)] = [
            (.primary, c.bgPrimary, c.fgInverse),
            (.positive, c.bgPositive, c.fgInverse),
            (.negative, c.bgNegative, c.fgInverse),
        ]
        for (variant, container, content) in expected {
            let colors = cdsSlideButtonColors(variant, theme: theme)
            XCTAssertEqual(colors.container, container)
            XCTAssertEqual(colors.content, content)
        }
    }

    func testSlideButtonMetricsBySize() {
        let space = theme.spacing
        let radius = theme.radius
        let icon = theme.iconSize

        let s = cdsSlideButtonMetrics(.s, theme: theme)
        XCTAssertEqual(s.paddingY, space.x1)
        XCTAssertEqual(s.labelPaddingX, space.x2)
        XCTAssertEqual(s.radius, radius.r700)
        XCTAssertEqual(s.iconSize, icon.s)
        XCTAssertEqual(s.font, .headline)

        let m = cdsSlideButtonMetrics(.m, theme: theme)
        XCTAssertEqual(m.paddingY, space.x1_5)
        XCTAssertEqual(m.labelPaddingX, space.x2)
        XCTAssertEqual(m.radius, radius.r900)
        XCTAssertEqual(m.iconSize, icon.m)
        XCTAssertEqual(m.font, .headline)

        let l = cdsSlideButtonMetrics(.l, theme: theme)
        XCTAssertEqual(l.paddingY, space.x2)
        XCTAssertEqual(l.labelPaddingX, space.x2)
        XCTAssertEqual(l.radius, radius.r900)
        XCTAssertEqual(l.iconSize, icon.m)
        XCTAssertEqual(l.font, .headline)
    }
}
