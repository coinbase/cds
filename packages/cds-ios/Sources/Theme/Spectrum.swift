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
        blue: cdsRamp("245,248,255", "211,225,255", "176,202,255", "146,182,255", "115,162,255", "70,132,255", "38,110,255", "16,94,255", "0,82,255", "0,75,235", "0,62,193", "0,41,130", "0,24,77"),
        green: cdsRamp("245,255,251", "203,245,227", "163,235,205", "131,224,186", "101,214,167", "60,194,138", "34,173,115", "18,153,97", "9,133,81", "4,112,67", "2,83,50", "0,57,35", "0,31,18"),
        orange: cdsRamp("255,250,245", "254,232,210", "253,213,176", "251,194,147", "249,174,118", "244,140,76", "237,112,47", "225,89,27", "207,71,14", "181,54,6", "145,39,2", "100,26,0", "51,13,0"),
        gray: cdsRamp("255,255,255", "247,248,249", "238,240,243", "222,225,231", "206,210,219", "177,183,195", "137,144,158", "113,120,134", "91,97,110", "70,75,85", "50,53,61", "30,32,37", "10,11,13"),
        indigo: cdsRamp("246,247,255", "230,232,255", "214,218,254", "198,204,253", "181,189,253", "148,161,251", "116,135,247", "89,111,242", "66,91,233", "47,74,215", "31,54,173", "17,32,107", "8,15,51"),
        pink: cdsRamp("255,245,255", "253,228,253", "251,212,250", "248,195,245", "244,178,240", "235,143,227", "221,110,209", "203,81,187", "179,58,162", "149,39,133", "116,26,102", "83,17,72", "51,10,44"),
        purple: cdsRamp("251,247,255", "244,232,255", "237,217,255", "230,201,255", "222,184,255", "205,153,253", "188,123,251", "157,107,242", "138,85,233", "119,67,215", "90,48,173", "54,27,107", "25,13,51"),
        red: cdsRamp("255,245,246", "254,225,228", "253,206,210", "251,186,191", "249,166,173", "244,127,136", "237,89,102", "225,57,71", "207,32,47", "181,15,29", "145,5,16", "100,1,9", "51,0,4"),
        teal: cdsRamp("240,254,255", "188,246,253", "136,237,251", "93,226,248", "51,213,244", "0,188,235", "0,169,221", "0,147,203", "0,123,179", "0,97,149", "0,71,116", "0,47,83", "0,27,51"),
        yellow: cdsRamp("255,252,241", "255,244,192", "255,240,145", "255,234,100", "255,228,54", "247,210,26", "235,186,0", "207,151,0", "174,113,0", "136,76,0", "96,48,0", "58,20,0", "27,6,0"),
        chartreuse: cdsRamp("245,255,250", "221,251,232", "198,247,209", "176,242,182", "159,238,155", "137,223,117", "127,208,87", "86,179,64", "53,151,48", "35,122,43", "25,93,41", "17,64,35", "7,26,17")
    )

    /// The `cds-default` spectrum in the dark color scheme.
    public static let dark = CDSSpectrum(
        blue: cdsRamp("0,16,51", "1,29,91", "1,42,130", "3,51,154", "5,59,177", "10,72,206", "19,84,225", "33,98,238", "55,115,245", "87,139,250", "132,170,253", "185,207,255", "245,248,255"),
        green: cdsRamp("0,31,18", "0,48,29", "1,70,42", "2,82,48", "2,92,55", "6,112,68", "11,133,82", "21,153,98", "39,173,117", "68,194,141", "111,214,171", "171,235,208", "245,255,251"),
        orange: cdsRamp("51,13,0", "79,20,0", "107,28,1", "131,36,2", "155,44,4", "189,59,9", "213,76,18", "230,96,32", "240,120,54", "248,150,86", "252,185,131", "254,219,185", "255,250,245"),
        gray: cdsRamp("10,11,13", "20,21,25", "30,32,37", "40,43,49", "50,53,61", "70,75,85", "91,97,110", "114,120,134", "138,145,158", "165,170,182", "193,198,207", "224,226,231", "255,255,255"),
        indigo: cdsRamp("8,15,51", "14,27,91", "21,39,130", "27,47,154", "33,56,177", "48,73,206", "68,92,225", "92,113,238", "121,138,245", "153,165,250", "187,194,253", "219,223,255", "246,247,255"),
        pink: cdsRamp("51,10,44", "70,14,61", "89,19,78", "108,24,94", "126,30,111", "159,44,142", "187,64,170", "208,88,193", "225,117,214", "237,149,230", "246,184,243", "252,217,251", "255,245,255"),
        purple: cdsRamp("25,13,51", "43,22,89", "73,30,137", "97,37,175", "123,45,211", "142,51,234", "164,84,244", "188,123,251", "205,153,253", "217,176,254", "230,201,255", "237,217,255", "251,247,255"),
        red: cdsRamp("51,0,4", "79,0,7", "107,1,10", "131,4,14", "155,7,19", "189,19,33", "213,38,52", "230,64,78", "240,97,109", "248,134,144", "252,174,181", "254,213,216", "255,245,246"),
        teal: cdsRamp("0,20,38", "0,32,59", "0,45,79", "0,58,99", "0,72,118", "0,99,153", "0,125,182", "0,149,205", "0,170,223", "6,190,236", "69,217,245", "149,239,251", "240,254,255"),
        yellow: cdsRamp("27,6,0", "49,17,0", "81,40,0", "96,48,0", "115,64,0", "147,96,0", "175,128,0", "199,158,0", "222,189,23", "229,205,48", "242,222,94", "255,240,145", "255,252,241"),
        chartreuse: cdsRamp("5,22,14", "14,54,29", "21,79,34", "29,103,36", "45,128,40", "73,152,54", "107,176,73", "123,200,105", "140,209,136", "158,217,163", "178,222,188", "209,238,220", "245,255,250")
    )
}

/// Builds a ramp from thirteen `"r,g,b"` literals in step order.
private func cdsRamp(
    _ s0: String, _ s5: String, _ s10: String, _ s15: String, _ s20: String,
    _ s30: String, _ s40: String, _ s50: String, _ s60: String, _ s70: String,
    _ s80: String, _ s90: String, _ s100: String
) -> CDSColorRamp {
    CDSColorRamp(
        step0: Color(cdsSpectrum: s0), step5: Color(cdsSpectrum: s5), step10: Color(cdsSpectrum: s10),
        step15: Color(cdsSpectrum: s15), step20: Color(cdsSpectrum: s20), step30: Color(cdsSpectrum: s30),
        step40: Color(cdsSpectrum: s40), step50: Color(cdsSpectrum: s50), step60: Color(cdsSpectrum: s60),
        step70: Color(cdsSpectrum: s70), step80: Color(cdsSpectrum: s80), step90: Color(cdsSpectrum: s90),
        step100: Color(cdsSpectrum: s100)
    )
}
