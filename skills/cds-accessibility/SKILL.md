---
name: cds-accessibility
description: |
  Reviews already-written Coinbase Design System (CDS) UI for accessibility: verifying documented
  accessibility props (e.g. accessibilityLabel, accessibilityState), confirming the chosen CDS primitives
  cover the right assistive technology behavior, and checking usage against official CDS documentation—not
  generic web ARIA tutorials. Use this skill to review CDS UI for screen reader, keyboard, and labeled
  control requirements after the code has been written.
license: Apache-2.0
metadata:
  version: '2.0.0'
---

# cds-accessibility

Use this skill to **review CDS UI for accessibility after it has been written**: confirm that **documented** props and patterns from CDS are applied, and that the **chosen CDS components** have official docs describing the interaction the code needs. Do **not** use this file as a generic WCAG or ARIA handbook. **Whenever you need official CDS documentation,** load it with the [**cds-docs**](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) skill, which is the single source for current CDS component docs (the official docs site is [cds.coinbase.com](https://cds.coinbase.com/)). Do **not** guess `aria-*` or RN prop names from third-party blogs.

## When to use

- Use **after CDS UI has been written** (by you or someone else) to review whether **names, state, roles, or announcements** match what CDS supports.
- Use to verify **React Native** accessibility props (`accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `accessibilityRole`, and any CDS-specific props) against the component docs.
- Use to verify **web** CDS components are wired with **`aria-*`**, `as`, `role`, labels, and field patterns **as the CDS web component API exposes** in the doc.
- Use to check whether a **CDS component choice** was correct when accessibility behavior (focus, dialog behavior, list semantics) should have driven it—confirm the chosen component's doc matches the task.
- Use alongside **`cds-code`**: that skill covers building CDS layout, tokens, and imports; this skill **reviews CDS accessibility consumption** and **CDS-appropriate** component choice for a11y after the build.
- Do not use as the only reference for **non-CDS** pages with no design-system components. Do not replace the **official CDS component doc** (loaded via **cds-docs**) with guessed prop names or third-party blog patterns.

## Prerequisites

- **cds-docs (required):** Use the [**cds-docs**](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) skill to load **current** official CDS component documentation. Choose **web** or **mobile**, then load the component pages you need for props and a11y examples. **If the cds-docs skill is not installed,** tell the user it is missing and that accessibility review accuracy depends on current CDS docs; continue only with what you can verify from the codebase, and flag anything you could not confirm against the docs.
- For full CDS UI build steps (package discovery, styling, theming, visual check), the **`cds-code`** skill is the source; this skill reviews the result of that work for accessibility.

## Success criteria

For a given change, **this review is complete** when all three dimensions below are true. If any dimension is not met, the review found a gap (or the gap is out of scope for CDS—continue with docs, add verification, or escalate).

### 1. CDS props for accessibility

- Every **interactive** or **name-bearing** CDS control in the change has props set **as required or recommended** in the current **official CDS component doc** (loaded via **cds-docs**) for that **platform** (do not mix **web** and **React Native** patterns).
- **Form, validation, errors, and live regions** follow the **documented** association and feedback patterns for the CDS form components in use, not a generic or off-repo pattern.
- **Icons, images, and media** follow CDS doc guidance for **decorative vs meaningful** content and any `alt` / `accessibilityLabel` (or equivalent) requirements.
- If the change includes a **focus-managed** CDS component (see **Part 1, Step 5**; examples: **Modal**, **Tray**, **Tooltip**, or any component whose doc defines focus APIs), **open/close/Tab/restore** behavior matches the **official** **CDS** doc (loaded via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)); if there are no such components, this bullet does not apply.
- If the change includes **CDS `Text`** (or equivalent typography) for **titles, headings, or body/label copy**, **`as` (web)** and **`accessibilityRole` (RN)** match **content intent** and the **Text** (typography) doc; do **not** use **heading** semantics on **non-heading** `font` styles when that would **misrepresent** structure (per the **Text** web/mobile doc loaded via **cds-docs**). If `Text` is not in the change, this bullet does not apply.

### 2. Component selection (confident and documented)

- For each interaction pattern in scope (overlay, list, data entry, navigation, etc.), the **chosen** CDS building block is the **smallest** option whose **doc** still covers the **accessibility-relevant** behavior (focus, keyboard, role, announcements).
- Where CDS offers a **composite** (e.g. modal, select, list row, form field) for that pattern, that composite is used—unless the **doc** or product constraints justify a primitive, and that justification is **explicit** in terms of what the doc does and does not cover (or the gap in CDS is called out as undocumented).
- A **generic** ARIA or ad hoc pattern is not substituted when CDS already documents a **CDS** pattern for that interaction.

### 3. Documentation engagement (read and applied)

- For **each** CDS component in the change, **current** official documentation was loaded **via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)**. Include **cross-linked** routes the doc points to (e.g. `FormField`, `Modal` composition) when they affect the feature.
- The implementation is explainable in terms of **specific** doc material—prop table, examples, a11y or platform notes—not only “it looks right” visually.
- If the doc or your team’s process requires a **device or manual** check (e.g. VoiceOver, TalkBack), that expectation is **acknowledged** as satisfied, or **explicitly** still pending with a clear reason.

| Dimension     | The review is complete when                                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Props**     | In-scope components use **doc-correct** CDS a11y props and patterns for the platform. **Focus-managed** components (Step 5) match **doc** for focus when applicable.                                                              |
| **Selection** | Component choices match **documented** a11y behavior; composites are used when the doc prescribes them for the interaction, not guessed primitives.                                                                               |
| **Docs**      | Relevant **CDS** doc content (loaded via **cds-docs**) and cross-links are **read and reflected** in the code; any verification gap is stated. **Text**/typography semantics align with the **Text** doc when `Text` is in scope. |

---

## Part 1: Workflow – what to do

Follow these steps **in order** when reviewing the accessibility of **CDS** components in already-written code.

### Setup (align platform and **cds-docs**)

1. Determine whether the code under review is **web** or **mobile** (or both). When in doubt, the **`cds-code`** setup (package discovery) establishes this; keep **platform** consistent so you load the right docs.
2. For **each CDS component** in the change, plan to load its doc via **cds-docs** with emphasis on **accessibility**, **props tables**, and **examples**.

You do not need to repeat full setup for every small review; repeat when **runtime or major CDS version** might have changed.

### Step 1: Scope the CDS surface

1. State whether the work is **web** or **React Native** (or both), and load docs for that runtime via **cds-docs**.
2. **List CDS components** in the change. Ignore arbitrary raw HTML unless a CDS pattern in the docs maps to it.
3. If a feature could use a **higher-level CDS component** (modal, list, form field) versus composing only `Box`/`View`, note it—you will compare docs in Step 3.

### Step 2: Pull accessibility-relevant docs per component

For each component in the list:

1. Load its **doc** via **cds-docs**, and also load any **sub-routes** the doc **cross-links** (e.g. usage with `FormField` or `Modal`).
2. Read the **prop table** and any **Accessibility**, **ARIA**, **Screen reader**, or **React Native** notes. Treat **required** or **strongly recommended** label/name props as mandatory for the scenarios the doc describes.

If the doc is thin for your platform, still **do not invent** a full generic ARIA layer—**follow the published doc** and, if the gap is blocking, call out that the behavior is not specified in CDS for that component.

### Step 3: Check the CDS component choice (accessibility angle)

1. If multiple CDS components could work, the chosen one should be the one whose **documentation** describes the right **focus management, keyboard, role, and announcements** for the interaction (e.g. a documented `Modal` or `Select` over a hand-built stack).
2. Prefer **smallest component whose doc fully covers the interaction** over a lower primitive plus custom behavior.
3. Defer to **`cds-code`** for overall “which component for layout/visuals”; use this step when **assistive technology behavior** is the differentiator.

### Step 4: Verify documented accessibility APIs

1. **React Native:** confirm `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `accessibilityRole`, and any other props **the CDS component doc names** for the use case are set. Do not accept labels copied from old code without re-checking the current prop table.
2. **Web:** confirm `aria-*`, `as`, `role`, `htmlFor` / `id` / field wiring are used **only** as the CDS **web** component API and examples show. Prefer the component’s **first-class props** (e.g. a dedicated `label` or slot) over ad hoc ARIA on the wrong element.
3. For **form validation and errors**, confirm the **CDS form patterns** the doc links are used—association and live regions must match the documented approach.
4. For **decorative vs informative** icons and images, confirm CDS `Icon` / `Image` (or media) guidance in the **official** **CDS** doc (loaded via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) is followed.
5. For **CDS `Text`** and **typography**, confirm **`as` (web)** / **`accessibilityRole` (React Native)** per **Part 2, Text (typography) and heading semantics** and the **Text** **official** doc (loaded via **cds-docs**); skip if the change has no `Text` (or equivalent) in scope.

### Step 5: Focus management (focus-managed components only)

**When to run this step:** only if the Step 1 component list includes at least one **focus-managed** CDS component **per the published official doc** (loaded via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs))—typically **overlays and floating UI** (examples: **Modal**, **Tray**, **Tooltip**; also **drawer**, **popover**, or others **only if** the doc describes **focus** movement, **trap**, **initial/restore** focus, or **keyboard** dismiss). If the change is **only** static layout, inline fields, or components whose docs **do not** define focus management, **skip** this step and go to **Step 6: Verify**.

1. For **each** in-scope component, read the **official** **CDS** doc (via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) for **focus**, **keyboard**, **accessibility**, and any **ref/method** patterns, using the worked examples that match your CDS version.
2. Confirm the code implements **only** what the doc specifies: where focus **lands on open**, how **Tab** (or platform equivalent) **cycles within** the surface, how focus **restores on close**, and **dismiss** behavior (e.g. Esc) if documented.
3. **Do not** assume **Tooltip** behaves like **Modal**—hover vs click, `aria` behavior, and whether focus **moves** at all are **per component doc**. Flag any home-grown `tabIndex`/listener stack when **CDS** already documents the path.

### Step 6: Verify

1. **Doc match:** usage matches the **examples** and prop constraints in the doc you read (including platform-specific snippets).
2. If the doc or your team’s process expects a **device check** (e.g. VoiceOver on a build), note that; do not claim “accessible” from code shape alone if the task requires that verification.
3. When the **`cds-code`** flow applies, its **visual** verification pass still stands; this review does not replace that—it adds **CDS a11y API** correctness.
4. **If you ran Step 5:** for each **focus-managed** component, confirm **open → focus** as documented, **Tab/keyboard cycle** as documented, **close → focus restore** as documented, and **dismiss** keys if the doc requires them. **If you skipped Step 5,** omit this bullet.

### Step 7: Final checklist

1. **Definition of done:** all items in **Success criteria** (above) are true for this change—**props** (including **focus** for focus-managed components when in scope), **component selection**, and **documentation engagement**.
2. **Operational follow-through:** if the **`cds-code`** workflow was used to build the UI, its **visual** verification is still in place; this review adds CDS a11y consumption and does not replace layout, styling, or import checks from that skill.

---

## Part 2: Reviewing CDS for accessibility

These patterns are **not** a substitute for reading each component’s doc. They tell you **what to look for** in the doc you loaded via **cds-docs** for the same component.

### Doc discipline

- **Prop names and values** must match the **current** published doc for your **major CDS version** in the repo. Do not accept snippets from old internal posts or from **web** ported into **React Native** without checking the right doc.
- If something is **not in CDS** docs, this skill does not authorize inventing a full custom widget spec—escalate or use non-CDS guidance **outside** this skill’s scope.

### Text (typography) and heading semantics

**The consumer** is responsible for pairing **visual `font` styles** on CDS **`Text`** with **correct assistive names and roles** so structure matches the real page or screen. **Source of truth:** the **Text** **web** and **mobile** **official** docs (loaded via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs))—not generic HTML heading blogs.

**Web (React):**

- When **`Text`** is used for **headings** (commonly **`font`** values such as **display** or **title** when they represent section or page titles), **`as`** should be set to the **appropriate** heading element (`h1`–`h6`) so the **document outline** and screen readers match the **authoring** intent. Follow the **Text** **official** doc and **examples** for which **`font`** values pair with which **`as`**.
- For **`font`** values meant as **non-heading** copy—typically **body**, **headline** (emphasis, not a document heading), **label**, **caption**—**`as`** should **not** be a **heading** (or other semantic) role when that would **misrepresent** structure (e.g. body text announced as a heading). If the **Text** doc is updated, the **official** **CDS** doc (loaded via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) wins over this list.
- **Do not** apply arbitrary rules from this skill such as “exactly one `h1` per page” or “every screen must include an `h1`” unless **CDS** documentation **explicitly** requires it for a pattern. Prefer **logical heading order** and product/IA; do **not** treat **headline** `font` as a **heading** role without checking the **Text** doc.

**React Native:**

- The platform is limited: for **heading** content on **`Text`**, use **`accessibilityRole="heading"`** when the string is a heading—this is the primary way to expose heading semantics for typography. Heading level is weaker than on web; if the **mobile** **Text** doc exposes **`accessibilityLevel`** (or similar), it should be set per the **official** **Text** **mobile** doc.
- **`accessibilityRole="heading"`** should **not** be set on **body**, **label**, **caption**, or other **non-heading** uses when that would **mis-announce** structure; follow the **mobile** **Text** doc for which `font` values may pair with a heading role.
- Do **not** accept web **`as="h1"`** patterns ported literally—use the **mobile** **Text** doc; **`accessibilityRole="heading"`** is the best match available on RN for heading-like **`Text`** when a heading is intended.

### React Native (CDS mobile)

- Open each component’s **mobile** **official** **CDS** doc. Scan for: `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `accessibilityRole`, `accessible`, and any **CDS-prefixed** or forwarded props the doc lists.
- Confirm **labels** are set for controls whose visible text is missing, ambiguous, or icon-only when the **doc** says to supply a name or when the **example** does.
- For **state** (selected, disabled, busy), confirm the patterns the **doc** shows are used—often `accessibilityState` in combination with the component’s own `disabled` / `value` props.
- For **headings, lists, and navigational structure**, confirm CDS components whose **docs** define the right **role** and structure for RN VoiceOver are used (e.g. list cells vs flat `View` list). For **`Text`**, **heading** vs **body** treatment is covered in **Text (typography) and heading semantics** above.
- For **Modals, trays, tooltips**, and other **overlays** when the **mobile** doc describes **focus** or dismiss behavior, confirm the **official** **CDS** **mobile** doc (loaded via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) and **Part 1, Step 5** are followed when that step applies—do not accept web-only focus patterns.

### Web (CDS web)

- Read the **web** **official** **CDS** doc for the component. Confirm the **documented** usage of:
  - **`as` and `role`** on `Box` and similar when the page needs **landmark or widget** semantics the doc allows.
  - **`Text` / typography and headings** (**`as`** for real headings, not body/label/caption as headings): see **Text (typography) and heading semantics** above.
  - **Labeling:** native `<label>`, `aria-labelledby`, `aria-label`, or component **`label` / `Slot`** patterns **exactly** as the form control doc specifies.
  - **Focus-managed overlays and floating UI (Modal, Tray, Tooltip, and similar when the doc defines focus):** follow **Part 1, Step 5** and the component’s **web** **official** **CDS** doc and its worked **focus** patterns—**not** a generic ad hoc `tabIndex` or focus-trap blog recipe.
- Flag **ARIA** bolted onto a child node that the component does not document; it may get **double-announced** or **ignored** output.

### Choosing the right component (heuristics)

- Prefer a **CDS composite** (data table, select, dialog, list row) over **`Box` + ad hoc** when the **doc** for the composite already specifies **semantics, focus, and keyboard** for that pattern.
- When **two** CDS entry points exist (e.g. low vs high level), the one whose **“Accessibility” or “When to use”** section matches the **screen reader and keyboard** requirements should be used.
- **Visualization** components: read **cds-web-visualization** / **cds-mobile-visualization** docs (via **cds-docs**) for **data point** and **legend** behavior before custom composition.

### Forms and errors

- Confirm CDS **form field, input, and validation** components are used as the **doc** chains them (e.g. helper text, error text, `aria-describedby` or RN equivalents as documented). Errors must not be wired only with color if the **doc** requires text association or announcements.

### Media, icons, and images

- Confirm CDS **`Icon`**, image, and media components are used per the **official** **CDS** doc: **decorative** vs **informative** alternatives, and any **`alt` / `accessibilityLabel`** requirements.

### Explicit non-goal

- **Generic** “how to do accessibility on the web” that ignores CDS APIs. For gaps in CDS, rely on **CDS** documentation updates, design system support, or **external** resources—not this skill’s inventory of raw ARIA recipes.

---

## Part 3: Reference

### CDS resources

- **Docs:** Load any CDS component doc (including a11y notes) via the [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) skill. Choose **web** or **mobile**, then load the component pages you need. The official docs site is [cds.coinbase.com](https://cds.coinbase.com/) for human browsing alongside the cds-docs skill.
- **Text (typography):** Load the **Text** **web** and **mobile** docs via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) (**`as`**, `font`, heading semantics on web; **`accessibilityRole`** on React Native).

### Relationship to `cds-code`

- **`cds-code`** produces **CDS-first UI** (layout, StyleProps, theming, imports, visualization, **visual** verification, package discovery). It is used for **how to build the screen** and for **import correctness**.
- **`cds-accessibility` (this skill)** **reviews** that the **CDS components are used with the right accessibility props and component choices** as **documented** for web and mobile, after the code has been written. Typical flow on feature work: build with `cds-code`, then run this skill’s review workflow for **a11y consumption** (loading docs via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)).

### Common props: mental map (read the doc, do not hardcode from memory)

| Concern            | React Native (see mobile doc)                             | Web (see web doc)                                                                                                                                                |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exposed name       | Often `accessibilityLabel`, sometimes with visible `Text` | `accessibilityLabel` (when the web doc lists it for name), then `aria-label`, `aria-labelledby`, or **label** / slot props on the field                          |
| Hint / description | `accessibilityHint` where doc allows                      | `aria-describedby` or description slots per **official** **CDS** **web** doc (loaded via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) |
| State              | `accessibilityState` + component state props              | `aria-*` state per component table (`aria-expanded`, `aria-selected`, etc.)                                                                                      |
| Role / semantics   | `accessibilityRole` and CDS structural components         | `as`, `role`, semantic elements in **doc examples**                                                                                                              |
| Form errors        | Follow CDS form doc                                       | Follow CDS form doc                                                                                                                                              |

**Always** fill this table from the **current** **CDS** component doc (loaded via [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) for the **specific** component version you use. The table is a **search checklist**, not a spec.

### Anti-patterns

- **Guessing** `accessibilityLabel` or `aria-label` strings without reading the **current** component doc and **content** guidelines.
- **Skipping** a required doc prop because the app “looked fine” in a visual-only check.
- **Building** a custom modal, list, or form from `Box`/`View` when CDS documents a **CDS** component with defined **focus and semantics** for that job.
- **Copy-pasting** **web** ARIA into **React Native** props or the reverse; docs are **platform-specific**.
- **Conflicting** this skill with **`cds-code`**: correct CDS imports, layout, and tokens are still required—this skill does not override missing **`cds-code`** requirements.

### Where this skill stops

If the **official** **CDS** doc (loaded via **cds-docs**) does not document a behavior you need, **do not** fabricate a full custom accessibility architecture inside this skill’s name—record the gap, use **design/DS** follow-up, or **external** accessibility guidance for non-CDS layers.
