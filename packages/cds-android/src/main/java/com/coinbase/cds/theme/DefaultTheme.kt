package com.coinbase.cds.theme

/**
 * The stock CDS theme, carrying both color schemes.
 *
 * A top-level `val` rather than an object or a `themes` package: nothing lands on the [CdsTheme]
 * companion except the ambient-read accessors, so `CdsTheme.<something>` unambiguously means "read
 * the ambient theme" and never "here is a named theme."
 *
 * Every value is assembled from the per-axis companions ([CdsColors.Light], [CdsSpace.Default], and
 * so on) rather than inlined here. That also sidesteps the initialization-order trap a top-level
 * `val` built from other top-level `val`s in the same file would have.
 *
 * This is the default [base] for [cdsTheme], so deriving a brand theme is
 * `cdsTheme { lightColors { bgPrimary = brand } }` with no explicit base.
 */
public val CdsDefaultTheme: CdsTheme = CdsTheme(
    id = "cds-default",
    lightSpectrum = CdsSpectrum.Light,
    darkSpectrum = CdsSpectrum.Dark,
    lightColors = CdsColors.Light,
    darkColors = CdsColors.Dark,
    lightIllustrationColors = CdsIllustrationColors.Light,
    darkIllustrationColors = CdsIllustrationColors.Dark,
    space = CdsSpace.Default,
    borderWidth = CdsBorderWidth.Default,
    borderRadius = CdsBorderRadius.Default,
    iconSize = CdsIconSize.Default,
    avatarSize = CdsAvatarSize.Default,
    controlSize = CdsControlSize.Default,
    typography = CdsTypography.Default,
    shadows = CdsShadows.Default,
)
