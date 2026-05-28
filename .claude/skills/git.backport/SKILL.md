---
name: git.backport
description: Back-port a specific commit from master to a release branch via cherry-pick. Creates a dedicated backport branch, attempts the cherry-pick, pushes it, and opens a PR by default. Returns to the original branch when done (success or failure). If there are merge conflicts, diagnoses the root cause without attempting an autonomous resolution. Use when asked to "backport", "cherry-pick to release", or "port a fix to a release branch".
allowed-tools: Bash(git log:*), Bash(git show:*), Bash(git diff:*), Bash(git rev-parse:*), Bash(git cherry-pick:*), Bash(git checkout:*), Bash(git branch:*), Bash(git status:*), Bash(git fetch:*), Bash(git merge-base:*), Bash(git push:*), Bash(git remote:*), Bash(gh pr create:*), Bash(gh pr view:*), Bash(gh api:*), Read, Grep, Glob
argument-hint: <commit-sha> <target-branch>
model: opus
---

## Your task

Back-port the commit given in `$ARGUMENTS` to a release branch using `git cherry-pick`. Your arguments are in the format `<commit-sha> <target-branch>`.

Parse `$ARGUMENTS` now: the first token is `COMMIT_SHA`, the second is `TARGET_BRANCH`.

---

## Step 0 — Record the starting branch

Before touching anything, capture where the user currently is so you can return them there at the end:

```
git rev-parse --abbrev-ref HEAD
```

Store this as `ORIGINAL_BRANCH`. You will check out this branch at the very end, regardless of whether the backport succeeds or fails.

---

## Step 1 — Validate inputs

1. **Fetch** from origin to ensure remote refs are up to date:

   ```
   git fetch origin
   ```

2. Confirm `COMMIT_SHA` resolves using the remote ref (do NOT check it out locally):

   ```
   git rev-parse --verify <COMMIT_SHA>^{commit}
   ```

   If it still fails after fetching, stop and tell the user the SHA could not be resolved. Checkout `ORIGINAL_BRANCH` before stopping.

3. Confirm `origin/<TARGET_BRANCH>` exists on the remote:

   ```
   git rev-parse --verify origin/<TARGET_BRANCH>
   ```

   Always use the remote ref (`origin/<TARGET_BRANCH>`) as the source of truth — do not rely on a local checkout of the target branch. If the remote ref does not exist, stop and tell the user. Checkout `ORIGINAL_BRANCH` before stopping.

4. Check the working tree is clean (`git status --porcelain`). If it is not clean, stop and tell the user to stash or commit their in-progress work before proceeding. Do NOT checkout `ORIGINAL_BRANCH` in this case (they're already on it and have local changes).

---

## Step 2 — Summarize the commit

Show the user what they are about to cherry-pick. Use the remote ref for all inspection — never check out the source commit locally:

```
git show --stat <COMMIT_SHA>
```

Print:

- The commit subject
- The author and date
- The list of files changed with their stat line

---

## Step 3 — Derive source links

Extract the repo's GitHub URL from the remote:

```
git remote get-url origin
```

Convert SSH form (`git@github.com:org/repo.git`) or HTTPS form to a base URL: `https://github.com/org/repo`.

Build two links:

- **Commit link:** `https://github.com/org/repo/commit/<COMMIT_SHA>`
- **Original PR link:** Look for a `(#NNN)` pattern in the commit subject line. If found, build `https://github.com/org/repo/pull/NNN`. If the pattern is absent, omit the PR link and note that it could not be determined automatically.

---

## Step 4 — Create the backport branch

Derive `SHORT_SHA` = first 8 chars of `COMMIT_SHA`. Check the backport branch does not already exist:

```
git rev-parse --verify backport/<SHORT_SHA>-to-<TARGET_BRANCH>
```

If it exists locally or on origin, stop and tell the user rather than overwriting it. Checkout `ORIGINAL_BRANCH` before stopping.

Create the backport branch directly from the remote ref (no local checkout of target branch needed):

```
git checkout -b backport/<SHORT_SHA>-to-<TARGET_BRANCH> origin/<TARGET_BRANCH>
```

Tell the user the branch name.

---

## Step 5 — Attempt the cherry-pick

Run:

```
git cherry-pick <COMMIT_SHA>
```

Capture the exit code and stdout/stderr.

### If the cherry-pick succeeds (exit code 0) — proceed to Step 6

### If the cherry-pick fails (exit code non-zero) — CONFLICT PATH

Immediately abort the cherry-pick:

```
git cherry-pick --abort
```

Then proceed to **Step 7** (conflict diagnosis). Return to `ORIGINAL_BRANCH` after reporting.

---

## Step 6 — Push and open a PR (default on success)

### 6a — Push the backport branch

```
git push -u origin backport/<SHORT_SHA>-to-<TARGET_BRANCH>
```

### 6b — Build the PR body

```markdown
## Summary

Backport of commit [`<SHORT_SHA>`](commit-link) from `master`[, originally merged via [#NNN](pr-link)].

<one or two plain-language bullet points summarising what the commit does, derived from the commit message and changed files — do not just copy the commit message verbatim>

## Test plan

- [ ] Verify no CI steps in the `<TARGET_BRANCH>` pipeline depend on anything removed or changed by this commit

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

Omit the "originally merged via" clause if the original PR number could not be determined.

### 6c — Open the PR

```
gh pr create \
  --base <TARGET_BRANCH> \
  --head backport/<SHORT_SHA>-to-<TARGET_BRANCH> \
  --title "<original commit subject> (backport to <TARGET_BRANCH>)" \
  --body "<body from 6b>"
```

If `gh pr create` fails due to missing authentication:

- Tell the user that `gh` is not authenticated for this host
- Print the URL that `git push` echoed (looks like `https://github.com/org/repo/pull/new/<branch>`) so they can open the PR manually
- Print the suggested PR title and body so they can paste them in

### 6d — Return to original branch

```
git checkout <ORIGINAL_BRANCH>
```

Then report to the user:

- The new commit SHA on the backport branch (`git rev-parse backport/<SHORT_SHA>-to-<TARGET_BRANCH>`)
- The PR URL (or the manual URL + body if `gh` was not authenticated)
- That they are back on `<ORIGINAL_BRANCH>`

---

## Step 7 — Diagnose the conflict (do NOT resolve it)

Your goal here is to explain _why_ the conflict happened so the user can resolve it themselves. Do NOT attempt to modify any files or re-run the cherry-pick. Use remote refs for all file inspection — never check out anything locally.

### 7a — Identify what the commit changed

```
git show --name-only <COMMIT_SHA>
```

Collect the list of files the commit touches.

### 7b — Find the merge base

```
git merge-base <COMMIT_SHA> origin/<TARGET_BRANCH>
```

This gives you `MERGE_BASE`.

### 7c — Compare the relevant files across three points in history

For each file in the cherry-picked commit, inspect using remote refs only:

1. **What the commit changed** (the patch being applied):

   ```
   git show <COMMIT_SHA> -- <file>
   ```

2. **How the file looks on TARGET_BRANCH** (the destination — use remote ref):

   ```
   git show origin/<TARGET_BRANCH>:<file>
   ```

3. **How the file looked at the merge base**:

   ```
   git show <MERGE_BASE>:<file>
   ```

4. **What has diverged on TARGET_BRANCH since the merge base**:
   ```
   git diff <MERGE_BASE>..origin/<TARGET_BRANCH> -- <file>
   ```

### 7d — Reason about the conflict

Determine the most likely cause:

| Cause                             | Signs                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------- |
| **Code deleted on TARGET_BRANCH** | The lines the commit modifies no longer exist in the target file                 |
| **Code moved or refactored**      | The lines exist but in a different function, class, or file                      |
| **Conflicting parallel change**   | TARGET_BRANCH already modified the same lines differently                        |
| **File renamed or deleted**       | The file does not exist on TARGET_BRANCH at all                                  |
| **API / import change**           | The commit references a symbol that was renamed or removed on the release branch |

### 7e — Return to original branch, then report

```
git checkout <ORIGINAL_BRANCH>
```

Then write the conflict report:

```
## Backport conflict detected

Cherry-pick of <COMMIT_SHA> onto <TARGET_BRANCH> produced conflicts.
The cherry-pick has been aborted and you are back on `<ORIGINAL_BRANCH>`.

### Conflicting files
<list each file>

### Diagnosis

For each file:
- What the cherry-picked commit was trying to do to this file
- What the current state of this file is on TARGET_BRANCH
- Why those two things conflict (pick the most precise cause from the table above)
- A concrete suggested approach for manual resolution (e.g., "the function was renamed from X to Y on release-8.x — apply the logic change to the renamed function")
```

Be specific. Quote relevant line ranges or symbol names. Give the user enough context to know exactly where to look and what to do.

---

## Important rules

- **Record `ORIGINAL_BRANCH` at the very start** and always return to it at the end — success, failure, or early stop (except when stopping due to a dirty working tree, since you haven't moved).
- **Never resolve conflicts autonomously.** In the conflict path, diagnose and explain only.
- **Always abort a failed cherry-pick** before reporting.
- **Always push and open a PR on success** — this is the default, not optional.
- **Never check out the source commit or the target branch locally.** Use `origin/<TARGET_BRANCH>` and inspect commits via `git show` / `git diff`. The only local branches you should create or switch to are the backport branch and the return to `ORIGINAL_BRANCH`.
- If the backport branch already exists, stop and return to `ORIGINAL_BRANCH` rather than overwriting.
- Do not amend or force-push any branch.
