# CDS for SwiftUI — documentation

Guides for teams building iOS apps on the Coinbase Design System.

| Guide                                       | Read it when                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Using theme tokens](using-tokens.md)       | You're building UI on CDS: reading tokens in a view, and carrying them through your own state and logic. **Start here.**       |
| [Creating a custom theme](custom-themes.md) | You want CDS views to render in your brand's colors, spacing, type, or shape.                                                  |
| [Theme token reference](token-reference.md) | You need the full list of token names, or the default values behind them.                                                      |
| [Publishing a version](releasing.md)        | You're cutting a GitHub Release of the XCFramework: version bump, changelog, build, and `gh release create`. Maintainers only. |

For the module's API boundary and contribution rules, see [`../AGENTS.md`](../AGENTS.md). For the RN
parity notes and the demo gallery, see [`../README.md`](../README.md).

## The 30-second version

Wrap your app in `CDSThemeProvider` and CDS views pick up every token from it:

```swift
CDSThemeProvider(theme: MyBrandTheme) {
    RootView()
}
```

Read tokens anywhere below that provider through the `\.cdsTheme` environment value:

```swift
struct Card: View {
    @Environment(\.cdsTheme) private var theme

    var body: some View {
        Text("Balance")
            .foregroundStyle(theme.colors.fg)
            .padding(theme.spacing.x2)
            .background(theme.colors.bg)
    }
}
```

Build `MyBrandTheme` with the `cdsTheme { }` builder, overriding only the tokens you care about:

```swift
let MyBrandTheme: CDSThemeSet = cdsTheme {
    $0.id = "my-brand"
    $0.light = $0.light.with { $0.bgPrimary = Color(cdsHex: 0x7B3FE4) }
    $0.dark = $0.dark.with { $0.bgPrimary = Color(cdsHex: 0xAE8AFB) }
}
```

Everything else is elaboration on those three snippets.
