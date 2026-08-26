import CDSDesignSystem
import SwiftUI

/// A sample custom brand theme (the iOS counterpart to Android's `AcmeTheme.kt`), built with the
/// `cdsTheme { }` builder by overriding a handful of tokens on the default theme. Selecting
/// "Acme brand" in the gallery installs this and everything re-themes from the environment.
extension CDSThemeSet {
    static let acme: CDSThemeSet = cdsTheme {
        $0.id = "acme"

        // A violet brand accent, per scheme.
        let brandLight = Color(cdsRGB: 124, 58, 237)
        let brandDark = Color(cdsRGB: 167, 139, 250)

        $0.light.bgPrimary = brandLight
        $0.light.fgPrimary = brandLight
        $0.light.bgLinePrimary = brandLight
        $0.light.accentBoldBlue = brandLight

        $0.dark.bgPrimary = brandDark
        $0.dark.fgPrimary = brandDark
        $0.dark.bgLinePrimary = brandDark
        $0.dark.accentBoldBlue = brandDark

        // Rounder corners and a touch more breathing room, to make the brand visibly distinct.
        $0.radius.r300 = 20
        $0.spacing.x2 = 20
    }
}
