import SwiftUI
import XCTest
@testable import CDSDesignSystem

/// Covers the pure style-mapping functions behind ``Button`` and ``SlideButton``: given a
/// resolved theme they must map each variant/size to the expected theme tokens.
final class ComponentStyleTests: XCTestCase {
    private let theme = CDSTheme.resolve(.light)

    func testButtonColorsSolidVariants() {
        let c = theme.colors
        let expected: [(ButtonVariant, Color, Color)] = [
            (.primary, c.bgPrimary, c.fgInverse),
            (.secondary, c.bgSecondary, c.fg),
            (.tertiary, c.bgTertiary, c.fg),
            (.positive, c.bgPositive, c.fgInverse),
            (.negative, c.bgNegative, c.fgInverse),
        ]
        for (variant, container, content) in expected {
            let colors = buttonColors(variant, transparent: false, theme: theme)
            XCTAssertEqual(colors.container, container)
            XCTAssertEqual(colors.content, content)
        }
    }

    func testButtonColorsTransparentVariants() {
        let c = theme.colors
        let expected: [(ButtonVariant, Color)] = [
            (.primary, c.fgPrimary),
            (.secondary, c.fg),
            (.tertiary, c.fg),
            (.positive, c.fgPositive),
            (.negative, c.fgNegative),
        ]
        for (variant, content) in expected {
            let colors = buttonColors(variant, transparent: true, theme: theme)
            // Transparent variants read correctly on any surface via a true `.clear` container.
            XCTAssertEqual(colors.container, .clear)
            XCTAssertEqual(colors.content, content)
        }
    }

    func testButtonMetricsBySize() {
        let space = theme.spacing
        let radius = theme.radius
        let icon = theme.iconSize

        let xs = buttonMetrics(.xs, theme: theme)
        XCTAssertEqual(xs.paddingX, space.x2)
        XCTAssertEqual(xs.paddingY, space.x0_75)
        XCTAssertEqual(xs.radius, radius.r700)
        XCTAssertEqual(xs.iconSize, icon.s)
        XCTAssertEqual(xs.font, .label1)

        let s = buttonMetrics(.s, theme: theme)
        XCTAssertEqual(s.paddingX, space.x2)
        XCTAssertEqual(s.paddingY, space.x1)
        XCTAssertEqual(s.radius, radius.r700)
        XCTAssertEqual(s.iconSize, icon.s)
        XCTAssertEqual(s.font, .headline)

        let m = buttonMetrics(.m, theme: theme)
        XCTAssertEqual(m.paddingX, space.x3)
        XCTAssertEqual(m.paddingY, space.x1_5)
        XCTAssertEqual(m.radius, radius.r900)
        XCTAssertEqual(m.iconSize, icon.m)
        XCTAssertEqual(m.font, .headline)

        let l = buttonMetrics(.l, theme: theme)
        XCTAssertEqual(l.paddingX, space.x4)
        XCTAssertEqual(l.paddingY, space.x2)
        XCTAssertEqual(l.radius, radius.r900)
        XCTAssertEqual(l.iconSize, icon.m)
        XCTAssertEqual(l.font, .headline)
    }

    func testSlideButtonColorsMatchSolidButtonMapping() {
        let c = theme.colors
        let expected: [(SlideButtonVariant, Color, Color)] = [
            (.primary, c.bgPrimary, c.fgInverse),
            (.positive, c.bgPositive, c.fgInverse),
            (.negative, c.bgNegative, c.fgInverse),
        ]
        for (variant, container, content) in expected {
            let colors = slideButtonColors(variant, theme: theme)
            XCTAssertEqual(colors.container, container)
            XCTAssertEqual(colors.content, content)
        }
    }

    func testProgressCircleDiameterBySize() {
        let icon = theme.iconSize
        XCTAssertEqual(progressCircleDiameter(.s, theme: theme), icon.s)
        XCTAssertEqual(progressCircleDiameter(.m, theme: theme), icon.m)
        XCTAssertEqual(progressCircleDiameter(.l, theme: theme), icon.l)
    }

    func testSlideButtonMetricsBySize() {
        let space = theme.spacing
        let radius = theme.radius
        let icon = theme.iconSize

        let s = slideButtonMetrics(.s, theme: theme)
        XCTAssertEqual(s.paddingY, space.x1)
        XCTAssertEqual(s.labelPaddingX, space.x2)
        XCTAssertEqual(s.radius, radius.r700)
        XCTAssertEqual(s.iconSize, icon.s)
        XCTAssertEqual(s.font, .headline)

        let m = slideButtonMetrics(.m, theme: theme)
        XCTAssertEqual(m.paddingY, space.x1_5)
        XCTAssertEqual(m.labelPaddingX, space.x2)
        XCTAssertEqual(m.radius, radius.r900)
        XCTAssertEqual(m.iconSize, icon.m)
        XCTAssertEqual(m.font, .headline)

        let l = slideButtonMetrics(.l, theme: theme)
        XCTAssertEqual(l.paddingY, space.x2)
        XCTAssertEqual(l.labelPaddingX, space.x2)
        XCTAssertEqual(l.radius, radius.r900)
        XCTAssertEqual(l.iconSize, icon.m)
        XCTAssertEqual(l.font, .headline)
    }
}
