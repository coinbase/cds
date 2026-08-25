# CDS for Jetpack Compose — documentation

Guides for teams building Android apps on the Coinbase Design System.

| Guide                                       | Read it when                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Using theme tokens](using-tokens.md)       | You're building UI on CDS: reading tokens in a composable, and carrying them through your own state and logic. **Start here.** |
| [Creating a custom theme](custom-themes.md) | You want CDS components to render in your brand's colors, spacing, type, or shape.                                             |
| [Theme token reference](token-reference.md) | You need the full list of token names, or the default values behind them.                                                      |
| [Publishing a version](releasing.md)        | You're cutting a GitHub Release of the AAR: version bump, changelog, build, and `gh release create`. Maintainers only.         |

For API-level detail on a specific type, see its KDoc. For the internal rationale behind the token
layer's design (why the builder DSL, why `equals` is hand-written, how ABI compatibility is
enforced), see [`../src/main/java/com/coinbase/cds/theme/README.md`](../src/main/java/com/coinbase/cds/theme/README.md).

## The 30-second version

Wrap your app in `CdsThemeProvider` and CDS components pick up every token from it:

```kotlin
CdsThemeProvider(theme = MyBrandTheme) {
    App()
}
```

Read tokens anywhere below that provider through the `CdsTheme` accessors:

```kotlin
Box(
    Modifier
        .background(CdsTheme.colors.bg)
        .padding(CdsTheme.space.x2),
)
```

Build `MyBrandTheme` with the `cdsTheme` DSL, overriding only the tokens you care about:

```kotlin
val MyBrandTheme: CdsTheme = cdsTheme {
    id = "my-brand"
    lightColors { bgPrimary = Color(0xFF7B3FE4) }
    darkColors { bgPrimary = Color(0xFFAE8AFB) }
}
```

Everything else is elaboration on those three snippets.
