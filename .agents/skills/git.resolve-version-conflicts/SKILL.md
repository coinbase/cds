---
name: git.resolve-version-conflicts
description: Resolve rebase/merge conflicts in CDS release-versioning files — package.json "version" fields and CHANGELOG.md entries — that arise because packages were versioned independently on master and the current branch. Recomputes each package's version by applying the branch's bump type (patch/minor/major) on top of master's latest version, rewrites CHANGELOG entries with today's date and the new version, then continues the rebase and formats. Use when the user asks to "resolve a versioning conflict", "resolve a package.json conflict", "resolve a changelog conflict", or when you organically detect conflict markers in package.json / CHANGELOG.md files during a rebase or merge. When detected organically, ALWAYS ask the user for confirmation before running this flow.
allowed-tools: Bash(git status:*), Bash(git fetch:*), Bash(git rebase:*), Bash(git show:*), Bash(git log:*), Bash(git diff:*), Bash(git add:*), Bash(git rev-parse:*), Bash(git merge-base:*), Bash(grep:*), Bash(ls:*), Bash(yarn nx format:write), Read, Edit, Grep, Glob
model: opus
---

# Resolve CDS version-file conflicts

CDS ships many packages that are kept version-locked by `yarn release`. When both
`master` and the current branch bump package versions independently, a rebase (or
merge) collides on two file types only:

- `packages/<pkg>/package.json` — the `"version"` field
- `packages/<pkg>/CHANGELOG.md` — the top-of-file version entries

This skill resolves **only** those two file types mechanically. Anything else that
conflicts must be raised to the user.

---

## When to run

Trigger this flow when EITHER:

1. The user explicitly asks to resolve a versioning / `package.json` / `CHANGELOG`
   conflict, **or**
2. You organically notice conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) inside
   `package.json` or `CHANGELOG.md` files during a rebase/merge.

> **In case 2 you MUST ask the user for confirmation before performing any
> resolution.** Describe what you found (which packages, which files) and ask
> whether to run this resolution flow. Do not resolve organically-detected
> conflicts without an explicit go-ahead.

---

## The rules (source of truth)

1. **Master's version is the latest.** For each package, the version currently on
   `origin/master` (equivalently, the `HEAD`/"ours" side of a rebase) is the newest
   published version.
2. **Reapply the branch's bump on top of master.** Determine the _type_ of bump the
   branch made (patch / minor / major) from the branch's `version` commit, then apply
   that same bump to master's latest version. That is the resolved version.
   - patch: `x.y.Z` → `x.y.(Z+1)`
   - minor: `x.Y.z` → `x.(Y+1).0`
   - major: `X.y.z` → `(X+1).0.0`
3. **CHANGELOG:** put the branch's entry at the **top**, above master's entries, using
   today's date and the resolved version, matching the exact format the file already
   uses. Keep all of master's existing entries intact below it.
4. **Only `package.json` and `CHANGELOG.md` conflicts are in scope.** If any other
   file is conflicted, STOP and raise it to the user before continuing.
5. Run the formatter when finished.
6. **Never change existing commit messages** while continuing the rebase.

---

## Step 0 — Confirm scope

```
git status
```

List the conflicted (`both modified` / unmerged) paths. Partition them:

- In-scope: `packages/*/package.json`, `packages/*/CHANGELOG.md`
- Out-of-scope: everything else

**If any out-of-scope file is conflicted, stop and raise it to the user now.** Do not
touch those files. Only proceed once the user decides how to handle them.

If you got here organically (not via an explicit user request), also confirm with the
user that they want you to run this resolution flow before editing anything.

Note: `package.json` files often auto-merge cleanly even when the CHANGELOG for the
same package conflicts — you must still recompute their versions in the steps below,
so include every affected package, not just the ones with visible conflict markers.

---

## Step 1 — Identify the branch's version commit and bump type

The conflict is anchored on a specific commit (during a rebase, git names it in
`git status` as the commit it "could not apply", e.g. `571c39254 (version)`).

Inspect exactly what versions that commit changed and by how much:

```
git show <version-commit> -- '**/package.json'
```

For each package, read the `-  "version": "A.B.C"` → `+  "version": "A.B.D"` hunk and
classify the bump as patch / minor / major (rule 2).

---

## Step 2 — Read master's latest version per package

For every affected package:

```
git show origin/master:packages/<pkg>/package.json | grep '"version"'
```

(During a rebase the working-tree/`HEAD` value equals master's, since master's side
was checked out — either source is fine.)

Compute the **resolved version** = master's latest version + the branch's bump type.

Example from a real run: master was `9.6.9` for all packages; the branch's bump was
patch (`9.6.8 → 9.6.9`); resolved version = `9.6.10` for all of them.

---

## Step 3 — Update each `package.json`

Set the `"version"` field of every affected package to its resolved version.

Check whether packages pin each other's versions:

```
grep -nE '"@coinbase/cds-(common|web|mobile|mcp-server|icons)"' packages/<pkg>/package.json
```

If internal deps use `workspace:^` (the CDS convention), only the top-level
`"version"` field needs changing. If any dep pins an explicit version of a package
you just bumped, update that pin to match.

---

## Step 4 — Resolve each `CHANGELOG.md`

For each conflicted CHANGELOG, produce this order (newest first):

1. **Branch entry** — heading uses the resolved version and **today's date**, followed
   by the branch's change body.
2. **Master's entries** — kept verbatim below, in descending version order.

Match the file's existing heading format exactly. CDS uses two shapes:

- Real change: `## <version> (M/D/YYYY PST)` followed by a `#### 🐞 Fixes` (or
  `🚀 Updates`, `📘 Misc`, …) section and bullet(s).
- Artificial bump: `## <version> ((M/D/YYYY, HH:MM AM/PM PST))` followed by
  `This is an artificial version bump with no new change.`

Rules of thumb:

- If the branch's contribution to this package is a **real change**, carry that
  change's body into the new top entry (real-change format).
- If the branch only bumped this package to stay in sync (its conflict body reads
  "artificial version bump with no new change"), keep it an artificial-bump entry;
  reuse the timestamp from the branch's original entry, with today's date.
- Do **not** merge the branch's bullet into master's entry — they are separate
  version entries. Master's entry keeps its own bullets; the branch's bullet lives
  under the new resolved-version heading above it.

Remove every `<<<<<<<`, `=======`, `>>>>>>>` marker.

---

## Step 5 — Verify no markers remain

```
grep -rn '^<<<<<<<\|^=======\|^>>>>>>>' packages/*/CHANGELOG.md packages/*/package.json
```

Expect no output.

---

## Step 6 — Continue the rebase (or commit the merge)

Stage the resolved files and continue **without editing commit messages**:

```
git add packages/*/package.json packages/*/CHANGELOG.md
GIT_EDITOR=true git rebase --continue
```

`GIT_EDITOR=true` accepts each existing message unchanged. If more conflicts surface
on later commits, repeat Steps 0–6; if a later conflict is out-of-scope, stop and
raise it.

(For a merge instead of a rebase, `git commit --no-edit` after `git add`.)

---

## Step 7 — Format

```
yarn nx format:write
```

---

## Step 8 — Report back

Summarize:

- Which commit caused the conflict and which files were in scope.
- The resolved version per package and the bump type applied on top of master.
- The CHANGELOG placement (branch entry on top, master's kept below).
- That commit messages were unchanged.
- That the branch history was rewritten (rebase), so a force push
  (`git push --force-with-lease`) will be needed — do NOT push unless asked.
