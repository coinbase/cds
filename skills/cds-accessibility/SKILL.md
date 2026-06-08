---

name: cds-accessibility

description: |
  Teaches how to use Coinbase Design System (CDS) components accessibly: documented accessibility props
  (e.g. accessibilityLabel, accessibilityState), choosing CDS primitives whose docs cover the right assistive
  technology behavior, and verifying usage against official CDS documentation—not generic web ARIA tutorials.
  Use this skill when implementing or reviewing CDS UI for screen reader, keyboard, and labeled control
  requirements. Ground in current CDS component docs per the cds-docs skill (MCP or curl; see skill body)—and
  [https://cds.cbhq.net/](https://cds.cbhq.net/) for human-readable browsing when helpful.
license: Apache-2.0
metadata:
  author: [design-system@coinbase.com](mailto:design-system@coinbase.com)
  version: "1.0.3"

---

# cds-accessibility

Use this skill to **consume CDS components accessibly**: apply **documented** props and patterns from CDS, and **choose CDS components** whose official docs describe the interaction you need. Do **not** use this file as a generic WCAG or ARIA handbook. **When in doubt,** follow [**cds-docs**](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) to load **current** CDS component documentation. **Prefer** the **CDS MCP** tools `list-cds-routes` and `get-cds-doc` when the MCP is available; **if MCP is not configured, fails, or returns errors,** use **`curl -fsSL`** to `https://cds.coinbase.com/llms/...` per cds-docs (start from the [web](https://cds.coinbase.com/llms/web/routes.txt) or [mobile](https://cds.coinbase.com/llms/mobile/routes.txt) route index, then fetch only the pages you need; routes are case-sensitive). [cds.cbhq.net](https://cds.cbhq.net/) is an optional **human** companion. Do **not** guess `aria-*` or RN prop names from third-party blogs.

## When to use

- Use when you implement, extend, or review **CDS** UI and need **names, state, roles, or announcements** to match what CDS supports.
- Use when you must set **React Native** accessibility props (`accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `accessibilityRole`, and any CDS-specific props) per component docs.
- Use when you must wire **web** CDS components using **`aria-*`**, `as`, `role`, labels, and field patterns **as the CDS web component API exposes** in the doc.
- Use when you must **pick between two CDS options** and accessibility behavior (focus, dialog behavior, list semantics) should drive the choice—read which component’s doc matches the task.
- Use alongside **`cds-code`**: that skill covers building CDS layout, tokens, and imports; this skill covers **CDS accessibility consumption** and **CDS-appropriate** component choice for a11y.
- Do not use as the only reference for **non-CDS** pages with no design-system components. Do not replace the **official CDS component doc** (per **cds-docs**) with guessed prop names or third-party blog patterns.

## Prerequisites

- **cds-docs (required):** You can follow [**cds-docs**](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) to load **current** official CDS component documentation. Choose **web** or **mobile**, start from the **route index** (`list-cds-routes` with MCP, or the same index via `curl` to `https://cds.coinbase.com/llms/{web|mobile}/routes.txt`), then fetch the `.txt` pages you need for props and a11y examples. **CDS MCP** with `get-cds-doc` / `list-cds-routes` is the **preferred first step** when available (same as **`cds-code`**). **If MCP is unavailable or errors,** use **`curl -fsSL`**, per cds-docs, against `https://cds.coinbase.com/llms/<route>`, where `<route>` comes from the index.
- **cds.cbhq.net (recommended):** [cds.cbhq.net](https://cds.cbhq.net/) for browsing and deep links when you need **human** context alongside the `llms` / MCP sources.
- For full CDS UI build steps (package discovery, styling, theming, visual check), use the **`cds-code`** skill; run its session setup when you are also building or refactoring screens.

## Success criteria

For a given change, **this skill is complete** when all three dimensions below are true. If any dimension is not met, the work is not done (or the gap is out of scope for CDS—continue with docs, add verification, or escalate).

### 1. CDS props for accessibility

- Every **interactive** or **name-bearing** CDS control in the change has props set **as required or recommended** in the current **official CDS component doc** (per **cds-docs** and **`get-cds-doc`** or the equivalent `curl` fetch) for that **platform** (do not mix **web** and **React Native** patterns).
- **Form, validation, errors, and live regions** follow the **documented** association and feedback patterns for the CDS form components in use, not a generic or off-repo pattern.
- **Icons, images, and media** follow CDS doc guidance for **decorative vs meaningful** content and any `alt` / `accessibilityLabel` (or equivalent) requirements.
- If the change includes a **focus-managed** CDS component (see **Part 1, Step 5**; examples: **Modal**, **Tray**, **Tooltip**, or any component whose doc defines focus APIs), **open/close/Tab/restore** behavior matches the **official** **CDS** doc (per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) and any examples you used (e.g. [Modal](https://cds.cbhq.net/components/overlay/Modal/)); if there are no such components, this bullet does not apply.
- If the change includes **CDS `Text`** (or equivalent typography) for **titles, headings, or body/label copy**, **`as` (web)** and **`accessibilityRole` (RN)** match **content intent** and the [Text (typography) doc](https://cds.cbhq.net/components/typography/Text/); do **not** use **heading** semantics on **non-heading** `font` styles when that would **misrepresent** structure (per the **Text** web/mobile doc from **cds-docs**). If `Text` is not in the change, this bullet does not apply.

### 2. Component selection (confident and documented)

- For each interaction pattern in scope (overlay, list, data entry, navigation, etc.), the **chosen** CDS building block is the **smallest** option whose **doc** still covers the **accessibility-relevant** behavior (focus, keyboard, role, announcements).
- Where **`get-cds-doc`** offers a **composite** (e.g. modal, select, list row, form field) for that pattern, you use that composite—unless the **doc** or your product constraints justify a primitive, and that justification is **explicit** in terms of what the doc does and does not cover (or the gap in CDS is called out as undocumented).
- You do not substitute a **generic** ARIA or ad hoc pattern when **`get-cds-doc`** already prescribes a **CDS** pattern for that interaction.

### 3. Documentation engagement (read and applied)

- For **each** CDS component in the change, **current** official documentation was loaded **per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)**: **prefer** **`list-cds-routes`** and **`get-cds-doc`** (CDS MCP) when available; if MCP is unavailable or fails, use **`curl -fsSL`** to `https://cds.coinbase.com/llms/...` from the route index, per cds-docs. Include **cross-linked** routes the doc points to (e.g. `FormField`, `Modal` composition) when they affect your feature. Use [cds.cbhq.net](https://cds.cbhq.net/) for extra context when needed.
- The implementation is explainable in terms of **specific** doc material—prop table, examples, a11y or platform notes—not only “it looks right” visually.
- If the doc or your team’s process requires a **device or manual** check (e.g. VoiceOver, TalkBack), that expectation is **acknowledged** as satisfied, or **explicitly** still pending with a clear reason.

| Dimension     | The skill is complete when                                                                                                                                                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Props**     | In-scope components use **doc-correct** CDS a11y props and patterns for the platform. **Focus-managed** components (Step 5) match **doc** for focus when applicable.                                                                                      |
| **Selection** | Component choices match **documented** a11y behavior; composites are used when the doc prescribes them for the interaction, not guessed primitives.                                                                                                       |
| **Docs**      | Relevant **CDS** doc content (per **cds-docs**, **MCP** or **curl** as needed) and cross-links are **read and reflected** in the code; any verification gap is stated. **Text**/typography semantics align with the **Text** doc when `Text` is in scope. |

---

## Part 1: Workflow – what to do

Follow these steps **in order** when accessibility of **CDS** components is in scope.

### Setup (align with `cds-code` and **cds-docs**)

1. If you are building or editing UI (not a doc-only review), use **`cds-code`** setup: discover packages, align **web** or **mobile**, and use **cds-docs** to read the same foundation **CDS** doc entries that `cds-code` uses for styling/theming (`list-cds-routes` + **`get-cds-doc`** on MCP, or the route index + **`curl`**, per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)). That keeps **platform and routes** consistent.
2. For this skill, in addition, for **each CDS component** you will touch, plan to load its doc the same way (MCP or curl) with emphasis on **accessibility**, **props tables**, and **examples**.

You do not need to repeat full setup for every small edit; repeat when **runtime, route list, or major CDS version** might have changed.

### Step 1: Scope the CDS surface

1. State whether the work is **web** or **React Native** (or both). Use the **web** or **mobile** **route index** (from **`list-cds-routes`** or `curl` to `.../llms/{web|mobile}/routes.txt`, per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) for that runtime.
2. **List CDS components** in the change. Ignore arbitrary raw HTML unless a CDS pattern in the docs maps to it.
3. If a feature could use a **higher-level CDS component** (modal, list, form field) versus composing only `Box`/`View`, note it—you will compare docs in Step 3.

### Step 2: Pull accessibility-relevant docs per component

For each component in the list:

1. Find its **route** in the index from **Step 1** (MCP: `list-cds-routes`; or **`curl`**, per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)). Paths are **case-sensitive** and must come from the index.
2. **Fetch the doc** for that component: on MCP, **`get-cds-doc`**; otherwise **`curl -fsSL 'https://cds.coinbase.com/llms/<route>'`**. Also fetch any **sub-routes** the doc **cross-links** (e.g. usage with `FormField` or `Modal`).
3. **Throughout this file,** the phrase **`get-cds-doc`** (or the **.txt** from **`curl`**) is the same **source material**; whether you use MCP or curl is an **implementation detail** (see [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)). Read the **prop table** and any **Accessibility**, **ARIA**, **Screen reader**, or **React Native** notes. Treat **required** or **strongly recommended** label/name props as mandatory for the scenarios the doc describes.

If the doc is thin for your platform, still **do not invent** a full generic ARIA layer—**follow the published doc** and, if the gap is blocking, call out that the behavior is not specified in CDS for that component.

### Step 3: Choose the CDS component (accessibility angle)

1. If multiple CDS components could work, prefer the one whose **documentation** describes the right **focus management, keyboard, role, and announcements** for the interaction (e.g. a documented `Modal` or `Select` over a hand-built stack).
2. Prefer **smallest component whose doc fully covers the interaction** over a lower primitive plus custom behavior.
3. Defer to **`cds-code`** for overall “which component for layout/visuals”; use this step when **assistive technology behavior** is the differentiator.

### Step 4: Apply documented accessibility APIs

1. **React Native:** set `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `accessibilityRole`, and any other props **the CDS component doc names** for the use case. Do not copy labels from old code without re-checking the current prop table.
2. **Web:** set `aria-*`, `as`, `role`, `htmlFor` / `id` / field wiring **only** as the CDS **web** component API and examples show. Prefer the component’s **first-class props** (e.g. a dedicated `label` or slot) over ad hoc ARIA on the wrong element.
3. For **form validation and errors**, use the **CDS form patterns** the doc links—association and live regions must match the documented approach.
4. For **decorative vs informative** icons and images, follow CDS `Icon` / `Image` (or media) guidance in the **official** **CDS** doc (per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)).
5. For **CDS `Text`** and **typography**, set **`as` (web)** / **`accessibilityRole` (React Native)** per **Part 2, Text (typography) and heading semantics** and the **Text** **official** doc (per **cds-docs**); skip if your change has no `Text` (or equivalent) in scope.

### Step 5: Focus management (focus-managed components only)

**When to run this step:** only if the Step 1 component list includes at least one **focus-managed** CDS component **per the published official doc** (per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs))—typically **overlays and floating UI** (examples: **Modal**, **Tray**, **Tooltip**; also **drawer**, **popover**, or others **only if** the doc describes **focus** movement, **trap**, **initial/restore** focus, or **keyboard** dismiss). If the change is **only** static layout, inline fields, or components whose docs **do not** define focus management, **skip** this step and go to **Step 6: Verify**.

1. For **each** in-scope component, read the **official** **CDS** **.txt** (MCP: **`get-cds-doc`**; else **`curl`**, per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) for **focus**, **keyboard**, **accessibility**, and any **ref/method** patterns. Use [cds.cbhq.net](https://cds.cbhq.net/) for worked examples that match your CDS version (e.g. web [Modal (overlay) – focus](https://cds.cbhq.net/components/overlay/Modal/)).
2. Implement **only** what the doc specifies: where focus **lands on open**, how **Tab** (or platform equivalent) **cycles within** the surface, how focus **restores on close**, and **dismiss** behavior (e.g. Esc) if documented.
3. **Do not** assume **Tooltip** behaves like **Modal**—hover vs click, `aria` behavior, and whether focus **moves** at all are **per component doc**. Do not add a home-grown `tabIndex`/listener stack when **CDS** already documents the path.

### Step 6: Verify

1. **Doc match:** your usage matches the **examples** and prop constraints in the doc you read (including platform-specific snippets).
2. If the doc or your team’s process expects a **device check** (e.g. VoiceOver on a build), note that; do not claim “accessible” from code shape alone if the task requires that verification.
3. When the **`cds-code`** flow applies, keep its **visual** verification pass; this skill does not replace that—it adds **CDS a11y API** correctness.
4. **If you ran Step 5:** for each **focus-managed** component, confirm **open → focus** as documented, **Tab/keyboard cycle** as documented, **close → focus restore** as documented, and **dismiss** keys if the doc requires them. **If you skipped Step 5,** omit this bullet.

### Step 7: Final checklist

1. **Definition of done:** all items in **Success criteria** (above) are true for this change—**props** (including **focus** for focus-managed components when in scope), **component selection**, and **documentation engagement**.
2. **Operational follow-through:** if you used the **`cds-code`** workflow, its **visual** verification is still in place; this skill adds CDS a11y consumption and does not replace layout, styling, or import checks from that skill.

---

## Part 2: Consuming CDS for accessibility

These patterns are **not** a substitute for reading each component’s doc. They tell you **what to look for** in the **.txt** you got via **`get-cds-doc`**, **`curl`**, or any method defined in [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) for the same route.

### Doc discipline

- **Prop names and values** must match the **current** published doc for your **major CDS version** in the repo. Do not paste snippets from old internal posts or from **web** into **React Native** without checking the right route.
- If something is **not in CDS** docs, this skill does not authorize inventing a full custom widget spec—escalate or use non-CDS guidance **outside** this skill’s scope.

### Text (typography) and heading semantics

**You (the consumer)** are responsible for pairing **visual `font` styles** on CDS **`Text`** with **correct assistive names and roles** so structure matches the real page or screen. **Source of truth:** the **Text** **web** and **mobile** **official** docs (per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs), **`get-cds-doc`** or **`curl`**) and the [Text (typography)](https://cds.cbhq.net/components/typography/Text/) page—not generic HTML heading blogs.

**Web (React):**

- When **`Text`** is used for **headings** (commonly **`font`** values such as **display** or **title** when they represent section or page titles), set **`as`** to the **appropriate** heading element (`h1`–`h6`) so the **document outline** and screen readers match the **authoring** intent. Follow the **Text** **official** doc and **examples** for which **`font`** values pair with which **`as`**.
- For **`font`** values meant as **non-heading** copy—typically **body**, **headline** (emphasis, not a document heading), **label**, **caption**—**do not** set **`as`** to a **heading** (or other semantic) role when that would **misrepresent** structure (e.g. body text announced as a heading). If the **Text** doc is updated, the **official** **CDS** doc (per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) wins over this list.
- **Do not** add arbitrary rules from this skill such as “exactly one `h1` per page” or “every screen must include an `h1`” unless **CDS** documentation **explicitly** requires it for a pattern. Prefer **logical heading order** and product/IA; do **not** treat **headline** `font` as a **heading** role without checking the **Text** doc.

**React Native:**

- The platform is limited: for **heading** content on **`Text`**, use **`accessibilityRole="heading"`** when the string is a heading—this is the primary way to expose heading semantics for typography. Heading level is weaker than on web; if the **mobile** **Text** doc exposes **`accessibilityLevel`** (or similar), set it per the **official** **Text** **mobile** doc.
- **Do not** set **`accessibilityRole="heading"`** on **body**, **label**, **caption**, or other **non-heading** uses when that would **mis-announce** structure; follow the **mobile** **Text** doc for which `font` values may pair with a heading role.
- Do **not** copy web **`as="h1"`** patterns literally—use the **mobile** **Text** doc; **`accessibilityRole="heading"`** is the best match available on RN for heading-like **`Text`** when a heading is intended.

### React Native (CDS mobile)

- Open each component’s **mobile** **official** **CDS** doc. Scan for: `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `accessibilityRole`, `accessible`, and any **CDS-prefixed** or forwarded props the doc lists.
- Set **labels** for controls whose visible text is missing, ambiguous, or icon-only when the **doc** says to supply a name or when the **example** does.
- For **state** (selected, disabled, busy), use the patterns the **doc** shows—often `accessibilityState` in combination with the component’s own `disabled` / `value` props.
- For **headings, lists, and navigational structure**, use CDS components whose **docs** define the right **role** and structure for RN VoiceOver (e.g. list cells vs flat `View` list). For **`Text`**, **heading** vs **body** treatment is covered in **Text (typography) and heading semantics** above.
- For **Modals, trays, tooltips**, and other **overlays** when the **mobile** doc describes **focus** or dismiss behavior, follow the **official** **CDS** **mobile** doc (per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) and **Part 1, Step 5** when that step applies—do not copy web-only focus patterns.

### Web (CDS web)

- Read the **web** **official** **CDS** doc for the component. Prefer **documentation** of:
  - **`as` and `role`** on `Box` and similar when the page needs **landmark or widget** semantics the doc allows.
  - **`Text` / typography and headings** (**`as`** for real headings, not body/label/caption as headings): see **Text (typography) and heading semantics** above and [Text (typography)](https://cds.cbhq.net/components/typography/Text/).
  - **Labeling:** native `<label>`, `aria-labelledby`, `aria-label`, or component **`label` / `Slot`** patterns **exactly** as the form control doc specifies.
  - **Focus-managed overlays and floating UI (Modal, Tray, Tooltip, and similar when the doc defines focus):** follow **Part 1, Step 5** and the component’s **web** **official** **CDS** doc. Use site examples (e.g. [Modal](https://cds.cbhq.net/components/overlay/Modal/)) for worked **focus** patterns when they match your CDS version—**not** a generic ad hoc `tabIndex` or focus-trap blog recipe.
- Avoid bolting **ARIA** onto a child node that the component does not document; you may get **double-announced** or **ignored** output.

### Choosing the right component (heuristics)

- Prefer a **CDS composite** (data table, select, dialog, list row) over **`Box` + ad hoc** when the **doc** for the composite already specifies **semantics, focus, and keyboard** for that pattern.
- When **two** CDS entry points exist (e.g. low vs high level), use the one whose **“Accessibility” or “When to use”** section matches your **screen reader and keyboard** requirements.
- **Visualization** components: read **cds-web-visualization** / **cds-mobile-visualization** (or the routes `list-cds-routes` shows) for **data point** and **legend** behavior before composing custom.

### Forms and errors

- Use CDS **form field, input, and validation** components as the **doc** chains them (e.g. helper text, error text, `aria-describedby` or RN equivalents as documented). Do not wire errors only with color if the **doc** requires text association or announcements.

### Media, icons, and images

- Use CDS **`Icon`**, image, and media components per the **official** **CDS** doc: **decorative** vs **informative** alternatives, and any **`alt` / `accessibilityLabel`** requirements.

### Explicit non-goal

- **Generic** “how to do accessibility on the web” that ignores CDS APIs. For gaps in CDS, rely on **CDS** documentation updates, design system support, or **external** resources—not this skill’s inventory of raw ARIA recipes.

---

## Part 3: Reference

### CDS resources

- **Site:** [cds.cbhq.net](https://cds.cbhq.net/) for browsing and deep links alongside [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) and the **`llms`** fetches.
- **Text (typography):** [cds.cbhq.net/components/typography/Text/](https://cds.cbhq.net/components/typography/Text/) (**`as`**, `font`, heading semantics on web; **`accessibilityRole`** on React Native per the **Text** **web** and **mobile** **official** docs in [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs).)
- **cds-docs (how to load CDS .txt for any component, including a11y):** Follow [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs). **Order:** (1) **CDS MCP**—`list-cds-routes` with `platform: "web" | "mobile"`, then **`get-cds-doc`** with a route from the index (case-sensitive, paths end in **.txt**). (2) If MCP is not configured, fails, or returns errors, **`curl -fsSL 'https://cds.coinbase.com/llms/<route>'`**: start from the [web](https://cds.coinbase.com/llms/web/routes.txt) or [mobile](https://cds.coinbase.com/llms/mobile/routes.txt) index; **map component → route** from the index only, then fetch the pages you need. Whether you use **MCP** or **`curl`** is an implementation detail (see cds-docs).

### Relationship to `cds-code`

- **`cds-code`** produces **CDS-first UI** (layout, StyleProps, theming, imports, visualization, **visual** verification, package discovery). Use it for **how to build the screen** and for **import correctness**.
- **`cds-accessibility` (this skill)** ensures **CDS components are used with the right accessibility props and component choices** as **documented** for web and mobile. Use **both** on typical feature work: build with `cds-code`, then apply this skill’s workflow for **a11y consumption** (and [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) for how you load the **.txt** docs).

### Common props: mental map (read the doc, do not hardcode from memory)

| Concern            | React Native (see mobile doc)                             | Web (see web doc)                                                                                                                                         |
| ------------------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exposed name       | Often `accessibilityLabel`, sometimes with visible `Text` | `accessibilityLabel` (when the web doc lists it for name), then `aria-label`, `aria-labelledby`, or **label** / slot props on the field                   |
| Hint / description | `accessibilityHint` where doc allows                      | `aria-describedby` or description slots per **official** **CDS** **web** doc (per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) |
| State              | `accessibilityState` + component state props              | `aria-*` state per component table (`aria-expanded`, `aria-selected`, etc.)                                                                               |
| Role / semantics   | `accessibilityRole` and CDS structural components         | `as`, `role`, semantic elements in **doc examples**                                                                                                       |
| Form errors        | Follow CDS form doc                                       | Follow CDS form doc                                                                                                                                       |

**Always** fill this table from the **current** **CDS** component **.txt** (via **`get-cds-doc`** or **`curl`**, per [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs)) for the **specific** component version you use. The table is a **search checklist**, not a spec.

### Anti-patterns

- **Guessing** `accessibilityLabel` or `aria-label` strings without reading the **current** component doc and **content** guidelines.
- **Skipping** a required doc prop because the app “looked fine” in a visual-only check.
- **Building** a custom modal, list, or form from `Box`/`View` when **`get-cds-doc`** lists a **CDS** component with defined **focus and semantics** for that job.
- **Copy-pasting** **web** ARIA into **React Native** props or the reverse; routes are **platform-specific**.
- **Conflicting** this skill with **`cds-code`**: you still need correct CDS imports, layout, and tokens—this skill does not override missing **`cds-code`** requirements.

### Where this skill stops

If the **official** **CDS** doc (from **cds-docs** via **`get-cds-doc`** or **`curl`**) does not document a behavior you need, **do not** fabricate a full custom accessibility architecture inside this skill’s name—record the gap, use **design/DS** follow-up, or **external** accessibility guidance for non-CDS layers.
