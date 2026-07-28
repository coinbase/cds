# Internal `compact` audit (CDS own call sites)

Scope: JSX call sites in `packages/web/src` and `packages/mobile/src` (excluding `__tests__`,
`__stories__`, `__figma__`, `*.perf-test.*`) that pass the deprecated `compact` prop to a component
whose `compact` is deprecated **in favour of `size`**.

## Summary

**19 actionable findings across 15 files** — 10 findings in 8 web files, 9 findings in 7 mobile
files. Every actionable site is a hardcoded `compact` on a `Button` or `IconButton` (→ `size="s"`).
No in-scope findings involve `Chip`/`InputChip`/`MediaChip`/`SelectChip`/`TabbedChips`, so **no
`size="xs"` replacements are needed** anywhere in CDS's own source. 17 of the 19 containing
components have **no** `size` prop of their own, so the replacement has to be hardcoded. Separately
there are **19 pass-through sites** (a component forwarding its own `compact` prop onward) which
cannot be fixed without touching that component's public API. The alpha select / combobox /
select-chip subtrees were verified clean — every `compact` there is either a pass-through alongside
an explicit `size`, or targets an out-of-scope component (`DefaultSelectOption`,
`DefaultSelectOptionGroup`, `DefaultSelectAllOption`, `DefaultSelectDropdown`).

## Actionable findings

| File                                                                     | Renders      | What it's for                                                                                 | Replacement | Parent has `size`?                                                                |
| ------------------------------------------------------------------------ | ------------ | --------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| `packages/web/src/overlays/Toast.tsx:176`                                | `Button`     | dense action button in toast body                                                             | `size="s"`  | no                                                                                |
| `packages/web/src/pagination/DefaultPaginationNavigationButton.tsx:24`   | `IconButton` | dense prev/next caret button in pager                                                         | `size="s"`  | no                                                                                |
| `packages/web/src/pagination/DefaultPaginationPageButton.tsx:34`         | `Button`     | dense numbered page button in pager                                                           | `size="s"`  | no                                                                                |
| `packages/web/src/cards/UpsellCard.tsx:146`                              | `Button`     | dense inline CTA next to card copy                                                            | `size="s"`  | no                                                                                |
| `packages/web/src/cards/FeedCard.tsx:95`                                 | `Button`     | dense transparent CTA in feed card footer                                                     | `size="s"`  | no                                                                                |
| `packages/web/src/cards/CardBody.tsx:122`                                | `Button`     | dense transparent "action label" link-button                                                  | `size="s"`  | no                                                                                |
| `packages/web/src/cards/MessagingCard/MessagingCardLayout.tsx:142`       | `Button`     | dense secondary CTA for `type="upsell"`                                                       | `size="s"`  | no                                                                                |
| `packages/web/src/cards/MessagingCard/MessagingCardLayout.tsx:198`       | `IconButton` | dense absolutely-positioned dismiss X                                                         | `size="s"`  | no                                                                                |
| `packages/web/src/visualizations/ProgressContainerWithButtons.tsx:37`    | `Button`     | dense "Re-render" demo control                                                                | `size="s"`  | no                                                                                |
| `packages/web/src/visualizations/ProgressContainerWithButtons.tsx:41`    | `Button`     | dense "Increase 20%" demo control                                                             | `size="s"`  | no                                                                                |
| `packages/mobile/src/overlays/Toast.tsx:125`                             | `Button`     | dense action button in toast body                                                             | `size="s"`  | no                                                                                |
| `packages/mobile/src/cards/UpsellCard.tsx:138`                           | `Button`     | dense inline CTA next to card copy                                                            | `size="s"`  | no                                                                                |
| `packages/mobile/src/cards/FeedCard.tsx:96`                              | `Button`     | dense transparent CTA in feed card footer                                                     | `size="s"`  | no                                                                                |
| `packages/mobile/src/cards/CardBody.tsx:83`                              | `Button`     | dense default for the private `CardBodyAction` wrapper (its own `compact` defaults to `true`) | `size="s"`  | yes — `ButtonSize` (via `CardBodyActionProps = ButtonProps & …`)                  |
| `packages/mobile/src/cards/MessagingCard/MessagingCardLayout.tsx:113`    | `Button`     | dense secondary CTA for `type="upsell"`                                                       | `size="s"`  | no                                                                                |
| `packages/mobile/src/cards/MessagingCard/MessagingCardLayout.tsx:161`    | `IconButton` | dense absolutely-positioned dismiss X                                                         | `size="s"`  | no                                                                                |
| `packages/mobile/src/dates/DatePicker.tsx:286`                           | `Button`     | dense full-width confirm CTA in the calendar `Tray` footer                                    | `size="s"`  | yes — `TextInputSize` (`size?: TextInputSize`, documented as the _input_ density) |
| `packages/mobile/src/visualizations/ProgressContainerWithButtons.tsx:37` | `Button`     | dense "Re-render" demo control                                                                | `size="s"`  | no                                                                                |
| `packages/mobile/src/visualizations/ProgressContainerWithButtons.tsx:41` | `Button`     | dense "Increase 20%" demo control                                                             | `size="s"`  | no                                                                                |

## Pass-throughs (not directly fixable)

These forward the containing component's **own** `compact` prop; changing them means changing that
component's public API.

Web:

- `packages/web/src/pagination/DefaultPaginationNavigationTextButton.tsx:27` — forwards its own `compact` to `Button` (**defaults to `true`**, so it also hardcodes density; props are `ButtonProps<typeof Button>`, so `size: ButtonSize` is already available)
- `packages/web/src/carousel/DefaultCarouselNavigation.tsx:154` — forwards its own `compact` to `IconButton` (autoplay button)
- `packages/web/src/carousel/DefaultCarouselNavigation.tsx:165` — forwards its own `compact` to `IconButton` (previous button)
- `packages/web/src/carousel/DefaultCarouselNavigation.tsx:176` — forwards its own `compact` to `IconButton` (next button)
- `packages/web/src/controls/SearchInput.tsx:161` — forwards its own (deprecated) `compact` to `TextInput`
- `packages/web/src/chips/MediaChip.tsx:67` — forwards its own (deprecated) `compact` to `Chip`
- `packages/web/src/dates/DatePicker.tsx:308` — forwards its own (deprecated) `compact` to `DateInput`
- `packages/web/src/alpha/select/Select.tsx:333` — forwards its own (deprecated) `compact` to `SelectControlComponent` (`DefaultSelectControl`)
- `packages/web/src/alpha/select-chip/SelectChip.tsx:68` — forwards the wrapper factory's captured `compact` to `SelectChipControl`
- `packages/web/src/alpha/select-chip/SelectChipControl.tsx:156` — forwards its own `compact` to `MediaChip` (passes `size` on the same element)
- `packages/web/src/alpha/combobox/DefaultComboboxControl.tsx:73` — forwards its own (deprecated) `compact` to `SelectControlComponent` (`DefaultSelectControl`)

Mobile:

- `packages/mobile/src/carousel/DefaultCarouselNavigation.tsx:114` — forwards its own `compact` to `IconButton` (autoplay button)
- `packages/mobile/src/carousel/DefaultCarouselNavigation.tsx:124` — forwards its own `compact` to `IconButton` (previous button)
- `packages/mobile/src/carousel/DefaultCarouselNavigation.tsx:134` — forwards its own `compact` to `IconButton` (next button)
- `packages/mobile/src/chips/MediaChip.tsx:69` — forwards its own (deprecated) `compact` to `Chip`
- `packages/mobile/src/dates/DatePicker.tsx:257` — forwards its own (deprecated) `compact` to `DateInput`
- `packages/mobile/src/navigation/BrowserBarSearchInput.tsx:51` — forwards its own `compact` to `SearchInput` (**defaults to `true`**; props are `SearchInputProps`, so `size: TextInputSize` is already available)
- `packages/mobile/src/alpha/select/Select.tsx:200` — forwards its own (deprecated) `compact` to `SelectControlComponent` (`DefaultSelectControl`)
- `packages/mobile/src/alpha/select-chip/SelectChip.tsx:59` — forwards the wrapper's captured `compact` to `SelectChipControl`
- `packages/mobile/src/alpha/select-chip/SelectChipControl.tsx:151` — forwards its own `compact` to `MediaChip` (passes `size` on the same element)

## Notes

- **`IconButton` defaults `compact` to `true`.** For the three `IconButton` findings (web pagination
  nav button, web + mobile `MessagingCardLayout` dismiss), simply deleting `compact` is already
  behaviour-neutral, because with no `size` the button still resolves to `s`. Writing `size="s"`
  explicitly is still preferable so the intent survives `compact`'s removal.
- **Two "defaulted pass-throughs" deserve a human decision.**
  `DefaultPaginationNavigationTextButton` (`compact = true`) and mobile `BrowserBarSearchInput`
  (`compact = true`) look like pure forwards but actually assert density via their default. Both are
  publicly exported and both already inherit `size` (`ButtonProps` / `SearchInputProps`), so the
  clean fix is to default `size` instead of `compact` and stop forwarding `compact` explicitly
  (letting any consumer-supplied `compact` flow through the rest spread). That is technically a
  behaviour change for a caller who passes `compact={false}` today.
- **Scale mismatch at `packages/mobile/src/dates/DatePicker.tsx:286`.** `DatePicker.size` is a
  `TextInputSize` and is documented as controlling _"the vertical density (size) of the DatePicker's
  input field"_. The finding is the `Tray` footer confirm CTA, whose `size` would be a `ButtonSize`.
  Deriving the footer CTA from the input density is probably wrong — recommend hardcoding `size="s"`.
- **`packages/mobile/src/cards/CardBody.tsx:83` is the only finding whose container is private.**
  `CardBodyAction` is a module-local `memo` component (not exported), so swapping its
  `compact = true` default for `size = 's'` is safe and has no public API impact. Note the web
  equivalent (`packages/web/src/cards/CardBody.tsx:122`) inlines a `Button` instead of using a
  wrapper — the two platforms diverge here. (Both `CardBody`s are already deprecated in favour of
  `ContentCardBody`, removal v10, so this may not be worth fixing at all.)
- **`ProgressContainerWithButtons` (web + mobile) is dev/demo scaffolding** shipped from
  `visualizations/`. Low-risk, mechanical fix.
- **JSDoc examples still recommend `compact`** (not runtime code, so not counted as findings, but
  they will teach consumers the deprecated API): `packages/web/src/cards/UpsellCard.tsx:71`,
  `packages/mobile/src/cards/UpsellCard.tsx:72`, `packages/web/src/cards/NudgeCard.tsx:150`,
  `packages/mobile/src/cards/NudgeCard.tsx:84` — all of the form
  `actions={<Button compact variant="secondary">…</Button>}`.
- **Verified out of scope** (checked, deliberately excluded): web `TextInput.tsx:312` and mobile
  `TextInput.tsx:358` pass `compact={resolvedSize === 's'}` to `NativeInput` (padding deprecation,
  and it is already derived from the new `size`); web `SelectTrigger.tsx:97` → `SelectStack`; mobile
  `controls/Select.tsx:185` → `InputIcon`; the whole `sparkline-interactive` tree (its `compact` is
  the chart's own density prop, e.g. `SparklineInteractive.tsx:411`/`412`,
  `SparklineInteractiveHeader.tsx:297`); alpha `DefaultSelectDropdown` /
  `DefaultSelectOptionGroup` / `DefaultSelectAllOption` option-density passes; `ContentCell.tsx`
  (`compact` → `spacingVariant`); `AvatarButton`, `LikeButton`, `StickyFooter`, `SlideButton`,
  `Chip`, `TabbedChips` (own-prop declaration or internal boolean logic only); and non-JSX helper
  calls such as `getButtonSpacingProps({ compact, flush })` and
  `getCardBodyPaddingProps({ compact: true })`.
