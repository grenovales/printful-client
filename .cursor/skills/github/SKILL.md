---
name: github
description: Create, review, and merge GitHub pull requests using GitHub CLI and best practices. Use when the user asks to open a PR, review a PR, merge a branch, squash merge, or work with GitHub pull requests and merges.
---

# GitHub Pull Requests and Merges

## Prerequisites

- [GitHub CLI](https://cli.github.com/) (`gh`) installed and authenticated: `gh auth login`

## Creating a Pull Request

### From current branch (after push)

```bash
gh pr create
```

Interactive prompts for title, body, base branch, and reviewers.

### Non-interactive

```bash
gh pr create --title "feat: add X" --body "Description of changes" --base main
```

### From a branch without pushing first

```bash
gh pr create --fill   # Uses commit messages for title/body; pushes if needed
```

### Draft PR

```bash
gh pr create --draft
```

## Reviewing a Pull Request

### Check out a PR locally

```bash
gh pr checkout <pr-number>
# or
gh pr checkout 42
```

### View PR details

```bash
gh pr view <pr-number>
gh pr view --web   # Open in browser
```

### List PRs

```bash
gh pr list                    # Open PRs
gh pr list --state merged     # Merged PRs
gh pr list --author @me       # Your PRs
```

### Add a review comment (from CLI)

```bash
gh pr review <pr-number> --comment --body "LGTM"
gh pr review <pr-number> --approve --body "Approved"
gh pr review <pr-number> --request-changes --body "Please fix X"
```

## Merging a Pull Request

### Merge with default strategy (repo setting)

```bash
gh pr merge <pr-number>
```

### Merge strategies

| Strategy   | Flag              | Result |
|-----------|-------------------|--------|
| Merge     | `--merge`         | Creates a merge commit |
| Squash    | `--squash`        | Single commit from PR |
| Rebase    | `--rebase`        | Rebase PR commits onto base |

Examples:

```bash
gh pr merge 42 --squash --delete-branch
gh pr merge 42 --merge
gh pr merge 42 --rebase
```

### Common merge options

- `--delete-branch` — Delete the branch after merge (local and remote when using squash/merge).
- `--auto` — Enable auto-merge when checks pass (GitHub will merge automatically).
- `--admin` — Merge even if branch is not up to date (use with care).

### Merge without merging (close as not merged)

```bash
gh pr close <pr-number>
```

## Workflow checklist

**Before creating a PR:**
- [ ] Branch is up to date with base (e.g. `git fetch origin && git rebase origin/main`)
- [ ] Commits are logical; consider squash if many small fixes
- [ ] Title and description explain what and why

**Before merging:**
- [ ] CI passes
- [ ] Review approved (if required)
- [ ] Choose correct strategy: squash for single-feature PRs, merge when preserving history

## Quick reference

| Task              | Command |
|-------------------|---------|
| Create PR         | `gh pr create` |
| Checkout PR       | `gh pr checkout <n>` |
| View PR           | `gh pr view <n>` |
| Merge (squash)    | `gh pr merge <n> --squash --delete-branch` |
| Merge (merge)     | `gh pr merge <n> --merge` |
| List open PRs     | `gh pr list` |
