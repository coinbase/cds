import SwiftUI
import XCTest
@testable import CDSDesignSystem

final class CDSThemeTests: XCTestCase {
    func testSpectrumTablesCoverSemanticHues() {
        for hue in ["blue60", "green60", "red60", "orange60", "gray0", "gray100"] {
            XCTAssertNotNil(CDSSpectrumData.light[hue], "light spectrum missing \(hue)")
            XCTAssertNotNil(CDSSpectrumData.dark[hue], "dark spectrum missing \(hue)")
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
}
