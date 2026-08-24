import Foundation

/// Raw spectrum palette (tier 1 of the CDS two-layer color system).
///
/// These values are copied from `packages/mobile/src/themes/defaultTheme.ts` (the hues
/// consumed by the semantic layer below — blue/green/orange/gray/red).
/// In production this file would be **generated** from a single token source (e.g.
/// Style Dictionary / a tokens JSON) that also emits the TS themes and a Kotlin
/// equivalent — keeping web, React Native, iOS, and Android in lockstep.
enum CDSSpectrumData {
    static let light: [String: String] = [
        "blue0": "245,248,255", "blue5": "211,225,255", "blue10": "176,202,255",
        "blue15": "146,182,255", "blue20": "115,162,255", "blue30": "70,132,255",
        "blue40": "38,110,255", "blue50": "16,94,255", "blue60": "0,82,255",
        "blue70": "0,75,235", "blue80": "0,62,193", "blue90": "0,41,130", "blue100": "0,24,77",
        "green0": "245,255,251", "green5": "203,245,227", "green10": "163,235,205",
        "green15": "131,224,186", "green20": "101,214,167", "green30": "60,194,138",
        "green40": "34,173,115", "green50": "18,153,97", "green60": "9,133,81",
        "green70": "4,112,67", "green80": "2,83,50", "green90": "0,57,35", "green100": "0,31,18",
        "orange0": "255,250,245", "orange5": "254,232,210", "orange10": "253,213,176",
        "orange15": "251,194,147", "orange20": "249,174,118", "orange30": "244,140,76",
        "orange40": "237,112,47", "orange50": "225,89,27", "orange60": "207,71,14",
        "orange70": "181,54,6", "orange80": "145,39,2", "orange90": "100,26,0", "orange100": "51,13,0",
        "gray0": "255,255,255", "gray5": "247,248,249", "gray10": "238,240,243",
        "gray15": "222,225,231", "gray20": "206,210,219", "gray30": "177,183,195",
        "gray40": "137,144,158", "gray50": "113,120,134", "gray60": "91,97,110",
        "gray70": "70,75,85", "gray80": "50,53,61", "gray90": "30,32,37", "gray100": "10,11,13",
        "red0": "255,245,246", "red5": "254,225,228", "red10": "253,206,210",
        "red15": "251,186,191", "red20": "249,166,173", "red30": "244,127,136",
        "red40": "237,89,102", "red50": "225,57,71", "red60": "207,32,47",
        "red70": "181,15,29", "red80": "145,5,16", "red90": "100,1,9", "red100": "51,0,4",
    ]

    static let dark: [String: String] = [
        "blue0": "0,16,51", "blue5": "1,29,91", "blue10": "1,42,130",
        "blue15": "3,51,154", "blue20": "5,59,177", "blue30": "10,72,206",
        "blue40": "19,84,225", "blue50": "33,98,238", "blue60": "55,115,245",
        "blue70": "87,139,250", "blue80": "132,170,253", "blue90": "185,207,255", "blue100": "245,248,255",
        "green0": "0,31,18", "green5": "0,48,29", "green10": "1,70,42",
        "green15": "2,82,48", "green20": "2,92,55", "green30": "6,112,68",
        "green40": "11,133,82", "green50": "21,153,98", "green60": "39,173,117",
        "green70": "68,194,141", "green80": "111,214,171", "green90": "171,235,208", "green100": "245,255,251",
        "orange0": "51,13,0", "orange5": "79,20,0", "orange10": "107,28,1",
        "orange15": "131,36,2", "orange20": "155,44,4", "orange30": "189,59,9",
        "orange40": "213,76,18", "orange50": "230,96,32", "orange60": "240,120,54",
        "orange70": "248,150,86", "orange80": "252,185,131", "orange90": "254,219,185", "orange100": "255,250,245",
        "gray0": "10,11,13", "gray5": "20,21,25", "gray10": "30,32,37",
        "gray15": "40,43,49", "gray20": "50,53,61", "gray30": "70,75,85",
        "gray40": "91,97,110", "gray50": "114,120,134", "gray60": "138,145,158",
        "gray70": "165,170,182", "gray80": "193,198,207", "gray90": "224,226,231", "gray100": "255,255,255",
        "red0": "51,0,4", "red5": "79,0,7", "red10": "107,1,10",
        "red15": "131,4,14", "red20": "155,7,19", "red30": "189,19,33",
        "red40": "213,38,52", "red50": "230,64,78", "red60": "240,97,109",
        "red70": "248,134,144", "red80": "252,174,181", "red90": "254,213,216", "red100": "255,245,246",
    ]
}
