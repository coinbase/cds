import SwiftUI

/// One hue's thirteen tonal steps, each a resolved ``Color``.
///
/// Instances come from ``CDSSpectrum``; build a modified one with ``with(_:)``. Values are authored
/// from the CDS token source (`packages/mobile/src/themes/defaultTheme.ts`) and should ultimately
/// be generated from it.
public struct CDSColorRamp: Sendable, Equatable {
    public var step0: Color
    public var step5: Color
    public var step10: Color
    public var step15: Color
    public var step20: Color
    public var step30: Color
    public var step40: Color
    public var step50: Color
    public var step60: Color
    public var step70: Color
    public var step80: Color
    public var step90: Color
    public var step100: Color

    init(
        step0: Color, step5: Color, step10: Color, step15: Color, step20: Color,
        step30: Color, step40: Color, step50: Color, step60: Color, step70: Color,
        step80: Color, step90: Color, step100: Color
    ) {
        self.step0 = step0; self.step5 = step5; self.step10 = step10; self.step15 = step15
        self.step20 = step20; self.step30 = step30; self.step40 = step40; self.step50 = step50
        self.step60 = step60; self.step70 = step70; self.step80 = step80; self.step90 = step90
        self.step100 = step100
    }

    /// Resolve a step token: `theme.spectrum.blue[.step60]`.
    public subscript(_ token: CDSColorRampToken) -> Color {
        switch token {
        case .step0: return step0
        case .step5: return step5
        case .step10: return step10
        case .step15: return step15
        case .step20: return step20
        case .step30: return step30
        case .step40: return step40
        case .step50: return step50
        case .step60: return step60
        case .step70: return step70
        case .step80: return step80
        case .step90: return step90
        case .step100: return step100
        }
    }

    /// Return a copy with a handful of steps overridden.
    public func with(_ mutate: (inout CDSColorRamp) -> Void) -> CDSColorRamp {
        var copy = self
        mutate(&copy)
        return copy
    }
}

/// The raw CDS color palette ("spectrum"): eleven hues, each a ``CDSColorRamp``. The primitive tier
/// the semantic ``CDSColors`` tier derives from. Public so consumers can reach past the semantic
/// tier through theming rather than hardcoding a `Color`.
public struct CDSSpectrum: Sendable, Equatable {
    public var blue: CDSColorRamp
    public var green: CDSColorRamp
    public var orange: CDSColorRamp
    public var gray: CDSColorRamp
    public var indigo: CDSColorRamp
    public var pink: CDSColorRamp
    public var purple: CDSColorRamp
    public var red: CDSColorRamp
    public var teal: CDSColorRamp
    public var yellow: CDSColorRamp
    public var chartreuse: CDSColorRamp

    init(
        blue: CDSColorRamp, green: CDSColorRamp, orange: CDSColorRamp, gray: CDSColorRamp,
        indigo: CDSColorRamp, pink: CDSColorRamp, purple: CDSColorRamp, red: CDSColorRamp,
        teal: CDSColorRamp, yellow: CDSColorRamp, chartreuse: CDSColorRamp
    ) {
        self.blue = blue; self.green = green; self.orange = orange; self.gray = gray
        self.indigo = indigo; self.pink = pink; self.purple = purple; self.red = red
        self.teal = teal; self.yellow = yellow; self.chartreuse = chartreuse
    }

    /// Resolve a hue token: `theme.spectrum[.blue][.step60]` walks a fully token-addressed path.
    public subscript(_ token: CDSSpectrumHueToken) -> CDSColorRamp {
        switch token {
        case .blue: return blue
        case .green: return green
        case .orange: return orange
        case .gray: return gray
        case .indigo: return indigo
        case .pink: return pink
        case .purple: return purple
        case .red: return red
        case .teal: return teal
        case .yellow: return yellow
        case .chartreuse: return chartreuse
        }
    }

    /// Return a copy with a handful of hues overridden.
    public func with(_ mutate: (inout CDSSpectrum) -> Void) -> CDSSpectrum {
        var copy = self
        mutate(&copy)
        return copy
    }

    /// The `cds-default` spectrum in the light color scheme.
    public static let light = CDSSpectrum(
        blue: cdsRamp(0xF5F8FF, 0xD3E1FF, 0xB0CAFF, 0x92B6FF, 0x73A2FF, 0x4684FF, 0x266EFF, 0x105EFF, 0x0052FF, 0x004BEB, 0x003EC1, 0x002982, 0x00184D),
        green: cdsRamp(0xF5FFFB, 0xCBF5E3, 0xA3EBCD, 0x83E0BA, 0x65D6A7, 0x3CC28A, 0x22AD73, 0x129961, 0x098551, 0x047043, 0x025332, 0x003923, 0x001F12),
        orange: cdsRamp(0xFFFAF5, 0xFEE8D2, 0xFDD5B0, 0xFBC293, 0xF9AE76, 0xF48C4C, 0xED702F, 0xE1591B, 0xCF470E, 0xB53606, 0x912702, 0x641A00, 0x330D00),
        gray: cdsRamp(0xFFFFFF, 0xF7F8F9, 0xEEF0F3, 0xDEE1E7, 0xCED2DB, 0xB1B7C3, 0x89909E, 0x717886, 0x5B616E, 0x464B55, 0x32353D, 0x1E2025, 0x0A0B0D),
        indigo: cdsRamp(0xF6F7FF, 0xE6E8FF, 0xD6DAFE, 0xC6CCFD, 0xB5BDFD, 0x94A1FB, 0x7487F7, 0x596FF2, 0x425BE9, 0x2F4AD7, 0x1F36AD, 0x11206B, 0x080F33),
        pink: cdsRamp(0xFFF5FF, 0xFDE4FD, 0xFBD4FA, 0xF8C3F5, 0xF4B2F0, 0xEB8FE3, 0xDD6ED1, 0xCB51BB, 0xB33AA2, 0x952785, 0x741A66, 0x531148, 0x330A2C),
        purple: cdsRamp(0xFBF7FF, 0xF4E8FF, 0xEDD9FF, 0xE6C9FF, 0xDEB8FF, 0xCD99FD, 0xBC7BFB, 0x9D6BF2, 0x8A55E9, 0x7743D7, 0x5A30AD, 0x361B6B, 0x190D33),
        red: cdsRamp(0xFFF5F6, 0xFEE1E4, 0xFDCED2, 0xFBBABF, 0xF9A6AD, 0xF47F88, 0xED5966, 0xE13947, 0xCF202F, 0xB50F1D, 0x910510, 0x640109, 0x330004),
        teal: cdsRamp(0xF0FEFF, 0xBCF6FD, 0x88EDFB, 0x5DE2F8, 0x33D5F4, 0x00BCEB, 0x00A9DD, 0x0093CB, 0x007BB3, 0x006195, 0x004774, 0x002F53, 0x001B33),
        yellow: cdsRamp(0xFFFCF1, 0xFFF4C0, 0xFFF091, 0xFFEA64, 0xFFE436, 0xF7D21A, 0xEBBA00, 0xCF9700, 0xAE7100, 0x884C00, 0x603000, 0x3A1400, 0x1B0600),
        chartreuse: cdsRamp(0xF5FFFA, 0xDDFBE8, 0xC6F7D1, 0xB0F2B6, 0x9FEE9B, 0x89DF75, 0x7FD057, 0x56B340, 0x359730, 0x237A2B, 0x195D29, 0x114023, 0x071A11)
    )

    /// The `cds-default` spectrum in the dark color scheme.
    public static let dark = CDSSpectrum(
        blue: cdsRamp(0x001033, 0x011D5B, 0x012A82, 0x03339A, 0x053BB1, 0x0A48CE, 0x1354E1, 0x2162EE, 0x3773F5, 0x578BFA, 0x84AAFD, 0xB9CFFF, 0xF5F8FF),
        green: cdsRamp(0x001F12, 0x00301D, 0x01462A, 0x025230, 0x025C37, 0x067044, 0x0B8552, 0x159962, 0x27AD75, 0x44C28D, 0x6FD6AB, 0xABEBD0, 0xF5FFFB),
        orange: cdsRamp(0x330D00, 0x4F1400, 0x6B1C01, 0x832402, 0x9B2C04, 0xBD3B09, 0xD54C12, 0xE66020, 0xF07836, 0xF89656, 0xFCB983, 0xFEDBB9, 0xFFFAF5),
        gray: cdsRamp(0x0A0B0D, 0x141519, 0x1E2025, 0x282B31, 0x32353D, 0x464B55, 0x5B616E, 0x727886, 0x8A919E, 0xA5AAB6, 0xC1C6CF, 0xE0E2E7, 0xFFFFFF),
        indigo: cdsRamp(0x080F33, 0x0E1B5B, 0x152782, 0x1B2F9A, 0x2138B1, 0x3049CE, 0x445CE1, 0x5C71EE, 0x798AF5, 0x99A5FA, 0xBBC2FD, 0xDBDFFF, 0xF6F7FF),
        pink: cdsRamp(0x330A2C, 0x460E3D, 0x59134E, 0x6C185E, 0x7E1E6F, 0x9F2C8E, 0xBB40AA, 0xD058C1, 0xE175D6, 0xED95E6, 0xF6B8F3, 0xFCD9FB, 0xFFF5FF),
        purple: cdsRamp(0x190D33, 0x2B1659, 0x491E89, 0x6125AF, 0x7B2DD3, 0x8E33EA, 0xA454F4, 0xBC7BFB, 0xCD99FD, 0xD9B0FE, 0xE6C9FF, 0xEDD9FF, 0xFBF7FF),
        red: cdsRamp(0x330004, 0x4F0007, 0x6B010A, 0x83040E, 0x9B0713, 0xBD1321, 0xD52634, 0xE6404E, 0xF0616D, 0xF88690, 0xFCAEB5, 0xFED5D8, 0xFFF5F6),
        teal: cdsRamp(0x001426, 0x00203B, 0x002D4F, 0x003A63, 0x004876, 0x006399, 0x007DB6, 0x0095CD, 0x00AADF, 0x06BEEC, 0x45D9F5, 0x95EFFB, 0xF0FEFF),
        yellow: cdsRamp(0x1B0600, 0x311100, 0x512800, 0x603000, 0x734000, 0x936000, 0xAF8000, 0xC79E00, 0xDEBD17, 0xE5CD30, 0xF2DE5E, 0xFFF091, 0xFFFCF1),
        chartreuse: cdsRamp(0x05160E, 0x0E361D, 0x154F22, 0x1D6724, 0x2D8028, 0x499836, 0x6BB049, 0x7BC869, 0x8CD188, 0x9ED9A3, 0xB2DEBC, 0xD1EEDC, 0xF5FFFA)
    )
}

/// Builds a ramp from thirteen `0xRRGGBB` literals in step order.
private func cdsRamp(
    _ s0: UInt32, _ s5: UInt32, _ s10: UInt32, _ s15: UInt32, _ s20: UInt32,
    _ s30: UInt32, _ s40: UInt32, _ s50: UInt32, _ s60: UInt32, _ s70: UInt32,
    _ s80: UInt32, _ s90: UInt32, _ s100: UInt32
) -> CDSColorRamp {
    CDSColorRamp(
        step0: Color(cdsHex: s0), step5: Color(cdsHex: s5), step10: Color(cdsHex: s10),
        step15: Color(cdsHex: s15), step20: Color(cdsHex: s20), step30: Color(cdsHex: s30),
        step40: Color(cdsHex: s40), step50: Color(cdsHex: s50), step60: Color(cdsHex: s60),
        step70: Color(cdsHex: s70), step80: Color(cdsHex: s80), step90: Color(cdsHex: s90),
        step100: Color(cdsHex: s100)
    )
}
