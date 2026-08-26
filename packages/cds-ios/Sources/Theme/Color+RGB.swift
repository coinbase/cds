import SwiftUI

public extension Color {
    /// Build a Color from 0–255 sRGB components, matching how CDS stores spectrum values.
    init(cdsRGB r: Double, _ g: Double, _ b: Double, opacity: Double = 1) {
        self.init(.sRGB, red: r / 255, green: g / 255, blue: b / 255, opacity: opacity)
    }

    /// Parse a CDS spectrum string like `"0,82,255"` into a Color.
    ///
    /// This mirrors the React Native theme, where spectrum tokens are stored as
    /// comma-separated RGB components and wrapped with `rgb()` / `rgba()` at use time.
    init(cdsSpectrum value: String, opacity: Double = 1) {
        let parts = value
            .split(separator: ",")
            .compactMap { Double($0.trimmingCharacters(in: .whitespaces)) }
        let r = parts.count > 0 ? parts[0] : 0
        let g = parts.count > 1 ? parts[1] : 0
        let b = parts.count > 2 ? parts[2] : 0
        self.init(.sRGB, red: r / 255, green: g / 255, blue: b / 255, opacity: opacity)
    }
}
