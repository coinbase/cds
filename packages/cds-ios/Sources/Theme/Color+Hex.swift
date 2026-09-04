import SwiftUI

public extension Color {
    /// Build a Color from a packed `0xRRGGBB` sRGB literal, matching how CDS stores its palette.
    ///
    /// Mirrors Android's `Color(0xFFRRGGBB)` idiom (minus the alpha byte, which is supplied via
    /// `opacity`). Example: `Color(cdsHex: 0x0052FF)` is CDS `blue60`.
    init(cdsHex: UInt32, opacity: Double = 1) {
        let r = Double((cdsHex >> 16) & 0xFF) / 255
        let g = Double((cdsHex >> 8) & 0xFF) / 255
        let b = Double(cdsHex & 0xFF) / 255
        self.init(.sRGB, red: r, green: g, blue: b, opacity: opacity)
    }
}
