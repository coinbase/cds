export const meta = {
  name: 'tshirt-size-rollout',
  description:
    'Plan, review, implement and PR the t-shirt `size` prop across the CDS components tracked in component-sizes.md',
  whenToUse:
    'Roll out the t-shirt `size` prop (deprecating `compact`) across the batch of CDS components listed as Linear issues in component-sizes.md. Fans out one planning agent per component using the cds-tshirt-sizing skill, reviews the plans for accuracy/overlap/open-questions, implements the ready ones sequentially with full verification + commits, then opens a draft PR.',
  phases: [
    { title: 'Plan', detail: 'one agent per component runs the cds-tshirt-sizing skill' },
    { title: 'Review', detail: 'accuracy, file-overlap grouping, and blocking open questions' },
    { title: 'Implement', detail: 'execute each ready group in sequence; verify then commit' },
    { title: 'Pull Request', detail: 'open a draft PR linking every completed Linear issue' },
  ],
};

// ---------------------------------------------------------------------------
// Inputs — the components tracked in component-sizes.md.
// `args` may be:
//   - an array of {name,id,url}                     → override the component list
//   - an object {components?, stopAfter?}           → components override + control
//     stopAfter: 'review' runs phases 1-2 only and returns before implementing.
// Resume a 'review' run with resumeFromRunId (and no stopAfter) to implement +
// PR without re-running the cached plan/review agents.
// ---------------------------------------------------------------------------
const argComponents = Array.isArray(args)
  ? args
  : args && Array.isArray(args.components)
    ? args.components
    : null;
const stopAfter = args && !Array.isArray(args) ? args.stopAfter : null;

const COMPONENTS =
  argComponents && argComponents.length
    ? argComponents
    : [
        {
          name: 'Date Picker',
          id: 'CDS-2451',
          url: 'https://linear.app/coinbase/issue/CDS-2451/cds-t-shirt-date-picker',
        },
        {
          name: 'Search Input',
          id: 'CDS-2450',
          url: 'https://linear.app/coinbase/issue/CDS-2450/cds-t-shirt-search-input',
        },
        {
          name: 'Select',
          id: 'CDS-2449',
          url: 'https://linear.app/coinbase/issue/CDS-2449/cds-t-shirt-select',
        },
        {
          name: 'Slide Button',
          id: 'CDS-2448',
          url: 'https://linear.app/coinbase/issue/CDS-2448/cds-t-shirt-slide-button',
        },
        {
          name: 'Button Group',
          id: 'CDS-2447',
          url: 'https://linear.app/coinbase/issue/CDS-2447/cds-t-shirt-button-group',
        },
        {
          name: 'Icon Button Group',
          id: 'CDS-2446',
          url: 'https://linear.app/coinbase/issue/CDS-2446/cds-t-shirt-icon-button-group',
        },
        {
          name: 'Icon Button',
          id: 'CDS-2445',
          url: 'https://linear.app/coinbase/issue/CDS-2445/cds-t-shirt-icon-button',
        },
        {
          name: 'Select Chip',
          id: 'CDS-2224',
          url: 'https://linear.app/coinbase/issue/CDS-2224/cds-t-shirt-select-chip',
        },
        {
          name: 'Input Chip',
          id: 'CDS-2223',
          url: 'https://linear.app/coinbase/issue/CDS-2223/cds-t-shirt-input-chip',
        },
        {
          name: 'TabbedChips',
          id: 'CDS-2173',
          url: 'https://linear.app/coinbase/issue/CDS-2173/cds-t-shirt-tabbedchips',
        },
        {
          name: 'Button',
          id: 'CDS-2168',
          url: 'https://linear.app/coinbase/issue/CDS-2168/cds-t-shirt-button',
        },
      ];

const SKILL_PATH = '.agents/skills/cds-tshirt-sizing/SKILL.md';
const PLAN_DIR = '/tmp/tshirt-size-plans';
const slug = (name) => name.replace(/[^a-zA-Z0-9]+/g, '');

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------
const PLAN_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'component',
    'linearId',
    'feasible',
    'planPath',
    'filesToTouch',
    'packages',
    'openQuestions',
    'summary',
  ],
  properties: {
    component: { type: 'string' },
    linearId: { type: 'string' },
    feasible: {
      type: 'boolean',
      description:
        'false if the skill hit a STOP condition (no Figma size prop, not found in either package, or missing info)',
    },
    stopReason: { type: ['string', 'null'], description: 'why the skill stopped, if it did' },
    planPath: {
      type: 'string',
      description: 'absolute path to the written plan markdown file (empty string if none)',
    },
    defaultSize: { type: ['string', 'null'] },
    packages: {
      type: 'array',
      items: { type: 'string' },
      description: 'which packages the component lives in, e.g. ["web","mobile"]',
    },
    filesToTouch: {
      type: 'array',
      items: { type: 'string' },
      description: 'ALL repo-relative file paths the plan will create or modify',
    },
    openQuestions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['question', 'why', 'howToResolve'],
        properties: {
          question: { type: 'string' },
          why: { type: 'string', description: 'why this genuinely blocks implementation' },
          howToResolve: {
            type: 'string',
            description: 'what input/decision from the user unblocks it',
          },
        },
      },
    },
    summary: { type: 'string' },
  },
};

const REVIEW_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['reviews', 'groups', 'blocked'],
  properties: {
    reviews: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['component', 'accurate', 'feasible', 'notes'],
        properties: {
          component: { type: 'string' },
          accurate: { type: 'boolean' },
          feasible: { type: 'boolean' },
          notes: { type: 'string', description: 'corrections or concerns; empty if none' },
        },
      },
    },
    groups: {
      type: 'array',
      description:
        'implementation units. Components whose plans touch overlapping files are joined into one group and must be implemented in one pass.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['groupId', 'components', 'planPath', 'sharedFiles', 'ready', 'blockedReason'],
        properties: {
          groupId: { type: 'string' },
          components: { type: 'array', items: { type: 'string' } },
          planPath: {
            type: 'string',
            description:
              'authoritative plan file to implement. For multi-component groups this is a NEWLY WRITTEN merged plan; for single-component groups it is the original plan path.',
          },
          sharedFiles: {
            type: 'array',
            items: { type: 'string' },
            description: 'files that caused the components to be grouped (empty for singletons)',
          },
          ready: {
            type: 'boolean',
            description:
              'true only if every component in the group is accurate, feasible, and has no blocking open questions',
          },
          blockedReason: { type: ['string', 'null'] },
        },
      },
    },
    blocked: {
      type: 'array',
      description: 'components that cannot proceed without user input',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['component', 'linearId', 'questions'],
        properties: {
          component: { type: 'string' },
          linearId: { type: 'string' },
          questions: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['question', 'howToResolve'],
              properties: { question: { type: 'string' }, howToResolve: { type: 'string' } },
            },
          },
        },
      },
    },
  },
};

const IMPL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['components', 'status', 'commitSha', 'verifications', 'completedComponents', 'notes'],
  properties: {
    components: { type: 'array', items: { type: 'string' } },
    status: { type: 'string', enum: ['committed', 'verification_failed', 'skipped'] },
    commitSha: { type: ['string', 'null'] },
    verifications: {
      type: 'object',
      additionalProperties: false,
      required: ['tests', 'lint', 'format', 'typecheck'],
      properties: {
        tests: { type: 'string', enum: ['pass', 'fail', 'n/a'] },
        lint: { type: 'string', enum: ['pass', 'fail', 'n/a'] },
        format: { type: 'string', enum: ['pass', 'fail', 'n/a'] },
        typecheck: { type: 'string', enum: ['pass', 'fail', 'n/a'] },
      },
    },
    completedComponents: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
};

const PR_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['status', 'prUrl', 'notes'],
  properties: {
    status: { type: 'string', enum: ['created', 'failed', 'skipped'] },
    prUrl: { type: ['string', 'null'] },
    notes: { type: 'string' },
  },
};

// ---------------------------------------------------------------------------
// Phase 1 — Plan (fan out, one agent per component). Barrier: Review needs
// every plan at once to detect cross-component file overlap.
// ---------------------------------------------------------------------------
phase('Plan');
log(`Planning ${COMPONENTS.length} components with the cds-tshirt-sizing skill`);

const plans = (
  await parallel(
    COMPONENTS.map(
      (c) => () =>
        agent(
          `You are producing a t-shirt \`size\` prop implementation PLAN (not code) for the CDS component "${c.name}" (${c.id}).

Linear issue: ${c.url}

Follow the cds-tshirt-sizing skill EXACTLY. Read its instructions first: open and follow ${SKILL_PATH} (in the repo working directory) step by step. Invoke the Skill tool for "cds-tshirt-sizing" if it is available; otherwise follow the SKILL.md file directly. Load the Linear \`get_issue\` and Figma MCP tools via ToolSearch as the skill directs.

Honor these non-negotiable defaults from the skill: default size is \`l\`; \`compact\` is deprecated (target \`@deprecationExpectedRemoval v10\`) but must keep working exactly; \`size\` wins over \`compact\`; never introduce fixed heights/widths; define the size config per-package (never share via cds-common); write ONE cross-platform plan.

Write the finished plan as markdown to: ${PLAN_DIR}/${slug(c.name)}.plan.md (run \`mkdir -p ${PLAN_DIR}\` first). Do NOT modify any repo files — planning only.

STOP conditions from the skill: if the Figma component set has no \`size\` property, or the component exists in neither packages/web nor packages/mobile, do not invent a plan — set feasible=false and explain in stopReason.

Return the structured result. filesToTouch must list every repo-relative file the plan would create or modify (web + mobile components, tests, stories, docs .mdx, __figma__ templates, metadata). openQuestions must contain ONLY genuine blockers that need a human decision — not routine choices the skill already resolves.`,
          { label: `plan:${c.name}`, phase: 'Plan', effort: 'high', schema: PLAN_SCHEMA },
        ),
    ),
  )
).filter(Boolean);

log(`Produced ${plans.length}/${COMPONENTS.length} plans`);

// ---------------------------------------------------------------------------
// Phase 2 — Review (single synthesis agent; barrier over all plans).
// Checks accuracy/feasibility, groups overlapping plans, isolates blockers.
// ---------------------------------------------------------------------------
phase('Review');

const review = await agent(
  `You are the reviewer for a batch of t-shirt \`size\` prop implementation plans. Below is the structured metadata for each component's plan. Each plan's full markdown lives at its planPath — READ every plan file before judging.

PLANS:
${JSON.stringify(plans, null, 2)}

Do three things:

1. ACCURACY & FEASIBILITY — For each plan, read the plan file and verify it is accurate against the actual source (spot-check the referenced component files, that the size config is per-package, default is \`l\`, no fixed heights, \`compact\` deprecated at v10 and preserved). Flag anything wrong or infeasible in reviews[].notes.

2. FILE OVERLAP GROUPING — Two plans that modify or create ANY of the same files CANNOT run in parallel and must be implemented together. Build groups by unioning plans that share files (transitively: A-B and B-C ⇒ one group A-B-C). Also group components that clearly share a base implementation even via different files (e.g. Button/IconButton/ButtonGroup internals, Select/SelectChip, Input/InputChip). For each MULTI-component group, WRITE a single merged cross-platform plan to ${PLAN_DIR}/group-<groupId>.plan.md that sequences the shared-file edits once and covers every component in the group; set that as the group's planPath. For SINGLE-component groups, set planPath to the original plan's planPath. sharedFiles lists the overlapping files (empty for singletons).

3. BLOCKING OPEN QUESTIONS — A group is ready=true ONLY if every component in it is accurate, feasible, has a real plan file, and has no genuine blocking open question. If any component has a real blocker (or the plan hit a STOP condition), mark its group ready=false with a blockedReason, and add each such component to blocked[] with concrete questions and how the user can resolve them. Do not block on routine decisions the skill already settles.

Return the structured review.`,
  { label: 'review:all-plans', phase: 'Review', effort: 'high', schema: REVIEW_SCHEMA },
);

const readyGroups = (review?.groups ?? []).filter((g) => g.ready && g.planPath);
const blockedGroups = (review?.groups ?? []).filter((g) => !g.ready);
log(
  `${readyGroups.length} group(s) ready, ${blockedGroups.length} blocked, ${(review?.blocked ?? []).length} component(s) need input`,
);

// Review-only mode: stop here so the user can approve grouping/blockers before
// any code is changed or committed. Resume with resumeFromRunId to continue.
if (stopAfter === 'review') {
  log('Stopping after Review as requested — no code changed, nothing committed.');
  return {
    mode: 'review-only',
    totalComponents: COMPONENTS.length,
    plansProduced: plans.length,
    groups: review?.groups ?? [],
    readyGroups: readyGroups.map((g) => ({
      groupId: g.groupId,
      components: g.components,
      sharedFiles: g.sharedFiles,
      planPath: g.planPath,
    })),
    blocked: review?.blocked ?? [],
    reviews: review?.reviews ?? [],
    plans: plans.map((p) => ({
      component: p.component,
      feasible: p.feasible,
      stopReason: p.stopReason,
      packages: p.packages,
      filesToTouch: p.filesToTouch,
      openQuestions: p.openQuestions,
      planPath: p.planPath,
    })),
  };
}

// ---------------------------------------------------------------------------
// Post-review decisions (captured from the user at the review checkpoint).
// This block re-runs live on resume; the Plan + Review agents stay cached.
// ---------------------------------------------------------------------------
const PLAN = (name) => `${PLAN_DIR}/${slug(name)}.plan.md`;

const DECISIONS = {
  'Slide Button':
    "APPROVED: route `size` to the existing fixed-height mechanism (40/48/56px) — the fixed dimension is acceptable here per design/eng sign-off. Add a NEW constant for the medium (48px) size; do NOT rename or drop any existing exported constants or exports (no breaking changes). The new `m` size uses the SAME handle icon size as `l` (24px) and `l`'s inner paddings, differing only in frame height. Preserve the existing `height` override prop and all current behavior.",
  'Date Picker':
    "APPLY TO BOTH web and mobile. Add `size` to BOTH the DatePicker component AND the underlying DateInput component (so DateInput works when used in isolation), in each package that has them. Decouple label placement from size exactly like TextInput: every size must still support inside AND outside labels — reuse TextInput's existing density/label business logic (e.g. useTextInputDensity) rather than re-implementing it. For inside labels, `size=\"l\"` is the special case that stacks the label vertically above the input. `compact` must keep working EXACTLY as today: resolvedSize = size ?? (compact ? 's' : 'l'); size wins over compact. Deprecate `compact` at v10.",
};

// Chips: Approach A — migrate the shared base Chip and deprecate `compact`
// everywhere. InputChip/SelectChip/TabbedChips all build on chips/Chip +
// MediaChip + cds-common getMediaChipSpacingProps, so they MUST be one pass.
const CHIP_COMPONENTS = ['Input Chip', 'Select Chip', 'TabbedChips'];
const CHIP_PLAN_PATH = `${PLAN_DIR}/group-chips.plan.md`;
const CHIP_DECISION =
  'APPROACH A (confirmed): add `size` to the SHARED base chip and deprecate `compact` EVERYWHERE. The base `Chip` component is the single source of truth for size; `MediaChip`, `InputChip`, `SelectChip` and `TabbedChips` all inherit from it. ' +
  'Migrate the shared `ChipBaseProps` (web + mobile) to add `size` and deprecate `compact` at v10. Make `cds-common` `getMediaChipSpacingProps` size-aware, but KEEP IT BACKWARD COMPATIBLE — accept an optional `size` and derive it from `compact` when `size` is absent; do NOT break the existing public signature or drop exports. ' +
  "Chip `size` union = `'xs' | 's'` with default `'s'` (Figma has no m/l for chips); `compact` maps to `'xs'`; size wins over compact. Preserve `compact` byte-for-byte. Implement CDS-2223 (InputChip), CDS-2224 (SelectChip) and CDS-2173 (TabbedChips) together in this ONE pass.";

// Hard-stops deferred regardless (no Figma size property / no component in code).
const DEFERRED = ['Button Group', 'Icon Button Group'];

// ---------------------------------------------------------------------------
// Phase 3 — Implement (SEQUENTIAL: shared branch, git commits must serialize).
// Each group is implemented, fully verified, and only then committed.
// ---------------------------------------------------------------------------
phase('Implement');

// The chip family needs a single coordinated Approach-A plan merged from the
// three individual chip plans. Generate it before implementing.
log('Merging the three chip plans into one Approach-A plan');
await agent(
  `Write a SINGLE coordinated cross-platform implementation plan for adopting the t-shirt \`size\` prop across the CDS chip family, following APPROACH A. Merge these three existing per-component plans, resolving any conflict in favor of Approach A:
- ${PLAN('Input Chip')}
- ${PLAN('Select Chip')}
- ${PLAN('TabbedChips')}

${CHIP_DECISION}

Before finalizing, read the actual shared source: packages/web/src/chips/ChipProps.ts, packages/mobile/src/chips/ChipProps.ts, both Chip.tsx, both MediaChip.tsx, and packages/common/src/chips/getMediaChipSpacingProps.ts. The plan must: sequence the shared-base edits ONCE (ChipBaseProps + base Chip + MediaChip + cds-common helper), then show how InputChip, SelectChip and TabbedChips each inherit \`size\`; use per-package size config (never cds-common) where geometry differs; give the resolution logic \`size ?? (compact ? 'xs' : 's')\`; deprecate \`compact\` at v10 on the shared ChipBaseProps; add a standalone story per package for each chip; update docs .mdx and refresh Figma Code Connect for every affected chip. Write the finished plan to ${CHIP_PLAN_PATH} and return its path.`,
  { label: 'merge-plan:chips', phase: 'Implement', effort: 'high' },
);

// Ordered implementation groups reflecting the user's decisions.
const groups = [
  { groupId: 'button', components: ['Button'], planPath: PLAN('Button'), decisionNote: '' },
  {
    groupId: 'icon-button',
    components: ['Icon Button'],
    planPath: PLAN('Icon Button'),
    decisionNote: '',
  },
  {
    groupId: 'search-input',
    components: ['Search Input'],
    planPath: PLAN('Search Input'),
    decisionNote: '',
  },
  { groupId: 'select', components: ['Select'], planPath: PLAN('Select'), decisionNote: '' },
  {
    groupId: 'slide-button',
    components: ['Slide Button'],
    planPath: PLAN('Slide Button'),
    decisionNote: DECISIONS['Slide Button'],
  },
  {
    groupId: 'date-picker',
    components: ['Date Picker'],
    planPath: PLAN('Date Picker'),
    decisionNote: DECISIONS['Date Picker'],
  },
  {
    groupId: 'chips',
    components: CHIP_COMPONENTS,
    planPath: CHIP_PLAN_PATH,
    decisionNote: CHIP_DECISION,
  },
];

const implemented = [];
for (let i = 0; i < groups.length; i++) {
  const g = groups[i];
  const componentList = g.components.join(', ');
  const linearIds = COMPONENTS.filter((c) => g.components.includes(c.name)).map((c) => c.id);
  const result = await agent(
    `Implement the t-shirt \`size\` prop for: ${componentList}.

The authoritative plan is at: ${g.planPath} — read it fully and implement it exactly. It is a single cross-platform plan; execute every section (web + mobile size config, resolution logic, size prop additions to the component's props, \`compact\` deprecation at v10, standalone stories, docs .mdx updates, Figma Code Connect refresh) unless a section is explicitly out of scope.
${g.decisionNote ? `\nUSER DECISIONS — these are settled requirements; where the plan conflicts, follow these:\n${g.decisionNote}\n` : ''}
Use the relevant CDS skills as the plan directs (deprecate-cds-api for the @deprecated/@deprecationExpectedRemoval JSDoc, components.write-docs for docs, figma-code-connect for the __figma__ templates). Follow project rules in AGENTS.md: memoize components, per-package size config typed locally, never share size maps via cds-common, and never introduce fixed heights EXCEPT where a user decision above explicitly permits it (e.g. Slide Button). Backward compatibility is the top priority: \`compact\` must keep working exactly and no public exports may be renamed or dropped.

After editing, run VERIFICATION for the specific packages/files you changed and capture each result:
  - Unit tests for the modified files: \`yarn nx run <project>:test\` (project is \`web\` and/or \`mobile\`; use --testNamePattern or a path filter to target the component).
  - Lint: \`yarn nx run <project>:lint\` (must pass the deprecation lint rule).
  - Typecheck: \`yarn nx run <project>:typecheck\`.
  - Format: \`yarn nx format:write\`.

Fix any failures and re-run until green. ONLY if tests, lint, typecheck all pass do you commit — stage just the files this plan changed and commit with:

  feat: adopt t-shirt size prop for ${componentList} (${linearIds.join(', ')})

  <one-line body per component>

  Generated with Claude Code

  Co-Authored-By: Claude <noreply@anthropic.com>

Do NOT push and do NOT open a PR. Do not commit the ${PLAN_DIR} plan files or component-sizes.md. If verification cannot be made to pass, set status=verification_failed, do NOT commit, and explain in notes. Return the structured result including the commit sha (\`git rev-parse HEAD\`) when committed and which components are fully completed.`,
    { label: `impl:${g.groupId}`, phase: 'Implement', schema: IMPL_SCHEMA },
  );
  implemented.push(result);
  if (result)
    log(
      `[${i + 1}/${groups.length}] ${componentList}: ${result.status}${result.commitSha ? ` (${result.commitSha.slice(0, 9)})` : ''}`,
    );
}

const committed = implemented.filter((r) => r && r.status === 'committed');
const completedComponents = committed.flatMap((r) => r.completedComponents ?? []);

// ---------------------------------------------------------------------------
// Phase 4 — Pull Request (draft, linking every completed Linear issue).
// ---------------------------------------------------------------------------
phase('Pull Request');

let pr = { status: 'skipped', prUrl: null, notes: 'No components were committed.' };
if (committed.length) {
  const issueLinks = COMPONENTS.filter((c) => completedComponents.includes(c.name))
    .map((c) => `- [${c.id} — T-shirt ${c.name}](${c.url})`)
    .join('\n');
  pr = await agent(
    `Open a DRAFT pull request for the t-shirt \`size\` rollout work committed on the current branch (\`cds-t-shirts\`), targeting \`master\` on the \`origin\` remote (github.com repo \`coinbase/cds\`). Do NOT use the \`cds-internal\` / \`cds-public\` (coinbase.ghe.com) remotes for this PR.

Steps:
  1. Confirm the branch is ahead of master and inspect the commits: \`git log --oneline master..HEAD\`.
  2. Push the branch and set upstream to origin: \`git push -u origin HEAD\`.
  3. Create the draft PR with the gh CLI, explicitly scoped to the github.com repo: \`gh pr create --repo coinbase/cds --draft --base master --head cds-t-shirts --title "feat: adopt t-shirt size prop across components" --body <body>\`.

The PR body must summarize the change and include this section listing every COMPLETED component's Linear issue:

## Linear Issues
${issueLinks}

Return the structured result with the PR url. If push or PR creation fails, set status=failed and explain in notes.`,
    { label: 'pr:draft', phase: 'Pull Request', schema: PR_SCHEMA },
  );
}

// ---------------------------------------------------------------------------
// Return a structured summary for the main agent to relay + resume guidance.
// ---------------------------------------------------------------------------
const stillBlocked = (review?.blocked ?? []).filter((b) => DEFERRED.includes(b.component));
const resumeInstructions = stillBlocked.map((b) => ({
  component: b.component,
  linearId: b.linearId,
  questions: b.questions,
  howToResume: `HARD STOP — needs design/product first: the Figma component set has no \`size\` variant (and for Icon Button Group, no component exists in code; Code Connect maps it to plain ButtonGroup). Once design adds \`size\` variants to the Figma set (and the ticket is reframed onto a real target component), re-run the tshirt-size-rollout workflow for just "${b.component}" — pass args: [{name:"${b.component}", id:"${b.linearId}", url:"<issue url>"}] — and I'll re-plan, implement, verify, commit, and fold the commit into the same PR.`,
}));

return {
  totalComponents: COMPONENTS.length,
  plansProduced: plans.length,
  implementedGroups: groups.map((g) => g.components),
  implemented: implemented
    .map(
      (r) =>
        r && {
          components: r.components,
          status: r.status,
          commitSha: r.commitSha,
          verifications: r.verifications,
          notes: r.notes,
        },
    )
    .filter(Boolean),
  committedGroups: committed.length,
  completedComponents,
  deferred: DEFERRED,
  resumeInstructions,
  pr,
};
