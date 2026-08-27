package com.coinbase.cds.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Dp

/** Keeps the nested theme-builder receivers from leaking into each other's scope. */
@DslMarker
public annotation class CdsThemeDsl

/**
 * Builds a [CdsTheme] by overriding tokens on [base]. This is the whole public construction surface
 * for a theme, and the reason every token type has an `internal` constructor.
 *
 * ```
 * val acmeTheme = cdsTheme {
 *     id = "acme"
 *     lightColors { fgPrimary = brandLight; bgPrimary = brandLight }
 *     darkColors { fgPrimary = brandDark; bgPrimary = brandDark }
 *     space { x2 = 24.dp }
 * }
 * ```
 *
 * Why a builder and not a public constructor or `copy()`: in Kotlin both compile to a method with
 * one parameter per token (plus a synthetic `copy$default` carrying a bitmask), so adding a token
 * changes the signature and anything compiled against the old jar hits a `NoSuchMethodError`. Each
 * nested builder here is a mutable class seeded from [base], so adding a token adds one field --
 * a pure addition that touches no existing signature, and adding a token stays a non-event.
 *
 * The tradeoff: building a theme entirely from scratch stops being compiler-enforced. With a
 * constructor, adding a token is a compile error telling you to supply it; here it silently
 * inherits from [base]. Nothing builds from scratch -- CDS owns the defaults and brand themes
 * derive from them -- so that's close to free.
 *
 * Note the scope of what this can do: it re-themes tokens CDS *defines*, and CDS components pick
 * the new values up automatically because they read `CdsTheme.space.x2` and friends. It cannot add
 * *new* token names, and deliberately so -- no CDS component can read a name it doesn't know
 * exists, so only consumer code would ever read a consumer token. See the theme package README for
 * the pattern that covers that case.
 */
public fun cdsTheme(
    base: CdsTheme = CdsDefaultTheme,
    block: CdsThemeBuilder.() -> Unit,
): CdsTheme = CdsThemeBuilder(base).apply(block).build()

@CdsThemeDsl
public class CdsThemeBuilder internal constructor(base: CdsTheme) {
    /** Stable identifier for the theme being built. Defaults to the base theme's. */
    public var id: String = base.id

    private val lightSpectrumBuilder = CdsSpectrumBuilder(base.lightSpectrum)
    private val darkSpectrumBuilder = CdsSpectrumBuilder(base.darkSpectrum)
    private val lightColorsBuilder = CdsColorsBuilder(base.lightColors)
    private val darkColorsBuilder = CdsColorsBuilder(base.darkColors)
    private val lightIllustrationColorsBuilder =
        CdsIllustrationColorsBuilder(base.lightIllustrationColors)
    private val darkIllustrationColorsBuilder =
        CdsIllustrationColorsBuilder(base.darkIllustrationColors)
    private val spaceBuilder = CdsSpaceBuilder(base.space)
    private val borderWidthBuilder = CdsBorderWidthBuilder(base.borderWidth)
    private val borderRadiusBuilder = CdsBorderRadiusBuilder(base.borderRadius)
    private val iconSizeBuilder = CdsIconSizeBuilder(base.iconSize)
    private val avatarSizeBuilder = CdsAvatarSizeBuilder(base.avatarSize)
    private val controlSizeBuilder = CdsControlSizeBuilder(base.controlSize)
    private val typographyBuilder = CdsTypographyBuilder(base.typography)
    private val shadowsBuilder = CdsShadowsBuilder(base.shadows)

    public fun lightSpectrum(block: CdsSpectrumBuilder.() -> Unit): Unit =
        lightSpectrumBuilder.block()

    public fun darkSpectrum(block: CdsSpectrumBuilder.() -> Unit): Unit =
        darkSpectrumBuilder.block()

    public fun lightColors(block: CdsColorsBuilder.() -> Unit): Unit = lightColorsBuilder.block()

    public fun darkColors(block: CdsColorsBuilder.() -> Unit): Unit = darkColorsBuilder.block()

    public fun lightIllustrationColors(block: CdsIllustrationColorsBuilder.() -> Unit): Unit =
        lightIllustrationColorsBuilder.block()

    public fun darkIllustrationColors(block: CdsIllustrationColorsBuilder.() -> Unit): Unit =
        darkIllustrationColorsBuilder.block()

    public fun space(block: CdsSpaceBuilder.() -> Unit): Unit = spaceBuilder.block()

    public fun borderWidth(block: CdsBorderWidthBuilder.() -> Unit): Unit = borderWidthBuilder.block()

    public fun borderRadius(block: CdsBorderRadiusBuilder.() -> Unit): Unit =
        borderRadiusBuilder.block()

    public fun iconSize(block: CdsIconSizeBuilder.() -> Unit): Unit = iconSizeBuilder.block()

    public fun avatarSize(block: CdsAvatarSizeBuilder.() -> Unit): Unit = avatarSizeBuilder.block()

    public fun controlSize(block: CdsControlSizeBuilder.() -> Unit): Unit = controlSizeBuilder.block()

    public fun typography(block: CdsTypographyBuilder.() -> Unit): Unit = typographyBuilder.block()

    public fun shadows(block: CdsShadowsBuilder.() -> Unit): Unit = shadowsBuilder.block()

    internal fun build(): CdsTheme = CdsTheme(
        id = id,
        lightSpectrum = lightSpectrumBuilder.build(),
        darkSpectrum = darkSpectrumBuilder.build(),
        lightColors = lightColorsBuilder.build(),
        darkColors = darkColorsBuilder.build(),
        lightIllustrationColors = lightIllustrationColorsBuilder.build(),
        darkIllustrationColors = darkIllustrationColorsBuilder.build(),
        space = spaceBuilder.build(),
        borderWidth = borderWidthBuilder.build(),
        borderRadius = borderRadiusBuilder.build(),
        iconSize = iconSizeBuilder.build(),
        avatarSize = avatarSizeBuilder.build(),
        controlSize = controlSizeBuilder.build(),
        typography = typographyBuilder.build(),
        shadows = shadowsBuilder.build(),
    )
}

@CdsThemeDsl
public class CdsColorRampBuilder internal constructor(base: CdsColorRamp) {
    public var step0: Color = base.step0
    public var step5: Color = base.step5
    public var step10: Color = base.step10
    public var step15: Color = base.step15
    public var step20: Color = base.step20
    public var step30: Color = base.step30
    public var step40: Color = base.step40
    public var step50: Color = base.step50
    public var step60: Color = base.step60
    public var step70: Color = base.step70
    public var step80: Color = base.step80
    public var step90: Color = base.step90
    public var step100: Color = base.step100

    internal fun build(): CdsColorRamp = CdsColorRamp(
        step0 = step0,
        step5 = step5,
        step10 = step10,
        step15 = step15,
        step20 = step20,
        step30 = step30,
        step40 = step40,
        step50 = step50,
        step60 = step60,
        step70 = step70,
        step80 = step80,
        step90 = step90,
        step100 = step100,
    )
}

@CdsThemeDsl
public class CdsSpectrumBuilder internal constructor(base: CdsSpectrum) {
    private val blueBuilder = CdsColorRampBuilder(base.blue)
    private val greenBuilder = CdsColorRampBuilder(base.green)
    private val orangeBuilder = CdsColorRampBuilder(base.orange)
    private val grayBuilder = CdsColorRampBuilder(base.gray)
    private val indigoBuilder = CdsColorRampBuilder(base.indigo)
    private val pinkBuilder = CdsColorRampBuilder(base.pink)
    private val purpleBuilder = CdsColorRampBuilder(base.purple)
    private val redBuilder = CdsColorRampBuilder(base.red)
    private val tealBuilder = CdsColorRampBuilder(base.teal)
    private val yellowBuilder = CdsColorRampBuilder(base.yellow)
    private val chartreuseBuilder = CdsColorRampBuilder(base.chartreuse)

    public fun blue(block: CdsColorRampBuilder.() -> Unit): Unit = blueBuilder.block()
    public fun green(block: CdsColorRampBuilder.() -> Unit): Unit = greenBuilder.block()
    public fun orange(block: CdsColorRampBuilder.() -> Unit): Unit = orangeBuilder.block()
    public fun gray(block: CdsColorRampBuilder.() -> Unit): Unit = grayBuilder.block()
    public fun indigo(block: CdsColorRampBuilder.() -> Unit): Unit = indigoBuilder.block()
    public fun pink(block: CdsColorRampBuilder.() -> Unit): Unit = pinkBuilder.block()
    public fun purple(block: CdsColorRampBuilder.() -> Unit): Unit = purpleBuilder.block()
    public fun red(block: CdsColorRampBuilder.() -> Unit): Unit = redBuilder.block()
    public fun teal(block: CdsColorRampBuilder.() -> Unit): Unit = tealBuilder.block()
    public fun yellow(block: CdsColorRampBuilder.() -> Unit): Unit = yellowBuilder.block()
    public fun chartreuse(block: CdsColorRampBuilder.() -> Unit): Unit = chartreuseBuilder.block()

    internal fun build(): CdsSpectrum = CdsSpectrum(
        blue = blueBuilder.build(),
        green = greenBuilder.build(),
        orange = orangeBuilder.build(),
        gray = grayBuilder.build(),
        indigo = indigoBuilder.build(),
        pink = pinkBuilder.build(),
        purple = purpleBuilder.build(),
        red = redBuilder.build(),
        teal = tealBuilder.build(),
        yellow = yellowBuilder.build(),
        chartreuse = chartreuseBuilder.build(),
    )
}

@CdsThemeDsl
public class CdsColorsBuilder internal constructor(base: CdsColors) {
    public var fg: Color = base.fg
    public var fgMuted: Color = base.fgMuted
    public var fgInverse: Color = base.fgInverse
    public var fgPrimary: Color = base.fgPrimary
    public var fgWarning: Color = base.fgWarning
    public var fgPositive: Color = base.fgPositive
    public var fgNegative: Color = base.fgNegative
    public var bg: Color = base.bg
    public var bgAlternate: Color = base.bgAlternate
    public var bgInverse: Color = base.bgInverse
    public var bgOverlay: Color = base.bgOverlay
    public var bgPrimary: Color = base.bgPrimary
    public var bgPrimaryWash: Color = base.bgPrimaryWash
    public var bgSecondary: Color = base.bgSecondary
    public var bgTertiary: Color = base.bgTertiary
    public var bgSecondaryWash: Color = base.bgSecondaryWash
    public var bgNegative: Color = base.bgNegative
    public var bgNegativeWash: Color = base.bgNegativeWash
    public var bgPositive: Color = base.bgPositive
    public var bgPositiveWash: Color = base.bgPositiveWash
    public var bgWarning: Color = base.bgWarning
    public var bgWarningWash: Color = base.bgWarningWash
    public var bgLine: Color = base.bgLine
    public var bgLineHeavy: Color = base.bgLineHeavy
    public var bgLineInverse: Color = base.bgLineInverse
    public var bgLinePrimary: Color = base.bgLinePrimary
    public var bgLinePrimarySubtle: Color = base.bgLinePrimarySubtle
    public var bgElevation1: Color = base.bgElevation1
    public var bgElevation2: Color = base.bgElevation2
    public var accentSubtleGreen: Color = base.accentSubtleGreen
    public var accentBoldGreen: Color = base.accentBoldGreen
    public var accentSubtleBlue: Color = base.accentSubtleBlue
    public var accentBoldBlue: Color = base.accentBoldBlue
    public var accentSubtlePurple: Color = base.accentSubtlePurple
    public var accentBoldPurple: Color = base.accentBoldPurple
    public var accentSubtleYellow: Color = base.accentSubtleYellow
    public var accentBoldYellow: Color = base.accentBoldYellow
    public var accentSubtleRed: Color = base.accentSubtleRed
    public var accentBoldRed: Color = base.accentBoldRed
    public var accentSubtleGray: Color = base.accentSubtleGray
    public var accentBoldGray: Color = base.accentBoldGray
    public var transparent: Color = base.transparent

    internal fun build(): CdsColors = CdsColors(
        fg = fg,
        fgMuted = fgMuted,
        fgInverse = fgInverse,
        fgPrimary = fgPrimary,
        fgWarning = fgWarning,
        fgPositive = fgPositive,
        fgNegative = fgNegative,
        bg = bg,
        bgAlternate = bgAlternate,
        bgInverse = bgInverse,
        bgOverlay = bgOverlay,
        bgPrimary = bgPrimary,
        bgPrimaryWash = bgPrimaryWash,
        bgSecondary = bgSecondary,
        bgTertiary = bgTertiary,
        bgSecondaryWash = bgSecondaryWash,
        bgNegative = bgNegative,
        bgNegativeWash = bgNegativeWash,
        bgPositive = bgPositive,
        bgPositiveWash = bgPositiveWash,
        bgWarning = bgWarning,
        bgWarningWash = bgWarningWash,
        bgLine = bgLine,
        bgLineHeavy = bgLineHeavy,
        bgLineInverse = bgLineInverse,
        bgLinePrimary = bgLinePrimary,
        bgLinePrimarySubtle = bgLinePrimarySubtle,
        bgElevation1 = bgElevation1,
        bgElevation2 = bgElevation2,
        accentSubtleGreen = accentSubtleGreen,
        accentBoldGreen = accentBoldGreen,
        accentSubtleBlue = accentSubtleBlue,
        accentBoldBlue = accentBoldBlue,
        accentSubtlePurple = accentSubtlePurple,
        accentBoldPurple = accentBoldPurple,
        accentSubtleYellow = accentSubtleYellow,
        accentBoldYellow = accentBoldYellow,
        accentSubtleRed = accentSubtleRed,
        accentBoldRed = accentBoldRed,
        accentSubtleGray = accentSubtleGray,
        accentBoldGray = accentBoldGray,
        transparent = transparent,
    )
}

@CdsThemeDsl
public class CdsIllustrationColorsBuilder internal constructor(base: CdsIllustrationColors) {
    public var primary: Color = base.primary
    public var black: Color = base.black
    public var white: Color = base.white
    public var gray: Color = base.gray
    public var gray2: Color = base.gray2
    public var gray3: Color = base.gray3
    public var gray4: Color = base.gray4
    public var positive: Color = base.positive
    public var negative: Color = base.negative
    public var accent1: Color = base.accent1
    public var accent2: Color = base.accent2
    public var accent3: Color = base.accent3
    public var accent4: Color = base.accent4
    public var invert: Color = base.invert
    public var invert2: Color = base.invert2

    internal fun build(): CdsIllustrationColors = CdsIllustrationColors(
        primary = primary,
        black = black,
        white = white,
        gray = gray,
        gray2 = gray2,
        gray3 = gray3,
        gray4 = gray4,
        positive = positive,
        negative = negative,
        accent1 = accent1,
        accent2 = accent2,
        accent3 = accent3,
        accent4 = accent4,
        invert = invert,
        invert2 = invert2,
    )
}

@CdsThemeDsl
public class CdsSpaceBuilder internal constructor(base: CdsSpace) {
    public var x0: Dp = base.x0
    public var x0_25: Dp = base.x0_25
    public var x0_5: Dp = base.x0_5
    public var x0_75: Dp = base.x0_75
    public var x1: Dp = base.x1
    public var x1_5: Dp = base.x1_5
    public var x2: Dp = base.x2
    public var x3: Dp = base.x3
    public var x4: Dp = base.x4
    public var x5: Dp = base.x5
    public var x6: Dp = base.x6
    public var x7: Dp = base.x7
    public var x8: Dp = base.x8
    public var x9: Dp = base.x9
    public var x10: Dp = base.x10

    internal fun build(): CdsSpace = CdsSpace(
        x0 = x0,
        x0_25 = x0_25,
        x0_5 = x0_5,
        x0_75 = x0_75,
        x1 = x1,
        x1_5 = x1_5,
        x2 = x2,
        x3 = x3,
        x4 = x4,
        x5 = x5,
        x6 = x6,
        x7 = x7,
        x8 = x8,
        x9 = x9,
        x10 = x10,
    )
}

@CdsThemeDsl
public class CdsBorderWidthBuilder internal constructor(base: CdsBorderWidth) {
    public var borderWidth0: Dp = base.borderWidth0
    public var borderWidth100: Dp = base.borderWidth100
    public var borderWidth200: Dp = base.borderWidth200
    public var borderWidth300: Dp = base.borderWidth300
    public var borderWidth400: Dp = base.borderWidth400
    public var borderWidth500: Dp = base.borderWidth500

    internal fun build(): CdsBorderWidth = CdsBorderWidth(
        borderWidth0 = borderWidth0,
        borderWidth100 = borderWidth100,
        borderWidth200 = borderWidth200,
        borderWidth300 = borderWidth300,
        borderWidth400 = borderWidth400,
        borderWidth500 = borderWidth500,
    )
}

@CdsThemeDsl
public class CdsBorderRadiusBuilder internal constructor(base: CdsBorderRadius) {
    public var radius0: Dp = base.radius0
    public var radius100: Dp = base.radius100
    public var radius200: Dp = base.radius200
    public var radius300: Dp = base.radius300
    public var radius400: Dp = base.radius400
    public var radius500: Dp = base.radius500
    public var radius600: Dp = base.radius600
    public var radius700: Dp = base.radius700
    public var radius800: Dp = base.radius800
    public var radius900: Dp = base.radius900
    public var radius1000: Dp = base.radius1000

    internal fun build(): CdsBorderRadius = CdsBorderRadius(
        radius0 = radius0,
        radius100 = radius100,
        radius200 = radius200,
        radius300 = radius300,
        radius400 = radius400,
        radius500 = radius500,
        radius600 = radius600,
        radius700 = radius700,
        radius800 = radius800,
        radius900 = radius900,
        radius1000 = radius1000,
    )
}

@CdsThemeDsl
public class CdsIconSizeBuilder internal constructor(base: CdsIconSize) {
    public var xs: Dp = base.xs
    public var s: Dp = base.s
    public var m: Dp = base.m
    public var l: Dp = base.l

    internal fun build(): CdsIconSize = CdsIconSize(xs = xs, s = s, m = m, l = l)
}

@CdsThemeDsl
public class CdsAvatarSizeBuilder internal constructor(base: CdsAvatarSize) {
    public var s: Dp = base.s
    public var m: Dp = base.m
    public var l: Dp = base.l
    public var xl: Dp = base.xl
    public var xxl: Dp = base.xxl
    public var xxxl: Dp = base.xxxl

    internal fun build(): CdsAvatarSize =
        CdsAvatarSize(s = s, m = m, l = l, xl = xl, xxl = xxl, xxxl = xxxl)
}

@CdsThemeDsl
public class CdsControlSizeBuilder internal constructor(base: CdsControlSize) {
    public var checkboxSize: Dp = base.checkboxSize
    public var radioSize: Dp = base.radioSize
    public var switchWidth: Dp = base.switchWidth
    public var switchHeight: Dp = base.switchHeight
    public var switchThumbSize: Dp = base.switchThumbSize
    public var tileSize: Dp = base.tileSize

    internal fun build(): CdsControlSize = CdsControlSize(
        checkboxSize = checkboxSize,
        radioSize = radioSize,
        switchWidth = switchWidth,
        switchHeight = switchHeight,
        switchThumbSize = switchThumbSize,
        tileSize = tileSize,
    )
}

@CdsThemeDsl
public class CdsTypographyBuilder internal constructor(base: CdsTypography) {
    public var display1: TextStyle = base.display1
    public var display2: TextStyle = base.display2
    public var display3: TextStyle = base.display3
    public var title1: TextStyle = base.title1
    public var title2: TextStyle = base.title2
    public var title3: TextStyle = base.title3
    public var title4: TextStyle = base.title4
    public var headline: TextStyle = base.headline
    public var body: TextStyle = base.body
    public var label1: TextStyle = base.label1
    public var label2: TextStyle = base.label2
    public var caption: TextStyle = base.caption
    public var legal: TextStyle = base.legal

    internal fun build(): CdsTypography = CdsTypography(
        display1 = display1,
        display2 = display2,
        display3 = display3,
        title1 = title1,
        title2 = title2,
        title3 = title3,
        title4 = title4,
        headline = headline,
        body = body,
        label1 = label1,
        label2 = label2,
        caption = caption,
        legal = legal,
    )
}

@CdsThemeDsl
public class CdsShadowBuilder internal constructor(base: CdsShadow) {
    public var color: Color = base.color
    public var offsetY: Dp = base.offsetY
    public var opacity: Float = base.opacity
    public var blurRadius: Dp = base.blurRadius

    internal fun build(): CdsShadow = CdsShadow(
        color = color,
        offsetY = offsetY,
        opacity = opacity,
        blurRadius = blurRadius,
    )
}

@CdsThemeDsl
public class CdsShadowsBuilder internal constructor(base: CdsShadows) {
    private val elevation1Builder = CdsShadowBuilder(base.elevation1)
    private val elevation2Builder = CdsShadowBuilder(base.elevation2)

    public fun elevation1(block: CdsShadowBuilder.() -> Unit): Unit = elevation1Builder.block()
    public fun elevation2(block: CdsShadowBuilder.() -> Unit): Unit = elevation2Builder.block()

    internal fun build(): CdsShadows = CdsShadows(
        elevation1 = elevation1Builder.build(),
        elevation2 = elevation2Builder.build(),
    )
}
